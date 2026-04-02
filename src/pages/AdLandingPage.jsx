import React, { useState, useEffect } from 'react';
import SEO from '../components/SEO';
import { trackCTAClick } from '../utils/metaPixel';

const AdLandingPage = () => {
  const [timeLeft, setTimeLeft] = useState({
    hours: 23,
    minutes: 45,
    seconds: 12
  });

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        const totalSeconds = prev.hours * 3600 + prev.minutes * 60 + prev.seconds - 1;
        
        if (totalSeconds <= 0) {
          clearInterval(timer);
          return { hours: 0, minutes: 0, seconds: 0 };
        }
        
        return {
          hours: Math.floor(totalSeconds / 3600),
          minutes: Math.floor((totalSeconds % 3600) / 60),
          seconds: totalSeconds % 60
        };
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const formatNumber = (num) => num.toString().padStart(2, '0');

  return (
    <>
      <SEO 
        title="Special Offer - Limited Time Deal"
        description="Exclusive special offer just for you. Get premium wellness products at unbeatable prices. Limited time only!"
        keywords="special offer, wellness products, discount, limited time deal"
        robots="noindex, nofollow"
      />
      
      <div className="min-h-screen bg-gradient-to-br from-purple-900 via-indigo-900 to-purple-800 flex items-center justify-center px-4">
        <div className="max-w-4xl w-full">
          {/* Main Content Container */}
          <div className="text-center space-y-8">
            
            {/* Badge */}
            <div className="inline-flex items-center bg-red-500 text-white px-4 py-2 rounded-full text-sm font-semibold animate-pulse">
              <span className="mr-2">●</span>
              LIMITED TIME OFFER
            </div>
            
            {/* Main Headline */}
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white leading-tight">
              <span className="block mb-2">Get</span>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-orange-400">
                50% OFF
              </span>
              <span className="block mt-2">Premium Wellness</span>
            </h1>
            
            {/* Subheadline */}
            <p className="text-xl md:text-2xl text-white/90 max-w-2xl mx-auto leading-relaxed">
              Transform your health journey with our premium wellness products. 
              Scientifically formulated, naturally sourced, and now at unbeatable prices.
            </p>
            
            {/* Features Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12 mb-12">
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 border border-white/20 hover:bg-white/15 transition-colors">
                <div className="text-3xl mb-3">🌿</div>
                <h3 className="text-white font-semibold mb-2">100% Natural</h3>
                <p className="text-white/80 text-sm">Pure ingredients sourced from nature</p>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 border border-white/20 hover:bg-white/15 transition-colors">
                <div className="text-3xl mb-3">🔬</div>
                <h3 className="text-white font-semibold mb-2">Scientifically Proven</h3>
                <p className="text-white/80 text-sm">Backed by clinical research</p>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 border border-white/20 hover:bg-white/15 transition-colors">
                <div className="text-3xl mb-3">⚡</div>
                <h3 className="text-white font-semibold mb-2">Fast Results</h3>
                <p className="text-white/80 text-sm">See improvements in weeks</p>
              </div>
            </div>
            
            {/* CTA Button */}
            <div className="space-y-4">
              <button 
                onClick={() => {
                  trackCTAClick('SHOP NOW - SAVE 50%', 'Special Offer Landing');
                  window.location.href = '/store';
                }}
                className="bg-gradient-to-r from-yellow-400 to-orange-400 text-gray-900 px-8 py-4 rounded-lg text-lg font-bold hover:from-yellow-500 hover:to-orange-500 transform hover:scale-105 transition-all duration-200 shadow-2xl"
              >
                SHOP NOW - SAVE 50%
              </button>
              
              <p className="text-white/70 text-sm">
                No coupon required • Discount applied automatically
              </p>
            </div>
            
            {/* Urgency Timer */}
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 border border-white/20 max-w-md mx-auto">
              <p className="text-white/80 text-sm mb-2">Offer ends in:</p>
              <div className="flex justify-center space-x-4">
                <div className="text-center">
                  <div className="bg-white/20 rounded-lg px-3 py-2">
                    <span className="text-2xl font-bold text-white">{formatNumber(timeLeft.hours)}</span>
                  </div>
                  <p className="text-white/60 text-xs mt-1">Hours</p>
                </div>
                <div className="text-center">
                  <div className="bg-white/20 rounded-lg px-3 py-2">
                    <span className="text-2xl font-bold text-white">{formatNumber(timeLeft.minutes)}</span>
                  </div>
                  <p className="text-white/60 text-xs mt-1">Minutes</p>
                </div>
                <div className="text-center">
                  <div className="bg-white/20 rounded-lg px-3 py-2">
                    <span className="text-2xl font-bold text-white">{formatNumber(timeLeft.seconds)}</span>
                  </div>
                  <p className="text-white/60 text-xs mt-1">Seconds</p>
                </div>
              </div>
            </div>
            
            {/* Trust Indicators */}
            <div className="pt-8 border-t border-white/20">
              <div className="flex flex-col md:flex-row items-center justify-center space-y-4 md:space-y-0 md:space-x-8 text-white/80 text-sm">
                <div className="flex items-center">
                  <span className="text-2xl mr-2">🛡️</span>
                  <span>30-Day Money Back</span>
                </div>
                <div className="flex items-center">
                  <span className="text-2xl mr-2">🚚</span>
                  <span>Free Shipping</span>
                </div>
                <div className="flex items-center">
                  <span className="text-2xl mr-2">⭐</span>
                  <span>10,000+ Happy Customers</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AdLandingPage;
