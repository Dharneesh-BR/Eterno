import React from 'react';
import { FiUser, FiLogOut, FiHome, FiShoppingBag } from 'react-icons/fi';
import { useNavigate } from 'react-router-dom';
import { logout, getUserData } from '../utils/authHelpers';
import { trackCTAClick, trackViewContent } from '../utils/metaPixel';

const Dashboard = () => {
  const navigate = useNavigate();
  const userData = getUserData();

  const handleLogout = () => {
    trackCTAClick('Logout', 'Dashboard');
    logout();
    navigate('/login');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-4">
              <FiHome className="w-6 h-6 text-purple-600" />
              <h1 className="text-xl font-semibold text-gray-900">Dashboard</h1>
            </div>
            
            <button
              onClick={handleLogout}
              className="flex items-center space-x-2 px-4 py-2 text-gray-700 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <FiLogOut className="w-4 h-4" />
              <span>Logout</span>
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white rounded-xl shadow-sm p-6">
          {/* Welcome Section */}
          <div className="mb-8">
            <div className="flex items-center space-x-4 mb-4">
              <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center">
                <FiUser className="w-6 h-6 text-purple-600" />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-gray-900">
                  Welcome back!
                </h2>
                <p className="text-gray-600">
                  {userData?.mobile ? `Mobile: ${userData.mobile}` : 'Authenticated User'}
                </p>
              </div>
            </div>
          </div>

          {/* Dashboard Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Quick Actions */}
            <div className="bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl p-6 text-white">
              <div className="flex items-center justify-between mb-4">
                <FiShoppingBag className="w-8 h-8" />
                <span className="text-2xl font-bold">Shop</span>
              </div>
              <h3 className="text-lg font-semibold mb-2">Browse Products</h3>
              <p className="text-purple-100 text-sm mb-4">
                Explore our wellness products
              </p>
              <button
                onClick={() => {
                  trackCTAClick('Visit Store', 'Dashboard');
                  navigate('/store');
                }}
                className="bg-white text-purple-600 px-4 py-2 rounded-lg font-medium hover:bg-purple-50 transition-colors"
              >
                Visit Store
              </button>
            </div>

            {/* Account Info */}
            <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl p-6 text-white">
              <div className="flex items-center justify-between mb-4">
                <FiUser className="w-8 h-8" />
                <span className="text-2xl font-bold">Profile</span>
              </div>
              <h3 className="text-lg font-semibold mb-2">Account Details</h3>
              <div className="space-y-2 text-sm">
                <p>Mobile: {userData?.mobile || 'N/A'}</p>
                <p>Status: Active</p>
                <p>Member Since: New User</p>
              </div>
            </div>

            {/* Quick Stats */}
            <div className="bg-gradient-to-br from-green-500 to-green-600 rounded-xl p-6 text-white">
              <h3 className="text-lg font-semibold mb-4">Quick Stats</h3>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span>Orders</span>
                  <span className="font-bold">0</span>
                </div>
                <div className="flex justify-between">
                  <span>Wishlist</span>
                  <span className="font-bold">0</span>
                </div>
                <div className="flex justify-between">
                  <span>Cart Items</span>
                  <span className="font-bold">0</span>
                </div>
              </div>
            </div>
          </div>

          {/* Recent Activity */}
          <div className="mt-8">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Activity</h3>
            <div className="bg-gray-50 rounded-lg p-6 text-center">
              <p className="text-gray-600 mb-4">No recent activity</p>
              <button
                onClick={() => {
                  trackCTAClick('Start Shopping', 'Dashboard');
                  navigate('/store');
                }}
                className="text-purple-600 hover:text-purple-700 font-medium"
              >
                Start Shopping →
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
