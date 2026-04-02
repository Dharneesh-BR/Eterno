// Authentication utility functions

/**
 * Get the authentication token from localStorage
 * @returns {string|null} The JWT token or null if not found
 */
export const getAuthToken = () => {
  try {
    const token = localStorage.getItem('auth_token');
    return token || null;
  } catch (error) {
    console.error('Error getting auth token:', error);
    return null;
  }
};

/**
 * Check if user is authenticated
 * @returns {boolean} True if token exists and is not expired
 */
export const isAuthenticated = () => {
  const token = getAuthToken();
  if (!token) return false;

  try {
    // Decode JWT to check expiration (basic check)
    const payload = JSON.parse(atob(token.split('.')[1]));
    const currentTime = Date.now() / 1000;
    return payload.exp > currentTime;
  } catch (error) {
    console.error('Error checking authentication:', error);
    return false;
  }
};

/**
 * Logout user by clearing localStorage
 */
export const logout = () => {
  try {
    localStorage.removeItem('auth_token');
    // You can also clear other auth-related items if needed
    localStorage.removeItem('user_data');
  } catch (error) {
    console.error('Error during logout:', error);
  }
};

/**
 * Set the authentication token in localStorage
 * @param {string} token - The JWT token to store
 */
export const setAuthToken = (token) => {
  try {
    localStorage.setItem('auth_token', token);
  } catch (error) {
    console.error('Error setting auth token:', error);
  }
};

/**
 * Get user data from token (basic JWT decode)
 * @returns {object|null} User data or null if invalid
 */
export const getUserData = () => {
  const token = getAuthToken();
  if (!token) return null;

  try {
    const payload = JSON.parse(atob(token.split('.')[1]));
    return payload;
  } catch (error) {
    console.error('Error decoding token:', error);
    return null;
  }
};

/**
 * Setup axios interceptor for authenticated requests
 * @param {object} axiosInstance - Axios instance to configure
 */
export const setupAxiosAuth = (axiosInstance) => {
  // Request interceptor
  axiosInstance.interceptors.request.use(
    (config) => {
      const token = getAuthToken();
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );

  // Response interceptor for 401 handling
  axiosInstance.interceptors.response.use(
    (response) => response,
    (error) => {
      if (error.response?.status === 401) {
        // Token expired or invalid
        logout();
        window.location.href = '/login';
      }
      return Promise.reject(error);
    }
  );
};
