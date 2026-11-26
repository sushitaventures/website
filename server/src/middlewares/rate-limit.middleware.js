import rateLimit from 'express-rate-limit';
import { sendError } from '../utils/response.js';

export const loginRateLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 10, // Limit each IP to 10 login requests per window
  standardHeaders: true,
  legacyHeaders: false,
  handler: (req, res) => {
    return sendError(res, {
      statusCode: 429,
      code: 'TOO_MANY_REQUESTS',
      message: 'Too many login attempts from this IP address. Please try again after 15 minutes.'
    });
  }
});

// Public enquiry form: each submission sends a thank-you to the typed address, so cap it per
// email address (not per IP: without 'trust proxy', all visitors behind a host proxy share one IP).
export const enquiryRateLimiter = rateLimit({
  windowMs: 60 * 60 * 1000, // 1 hour
  max: 3,
  keyGenerator: (req) => String(req.body?.email || '').trim().toLowerCase() || 'no-email',
  standardHeaders: true,
  legacyHeaders: false,
  handler: (req, res) =>
    sendError(res, {
      statusCode: 429,
      code: 'TOO_MANY_REQUESTS',
      message: 'Too many enquiries for this email address. Please try again later or email contact@sushitaventures.com.'
    })
});
