import mongoose from 'mongoose';

export const DEFAULT_ENQUIRY_RECIPIENT = 'contact@sushitaventures.com';

// Single document (key: 'enquiry') holding who receives new-lead emails. Edited from the admin panel.
const notificationSettingsSchema = new mongoose.Schema(
  {
    key: { type: String, required: true, unique: true, default: 'enquiry' },
    recipients: {
      type: [String],
      default: [DEFAULT_ENQUIRY_RECIPIENT],
      validate: {
        validator: (list) =>
          list.length >= 1 && list.length <= 10 && list.every((e) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(e)),
        message: 'Provide between 1 and 10 valid email addresses.'
      }
    },
    updatedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'AdminUser', default: null }
  },
  { timestamps: true }
);

export const NotificationSettings = mongoose.model('NotificationSettings', notificationSettingsSchema);

/** Current lead recipients: admin-saved list, else the default inbox. */
export const getEnquiryRecipients = async () => {
  if (NotificationSettings.db.readyState === 1) {
    const doc = await NotificationSettings.findOne({ key: 'enquiry' }).lean().catch(() => null);
    if (doc?.recipients?.length) return doc.recipients;
  }
  return [DEFAULT_ENQUIRY_RECIPIENT];
};
