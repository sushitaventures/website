import mongoose from 'mongoose';

// Safe URL validator
const isValidUrl = (val) => {
  if (!val) return true;
  return /^(https?:\/\/|\/|#)/i.test(val);
};

const offerSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, 'Offer title is required'],
      trim: true,
      maxlength: [120, 'Title cannot exceed 120 characters']
    },
    shortDescription: {
      type: String,
      required: [true, 'Short description is required'],
      trim: true,
      maxlength: [300, 'Short description cannot exceed 300 characters']
    },
    fullDescription: {
      type: String,
      trim: true,
      maxlength: [2000, 'Full description cannot exceed 2000 characters'],
      default: ''
    },
    imageUrl: {
      type: String,
      trim: true,
      validate: {
        validator: isValidUrl,
        message: 'Image URL must be a valid HTTP/HTTPS or relative URL'
      },
      default: ''
    },
    ctaLabel: {
      type: String,
      trim: true,
      maxlength: [50, 'CTA label cannot exceed 50 characters'],
      default: ''
    },
    ctaUrl: {
      type: String,
      trim: true,
      validate: {
        validator: isValidUrl,
        message: 'CTA URL must be a valid URL or path'
      },
      default: ''
    },
    status: {
      type: String,
      enum: {
        values: ['draft', 'published', 'archived'],
        message: 'Status must be draft, published, or archived'
      },
      default: 'draft',
      index: true
    },
    active: {
      type: Boolean,
      default: false,
      index: true
    },
    startDate: {
      type: Date,
      default: null
    },
    endDate: {
      type: Date,
      default: null
    },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'AdminUser',
      default: null
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

// Compound index for public filtering
offerSchema.index({ status: 1, active: 1, startDate: 1, endDate: 1 });

export const Offer = mongoose.model('Offer', offerSchema);
