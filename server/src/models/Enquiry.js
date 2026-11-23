import mongoose from 'mongoose';

const enquirySchema = new mongoose.Schema(
  {
    fullName: {
      type: String,
      required: [true, 'Full name is required'],
      trim: true,
      maxlength: [120, 'Full name cannot exceed 120 characters']
    },
    phoneNumber: {
      type: String,
      required: [true, 'Phone number is required'],
      trim: true,
      maxlength: [30, 'Phone number cannot exceed 30 characters']
    },
    email: {
      type: String,
      required: [true, 'Email address is required'],
      trim: true,
      lowercase: true,
      match: [/^\S+@\S+\.\S+$/, 'Please provide a valid email address']
    },
    city: {
      type: String,
      required: [true, 'City or location is required'],
      trim: true,
      maxlength: [100, 'City cannot exceed 100 characters']
    },
    lookingFor: {
      type: String,
      required: [true, 'Category of interest is required'],
      enum: {
        values: [
          'Residential Property',
          'Commercial Property',
          'Industrial Property',
          'Land / Plots',
          'Hotels / Hospitality',
          'Leasing',
          'Exchange Property',
          'Sick Property',
          'Other'
        ],
        message: '{VALUE} is not a supported enquiry category'
      }
    },
    requirement: {
      type: String,
      trim: true,
      maxlength: [3000, 'Requirement description cannot exceed 3000 characters'],
      default: ''
    },
    status: {
      type: String,
      enum: ['new', 'contacted', 'in_discussion', 'resolved', 'archived'],
      default: 'new'
    },
    source: {
      type: String,
      default: 'website_contact_form'
    },
    ipAddress: {
      type: String,
      default: ''
    },
    userAgent: {
      type: String,
      default: ''
    }
  },
  {
    timestamps: true
  }
);

enquirySchema.index({ createdAt: -1 });
enquirySchema.index({ status: 1, createdAt: -1 });
enquirySchema.index({ lookingFor: 1 });

export const Enquiry = mongoose.model('Enquiry', enquirySchema);
