# Meta Pixel Integration Testing Guide

## Overview
This guide covers testing the Meta Pixel integration for the Eterno React application.

## Pixel Configuration
- **Pixel ID**: 1735823844464583
- **Environment**: Production-ready with development debugging
- **Base Code**: Added to `/index.html`

## Testing Checklist

### 1. Base Pixel Installation
- [ ] Pixel fires on page load
- [ ] PageView event tracked automatically
- [ ] No console errors related to fbq
- [ ] Pixel helper extension detects the pixel

### 2. Automatic PageView Tracking
- [ ] Route changes trigger PageView events
- [ ] Page titles and URLs are tracked correctly
- [ ] Landing pages categorized properly

### 3. Event Tracking Tests

#### CTA Button Clicks
- [ ] Hero section "Join Now" button → `CTAClick` event
- [ ] Floating "Join Now" button → `CTAClick` event
- [ ] Mobile timeline "Proceed to Pay" button → `CTAClick` event

#### User Journey Events
- [ ] Booking form opens → `BookingInitiated` event
- [ ] Payment success → `PaymentSuccess` custom event
- [ ] Payment success → `Lead` standard event
- [ ] App download clicks → `DownloadApp` event

### 4. E-commerce Events (Future)
- [ ] Add to cart → `AddToCart` event
- [ ] Initiate checkout → `InitiateCheckout` event
- [ ] Purchase → `Purchase` event

## Testing Tools

### 1. Facebook Pixel Helper
Install the Facebook Pixel Helper browser extension:
- Chrome Web Store: "Facebook Pixel Helper"
- Check pixel status and events in real-time

### 2. Browser Console
```javascript
// Check if pixel is loaded
window.fbq !== undefined

// Test event manually
fbq('track', 'PageView')
fbq('trackCustom', 'TestEvent', {test: 'data'})
```

### 3. Network Tab
- Filter for "facebook" requests
- Check for pixel events in network requests

## Development vs Production

### Development Mode
- Console logging enabled
- Event delays for debugging
- Validation warnings
- Pixel tracking can be enabled via `VITE_ENABLE_PIXEL_TRACKING=true`

### Production Mode
- No console logging
- Immediate event execution
- Validation errors only
- Pixel tracking automatically enabled

## Event Validation

### Required Parameters
- Event name (string)
- Valid currency code (3 letters, uppercase)
- Numeric value for monetary events

### Optional Parameters
- content_name
- content_category
- content_ids
- user_data (with consent)

## Sample Event Payloads

### CTA Click Event
```javascript
{
  event: 'CTAClick',
  parameters: {
    cta_text: 'Join Now',
    location: 'Hero Section',
    content_name: 'Call to Action Interaction',
    page_location: 'https://eterno.fit/ad-decode-diabetes',
    page_title: 'Decode Diabetes - Eterno'
  }
}
```

### Payment Success Event
```javascript
{
  event: 'PaymentSuccess',
  parameters: {
    value: 1,
    currency: 'INR',
    order_id: 'razorpay_test_123',
    content_name: 'Program Payment',
    content_category: 'Purchase',
    transaction_id: 'razorpay_test_123',
    user_data: {
      name: 'John Doe',
      email: 'john@example.com',
      phone: '+919876543210'
    }
  }
}
```

## Debugging Steps

### 1. Check Base Code
```html
<!-- In index.html -->
<script>
  !function(f,b,e,v,n,t,s){...}
  fbq('init', '1735823844464583');
  fbq('track', 'PageView');
</script>
```

### 2. Check React Integration
```javascript
// In App.jsx
import PixelTracker from './components/PixelTracker';
// <PixelTracker /> should be inside Router
```

### 3. Check Event Tracking
```javascript
// Import tracking functions
import { trackCTAClick } from '../utils/metaPixel';

// Use in event handlers
onClick={() => {
  trackCTAClick('Join Now', 'Hero Section');
  // your logic
}}
```

## Common Issues

### 1. Pixel Not Loading
- Check base code in index.html
- Verify no ad blockers are blocking facebook.com
- Check console for script loading errors

### 2. Events Not Firing
- Verify PixelTracker component is rendered
- Check event handler functions are called
- Validate event parameters

### 3. Duplicate Events
- Ensure single PixelTracker instance
- Check for multiple event listeners
- Verify no duplicate base code

### 4. Production Issues
- Verify NODE_ENV=production
- Check build process includes pixel code
- Test in production environment

## Performance Considerations

### 1. Script Loading
- Pixel script loads asynchronously
- No impact on page load performance
- Fails gracefully if blocked

### 2. Event Batching
- Events are sent immediately in production
- Development mode adds delays for debugging
- No event queue buildup

### 3. Privacy Compliance
- No personal data sent without consent
- Respects Do Not Track headers
- GDPR compliant implementation

## Monitoring

### 1. Facebook Events Manager
- Monitor real-time event delivery
- Check event matching quality
- Verify conversion tracking

### 2. Custom Analytics
- Track event success rates
- Monitor validation errors
- Log performance metrics

## Next Steps

1. **Complete Testing**: Run through all test cases
2. **Production Deploy**: Deploy to production environment
3. **Monitor Setup**: Set up Facebook Events Manager
4. **Conversion Tracking**: Configure conversion goals
5. **Custom Audiences**: Create retargeting audiences
6. **A/B Testing**: Test different event parameters

## Support

For issues with Meta Pixel integration:
1. Check Facebook Pixel Helper
2. Review browser console
3. Validate event parameters
4. Test in different environments
5. Contact Facebook support if needed
