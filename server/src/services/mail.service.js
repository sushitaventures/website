import nodemailer from 'nodemailer';
import { env } from '../config/env.js';
import { Enquiry } from '../models/Enquiry.js';
import { getEnquiryRecipients } from '../models/NotificationSettings.js';

// Recipients come from the admin panel (default contact@sushitaventures.com); only SMTP login is needed here.
export const isMailConfigured = () => Boolean(env.SMTP_HOST && env.SMTP_USER && env.SMTP_PASS);

let transporter = null;
const getTransporter = () => {
  if (!transporter) {
    transporter = nodemailer.createTransport({
      host: env.SMTP_HOST,
      port: env.SMTP_PORT,
      secure: env.SMTP_SECURE,
      auth: { user: env.SMTP_USER, pass: env.SMTP_PASS },
      connectionTimeout: 15000,
      greetingTimeout: 15000,
      socketTimeout: 20000
    });
  }
  return transporter;
};

// Visitor input goes into HTML — escape everything.
const escapeHtml = (value = '') =>
  String(value)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');

const buildEnquiryEmail = (enquiry) => {
  const rows = [
    ['Name', enquiry.fullName],
    ['Phone', enquiry.phoneNumber],
    ['Email', enquiry.email],
    ['City / Location', enquiry.city],
    ['Looking For', enquiry.lookingFor],
    ['Requirement', enquiry.requirement || '—'],
    ['Received', new Date(enquiry.createdAt || Date.now()).toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' })]
  ];

  const html = `
  <div style="font-family:Arial,Helvetica,sans-serif;background:#f6f4ef;padding:24px">
    <div style="max-width:600px;margin:0 auto;background:#ffffff;border-radius:8px;overflow:hidden">
      <div style="background:#111412;color:#f6f4ef;padding:20px 24px">
        <h1 style="margin:0;font-size:20px;font-weight:600">New Website Enquiry</h1>
        <p style="margin:6px 0 0;color:#a68c65;font-style:italic">${escapeHtml(enquiry.lookingFor)}</p>
      </div>
      <table style="width:100%;border-collapse:collapse;font-size:14px">
        ${rows
          .map(
            ([label, value]) => `
          <tr>
            <td style="padding:12px 24px;border-bottom:1px solid #eee;color:#777a70;width:150px;vertical-align:top">${escapeHtml(label)}</td>
            <td style="padding:12px 24px;border-bottom:1px solid #eee;color:#171b19;white-space:pre-wrap">${escapeHtml(value)}</td>
          </tr>`
          )
          .join('')}
      </table>
      <p style="padding:16px 24px;margin:0;font-size:12px;color:#777a70">
        Reply to this email to respond to ${escapeHtml(enquiry.fullName)} directly.
      </p>
    </div>
  </div>`;

  const text = rows.map(([label, value]) => `${label}: ${value}`).join('\n');

  return {
    subject: `New enquiry: ${enquiry.fullName} — ${enquiry.lookingFor}`,
    html,
    text
  };
};

/**
 * Send the team notification for an enquiry and record the outcome on the lead.
 * Never throws: failures are stored on the enquiry so the admin panel can show and retry them.
 * @param {object} enquiry - saved Enquiry document or plain object (if the DB is down, there is no _id to update)
 * @returns {Promise<{status: string, error?: string}>}
 */
export const sendEnquiryNotification = async (enquiry) => {
  if (!isMailConfigured()) {
    if (enquiry._id) {
      await Enquiry.updateOne(
        { _id: enquiry._id },
        { $set: { 'mail.status': 'not_configured', 'mail.error': 'SMTP settings are not configured on the server.' } }
      ).catch(() => {});
    }
    return { status: 'not_configured' };
  }

  const attemptedAt = new Date();
  try {
    const { subject, html, text } = buildEnquiryEmail(enquiry);
    const recipients = await getEnquiryRecipients();
    const info = await getTransporter().sendMail({
      from: env.MAIL_FROM,
      to: recipients.join(', '),
      replyTo: enquiry.email,
      subject,
      html,
      text
    });

    if (enquiry._id) {
      await Enquiry.updateOne(
        { _id: enquiry._id },
        {
          $set: {
            'mail.status': 'sent',
            'mail.sentAt': new Date(),
            'mail.lastAttemptAt': attemptedAt,
            'mail.messageId': info.messageId || '',
            'mail.error': ''
          },
          $inc: { 'mail.attempts': 1 }
        }
      ).catch(() => {}); // a DB hiccup must not turn a delivered mail into a "failure"
    }

    return { status: 'sent' };
  } catch (error) {
    console.error('[Mail] Enquiry notification failed:', error.message);
    if (enquiry._id) {
      await Enquiry.updateOne(
        { _id: enquiry._id },
        {
          $set: {
            'mail.status': 'failed',
            'mail.lastAttemptAt': attemptedAt,
            'mail.error': error.message.slice(0, 500)
          },
          $inc: { 'mail.attempts': 1 }
        }
      ).catch(() => {});
    }
    return { status: 'failed', error: error.message };
  }
};

/** Check SMTP credentials at startup so misconfiguration shows up in the logs. */
export const verifyMailTransport = async () => {
  if (!isMailConfigured()) {
    console.warn('[Mail] SMTP not configured — enquiries will be saved with mail status "not_configured".');
    return;
  }
  try {
    await getTransporter().verify();
    const recipients = await getEnquiryRecipients();
    console.log(`[Mail] SMTP ready (${env.SMTP_HOST}:${env.SMTP_PORT}) — notifications go to ${recipients.join(', ')}`);
  } catch (error) {
    console.error('[Mail] SMTP verification failed:', error.message);
  }
};
