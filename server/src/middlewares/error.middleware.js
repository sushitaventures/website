import { sendError } from '../utils/response.js';
import { env } from '../config/env.js';

export const errorHandler = (err, req, res, next) => {
  console.error(`[Error] Unhandled error during request ${req.method} ${req.originalUrl}:`, err);

  // Handle malformed JSON request bodies
  if (err instanceof SyntaxError && err.status === 400 && 'body' in err) {
    return sendError(res, {
      statusCode: 400,
      code: 'INVALID_JSON_PAYLOAD',
      message: 'Malformed JSON payload in request body.'
    });
  }

  // Handle CORS restrictions
  if (err.message && err.message.includes('CORS')) {
    return sendError(res, {
      statusCode: 403,
      code: 'CORS_FORBIDDEN',
      message: 'Cross-Origin Request blocked by policy.'
    });
  }

  const statusCode = err.statusCode || err.status || 500;
  const code = err.code || 'INTERNAL_SERVER_ERROR';
  const message = err.isOperational || env.isDevelopment ? err.message : 'An unexpected internal error occurred.';

  return sendError(res, {
    statusCode,
    code,
    message,
    details: env.isDevelopment ? { stack: err.stack } : null
  });
};
