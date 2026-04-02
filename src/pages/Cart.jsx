import { useCart } from '../contexts/CartContext';
import { Link, useNavigate } from 'react-router-dom';
import { trackCTAClick, trackInitiateCheckout } from '../utils/metaPixel';

const Cart = () => {
  const { 
    cart, 
    isOpen, 
    setIsOpen,
    removeFromCart,
    updateQuantity,
    cartTotal,
    itemCount,
    clearCart
  } = useCart();
  
  const navigate = useNavigate();

  // If cart is empty, show empty state
  if (cart.length === 0) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center p-4">
        <div className="bg-white p-8 rounded-xl shadow-sm max-w-md w-full text-center">
          <div className="mx-auto flex items-center justify-center h-24 w-24 rounded-full bg-purple-50 mb-4">
            <svg
              className="h-12 w-12 text-purple-600"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="1"
                d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
              />
            </svg>
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Your cart is empty</h2>
          <p className="text-gray-500 mb-6">Looks like you haven't added anything to your cart yet.</p>
          <Link
            to="/"
            className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-main hover:bg-opacity-90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-main"
          >
            Continue Shopping
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-transparent">
      <div className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">Shopping Cart</h1>
          <p className="text-gray-600">Review your items before checkout</p>
        </div>

        <div className="lg:grid lg:grid-cols-12 lg:gap-x-8 lg:items-start">
          {/* Cart items */}
          <section aria-labelledby="cart-heading" className="lg:col-span-8">
            <h2 id="cart-heading" className="sr-only">
              Items in your shopping cart
            </h2>

            <div className="bg-white rounded-2xl shadow-xl border border-purple-100 overflow-hidden">
              <ul className="divide-y divide-gray-200">
                {cart.map((item) => (
                  <li key={item.id} className="p-6 hover:bg-gray-50 transition-colors">
                    <div className="flex flex-col sm:flex-row gap-4">
                      <div className="flex-shrink-0">
                        <img
                          src={item.imageUrl || item.image?.asset?.url || '/placeholder-program.jpg'}
                          alt={item.name || item.title}
                          className="w-32 h-32 rounded-xl object-cover object-center shadow-md"
                          loading="lazy"
                        />
                      </div>

                      <div className="flex-1 flex flex-col justify-between">
                        <div className="flex-1">
                          <div className="flex justify-between items-start mb-2">
                            <h3 className="text-lg font-semibold text-gray-900">
                              <Link
                                to={`/programs/${item.slug}`}
                                className="hover:text-purple-600 transition-colors"
                              >
                                {item.name || item.title}
                              </Link>
                            </h3>
                            <button
                              type="button"
                              onClick={() => removeFromCart(item.id)}
                              className="p-2 text-red-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-all"
                              title="Remove item"
                            >
                              <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 20 20">
                                <path
                                  fillRule="evenodd"
                                  d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                                  clipRule="evenodd"
                                />
                              </svg>
                            </button>
                          </div>
                          <p className="text-sm text-gray-600 mb-3">
                            {item.category && (
                              <span className="inline-block px-2 py-1 bg-purple-100 text-purple-700 text-xs font-medium rounded-full">
                                {item.category}
                              </span>
                            )}
                          </p>
                        </div>

                        <div className="flex items-center justify-between">
                          <div className="flex items-center border border-gray-300 rounded-lg">
                            <button
                              type="button"
                              onClick={() => updateQuantity(item.id, item.quantity - 1)}
                              className="p-3 text-gray-400 hover:text-gray-600 hover:bg-gray-100 transition-all"
                              title="Decrease quantity"
                            >
                              <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 20 20">
                                <path
                                  fillRule="evenodd"
                                  d="M3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
                                  clipRule="evenodd"
                                />
                              </svg>
                            </button>
                            <span className="px-4 py-2 text-lg font-semibold text-gray-900 min-w-[3rem] text-center">
                              {item.quantity}
                            </span>
                            <button
                              type="button"
                              onClick={() => updateQuantity(item.id, item.quantity + 1)}
                              className="p-3 text-gray-400 hover:text-gray-600 hover:bg-gray-100 transition-all"
                              title="Increase quantity"
                            >
                              <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 20 20">
                                <path
                                  fillRule="evenodd"
                                  d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z"
                                  clipRule="evenodd"
                                />
                              </svg>
                            </button>
                          </div>
                          <div className="text-right">
                            <p className="text-2xl font-bold text-gray-900">
                              {(() => {
                                const displayPrice = item.discountPrice && item.discountPrice < item.price ? item.discountPrice : item.price;
                                return `₹${displayPrice.toLocaleString()}`;
                              })()}
                            </p>
                            {item.discountPrice && item.discountPrice < item.price && (
                              <p className="text-sm text-gray-500 line-through">
                                ₹{item.price.toLocaleString()}
                              </p>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </section>

          {/* Order summary */}
          <section
            aria-labelledby="summary-heading"
            className="lg:col-span-4"
          >
            <div className="bg-white rounded-2xl shadow-xl border border-purple-100 p-6 sticky top-8">
              <h2 id="summary-heading" className="text-xl font-bold text-gray-900 mb-6">
                Order Summary
              </h2>

              <dl className="space-y-4">
                <div className="flex items-center justify-between py-3 border-b border-gray-200">
                  <dt className="text-gray-600">Subtotal</dt>
                  <dd className="text-lg font-semibold text-gray-900">
                    ₹{cartTotal.toLocaleString()}
                  </dd>
                </div>
                <div className="flex items-center justify-between py-3">
                  <dt className="text-xl font-bold text-gray-900">Total</dt>
                  <dd className="text-2xl font-bold text-purple-600">
                    ₹{cartTotal.toLocaleString()}
                  </dd>
                </div>
              </dl>

              <div className="mt-8 space-y-3">
                <button
                  onClick={() => {
                    trackCTAClick('Proceed to Checkout', 'Cart Page');
                    trackInitiateCheckout({
                      content_name: 'Shopping Cart',
                      content_category: 'E-commerce',
                      value: cartTotal,
                      currency: 'INR',
                      num_items: itemCount
                    });
                    navigate('/checkout');
                  }}
                  className="w-full bg-gradient-to-r from-purple-600 to-purple-700 text-white py-4 px-6 rounded-xl font-semibold hover:from-purple-700 hover:to-purple-800 transition-all transform hover:scale-[1.02] shadow-lg"
                >
                  Proceed to Checkout
                </button>

                <Link
                  to="/"
                  className="block w-full text-center py-3 px-6 border border-gray-300 rounded-xl text-gray-700 hover:bg-gray-50 hover:border-gray-400 transition-all font-medium"
                >
                  Continue Shopping
                </Link>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default Cart;
