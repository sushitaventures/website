import { AdminSession } from '../models/AdminSession.js';
import { AdminUser } from '../models/AdminUser.js';
import { sendError } from '../utils/response.js';

// Session IDs are 32 random bytes as hex (see auth.controller login).
const SESSION_ID_PATTERN = /^[a-f0-9]{64}$/;

/**
 * Read the session ID from the cookie or a Bearer header — and only accept a plain
 * 64-char hex string. This check is a security boundary: cookie-parser turns cookies
 * prefixed "j:" into JSON objects, so without it `admin_session=j:{"$ne":null}` would
 * reach Mongo as a query operator and match ANY session (full auth bypass).
 */
export const readSessionId = (req) => {
  let sessionId = req.cookies?.admin_session;

  // Fallback for API clients / automated testing with Authorization header
  if (!sessionId && typeof req.headers.authorization === 'string') {
    const parts = req.headers.authorization.split(' ');
    if (parts.length === 2 && parts[0] === 'Bearer') {
      sessionId = parts[1];
    }
  }

  return typeof sessionId === 'string' && SESSION_ID_PATTERN.test(sessionId) ? sessionId : null;
};

export const requireAdmin = async (req, res, next) => {
  try {
    const sessionId = readSessionId(req);

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
