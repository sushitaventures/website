import { Router } from 'express';
import { submitEnquiry } from '../../controllers/public/enquiry.controller.js';

const router = Router();

// POST /api/v1/public/enquiries - Submit lead / contact enquiry
router.post('/', submitEnquiry);

export default router;
