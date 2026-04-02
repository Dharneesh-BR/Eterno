import React, { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { FiCheckCircle, FiShoppingBag } from 'react-icons/fi';

const OrderSuccess = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { orderId, paymentId } = location.state || {};

  useEffect(() => {
    console.log('OrderSuccess Page - Location state:', location.state);
    console.log('OrderSuccess Page - Order ID:', orderId);
    console.log('OrderSuccess Page - Payment ID:', paymentId);
  }, [location.state, orderId, paymentId]);

  const handleViewOrders = () => {
    navigate('/dashboard/orders');
  };

  const handleContinueShopping = () => {
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-background/80 flex items-center justify-center px-4">
      <div className="max-w-md w-full">
        <div className="bg-white rounded-2xl shadow-xl p-8 text-center">
          {/* Success Icon */}
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <FiCheckCircle className="w-8 h-8 text-green-600" />
          </div>

          {/* Success Message */}
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Order Successful!</h1>
          <p className="text-gray-600 mb-6">
            Thank you for your purchase. Your order has been received and is being processed.
          </p>

          {/* Order Details */}
          {orderId && (
            <div className="bg-white/10 backdrop-blur-md rounded-lg p-4 mb-6">
              <p className="text-sm text-gray-600 mb-2">Order Details:</p>
              <div className="space-y-1">
                {orderId && (
                  <p className="text-sm">
                    <span className="font-medium">Order ID:</span> {orderId}
                  </p>
                )}
                {paymentId && (
                  <p className="text-sm">
                    <span className="font-medium">Payment ID:</span> {paymentId}
                  </p>
                )}
              </div>
            </div>
          )}

          {/* Action Buttons */}
          <div className="space-y-3">
            <button
              onClick={handleViewOrders}
              className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
            >
              <FiShoppingBag className="w-4 h-4" />
              View My Orders
            </button>
            
            <button
              onClick={handleContinueShopping}
              className="w-full px-4 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
            >
              Continue Shopping
            </button>
          </div>

          {/* Additional Info */}
          <div className="mt-6 p-4 bg-blue-50 rounded-lg">
            <p className="text-sm text-blue-800">
              <strong>Note:</strong> You can view all your orders in the dashboard under "My Orders".
              If you don't see your order immediately, please refresh the page after a few minutes.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderSuccess;
