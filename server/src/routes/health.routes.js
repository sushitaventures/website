import { Router } from 'express';
import { checkHealth, checkReadiness } from '../controllers/health.controller.js';

const router = Router();

// GET /api/v1/health
router.get('/', checkHealth);

// GET /api/v1/health/ready
router.get('/ready', checkReadiness);

export default router;
