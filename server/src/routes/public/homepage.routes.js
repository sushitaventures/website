import { Router } from 'express';
import {
  getPublicOffers,
  getPublicVideo
} from '../../controllers/public/homepage.controller.js';

const router = Router();

// GET /api/v1/public/homepage/offers
router.get('/offers', getPublicOffers);

// GET /api/v1/public/homepage/video
router.get('/video', getPublicVideo);

export default router;
