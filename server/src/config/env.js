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
