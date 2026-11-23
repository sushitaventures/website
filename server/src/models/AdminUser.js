import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

const adminUserSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: [true, 'Email is required'],
      unique: true,
      lowercase: true,
      trim: true,
      match: [/^\S+@\S+\.\S+$/, 'Please enter a valid email address']
    },
    passwordHash: {
      type: String,
      required: [true, 'Password hash is required'],
      select: false
    },
    role: {
      type: String,
      enum: ['admin', 'superadmin'],
      default: 'admin'
    },
    lastLoginAt: {
      type: Date,
      default: null
    }
  },
  {
    timestamps: true
  }
);

// Method to verify candidate password
adminUserSchema.methods.comparePassword = async function (candidatePassword) {
  if (!this.passwordHash) {
    return false;
  }
  return bcrypt.compare(candidatePassword, this.passwordHash);
};

// Static method to securely hash a password
adminUserSchema.statics.hashPassword = async function (plainPassword) {
  if (!plainPassword || plainPassword.length < 8) {
    throw new Error('Password must be at least 8 characters long');
  }
  const salt = await bcrypt.genSalt(12);
  return bcrypt.hash(plainPassword, salt);
};

export const AdminUser = mongoose.model('AdminUser', adminUserSchema);
