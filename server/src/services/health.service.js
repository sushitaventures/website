import { env } from '../config/env.js';
import { getDatabaseStatus } from '../config/database.js';

export const getHealthData = () => {
  return {
    status: 'healthy',
    uptimeSeconds: Math.floor(process.uptime()),
    timestamp: new Date().toISOString(),
    environment: env.NODE_ENV
  };
};

export const getReadinessData = () => {
  const dbStatus = getDatabaseStatus();
  const isHealthy = env.isDevelopment ? true : dbStatus.status === 'connected';

  return {
    ready: isHealthy,
    status: isHealthy ? 'ready' : 'degraded',
    service: 'luxury-real-estate-api',
    environment: env.NODE_ENV,
    timestamp: new Date().toISOString(),
    database: dbStatus
  };
};
