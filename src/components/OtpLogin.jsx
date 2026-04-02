import React, { useState } from 'react';
import { FiPhone, FiLock, FiArrowRight, FiLoader, FiAlertCircle } from 'react-icons/fi';
import { useNavigate } from 'react-router-dom';
import { trackCompleteRegistration, trackOTPSuccess } from '../utils/metaPixel';

const OtpLogin = ({ onAuthSuccess }) => {
  const navigate = useNavigate();
  const [step, setStep] = useState('mobile'); // mobile, otp
  const [mobile, setMobile] = useState('');
  const [otp, setOtp] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [otpSent, setOtpSent] = useState(false);

  // Send OTP function
  const sendOtp = async () => {
    if (!mobile.trim()) {
      setError('Please enter your mobile number');
      return;
    }

    if (!/^[6-9]\d{9}$/.test(mobile)) {
      setError('Please enter a valid 10-digit mobile number');
      return;
    }

    setLoading(true);
    setError('');

    try {
      const response = await fetch('/.netlify/functions/send-otp', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ mobile }),
      });

      const data = await response.json();

      if (response.ok && data.success) {
        setOtpSent(true);
        setStep('otp');
      } else {
        setError(data.error || 'Failed to send OTP');
      }
    } catch (err) {
      setError('Network error. Please try again.');
      console.error('Send OTP error:', err);
    } finally {
      setLoading(false);
    }
  };

  // Verify OTP function
  const verifyOtp = async () => {
    if (!otp.trim()) {
      setError('Please enter the OTP');
      return;
    }

    if (otp.length !== 6) {
      setError('Please enter a valid 6-digit OTP');
      return;
    }

    setLoading(true);
    setError('');

    try {
      const response = await fetch('/.netlify/functions/verify-otp', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ mobile, otp }),
      });

      const data = await response.json();

      if (response.ok && data.success) {
        // Store token in localStorage
        localStorage.setItem('auth_token', data.token);
        
        // Call success callback or navigate to dashboard
        if (onAuthSuccess) {
          trackOTPSuccess({
            content_name: 'OTP Verification',
            content_category: 'Authentication',
            method: 'Phone OTP',
            user_data: {
              phone: mobile
            }
          });
          onAuthSuccess();
        } else {
          trackOTPSuccess({
            content_name: 'OTP Verification',
            content_category: 'Authentication',
            method: 'Phone OTP',
            user_data: {
              phone: mobile
            }
          });
          navigate('/dashboard');
        }
      } else {
        setError(data.error || 'Invalid OTP');
      }
    } catch (err) {
      setError('Network error. Please try again.');
      console.error('Verify OTP error:', err);
    } finally {
      setLoading(false);
    }
  };

  // Reset to mobile input
  const resetToMobile = () => {
    setStep('mobile');
    setOtp('');
    setOtpSent(false);
    setError('');
  };

  // Handle Enter key press
  const handleKeyPress = (e, action) => {
    if (e.key === 'Enter') {
      action();
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-indigo-100 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-xl p-8 w-full max-w-md">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-purple-600 rounded-full flex items-center justify-center mx-auto mb-4">
            <FiPhone className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-2xl font-bold text-gray-900 mb-2">
            {step === 'mobile' ? 'Welcome Back' : 'Verify OTP'}
          </h1>
          <p className="text-gray-600 text-sm">
            {step === 'mobile' 
              ? 'Enter your mobile number to continue' 
              : `We've sent a 6-digit code to ${mobile}`
            }
          </p>
        </div>

        {/* Error Display */}
        {error && (
          <div className="mb-6 p-3 bg-red-50 border border-red-200 rounded-lg flex items-center space-x-2">
            <FiAlertCircle className="w-5 h-5 text-red-600 flex-shrink-0" />
            <span className="text-red-700 text-sm">{error}</span>
          </div>
        )}

        {/* Step 1: Mobile Input */}
        {step === 'mobile' && (
          <div className="space-y-6">
            <div>
              <label htmlFor="mobile" className="block text-sm font-medium text-gray-700 mb-2">
                Mobile Number
              </label>
              <div className="relative">
                <FiPhone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  id="mobile"
                  type="tel"
                  value={mobile}
                  onChange={(e) => setMobile(e.target.value.replace(/\D/g, ''))}
                  onKeyPress={(e) => handleKeyPress(e, sendOtp)}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-colors"
                  placeholder="Enter 10-digit mobile number"
                  maxLength={10}
                  disabled={loading}
                />
              </div>
            </div>

            <button
              onClick={sendOtp}
              disabled={loading || !mobile.trim()}
              className="w-full bg-purple-600 text-white py-3 px-4 rounded-lg font-medium hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
            >
              {loading ? (
                <>
                  <FiLoader className="w-5 h-5 animate-spin" />
                  <span>Sending OTP...</span>
                </>
              ) : (
                <>
                  <span>Send OTP</span>
                  <FiArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </div>
        )}

        {/* Step 2: OTP Input */}
        {step === 'otp' && (
          <div className="space-y-6">
            <div>
              <label htmlFor="otp" className="block text-sm font-medium text-gray-700 mb-2">
                Enter OTP
              </label>
              <div className="relative">
                <FiLock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  id="otp"
                  type="text"
                  value={otp}
                  onChange={(e) => setOtp(e.target.value.replace(/\D/g, ''))}
                  onKeyPress={(e) => handleKeyPress(e, verifyOtp)}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-colors text-center text-2xl font-mono"
                  placeholder="000000"
                  maxLength={6}
                  disabled={loading}
                  autoFocus
                />
              </div>
            </div>

            <div className="space-y-3">
              <button
                onClick={verifyOtp}
                disabled={loading || !otp.trim()}
                className="w-full bg-purple-600 text-white py-3 px-4 rounded-lg font-medium hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
              >
                {loading ? (
                  <>
                    <FiLoader className="w-5 h-5 animate-spin" />
                    <span>Verifying...</span>
                  </>
                ) : (
                  <>
                    <span>Verify OTP</span>
                    <FiArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>

              <button
                onClick={resetToMobile}
                disabled={loading}
                className="w-full text-gray-600 py-2 px-4 rounded-lg font-medium hover:text-gray-800 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Change Mobile Number
              </button>

              <button
                onClick={sendOtp}
                disabled={loading}
                className="w-full text-purple-600 py-2 px-4 rounded-lg font-medium hover:text-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? 'Resending...' : 'Resend OTP'}
              </button>
            </div>
          </div>
        )}

        {/* Footer */}
        <div className="mt-8 pt-6 border-t border-gray-200 text-center">
          <p className="text-xs text-gray-500">
            By continuing, you agree to our Terms of Service and Privacy Policy
          </p>
        </div>
      </div>
    </div>
  );
};

export default OtpLogin;
