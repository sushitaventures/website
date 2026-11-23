import mongoose from 'mongoose';

const adminSessionSchema = new mongoose.Schema(
  {
    sessionId: {
      type: String,
      required: true,
      unique: true,
      index: true
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'AdminUser',
      required: true,
      index: true
    },
    email: {
      type: String,
      required: true
    },
    userAgent: {
      type: String,
      default: ''
    },
    ipAddress: {
      type: String,
      default: ''
    },
    expiresAt: {
      type: Date,
      required: true,
      index: { expires: 0 } // MongoDB TTL index to auto-remove expired sessions
    },
    lastActiveAt: {
      type: Date,
      default: Date.now
    }
  },
  {
    timestamps: true
  }
);

export const AdminSession = mongoose.model('AdminSession', adminSessionSchema);
