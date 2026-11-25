/**
 * Centralized API Client
 * Automatically prepends VITE_API_BASE_URL (defaults to /api/v1)
 */

const BASE_URL = import.meta.env.VITE_API_BASE_URL || '/api/v1';

class ApiClientError extends Error {
  constructor(message, statusCode, code, details) {
    super(message);
    this.name = 'ApiClientError';
    this.statusCode = statusCode;
    this.code = code;
    this.details = details;
  }
}

export const request = async (endpoint, options = {}) => {
  const url = `${BASE_URL}${endpoint.startsWith('/') ? endpoint : `/${endpoint}`}`;

  const headers = {
    'Content-Type': 'application/json',
    ...(options.headers || {})
  };

  const config = {
    ...options,
    headers,
    // Send the HttpOnly admin_session cookie when the API is on another origin
    // (e.g. site on domain.com, API on api.domain.com). Server CORS allows credentials
    // only for CLIENT_ORIGIN.
    credentials: 'include'
  };

  try {
    const response = await fetch(url, config);
    const contentType = response.headers.get('content-type');
    const isJson = contentType && contentType.includes('application/json');
    const payload = isJson ? await response.json() : await response.text();

    if (!response.ok) {
      const errorMessage = payload?.error?.message || payload?.message || `Request failed with status ${response.status}`;
      const errorCode = payload?.error?.code || 'API_ERROR';
      const errorDetails = payload?.error?.details || null;
      throw new ApiClientError(errorMessage, response.status, errorCode, errorDetails);
    }

    return payload;
  } catch (error) {
    if (error instanceof ApiClientError) {
      throw error;
    }
    throw new ApiClientError(
      error.message || 'Network request failed',
      0,
      'NETWORK_ERROR',
      null
    );
  }
};

export const apiClient = {
  get: (endpoint, options) => request(endpoint, { ...options, method: 'GET' }),
  post: (endpoint, body, options) => request(endpoint, { ...options, method: 'POST', body: JSON.stringify(body) }),
  put: (endpoint, body, options) => request(endpoint, { ...options, method: 'PUT', body: JSON.stringify(body) }),
  patch: (endpoint, body, options) => request(endpoint, { ...options, method: 'PATCH', body: JSON.stringify(body) }),
  delete: (endpoint, options) => request(endpoint, { ...options, method: 'DELETE' })
};
