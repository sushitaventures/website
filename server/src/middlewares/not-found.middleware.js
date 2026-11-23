import { sendError } from '../utils/response.js';

export const notFoundHandler = (req, res) => {
  return sendError(res, {
    statusCode: 404,
    code: 'ROUTE_NOT_FOUND',
    message: `Cannot ${req.method} ${req.originalUrl}`
  });
};
