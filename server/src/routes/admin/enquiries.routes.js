import { Router } from 'express';
import {
  listEnquiries,
  getEnquiry,
  updateEnquiryStatus,
  resendEnquiryEmail,
  getRecipients,
  updateRecipients
} from '../../controllers/admin/enquiries.controller.js';
import { requireAdmin } from '../../middlewares/auth.middleware.js';

const router = Router();

router.use(requireAdmin);

// GET /api/v1/admin/enquiries
router.get('/', listEnquiries);

// Lead notification recipients (registered before /:id so "settings" isn't read as an id)
router.get('/settings/recipients', getRecipients);
router.put('/settings/recipients', updateRecipients);

// GET /api/v1/admin/enquiries/:id
router.get('/:id', getEnquiry);

// PATCH /api/v1/admin/enquiries/:id
router.patch('/:id', updateEnquiryStatus);

// POST /api/v1/admin/enquiries/:id/resend-email
router.post('/:id/resend-email', resendEnquiryEmail);

export default router;
