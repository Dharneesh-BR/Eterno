/**
 * Meta Pixel (Facebook Pixel) Utility for Production Use
 * Pixel ID: 2390949768036183
 */

import { META_PIXEL_CONFIG, validatePixelEvent, DEFAULT_EVENT_PARAMS } from '../config/metaPixelConfig';

// Check if Meta Pixel is available and enabled
const isPixelAvailable = () => {
  return META_PIXEL_CONFIG.ENABLE_TRACKING && typeof window !== 'undefined' && window.fbq;
};

// Safely track Meta Pixel events with validation
export const trackMetaPixelEvent = (eventName, parameters = {}) => {
  // Validate event
  const validation = validatePixelEvent(eventName, parameters);
  if (!validation.isValid) {
    console.error('Meta Pixel validation failed:', validation.errors);
    return;
  }

  if (!isPixelAvailable()) {
    if (META_PIXEL_CONFIG.DEBUG_MODE) {
      console.warn('Meta Pixel not available or disabled. Event not tracked:', eventName, parameters);
    }
    return;
  }

  try {
    // Merge with default parameters
    const enhancedParams = { ...DEFAULT_EVENT_PARAMS, ...parameters };
    
    // Add event delay for debugging
    const executeTracking = () => {
      window.fbq('track', eventName, enhancedParams);
      
      if (META_PIXEL_CONFIG.DEBUG_MODE) {
        console.log('Meta Pixel event tracked:', eventName, enhancedParams);
      }
    };

    if (META_PIXEL_CONFIG.EVENT_DELAY > 0) {
      setTimeout(executeTracking, META_PIXEL_CONFIG.EVENT_DELAY);
    } else {
      executeTracking();
    }
  } catch (error) {
    console.error('Meta Pixel tracking error:', error);
  }
};

// Safely track custom Meta Pixel events
export const trackMetaPixelCustomEvent = (eventName, parameters = {}) => {
  // Validate event
  const validation = validatePixelEvent(eventName, parameters);
  if (!validation.isValid) {
    console.error('Meta Pixel validation failed:', validation.errors);
    return;
  }

  if (!isPixelAvailable()) {
    if (META_PIXEL_CONFIG.DEBUG_MODE) {
      console.warn('Meta Pixel not available or disabled. Custom event not tracked:', eventName, parameters);
    }
    return;
  }

  try {
    // Merge with default parameters
    const enhancedParams = { ...DEFAULT_EVENT_PARAMS, ...parameters };
    
    // Add event delay for debugging
    const executeTracking = () => {
      window.fbq('trackCustom', eventName, enhancedParams);
      
      if (META_PIXEL_CONFIG.DEBUG_MODE) {
        console.log('Meta Pixel custom event tracked:', eventName, enhancedParams);
      }
    };

    if (META_PIXEL_CONFIG.EVENT_DELAY > 0) {
      setTimeout(executeTracking, META_PIXEL_CONFIG.EVENT_DELAY);
    } else {
      executeTracking();
    }
  } catch (error) {
    console.error('Meta Pixel custom tracking error:', error);
  }
};

// Standard Meta Pixel Events
export const MetaPixelEvents = {
  // Page View (automatically tracked on route changes)
  PAGE_VIEW: 'PageView',
  
  // Lead events
  LEAD: 'Lead',
  COMPLETE_REGISTRATION: 'CompleteRegistration',
  
  // E-commerce events
  PURCHASE: 'Purchase',
  ADD_TO_CART: 'AddToCart',
  INITIATE_CHECKOUT: 'InitiateCheckout',
  ADD_PAYMENT_INFO: 'AddPaymentInfo',
  
  // Engagement events
  VIEW_CONTENT: 'ViewContent',
  SEARCH: 'Search',
  
  // Custom events
  CTA_CLICK: 'CTAClick',
  OTP_SUCCESS: 'OTPSuccess',
  PAYMENT_SUCCESS: 'PaymentSuccess',
  DOWNLOAD_APP: 'DownloadApp',
  BOOKING_INITIATED: 'BookingInitiated',
};

// Helper functions for common events
export const trackLead = (userData = {}) => {
  trackMetaPixelEvent(MetaPixelEvents.LEAD, {
    content_name: 'Diabetes Reversal Program',
    content_category: 'Health & Wellness',
    ...userData
  });
};

export const trackCompleteRegistration = (userData = {}) => {
  trackMetaPixelEvent(MetaPixelEvents.COMPLETE_REGISTRATION, {
    content_name: 'User Registration',
    content_category: 'Sign Up',
    status: 'completed',
    ...userData
  });
};

export const trackPurchase = (amount, currency = 'INR', orderData = {}) => {
  trackMetaPixelEvent(MetaPixelEvents.PURCHASE, {
    value: amount,
    currency: currency,
    content_name: 'Diabetes Reversal Program',
    content_type: 'service',
    content_ids: ['diabetes-reversal-program'],
    ...orderData
  });
};

export const trackCTAClick = (ctaText, location = '') => {
  trackMetaPixelCustomEvent(MetaPixelEvents.CTA_CLICK, {
    cta_text: ctaText,
    location: location,
    content_name: 'Call to Action Interaction',
    page_location: window?.location?.href,
    page_title: document?.title
  });
};

export const trackOTPSuccess = (userData = {}) => {
  trackMetaPixelCustomEvent(MetaPixelEvents.OTP_SUCCESS, {
    content_name: 'OTP Verification',
    content_category: 'Authentication',
    status: 'success',
    ...userData
  });
};

export const trackPaymentSuccess = (amount, orderId, userData = {}) => {
  trackMetaPixelCustomEvent(MetaPixelEvents.PAYMENT_SUCCESS, {
    value: amount,
    currency: 'INR',
    order_id: orderId,
    content_name: 'Program Payment',
    content_category: 'Purchase',
    transaction_id: orderId,
    ...userData
  });
};

export const trackDownloadApp = (platform = 'unknown') => {
  trackMetaPixelCustomEvent(MetaPixelEvents.DOWNLOAD_APP, {
    content_name: 'App Download',
    content_category: 'Mobile App',
    platform: platform,
    operating_system: platform
  });
};

export const trackViewContent = (contentData = {}) => {
  trackMetaPixelEvent(MetaPixelEvents.VIEW_CONTENT, {
    content_name: 'Content View',
    content_type: 'product',
    ...contentData
  });
};

export const trackAddToCart = (productData = {}) => {
  trackMetaPixelEvent(MetaPixelEvents.ADD_TO_CART, {
    content_name: 'Product Added to Cart',
    content_type: 'product',
    ...productData
  });
};

export const trackInitiateCheckout = (checkoutData = {}) => {
  trackMetaPixelEvent(MetaPixelEvents.INITIATE_CHECKOUT, {
    content_name: 'Checkout Started',
    content_type: 'service',
    ...checkoutData
  });
};

export const trackAddPaymentInfo = (paymentData = {}) => {
  trackMetaPixelEvent(MetaPixelEvents.ADD_PAYMENT_INFO, {
    content_name: 'Payment Information Added',
    content_type: 'service',
    ...paymentData
  });
};

export const trackBookingInitiated = (userData = {}) => {
  trackMetaPixelCustomEvent(MetaPixelEvents.BOOKING_INITIATED, {
    content_name: 'Booking Started',
    content_category: 'Consultation',
    ...userData
  });
};

// Advanced user data for enhanced matching (with consent check)
export const trackWithUserData = (eventName, parameters = {}, userData = {}) => {
  if (!META_PIXEL_CONFIG.ENABLE_ADVANCED_MATCHING) {
    trackMetaPixelEvent(eventName, parameters);
    return;
  }

  const enhancedParams = {
    ...parameters,
    // Add user data for enhanced matching (only with consent)
    ...userData,
  };

  trackMetaPixelEvent(eventName, enhancedParams);
};

// Initialize Pixel (if needed for dynamic initialization)
export const initializePixel = () => {
  if (!isPixelAvailable() && META_PIXEL_CONFIG.ENABLE_TRACKING) {
    console.warn('Meta Pixel not initialized. Check base code in index.html');
    return false;
  }
  
  if (META_PIXEL_CONFIG.DEBUG_MODE) {
    console.log('Meta Pixel initialized successfully');
  }
  
  return true;
};

// Get Pixel configuration
export const getPixelConfig = () => META_PIXEL_CONFIG;

export default {
  trackMetaPixelEvent,
  trackMetaPixelCustomEvent,
  trackLead,
  trackCompleteRegistration,
  trackPurchase,
  trackCTAClick,
  trackOTPSuccess,
  trackPaymentSuccess,
  trackDownloadApp,
  trackViewContent,
  trackAddToCart,
  trackInitiateCheckout,
  trackAddPaymentInfo,
  trackBookingInitiated,
  trackWithUserData,
  initializePixel,
  getPixelConfig,
  MetaPixelEvents,
  isPixelAvailable
};
