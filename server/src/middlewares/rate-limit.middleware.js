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
