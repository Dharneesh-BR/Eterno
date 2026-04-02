import React, { useState, useEffect, useRef } from 'react';
import { setUpRecaptcha, sendPhoneOTP, verifyPhoneOTP, clearPhoneAuth } from '../firebase';
import { PhoneIcon, LockClosedIcon, UserIcon } from '@heroicons/react/24/solid';

const PhoneAuth = ({ onAuthSuccess, onBack }) => {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [otp, setOtp] = useState('');
  const [name, setName] = useState('');
  const [showOtpInput, setShowOtpInput] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [recaptchaVerifier, setRecaptchaVerifier] = useState(null);

  const recaptchaContainerRef = useRef(null);

  useEffect(() => {
    // Set up reCAPTCHA when component mounts
    const verifier = setUpRecaptcha('recaptcha-container');
    setRecaptchaVerifier(verifier);

    return () => {
      // Clean up when component unmounts
      clearPhoneAuth();
    };
  }, []);

  const formatPhoneNumber = (number) => {
    // Remove all non-digit characters
    const cleaned = number.replace(/\D/g, '');
    
    // Format as +91XXXXXXXXXX for Indian numbers
    if (cleaned.length === 10) {
      return `+91${cleaned}`;
    }
    
    // Return as is if already has country code
    if (cleaned.startsWith('91') && cleaned.length === 12) {
      return `+${cleaned}`;
    }
    
    return number;
  };

  const handleSendOTP = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const formattedPhone = formatPhoneNumber(phoneNumber);
      
      if (formattedPhone.length < 12) {
        setError('Please enter a valid 10-digit mobile number');
        setLoading(false);
        return;
      }

      const result = await sendPhoneOTP(formattedPhone, recaptchaVerifier);
      
      if (result.success) {
        setShowOtpInput(true);
        setError('');
        
        // Show test mode info if applicable
        if (result.isTestMode) {
          console.log('Test mode activated - OTP:', formattedPhone === '+911234567890' ? '123456' : '654321');
        }
      } else {
        setError(result.message || 'Failed to send OTP');
      }
    } catch (err) {
      setError('Failed to send OTP. Please try again.');
      console.error('Send OTP error:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyOTP = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      if (otp.length !== 6) {
        setError('Please enter a valid 6-digit OTP');
        setLoading(false);
        return;
      }

      const result = await verifyPhoneOTP(otp, name);
      
      if (result.success) {
        onAuthSuccess(result.user);
        clearPhoneAuth();
      } else {
        setError(result.message || 'Failed to verify OTP');
      }
    } catch (err) {
      setError('Failed to verify OTP. Please try again.');
      console.error('Verify OTP error:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleResendOTP = async () => {
    setError('');
    setLoading(true);
    setOtp('');

    try {
      const formattedPhone = formatPhoneNumber(phoneNumber);
      const result = await sendPhoneOTP(formattedPhone, recaptchaVerifier);
      
      if (result.success) {
        setError('');
      } else {
        setError(result.message || 'Failed to resend OTP');
      }
    } catch (err) {
      setError('Failed to resend OTP. Please try again.');
      console.error('Resend OTP error:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleBack = () => {
    clearPhoneAuth();
    onBack();
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-900 via-purple-800 to-indigo-900 px-4">
      {/* reCAPTCHA container - hidden */}
      <div id="recaptcha-container" className="hidden"></div>
      
      <div className="max-w-md w-full space-y-8">
        {/* Header */}
        <div className="text-center">
          <h2 className="text-3xl font-bold text-white mb-2">
            {showOtpInput ? 'Verify OTP' : 'Phone Login'}
          </h2>
          <p className="text-purple-200">
            {showOtpInput 
              ? 'Enter the 6-digit code sent to your phone'
              : 'Enter your phone number to receive a verification code'
            }
          </p>
        </div>

        {/* Form */}
        <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/20">
          {!showOtpInput ? (
            // Phone Number Form
            <form onSubmit={handleSendOTP} className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-purple-200 mb-2">
                  Phone Number
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <PhoneIcon className="h-5 w-5 text-purple-400" />
                  </div>
                  <input
                    type="tel"
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value)}
                    placeholder="Enter 10-digit mobile number"
                    className="w-full pl-10 pr-3 py-3 bg-white/20 border border-purple-400/30 rounded-lg text-white placeholder-purple-300 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    maxLength={10}
                    required
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={loading || phoneNumber.length !== 10}
                className="w-full py-3 px-4 bg-gradient-to-r from-purple-600 to-indigo-600 text-white rounded-lg font-semibold hover:from-purple-700 hover:to-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
              >
                {loading ? 'Sending...' : 'Send OTP'}
              </button>
            </form>
          ) : (
            // OTP Verification Form
            <form onSubmit={handleVerifyOTP} className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-purple-200 mb-2">
                  Your Name
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <UserIcon className="h-5 w-5 text-purple-400" />
                  </div>
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Enter your name"
                    className="w-full pl-10 pr-3 py-3 bg-white/20 border border-purple-400/30 rounded-lg text-white placeholder-purple-300 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-purple-200 mb-2">
                  Verification Code
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <LockClosedIcon className="h-5 w-5 text-purple-400" />
                  </div>
                  <input
                    type="text"
                    value={otp}
                    onChange={(e) => setOtp(e.target.value.replace(/\D/g, ''))}
                    placeholder="Enter 6-digit OTP"
                    className="w-full pl-10 pr-3 py-3 bg-white/20 border border-purple-400/30 rounded-lg text-white placeholder-purple-300 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent text-center text-lg font-mono"
                    maxLength={6}
                    required
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={loading || otp.length !== 6}
                className="w-full py-3 px-4 bg-gradient-to-r from-purple-600 to-indigo-600 text-white rounded-lg font-semibold hover:from-purple-700 hover:to-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
              >
                {loading ? 'Verifying...' : 'Verify & Login'}
              </button>

              <button
                type="button"
                onClick={handleResendOTP}
                disabled={loading}
                className="w-full py-2 px-4 text-purple-300 hover:text-white transition-colors duration-200 text-sm"
              >
                {loading ? 'Resending...' : "Didn't receive code? Resend OTP"}
              </button>
            </form>
          )}

          {/* Error Message */}
          {error && (
            <div className="mt-4 p-3 bg-red-500/20 border border-red-500/50 rounded-lg">
              <p className="text-red-200 text-sm">{error}</p>
            </div>
          )}

          {/* Back Button */}
          <button
            onClick={handleBack}
            className="w-full mt-4 py-2 px-4 text-purple-300 hover:text-white transition-colors duration-200 text-sm"
          >
            ← Back to Login Options
          </button>
        </div>
      </div>
    </div>
  );
};

export default PhoneAuth;
