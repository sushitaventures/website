import { HomepageVideoConfiguration } from '../../models/HomepageVideoConfiguration.js';
import { parseYouTubeUrl } from '../../utils/youtube.js';
import { sendSuccess, sendError } from '../../utils/response.js';

export const getVideoConfiguration = async (req, res) => {
  try {
    const config = await HomepageVideoConfiguration.findOne()
      .populate('updatedBy', 'email');

    return sendSuccess(res, {
      statusCode: 200,
      message: 'Homepage video configuration retrieved',
      data: {
        config: config || null
      }
    });
  } catch (error) {
    console.error('[AdminVideo] Fetch error:', error.message);
    return sendError(res, {
      statusCode: 500,
      code: 'FETCH_ERROR',
      message: 'Failed to retrieve video configuration.'
    });
  }
};

export const updateVideoConfiguration = async (req, res) => {
  try {
    const { youtubeUrl, title, active, autoplay, muted, loop } = req.body;

    if (!youtubeUrl) {
      return sendError(res, {
        statusCode: 400,
        code: 'VALIDATION_ERROR',
        message: 'YouTube URL is required.'
      });
    }

    const validation = parseYouTubeUrl(youtubeUrl);
    if (!validation.isValid) {
      return sendError(res, {
        statusCode: 400,
        code: 'INVALID_YOUTUBE_URL',
        message: validation.error || 'Invalid YouTube URL provided.'
      });
    }

    let config = await HomepageVideoConfiguration.findOne();

    const payload = {
      youtubeUrl: validation.canonicalUrl,
      videoId: validation.videoId,
      embedUrl: validation.embedUrl,
      title: title !== undefined ? title.trim() : (config?.title || ''),
      active: active !== undefined ? Boolean(active) : true,
      autoplay: autoplay !== undefined ? Boolean(autoplay) : true,
      muted: muted !== undefined ? Boolean(muted) : true,
      loop: loop !== undefined ? Boolean(loop) : true,
      updatedBy: req.adminUser.id
    };

    if (config) {
      Object.assign(config, payload);
      await config.save();
    } else {
      config = await HomepageVideoConfiguration.create(payload);
    }

    return sendSuccess(res, {
      statusCode: 200,
      message: 'Homepage video configuration updated successfully',
      data: { config }
    });
  } catch (error) {
    console.error('[AdminVideo] Update error:', error.message);
    return sendError(res, {
      statusCode: 400,
      code: 'UPDATE_ERROR',
      message: error.message || 'Failed to update video configuration.'
    });
  }
};
