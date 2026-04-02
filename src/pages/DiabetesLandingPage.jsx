import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import DiabetesFAQ from '../components/DiabetesFAQ';
import SEO from '../components/SEO';
import { trackCTAClick, trackLead, trackPaymentSuccess } from '../utils/metaPixel';

const DiabetesLandingPage = () => {
  const [consultationsLeft, setConsultationsLeft] = useState(15);
  const [showBookingForm, setShowBookingForm] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    mobileNumber: '',
    language: 'english',
    state: ''
  });

  // Enhanced Timer with Session Time & Date
  const [sessionTime, setSessionTime] = useState('');
  const [sessionDate, setSessionDate] = useState('');

  useEffect(() => {
    const timer = setInterval(() => {
      setConsultationsLeft(prev => Math.max(0, prev - 1));

      // Update session time every minute
      const now = new Date();
      const hours = now.getHours();
      const minutes = now.getMinutes();
      const timeString = `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')} ${hours >= 12 ? 'PM' : 'AM'}`;
      setSessionTime(timeString);

      // Update session date
      const today = new Date();
      const dateString = today.toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });
      setSessionDate(dateString);
    }, 1000); // Update every minute

    return () => clearInterval(timer);
  }, []);

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
      amount: 19900, // Amount in paise (₹199)
      currency: 'INR',
      name: formData.name,
      email: formData.mobileNumber + '@svasam.com',
      description: 'Diabetes Reversal Workshop',
      handler: function (response) {
        console.log('Payment successful:', response);
        
        // Track payment success with Meta Pixel
        trackPaymentSuccess(199, response.razorpay_payment_id || 'unknown', {
          content_name: 'Diabetes Reversal Workshop',
          currency: 'INR',
          user_data: {
            name: formData.name,
            email: formData.mobileNumber + '@svasam.com',
            phone: formData.mobileNumber
          }
        });
        
        // Track lead event
        trackLead({
          content_name: 'Diabetes Reversal Workshop',
          content_category: 'Health & Wellness',
          user_data: {
            name: formData.name,
            email: formData.mobileNumber + '@svasam.com',
            phone: formData.mobileNumber
          }
        });
        
        alert('Payment successful! Thank you for booking Diabetes Reversal Workshop.');
        setShowBookingForm(false);
        setFormData({ name: '', mobileNumber: '', language: 'english', state: '' });
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

  return (
    <>
      <style jsx>{`
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
        description="Holistic Mind-Body Metabolic Reversal Backed by Genomics. Last 15 FREE consultations left! Only 10 spots remaining - Book now!"
        keywords="diabetes reversal, doctor-led diabetes program, AI diabetes management, gene-based diabetes care"
        robots="noindex, nofollow"
      />
      
      <div className="relative min-h-screen">
        
        {/* Fixed Corner Button */}
        <div className="fixed bottom-6 right-6 z-50">
          <button 
            onClick={() => {
              trackCTAClick('Join Now - Limited Spots', 'Diabetes Landing Page');
              setShowBookingForm(true);
            }}
            className="bg-gradient-to-r from-red-600 to-orange-600 text-white px-8 py-4 rounded-full shadow-2xl hover:from-red-700 hover:to-orange-700 transition-all duration-300 transform hover:scale-105 text-lg font-bold whitespace-nowrap"
          >
            Join Now - Limited Spots!
          </button>
        </div>
        
        {/* New Section - Join 2-Hour Program */}
        <section className="relative w-full py-20 px-10" style={{ 
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
                
                <div className="absolute inset-0 opacity-10">
                  <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-purple-500/20 to-transparent"></div>
                  <div className="absolute bottom-0 right-0 w-32 h-32 bg-purple-400/20 rounded-full blur-2xl"></div>
                </div>
                <div className="text-center mb-12">
                <h2 className="text-h2 font-extrabold text-purple-700 mb-4">
                
              </h2>
              <h3 className="text-h3 text-black/70 text-center mb-8 mx-auto">
              Join our 2 hour Webinar on Unlocking Diabetes to learn proven strategies for managing your Blood sugar.<br/> 
              
            </h3>
            </div>

            <div className="relative w-full px-0 sm:px-0 lg:px-0 mb-12">
              <div className="text-center ">
                <h3 className="text-xl font-semibold text-black/70 mb-6">
                  In this 2 hour live workshop, Learn the 3 step holistic method to reverse Type 2 Diabetes naturally.
                </h3>
                
                {/* Separate box for bullet points */}
                <div className="relative bg-gradient-to-br from-slate-900/90 via-blue-900/80 to-indigo-900/90 backdrop-blur-xl rounded-2xl p-6 sm:p-8 lg:p-10 border-2 border-blue-500/50 hover:border-blue-400/70 transition-all duration-500 hover:shadow-2xl hover:shadow-blue-500/40 group overflow-hidden mb-8 w-full">
                  {/* Subtle animated background pattern */}
                  <div className="absolute inset-0 opacity-10">
                    <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-blue-500/20 to-transparent"></div>
                    <div className="absolute bottom-0 right-0 w-32 h-32 bg-blue-400/20 rounded-full blur-2xl"></div>
                  </div>
                  <div className="relative z-10 text-left w-full space-y-4">
                    <div className="flex items-start">
                      <span className="text-purple-600 mr-3 mt-1">•</span>
                      <span className="text-white">The real causes of type 2 diabetes and how to reverse it.</span>
                    </div>
                    <div className="flex items-start">
                      <span className="text-purple-600 mr-3 mt-1">•</span>
                      <span className="text-white">How your DNA influences insulin resistance — and how to use it to personalise your reversal plan.</span>
                    </div>
                    <div className="flex items-start">
                      <span className="text-purple-600 mr-3 mt-1">•</span>
                      <span className="text-white">How to lower your blood sugar naturally and permanently.</span>
                    </div>
                    <div className="flex items-start">
                      <span className="text-purple-600 mr-3 mt-1">•</span>
                      <span className="text-white">Why blood sugar medicines harm your body instead of helping you.</span>
                    </div>
                    <div className="flex items-start">
                      <span className="text-purple-600 mr-3 mt-1">•</span>
                      <span className="text-white">A step-by-step plan to achieve a diabetes-free life without diets, medicine, or injections.</span>
                    </div>
                  </div>
                </div>
                
                {/* Quote outside the box */}
                <div className="mt-8 p-6 bg-purple-50 rounded-lg border-l-4 border-purple-600">
                  <p className="text-lg font-medium text-purple-800 italic">
                    "Imagine reversing diabetes with a plan built on your DNA — not guesswork."
                  </p>
                </div>
              </div>
            </div>
              
                <div className="relative w-full px-0 sm:px-0 lg:px-0">
                  <div className="relative bg-gradient-to-br from-slate-900/90 via-purple-900/80 to-pink-900/90 backdrop-blur-xl rounded-2xl p-6 sm:p-8 border border-purple-500/30 hover:border-purple-400/50 transition-all duration-500 hover:shadow-2xl hover:shadow-purple-500/20 group overflow-hidden">
                    {/* Subtle animated background pattern */}
                    <div className="absolute inset-0 opacity-10">
                      <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-purple-500/20 to-transparent"></div>
                      <div className="absolute bottom-0 right-0 w-32 h-32 bg-purple-400/20 rounded-full blur-2xl"></div>
                    </div>
                    
                    <div className="relative z-10">
                      <div className="text-center mb-8">
                        <h3 className="text-h3 font-extrabold text-white mb-6">
                          To know more about <br/>Decode Diabetes program <br/>Join our 2 Hours Webinar on <br/>Unlock Diabetes 
                        </h3>
                        <div className="mt-4 space-y-2">
                          <p className="text-xl font-semibold text-red-600 py-6 px-6 bg-yellow-300 rounded-lg inline-block">
                            You are getting all this for Just - ₹199/-
                          </p>
                          <ul className="text-sm text-white space-y-3 text-left mx-auto">
                            <li className="flex items-start">
                              <span className="text-2xl mr-3 mt-1">🎥</span>
                              <span className="font-bold text-lg mb-3 text-white">2-Hour Live Diabetes Reversal Workshop</span>
                            </li>
                            <li className="flex items-start">
                              <span className="text-2xl mr-3 mt-1">📱</span>
                              <span className="font-bold text-lg mb-3 text-white">3 Month Free Subscription to the Eterno Wellness App</span>
                            </li>
                            <li className="flex items-start">
                              <span className="text-2xl mr-3 mt-1">🥗</span>
                              <span className="font-bold text-lg mb-3 text-white">7 Day Diabetes Reversal Diet Plan</span>
                            </li>
                            <li className="flex items-start">
                              <span className="text-2xl mr-3 mt-1">📖</span>
                              <span className="font-bold text-lg mb-3 text-white">Home Workout Guide </span>
                            </li>
                            
                            <li className="flex items-start">
                              <span className="text-2xl mr-3 mt-1">🤖</span>
                              <span className="font-bold text-lg mb-3 text-white">AI-Powered Health Tracking</span>
                            </li>
                            <li className="flex items-start">
                              <span className="text-2xl mr-3 mt-1">💻</span>
                              <span className="font-bold text-lg mb-3 text-white">Workshop Recording Access</span>
                            </li>
                            
                            
                          </ul>
                          <p className="text-xl font-semibold text-red-600 py-6 px-6 bg-yellow-300 rounded-lg inline-block">
                            2 Hours program worth <span className="line-through text-black">₹3000/-</span> for <br/><span className="text-2xl font-black text-black">Just ₹199/-</span>
                          </p>
                          <div className="text-center mt-12 py-6 px-6">
              <h3 className="text-white mb-6 font-bold text-h3">
                Book your Session now <br/>And start your diabetes reversal journey
              </h3>
                <div className="mt-10 sm:mt-8 ">
                    <button onClick={() => setShowBookingForm(true)} className="w-full py-6 bg-gradient-to-r from-yellow-400 to-orange-500 text-black rounded-xl font-bold hover:from-yellow-500 hover:to-orange-600 transition-all duration-300 transform hover:scale-105 shadow-2xl hover:shadow-yellow-500/50 text-xl animate-pulse">
                      <span className="flex justify-center">
                        ⚡ Book Your Spot Now 
                      </span>
                    </button>
                </div>
            </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
            
            </section>

          {/* Hero Content Section with Gradient Background */}
          <section className="relative w-full bg-gradient-to-br from-indigo-900 via-purple-900 to-indigo-800">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 sm:pt-20 pb-8 sm:pb-16">
              {/* Hero Content */}
              <div className="text-center mb-8 sm:mb-16">
                {/* Urgency Badge */}
                <div className="flex justify-center mb-4 sm:mb-6">
                  
                </div>

                {/* Main Headline */}
                <h2 className="text-h2 text-white/90  mb-8 sm:mb-8">
                  India's First,<br/> Doctor-Led, AI-Powered Diabetes Reversal through <br/>Gene Intelligence.
                </h2>
                <h3 className="text-xl font -semibold text-white/90  leading-relaxed px-8">
                  Holistic Mind–Body Metabolic Reversal Backed by Genomics.
                </h3>
                <div className="mt-10 sm:mt-8 ">
                    <button onClick={() => setShowBookingForm(true)} className="w-full py-6 bg-gradient-to-r from-yellow-400 to-orange-500 text-black rounded-xl font-bold hover:from-yellow-500 hover:to-orange-600 transition-all duration-300 transform hover:scale-105 shadow-2xl hover:shadow-yellow-500/50 text-xl animate-pulse">
                      <span className="flex justify-center">
                        ⚡ Book Your Spot Now 
                      </span>
                    </button>
                </div>
              </div>
            </div>
          </section>
          

        {/* Multi-layered gradient background for all sections except hero */}
        <div className="bg-white min-h-screen" style={{
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

          {/* Floating App Image - Between Hero and Core Programs */}
        <div className="relative w-full h-48 sm:h-32 md:h-40 lg:h-48 xl:h-56 pointer-events-none">
          <div className="absolute inset-0 flex items-start justify-center md:items-center md:pt-8">
            <img 
              src="/assets/eva app 2.webp"
              alt="Eterno App"
              className="w-96 h-96 sm:w-80 sm:h-80 md:w-96 md:h-96 lg:w-[28rem] lg:h-[28rem] xl:w-[32rem] xl:h-[32rem] object-contain"
              style={{
                animation: 'float 6s ease-in-out infinite',
                filter: 'drop-shadow(0 20px 40px rgba(0, 0, 0, 0.3))'
              }}
            />
          </div>
        </div>


        {/* Program Outcomes */}
        <section className="px-10 py-12 pt-52"> 
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-h2 font-extrabold text-purple-700 mb-4">
                Program Outcomes
              </h2>
              <h3 className="text-h3 text-white mb-2">Based on 90-day data</h3>
              <h3 className="text-h3 text-gray-600">(For clients with HbA1c &gt; 8%)</h3>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {/* 90% Success Rate */}
              <div className="relative group h-full">
                <div className="bg-green-200 backdrop-blur-md rounded-2xl p-8 border-4 border-green-500/60 hover:border-green-400/80 transition-all duration-500 shadow-lg hover:shadow-3xl hover:shadow-green-500/60 transform hover:scale-105 hover:-translate-y-1 h-full flex flex-col justify-between">
                  <div className="text-center flex flex-col h-full">
                    {/* Circular Progress Indicator */}
                    <div className="relative w-32 h-32 mx-auto mb-6 flex-shrink-0">
                      <div className="absolute inset-0 bg-green-600/20 rounded-full"></div>
                      <div className="absolute inset-2 bg-gradient-to-br from-green-600 to-emerald-700 rounded-full flex items-center justify-center">
                        <div className="text-center">
                          <div className="text-3xl sm:text-4xl font-bold text-white">90%</div>
                        </div>
                      </div>
                      {/* Animated Ring */}
                      <div className="absolute inset-0 border-4 border-green-400/30 rounded-full"></div>
                      <div className="absolute inset-0 border-4 border-green-400 border-t-transparent rounded-full animate-spin" style={{ animationDuration: '3s' }}></div>
                    </div>
                    
                    <div className="space-y-3 flex-grow flex flex-col justify-center">
                      <div className="flex items-center justify-center">
                        <h3 className="text-h3 font-semibold leading-relaxed text-black">Success Rate</h3>
                      </div>
                      <p className="text-black font-bold leading-relaxed">
                        Observed decrease in blood sugar levels
                      </p>
                      
                    </div>
                  </div>
                </div>
              </div>

              {/* 2% HbA1c Drop */}
              <div className="relative group h-full">
                <div className="bg-orange-200 backdrop-blur-md rounded-2xl p-8 border-4 border-orange-500/60 hover:border-orange-400/80 transition-all duration-500 shadow-lg hover:shadow-3xl hover:shadow-yellow-500/60 transform hover:scale-105 hover:-translate-y-1 h-full flex flex-col justify-between">
                  <div className="text-center flex flex-col h-full">
                    {/* Chart Style Indicator */}
                    <div className="relative w-32 h-32 mx-auto mb-6 flex-shrink-0">
                      <div className="absolute inset-0 bg-yellow-500/20 rounded-full"></div>
                      <div className="absolute inset-2 bg-gradient-to-br from-yellow-500 to-amber-600 rounded-full flex items-center justify-center">
                        <div className="text-center">
                          <div className="text-3xl sm:text-4xl font-bold text-white">2%</div>
                          <div className="text-s text-yellow-100">HbA1c</div>
                        </div>
                      </div>
                      {/* Trend Arrow */}
                      <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2">
                        <div className="bg-yellow-500 rounded-full p-2">
                          <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                          </svg>
                        </div>
                      </div>
                    </div>
                    
                    <div className="space-y-3 flex-grow flex flex-col justify-center">
                      <div className="flex items-center justify-center">
                        <h3 className="text-h3 font-semibold leading-relaxed text-black">HbA1c Drop</h3>
                      </div>
                      <p className="text-black font-bold leading-relaxed">
                        Average reduction in HbA1c levels
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* 3+ kg Weight Loss */}
              <div className="relative group h-full">
                <div className="bg-blue-200 backdrop-blur-md rounded-2xl p-8 border-4 border-blue-500/60 hover:border-blue-400/80 transition-all duration-500 shadow-lg hover:shadow-3xl hover:shadow-blue-500/60 transform hover:scale-105 hover:-translate-y-1 h-full flex flex-col justify-between">
                  <div className="text-center flex flex-col h-full">
                    {/* Weight Scale Indicator */}
                    <div className="relative w-32 h-32 mx-auto mb-6 flex-shrink-0">
                      <div className="absolute inset-0 bg-blue-500/20 rounded-full"></div>
                      <div className="absolute inset-2 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-full flex items-center justify-center">
                        <div className="text-center">
                          <div className="text-3xl sm:text-4xl font-bold text-white">3+ kg</div>
                          <div className="text-s text-white">Weight Loss</div>
                        </div>
                      </div>
                      {/* Weight Loss Icon */}
                      <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2">
                        <div className="bg-blue-500 rounded-full p-2">
                          <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                          </svg>
                        </div>
                      </div>
                    </div>
                    
                    <div className="space-y-3 flex-grow flex flex-col justify-center">
                      <div className="flex items-center justify-center">
                        <h3 className="text-h3 font-semibold leading-relaxed text-black">Weight Loss</h3>
                      </div>
                      <p className="text-black font-bold leading-relaxed">
                        Average weight loss achieved
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
          <div className="w-full w-full px-4 sm:px-6 lg:px-8">
            <div className="bg-gradient-to-r from-[#936af7] via-purple-600 to-blue-600 rounded-2xl shadow-xl p-8 border border-purple-400" >
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

        
        {/* What Makes Program Different */}
        <section className="px-4 py-12">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-h2 font-extrabold text-purple-700 mb-6 text-center py-4">
              What Makes the Program Different?
            </h2>
            <h3 className="text-h3 text-black/70 text-center mb-8 mx-auto">
              Doctor-Led, Ai Powered, <br/> Diabetes Reversal Program through Gene Intelligence
            </h3>
            <h3 className="text-h3 text-black/70 text-center mb-8 mx-auto">
              A Holistic, <br/>Medicine-Free Approach to Metabolic Healing
            </h3>
          </div>
        </section>

        {/* Section Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12 px-4 sm:px-6">
              {/* Core Medical & Precision Metabolic Foundation */}
              <div className="relative bg-gradient-to-br from-slate-900/90 via-blue-900/80 to-indigo-900/90 backdrop-blur-xl rounded-2xl p-4 sm:p-6 border-4 border-blue-500/60 hover:border-blue-400/80 transition-all duration-700 shadow-lg hover:shadow-3xl hover:shadow-blue-500/60 transform hover:scale-102 hover:-translate-y-2 group overflow-hidden">
                {/* Subtle animated background pattern */}
                <div className="absolute inset-0 opacity-10">
                  <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-blue-500/20 to-transparent"></div>
                  <div className="absolute bottom-0 right-0 w-32 h-32 bg-blue-400/20 rounded-full blur-2xl"></div>
                </div>
                <div className="relative z-10 flex items-center mb-6">
                  <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center mr-4 shadow-lg">
                    <span className="text-3xl">🏥</span>
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-white mb-2">
                      Core Medical & Precision Metabolic Foundation
                    </h3>
                    <p className="text-blue-300 text-body font-medium">Science-Backed Medical Excellence</p>
                  </div>
                </div>
                <div className="relative z-10 space-y-4">
                  <div className="flex items-start">
                    <span className="text-green-400 mr-3 mt-1">👨‍⚕️</span>
                    <div>
                      <h4 className="text-xl font-bold text-white mb-1">Doctor-Led Reversal Protocol</h4>
                      <p className="text-white/80 text-s font-bold leading-relaxed">Supervised by experienced medical professionals using a root-cause approach.</p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <span className="text-green-400 mr-3 mt-1">🧬</span>
                    <div>
                      <h4 className="text-xl font-bold text-white mb-1">Gene-Based Testing for Personalised Care</h4>
                      <p className="text-white/80 text-s font-bold leading-relaxed">Understand your genetic predisposition to insulin resistance, inflammation, fat storage, and nutrient metabolism to design highly targeted interventions.</p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <span className="text-green-400 mr-3 mt-1">🦠</span>
                    <div>
                      <h4 className="text-xl font-bold text-white mb-1">Microbiome (Gut) Testing for Metabolic Optimization</h4>
                      <p className="text-white/80 text-s font-bold leading-relaxed">Decode your metabolic intelligence to improve insulin sensitivity, reduce inflammation, and enhance metabolic flexibility.</p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <span className="text-green-400 mr-3 mt-1">⚖️</span>
                    <div>
                      <h4 className="text-xl font-bold text-white mb-1">Integrated Weight Balance Program</h4>
                      <p className="text-white/80 text-s font-bold leading-relaxed">Sustainable fat loss while preserving muscle mass and metabolic strength.</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Personalised Care & Expert Support */}
              <div className="relative bg-gradient-to-br from-slate-900/90 via-emerald-900/80 to-green-900/90 backdrop-blur-xl rounded-2xl p-4 sm:p-6 border-4 border-emerald-500/60 hover:border-emerald-400/80 transition-all duration-700 shadow-lg hover:shadow-3xl hover:shadow-emerald-500/60 transform hover:scale-102 hover:-translate-y-2 group overflow-hidden">
                {/* Subtle animated background pattern */}
                <div className="absolute inset-0 opacity-10">
                  <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-emerald-500/20 to-transparent"></div>
                  <div className="absolute bottom-0 right-0 w-32 h-32 bg-emerald-400/20 rounded-full blur-2xl"></div>
                </div>
                <div className="relative z-10 flex items-center mb-6">
                  <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-teal-600 rounded-2xl flex items-center justify-center mr-4 shadow-lg">
                    <span className="text-3xl">👥</span>
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-white mb-2">
                      Personalised Care & Expert Support
                    </h3>
                    <p className="text-green-300 text-body font-medium">Dedicated Human Guidance</p>
                  </div>
                </div>
                <div className="relative z-10 space-y-4">
                  <div className="flex items-start">
                    <span className="text-green-400 mr-3 mt-1">🍽️</span>
                    <div>
                      <h4 className="text-xl font-bold text-white mb-1">Personalised Meal Plans</h4>
                      <p className="text-white/80 text-s font-bold leading-relaxed">Tailored to your genetics, microbiome profile, lifestyle, and glucose response.</p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <span className="text-green-400 mr-3 mt-1">👥</span>
                    <div>
                      <h4 className="text-xl font-bold text-white mb-1">Dedicated Diabetes Expert Support</h4>
                      <p className="text-white/80 text-s font-bold leading-relaxed">Continuous one-on-one guidance from trained metabolic health specialists.</p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <span className="text-green-400 mr-3 mt-1">📅</span>
                    <div>
                      <h4 className="text-xl font-bold text-white mb-1">Daily Coaching & Lifestyle Accountability</h4>
                      <p className="text-white/80 text-s font-bold leading-relaxed">Structured support for nutrition, activity, stress management, and habits.</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Technology & AI Integration */}
              <div className="relative bg-gradient-to-br from-slate-900/90 via-purple-900/80 to-pink-900/90 backdrop-blur-xl rounded-2xl p-4 sm:p-6 border-4 border-purple-500/60 hover:border-purple-400/80 transition-all duration-700 shadow-lg hover:shadow-3xl hover:shadow-purple-500/60 transform hover:scale-102 hover:-translate-y-2 group overflow-hidden">
                {/* Subtle animated background pattern */}
                <div className="absolute inset-0 opacity-10">
                  <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-purple-500/20 to-transparent"></div>
                  <div className="absolute bottom-0 right-0 w-32 h-32 bg-purple-400/20 rounded-full blur-2xl"></div>
                </div>
                <div className="relative z-10 flex items-center mb-6">
                  <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-pink-600 rounded-2xl flex items-center justify-center mr-4 shadow-lg">
                    <span className="text-3xl">🤖</span>
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-white mb-2">
                      Technology & AI Integration
                    </h3>
                    <p className="text-purple-300 text-body font-medium">Smart Digital Ecosystem</p>
                  </div>
                </div>
                <div className="relative z-10 space-y-4">
                  <div className="flex items-start">
                    <span className="text-green-400 mr-3 mt-1">🤖</span>
                    <div>
                      <h4 className="text-xl font-bold text-white mb-1">AI Assistant – 24/7 Intelligent Assistance</h4>
                      <p className="text-white/80 text-s font-bold leading-relaxed">Round-the-clock assistance for food decisions, sugar spikes, stress management, and lifestyle queries.</p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <span className="text-green-400 mr-3 mt-1">📱</span>
                    <div>
                      <h4 className="text-xl font-bold text-white mb-1">Comprehensive Mobile App Ecosystem</h4>
                      <p className="text-white/80 text-s font-bold leading-relaxed">Integrated tracking for glucose, weight, stress, nutrition, activity, and progress analytics.</p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <span className="text-green-400 mr-3 mt-1">👨‍👩‍👧‍👦</span>
                    <div>
                      <h4 className="text-xl font-bold text-white mb-1">Wellness App Subscription for Self and 3 Family members</h4>
                      <p className="text-white/80 text-s font-bold leading-relaxed">Extend metabolic health and preventive care benefits to your loved ones or team members.</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Holistic Lifestyle Optimization */}
              <div className="relative bg-gradient-to-br from-slate-900/90 via-orange-900/80 to-red-900/90 backdrop-blur-xl rounded-3xl p-8 border-4 border-orange-500/60 hover:border-orange-400/80 transition-all duration-700 shadow-lg hover:shadow-3xl hover:shadow-orange-500/60 transform hover:scale-102 hover:-translate-y-2 group overflow-hidden">
                {/* Subtle animated background pattern */}
                <div className="absolute inset-0 opacity-10">
                  <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-orange-500/20 to-transparent"></div>
                  <div className="absolute bottom-0 right-0 w-32 h-32 bg-orange-400/20 rounded-full blur-2xl"></div>
                </div>
                <div className="relative z-10 flex items-center mb-6">
                  <div className="w-16 h-16 bg-gradient-to-br from-orange-500 to-red-600 rounded-2xl flex items-center justify-center mr-4 shadow-lg">
                    <span className="text-3xl">🧘‍♂️</span>
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-white mb-2">
                      Holistic Lifestyle Optimization
                    </h3>
                    <p className="text-orange-300 text-body font-medium">Mind-Body Wellness</p>
                  </div>
                </div>
                <div className="relative z-10 space-y-4">
                  <div className="flex items-start">
                    <span className="text-green-400 mr-3 mt-1">🧘‍♂️</span>
                    <div>
                      <h4 className="text-xl font-bold text-white mb-1">Exclusive Therapeutic Yoga Postures for Diabetes</h4>
                      <p className="text-white/80 text-s font-bold leading-relaxed">Structured movement practices to enhance insulin sensitivity and metabolic function.</p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <span className="text-green-400 mr-3 mt-1">🧘‍♀️</span>
                    <div>
                      <h4 className="text-xl font-bold text-white mb-1">Certified Meditation Coaching</h4>
                      <p className="text-white/80 text-s font-bold leading-relaxed">Nervous system regulation to reduce cortisol and improve glucose balance.</p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <span className="text-green-400 mr-3 mt-1">😴</span>
                    <div>
                      <h4 className="text-xl font-bold text-white mb-1">Stress-Free Sleep Coaching</h4>
                      <p className="text-white/80 text-s font-bold leading-relaxed">Optimize recovery, hormonal balance, and cellular repair.</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          
        {/* Ask Eva AI Assistant Section */}
        <section className="relative w-full py-12">
          <div className="w-full w-full px-4 sm:px-6 lg:px-8">
            <div className="bg-gradient-to-r from-[#936af7] via-purple-600 to-blue-600 rounded-2xl shadow-xl p-8 border border-purple-400" >
              <div className="text-center">
                {/* Title and Description Above */}
                <div className="mb-8">
                  <h2 className="text-h2 text-white mb-6">
                    Ask anything to <br/>Eva <br />Your Ai Assistant
                  </h2>
                  <h3 className="text-h3 text-white/90 max-w-5xl leading-relaxed mx-auto">
                    Receive real-time answers, insights, and support for all your Health-related questions.
                  </h3>
                </div>
                
                {/* Image Below */}
                <div className="w-full flex justify-center relative">
                  <img 
                    src="/assets/eva app 2.webp"
                    alt="Eva AI Assistant"
                    className="w-48 h-auto md:w-56 lg:w-64 mx-auto"
                  />
                </div>
                
                
              </div>
            </div>
          </div>
        </section>

        
        {/* Personalized Diet Plans Made Simple */}
        <section className="relative w-full py-20 bg-gradient-to-br from-indigo-900 via-purple-900 to-indigo-800">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 ">
            <div className="text-center mb-16">
              <h2 className="text-h2 text-white mb-6">Personalized Diet Plans Made Simple</h2>
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              {/* Left side - Image */}
              <div className="flex justify-center">
                
                  <img 
                    src="/assets/App_2.webp"
                    alt="Eterno App Progress Reports"
                    className="w-full h-auto max-w-lg rounded-xl"
                  />
                </div>
              
              {/* Right side - Text content */}
              <div className="text-white">
                <h3 className="text-h3 md:text-xl leading-relaxed mb-6">
                  Take control of your nutrition needs with Eterno app
                </h3>
                
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-[#936af7] rounded-full mt-2 flex-shrink-0"></div>
                    <div>
                      <h3 className="text-lg font-semibold mb-2">Personalised Diet Plans</h3>
                      <p className="text-white/80">Tailor meal plans to fit your unique goals and preferences in seconds.</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-[#936af7] rounded-full mt-2 flex-shrink-0"></div>
                    <div>
                      <h3 className="text-lg font-semibold mb-2">Verified Nutrition Plans</h3>
                      <p className="text-white/80">Access 2000+ verified diet plans in the app with detailed macronutrient & micronutrient breakdowns.</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-[#936af7] rounded-full mt-2 flex-shrink-0"></div>
                    <div>
                      <h3 className="text-lg font-semibold mb-2">Automate meal reminders</h3>
                      <p className="text-white/80">Keep track with timely notifications to have their next meal on time.</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
  

        {/* Why Program Works */}
        <section className="px-4 py-12 bg-gradient-to-r from-blue-600/20 to-purple-600/20 backdrop-blur-sm">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-h2 font-extrabold text-purple-700 mb-6 text-center py-4">
              Why the Program Works?
            </h2>
            <h3 className="text-h3 text-purple-800 text-center mb-8 mx-auto">
              A Precision, Doctor-Led <br/>Mind–Body Metabolic Reversal System
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {[
                {
                  icon: "👨‍⚕️",
                  title: "Doctor-Led, Holistic Reversal Protocol",
                },
                {
                  icon: "🧬",
                  title: "Gene & Gut-Based Personalisation",
                },
                {
                  icon: "📚",
                  title: "Science-Backed Education on Diabetes Reversal",
                },
                {
                  icon: "💊",
                  title: "Reduce & Potentially Eliminate Medicines Safely",
                },
                {
                  icon: "🥗",
                  title: "Sustainable Nutrition — No Fad Diets",
                },
                {
                  icon: "⚖️",
                  title: "Integrated Weight Balance Program",
                },
                {
                  icon: "🎮",
                  title: "AI-Powered & Goal-Driven Gamification Experience",
                }
              ].map((item, index) => (
                <div key={index} className="flex items-start">
                  <span className="text-2xl mr-3 mt-1">{item.icon}</span>
                  <div>
                    <h4 className="font-bold text-lg mb-3 text-purple-900">
                      {item.title}
                    </h4>
                    </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* What's Included }
        <section className="px-4 py-12 bg-gradient-to-br from-indigo-900 via-purple-900 to-indigo-800">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-2xl sm:text-3xl font-bold text-white mb-10 text-center">
              What's Included in the Plan
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                { icon: "👨‍⚕️", text: "On-Demand Doctor Supervision" },
                { icon: "👥", text: "Dedicated Diabetes & Metabolic Expert Support" }, 
                { icon: "🏥", text: "In-Depth & Regular Clinical Consultations" },
                { icon: "🥗", text: "Personalized Nutrition, Stress & Sleep Protocols" },
                { icon: "📱", text: "Comprehensive Mobile App Tracking" },
                { icon: "🔬", text: "Longevity Biohacks & Guided Coaching" }
              ].map((item, index) => (
                <div key={index} className="flex items-start">
                  <span className="text-green-400 text-xl mr-3 mt-1">{item.icon}</span>
                  <span className="text-white font-medium">{item.text}</span>
                </div>
              ))}
            </div>
          </div>

            

            
        </section>

{/* New Section - Join 2-Hour Program */}
          <section className="relative w-full py-20 bg-gradient-to-br from-purple-900/20 via-purple-800/10 to-indigo-900/20" style={{ zIndex: 0 }}>
            <div className="absolute inset-0 opacity-10">
                  <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-purple-500/20 to-transparent"></div>
                  <div className="absolute bottom-0 right-0 w-32 h-32 bg-purple-400/20 rounded-full blur-2xl"></div>
                </div>
                
                <div className="w-full px-4 sm:px-6 lg:px-8">
                  <div className="relative bg-gradient-to-br from-slate-900/90 via-purple-900/80 to-pink-900/90 backdrop-blur-xl rounded-2xl p-6 sm:p-8 border border-purple-500/30 hover:border-purple-400/50 transition-all duration-500 hover:shadow-2xl hover:shadow-purple-500/20 group overflow-hidden">
                    {/* Subtle animated background pattern */}
                    <div className="absolute inset-0 opacity-10">
                      <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-purple-500/20 to-transparent"></div>
                      <div className="absolute bottom-0 right-0 w-32 h-32 bg-purple-400/20 rounded-full blur-2xl"></div>
                    </div>
                    
                    <div className="relative z-10">
                      <div className="text-center mb-8">
                        <h3 className="text-h3 font-extrabold text-white mb-6">
                          To know more about <br/>Decode Diabetes program <br/>Join our 2 Hours Webinar on <br/>Unlock Diabetes 
                        </h3>
                        <div className="mt-4 space-y-2">
                          <p className="text-xl font-semibold text-red-600 py-6 px-6 bg-yellow-300 rounded-lg inline-block">
                            You are getting all this for Just - ₹199/-
                          </p>
                          <ul className="text-sm text-white space-y-3 text-left mx-auto">
                            <li className="flex items-start">
                              <span className="text-2xl mr-3 mt-1">🎥</span>
                              <span className="font-bold text-lg mb-3 text-white">2-Hour Live Diabetes Reversal Workshop</span>
                            </li>
                            <li className="flex items-start">
                              <span className="text-2xl mr-3 mt-1">📱</span>
                              <span className="font-bold text-lg mb-3 text-white">3 Month Free Subscription to the Eterno Wellness App</span>
                            </li>
                            <li className="flex items-start">
                              <span className="text-2xl mr-3 mt-1">🥗</span>
                              <span className="font-bold text-lg mb-3 text-white">7 Day Diabetes Reversal Diet Plan</span>
                            </li>
                            <li className="flex items-start">
                              <span className="text-2xl mr-3 mt-1">📖</span>
                              <span className="font-bold text-lg mb-3 text-white">Home Workout Guide </span>
                            </li>
                            
                            <li className="flex items-start">
                              <span className="text-2xl mr-3 mt-1">🤖</span>
                              <span className="font-bold text-lg mb-3 text-white">AI-Powered Health Tracking</span>
                            </li>
                            <li className="flex items-start">
                              <span className="text-2xl mr-3 mt-1">💻</span>
                              <span className="font-bold text-lg mb-3 text-white">Workshop Recording Access</span>
                            </li>
                            
                            
                          </ul>
                          <p className="text-xl font-semibold text-red-600 py-6 px-6 bg-yellow-300 rounded-lg inline-block">
                            2 Hours program worth <span className="line-through text-black">₹3000/-</span> for <br/><span className="text-2xl font-black text-black">Just ₹199/-</span>
                          </p>
                          <div className="text-center mt-12 py-6 px-6">
              <h3 className="text-white mb-6 font-bold text-h3">
                Book your Session now <br/>And start your diabetes reversal journey
              </h3>
                <div className="mt-10 sm:mt-8 ">
                    <button onClick={() => setShowBookingForm(true)} className="w-full py-6 bg-gradient-to-r from-yellow-400 to-orange-500 text-black rounded-xl font-bold hover:from-yellow-500 hover:to-orange-600 transition-all duration-300 transform hover:scale-105 shadow-2xl hover:shadow-yellow-500/50 text-xl animate-pulse">
                      <span className="flex justify-center">
                        ⚡ Book Your Spot Now 
                      </span>
                    </button>
                </div>
            </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
            
            </section>
            
        {/* Download App Section */}
        <section className="relative w-full py-20 bg-gradient-to-br from-purple-900/20 via-purple-800/10 to-indigo-900/20" style={{ zIndex: 0 }}>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 gap-0 items-center">
              {/* Image - Above the card for all screen sizes */}
              <div className="flex justify-center">
                <img 
                  src="/assets/Download now final.webp"
                  alt="Eterno App on Mobile"
                  className="w-full h-auto max-w-sm rounded-xl"
                />
              </div>
              
              {/* Text content card - Below the image for all screen sizes */}
              <div className="bg-gradient-to-r from-[#936af7] via-purple-600 to-blue-600 rounded-2xl p-6 sm:p-8 lg:p-10 border border-purple-400 shadow-2xl max-w-2xl mx-auto" >
                <div className="text-white text-center">
                  <h2 className="text-h2 text-white mb-4 sm:mb-6">Start Your Health Journey Today</h2>
                  <p className="text-white/90 mb-6">
                    <span className="text-yellow-300 font-semibold">⏰ Limited Time:</span> Download app now and get instant access to personalized diabetes reversal program
                  </p>
                  
                  <p className="text-body text-white/90 mb-6">
                    Available on Android & IOS for seamless access on the go.
                  </p>
                  
                  {/* App Store Buttons */}
                  <div className="flex gap-4 sm:gap-6 mt-6 sm:mt-8 justify-center">
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
                  
                  <p className="text-xs sm:text-sm text-white/70 italic mt-3 sm:mt-4">
                    *Offer valid for limited period only
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <DiabetesFAQ />

        {/* Booking Form Modal */}
        {showBookingForm && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-2xl p-4 sm:p-8 max-w-md w-full h-[103vh] sm:h-auto sm:max-h-[90vh] overflow-y-auto mx-2 sm:mx-auto">
              <div className="flex justify-between items-center mb-4 sm:mb-6">
                <h2 className="text-xl sm:text-2xl font-bold text-white">Book Your Session</h2>
                <button 
                  onClick={() => setShowBookingForm(false)}
                  className="text-gray-500 hover:text-white text-xl sm:text-2xl flex-shrink-0"
                >
                  ×
                </button>
              </div>
              
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-white mb-2">
                    Name *
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                    className="w-full px-3 sm:px-4 py-2 sm:py-2.5 text-sm sm:text-base border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    placeholder="Enter your full name"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-white mb-2">
                    Mobile Number *
                  </label>
                  <input
                    type="tel"
                    name="mobileNumber"
                    value={formData.mobileNumber}
                    onChange={handleInputChange}
                    required
                    className="w-full px-3 sm:px-4 py-2 sm:py-2.5 text-sm sm:text-base border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    placeholder="Enter your mobile number"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-white mb-2">
                    Select Your State *
                  </label>
                  <select
                    name="state"
                    value={formData.state}
                    onChange={handleInputChange}
                    required
                    className="w-full px-3 sm:px-4 py-2 sm:py-2.5 text-sm sm:text-base border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  >
                    <option value="">Select State</option>
                    <option value="andhra-pradesh">Andhra Pradesh</option>
                    <option value="arunachal-pradesh">Arunachal Pradesh</option>
                    <option value="assam">Assam</option>
                    <option value="bihar">Bihar</option>
                    <option value="chhattisgarh">Chhattisgarh</option>
                    <option value="goa">Goa</option>
                    <option value="gujarat">Gujarat</option>
                    <option value="haryana">Haryana</option>
                    <option value="himachal-pradesh">Himachal Pradesh</option>
                    <option value="jharkhand">Jharkhand</option>
                    <option value="karnataka">Karnataka</option>
                    <option value="kerala">Kerala</option>
                    <option value="madhya-pradesh">Madhya Pradesh</option>
                    <option value="maharashtra">Maharashtra</option>
                    <option value="manipur">Manipur</option>
                    <option value="meghalaya">Meghalaya</option>
                    <option value="mizoram">Mizoram</option>
                    <option value="nagaland">Nagaland</option>
                    <option value="odisha">Odisha</option>
                    <option value="punjab">Punjab</option>
                    <option value="rajasthan">Rajasthan</option>
                    <option value="sikkim">Sikkim</option>
                    <option value="tamil-nadu">Tamil Nadu</option>
                    <option value="telangana">Telangana</option>
                    <option value="tripura">Tripura</option>
                    <option value="uttar-pradesh">Uttar Pradesh</option>
                    <option value="uttarakhand">Uttarakhand</option>
                    <option value="west-bengal">West Bengal</option>
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-white mb-2">
                    Preferred Language *
                  </label>
                  <select
                    name="language"
                    value={formData.language}
                    onChange={handleInputChange}
                    required
                    className="w-full px-3 sm:px-4 py-2 sm:py-2.5 text-sm sm:text-base border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  >
                    <option value="english">English</option>
                    <option value="kannada">Kannada</option>
                    <option value="tamil">Tamil</option>
                  </select>
                </div>

                {/* Product Selection - Default Selected */}
                <div className="mt-4 sm:mt-6 p-3 sm:p-4 bg-purple-50 rounded-lg border-2 border-purple-300">
                  <div className="flex items-center">
                    <input
                      type="radio"
                      name="product"
                      value="diabetes-reversal-workshop"
                      checked={true}
                      readOnly
                      className="mr-2 sm:mr-3 w-4 h-4 text-purple-600 focus:ring-purple-500 border-gray-300 flex-shrink-0"
                    />
                    <div className="flex-1 min-w-0">
                      <label className="text-base sm:text-lg font-semibold text-purple-800">
                        Diabetes Reversal Workshop
                      </label>
                      <p className="text-sm sm:text-base text-purple-600">₹199</p>
                    </div>
                  </div>
                </div>
                
                <button
                  type="submit"
                  className="w-full py-2.5 sm:py-3 text-sm sm:text-base bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-lg font-semibold hover:from-purple-700 hover:to-blue-700 transition-all duration-300"
                >
                  Pay Now
                </button>
                
                {/* Payment Information */}
                <div className="mt-4 text-center space-y-2">
                  <p className="text-xs text-gray-500">
                    🔒 Secure payment powered by Razorpay
                  </p>
                  
                  <div className="bg-green-50 rounded-lg p-3 border border-green-200">
                    <p className="text-sm font-semibold text-green-800 mb-2">
                      🎉You are getting all this for just ₹199!
                    </p>
                    <ul className="text-xs text-green-700 space-y-1 text-left">
                      <li>• 2-Hour Live Diabetes Reversal Workshop</li>
                      <li>• Home Workout Guide PDF</li>
                      <li>• 7 Day Diabetes Reversal Diet Plan</li>
                      <li>• Workshop Recording Access</li>
                      <li>• AI-Powered Health Tracking</li>
                      <li>• 3 Month Free Subscription to Eterno Wellness App</li>
                    </ul>
                  </div>
                </div>
              </form>
            </div>
          </div>
        )}
        
        </div>
      </div>
    </>
  );
};

export default DiabetesLandingPage;