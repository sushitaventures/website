import { Router } from 'express';
import { login, logout, getMe } from '../../controllers/admin/auth.controller.js';
import { requireAdmin } from '../../middlewares/auth.middleware.js';
import { loginRateLimiter } from '../../middlewares/rate-limit.middleware.js';

const router = Router();

// POST /api/v1/admin/auth/login
router.post('/login', loginRateLimiter, login);

// POST /api/v1/admin/auth/logout
router.post('/logout', logout);

// GET /api/v1/admin/auth/me
router.get('/me', requireAdmin, getMe);

export default router;
