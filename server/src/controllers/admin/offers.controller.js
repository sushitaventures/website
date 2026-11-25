import { Offer } from '../../models/Offer.js';
import { sendSuccess, sendError } from '../../utils/response.js';

export const getAllOffers = async (req, res) => {
  try {
    const { status, active } = req.query;
    const filter = {};

    if (status) {
      filter.status = status;
    }

    if (active !== undefined) {
      filter.active = active === 'true';
    }

    const offers = await Offer.find(filter)
      .sort({ createdAt: -1 })
      .populate('createdBy', 'email')
      .populate('updatedBy', 'email');

    return sendSuccess(res, {
      statusCode: 200,
      message: 'Offers retrieved successfully',
      data: {
        offers,
        count: offers.length
      }
    });
  } catch (error) {
    console.error('[AdminOffers] Fetch error:', error.message);
    return sendError(res, {
      statusCode: 500,
      code: 'FETCH_ERROR',
      message: 'Failed to retrieve offers.'
    });
  }
};

export const getOfferById = async (req, res) => {
  try {
    const { id } = req.params;
    const offer = await Offer.findById(id)
      .populate('createdBy', 'email')
      .populate('updatedBy', 'email');

    if (!offer) {
      return sendError(res, {
        statusCode: 404,
        code: 'NOT_FOUND',
        message: 'Offer not found'
      });
    }

    return sendSuccess(res, {
      statusCode: 200,
      message: 'Offer retrieved successfully',
      data: { offer }
    });
  } catch (error) {
    console.error('[AdminOffers] Fetch by ID error:', error.message);
    return sendError(res, {
      statusCode: 500,
      code: 'FETCH_ERROR',
      message: 'Failed to retrieve offer.'
    });
  }
};

export const createOffer = async (req, res) => {
  try {
    const {
      title,
      shortDescription,
      fullDescription,
      imageUrl,
      ctaLabel,
      ctaUrl,
      status,
      active,
      startDate,
      endDate
    } = req.body;

    if (!title || !shortDescription) {
      return sendError(res, {
        statusCode: 400,
        code: 'VALIDATION_ERROR',
        message: 'Title and short description are required fields.'
      });
    }

    const offer = await Offer.create({
      title: title.trim(),
      shortDescription: shortDescription.trim(),
      fullDescription: fullDescription ? fullDescription.trim() : '',
      imageUrl: imageUrl ? imageUrl.trim() : '',
      ctaLabel: ctaLabel ? ctaLabel.trim() : '',
      ctaUrl: ctaUrl ? ctaUrl.trim() : '',
      status: status || 'draft',
      active: active !== undefined ? Boolean(active) : false,
      startDate: startDate ? new Date(startDate) : null,
      endDate: endDate ? new Date(endDate) : null,
      createdBy: req.adminUser.id,
      updatedBy: req.adminUser.id
    });

    return sendSuccess(res, {
      statusCode: 201,
      message: 'Offer created successfully',
      data: { offer }
    });
  } catch (error) {
    console.error('[AdminOffers] Create error:', error.message);
    return sendError(res, {
      statusCode: 400,
      code: 'CREATE_ERROR',
      message: error.message || 'Failed to create offer.'
    });
  }
};

export const updateOffer = async (req, res) => {
  try {
    const { id } = req.params;
    // Only editable offer fields — never let the request body set createdBy, _id, timestamps, etc.
    const EDITABLE = ['title', 'shortDescription', 'fullDescription', 'imageUrl', 'ctaLabel', 'ctaUrl', 'status', 'active', 'startDate', 'endDate'];
    const updates = { updatedBy: req.adminUser.id };
    for (const key of EDITABLE) {
      if (req.body?.[key] !== undefined) updates[key] = req.body[key];
    }

    const offer = await Offer.findByIdAndUpdate(id, updates, {
      returnDocument: 'after',
      runValidators: true
    });

    if (!offer) {
      return sendError(res, {
        statusCode: 404,
        code: 'NOT_FOUND',
        message: 'Offer not found'
      });
    }

    return sendSuccess(res, {
      statusCode: 200,
      message: 'Offer updated successfully',
      data: { offer }
    });
  } catch (error) {
    console.error('[AdminOffers] Update error:', error.message);
    return sendError(res, {
      statusCode: 400,
      code: 'UPDATE_ERROR',
      message: error.message || 'Failed to update offer.'
    });
  }
};

export const deleteOffer = async (req, res) => {
  try {
    const { id } = req.params;
    const offer = await Offer.findByIdAndDelete(id);

    if (!offer) {
      return sendError(res, {
        statusCode: 404,
        code: 'NOT_FOUND',
        message: 'Offer not found'
      });
    }

    return sendSuccess(res, {
      statusCode: 200,
      message: 'Offer deleted successfully',
      data: { id }
    });
  } catch (error) {
    console.error('[AdminOffers] Delete error:', error.message);
    return sendError(res, {
      statusCode: 500,
      code: 'DELETE_ERROR',
      message: 'Failed to delete offer.'
    });
  }
};
