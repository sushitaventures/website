/**
 * Luxury thank-you email sent to a visitor after they submit the enquiry form.
 *
 * Built for email clients, not browsers: table layout + inline styles (Outlook, Gmail),
 * web fonts with Georgia/Arial fallbacks. Animations are progressive enhancement —
 * Apple Mail / iOS Mail / Outlook.com play them; Gmail strips them and shows the same
 * design static. Nothing starts hidden, so a client without animation support loses nothing.
 */

const GOLD = '#A68C65';
const GOLD_LIGHT = '#C9B48F';
const INK = '#111412';
const IVORY = '#F6F4EF';
const MUTED = '#777A70';
const SERIF = "'Cormorant Garamond', Georgia, 'Times New Roman', serif";
const SANS = "Manrope, 'Helvetica Neue', Arial, sans-serif";

const ADDRESS = '55-56, 3rd Floor, Sushma Infinium, Zirakpur, SAS Nagar, Punjab 140603';

/**
 * @param {object} p
 * @param {string} p.name      - visitor's name (already HTML-escaped)
 * @param {string} p.category  - what they're looking for (already HTML-escaped)
 * @param {string} p.city      - their city (already HTML-escaped)
 * @param {string} p.siteUrl   - public site origin, e.g. https://sushitaventures.com
 * @param {string} p.contactEmail
 */
import path from 'node:path';
import { fileURLToPath } from 'node:url';

/** Pass in nodemailer's `attachments` so `cid:sv-logo` resolves. */
export const LOGO_ATTACHMENT = {
  filename: 'logo.png',
  path: path.join(path.dirname(fileURLToPath(import.meta.url)), 'logo.png'),
  cid: 'sv-logo'
};

export const buildThankYouHtml = ({ name, category, city, siteUrl, contactEmail }) => {
  // Embedded as an inline attachment (cid) so it shows even before the site is live
  const logo = 'cid:sv-logo';
  const year = new Date().getFullYear();

  const step = (num, title, desc) => `
    <tr>
      <td valign="top" width="52" style="padding:0 0 22px;">
        <div class="sv-num" style="font-family:${SERIF};font-size:26px;font-style:italic;color:${GOLD};line-height:1;">${num}</div>
      </td>
      <td valign="top" style="padding:0 0 22px;">
        <div style="font-family:${SERIF};font-size:19px;color:${INK};line-height:1.3;">${title}</div>
        <div style="font-family:${SANS};font-size:13px;color:${MUTED};line-height:1.6;padding-top:4px;">${desc}</div>
      </td>
    </tr>`;

  return `<!doctype html>
<html lang="en" xmlns="http://www.w3.org/1999/xhtml">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<meta name="x-apple-disable-message-reformatting">
<meta name="color-scheme" content="light">
<meta name="supported-color-schemes" content="light">
<title>Thank you for contacting Sushita Ventures</title>
<link href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,500;0,600;1,500&family=Manrope:wght@400;600&display=swap" rel="stylesheet">
<style>
  @keyframes svFadeUp { from { opacity: 0; transform: translateY(14px); } to { opacity: 1; transform: none; } }
  @keyframes svGlow { 0%,100% { filter: drop-shadow(0 0 0 rgba(166,140,101,0)); } 50% { filter: drop-shadow(0 0 14px rgba(201,180,143,.55)); } }
  @keyframes svDraw { from { width: 0; } to { width: 120px; } }
  @keyframes svShimmer { 0% { background-position: -200% 0; } 100% { background-position: 200% 0; } }
  .sv-logo { animation: svFadeUp .9s ease-out both, svGlow 4s ease-in-out 1s infinite; }
  .sv-brand { animation: svFadeUp .9s ease-out .25s both; }
  .sv-rule { animation: svDraw 1.2s ease-out .5s both; }
  .sv-hero { animation: svFadeUp 1s ease-out .6s both; }
  .sv-card { animation: svFadeUp 1s ease-out .9s both; }
  .sv-steps { animation: svFadeUp 1s ease-out 1.2s both; }
  .sv-cta { animation: svFadeUp 1s ease-out 1.5s both; }
  .sv-btn {
    background-image: linear-gradient(110deg, ${GOLD} 0%, ${GOLD} 40%, ${GOLD_LIGHT} 50%, ${GOLD} 60%, ${GOLD} 100%) !important;
    background-size: 200% 100% !important;
    animation: svShimmer 3.5s linear 2s infinite;
  }
  @media (prefers-reduced-motion: reduce) { * { animation: none !important; } }
  @media only screen and (max-width: 620px) {
    .sv-container { width: 100% !important; }
    .sv-pad { padding-left: 24px !important; padding-right: 24px !important; }
    .sv-h1 { font-size: 30px !important; }
  }
</style>
</head>
<body style="margin:0;padding:0;background:#E9E4DA;-webkit-text-size-adjust:100%;">
  <!-- Inbox preview text -->
  <div style="display:none;max-height:0;overflow:hidden;opacity:0;">We've received your enquiry about ${category}. Our team will be in touch with you shortly.&#8199;&#847;&#8199;&#847;&#8199;&#847;</div>

  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="background:#E9E4DA;">
    <tr>
      <td align="center" style="padding:32px 12px;">
        <table role="presentation" class="sv-container" width="600" cellpadding="0" cellspacing="0" border="0" style="width:600px;max-width:600px;background:${IVORY};">

          <!-- Header -->
          <tr>
            <td align="center" style="background:${INK};padding:44px 24px 36px;">
              <img class="sv-logo" src="${logo}" width="64" height="69" alt="Sushita Ventures" style="display:block;border:0;width:64px;height:auto;margin:0 auto;">
              <div class="sv-brand" style="padding-top:14px;">
                <div style="font-family:${SERIF};font-size:26px;font-weight:600;letter-spacing:4px;color:${IVORY};line-height:1;">Sushita</div>
                <div style="font-family:${SERIF};font-size:26px;font-weight:600;letter-spacing:4px;color:${GOLD};line-height:1.2;">Ventures</div>
              </div>
              <div class="sv-rule" style="width:120px;height:1px;background:${GOLD};margin:22px auto 0;font-size:0;line-height:0;">&nbsp;</div>
              <div style="font-family:${SANS};font-size:10px;letter-spacing:3px;text-transform:uppercase;color:${GOLD_LIGHT};padding-top:14px;">Where Trust Builds Wealth</div>
            </td>
          </tr>

          <!-- Hero message -->
          <tr>
            <td class="sv-pad sv-hero" style="padding:48px 56px 8px;">
              <div style="font-family:${SANS};font-size:11px;letter-spacing:3px;text-transform:uppercase;color:${GOLD};">Enquiry Received</div>
              <h1 class="sv-h1" style="margin:12px 0 0;font-family:${SERIF};font-size:36px;font-weight:500;line-height:1.15;color:${INK};">Thank you, ${name}.</h1>
              <p style="margin:18px 0 0;font-family:${SANS};font-size:15px;line-height:1.75;color:#3A3F3B;">
                We're grateful you reached out to Sushita Ventures. Your enquiry has reached our team, and a senior advisor will personally review your requirement before getting in touch.
              </p>
            </td>
          </tr>

          <!-- Enquiry summary card -->
          <tr>
            <td class="sv-pad sv-card" style="padding:28px 56px 8px;">
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="background:#FFFFFF;border:1px solid #E4DDCF;border-left:3px solid ${GOLD};">
                <tr>
                  <td style="padding:20px 24px;">
                    <div style="font-family:${SANS};font-size:10px;letter-spacing:2.5px;text-transform:uppercase;color:${MUTED};">Your Enquiry</div>
                    <div style="font-family:${SERIF};font-size:22px;color:${INK};padding-top:6px;">${category}</div>
                    ${city ? `<div style="font-family:${SANS};font-size:13px;color:${MUTED};padding-top:4px;">${city}</div>` : ''}
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- What happens next -->
          <tr>
            <td class="sv-pad sv-steps" style="padding:36px 56px 6px;">
              <div style="font-family:${SERIF};font-size:24px;color:${INK};padding-bottom:20px;">What happens next</div>
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0">
                ${step('01', 'A considered review', 'Our team studies your requirement, preferred location and budget in detail.')}
                ${step('02', 'A personal call', 'An advisor contacts you shortly to understand your goals and answer any questions.')}
                ${step('03', 'Curated options', 'You receive verified opportunities matched to you — never a generic list.')}
              </table>
            </td>
          </tr>

          <!-- CTA -->
          <tr>
            <td class="sv-pad sv-cta" align="center" style="padding:12px 56px 48px;">
              <table role="presentation" cellpadding="0" cellspacing="0" border="0">
                <tr>
                  <td class="sv-btn" align="center" style="background:${GOLD};border-radius:2px;">
                    <a href="${siteUrl}" style="display:inline-block;padding:15px 34px;font-family:${SANS};font-size:12px;font-weight:600;letter-spacing:2.5px;text-transform:uppercase;color:#FFFFFF;text-decoration:none;">Explore Our Expertise</a>
                  </td>
                </tr>
              </table>
              <p style="margin:22px 0 0;font-family:${SANS};font-size:13px;line-height:1.6;color:${MUTED};">
                Have something to add? Simply reply to this email.
              </p>
            </td>
          </tr>

          <!-- Signature -->
          <tr>
            <td class="sv-pad" style="padding:0 56px 44px;">
              <div style="border-top:1px solid #E4DDCF;padding-top:28px;font-family:${SERIF};font-size:18px;font-style:italic;color:${INK};">Warm regards,</div>
              <div style="font-family:${SERIF};font-size:20px;font-weight:600;color:${INK};padding-top:4px;">Team Sushita Ventures</div>
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td align="center" style="background:${INK};padding:36px 32px 32px;">
              <div style="font-family:${SERIF};font-size:18px;font-weight:600;letter-spacing:3px;color:${IVORY};">Sushita <span style="color:${GOLD};">Ventures</span></div>
              <div style="width:40px;height:1px;background:${GOLD};margin:16px auto;font-size:0;line-height:0;">&nbsp;</div>
              <div style="font-family:${SANS};font-size:12px;line-height:1.7;color:#B9B3A6;">${ADDRESS}</div>
              <div style="font-family:${SANS};font-size:12px;line-height:1.7;padding-top:6px;">
                <a href="mailto:${contactEmail}" style="color:${GOLD_LIGHT};text-decoration:none;">${contactEmail}</a>
                <span style="color:#5C625D;">&nbsp;&nbsp;|&nbsp;&nbsp;</span>
                <a href="${siteUrl}" style="color:${GOLD_LIGHT};text-decoration:none;">${siteUrl.replace(/^https?:\/\//, '')}</a>
              </div>
              <div style="font-family:${SANS};font-size:11px;padding-top:18px;">
                <a href="${siteUrl}/about" style="color:#B9B3A6;text-decoration:none;">About Us</a>
                <span style="color:#5C625D;">&nbsp;&nbsp;·&nbsp;&nbsp;</span>
                <a href="${siteUrl}/#services-section" style="color:#B9B3A6;text-decoration:none;">Services</a>
                <span style="color:#5C625D;">&nbsp;&nbsp;·&nbsp;&nbsp;</span>
                <a href="${siteUrl}/contact" style="color:#B9B3A6;text-decoration:none;">Contact</a>
              </div>
              <div style="font-family:${SANS};font-size:10px;line-height:1.6;color:#6E746F;padding-top:22px;">
                You're receiving this email because you submitted an enquiry on our website.<br>
                &copy; ${year} Sushita Ventures. All rights reserved.
              </div>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>`;
};
