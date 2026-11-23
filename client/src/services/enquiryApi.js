import { request } from './apiClient.js';

/**
 * Public Enquiry API Service
 * Submits lead generation and contact requests
 */
export const enquiryApi = {
  /**
   * Submit an enquiry
   * @param {Object} enquiryData 
   * @returns {Promise<Object>}
   */
  async submit(enquiryData) {
    return request('/public/enquiries', {
      method: 'POST',
      body: JSON.stringify(enquiryData)
    });
  }
};
