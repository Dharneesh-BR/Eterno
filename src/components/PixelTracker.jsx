import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { trackMetaPixelEvent, MetaPixelEvents } from '../utils/metaPixel';

/**
 * PixelTracker Component
 * Automatically tracks PageView events on route changes in React SPA
 */
const PixelTracker = () => {
  const location = useLocation();

  useEffect(() => {
    // Track PageView on route change
    const trackPageView = () => {
      // Get page path and title
      const path = location.pathname;
      const search = location.search;
      const fullPath = path + search;
      
      // Extract page title or use default
      const pageTitle = document.title || 'Eterno - Your journey to longevity starts here';
      
      // Track PageView with enhanced data
      trackMetaPixelEvent(MetaPixelEvents.PAGE_VIEW, {
        page_path: fullPath,
        page_title: pageTitle,
        page_location: window.location.href,
        page_referrer: document.referrer || '',
        content_category: getPageCategory(path),
        content_name: getPageName(path)
      });

      // Debug logging (remove in production)
      if (process.env.NODE_ENV === 'development') {
        console.log('PixelTracker: PageView tracked', {
          path: fullPath,
          title: pageTitle
        });
      }
    };

    // Small delay to ensure page title is updated
    const timer = setTimeout(trackPageView, 100);

    return () => clearTimeout(timer);
  }, [location]);

  // Helper function to categorize pages
  const getPageCategory = (path) => {
    if (path === '/' || path.includes('/categories')) return 'Home';
    if (path.includes('/body')) return 'Body Programs';
    if (path.includes('/balance')) return 'Balance Programs';
    if (path.includes('/decode')) return 'Diabetes Program';
    if (path.includes('/programs')) return 'Programs';
    if (path.includes('/blog')) return 'Blog';
    if (path.includes('/store')) return 'Store';
    if (path.includes('/login') || path.includes('/signup')) return 'Authentication';
    if (path.includes('/dashboard')) return 'Dashboard';
    if (path.includes('/cart') || path.includes('/checkout')) return 'E-commerce';
    if (path.includes('/special-offer') || path.includes('/ad-decode-diabetes') || path.includes('/diabetes-reversal')) return 'Landing Page';
    return 'Other';
  };

  // Helper function to get page name
  const getPageName = (path) => {
    const pageMap = {
      '/': 'Home',
      '/body': 'Body Programs',
      '/balance': 'Balance Programs',
      '/decode': 'Decode Diabetes',
      '/programs': 'All Programs',
      '/blog': 'Blog',
      '/store': 'Store',
      '/login': 'Login',
      '/signup': 'Sign Up',
      '/dashboard': 'Dashboard',
      '/cart': 'Shopping Cart',
      '/checkout': 'Checkout',
      '/special-offer': 'Special Offer',
      '/ad-decode-diabetes': 'Decode Diabetes Ad',
      '/diabetes-reversal': 'Diabetes Reversal'
    };

    // Check for dynamic routes
    if (path.includes('/programs/')) return 'Program Detail';
    if (path.includes('/blog/')) return 'Blog Post';
    if (path.includes('/store/')) return 'Product Detail';
    if (path.includes('/research/')) return 'Research Detail';

    return pageMap[path] || 'Unknown Page';
  };

  // This component doesn't render anything
  return null;
};

export default PixelTracker;
