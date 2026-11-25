import dotenv from 'dotenv';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Load .env relative to server root
dotenv.config({ path: path.resolve(__dirname, '../../.env') });

export const env = {
  NODE_ENV: process.env.NODE_ENV || 'development',
  PORT: Number.parseInt(process.env.PORT, 10) || 5000,
  CLIENT_ORIGIN: process.env.CLIENT_ORIGIN || 'http://localhost:5173',
  MONGODB_URI: process.env.MONGODB_URI || '',
  LOG_LEVEL: process.env.LOG_LEVEL || 'info',

  // Outgoing mail (Nodemailer SMTP). Mail is skipped — and leads are marked
  // "not_configured" — until SMTP_HOST, SMTP_USER and SMTP_PASS are set.
  // Who receives lead emails is set in the admin panel (default contact@sushitaventures.com).
  SMTP_HOST: process.env.SMTP_HOST || '',
  SMTP_PORT: Number.parseInt(process.env.SMTP_PORT, 10) || 587,
  SMTP_SECURE: process.env.SMTP_SECURE === 'true', // true for port 465, false for 587 (STARTTLS)
  SMTP_USER: process.env.SMTP_USER || '',
  SMTP_PASS: process.env.SMTP_PASS || '',
  MAIL_FROM: process.env.MAIL_FROM || process.env.SMTP_USER || '',
  isProduction: process.env.NODE_ENV === 'production',
  isDevelopment: process.env.NODE_ENV === 'development',
  isTest: process.env.NODE_ENV === 'test'
};

// Validate environment integrity
export const validateEnv = () => {
  if (env.isProduction) {
    if (!env.MONGODB_URI) {
      throw new Error('[ConfigError] MONGODB_URI is required when running in production mode.');
    }
    if (!env.CLIENT_ORIGIN) {
      throw new Error('[ConfigError] CLIENT_ORIGIN is required when running in production mode.');
    }
  }
};
