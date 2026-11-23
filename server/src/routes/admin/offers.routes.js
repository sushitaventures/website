import { Router } from 'express';
import {
  getAllOffers,
  getOfferById,
  createOffer,
  updateOffer,
  deleteOffer
} from '../../controllers/admin/offers.controller.js';
import { requireAdmin } from '../../middlewares/auth.middleware.js';

const router = Router();

// Protect all admin offer routes
router.use(requireAdmin);

// GET /api/v1/admin/offers
router.get('/', getAllOffers);

// GET /api/v1/admin/offers/:id
router.get('/:id', getOfferById);

// POST /api/v1/admin/offers
router.post('/', createOffer);

// PATCH /api/v1/admin/offers/:id
router.patch('/:id', updateOffer);

// DELETE /api/v1/admin/offers/:id
router.delete('/:id', deleteOffer);

export default router;
