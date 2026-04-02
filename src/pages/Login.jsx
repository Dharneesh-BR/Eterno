import { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { signInWithGoogle } from '../firebase';
import OtpLogin from '../components/OtpLogin';
import { trackCompleteRegistration, trackCTAClick } from '../utils/metaPixel';

export default function Login() {
  const [showOtpLogin, setShowOtpLogin] = useState(true);
  const navigate = useNavigate();
  const location = useLocation();
  const { from, message } = location.state || { from: '/', message: null };

  const handleSocial = async (provider) => {
    try {
      const result = await signInWithGoogle();
      if (result.success) {
        trackCompleteRegistration({
          content_name: 'Google Login',
          content_category: 'Authentication',
          method: 'Google OAuth'
        });
        navigate(from, { replace: true });
      } else {
        console.error('Google login failed:', result.error);
      }
    } catch (e) {
      console.error('Google login failed:', e);
    }
  };

  const handleOtpLoginSuccess = () => {
    trackCompleteRegistration({
      content_name: 'OTP Login',
      content_category: 'Authentication',
      method: 'Phone OTP'
    });
    navigate(from, { replace: true });
  };

  // Always show OTP login as the primary login method
  if (showOtpLogin) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-900 via-purple-800 to-indigo-900 flex items-center justify-center py-12 sm:px-6 lg:px-8">
        <div className="max-w-md w-full space-y-8">
          {/* Header */}
          <div className="text-center">
            <h2 className="mt-6 text-3xl font-extrabold text-white">
              Sign in to your account
            </h2>
            <p className="mt-2 text-center text-sm text-purple-200">
              Or{' '}
              <Link to="/signup" className="font-medium text-purple-300 hover:text-purple-100 transition-colors duration-200">
                create a new account
              </Link>
            </p>
          </div>

          {/* OTP Login Component */}
          <div className="bg-white/10 backdrop-blur-md py-8 px-4 shadow-2xl sm:rounded-lg sm:px-10 border border-white/20">
            <OtpLogin onAuthSuccess={handleOtpLoginSuccess} />
          </div>

          {/* Social Login Options */}
          <div className="bg-white/10 backdrop-blur-md py-6 px-4 shadow-2xl sm:rounded-lg sm:px-10 border border-white/20">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-purple-300/30"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-transparent text-purple-200">Or continue with</span>
              </div>
            </div>

            <div className="mt-6 space-y-3">
              <button
                type="button"
                onClick={() => handleSocial('google')}
                className="w-full inline-flex justify-center py-3 sm:py-4 px-4 sm:px-6 border border-purple-300/30 rounded-lg shadow-lg bg-white/10 text-sm sm:text-base font-medium text-purple-200 hover:bg-white/20 transition-all duration-200 backdrop-blur-sm"
              >
                <span className="sr-only">Sign in with Google</span>
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M12.48 10.92v3.28h7.84c-.24 1.84-.853 3.187-1.787 4.133-1.147 1.147-2.933 2.4-6.053 2.4-4.827 0-8.6-3.893-8.6-8.72s3.773-8.72 8.6-8.72c2.6 0 4.507 1.027 5.907 2.347l2.307-2.307C18.747 1.44 16.133 0 12.48 0 5.867 0 .307 5.387.307 12s5.56 12 12.173 12c3.573 0 6.267-1.173 8.373-3.36 2.16-2.16 2.84-5.213 2.84-7.667 0-.76-.053-1.467-.173-2.053H12.48z" />
                </svg>
                <span className="ml-2">Sign in with Google</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return null;
}

