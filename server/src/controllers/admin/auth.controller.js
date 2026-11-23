import crypto from 'node:crypto';
import { AdminUser } from '../../models/AdminUser.js';
import { AdminSession } from '../../models/AdminSession.js';
import { sendSuccess, sendError } from '../../utils/response.js';
import { env } from '../../config/env.js';

const SESSION_DURATION_MS = 24 * 60 * 60 * 1000; // 24 hours

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return sendError(res, {
        statusCode: 400,
        code: 'VALIDATION_ERROR',
        message: 'Email and password are required'
      });
    }

    const normalizedEmail = email.trim().toLowerCase();
    const user = await AdminUser.findOne({ email: normalizedEmail }).select('+passwordHash');

    if (!user) {
      return sendError(res, {
        statusCode: 401,
        code: 'INVALID_CREDENTIALS',
        message: 'Invalid email or password'
      });
    }

    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
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
        },
        sessionId // Returned for programmatic client / test flexibility
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
    let sessionId = req.cookies?.admin_session || req.adminSession?.sessionId;

    if (!sessionId && req.headers.authorization) {
      const parts = req.headers.authorization.split(' ');
      if (parts.length === 2 && parts[0] === 'Bearer') {
        sessionId = parts[1];
      }
    }

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
