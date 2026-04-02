// src/pages/Checkout.jsx
import { useState, useCallback } from "react";
import { useCart } from "../contexts/CartContext";
import { useNavigate } from "react-router-dom";
import { FiArrowLeft, FiCheck, FiUser, FiMail, FiPhone, FiShoppingCart, FiCreditCard, FiLoader, FiAlertCircle, FiPackage } from "react-icons/fi";
import { trackCTAClick, trackAddPaymentInfo, trackPurchase } from '../utils/metaPixel';

const Checkout = () => {

  const { cart, clearCart } = useCart();
  const navigate = useNavigate();

  const [currentStep, setCurrentStep] = useState("contact");
  const [guestInfo, setGuestInfo] = useState({
    name: "",
    mobile: "",
    email: ""
  });
  const [address, setAddress] = useState({
    fullName: "",
    mobile: "",
    email: "",
    street: "",
    area: "",
    landmark: "",
    city: "",
    state: "",
    pincode: "",
    country: "India"
  });

  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [paymentStatus, setPaymentStatus] = useState(null);
  const [orderDetails, setOrderDetails] = useState(null);

  const subtotal = cart.reduce((total, item) => {
    const price =
      item.discountPrice && item.discountPrice < item.price
        ? item.discountPrice
        : item.price;
    return total + price * item.quantity;
  }, 0);

  const total = subtotal;

  // Check if cart contains store products (has price field) vs programs (no price field)
  const hasStoreProducts = cart.some(item => item.price);

  const loadRazorpayScript = useCallback(() => {

    return new Promise((resolve) => {

      if (window.Razorpay) {
        resolve(true);
        return;
      }

      const script = document.createElement("script");
      script.src = "https://checkout.razorpay.com/v1/checkout.js";
      script.async = true;

      script.onload = () => resolve(true);
      script.onerror = () => resolve(false);

      document.body.appendChild(script);

    });

  }, []);

  const handleContactSubmit = () => {

    if (!guestInfo.name || !guestInfo.mobile) {
      setError("Please enter name and mobile number");
      return;
    }

    if (!/^[6-9]\d{9}$/.test(guestInfo.mobile)) {
      setError("Enter valid 10 digit mobile number");
      return;
    }

    // Validate address if store products
    if (hasStoreProducts) {
      if (address.street || address.area || address.city || address.state || address.pincode) {
        // If any address field is filled, validate all required fields
        if (!address.street || !address.area || !address.city || !address.state || !address.pincode) {
          setError("Please fill in all address fields or leave them empty");
          return;
        }
        if (!/^\d{6}$/.test(address.pincode)) {
          setError("Please enter a valid 6-digit PIN code");
          return;
        }
      }
    }

    setError(null);
    setCurrentStep("payment");

  };

  const handleCheckout = async () => {

    try {

      setError(null);
      setIsLoading(true);
      setPaymentStatus("processing");

      const razorpayLoaded = await loadRazorpayScript();

      if (!razorpayLoaded) {
        throw new Error("Razorpay SDK failed to load");
      }

      const orderResponse = await fetch("/.netlify/functions/create-razorpay-order", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          amount: Math.round(total * 100),
          currency: "INR"
        })
      });

      if (!orderResponse.ok) {
        throw new Error("Failed to create order");
      }

      const orderData = await orderResponse.json();
      const order = orderData.order;

      const options = {

        key: import.meta.env.VITE_RAZORPAY_KEY_ID,

        amount: order.amount,
        currency: order.currency,
        name: "Eterno Wellness",
        description: "Purchase",

        order_id: order.id,

        handler: async function (response) {

          try {

            setPaymentStatus("verifying");
            
            console.log("Payment response:", response);
            
            const saveResponse = await fetch("/.netlify/functions/save-order", {
              method: "POST",
              headers: {
                "Content-Type": "application/json"
              },
              body: JSON.stringify({
                razorpay_order_id: response.razorpay_order_id,
                razorpay_payment_id: response.razorpay_payment_id,
                razorpay_signature: response.razorpay_signature,
                amount: order.amount,
                currency: order.currency,
                items: cart,
                guestInfo,
                address: hasStoreProducts ? address : null, // Only include address for store products
                status: "completed"
              })
            });

            console.log("Save response status:", saveResponse.status);

            if (!saveResponse.ok) {
              const errorText = await saveResponse.text();
              console.error("Save response error:", errorText);
              throw new Error(`Failed to save order: ${saveResponse.status} - ${errorText}`);
            }

            const saveResult = await saveResponse.json();
            console.log("Save result:", saveResult);

            if (saveResult.success) {

              // Track purchase with Meta Pixel
              trackPurchase(total, 'INR', {
                content_name: 'E-commerce Purchase',
                content_category: 'Store Products',
                content_ids: cart.map(item => item.slug),
                order_id: response.razorpay_order_id,
                transaction_id: response.razorpay_payment_id,
                user_data: {
                  name: guestInfo.name,
                  email: guestInfo.email,
                  phone: guestInfo.mobile
                }
              });

              setOrderDetails({
                orderId: response.razorpay_order_id,
                paymentId: response.razorpay_payment_id,
                items: cart,
                total: total
              });

              setPaymentStatus("success");
              setCurrentStep("success");

            } else {

              throw new Error(saveResult.error || "Failed to save order");

            }

          } catch (err) {

            console.error("Payment verification error:", err);
            setPaymentStatus("error");
            setError(err.message || "Payment successful but failed to save order");

          }

        },

        modal: {
          ondismiss: function() {
            setPaymentStatus("cancelled");
            setError("Payment was cancelled");
          }
        },

        prefill: {
          name: guestInfo.name,
          email: guestInfo.email,
          contact: guestInfo.mobile
        },

        theme: {
          color: "#9333ea"
        }

      };

      const rzp = new window.Razorpay(options);
      rzp.open();

    } catch (err) {

      console.error(err);
      setPaymentStatus("error");
      setError(err.message || "Checkout failed");

    } finally {

      setIsLoading(false);

    }

  };

  const renderContactStep = () => (
    <div className="max-w-2xl mx-auto">
      <div className="bg-white rounded-2xl shadow-xl p-8">
        <div className="flex items-center mb-8">
          <div className="bg-purple-100 p-3 rounded-full mr-4">
            <FiUser className="text-purple-600 text-xl" />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-gray-800">Contact Information</h2>
            <p className="text-gray-600">
              {hasStoreProducts ? "Please provide your contact and delivery details" : "Please provide your contact details for program access"}
            </p>
          </div>
        </div>

        <div className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Full Name
            </label>
            <div className="relative">
              <FiUser className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                value={guestInfo.name}
                onChange={(e) =>
                  setGuestInfo({ ...guestInfo, name: e.target.value })
                }
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
                placeholder="Enter your full name"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Mobile Number
            </label>
            <div className="relative">
              <FiPhone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="tel"
                value={guestInfo.mobile}
                onChange={(e) =>
                  setGuestInfo({ ...guestInfo, mobile: e.target.value })
                }
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
                placeholder="Enter 10-digit mobile number"
                maxLength="10"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Email Address
            </label>
            <div className="relative">
              <FiMail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="email"
                value={guestInfo.email}
                onChange={(e) =>
                  setGuestInfo({ ...guestInfo, email: e.target.value })
                }
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
                placeholder="Enter your email address"
              />
            </div>
          </div>

          {/* Address fields - only show for store products */}
          {hasStoreProducts && (
            <div className="space-y-6 border-t pt-6">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">Delivery Address</h3>
              
              {/* Address Details */}
              <div className="bg-gray-50 p-4 rounded-lg">
                <h4 className="font-medium text-gray-700 mb-3">Address Details</h4>
                
                <div className="mb-4">
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Street Address
                    </label>
                    <textarea
                      value={address.street}
                      onChange={(e) =>
                        setAddress({ ...address, street: e.target.value })
                      }
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
                      placeholder="House/Flat No., Building Name, Street"
                      rows="2"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Area/Locality
                    </label>
                    <input
                      type="text"
                      value={address.area}
                      onChange={(e) =>
                        setAddress({ ...address, area: e.target.value })
                      }
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
                      placeholder="Area, Colony, Sector"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Landmark
                    </label>
                    <input
                      type="text"
                      value={address.landmark}
                      onChange={(e) =>
                        setAddress({ ...address, landmark: e.target.value })
                      }
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
                      placeholder="Nearby landmark (e.g., Temple, School, Mall)"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      City
                    </label>
                    <input
                      type="text"
                      value={address.city}
                      onChange={(e) =>
                        setAddress({ ...address, city: e.target.value })
                      }
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
                      placeholder="Enter your city"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      State
                    </label>
                    <select
                      value={address.state}
                      onChange={(e) =>
                        setAddress({ ...address, state: e.target.value })
                      }
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
                    >
                      <option value="">Select State</option>
                      <option value="Andhra Pradesh">Andhra Pradesh</option>
                      <option value="Arunachal Pradesh">Arunachal Pradesh</option>
                      <option value="Assam">Assam</option>
                      <option value="Bihar">Bihar</option>
                      <option value="Chhattisgarh">Chhattisgarh</option>
                      <option value="Goa">Goa</option>
                      <option value="Gujarat">Gujarat</option>
                      <option value="Haryana">Haryana</option>
                      <option value="Himachal Pradesh">Himachal Pradesh</option>
                      <option value="Jharkhand">Jharkhand</option>
                      <option value="Karnataka">Karnataka</option>
                      <option value="Kerala">Kerala</option>
                      <option value="Madhya Pradesh">Madhya Pradesh</option>
                      <option value="Maharashtra">Maharashtra</option>
                      <option value="Manipur">Manipur</option>
                      <option value="Meghalaya">Meghalaya</option>
                      <option value="Mizoram">Mizoram</option>
                      <option value="Nagaland">Nagaland</option>
                      <option value="Odisha">Odisha</option>
                      <option value="Punjab">Punjab</option>
                      <option value="Rajasthan">Rajasthan</option>
                      <option value="Sikkim">Sikkim</option>
                      <option value="Tamil Nadu">Tamil Nadu</option>
                      <option value="Telangana">Telangana</option>
                      <option value="Tripura">Tripura</option>
                      <option value="Uttar Pradesh">Uttar Pradesh</option>
                      <option value="Uttarakhand">Uttarakhand</option>
                      <option value="West Bengal">West Bengal</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      PIN Code
                    </label>
                    <input
                      type="text"
                      value={address.pincode}
                      onChange={(e) =>
                        setAddress({ ...address, pincode: e.target.value })
                      }
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
                      placeholder="Enter 6-digit PIN code"
                      maxLength="6"
                    />
                  </div>
                </div>
              </div>

              {/* Delivery Instructions */}
              <div className="bg-blue-50 p-4 rounded-lg">
                <h4 className="font-medium text-gray-700 mb-3">Delivery Instructions (Optional)</h4>
                <textarea
                  value={address.deliveryInstructions || ""}
                  onChange={(e) =>
                    setAddress({ ...address, deliveryInstructions: e.target.value })
                  }
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
                  placeholder="Any special instructions for delivery (e.g., Deliver at gate, Call before arriving, etc.)"
                  rows="2"
                />
              </div>
            </div>
          )}

          {error && (
            <div className="bg-red-50 border border-red-200 rounded-lg p-4 flex items-center">
              <FiAlertCircle className="text-red-500 mr-3" />
              <span className="text-red-700 text-sm">{error}</span>
            </div>
          )}

          <button
            onClick={handleContactSubmit}
            className="w-full bg-gradient-to-r from-purple-600 to-purple-700 text-white py-4 rounded-lg font-semibold hover:from-purple-700 hover:to-purple-800 transition-all transform hover:scale-[1.02] shadow-lg"
          >
            Continue to Payment
          </button>
        </div>
      </div>
    </div>
  );

  const renderPaymentStep = () => (
    <div className="max-w-4xl mx-auto">
      <div className="grid lg:grid-cols-2 gap-8">
        {/* Order Summary */}
        <div className="bg-white rounded-2xl shadow-xl p-8">
          <div className="flex items-center mb-6">
            <div className="bg-purple-100 p-3 rounded-full mr-4">
              <FiShoppingCart className="text-purple-600 text-xl" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-gray-800">Order Summary</h2>
              <p className="text-gray-600">Review your items</p>
            </div>
          </div>

          <div className="space-y-4 mb-6">
            {cart.map((item) => (
              <div key={item.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                <div className="flex items-center flex-1">
                  {item.image && (
                    <img 
                      src={item.image} 
                      alt={item.name}
                      className="w-16 h-16 object-cover rounded-lg mr-4"
                    />
                  )}
                  <div>
                    <h3 className="font-semibold text-gray-800">{item.name}</h3>
                    <p className="text-sm text-gray-600">Quantity: {item.quantity}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-bold text-purple-600">
                    ₹{(item.discountPrice && item.discountPrice < item.price ? item.discountPrice : item.price) * item.quantity}
                  </p>
                  {item.discountPrice && item.discountPrice < item.price && (
                    <p className="text-sm text-gray-500 line-through">₹{item.price * item.quantity}</p>
                  )}
                </div>
              </div>
            ))}
          </div>

          <div className="border-t pt-4">
            <div className="flex justify-between items-center text-xl font-bold text-purple-600 pt-2">
              <span>Total</span>
              <span>₹{total}</span>
            </div>
          </div>
        </div>

        {/* Payment Details */}
        <div className="bg-white rounded-2xl shadow-xl p-8">
          <div className="flex items-center mb-6">
            <div className="bg-purple-100 p-3 rounded-full mr-4">
              <FiCreditCard className="text-purple-600 text-xl" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-gray-800">Payment</h2>
              <p className="text-gray-600">Secure payment via Razorpay</p>
            </div>
          </div>

          <div className="space-y-4">
            <div className="bg-gray-50 p-4 rounded-lg">
              <h3 className="font-semibold text-gray-800 mb-2">Customer Details</h3>
              <div className="space-y-1 text-sm">
                <p><span className="text-gray-600">Name:</span> {guestInfo.name}</p>
                <p><span className="text-gray-600">Mobile:</span> {guestInfo.mobile}</p>
                <p><span className="text-gray-600">Email:</span> {guestInfo.email}</p>
                {hasStoreProducts && (
                  <div className="mt-3 pt-3 border-t">
                    <h4 className="font-medium text-gray-800 mb-2">Delivery Address</h4>
                    <div className="space-y-1 text-sm">
                      <p><span className="text-gray-600">Address:</span> {address.street}, {address.area}</p>
                      {address.landmark && <p><span className="text-gray-600">Landmark:</span> {address.landmark}</p>}
                      <p><span className="text-gray-600">City:</span> {address.city}</p>
                      <p><span className="text-gray-600">State:</span> {address.state}</p>
                      <p><span className="text-gray-600">PIN:</span> {address.pincode}</p>
                      {address.deliveryInstructions && <p><span className="text-gray-600">Instructions:</span> {address.deliveryInstructions}</p>}
                    </div>
                  </div>
                )}
              </div>
            </div>

            {paymentStatus && (
              <div className={`p-4 rounded-lg flex items-center ${
                paymentStatus === "processing" ? "bg-blue-50 text-blue-700" :
                paymentStatus === "verifying" ? "bg-yellow-50 text-yellow-700" :
                paymentStatus === "success" ? "bg-green-50 text-green-700" :
                paymentStatus === "cancelled" ? "bg-gray-50 text-gray-700" :
                "bg-red-50 text-red-700"
              }`}>
                <FiLoader className={`mr-3 ${paymentStatus === "processing" || paymentStatus === "verifying" ? "animate-spin" : ""}`} />
                <span className="text-sm font-medium">
                  {paymentStatus === "processing" && "Processing payment..."}
                  {paymentStatus === "verifying" && "Verifying payment..."}
                  {paymentStatus === "success" && "Payment successful!"}
                  {paymentStatus === "cancelled" && "Payment cancelled"}
                  {paymentStatus === "error" && "Payment failed"}
                </span>
              </div>
            )}

            {error && (
              <div className="bg-red-50 border border-red-200 rounded-lg p-4 flex items-center">
                <FiAlertCircle className="text-red-500 mr-3" />
                <span className="text-red-700 text-sm">{error}</span>
              </div>
            )}

            <button
              onClick={handleCheckout}
              disabled={isLoading || paymentStatus === "processing" || paymentStatus === "verifying"}
              className="w-full bg-gradient-to-r from-purple-600 to-purple-700 text-white py-4 rounded-lg font-semibold hover:from-purple-700 hover:to-purple-800 transition-all transform hover:scale-[1.02] shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? (
                <span className="flex items-center justify-center">
                  <FiLoader className="animate-spin mr-2" />
                  Processing...
                </span>
              ) : (
                `Pay ₹${total}`
              )}
            </button>

            <div className="text-center text-sm text-gray-500">
              <p>Secure payment powered by Razorpay</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const renderSuccessStep = () => (
    <div className="max-w-2xl mx-auto">
      <div className="bg-white rounded-2xl shadow-xl p-12 text-center">
        <div className="flex justify-center mb-8">
          <div className="bg-green-100 p-6 rounded-full">
            <FiCheck className="text-green-600 text-4xl" />
          </div>
        </div>

        <div className="mb-8">
          <h2 className="text-3xl font-bold text-green-700 mb-4">
            Payment Successful!
          </h2>
          <p className="text-gray-600 text-lg mb-2">
            Thank you for your purchase
          </p>
          <p className="text-gray-500">
            Your order has been placed successfully and will be processed shortly.
          </p>
        </div>

        <div className="bg-gray-50 rounded-lg p-6 mb-8">
          <h3 className="font-semibold text-gray-800 mb-4">Order Details</h3>
          
          {/* Purchased Items */}
          <div className="mb-6">
            <h4 className="font-medium text-gray-700 mb-3">Purchased Items:</h4>
            <div className="space-y-3">
              {orderDetails?.items?.map((item) => (
                <div key={item.id} className="flex items-center justify-between bg-white p-4 rounded-lg">
                  <div className="flex items-center flex-1">
                    {(item.image || item.imageUrl) && (
                      <img 
                        src={item.image || item.imageUrl} 
                        alt={item.title || item.name}
                        className="w-16 h-16 object-cover rounded-lg mr-4"
                      />
                    )}
                    <div>
                      <h5 className="font-semibold text-gray-800">{item.title || item.name}</h5>
                      <p className="text-sm text-gray-600">Quantity: {item.quantity}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-bold text-purple-600">
                      ₹{(item.discountPrice && item.discountPrice < item.price ? item.discountPrice : item.price) * item.quantity}
                    </p>
                    {item.discountPrice && item.discountPrice < item.price && (
                      <p className="text-sm text-gray-500 line-through">₹{item.price * item.quantity}</p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          {/* Order Information */}
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-gray-600">Order ID:</span>
              <span className="font-medium">{orderDetails?.orderId || 'N/A'}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Payment ID:</span>
              <span className="font-medium">{orderDetails?.paymentId || 'N/A'}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Total Amount:</span>
              <span className="font-medium text-purple-600">₹{orderDetails?.total || total}</span>
            </div>
          </div>
        </div>

        <div className="flex justify-center">
          <button
            onClick={() => {
              clearCart();
              navigate("/");
            }}
            className="px-8 py-3 bg-gradient-to-r from-purple-600 to-purple-700 text-white rounded-lg font-semibold hover:from-purple-700 hover:to-purple-800 transition-all"
          >
            Back to Home
          </button>
        </div>
      </div>
    </div>
  );

  if (cart.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="bg-white rounded-2xl shadow-xl p-12 max-w-md">
            <FiShoppingCart className="text-gray-400 text-6xl mx-auto mb-6" />
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Your cart is empty</h2>
            <p className="text-gray-600 mb-8">
              Add some items to your cart to proceed with checkout.
            </p>
            <button
              onClick={() => navigate("/")}
              className="px-8 py-3 bg-gradient-to-r from-purple-600 to-purple-700 text-white rounded-lg font-semibold hover:from-purple-700 hover:to-purple-800 transition-all"
            >
              Continue Shopping
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-12">
      <div className="max-w-6xl mx-auto px-4">
        <button
          onClick={() => navigate("/cart")}
          className="flex items-center text-gray-600 hover:text-purple-600 transition-colors mb-8"
        >
          <FiArrowLeft className="mr-2" />
          Back to Cart
        </button>

        {/* Progress Indicator */}
        <div className="mb-12">
          <div className="flex items-center justify-center">
            <div className={`flex items-center ${currentStep === "contact" || currentStep === "payment" || currentStep === "success" ? "text-purple-600" : "text-gray-400"}`}>
              <div className={`w-10 h-10 rounded-full flex items-center justify-center ${currentStep === "contact" || currentStep === "payment" || currentStep === "success" ? "bg-purple-600 text-white" : "bg-gray-300"}`}>
                <FiUser />
              </div>
              <span className="ml-2 font-medium">Contact</span>
            </div>
            <div className={`w-16 h-1 mx-4 ${currentStep === "payment" || currentStep === "success" ? "bg-purple-600" : "bg-gray-300"}`}></div>
            <div className={`flex items-center ${currentStep === "payment" || currentStep === "success" ? "text-purple-600" : "text-gray-400"}`}>
              <div className={`w-10 h-10 rounded-full flex items-center justify-center ${currentStep === "payment" || currentStep === "success" ? "bg-purple-600 text-white" : "bg-gray-300"}`}>
                <FiCreditCard />
              </div>
              <span className="ml-2 font-medium">Payment</span>
            </div>
            <div className={`w-16 h-1 mx-4 ${currentStep === "success" ? "bg-purple-600" : "bg-gray-300"}`}></div>
            <div className={`flex items-center ${currentStep === "success" ? "text-purple-600" : "text-gray-400"}`}>
              <div className={`w-10 h-10 rounded-full flex items-center justify-center ${currentStep === "success" ? "bg-purple-600 text-white" : "bg-gray-300"}`}>
                <FiCheck />
              </div>
              <span className="ml-2 font-medium">Success</span>
            </div>
          </div>
        </div>

        {currentStep === "contact" && renderContactStep()}
        {currentStep === "payment" && renderPaymentStep()}
        {currentStep === "success" && renderSuccessStep()}
      </div>
    </div>
  );

};

export default Checkout;

