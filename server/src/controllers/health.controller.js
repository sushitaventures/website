import { sendSuccess } from '../utils/response.js';
import * as healthService from '../services/health.service.js';

export const checkHealth = (req, res) => {
  const data = healthService.getHealthData();
  return sendSuccess(res, {
    statusCode: 200,
    message: 'API is operational',
    data
  });
};

export const checkReadiness = (req, res) => {
  const readiness = healthService.getReadinessData();
  const statusCode = readiness.ready ? 200 : 503;

  return sendSuccess(res, {
    statusCode,
    message: readiness.ready ? 'Service is ready' : 'Service is not fully ready',
    data: readiness
  });
};
