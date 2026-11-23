import { Enquiry } from '../../models/Enquiry.js';
import { sendSuccess, sendError } from '../../utils/response.js';

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

    // Phone format check (accepts domestic and international digits, +, -, spaces, parentheses, min 7 digits)
    const cleanPhone = phoneNumber.replace(/[\s\-\(\)\.]/g, '');
    if (cleanPhone.length < 7 || cleanPhone.length > 20) {
      return sendError(res, {
        statusCode: 400,
        code: 'VALIDATION_ERROR',
        message: 'Please provide a valid phone number.'
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
