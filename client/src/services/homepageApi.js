import { request } from './apiClient.js';

/**
 * Public Homepage API Service
 * Interacts with public endpoints for active offers and video showcase
 */
export const homepageApi = {
  /**
   * Fetch active published homepage offers
   * @returns {Promise<Array>} Array of active offers
   */
  async getOffers() {
    try {
      const response = await request('/public/homepage/offers');
      return response?.data?.offers || [];
    } catch (err) {
      console.warn('Failed to fetch homepage offers:', err.message);
      return [];
    }
  },

  /**
   * Fetch active homepage video configuration
   * @returns {Promise<Object|null>} Video configuration or null
   */
  async getVideo() {
    try {
      const response = await request('/public/homepage/video');
      return response?.data?.video || null;
    } catch (err) {
      console.warn('Failed to fetch homepage video:', err.message);
      return null;
    }
  }
};
