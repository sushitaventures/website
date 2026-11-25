import crypto from 'node:crypto';
import { AdminUser } from '../../models/AdminUser.js';
import { AdminSession } from '../../models/AdminSession.js';
import { sendSuccess, sendError } from '../../utils/response.js';
import bcrypt from 'bcryptjs';
import { env } from '../../config/env.js';
import { readSessionId } from '../../middlewares/auth.middleware.js';

const SESSION_DURATION_MS = 24 * 60 * 60 * 1000; // 24 hours

// Compared against when the email doesn't exist, so a wrong email takes as long as a
// wrong password — response timing can't be used to discover admin emails.
const DUMMY_PASSWORD_HASH = bcrypt.hashSync(crypto.randomBytes(16).toString('hex'), 12);

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (typeof email !== 'string' || typeof password !== 'string' || !email || !password) {
      return sendError(res, {
        statusCode: 400,
        code: 'VALIDATION_ERROR',
        message: 'Email and password are required'
      });
    }

    const normalizedEmail = email.trim().toLowerCase();
    const user = await AdminUser.findOne({ email: normalizedEmail }).select('+passwordHash');

    // Always run one bcrypt comparison (real or dummy) — constant-ish timing either way
    const isMatch = user
      ? await user.comparePassword(password)
      : await bcrypt.compare(password, DUMMY_PASSWORD_HASH).then(() => false);
    if (!user || !isMatch) {
      return sendError(res, {
        statusCode: 401,
        code: 'INVALID_CREDENTIALS',
        message: 'Invalid email or password'
      });
    }

    // Generate cryptographically secure session ID
    const sessionId = crypto.randomBytes(32).toString('hex');
    const expiresAt = new Date(Date.now() + SESSION_DURATION_MS);

    // Invalidate existing sessions for this user on login to rotate IDs
    await AdminSession.deleteMany({ userId: user._id });

    await AdminSession.create({
      sessionId,
      userId: user._id,
      email: user.email,
      userAgent: req.headers['user-agent'] || '',
      ipAddress: req.ip || '',
      expiresAt
    });

    user.lastLoginAt = new Date();
    await user.save();

    // Set secure HttpOnly cookie
    res.cookie('admin_session', sessionId, {
      httpOnly: true,
      secure: env.isProduction,
      sameSite: 'lax',
      maxAge: SESSION_DURATION_MS,
      path: '/'
    });

    return sendSuccess(res, {
      statusCode: 200,
      message: 'Login successful',
      data: {
        user: {
          id: user._id.toString(),
          email: user.email,
          role: user.role,
          lastLoginAt: user.lastLoginAt
        }
        // The session ID is deliberately NOT returned: it lives only in the HttpOnly
        // cookie, so injected scripts can never read it.
      }
    });
  } catch (error) {
    console.error('[AdminAuth] Login error:', error.message);
    return sendError(res, {
      statusCode: 500,
      code: 'LOGIN_FAILURE',
      message: 'An error occurred during authentication.'
    });
  }
};

export const logout = async (req, res) => {
  try {
    // Validated hex string only — never pass a raw cookie value into a Mongo filter
    const sessionId = readSessionId(req);

    if (sessionId) {
      await AdminSession.deleteOne({ sessionId });
    }

    res.clearCookie('admin_session', {
      httpOnly: true,
      secure: env.isProduction,
      sameSite: 'lax',
      path: '/'
    });

    return sendSuccess(res, {
      statusCode: 200,
      message: 'Logged out successfully'
    });
  } catch (error) {
    console.error('[AdminAuth] Logout error:', error.message);
    return sendError(res, {
      statusCode: 500,
      code: 'LOGOUT_FAILURE',
      message: 'An error occurred during logout.'
    });
  }
};

export const getMe = async (req, res) => {
  return sendSuccess(res, {
    statusCode: 200,
    message: 'Current administrator session retrieved',
    data: {
      user: req.adminUser
    }
  });
};
