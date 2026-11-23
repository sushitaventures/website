import { AdminSession } from '../models/AdminSession.js';
import { AdminUser } from '../models/AdminUser.js';
import { sendError } from '../utils/response.js';

export const requireAdmin = async (req, res, next) => {
  try {
    let sessionId = req.cookies?.admin_session;

    // Fallback for API clients / automated testing with Authorization header
    if (!sessionId && req.headers.authorization) {
      const parts = req.headers.authorization.split(' ');
      if (parts.length === 2 && parts[0] === 'Bearer') {
        sessionId = parts[1];
      }
    }

    if (!sessionId) {
      return sendError(res, {
        statusCode: 401,
        code: 'UNAUTHORIZED',
        message: 'Authentication session required. Please sign in.'
      });
    }

    const session = await AdminSession.findOne({ sessionId });
    if (!session) {
      // Clear invalid cookie
      res.clearCookie('admin_session');
      return sendError(res, {
        statusCode: 401,
        code: 'SESSION_INVALID',
        message: 'Session has expired or is invalid. Please sign in again.'
      });
    }

    if (new Date() > session.expiresAt) {
      await AdminSession.deleteOne({ _id: session._id });
      res.clearCookie('admin_session');
      return sendError(res, {
        statusCode: 401,
        code: 'SESSION_EXPIRED',
        message: 'Session has expired. Please sign in again.'
      });
    }

    const user = await AdminUser.findById(session.userId);
    if (!user) {
      await AdminSession.deleteOne({ _id: session._id });
      res.clearCookie('admin_session');
      return sendError(res, {
        statusCode: 401,
        code: 'USER_NOT_FOUND',
        message: 'Associated administrator account not found.'
      });
    }

    // Refresh last active timestamp asynchronously
    AdminSession.updateOne({ _id: session._id }, { lastActiveAt: new Date() }).exec().catch(() => {});

    req.adminUser = {
      id: user._id.toString(),
      email: user.email,
      role: user.role
    };
    req.adminSession = session;

    next();
  } catch (error) {
    console.error('[AuthMiddleware] Error validating session:', error.message);
    return sendError(res, {
      statusCode: 500,
      code: 'AUTH_ERROR',
      message: 'Failed to authenticate session.'
    });
  }
};
