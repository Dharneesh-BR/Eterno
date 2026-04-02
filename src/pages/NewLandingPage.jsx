import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import DiabetesFAQ from '../components/DiabetesFAQ';
import SEO from '../components/SEO';
import MobileTimelineSteps from '../components/MobileTimelineSteps';
import { FiChevronDown, FiChevronUp } from 'react-icons/fi';
import { trackCTAClick, trackBookingInitiated, trackPaymentSuccess, trackLead, trackDownloadApp } from '../utils/metaPixel';

const NewLandingPage = () => {
  const [consultationsLeft, setConsultationsLeft] = useState(15);
  const [showBookingForm, setShowBookingForm] = useState(false);
  const [showDownloadSection, setShowDownloadSection] = useState(false);
  const [openFAQIndex, setOpenFAQIndex] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    mobileNumber: '',
    email: ''
  });

  // Enhanced Timer with Session Time & Date
  const [sessionTime, setSessionTime] = useState('15:00');
  const [sessionDate, setSessionDate] = useState('');
  const [startTime, setStartTime] = useState(Date.now());

  useEffect(() => {
    const timer = setInterval(() => {
      setConsultationsLeft(prev => Math.max(0, prev - 1));

      // Update countdown timer
      const elapsed = Date.now() - startTime;
      const remaining = Math.max(0, 15 * 60 * 1000 - elapsed); // 15 minutes in milliseconds
      const minutes = Math.floor(remaining / 60000);
      const seconds = Math.floor((remaining % 60000) / 1000);
      setSessionTime(`${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`);

      // Update session date
      const today = new Date();
      const dateString = today.toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });
      setSessionDate(dateString);
    }, 1000); // Update every second

    return () => clearInterval(timer);
  }, [startTime]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handlePayment = (e) => {
    e.preventDefault();
    console.log('Initiating payment for:', formData);

    // Check if Razorpay is loaded
    if (!window.Razorpay) {
      console.error('Razorpay not loaded');
      alert('Payment service is loading. Please try again in a moment.');
      // Reload Razorpay script
      const script = document.createElement('script');
      script.src = 'https://checkout.razorpay.com/v1/checkout.js';
      script.async = true;
      script.onload = () => {
        console.log('Razorpay script reloaded');
        handlePayment(e); // Retry payment
      };
      script.onerror = () => {
        console.error('Failed to reload Razorpay script');
        alert('Unable to load payment service. Please refresh the page and try again.');
      };
      document.head.appendChild(script);
      return;
    }

    // Create Razorpay checkout options with error handling
    const options = {
      key: import.meta.env.VITE_RAZORPAY_KEY_ID,
      amount: 69900, // Amount in paise (₹699)
      currency: 'INR',
      name: formData.name,
      description: 'Decode Diabetes Program Consultation',
      image: 'https://eterno.fit/icons/eterno-logo.png',
      handler: function (response) {
        console.log('Payment successful:', response);
        
        // Track payment success with Meta Pixel
        trackPaymentSuccess(1, response.razorpay_payment_id || 'unknown', {
          content_name: 'Decode Diabetes Program',
          currency: 'INR',
          user_data: {
            name: formData.name,
            email: formData.email,
            phone: formData.mobileNumber
          }
        });
        
        // Track lead event
        trackLead({
          content_name: 'Decode Diabetes Program',
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
        },
        escape: true,
        backdropclose: true
      },
      prefill: {
        name: formData.name,
        email: formData.email,
        contact: formData.mobileNumber
      },
      notes: {
        program: 'Decode Diabetes Consultation',
        timestamp: new Date().toISOString()
      },
      theme: {
        color: '#936af7'
      }
    };

    try {
      const razorpay = new window.Razorpay(options);
      razorpay.on('payment.failed', function (response) {
        console.error('Payment failed:', response.error);
        alert('Payment failed: ' + response.error.description);
      });
      razorpay.open();
    } catch (error) {
      console.error('Error initializing Razorpay:', error);
      alert('Payment initialization failed. Please try again.');
    }
  };

  return (
    <>
      <style>{`
        @keyframes float {
          0%, 100% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-20px);
          }
        }
      `}</style>
      <SEO 
        title="Decode Diabetes - India's First Doctor-Led AI-Powered Diabetes Reversal"
        description="Holistic Mind-Body Metabolic Reversal Backed by Genomics. Book your free consultation now!"
        keywords="diabetes reversal, doctor-led diabetes program, AI diabetes management, gene-based diabetes care"
        robots="noindex, nofollow"
      />
      
      <div className="relative min-h-screen">
        
                
        {/* New Section - Join 2-Hour Program */}
        <section className="relative w-full py-20 px-10" >
                
                <div className="absolute inset-0 opacity-10">
                  <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-purple-500/20 to-transparent"></div>
                  <div className="absolute bottom-0 right-0 w-32 h-32 bg-purple-400/20 rounded-full blur-2xl"></div>
                </div>
                <div className=" mb-6">
                
              <h1 className="text-h1 text-white mb-8 mx-auto ">
              Lower your Blood Sugar<br/>in 100 Days 
              
            </h1>
            <h2 className="text-h2 font-extrabold text-white/90 mb-2">
              With <br/>Doctor Led, AI Powered Program for Diabetes Reversal 
              </h2>
            </div>
          </section>

        {/* Decode Image Section */}
        <section className="relative w-full py-2 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-8">
              <img 
                src="/assets/Diabetes-mobile-view.png"
                alt="Decode Diabetes Program"
                className="w-full max-w-4xl mx-auto h-auto object-contain rounded-lg shadow-xl"
              />
            </div>
          </div>
        </section>

        {/* New Content Section with Integrated Curve */}
        <section className="relative w-full py-16 px-10 sm:py-16" style={{ 
          background: 'linear-gradient(135deg, #ffffff 0%, #f3ecff 35%, #e9d8fd 65%, #c084fc 100%)',
          borderTopLeftRadius: '45% 10%',
          borderTopRightRadius: '45% 10%',
          zIndex: 1,
          marginTop: '-32px'
        }}>
          
          <div className="max-w-6xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
              A Smarter, Simpler Way to 
              <br />
              Manage Diabetes.
            </h2>
            <p className="text-2xl md:text-2xl text-gray-900 mb-8 leading-relaxed">
              Reverse your Diabetes with
              <br />
              Doctor led, AI powered Precision care starting at just 
              <br /><br/>
              <span className="text-4xl md:text-4xl font-bold text-purple-600">Rs 699/-<br/><span className='text-gray-800 text-2xl'>for 100 Days Program</span></span>
            </p>
            
            <button 
              onClick={() => {
                trackCTAClick('Join Now', 'Hero Section');
                setShowBookingForm(true);
              }}
              className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 text-white px-8 py-4 rounded-full hover:from-purple-700 hover:to-blue-700 transition-all duration-300 transform hover:scale-105 shadow-xl"
            >
              Join Now
            </button>
            </div>
        </section>

        {/* Program Outcomes */}
        <section className="px-10 py-12"> 
          <div className="max-w-6xl mx-auto">
            
            <div className="flex gap-4 md:grid md:grid-cols-3 md:gap-8">
              {/* 90% Success Rate */}
              <div className="relative group">
                <div className="text-center">
                  {/* Circular Progress Indicator */}
                  <div className="relative w-20 h-20 mx-auto mb-4 flex-shrink-0">
                    <div className="absolute inset-0 bg-green-600/20 rounded-full"></div>
                    <div className="absolute inset-1 bg-gradient-to-br from-green-600 to-emerald-700 rounded-full flex items-center justify-center">
                      <div className="text-center">
                        <div className="text-xl sm:text-2xl font-bold text-white">90%</div>
                      </div>
                    </div>
                    {/* Animated Ring */}
                    <div className="absolute inset-0 border-2 border-green-400/30 rounded-full"></div>
                    <div className="absolute inset-0 border-2 border-green-400 border-t-transparent rounded-full animate-spin" style={{ animationDuration: '3s' }}></div>
                  </div>
                  
                  <div className="space-y-2">
                    <h3 className="text-h3 font-bold leading-relaxed text-white">Success Rate</h3>
                    
                  </div>
                </div>
              </div>

              {/* 2% HbA1c Drop */}
              <div className="relative group">
                <div className="text-center">
                  {/* Chart Style Indicator */}
                  <div className="relative w-20 h-20 mx-auto mb-4 flex-shrink-0">
                    <div className="absolute inset-0 bg-yellow-500/20 rounded-full"></div>
                    <div className="absolute inset-1 bg-gradient-to-br from-yellow-500 to-amber-600 rounded-full flex items-center justify-center">
                      <div className="text-center">
                        <div className="text-xl sm:text-2xl font-bold text-white">2%</div>
                        
                      </div>
                    </div>
                    {/* Trend Arrow */}
                    <div className="absolute -bottom-1 left-1/2 transform -translate-x-1/2">
                      <div className="bg-yellow-500 rounded-full p-1">
                        <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                        </svg>
                      </div>
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <h3 className="text-h3 font-bold leading-relaxed text-white">HbA1c Drop</h3>
                    
                  </div>
                </div>
              </div>

              {/* 3+ kg Weight Loss */}
              <div className="relative group">
                <div className="text-center">
                  {/* Weight Scale Indicator */}
                  <div className="relative w-20 h-20 mx-auto mb-4 flex-shrink-0">
                    <div className="absolute inset-0 bg-blue-500/20 rounded-full"></div>
                    <div className="absolute inset-1 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-full flex items-center justify-center">
                      <div className="text-center">
                        <div className="text-xl sm:text-2xl font-bold text-white">3+ kg</div>
                      </div>
                    </div>
                    {/* Weight Loss Icon */}
                    <div className="absolute -bottom-1 left-1/2 transform -translate-x-1/2">
                      <div className="bg-blue-500 rounded-full p-1">
                        <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                        </svg>
                      </div>
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <h3 className="text-h3 font-bold leading-relaxed text-white">Weight Loss</h3>
                    
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Meet Our Team Section */}
        <section className="relative w-full py-16 bg-gradient-to-br from-purple-900/20 via-purple-800/10 to-indigo-900/20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12 sm:mb-16">
              <h2 className="text-h2 text-white mb-4 sm:mb-6">Meet Your Care Team</h2>
              <p className="text-body text-white max-w-2xl mx-auto">Meet the visionaries behind Eterno, dedicated to redefining human longevity.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
              {/* Founder 1: Dharneesh B R */}
              <div className="bg-white/10 backdrop-blur-lg rounded-2xl shadow-2xl p-8 flex flex-col items-center text-center border border-white/20 hover:shadow-3xl transition-all duration-300 transform hover:-translate-y-1">
                <div className="relative w-40 h-40 mb-6">
                  <img 
                    src="/assets/Dharneesh BR.webp"
                    alt="Dharneesh B R"
                    className="rounded-full w-full h-full object-cover border-4 border-purple-500 shadow-lg object-top-center"
                  />
                </div>
                <h3 className="text-h3 font-bold text-white mb-2">Mr Dharneesh B R</h3>
                <p className="text-purple-300 text-small mb-4">Founder & Chief Executive Officer</p>
                <div className="text-white text-sm space-y-2">
                  <p>IIM Lucknow</p>
                  <p>Human Transformation Expert | Technopreneur</p>
                  <p>Ex-Samsung | Philips | Unilever | GSK</p>
                </div>
              </div>

              {/* Founder 2: Abhishek */}
              <div className="bg-white/10 backdrop-blur-lg rounded-2xl shadow-2xl p-8 flex flex-col items-center text-center border border-white/20 hover:shadow-3xl transition-all duration-300 transform hover:-translate-y-1">
                <div className="relative w-40 h-40 mb-6">
                  <img 
                    src="/assets/Dr Abhishek L Hiremath.webp"
                    alt="Abhishek"
                    className="rounded-full w-full h-full object-cover border-4 border-purple-500 shadow-lg object-top-center"
                  />
                </div>
                <h3 className="text-h3 font-bold text-white mb-2">Dr Abhishek L Hiremath</h3>
                <p className="text-purple-300 text-small mb-4">Co-Founder & Chief Medical Officer</p>
                <div className="text-white text-sm space-y-2">
                  <p>MBBS, FIDM, Diabetologist,</p>
                  <p>Diabetes & Metabolic Health Specialist</p>
                  <p>Lifestyle Medicine and Holistic Health</p>
                </div>
              </div>

              {/* Team Member 3: Dr Usha Kulkarni */}
              <div className="bg-white/10 backdrop-blur-lg rounded-2xl shadow-2xl p-8 flex flex-col items-center text-center border border-white/20 hover:shadow-3xl transition-all duration-300 transform hover:-translate-y-1">
                <div className="relative w-40 h-40 mb-6">
                  <img 
                    src="/assets/Dr Usha Kulkarni.webp"
                    alt="Dr Usha Kulkarni"
                    className="rounded-full w-full h-full object-cover border-4 border-purple-500 shadow-lg object-top-center"
                  />
                </div>
                <h3 className="text-2xl font-bold text-white mb-2">Dr Usha Kulkarni</h3>
                <p className="text-purple-300 text-md mb-4">Nutrition Advisor & Mentor</p>
                <div className="text-white text-sm space-y-2">
                  <p>PhD in Human Nutrition Education</p>
                  <p>Ohio State University, USA</p>
                  <p>25+ Years of Experience in Cancer Nutrition & Healing</p>
                </div>
              </div>
            </div>
          </div>
        </section>


        {/* Why Diabetes Reversal is Complicated Section */}
        <section >
          
            <div className="bg-white p-8 md:p-12 shadow-2xl border border-purple-200" style={{
          background: `
            radial-gradient(
              circle at 20% 30%,
              rgba(255, 255, 255, 0.9),
              transparent 50%
            ),
            radial-gradient(
              circle at 80% 20%,
              rgba(168, 85, 247, 0.35),
              transparent 60%
            ),
            radial-gradient(
              circle at 70% 80%,
              rgba(192, 132, 252, 0.25),
              transparent 60%
            ),
            linear-gradient(
              135deg,
              #ffffff 0%,
              #f3ecff 35%,
              #e9d8fd 65%,
              #c084fc 100%
            )
          `,
          backgroundAttachment: 'fixed',
          zIndex: 1
        }}>
              <h2 className="text-3xl md:text-5xl font-bold text-center mb-10 text-purple-800">
                Why has Diabetes Reversal Been Made So Complicated??
              </h2>
              
              <div className="space-y-3 max-w-4xl mx-auto">
                {/* Single List Box */}
                <div className="bg-red-100 p-8 rounded-xl shadow-xl hover:shadow-2xl transition-all duration-500 transform hover:scale-105 border border-[#B3E0FF]">
                  <div className="space-y-4">
                    {/* 1. Medication Intervention */}
                    <div className="flex flex-col items-center text-center">
                      <div className="bg-gradient-to-br from-red-600 to-red-700 text-white rounded-full w-8 h-8 flex items-center justify-center flex-shrink-0 text-m font-bold shadow-lg mb-3">
                        1
                      </div>
                      <div>
                        <h4 className="text-lg font-semibold mb-2 text-purple-900">
                          Medication Intervention
                        </h4>
                        <p className="text-gray-800 font-semibold mb-2 text-sm">
                          <span className="text-orange-500 font-bold">⚠️</span> Most diabetes care today revolves around controlling blood sugar with medication.
                        </p>
                        <p className="text-gray-600 mb-2 text-sm">
                          If your blood sugar becomes normal with drugs like Metformin, you are often told everything is fine.
                        </p>
                        <p className="text-gray-700 font-semibold text-sm">
                          Medication manages symptoms. It doesn't fix the root metabolic dysfunction that caused diabetes.
                        </p>
                      </div>
                    </div>

                    {/* Divider Line */}
                    <div className="border-t border-red-500"></div>

                    {/* 2. Expensive Subscription Programs */}
                    <div className="flex flex-col items-center text-center">
                      <div className="bg-gradient-to-br from-red-600 to-red-700 text-white rounded-full w-8 h-8 flex items-center justify-center flex-shrink-0 text-m font-bold shadow-lg mb-3">
                        2
                      </div>
                      <div>
                        <h4 className="text-lg font-semibold mb-2 text-purple-900">
                          Expensive Programs
                        </h4>
                        <p className="text-gray-800 font-semibold mb-2 text-sm">
                          <span className="text-orange-500 font-bold">💰</span> Many diabetes reversal programs in India charge ₹25,000 – ₹100,000 /year
                        </p>
                        <p className="text-gray-600 mb-2 text-sm">
                          For most people, this becomes financially unsustainable over time.
                        </p>
                        <p className="text-gray-700 font-semibold text-sm">
                          Health transformation should not be a luxury available only to a few.
                        </p>
                      </div>
                    </div>

                    {/* Divider Line */}
                    <div className="border-t border-red-500"></div>

                    {/* 3. Lack of Real Doctor Involvement */}
                    <div className="flex flex-col items-center text-center">
                      <div className="bg-gradient-to-br from-red-600 to-red-700 text-white rounded-full w-8 h-8 flex items-center justify-center flex-shrink-0 text-m font-bold shadow-lg mb-3">
                        3
                      </div>
                      <div>
                        <h4 className="text-lg font-semibold mb-2 text-purple-900">
                          Lack of Doctor Support
                        </h4>
                        <p className="text-gray-800 font-semibold mb-2 text-sm">
                          <span className="text-orange-500 font-bold">👨‍⚕️</span> In many programs, after onboarding, doctor interaction becomes minimal.
                        </p>
                        <p className="text-gray-600 mb-2 text-sm">
                          Follow-ups are often handled by generic support teams rather than medical experts.
                        </p>
                        <p className="text-gray-700 font-semibold text-sm">
                          Patients are left confused about what to eat, how to exercise, and how to adjust medications safely.
                        </p>
                      </div>
                    </div>

                    {/* Divider Line */}
                    <div className="border-t border-red-500"></div>

                    {/* 4. Generic Diet Plans */}
                    <div className="flex flex-col items-center text-center">
                      <div className="bg-gradient-to-br from-red-600 to-red-700 text-white rounded-full w-8 h-8 flex items-center justify-center flex-shrink-0 text-m font-bold shadow-lg mb-3">
                        4
                      </div>
                      <div>
                        <h4 className="text-lg font-semibold mb-2 text-purple-900">
                          Generic Diet Plans Offered Outside
                        </h4>
                        <p className="text-gray-800 font-semibold mb-2 text-sm">
                          <span className="text-orange-500 font-bold">📋</span> Most programs give standard diet charts. But every person's body is different.
                        </p>
                        <p className="text-gray-600 mb-2 text-sm">
                          Your genes, metabolism, gut microbiome, lifestyle, and stress levels influence how your body responds to food.
                        </p>
                        <p className="text-gray-700 font-semibold text-sm">
                          Generic plans rarely work long-term.
                        </p>
                      </div>
                    </div>

                    {/* Divider Line */}
                    <div className="border-t border-red-800"></div>

                    {/* 5. No Focus on Root-Cause Treatment */}
                    <div className="flex flex-col items-center text-center">
                      <div className="bg-gradient-to-br from-red-600 to-red-700 text-white rounded-full w-8 h-8 flex items-center justify-center flex-shrink-0 text-m font-bold shadow-lg mb-3">
                        5
                      </div>
                      <div>
                        <h4 className="text-lg font-semibold mb-2 text-purple-900">
                          No Focus on Root-Cause Treatment
                        </h4>
                        <p className="text-gray-800 font-semibold mb-2 text-sm">
                          <span className="text-orange-500 font-bold">🎯</span> Diabetes is not just a sugar problem. 
                        </p>
                        <p className="text-gray-600 mb-2 text-sm">
                          It is a metabolic disorder involving insulin resistance, gut health, inflammation, and lifestyle patterns.
                        </p>
                        <p className="text-gray-700 font-semibold text-sm">
                          Yet most solutions treat the numbers — not the biology behind them.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
          </div>
          
        </section>

        {/* Eterno Approach Section */}
        <section className="relative w-full py-20 px-4 bg-gradient-to-br from-purple-900/20 via-purple-800/10 to-indigo-900/20 overflow-hidden">
          {/* Decorative background elements */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <div className="absolute top-10 left-10 w-32 h-32 bg-purple-400/10 rounded-full blur-3xl animate-pulse"></div>
            <div className="absolute bottom-10 right-10 w-40 h-40 bg-indigo-400/10 rounded-full blur-3xl animate-pulse" style={{animationDelay: '2s'}}></div>
            <div className="absolute top-1/2 left-1/4 w-24 h-24 bg-purple-300/5 rounded-full blur-2xl animate-bounce" style={{animationDuration: '4s'}}></div>
            <div className="absolute top-1/3 right-1/4 w-20 h-20 bg-indigo-300/5 rounded-full blur-xl animate-bounce" style={{animationDelay: '1s', animationDuration: '3s'}}></div>
          </div>
          
          <div className="relative z-10 max-w-6xl mx-auto text-center">
            {/* Enhanced heading with decorative elements */}
            <div className="relative inline-block mb-4">
              <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-indigo-600 blur-lg opacity-30 transform scale-110"></div>
              
            </div>
            
            {/* Enhanced content card */}
            <div className="relative bg-gradient-to-r from-[#936af7] via-purple-600 to-blue-600 rounded-3xl p-8 md:p-12 shadow-2xl border border-purple-400 transform transition-all duration-500 hover:scale-105 hover:shadow-3xl">
              {/* Subtle pattern overlay */}
              <h2 className="relative text-4xl md:text-5xl font-bold text-white mb-8 drop-shadow-lg  px-6 py-3 rounded-xl">
                Our Approach
              </h2>
              <div className="absolute inset-0 opacity-5">
                <div className="h-full w-full bg-gradient-to-br from-purple-50/50 to-indigo-50/50 rounded-3xl"></div>
                <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-purple-400 to-transparent"></div>
              </div>
              
              <div className="relative z-10">
                <p className="text-xl font-bold md:text-2xl text-white leading-relaxed max-w-4xl mx-auto mb-6 font-medium">
                  We follow an Integrated health approach - guided by doctors, powered by advanced gene and gut testing, supported by AI technology, and strengthened through holistic lifestyle practices.<br/><br/>
                  We focus on treating diabetes at its root, slowing your biological aging, and helping you live a healthier, stronger life for the long run.
                </p>
                
                
              </div>
            </div>
          </div>
        </section>

        {/* Root-Level Diabetes Reversal Section */}
        <section className="relative w-full py-20 px-4 bg-gradient-to-br from-purple-900/20 via-purple-800/10 to-indigo-900/20">
          <div className="max-w-6xl mx-auto text-center">
            <h2 className="text-4xl md:text-5xl font-bold mb-8 text-white">
              A Smarter and Simpler way for 
              <br />
              Root-Level Diabetes Reversal
            </h2>
            <p className="text-xl font-semibold md:text-2xl text-white/90 leading-relaxed max-w-4xl mx-auto mb-8">
              At eterno, we focus on decoding your biology.
            </p>
            <p className="text-xl font-semibold md:text-xl text-white/90 leading-relaxed max-w-4xl mx-auto">
              Using Gene Insights, Gut Intelligence, and Metabolic Health Science, we design personalized interventions that help your body restore balance naturally.
            </p>
            <p className="text-xl font-semibold md:text-xl text-white/90 font-semibold leading-relaxed max-w-4xl mx-auto mt-6">
              Because real diabetes reversal begins when you fix the root cause — not just the blood sugar reading.
            </p>
          </div>
        </section>

        {/* Special Offer Section */}
        <section className="relative w-full py-20 px-4 bg-white"style={{
          background: `
            radial-gradient(
              circle at 20% 30%,
              rgba(255, 255, 255, 0.9),
              transparent 50%
            ),
            radial-gradient(
              circle at 80% 20%,
              rgba(168, 85, 247, 0.35),
              transparent 60%
            ),
            radial-gradient(
              circle at 70% 80%,
              rgba(192, 132, 252, 0.25),
              transparent 60%
            ),
            linear-gradient(
              135deg,
              #ffffff 0%,
              #f3ecff 35%,
              #e9d8fd 65%,
              #c084fc 100%
            )
          `,
          backgroundAttachment: 'fixed',
          zIndex: 1
        }}>
          <div className="max-w-6xl mx-auto text-center">
            <h2 className="text-4xl md:text-5xl font-bold mb-8 text-purple-700">
              <span className='text-3xl'>Join</span> <br/>Decode Diabetes <br/><span className='text-3xl'>100 Days Program <br/>to
              <br />
              Reverse Diabetes through Doctor Led, AI powered precision care 
              </span>
            </h2>
            <p className="text-3xl md:text-5xl font-bold text-purple-700 leading-relaxed max-w-4xl mx-auto mb-8">
              
              
            </p>
            
            <div className="bg-gradient-to-r from-[#936af7] via-purple-600 to-blue-600 rounded-2xl p-8 max-w-4xl mx-auto mb-8 border border-purple-400 shadow-2xl hover:shadow-3xl transition-all duration-500 transform hover:scale-105">
              <div className="text-center mb-6">
                <div className="inline-block bg-yellow-400/20 backdrop-blur-sm rounded-full px-4 py-2 mb-4 border border-yellow-300/50">
                  <span className="text-white font-bold text-xl tracking-wider">Limited time offer.<br/>Hurry...</span>
                </div>
                
              </div>
              
                <p className="text-3xl text-white mb-4 font-medium">
                  100 Days subscription <br/>at just 
                </p>
                <div className="flex items-center justify-center gap-8 mb-8">
                  <span className="text-5xl md:text-5xl font-bold text-white drop-shadow-lg">Rs 699/-</span>
                  
                </div>
                
                <span className="bg-gradient-to-r from-yellow-400 to-orange-400 text-purple-900 px-4 py-2 mb-4 rounded-full text-xl font-bold shadow-lg transform hover:scale-105 transition-all">82% Off</span>
                <p className="text-2xl py-4 text-white ">
                  Actual price <br/><span className='line-through'>Rs 4000/-</span>
                </p>
              
            
            <button 
              onClick={() => setShowBookingForm(true)}
              className="bg-gradient-to-r from-orange-500 to-red-600 text-white px-12 py-4 mb-4 rounded-full text-3xl font-bold hover:from-orange-600 hover:to-red-700 transition-all duration-300 transform hover:scale-105 shadow-2xl"
            >
              Join Now
            </button>

            
          </div>
        </div>
        </section>

        {/* What You Get Section */}
        <section className="relative w-full py-10 px-4" style={{
          background: `
            radial-gradient(
              circle at 20% 30%,
              rgba(255, 255, 255, 0.9),
              transparent 50%
            ),
            radial-gradient(
              circle at 80% 20%,
              rgba(168, 85, 247, 0.35),
              transparent 60%
            ),
            radial-gradient(
              circle at 70% 80%,
              rgba(192, 132, 252, 0.25),
              transparent 60%
            ),
            linear-gradient(
              135deg,
              #ffffff 0%,
              #f3ecff 35%,
              #e9d8fd 65%,
              #c084fc 100%
            )
          `,
          backgroundAttachment: 'fixed',
          zIndex: 1
        }}>
          <div className="max-w-6xl mx-auto">
            <h2 className="text-4xl md:text-5xl font-bold text-center mb-16 text-purple-700">
              What You Get in the 100 Days Program
            </h2>
            
            <div className="space-y-3 max-w-4xl mx-auto">
              {/* Single List Box */}
              <div className="bg-gradient-to-r from-[#936af7] via-purple-600 to-blue-600 backdrop-blur-sm p-8 rounded-xl shadow-xl hover:shadow-2xl transition-all duration-500 transform hover:scale-105 border border-white/40">
                               
                <div className="space-y-4">
                  {/* AI Powered Health App */}
                  <div className="flex flex-col items-center text-center">
                    <div className="bg-white text-purple rounded-full w-8 h-8 flex items-center justify-center flex-shrink-0 text-m font-bold shadow-lg mb-3">
                      1
                    </div>
                    <div>
                      <h4 className="text-lg font-semibold mb-1 text-white">
                        AI Powered Health App for 100 Days
                      </h4>
                      <p className="text-white/90 text-sm">
                        Ask any think to AI Health Companion, Track your glucose trends, monitor progress, and follow daily guidance.
                      </p>
                    </div>
                  </div>

                  {/* Divider Line */}
                  <div className="border-t border-white"></div>

                  {/* Daily Personalized Diet Plan */}
                  <div className="flex flex-col items-center text-center">
                    <div className="bg-white text-purple rounded-full w-8 h-8 flex items-center justify-center flex-shrink-0 text-m font-bold shadow-lg mb-3">
                      2
                    </div>
                    <div>
                      <h4 className="text-lg font-semibold mb-1 text-white">
                         One Free Doctor Consultation
                      </h4>
                      <p className="text-white/90 text-sm">
                         Book in app appointment with our in house Doctor for medical consultation.
                      </p>
                    </div>
                  </div>

                  {/* Divider Line */}
                  <div className="border-t border-white"></div>

                  {/* Daily Guided Yoga & Strength Workout */}
                  <div className="flex flex-col items-center text-center">
                    <div className="bg-white text-purple rounded-full w-8 h-8 flex items-center justify-center flex-shrink-0 text-m font-bold shadow-lg mb-3">
                      3
                    </div>
                    <div>
                      <h4 className="text-lg font-semibold mb-1 text-white">
                        Daily Guided Yoga & Strength Workout Plans
                      </h4>
                      <p className="text-white/90 text-sm">
                        Daily Exercise routines designed to improve insulin sensitivity and metabolism.
                      </p>
                    </div>
                  </div>

                  {/* Divider Line */}
                  <div className="border-t border-white"></div>

                  {/* On Demand Doctor Consultation */}
                  <div className="flex flex-col items-center text-center">
                    <div className="bg-white text-purple rounded-full w-8 h-8 flex items-center justify-center flex-shrink-0 text-m font-bold shadow-lg mb-3">
                      4
                    </div>
                    <div>
                      <h4 className="text-lg font-semibold mb-1 text-white">
                        Daily Personalized Diet Plan for Diabetes
                      </h4>
                      <p className="text-white/90 text-sm">
                        Meal suggestions designed to help reduce glucose spikes and improve metabolic health.
                      </p>
                    </div>
                  </div>

                  {/* Divider Line */}
                  <div className="border-t border-white"></div>

                  {/* Unlimited Diabetic Expert & Nutrition Consultation */}
                  <div className="flex flex-col items-center text-center">
                    <div className="bg-white text-purple rounded-full w-8 h-8 flex items-center justify-center flex-shrink-0 text-m font-bold shadow-lg mb-3">
                      5
                    </div>
                    <div>
                      <h4 className="text-lg font-semibold mb-1 text-white">
                        On Demand Diabetic Expert & Nutrition Consultation
                      </h4>
                      <p className="text-white/90 text-sm">
                        Get on call expert advice on foods that support better blood sugar control. Book in app Consultation with Dieticians.
                      </p>
                    </div>
                  </div>

                  {/* Divider Line */}
                  <div className="border-t border-white"></div>

                  {/* Breathwork & Meditation Coaching */}
                  <div className="flex flex-col items-center text-center">
                    <div className="bg-white text-purple rounded-full w-8 h-8 flex items-center justify-center flex-shrink-0 text-m font-bold shadow-lg mb-3">
                      6
                    </div>
                    <div>
                      <h4 className="text-lg font-semibold mb-1 text-white">
                        Breathwork & Meditation Coaching
                      </h4>
                      <p className="text-white/90 text-sm">
                        Reduce stress hormones that influence blood sugar levels.
                      </p>
                    </div>
                  </div>

                  {/* Divider Line */}
                  <div className="border-t border-white"></div>

                  {/* Sound Therapy for Stress Release */}
                  <div className="flex flex-col items-center text-center">
                    <div className="bg-white text-purple rounded-full w-8 h-8 flex items-center justify-center flex-shrink-0 text-m font-bold shadow-lg mb-3">
                      7
                    </div>
                    <div>
                      <h4 className="text-lg font-semibold mb-1 text-white">
                        Sound Therapy for Stress Release
                      </h4>
                      <p className="text-white/90 text-sm">
                        Relax your nervous system and improve overall wellness.
                      </p>
                    </div>
                  </div>

                  {/* Divider Line */}
                  <div className="border-t border-white"></div>

                  {/* Holistic Wellness Coaching */}
                  <div className="flex flex-col items-center text-center">
                    <div className="bg-white text-purple rounded-full w-8 h-8 flex items-center justify-center flex-shrink-0 text-m font-bold mb-3">
                      8
                    </div>
                    <div>
                      <h4 className="text-lg font-semibold mb-1 text-white">
                        Holistic Wellness Coaching
                      </h4>
                      <p className="text-white/90 text-sm">
                        Lifestyle coaching including techniques like EFT (Emotional Freedom Technique) to support long-term health transformation.
                      </p>
                    </div>
                  </div>

                  {/* Divider Line */}
                  <div className="border-t border-white"></div>

                  {/* Doctor Led Coaching Sessions */}
                  <div className="flex flex-col items-center text-center">
                    <div className="bg-white text-purple rounded-full w-8 h-8 flex items-center justify-center flex-shrink-0 text-m font-bold mb-3">
                      9
                    </div>
                    <div>
                      <h4 className="text-lg font-semibold mb-1 text-white">
                        Doctor Led 2 hour Master Class on Diabetes Reversal 
                      </h4>
                      <p className="text-white/90 text-sm">
                        Learn the science behind Diabetes reversal & Weight balance from Specialized doctors.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Doctor Led AI Powered Section */}
        <section className="relative w-full py-12">
          <div className="w-full px-4 sm:px-6 lg:px-8">
            <div className="bg-gradient-to-r from-[#936af7] via-purple-600 to-blue-600 rounded-2xl shadow-xl p-8 border border-purple-400">
              <div className="text-center">
                {/* Title and Description Above */}
                <div className="mb-8">
                  <h2 className="text-h2 text-white mb-6">
                    Doctor led, <br/>AI powered metabolic health program
                  </h2>
                  <p className="text-body text-white/90 max-w-5xl leading-relaxed mx-auto">
                    Personalised doctors and coaches recommendation, Food Analytics, AI-Diet recommendations, Health Tracking & more
                  </p>
                </div>
                
                {/* Image Below */}
                <div className="w-full flex justify-center relative">
                  <img 
                    src="/assets/Banner 3.webp"
                    alt="Eterno Metabolic Health Program"
                    className="w-full h-auto max-w-lg mx-auto "
                  />
                </div>
            </div>
          </div>
          </div>
        </section>


        {/* Personal AI Health Companion Section */}
        <section className="relative w-full py-20 px-4 bg-gradient-to-br from-purple-900/20 via-purple-800/10 to-indigo-900/20">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-4xl md:text-5xl font-bold mb-10 text-white leading-tight">
                <span className="text-4xl md:text-4xl">Hi, I am Eva.</span><br/>
                <span className="text-2xl md:text-3xl font-normal">Your Personal </span><br/>
                <span className="text-4xl md:text-4xl">AI Health Companion.</span><br/>
                <span className="text-2xl md:text-3xl font-normal mt-2 block">Helping you make better health decisions every day</span>
              </h2>
              
              {/* Eva Image Above Box */}
              <div className="w-full flex justify-center relative mb-8">
                <img 
                  src="/assets/eva app 2.webp"
                  alt="Eva AI Assistant"
                  className="w-48 h-auto md:w-56 lg:w-64 mx-auto"
                  style={{
                    animation: 'float 3s ease-in-out infinite'
                  }}
                />
              </div>
              
              <div className="max-w-4xl mx-auto">
                <div className="bg-white/10 backdrop-blur-sm p-8 rounded-xl shadow-xl hover:shadow-2xl transition-all duration-500 transform hover:scale-105 border border-white/20">
                  <div className="space-y-4">
                    {/* Ask Anything to eva */}
                    <div className="flex items-center gap-3">
                      <div className="bg-purple-600 text-white rounded-full w-6 h-6 flex items-center justify-center flex-shrink-0 text-xs font-bold mt-1">
                        ✓
                      </div>
                      <p className="text-white text-lg text-left">
                        Ask anything to Eva
                      </p>
                    </div>

{/* Divider Line */}
                    <div className="border-t border-white/20"></div>

                    {/* Track glucose and HbA1c trends */}
                    <div className="flex items-center gap-3">
                      <div className="bg-purple-600 text-white rounded-full w-6 h-6 flex items-center justify-center flex-shrink-0 text-xs font-bold mt-1">
                        ✓
                      </div>
                      <p className="text-white text-lg text-left">
                        Health Analytics with body marker insights
                      </p>
                    </div>

                    {/* Divider Line */}
                    <div className="border-t border-white/20"></div>

                    {/* Track glucose and HbA1c trends */}
                    <div className="flex items-center gap-3">
                      <div className="bg-purple-600 text-white rounded-full w-6 h-6 flex items-center justify-center flex-shrink-0 text-xs font-bold mt-1">
                        ✓
                      </div>
                      <p className="text-white text-lg text-left">
                        Track glucose and HbA1c trends
                      </p>
                    </div>

                    {/* Divider Line */}
                    <div className="border-t border-white/20"></div>

                    {/* Follow daily health plans */}
                    <div className="flex items-center gap-3">
                      <div className="bg-purple-600 text-white rounded-full w-6 h-6 flex items-center justify-center flex-shrink-0 text-xs font-bold mt-1">
                        ✓
                      </div>
                      <p className="text-white text-lg text-left">
                        Follow daily Nutrition & Health plans
                      </p>
                    </div>

                    {/* Divider Line */}
                    <div className="border-t border-white/20"></div>

                    {/* Monitor lifestyle habits */}
                    <div className="flex items-center gap-3">
                      <div className="bg-purple-600 text-white rounded-full w-6 h-6 flex items-center justify-center flex-shrink-0 text-xs font-bold mt-1">
                        ✓
                      </div>
                      <p className="text-white text-lg text-left">
                        Book on demand appointment with Doctor, Dietician, Physicologist
                      </p>
                    </div>

                    {/* Divider Line */}
                    <div className="border-t border-white/20"></div>

                    {/* Monitor lifestyle habits */}
                    <div className="flex items-center gap-3">
                      <div className="bg-purple-600 text-white rounded-full w-6 h-6 flex items-center justify-center flex-shrink-0 text-xs font-bold mt-1">
                        ✓
                      </div>
                      <p className="text-white text-lg text-left">
                        Monitor lifestyle habits
                      </p>
                    </div>

                    {/* Divider Line */}
                    <div className="border-t border-white/20"></div>

                    {/* Build consistency with reminders and insights */}
                    <div className="flex items-center gap-3">
                      <div className="bg-purple-600 text-white rounded-full w-6 h-6 flex items-center justify-center flex-shrink-0 text-xs font-bold mt-1">
                        ✓
                      </div>
                      <p className="text-white text-lg text-left">
                        Build consistency with reminders and insights
                      </p>
                    </div>

                    

                    {/* Divider Line */}
                    <div className="border-t border-white/20"></div>

                    {/* 24/7 Support and Assistance */}
                    <div className="flex items-center gap-3">
                      <div className="bg-purple-600 text-white rounded-full w-6 h-6 flex items-center justify-center flex-shrink-0 text-xs font-bold mt-1">
                        ✓
                      </div>
                      <p className="text-white text-lg text-left">
                        Health recipes with Calorie count
                      </p>
                    </div>

                    {/* Divider Line */}
                    <div className="border-t border-white/20"></div>

                    {/* 24/7 Support and Assistance */}
                    <div className="flex items-center gap-3">
                      <div className="bg-purple-600 text-white rounded-full w-6 h-6 flex items-center justify-center flex-shrink-0 text-xs font-bold mt-1">
                        ✓
                      </div>
                      <p className="text-white text-lg text-left">
                        Goal setting and gamification
                      </p>
                    </div>

                    {/* Divider Line */}
                    <div className="border-t border-white/20"></div>

                    {/* 24/7 Support and Assistance */}
                    <div className="flex items-center gap-3">
                      <div className="bg-purple-600 text-white rounded-full w-6 h-6 flex items-center justify-center flex-shrink-0 text-xs font-bold mt-1">
                        ✓
                      </div>
                      <p className="text-white text-lg text-left">
                        Personalised sessions and coaching
                      </p>
                    </div>

                    {/* Divider Line */}
                    <div className="border-t border-white/20"></div>

                    {/* 24/7 Support and Assistance */}
                    <div className="flex items-center gap-3">
                      <div className="bg-purple-600 text-white rounded-full w-6 h-6 flex items-center justify-center flex-shrink-0 text-xs font-bold mt-1">
                        ✓
                      </div>
                      <p className="text-white text-lg text-left">
                        24/7 Support and Assistance
                      </p>
                    </div>

                    
                    </div>
                    
                </div>
              </div>
              
              <div className="bg-purple-600 text-white rounded-lg text-xl py-8 font-bold mt-8 mb-4">
                        All features listed above <br/>are included in 100 Days subscription at just<br/> Rs 699/-. <br/>without any hidden charges
                      </div>
                   
            </div>
          </div>
        </section>

{/* Meal Section */}
        <section className="relative w-full py-2 mb-8">
          <div className="w-full max-w-xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="bg-gradient-to-r from-[#936af7] via-purple-600 to-blue-600 rounded-2xl shadow-xl p-4 border border-purple-400" >
              <div className="text-center">
                {/* Title and Description Above */}
                <div className="mb-8">
                  <h2 className="text-h2 text-white mb-6">
                    Snap to get Meal Insights
                  </h2>
                  <h3 className="text-h3 text-white/90 max-w-5xl leading-relaxed mx-auto">
                    Know what's on your plate—instant nutrition analysis with personalized advice.
                  </h3>
                </div>
                
                {/* Image Below */}
                <div className="w-full flex justify-center relative">
                  <img 
                    src="/assets/Meal scanner.png"
                    alt="Meal Scanner"
                    className="w-96 h-auto md:w-[28rem] lg:w-[32rem] mx-auto rounded-2xl"
                  />
                </div>
                
                
              </div>
            </div>
          </div>
        </section>

        {/* App Features Section */}
        <section className="relative w-full py-12">
          <div className="w-full max-w-xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="bg-gradient-to-r from-[#936af7] via-purple-600 to-blue-600 rounded-2xl shadow-xl p-4 border border-purple-400" >
              <div className="text-center">
                {/* Title and Description Above */}
                <div className="mb-8">
                  <h2 className="text-h2 text-white mb-6">
                    Personalized Diet Plans Made Simple
                  </h2>
                  <h3 className="text-h3 text-white/90 max-w-5xl leading-relaxed mx-auto">
                    Take control of your nutrition needs with Eterno app
                  </h3>
                </div>
                
                {/* Image Below */}
                <div className="w-full flex justify-center relative">
                  <img 
                    src="/assets/App_2.webp"
                    alt="Eterno Health App Features"
                    className="w-full h-auto max-w-lg mx-auto rounded-2xl shadow-2xl"
                  />
                </div>
                
              </div>
            </div>
          </div>
        </section>


        
        {/* Eterno Longevity Club Section */}
        <section className="relative w-full py-20 px-4" style={{
          background: `
            radial-gradient(
              circle at 20% 30%,
              rgba(255, 255, 255, 0.9),
              transparent 50%
            ),
            radial-gradient(
              circle at 80% 20%,
              rgba(168, 85, 247, 0.35),
              transparent 60%
            ),
            radial-gradient(
              circle at 70% 80%,
              rgba(192, 132, 252, 0.25),
              transparent 60%
            ),
            linear-gradient(
              135deg,
              #ffffff 0%,
              #f3ecff 35%,
              #e9d8fd 65%,
              #c084fc 100%
            )
          `,
          backgroundAttachment: 'fixed',
          zIndex: 1
        }}>
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-4xl md:text-5xl font-bold mb-8 text-purple-700">
                Access to Eterno Longevity Club
              </h2>
              <p className="text-xl md:text-2xl text-gray-700 leading-relaxed max-w-4xl mx-auto mb-12">
                When you enroll, you also become part of Eterno Longevity Club — a supportive community focused on metabolic health to live longer.
              </p>
              
              <div className="text-left max-w-4xl mx-auto bg-gradient-to-r from-[#936af7] via-purple-600 to-blue-600 backdrop-blur-sm rounded-2xl p-8 shadow-xl hover:shadow-2xl transition-all duration-500 transform hover:scale-105 border border-white/40">
                <h3 className="text-2xl font-semibold mb-6 text-white">
                  Inside club you get:
                </h3>
                
                <div className="space-y-4">
                  {/* Health education sessions */}
                  <div className="flex items-center gap-3">
                    <div className="bg-purple-600 text-white rounded-full w-6 h-6 flex items-center justify-center flex-shrink-0 text-xs font-bold mt-1">
                       ✓
                    </div>
                    <p className="text-white text-lg">
                      Health education sessions
                    </p>
                  </div>

                  {/* Lifestyle improvement challenges */}
                  <div className="flex items-center gap-3">
                    <div className="bg-purple-600 text-white rounded-full w-6 h-6 flex items-center justify-center flex-shrink-0 text-xs font-bold mt-1">
                       ✓
                    </div>
                    <p className="text-white text-lg">
                      Lifestyle improvement challenges
                    </p>
                  </div>

                  {/* Holistic Wellness programs */}
                  <div className="flex items-center gap-3">
                    <div className="bg-purple-600 text-white rounded-full w-6 h-6 flex items-center justify-center flex-shrink-0 text-xs font-bold mt-1">
                       ✓
                    </div>
                    <p className="text-white text-lg">
                      Holistic Wellness programs
                    </p>
                  </div>

                  {/* Superhuman Transformation roadmap */}
                  <div className="flex items-center gap-3">
                    <div className="bg-purple-600 text-white rounded-full w-6 h-6 flex items-center justify-center flex-shrink-0 text-xs font-bold mt-1">
                       ✓
                    </div>
                    <p className="text-white text-lg">
                      Superhuman Transformation roadmap.
                    </p>
                  </div>

                  {/* Motivation from a community */}
                  <div className="flex items-center gap-3">
                    <div className="bg-purple-600 text-white rounded-full w-6 h-6 flex items-center justify-center flex-shrink-0 text-xs font-bold mt-1">
                       ✓
                    </div>
                    <p className="text-white text-lg">
                      Motivation from a community on the same journey
                    </p>
                  </div>
                </div>
                
                <p className="text-lg font-semibold text-white mt-2 text-center">
                  Because lasting health transformation happens better together.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Diabetes Reversal Movement Section */}
        <section className="relative w-full py-20 px-4 " style={{
          background: `
            radial-gradient(
              circle at 20% 30%,
              rgba(255, 255, 255, 0.9),
              transparent 50%
            ),
            radial-gradient(
              circle at 80% 20%,
              rgba(168, 85, 247, 0.35),
              transparent 60%
            ),
            radial-gradient(
              circle at 70% 80%,
              rgba(192, 132, 252, 0.25),
              transparent 60%
            ),
            linear-gradient(
              135deg,
              #ffffff 0%,
              #f3ecff 35%,
              #e9d8fd 65%,
              #c084fc 100%
            )
          `,
          backgroundAttachment: 'fixed',
          zIndex: 1
        }}>
          <div className="max-w-6xl mx-auto text-center">
            <div className="mb-8 flex justify-center">
              <img 
                src="/assets/mission-diabetes-free-india.png" 
                alt="Mission Diabetes Free India" 
                className="w-full max-w-2xl h-auto object-contain"
              />
            </div>
            
            <h2 className="text-3xl md:text-5xl font-bold mb-8 text-purple-700">
              Be part of India's 
              <br />
              Diabetes Reversal Movement
            </h2>
            
            
            <div className="max-w-4xl mx-auto mb-12">
              <p className="text-xl text-gray-700 leading-relaxed mb-8">
                Affordable diabetes care at just <span className='font-bold'>₹699/- for 100 Days</span>. Making diabetes Reversal Smart, Accessible and affordable for every Indian.
              </p>
              <p className="text-xl text-gray-700 leading-relaxed mb-8">
                India has one of the highest numbers of diabetes patients in the world.
              </p>
              <p className="text-xl text-gray-700 leading-relaxed mb-8">
                Together we can change that.
              </p>
              <p className="text-xl text-gray-600 leading-relaxed mb-12">
                By combining technology, science, lifestyle coaching, and community support, we aim to help millions of Indians take control of their metabolic health.
              </p>
            </div>

                        <div className="bg-gradient-to-r from-[#936af7] via-purple-600 to-blue-600 rounded-2xl p-8 max-w-4xl mx-auto mb-8 border border-purple-400 shadow-2xl hover:shadow-3xl transition-all duration-500 transform hover:scale-105">
              <div className="text-center mb-6">
                <div className="inline-block bg-yellow-400/20 backdrop-blur-sm rounded-full px-4 py-2 mb-4 border border-yellow-300/50">
                  <span className="text-white font-bold text-xl tracking-wider">Limited time offer.<br/>Hurry...</span>
                </div>
                
              </div>

              <h3 className="text-2xl md:text-3xl font-bold mb-6 text-white">
                Start Your Journey towards Longevity today
              </h3>
              
              <div className="space-y-4 text-left max-w-2xl mx-auto mb-8">
                <div className="flex items-center gap-3">
                  <div className="bg-white text-purple rounded-full w-6 h-6 flex items-center justify-center flex-shrink-0 text-xs font-bold">
                    ✓
                  </div>
                  <p className="text-white">
                    Improve your HbA1c
                  </p>
                </div>
                
                <div className="flex items-center gap-3">
                  <div className="bg-white text-purple rounded-full w-6 h-6 flex items-center justify-center flex-shrink-0 text-xs font-bold">
                    ✓
                  </div>
                  <p className="text-white">
                    Understand your body
                  </p>
                </div>
                
                <div className="flex items-center gap-3">
                  <div className="bg-white text-purple rounded-full w-6 h-6 flex items-center justify-center flex-shrink-0 text-xs font-bold">
                    ✓
                  </div>
                  <p className="text-white">
                    Build lifelong healthy habits
                  </p>
                </div>
              </div>
              
                <p className="text-3xl text-white mb-4 font-medium">
                  100 Days subscription <br/>at just 
                </p>
                <div className="flex items-center justify-center gap-8 mb-8">
                  <span className="text-5xl md:text-5xl font-bold text-white drop-shadow-lg">Rs 699/-</span>
                  
                </div>
                <span className="bg-gradient-to-r from-yellow-400 to-orange-400 text-purple-900 px-4 py-2 mb-4 rounded-full text-xl font-bold shadow-lg transform hover:scale-105 transition-all">82% Off</span>
                <p className="text-2xl py-4 text-white ">
                  Actual price <br/><span className='line-through'>Rs 4000/-</span>
                </p>
              
              <div className="mt-6 p-4 bg-green-50 rounded-lg border border-green-200">
                  <div className="flex flex-col items-center text-center">
                    <img 
                      src="/assets/Guarntee.png" 
                      alt="30-Day Money-Back Guarantee" 
                      className="w-24 h-24 mb-3 object-contain"
                    />
                    <h4 className="text-lg font-bold text-green-800 mb-4">30-Day 100% Money-Back Guarantee</h4>
                    <p className="text-sm font-bold text-gray-700 leading-relaxed">
                      Join with confidence - your trust matters deeply to us as we work to spread wellness and better health for everyone. <br/>Experience the program for 30 days or get your money back. No questions asked.
                    </p>
                  </div>
                </div>
              
            
            <div className="mt-8">
            <button 
              onClick={() => setShowBookingForm(true)}
              className="bg-gradient-to-r from-orange-500 to-red-600 text-white px-12 py-4 mb-4 rounded-full text-3xl font-bold hover:from-orange-600 hover:to-red-700 transition-all duration-300 transform hover:scale-105 shadow-2xl"
            >
              Join Now
            </button>
            </div>
            </div>
            </div>
            
        </section>

        
        
        
        {/* 4 Simple Steps Section */}
        <section className="relative w-full py-20 px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold mb-8 text-white">
                Start your Journey in just 4 Simple Steps
              </h2>
            </div>
            
            {/* Desktop Version - Grid Layout */}
            <div className="hidden md:block">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
                {/* Step 1 */}
                <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-shadow">
                  <div className="flex items-start gap-4">
                    <div className="bg-purple-600 text-white rounded-full w-12 h-12 flex items-center justify-center flex-shrink-0 text-xl font-bold">
                      1
                    </div>
                    <div>
                      <h3 className="text-2xl font-bold mb-4 text-gray-900">
                        Download the Eterno App
                      </h3>
                      <p className="text-gray-600 leading-relaxed">
                        Get the Eterno App on iOS or Android and create your account.
                      </p>
                    </div>
                  </div>
                </div>

                {/* Step 2 */}
                <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-shadow">
                  <div className="flex items-start gap-4">
                    <div className="bg-purple-600 text-white rounded-full w-12 h-12 flex items-center justify-center flex-shrink-0 text-xl font-bold">
                      2
                    </div>
                    <div>
                      <h3 className="text-2xl font-bold mb-4 text-gray-900">
                        Complete Your Health Profile
                      </h3>
                      <p className="text-gray-600 leading-relaxed">
                        Share your health history, lifestyle, food preferences, and goals so our AI and medical experts can understand your metabolic health.
                      </p>
                    </div>
                  </div>
                </div>

                {/* Step 3 */}
                <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-shadow">
                  <div className="flex items-start gap-4">
                    <div className="bg-purple-600 text-white rounded-full w-12 h-12 flex items-center justify-center flex-shrink-0 text-xl font-bold">
                      3
                    </div>
                    <div>
                      <h3 className="text-2xl font-bold mb-4 text-gray-900">
                        Get Your Personalized Plan
                      </h3>
                      <p className="text-gray-600 leading-relaxed">
                        Upload your Blood Report to fix up a consultation with In house doctor with AI-powered program including personalized nutrition, exercise guidance, and metabolic optimization strategies.
                      </p>
                    </div>
                  </div>
                </div>

                {/* Step 4 */}
                <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-shadow">
                  <div className="flex items-start gap-4">
                    <div className="bg-purple-600 text-white rounded-full w-12 h-12 flex items-center justify-center flex-shrink-0 text-xl font-bold">
                      4
                    </div>
                    <div>
                      <h3 className="text-2xl font-bold mb-4 text-gray-900">
                        Track Progress & Transform Your Health
                      </h3>
                      <p className="text-gray-600 leading-relaxed">
                        Track your meals, glucose levels, and lifestyle habits inside the app — and watch your HbA1c, energy levels, and metabolic health improve over time.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Mobile Version - Timeline */}
            <MobileTimelineSteps />
          </div>
        </section>

          
        {/* Booking Modal */}
        {showBookingForm && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-2xl p-8 max-w-md w-full">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-xl font-bold text-gray-800">
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

              <form onSubmit={handlePayment}>
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
                  className="w-full bg-gradient-to-r from-purple-600 to-blue-600 text-white py-3 rounded-lg font-semibold hover:from-purple-700 hover:to-blue-700 transition-all duration-300 transform hover:scale-105 shadow-lg"
                >
                  Proceed to Payment - ₹699
                </button>
                
                <div className="mt-6 p-4 bg-green-50 rounded-lg border border-green-200">
                  <div className="flex flex-col items-center text-center">
                    <img 
                      src="/assets/Guarntee.png" 
                      alt="30-Day Money-Back Guarantee" 
                      className="w-24 h-24 mb-3 object-contain"
                    />
                    <h4 className="text-lg font-bold text-green-800 mb-2">30-Day 100% Money-Back Guarantee</h4>
                    <p className="text-sm font-bold text-gray-700 leading-relaxed">
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
              <h3 className="text-2xl text-center font-bold text-purple-700">
                🎉 Payment Successful <span className='text-green-600'><br/>Welcome to Eterno</span>
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
                Thank you for joining the Decode Diabetes Program!
              </p>
              <p className="text-md text-gray-600">
                Your 100 Days journey to better your health starts now.
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
                  <h4 className="text-xl font-bold mb-4">Download Eterno App</h4>
                  <p className="text-white/90 mb-6">
                    <span className="text-yellow-300 font-semibold">🚀 Next Step:</span> Download app to start the program
                  </p>
                  
                  <p className="text-white/90 mb-6">
                    Available on Android & iOS for seamless access on the go.
                  </p>
                  
                  {/* App Store Buttons */}
                  <div className="flex gap-4 sm:gap-6 justify-center">
                    {/* Apple App Store */}
                    <a 
                      href="https://apps.apple.com/in/app/eterno/id6759284060" 
                      target="_blank" 
                      rel="noopener noreferrer" 
                      className="block"
                      onClick={() => trackDownloadApp('iOS')}
                    >
                      <div className="w-14 h-14 sm:w-16 sm:h-16 bg-black rounded-full flex items-center justify-center hover:bg-gray-800 transition-all duration-300 transform hover:scale-110 shadow-lg">
                        <svg className="w-7 h-7 sm:w-8 sm:h-8 text-white" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M17.05 20.28c-.98.95-2.05.8-3.08.35-1.09-.46-2.09-.48-3.24 0-1.44.62-2.2.44-3.06-.35C2.79 15.25 3.51 7.59 9.05 7.31c1.35.07 2.29.74 3.08.8 1.18-.24 2.31-.93 3.57-.84 1.51.12 2.65.72 3.4 1.8-3.12 1.87-2.38 5.98.48 7.13-.57 1.5-1.31 2.99-2.54 4.09l.01-.01zM12.03 7.25c-.15-2.23 1.66-4.07 3.74-4.25.29 2.58-2.34 4.5-3.74 4.25z"/>
                        </svg>
                      </div>
                    </a>
                    
                    {/* Google Play Store */}
                    <a 
                      href="https://play.google.com/store/apps/details?id=com.wellnessz.eterno" 
                      target="_blank" 
                      rel="noopener noreferrer" 
                      className="block"
                      onClick={() => trackDownloadApp('Android')}
                    >
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
                  <span>Download the Eterno app from Apple App Store or Google Play Store</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-purple-600 mt-1">2.</span>
                  <span>Login with the same mobile number used for payment</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-purple-600 mt-1">3.</span>
                  <span>Complete your health profile</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-purple-600 mt-1">4.</span>
                  <span>Start your Program</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-purple-600 mt-1">5.</span>
                  <span>Our Diabetes Expert will call you for further steps</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      )}
      </div>

      {/* Diabetes FAQ Section */}
      <section className="w-full py-20 relative overflow-hidden">
        <div className="w-full max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-gradient-to-r from-[#936af7] via-purple-600 to-blue-600 rounded-2xl shadow-xl p-8 border border-purple-400">
            <div className="text-center mb-12 sm:mb-16">
              <h2 className="text-h2 text-white mb-4 sm:mb-6">Frequently Asked Questions</h2>
              <div className="max-w-2xl mx-auto px-2 sm:px-4">
                <h3 className="text-h3 text-white/70 leading-relaxed mb-3 sm:mb-4">
                  Find answers to common questions on Decode Diabetes Program
                </h3>
              </div>
            </div>
            
            <div className="space-y-4">
              {/* FAQ 1 */}
              <div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-xl p-6 hover:shadow-2xl transition-all duration-300 border border-white/40 hover:bg-white">
                <button
                  className="w-full flex justify-between items-center text-left transition-colors group"
                  onClick={() => setOpenFAQIndex(openFAQIndex === 0 ? null : 0)}
                  aria-expanded={openFAQIndex === 0}
                >
                  <span className="text-base font-semibold text-gray-800 group-hover:text-purple-600">What is Decode Diabetes - Diabetes Management Program?</span>
                  {openFAQIndex === 0 ? (
                    <FiChevronUp className="text-purple-600 text-xl flex-shrink-0 ml-4" />
                  ) : (
                    <FiChevronDown className="text-gray-500 text-xl group-hover:text-purple-600 flex-shrink-0 ml-4" />
                  )}
                </button>
                <div 
                  className={`overflow-hidden transition-all duration-300 ease-in-out ${openFAQIndex === 0 ? 'max-h-96 opacity-100 mt-4' : 'max-h-0 opacity-0'}`}
                  aria-hidden={openFAQIndex !== 0}
                >
                  <div className="text-body text-gray-600 leading-relaxed">
                    <p className="text-body leading-relaxed">
                      Eterno - Decode Diabetes is a comprehensive diabetes management program built on an integrated health approach. It combines expert doctor guidance, advanced gene and gut testing, AI-powered technology, and holistic lifestyle practices.
                      The program focuses on identifying and addressing the root causes of diabetes, helping you manage and potentially reverse the condition while also slowing biological aging—so you can live a healthier, stronger life over the long term.
                    </p>
                  </div>
                </div>
              </div>

              {/* FAQ 2 */}
              <div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-xl p-6 hover:shadow-2xl transition-all duration-300 border border-white/40 hover:bg-white">
                <button
                  className="w-full flex justify-between items-center text-left transition-colors group"
                  onClick={() => setOpenFAQIndex(openFAQIndex === 1 ? null : 1)}
                  aria-expanded={openFAQIndex === 1}
                >
                  <span className="text-base font-semibold text-gray-800 group-hover:text-purple-600">How is this program different from other diabetes management solutions?</span>
                  {openFAQIndex === 1 ? (
                    <FiChevronUp className="text-purple-600 text-xl flex-shrink-0 ml-4" />
                  ) : (
                    <FiChevronDown className="text-gray-500 text-xl group-hover:text-purple-600 flex-shrink-0 ml-4" />
                  )}
                </button>
                <div 
                  className={`overflow-hidden transition-all duration-300 ease-in-out ${openFAQIndex === 1 ? 'max-h-96 opacity-100 mt-4' : 'max-h-0 opacity-0'}`}
                  aria-hidden={openFAQIndex !== 1}
                >
                  <div className="text-body text-gray-600 leading-relaxed">
                    <p className="text-body leading-relaxed">
                      Unlike typical solutions, it combines doctor-led care, advanced gene and gut testing to understand your body deeply, AI-driven insights for personalized guidance, and holistic lifestyle changes.
                      This integrated approach not only helps improve diabetes outcomes but also works to slow biological aging, helping you become healthier and stronger over the long term.
                    </p>
                  </div>
                </div>
              </div>

              {/* FAQ 3 */}
              <div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-xl p-6 hover:shadow-2xl transition-all duration-300 border border-white/40 hover:bg-white">
                <button
                  className="w-full flex justify-between items-center text-left transition-colors group"
                  onClick={() => setOpenFAQIndex(openFAQIndex === 2 ? null : 2)}
                  aria-expanded={openFAQIndex === 2}
                >
                  <span className="text-base font-semibold text-gray-800 group-hover:text-purple-600">What is Approach to Reverse Diabetes?</span>
                  {openFAQIndex === 2 ? (
                    <FiChevronUp className="text-purple-600 text-xl flex-shrink-0 ml-4" />
                  ) : (
                    <FiChevronDown className="text-gray-500 text-xl group-hover:text-purple-600 flex-shrink-0 ml-4" />
                  )}
                </button>
                <div 
                  className={`overflow-hidden transition-all duration-300 ease-in-out ${openFAQIndex === 2 ? 'max-h-96 opacity-100 mt-4' : 'max-h-0 opacity-0'}`}
                  aria-hidden={openFAQIndex !== 2}
                >
                  <div className="text-body text-gray-600 leading-relaxed">
                    <p className="text-body leading-relaxed">
                      We follow an Integrated health approach - guided by doctors, powered by advanced gene and gut testing, supported by AI technology, and strengthened through holistic lifestyle practices.
                      We focus on treating diabetes at its root, slowing your biological aging, and helping you live a healthier, stronger life for the long run.
                      We are on a mission to make diabetes reversal affordable—at just Approx ₹160 per month—so that everyone can access expert care, advanced diagnostics, and personalized guidance without financial barriers.
                    </p>
                  </div>
                </div>
              </div>

              {/* FAQ 4 */}
              <div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-xl p-6 hover:shadow-2xl transition-all duration-300 border border-white/40 hover:bg-white">
                <button
                  className="w-full flex justify-between items-center text-left transition-colors group"
                  onClick={() => setOpenFAQIndex(openFAQIndex === 3 ? null : 3)}
                  aria-expanded={openFAQIndex === 3}
                >
                  <span className="text-base font-semibold text-gray-800 group-hover:text-purple-600">What You Get in 100 Days Program?</span>
                  {openFAQIndex === 3 ? (
                    <FiChevronUp className="text-purple-600 text-xl flex-shrink-0 ml-4" />
                  ) : (
                    <FiChevronDown className="text-gray-500 text-xl group-hover:text-purple-600 flex-shrink-0 ml-4" />
                  )}
                </button>
                <div 
                  className={`overflow-hidden transition-all duration-300 ease-in-out ${openFAQIndex === 3 ? 'max-h-96 opacity-100 mt-4' : 'max-h-0 opacity-0'}`}
                  aria-hidden={openFAQIndex !== 3}
                >
                  <div className="text-body text-gray-600 leading-relaxed">
                    <ul className="text-body leading-relaxed space-y-2">
                      <li>1. AI Powered Health App for 100 Days</li>
                      <li>2. Daily Personalized Diet Plan for Diabetes</li>
                      <li>3. Daily Workout Plans</li>
                      <li>4. Breath Work & Meditation Coaching</li>
                      <li>5. Sound Therapy for Stress Release</li>
                      <li>6. Holistic Wellness Coaching</li>
                      <li>7. On Demand Doctor & Nutritionist Consultation</li>
                      <li>8. Master Class on Diabetes Reversal</li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* FAQ 5 */}
              <div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-xl p-6 hover:shadow-2xl transition-all duration-300 border border-white/40 hover:bg-white">
                <button
                  className="w-full flex justify-between items-center text-left transition-colors group"
                  onClick={() => setOpenFAQIndex(openFAQIndex === 4 ? null : 4)}
                  aria-expanded={openFAQIndex === 4}
                >
                  <span className="text-base font-semibold text-gray-800 group-hover:text-purple-600">How do I enroll to Program?</span>
                  {openFAQIndex === 4 ? (
                    <FiChevronUp className="text-purple-600 text-xl flex-shrink-0 ml-4" />
                  ) : (
                    <FiChevronDown className="text-gray-500 text-xl group-hover:text-purple-600 flex-shrink-0 ml-4" />
                  )}
                </button>
                <div 
                  className={`overflow-hidden transition-all duration-300 ease-in-out ${openFAQIndex === 4 ? 'max-h-none opacity-100 mt-4' : 'max-h-0 opacity-0'}`}
                  aria-hidden={openFAQIndex !== 4}
                >
                  <div className="text-body text-gray-600 leading-relaxed">
                    <ol className="text-body leading-relaxed space-y-3">
                      <li>
                        <strong>1. Download the Eterno App</strong><br/>
                        Get the Eterno App on iOS or Android and create your account.
                      </li>
                      <li>
                        <strong>2. Complete Your Health Profile</strong><br/>
                        Share your health history, lifestyle, food preferences, and goals so our AI and medical experts can understand your metabolic health.
                      </li>
                      <li>
                        <strong>3. Get Your Personalized Plan</strong><br/>
                        Upload your Blood Report to fix up a consultation with In house doctor with AI-powered program including personalized nutrition, exercise guidance, and metabolic optimization strategies.
                      </li>
                      <li>
                        <strong>4. Track Progress & Transform Your Health</strong><br/>
                        Track your meals, glucose levels, and lifestyle habits inside the app — and watch your HbA1c, energy levels, and metabolic health improve over time.
                        Our nutritionist will reach you for One on One Assistance and Fix up Appointment with Doctor
                      </li>
                    </ol>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Floating Join Now Button */}
      <button
        onClick={() => {
          trackCTAClick('Join Now', 'Floating Button');
          setShowBookingForm(true);
        }}
        className="fixed bottom-0 left-0 right-0 bg-gradient-to-r from-purple-600 to-blue-600 text-white px-6 py-4 rounded-full font-bold hover:from-purple-700 hover:to-blue-700 transition-all duration-300 transform hover:scale-105 shadow-2xl z-40 flex items-center justify-center gap-2 md:py-6"
      >
        <div className="flex flex-col items-center justify-center gap-2">
        <span className="text-xl md:text-2xl font-bold">Join now @ Just ₹699/- </span>
        <span className="text-white font-bold text-xl md:text-2xl">
          ⏰ Offer ends in {sessionTime}
        </span>
        </div>
      </button>
    </>
  );
};

export default NewLandingPage;
