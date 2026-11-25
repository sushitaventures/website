import mongoose from 'mongoose';
import { Enquiry } from '../../models/Enquiry.js';
import { sendSuccess, sendError } from '../../utils/response.js';
import { sendEnquiryNotification, isMailConfigured } from '../../services/mail.service.js';
import { NotificationSettings, DEFAULT_ENQUIRY_RECIPIENT } from '../../models/NotificationSettings.js';

const LEAD_STATUSES = Enquiry.schema.path('status').enumValues;
const MAIL_STATUSES = Enquiry.schema.path('mail.status').enumValues;

const escapeRegex = (s) => s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');

const dbUnavailable = (res) =>
  sendError(res, { statusCode: 503, code: 'DB_UNAVAILABLE', message: 'Database is not connected.' });

const invalidId = (res) =>
  sendError(res, { statusCode: 400, code: 'INVALID_ID', message: 'Invalid enquiry id.' });

// Tally helper for the summary cards: { new: 3, contacted: 1, ... }
const countBy = async (field) => {
  const rows = await Enquiry.aggregate([{ $group: { _id: `$${field}`, count: { $sum: 1 } } }]);
  return Object.fromEntries(rows.map((r) => [r._id ?? 'pending', r.count]));
};

/** GET /admin/enquiries?status=&mailStatus=&q=&page=&limit= */
export const listEnquiries = async (req, res) => {
  if (Enquiry.db.readyState !== 1) return dbUnavailable(res);
  try {
    const { status, mailStatus, q } = req.query;
    const page = Math.max(1, Number.parseInt(req.query.page, 10) || 1);
    const limit = Math.min(100, Math.max(1, Number.parseInt(req.query.limit, 10) || 20));

    const filter = {};
    if (status && LEAD_STATUSES.includes(status)) filter.status = status;
    if (mailStatus && MAIL_STATUSES.includes(mailStatus)) filter['mail.status'] = mailStatus;
    if (q && q.trim()) {
      const rx = new RegExp(escapeRegex(q.trim().slice(0, 100)), 'i');
      filter.$or = [{ fullName: rx }, { email: rx }, { phoneNumber: rx }, { city: rx }];
    }

    const [enquiries, total, byStatus, byMail] = await Promise.all([
      Enquiry.find(filter)
        .sort({ createdAt: -1 })
        .skip((page - 1) * limit)
        .limit(limit)
        .select('-userAgent -ipAddress')
        .lean(),
      Enquiry.countDocuments(filter),
      countBy('status'),
      countBy('mail.status')
    ]);

    return sendSuccess(res, {
      message: 'Enquiries retrieved successfully',
      data: { enquiries, summary: { byStatus, byMail }, mailConfigured: isMailConfigured() },
      meta: { page, limit, total, pages: Math.max(1, Math.ceil(total / limit)) }
    });
  } catch (error) {
    console.error('[AdminEnquiries] List error:', error.message);
    return sendError(res, { statusCode: 500, code: 'FETCH_ERROR', message: 'Failed to retrieve enquiries.' });
  }
};

/** GET /admin/enquiries/:id */
export const getEnquiry = async (req, res) => {
  if (Enquiry.db.readyState !== 1) return dbUnavailable(res);
  if (!mongoose.isValidObjectId(req.params.id)) return invalidId(res);
  try {
    const enquiry = await Enquiry.findById(req.params.id).lean();
    if (!enquiry) return sendError(res, { statusCode: 404, code: 'NOT_FOUND', message: 'Enquiry not found.' });
    return sendSuccess(res, { message: 'Enquiry retrieved successfully', data: { enquiry } });
  } catch (error) {
    console.error('[AdminEnquiries] Get error:', error.message);
    return sendError(res, { statusCode: 500, code: 'FETCH_ERROR', message: 'Failed to retrieve enquiry.' });
  }
};

/** PATCH /admin/enquiries/:id  { status } — move the lead through the pipeline */
export const updateEnquiryStatus = async (req, res) => {
  if (Enquiry.db.readyState !== 1) return dbUnavailable(res);
  if (!mongoose.isValidObjectId(req.params.id)) return invalidId(res);
  const { status } = req.body || {};
  if (!LEAD_STATUSES.includes(status)) {
    return sendError(res, {
      statusCode: 400,
      code: 'VALIDATION_ERROR',
      message: `Status must be one of: ${LEAD_STATUSES.join(', ')}.`
    });
  }
  try {
    const enquiry = await Enquiry.findByIdAndUpdate(req.params.id, { status }, { returnDocument: 'after', runValidators: true }).lean();
    if (!enquiry) return sendError(res, { statusCode: 404, code: 'NOT_FOUND', message: 'Enquiry not found.' });
    return sendSuccess(res, { message: 'Lead status updated', data: { enquiry } });
  } catch (error) {
    console.error('[AdminEnquiries] Update error:', error.message);
    return sendError(res, { statusCode: 500, code: 'UPDATE_ERROR', message: 'Failed to update enquiry.' });
  }
};

/** POST /admin/enquiries/:id/resend-email — retry the team notification */
export const resendEnquiryEmail = async (req, res) => {
  if (Enquiry.db.readyState !== 1) return dbUnavailable(res);
  if (!mongoose.isValidObjectId(req.params.id)) return invalidId(res);
  try {
    const existing = await Enquiry.findById(req.params.id).lean();
    if (!existing) return sendError(res, { statusCode: 404, code: 'NOT_FOUND', message: 'Enquiry not found.' });

    const result = await sendEnquiryNotification(existing);
    const enquiry = await Enquiry.findById(req.params.id).lean();

    if (result.status === 'sent') {
      return sendSuccess(res, { message: 'Notification email sent.', data: { enquiry } });
    }
    return sendError(res, {
      statusCode: result.status === 'not_configured' ? 503 : 502,
      code: result.status === 'not_configured' ? 'MAIL_NOT_CONFIGURED' : 'MAIL_SEND_FAILED',
      message:
        result.status === 'not_configured'
          ? 'Email is not configured on the server (SMTP settings missing).'
          : `Email could not be sent: ${result.error}`,
      details: { enquiry }
    });
  } catch (error) {
    console.error('[AdminEnquiries] Resend error:', error.message);
    return sendError(res, { statusCode: 500, code: 'RESEND_ERROR', message: 'Failed to resend email.' });
  }
};

/** GET /admin/enquiries/settings/recipients */
export const getRecipients = async (req, res) => {
  try {
    const doc =
      NotificationSettings.db.readyState === 1
        ? await NotificationSettings.findOne({ key: 'enquiry' }).populate('updatedBy', 'email').lean()
        : null;
    return sendSuccess(res, {
      message: 'Notification recipients retrieved',
      data: {
        recipients: doc?.recipients?.length ? doc.recipients : [DEFAULT_ENQUIRY_RECIPIENT],
        isDefault: !doc,
        updatedAt: doc?.updatedAt || null,
        updatedBy: doc?.updatedBy?.email || null
      }
    });
  } catch (error) {
    console.error('[AdminEnquiries] Recipients fetch error:', error.message);
    return sendError(res, { statusCode: 500, code: 'FETCH_ERROR', message: 'Failed to load recipients.' });
  }
};

/** PUT /admin/enquiries/settings/recipients  { recipients: string[] | "a@x.com, b@y.com" } */
export const updateRecipients = async (req, res) => {
  if (NotificationSettings.db.readyState !== 1) return dbUnavailable(res);

  const raw = req.body?.recipients;
  const list = (Array.isArray(raw) ? raw : String(raw || '').split(/[,;\s]+/))
    .map((e) => String(e).trim().toLowerCase())
    .filter(Boolean);
  const recipients = [...new Set(list)];

  const invalid = recipients.filter((e) => !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(e));
  if (recipients.length === 0 || recipients.length > 10 || invalid.length) {
    return sendError(res, {
      statusCode: 400,
      code: 'VALIDATION_ERROR',
      message: invalid.length
        ? `Invalid email address: ${invalid.join(', ')}`
        : 'Provide between 1 and 10 email addresses.'
    });
  }

  try {
    const doc = await NotificationSettings.findOneAndUpdate(
      { key: 'enquiry' },
      { recipients, updatedBy: req.adminUser?.id || null },
      { upsert: true, returnDocument: 'after', runValidators: true, setDefaultsOnInsert: true }
    ).lean();
    return sendSuccess(res, {
      message: 'Lead notification recipients updated',
      data: { recipients: doc.recipients, isDefault: false, updatedAt: doc.updatedAt, updatedBy: req.adminUser?.email || null }
    });
  } catch (error) {
    console.error('[AdminEnquiries] Recipients update error:', error.message);
    return sendError(res, { statusCode: 500, code: 'UPDATE_ERROR', message: 'Failed to save recipients.' });
  }
};
