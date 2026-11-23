import { Offer } from '../../models/Offer.js';
import { HomepageVideoConfiguration } from '../../models/HomepageVideoConfiguration.js';
import { sendSuccess, sendError } from '../../utils/response.js';

export const getPublicOffers = async (req, res) => {
  try {
    // If database connection is not ready (e.g. unconfigured in development), return empty array gracefully
    if (Offer.db.readyState !== 1) {
      return sendSuccess(res, {
        statusCode: 200,
        message: 'Database unconfigured in development; returning empty offers.',
        data: { offers: [], count: 0 }
      });
    }

    const now = new Date();

    const query = {
      status: 'published',
      active: true,
      $and: [
        {
          $or: [
            { startDate: null },
            { startDate: { $lte: now } }
          ]
        },
        {
          $or: [
            { endDate: null },
            { endDate: { $gte: now } }
          ]
        }
      ]
    };

    const offers = await Offer.find(query)
      .select('title shortDescription fullDescription imageUrl ctaLabel ctaUrl updatedAt')
      .sort({ updatedAt: -1 })
      .lean();

    return sendSuccess(res, {
      statusCode: 200,
      message: 'Active published offers retrieved successfully',
      data: {
        offers,
        count: offers.length
      }
    });
  } catch (error) {
    console.error('[PublicHomepage] Error fetching offers:', error.message);
    return sendError(res, {
      statusCode: 500,
      code: 'PUBLIC_OFFERS_ERROR',
      message: 'Failed to retrieve promotional offers.'
    });
  }
};

export const getPublicVideo = async (req, res) => {
  try {
    // If database connection is not ready (e.g. unconfigured in development), return null gracefully
    if (HomepageVideoConfiguration.db.readyState !== 1) {
      return sendSuccess(res, {
        statusCode: 200,
        message: 'Database unconfigured in development; returning null video.',
        data: { video: null }
      });
    }

    const config = await HomepageVideoConfiguration.findOne({ active: true })
      .select('youtubeUrl videoId embedUrl title autoplay muted loop updatedAt')
      .lean();

    if (!config) {
      return sendSuccess(res, {
        statusCode: 200,
        message: 'No active homepage video currently configured',
        data: { video: null }
      });
    }

    return sendSuccess(res, {
      statusCode: 200,
      message: 'Active homepage video configuration retrieved successfully',
      data: {
        video: {
          videoId: config.videoId,
          embedUrl: config.embedUrl,
          title: config.title,
          autoplay: config.autoplay,
          muted: config.muted,
          loop: config.loop,
          updatedAt: config.updatedAt
        }
      }
    });
  } catch (error) {
    console.error('[PublicHomepage] Error fetching video:', error.message);
    return sendError(res, {
      statusCode: 500,
      code: 'PUBLIC_VIDEO_ERROR',
      message: 'Failed to retrieve homepage video.'
    });
  }
};
