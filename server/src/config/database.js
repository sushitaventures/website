import mongoose from 'mongoose';
import { env } from './env.js';

let isConfigured = false;
let connectionAttempted = false;
let lastError = null;

export const connectDatabase = async () => {
  connectionAttempted = true;

  if (!env.MONGODB_URI) {
    isConfigured = false;
    if (env.isProduction) {
      throw new Error('[Database] Missing MONGODB_URI in production environment.');
    }
    console.warn('[Database] MONGODB_URI is unconfigured. Running in development mode without active database connection.');
    return;
  }

  isConfigured = true;

  try {
    mongoose.connection.on('connected', () => {
      console.log('[Database] MongoDB connection established successfully.');
      lastError = null;
    });

    mongoose.connection.on('error', (err) => {
      console.error('[Database] MongoDB connection runtime error:', err.message);
      lastError = err.message;
    });

    mongoose.connection.on('disconnected', () => {
      console.warn('[Database] MongoDB connection lost/disconnected.');
    });

    await mongoose.connect(env.MONGODB_URI, {
      serverSelectionTimeoutMS: 5000,
      autoIndex: !env.isProduction
    });
  } catch (error) {
    lastError = error.message;
    console.error('[Database] Failed to connect to MongoDB:', error.message);
    if (env.isProduction) {
      throw error;
    }
    // In development, we do not crash the server so health/readiness testing remains operational.
  }
};

export const disconnectDatabase = async () => {
  if (mongoose.connection.readyState !== 0) {
    try {
      await mongoose.connection.close();
      console.log('[Database] MongoDB connection closed gracefully.');
    } catch (err) {
      console.error('[Database] Error while closing MongoDB connection:', err.message);
    }
  }
};

export const getDatabaseStatus = () => {
  const readyStates = {
    0: 'disconnected',
    1: 'connected',
    2: 'connecting',
    3: 'disconnecting'
  };

  const currentReadyState = mongoose.connection.readyState;
  const statusString = readyStates[currentReadyState] || 'unknown';

  if (!env.MONGODB_URI) {
    return {
      configured: false,
      status: 'unconfigured',
      message: 'MongoDB URI is not provided in environment settings.'
    };
  }

  if (currentReadyState === 1) {
    return {
      configured: true,
      status: 'connected',
      name: mongoose.connection.name || 'default',
      host: mongoose.connection.host || 'remote'
    };
  }

  return {
    configured: true,
    status: statusString,
    message: lastError ? `Connection error: ${lastError}` : 'Database is not connected.'
  };
};
