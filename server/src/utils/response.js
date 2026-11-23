/**
 * Standardized API response formatters
 */

export const sendSuccess = (res, { statusCode = 200, message = 'Request completed', data = null, meta = null }) => {
  const payload = {
    success: true,
    message
  };

  if (data !== null) {
    payload.data = data;
  }

  if (meta !== null) {
    payload.meta = meta;
  }

  return res.status(statusCode).json(payload);
};

export const sendError = (res, { statusCode = 500, code = 'INTERNAL_SERVER_ERROR', message = 'Something went wrong', details = null }) => {
  const payload = {
    success: false,
    error: {
      code,
      message
    }
  };

  if (details !== null) {
    payload.error.details = details;
  }

  return res.status(statusCode).json(payload);
};
