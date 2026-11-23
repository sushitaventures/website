import { apiClient } from './apiClient.js';

export const getHealth = async () => {
  return apiClient.get('/health');
};

export const getReadiness = async () => {
  return apiClient.get('/health/ready');
};
