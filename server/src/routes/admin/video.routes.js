import { Router } from 'express';
import {
  getVideoConfiguration,
  updateVideoConfiguration
} from '../../controllers/admin/video.controller.js';
import { requireAdmin } from '../../middlewares/auth.middleware.js';

const router = Router();

// Protect all admin video routes
router.use(requireAdmin);

// GET /api/v1/admin/homepage/video
router.get('/', getVideoConfiguration);

// PUT /api/v1/admin/homepage/video
router.put('/', updateVideoConfiguration);

export default router;
