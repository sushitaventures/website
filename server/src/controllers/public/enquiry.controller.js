import { Enquiry } from '../../models/Enquiry.js';
import { sendSuccess, sendError } from '../../utils/response.js';
import { sendEnquiryNotification, sendEnquiryThankYou } from '../../services/mail.service.js';

const VALID_CATEGORIES = [
  'Residential Property',
  'Commercial Property',
  'Industrial Property',
  'Land / Plots',
  'Hotels / Hospitality',
  'Leasing',
  'Exchange Property',
  'Sick Property',
  'Other'
];

/**
 * Handle public contact/lead enquiry submissions
 */
export const submitEnquiry = async (req, res) => {
  try {
    const { fullName, phoneNumber, email, city, lookingFor, requirement } = req.body;

    // Validate presence of required fields
    if (!fullName || !fullName.trim()) {
      return sendError(res, {
        statusCode: 400,
        code: 'VALIDATION_ERROR',
        message: 'Full Name is required.'
      });
    }

    if (!phoneNumber || !phoneNumber.trim()) {
      return sendError(res, {
        statusCode: 400,
        code: 'VALIDATION_ERROR',
        message: 'Phone Number is required.'
      });
    }

    if (!email || !email.trim()) {
      return sendError(res, {
        statusCode: 400,
        code: 'VALIDATION_ERROR',
        message: 'Email Address is required.'
      });
    }

    // Email regex validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email.trim())) {
      return sendError(res, {
        statusCode: 400,
        code: 'VALIDATION_ERROR',
        message: 'Please provide a valid email address.'
      });
    }

    // Phone: digits only, 7–15 long (the form strips everything else as it's typed)
    if (typeof phoneNumber !== 'string' || !/^\d{7,15}$/.test(phoneNumber.trim())) {
      return sendError(res, {
        statusCode: 400,
        code: 'VALIDATION_ERROR',
        message: 'Please provide a valid phone number (digits only).'
      });
    }

    if (!city || !city.trim()) {
      return sendError(res, {
        statusCode: 400,
        code: 'VALIDATION_ERROR',
        message: 'City or Location is required.'
      });
    }

    if (!lookingFor || !VALID_CATEGORIES.includes(lookingFor)) {
      return sendError(res, {
        statusCode: 400,
        code: 'VALIDATION_ERROR',
        message: 'Please select a valid property category.'
      });
    }

    const clientIp = req.headers['x-forwarded-for'] || req.socket?.remoteAddress || '';
    const userAgent = req.headers['user-agent'] || '';

    // If database connection is active, persist in MongoDB
    let savedEnquiry = null;
    if (Enquiry.db && Enquiry.db.readyState === 1) {
      // Duplicate guard: same email or phone, same category, within 24 hours → don't save or
      // email again; just reassure the visitor. A different category counts as a new lead.
      const duplicate = await Enquiry.findOne({
        lookingFor,
        $or: [{ email: email.trim().toLowerCase() }, { phoneNumber: phoneNumber.trim() }],
        createdAt: { $gte: new Date(Date.now() - 24 * 60 * 60 * 1000) }
      })
        .select('_id createdAt')
        .lean();
      if (duplicate) {
        return sendSuccess(res, {
          statusCode: 200,
          message: "We've already received your enquiry and our team will connect with you shortly. There's no need to submit it again.",
          data: { enquiryId: duplicate._id, receivedAt: duplicate.createdAt, duplicate: true }
        });
      }

      savedEnquiry = await Enquiry.create({
        fullName: fullName.trim(),
        phoneNumber: phoneNumber.trim(),
        email: email.trim().toLowerCase(),
        city: city.trim(),
        lookingFor,
        requirement: requirement ? requirement.trim() : '',
        ipAddress: typeof clientIp === 'string' ? clientIp.split(',')[0].trim() : '',
        userAgent: typeof userAgent === 'string' ? userAgent.slice(0, 300) : ''
      });
    } else {
      console.log('[DevEnquiryNotice] Database not connected in development; enquiry received and validated in memory:', {
        fullName,
        phoneNumber,
        email,
        city,
        lookingFor
      });
    }

    // Email the team in the background so the visitor isn't kept waiting on SMTP.
    // The outcome is written to the lead's mail status (visible + retryable in the admin panel).
    const leadForMail = savedEnquiry || {
      fullName: fullName.trim(),
      phoneNumber: phoneNumber.trim(),
      email: email.trim().toLowerCase(),
      city: city.trim(),
      lookingFor,
      requirement: requirement ? requirement.trim() : ''
    };
    sendEnquiryNotification(leadForMail).catch((err) =>
      console.error('[PublicEnquiry] Unexpected mail error:', err.message)
    );
    sendEnquiryThankYou(leadForMail).catch((err) =>
      console.error('[PublicEnquiry] Unexpected thank-you mail error:', err.message)
    );

    return sendSuccess(res, {
      statusCode: 201,
      message: "Thank you for reaching out to Sushita Ventures. We've received your enquiry and our team will connect with you shortly.",
      data: {
        enquiryId: savedEnquiry?._id || 'dev_ref_' + Date.now(),
        receivedAt: new Date().toISOString()
      }
    });
  } catch (error) {
    console.error('[PublicEnquiry] Error processing enquiry:', error);
    return sendError(res, {
      statusCode: 500,
      code: 'ENQUIRY_SUBMISSION_ERROR',
      message: 'Failed to submit enquiry. Please try again or contact us directly.'
    });
  }
};
