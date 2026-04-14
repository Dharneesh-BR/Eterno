/**
 * Meta Pixel Configuration for Production
 * Environment-specific settings and configurations
 */

// Meta Pixel Configuration
export const META_PIXEL_CONFIG = {
  // Pixel ID (Production)
  PIXEL_ID: '2390949768036183',
  
  // Environment settings
  ENVIRONMENT: import.meta.env.MODE || 'development',
  
  // Enable/disable tracking based on environment
  ENABLE_TRACKING: import.meta.env.PROD || import.meta.env.VITE_ENABLE_PIXEL_TRACKING === 'true',
  
  // Debug mode (only in development)
  DEBUG_MODE: import.meta.env.DEV,
  
  // Advanced Matching (requires user consent)
  ENABLE_ADVANCED_MATCHING: import.meta.env.PROD,
  
  // Automatic PageView tracking
  AUTO_PAGEVIEW: true,
  
  // Event delay for debugging (ms)
  EVENT_DELAY: import.meta.env.DEV ? 100 : 0,
  
  // Consent management
  REQUIRE_CONSENT: false, // Set to true if you implement consent management
  
  // Data retention settings
  DATA_RETENTION: {
    // Facebook's default data retention period
    RETENTION_DAYS: 180,
    
    // Enable first-party cookies
    FIRST_PARTY_COOKIES: true,
    
    // Cookie domain (auto-detect if not specified)
    COOKIE_DOMAIN: window?.location?.hostname || null
  }
};

// Pixel event mappings
export const EVENT_MAPPINGS = {
  // User journey events
  USER_ACTIONS: {
    LANDING_PAGE_VIEW: 'PageView',
    CTA_CLICK: 'CTAClick',
    BOOKING_INITIATED: 'BookingInitiated',
    PAYMENT_INITIATED: 'InitiateCheckout',
    PAYMENT_SUCCESS: 'Purchase',
    DOWNLOAD_APP: 'DownloadApp'
  },
  
  // Standard Facebook events
  STANDARD_EVENTS: {
    LEAD: 'Lead',
    COMPLETE_REGISTRATION: 'CompleteRegistration',
    PURCHASE: 'Purchase',
    ADD_TO_CART: 'AddToCart',
    INITIATE_CHECKOUT: 'InitiateCheckout',
    ADD_PAYMENT_INFO: 'AddPaymentInfo',
    VIEW_CONTENT: 'ViewContent',
    SEARCH: 'Search'
  },
  
  // Custom events
  CUSTOM_EVENTS: {
    OTP_SUCCESS: 'OTPSuccess',
    PAYMENT_SUCCESS: 'PaymentSuccess',
    FORM_SUBMIT: 'FormSubmit',
    VIDEO_PLAY: 'VideoPlay',
    FAQ_VIEW: 'FAQView'
  }
};

// Content categories for better organization
export const CONTENT_CATEGORIES = {
  HEALTH_WELLNESS: 'Health & Wellness',
  DIABETES_PROGRAM: 'Diabetes Program',
  MOBILE_APP: 'Mobile App',
  CONSULTATION: 'Consultation',
  E_COMMERCE: 'E-commerce',
  LANDING_PAGE: 'Landing Page',
  AUTHENTICATION: 'Authentication',
  DASHBOARD: 'Dashboard',
  BLOG: 'Blog',
  STORE: 'Store'
};

// Default parameters for events
export const DEFAULT_EVENT_PARAMS = {
  // Common parameters
  currency: 'INR',
  content_type: 'service',
  
  // Program-specific parameters
  program_name: 'Decode Diabetes Program',
  program_category: 'Health & Wellness',
  program_id: 'diabetes-reversal-program',
  
  // Platform detection
  platform: detectPlatform(),
  
  // User agent info (only in development)
  user_agent: process.env.NODE_ENV === 'development' ? navigator?.userAgent : undefined
};

// Helper function to detect platform
function detectPlatform() {
  if (typeof window === 'undefined') return 'unknown';
  
  const userAgent = navigator.userAgent.toLowerCase();
  
  if (/iphone|ipad|ipod/.test(userAgent)) return 'iOS';
  if (/android/.test(userAgent)) return 'Android';
  if (/windows/.test(userAgent)) return 'Windows';
  if (/macintosh/.test(userAgent)) return 'macOS';
  if (/linux/.test(userAgent)) return 'Linux';
  
  return 'Desktop';
}

// Validation helpers
export const validatePixelEvent = (eventName, parameters = {}) => {
  const errors = [];
  
  // Validate event name
  if (!eventName || typeof eventName !== 'string') {
    errors.push('Event name is required and must be a string');
  }
  
  // Validate parameters
  if (parameters && typeof parameters !== 'object') {
    errors.push('Parameters must be an object');
  }
  
  // Validate currency if present
  if (parameters.currency && !/^[A-Z]{3}$/.test(parameters.currency)) {
    errors.push('Currency must be a valid 3-letter currency code');
  }
  
  // Validate value if present
  if (parameters.value !== undefined && (isNaN(parameters.value) || parameters.value < 0)) {
    errors.push('Value must be a non-negative number');
  }
  
  return {
    isValid: errors.length === 0,
    errors
  };
};

// Export configuration
export default {
  META_PIXEL_CONFIG,
  EVENT_MAPPINGS,
  CONTENT_CATEGORIES,
  DEFAULT_EVENT_PARAMS,
  validatePixelEvent
};
