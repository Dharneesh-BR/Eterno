import React, { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { trackCTAClick, trackPaymentSuccess, trackLead, trackBookingInitiated } from '../utils/metaPixel';

// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger);

const MobileTimelineSteps = () => {
  const sectionRef = useRef(null);
  const timelineRef = useRef(null);
  const progressLineRef = useRef(null);
  const stepRefs = useRef([]);
  const dotRefs = useRef([]);
  const cardRefs = useRef([]);
  
  // Booking form state
  const [showBookingForm, setShowBookingForm] = useState(false);
  const [showDownloadSection, setShowDownloadSection] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    mobileNumber: '',
    email: ''
  });

  // Steps data
  const steps = [
    {
      id: 1,
      title: "Download the Eterno App",
      description: "Get the Eterno App on iOS or Android and create your account."
    },
    {
      id: 2,
      title: "Complete Your Health Profile",
      description: "Share your health history, lifestyle, food preferences, and goals so our AI and medical experts can understand your metabolic health."
    },
    {
      id: 3,
      title: "Get Your Personalized Plan",
      description: "Receive customized diet plans, workout routines, and health recommendations based on your profile."
    },
    {
      id: 4,
      title: "Start Your Journey",
      description: "Begin your transformation with daily guidance, expert support, and community motivation."
    }
  ];

  useEffect(() => {
    // Only run animations on mobile screens
    const isMobile = window.innerWidth < 768;
    if (!isMobile) return;

    const ctx = gsap.context(() => {
      // Timeline progress line animation
      gsap.fromTo(
        progressLineRef.current,
        {
          height: "0%"
        },
        {
          height: "100%",
          ease: "none",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 80%",
            end: "bottom 20%",
            scrub: 1
          }
        }
      );

      // Animate each step
      stepRefs.current.forEach((step, index) => {
        const dot = dotRefs.current[index];
        const card = cardRefs.current[index];

        // Dot highlight animation
        gsap.fromTo(
          dot,
          {
            backgroundColor: "#a5a0ebff",
            scale: 1
          },
          {
            backgroundColor: "#9333ea",
            scale: 1.2,
            ease: "power2.out",
            scrollTrigger: {
              trigger: step,
              start: "top 70%",
              end: "top 50%",
              scrub: 1
            }
          }
        );

        // Card fade in and slide up animation
        gsap.fromTo(
          card,
          {
            opacity: 0,
            y: 30
          },
          {
            opacity: 1,
            y: 0,
            duration: 0.6,
            ease: "power2.out",
            scrollTrigger: {
              trigger: step,
              start: "top 70%",
              end: "top 50%",
              scrub: 1
            }
          }
        );
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  // Form handlers
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Booking form submitted:', formData);

    // Create Razorpay checkout options
    const options = {
      key: import.meta.env.VITE_RAZORPAY_KEY_ID,
      amount: 19900, // Amount in paise (₹699)
      currency: 'INR',
      name: formData.name,
      email: formData.email || formData.mobileNumber + '@eterno.fit',
      description: '100 Days Diabetes Reversal Program',
      handler: function (response) {
        console.log('Payment successful:', response);
        
        // Track payment success with Meta Pixel
        trackPaymentSuccess(1, response.razorpay_payment_id || 'unknown', {
          content_name: 'Diabetes Reversal Program',
          currency: 'INR',
          user_data: {
            name: formData.name,
            email: formData.email,
            phone: formData.mobileNumber
          }
        });
        
        // Track lead event
        trackLead({
          content_name: 'Diabetes Reversal Program',
          content_category: 'Health & Wellness',
          user_data: {
            name: formData.name,
            email: formData.email,
            phone: formData.mobileNumber
          }
        });
        
        setShowBookingForm(false);
        setShowDownloadSection(true);
        setFormData({ name: '', mobileNumber: '', email: '' });
      },
      modal: {
        ondismiss: function() {
          console.log('Payment modal dismissed');
        }
      }
    };

    const razorpay = new window.Razorpay(options);
    razorpay.open();
  };

  const handleStartJourney = () => {
    trackCTAClick('Proceed to Pay', 'Mobile Timeline');
    trackBookingInitiated({
      content_name: 'Diabetes Reversal Program',
      content_category: 'Health & Wellness'
    });
    setShowBookingForm(true);
  };

  return (
    <section 
      ref={sectionRef}
      className="md:hidden relative w-full py-16 px-4 bg-gradient-to-br from-purple-50 to-blue-50 rounded-xl"
    >
      {/* Section Title */}
      <div className="text-center mb-12 ">
        <h2 className="text-3xl font-bold text-purple-800 mb-4">
          How It Works in 4 Simple Steps
        </h2>
        <p className="text-gray-600 text-sm">
          Get started on your health journey in just 4 easy steps
        </p>
      </div>

      {/* Timeline Container */}
      <div 
        ref={timelineRef}
        className="relative max-w-sm mx-auto"
      >
        {/* Vertical Timeline Line */}
        <div className="absolute left-6 top-0 w-0.5 h-full bg-gray-300">
          {/* Animated Progress Line */}
          <div 
            ref={progressLineRef}
            className="absolute top-0 left-0 w-full bg-purple-600"
          />
        </div>

        {/* Timeline Steps */}
        <div className="space-y-8">
          {steps.map((step, index) => (
            <div
              key={step.id}
              ref={(el) => (stepRefs.current[index] = el)}
              className="relative flex items-start gap-4"
            >
              {/* Timeline Dot */}
              <div
                ref={(el) => (dotRefs.current[index] = el)}
                className="relative z-10 w-6 h-6 bg-white border-2 border-purple-600 rounded-full flex items-center justify-center shadow-md transition-all duration-300"
              >
                <span className="text-xs font-bold text-purple-600">
                  {String(step.id).padStart(2, '0')}
                </span>
              </div>

              {/* Step Card */}
              <div
                ref={(el) => (cardRefs.current[index] = el)}
                className="flex-1 bg-gradient-to-r from-[#936af7] via-purple-600 to-blue-600 rounded-xl shadow-md hover:shadow-lg transition-all duration-300 p-4 ml-4"
              >
                <h3 className="text-lg font-semibold text-white mb-2">
                  {step.title}
                </h3>
                <p className="text-sm text-white/90 leading-relaxed">
                  {step.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom CTA */}
      <div className="text-center mt-12">
        <button 
          onClick={handleStartJourney}
          className="bg-gradient-to-r from-purple-600 to-blue-600 text-white px-8 py-4 rounded-full font-bold text-lg hover:from-purple-700 hover:to-blue-700 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105"
        >
          Proceed to pay Rs 199/-
        </button>
      </div>

      {/* Booking Modal */}
      {showBookingForm && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl p-8 max-w-md w-full max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-xl text-center font-bold text-gray-800">
                Start Your Journey <span className='text-purple-600'>in 4 Simple Steps</span>
              </h3>
              <button 
                onClick={() => setShowBookingForm(false)}
                className="text-gray-500 hover:text-gray-700 text-2xl"
              >
                ×
              </button>
            </div>

                {/* 4 Simple Steps Section */}
                <div className="mb-6 p-4 bg-purple-50 rounded-lg">
                                   
                  <div className="space-y-3">
                    <div className="flex items-center gap-3">
                      <div className="bg-purple-600 text-white rounded-full w-12 h-12 flex items-center justify-center flex-shrink-0 text-sm font-bold">
                        Step 1
                      </div>
                      <div>
                        <h5 className="font-semibold text-sm text-gray-800">Download Eterno App</h5>
                      </div>
                    </div>
                    
                    {/* Arrow 1 */}
                    <div className="flex justify-center my-2">
                      <div className="relative">
                        <div className="w-0.5 h-6 bg-purple-400"></div>
                        <div className="absolute top-6 left-1/2 transform -translate-x-1/2">
                          <div className="w-0 h-0 border-l-[6px] border-l-transparent border-t-[8px] border-t-purple-400 border-r-[6px] border-r-transparent"></div>
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-3">
                      <div className="bg-purple-600 text-white rounded-full w-12 h-12 flex items-center justify-center flex-shrink-0 text-sm font-bold">
                        Step 2
                      </div>
                      <div>
                        <h5 className="font-semibold text-sm text-gray-800">Complete Your Profile</h5>
                      </div>
                    </div>
                    
                    {/* Arrow 2 */}
                    <div className="flex justify-center my-2">
                      <div className="relative">
                        <div className="w-0.5 h-6 bg-purple-400"></div>
                        <div className="absolute top-6 left-1/2 transform -translate-x-1/2">
                          <div className="w-0 h-0 border-l-[6px] border-l-transparent border-t-[8px] border-t-purple-400 border-r-[6px] border-r-transparent"></div>
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-3">
                      <div className="bg-purple-600 text-white rounded-full w-12 h-12 flex items-center justify-center flex-shrink-0 text-sm font-bold">
                        Step 3
                      </div>
                      <div>
                        <h5 className="font-semibold text-sm text-gray-800">Get Your Personalized Plan</h5>
                      </div>
                    </div>
                    
                    {/* Arrow 3 */}
                    <div className="flex justify-center my-2">
                      <div className="relative">
                        <div className="w-0.5 h-6 bg-purple-400"></div>
                        <div className="absolute top-6 left-1/2 transform -translate-x-1/2">
                          <div className="w-0 h-0 border-l-[6px] border-l-transparent border-t-[8px] border-t-purple-400 border-r-[6px] border-r-transparent"></div>
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-3">
                      <div className="bg-purple-600 text-white rounded-full w-12 h-12 flex items-center justify-center flex-shrink-0 text-sm font-bold">
                        Step 4
                      </div>
                      <div>
                        <h5 className="font-semibold text-sm text-gray-800">Start the Wellness Journey</h5>
                      </div>
                    </div>
                  </div>
                </div>

                <h3 className="text-xl text-center font-bold text-gray-800 py-4">
                Update Your Details
              </h3>
                         
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label className="block text-gray-700 mb-2 font-medium">Full Name *</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                  required
                  placeholder="Enter your full name"
                />
              </div>
              
              <div className="mb-4">
                <label className="block text-gray-700 mb-2 font-medium">Mobile Number *</label>
                <input
                  type="tel"
                  name="mobileNumber"
                  value={formData.mobileNumber}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                  required
                  placeholder="Enter your mobile number"
                  pattern="[0-9]{10}"
                  maxLength="10"
                />
              </div>
              
              <div className="mb-6">
                <label className="block text-gray-700 mb-2 font-medium">Email Address (Optional)</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                  placeholder="Enter your email address"
                />
              </div>
              
              <button
                type="submit"
                className="w-full bg-gradient-to-r from-purple-600 to-blue-600 text-white py-4 rounded-lg font-bold text-lg hover:from-purple-700 hover:to-blue-700 transition-all duration-300 transform hover:scale-105 shadow-lg"
              >
                Proceed to Payment - ₹199
              </button>
              
              <div className="mt-6 p-4 bg-green-50 rounded-lg border border-green-200">
                <div className="flex flex-col items-center text-center">
                  <img 
                    src="/assets/Guarntee.webp" 
                    alt="30-Day Money-Back Guarantee" 
                    className="w-24 h-24 mb-3 object-contain"
                  />
                  <h4 className="text-lg font-bold text-green-800 mb-2">30-Day 100% Money-Back Guarantee</h4>
                  <p className="text-sm font-boldtext-gray-700 leading-relaxed">
                    Join with confidence - your trust matters deeply to us as we work to spread wellness and better health for everyone. <br/>Experience the program for 30 days or get your money back. No questions asked.
                  </p>
                </div>
              </div>
              
              <p className="text-xs text-gray-500 text-center mt-4">
                By proceeding, you agree to our Terms & Conditions
              </p>
            </form>
          </div>
        </div>
      )}

      {/* Download Section Modal */}
      {showDownloadSection && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl p-8 max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-2xl text-center font-bold text-gray-800">
                🎉 Payment Successful! <span className='text-green-600'>Welcome to Eterno</span>
              </h3>
              <button 
                onClick={() => setShowDownloadSection(false)}
                className="text-gray-500 hover:text-gray-700 text-2xl"
              >
                ×
              </button>
            </div>

            {/* Success Message */}
            <div className="text-center mb-8">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-green-100 rounded-full mb-4">
                <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                </svg>
              </div>
              <p className="text-lg text-gray-700 mb-2">
                Thank you for joining the Diabetes Reversal Program!
              </p>
              <p className="text-md text-gray-600">
                Your 100-days journey to better health starts now.
              </p>
            </div>

            {/* Download App Section */}
            <div className="bg-gradient-to-br from-purple-900/20 via-purple-800/10 to-indigo-900/20 rounded-2xl p-6 mb-6">
              <div className="text-center mb-6">
                <img 
                  src="/assets/Download now final.webp"
                  alt="Eterno App on Mobile"
                  className="w-full h-auto max-w-xs mx-auto rounded-xl mb-4"
                />
              </div>
              
              <div className="bg-gradient-to-r from-[#936af7] via-purple-600 to-blue-600 rounded-2xl p-6 border border-purple-400 shadow-2xl">
                <div className="text-white text-center">
                  <h4 className="text-xl font-bold mb-4">Download the Eterno App</h4>
                  <p className="text-white/90 mb-6">
                    <span className="text-yellow-300 font-semibold">🚀 Next Step:</span> Download the app to access your personalized diabetes reversal program
                  </p>
                  
                  <p className="text-white/90 mb-6">
                    Available on Android & iOS for seamless access on the go.
                  </p>
                  
                  {/* App Store Buttons */}
                  <div className="flex gap-4 sm:gap-6 justify-center">
                    {/* Apple App Store */}
                    <a href="https://apps.apple.com/in/app/eterno/id6759284060" target="_blank" rel="noopener noreferrer" className="block">
                      <div className="w-14 h-14 sm:w-16 sm:h-16 bg-black rounded-full flex items-center justify-center hover:bg-gray-800 transition-all duration-300 transform hover:scale-110 shadow-lg">
                        <svg className="w-7 h-7 sm:w-8 sm:h-8 text-white" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M17.05 20.28c-.98.95-2.05.8-3.08.35-1.09-.46-2.09-.48-3.24 0-1.44.62-2.2.44-3.06-.35C2.79 15.25 3.51 7.59 9.05 7.31c1.35.07 2.29.74 3.08.8 1.18-.24 2.31-.93 3.57-.84 1.51.12 2.65.72 3.4 1.8-3.12 1.87-2.38 5.98.48 7.13-.57 1.5-1.31 2.99-2.54 4.09l.01-.01zM12.03 7.25c-.15-2.23 1.66-4.07 3.74-4.25.29 2.58-2.34 4.5-3.74 4.25z"/>
                        </svg>
                      </div>
                    </a>
                    
                    {/* Google Play Store */}
                    <a href="https://play.google.com/store/apps/details?id=com.wellnessz.eterno" target="_blank" rel="noopener noreferrer" className="block">
                      <div className="w-14 h-14 sm:w-16 sm:h-16 bg-black rounded-full flex items-center justify-center hover:bg-gray-800 transition-all duration-300 transform hover:scale-110 shadow-lg p-1">
                        <img 
                          src="/assets/playstore.webp"
                          alt="Google Play Store"
                          className="w-full h-full object-contain"
                        />
                      </div>
                    </a>
                  </div>
                  
                  <p className="text-xs text-white/70 italic mt-4">
                    *Your program access will be activated after app download and login
                  </p>
                </div>
              </div>
            </div>

            {/* Next Steps */}
            <div className="bg-purple-50 rounded-lg p-4">
              <h5 className="font-semibold text-purple-800 mb-3">What's Next?</h5>
              <ul className="space-y-2 text-sm text-gray-700">
                <li className="flex items-start gap-2">
                  <span className="text-purple-600 mt-1">1.</span>
                  <span>Download the Eterno app from App Store or Play Store</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-purple-600 mt-1">2.</span>
                  <span>Login with your mobile number</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-purple-600 mt-1">3.</span>
                  <span>Complete your health profile</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-purple-600 mt-1">4.</span>
                  <span>Get your personalized diabetes reversal plan</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default MobileTimelineSteps;
