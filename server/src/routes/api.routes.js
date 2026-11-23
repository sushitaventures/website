import { Router } from 'express';
import healthRoutes from './health.routes.js';
import { checkReadiness } from '../controllers/health.controller.js';
import adminAuthRoutes from './admin/auth.routes.js';
import adminOfferRoutes from './admin/offers.routes.js';
import adminVideoRoutes from './admin/video.routes.js';
import publicHomepageRoutes from './public/homepage.routes.js';
import publicEnquiryRoutes from './public/enquiry.routes.js';

const router = Router();

// Infrastructure & Probes
router.use('/health', healthRoutes);
router.get('/ready', checkReadiness);

// Admin Authentication & Session
router.use('/admin/auth', adminAuthRoutes);

// Admin Content Management (Protected)
router.use('/admin/offers', adminOfferRoutes);
router.use('/admin/homepage/video', adminVideoRoutes);

// Public APIs (Unauthenticated)
router.use('/public/homepage', publicHomepageRoutes);
router.use('/public/enquiries', publicEnquiryRoutes);

export default router;
