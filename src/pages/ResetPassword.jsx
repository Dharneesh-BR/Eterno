import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { resetPassword } from '../firebase';

const ResetPassword = () => {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!email) {
      setError('Please enter your email address');
      return;
    }
    
    if (!/\S+@\S+\.\S+/.test(email)) {
      setError('Please enter a valid email address');
      return;
    }
    
    setIsSubmitting(true);
    setError('');
    setMessage('');
    
    try {
      const result = await resetPassword(email);
      
      if (result.success) {
        setMessage('Password reset email sent! Please check your inbox.');
      } else {
        setError(result.error || 'Failed to send password reset email. Please try again.');
      }
    } catch (err) {
      console.error('Password reset error:', err);
      setError('An error occurred. Please try again later.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <h2 className="mt-6 text-center text-3xl font-extrabold text-white">
          Reset Your Password
        </h2>
        <p className="mt-2 text-center text-sm text-purple-200">
          Enter your email address and we'll send you a link to reset your password.
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white/10 backdrop-blur-md py-8 px-4 shadow-2xl sm:rounded-lg sm:px-10 border border-white/20">
          {message && (
            <div className="mb-4 p-4 bg-green-500/20 border border-green-400/30 text-green-100 rounded-md">
              {message}
            </div>
          )}
          
          {error && (
            <div className="mb-4 p-4 bg-red-500/20 border border-red-400/30 text-red-100 rounded-md">
              {error}
            </div>
          )}
          
          <form className="space-y-6" onSubmit={handleSubmit}>
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-purple-100">
                Email address
              </label>
              <div className="mt-1">
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="appearance-none block w-full px-3 py-2 border border-purple-300/30 rounded-md shadow-sm placeholder-purple-300 bg-white/10 text-white focus:outline-none focus:ring-2 focus:ring-purple-400 focus:border-purple-400 sm:text-sm backdrop-blur-sm"
                  placeholder="you@example.com"
                />
              </div>
            </div>

            <div>
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-purple-600 hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
              >
                {isSubmitting ? 'Sending...' : 'Send Reset Link'}
              </button>
            </div>
          </form>

          <div className="mt-6">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-purple-300/30"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-transparent text-purple-200">
                  Remember your password?
                </span>
              </div>
            </div>

            <div className="mt-6 text-center">
              <Link 
                to="/login" 
                className="font-medium text-purple-300 hover:text-purple-100 transition-colors duration-200"
              >
                Back to Sign in
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResetPassword;
