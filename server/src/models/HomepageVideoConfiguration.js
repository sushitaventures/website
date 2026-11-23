import mongoose from 'mongoose';

const homepageVideoConfigurationSchema = new mongoose.Schema(
  {
    youtubeUrl: {
      type: String,
      required: [true, 'YouTube URL is required'],
      trim: true
    },
    videoId: {
      type: String,
      required: [true, 'YouTube Video ID is required'],
      trim: true,
      length: 11
    },
    embedUrl: {
      type: String,
      required: [true, 'Embed URL is required'],
      trim: true
    },
    title: {
      type: String,
      trim: true,
      maxlength: [150, 'Title cannot exceed 150 characters'],
      default: ''
    },
    active: {
      type: Boolean,
      default: true
    },
    autoplay: {
      type: Boolean,
      default: true
    },
    muted: {
      type: Boolean,
      default: true
    },
    loop: {
      type: Boolean,
      default: true
    },
    updatedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'AdminUser',
      default: null
    }
  },
  {
    timestamps: true
  }
);

export const HomepageVideoConfiguration = mongoose.model(
  'HomepageVideoConfiguration',
  homepageVideoConfigurationSchema
);
