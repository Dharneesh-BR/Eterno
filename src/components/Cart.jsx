import React from 'react';
import { useCart } from '../contexts/CartContext';
import { XMarkIcon, MinusIcon, PlusIcon } from '@heroicons/react/24/outline';
import { Link } from 'react-router-dom';

const Cart = () => {
  const {
    cart,
    isOpen,
    setIsOpen,
    removeFromCart,
    updateQuantity,
    cartTotal,
    itemCount,
    clearCart,
  } = useCart();

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      <div className="absolute inset-0 overflow-hidden">
        <div
          className="absolute inset-0 bg-gray-500 bg-opacity-75 transition-opacity"
          onClick={() => setIsOpen(false)}
          aria-hidden="true"
        />
        
        <div className="fixed inset-y-0 right-0 max-w-full flex">
          <div className="w-screen max-w-md">
            <div className="h-full flex flex-col bg-white shadow-xl overflow-y-scroll">
              <div className="flex-1 py-6 overflow-y-auto px-4 sm:px-6">
                <div className="flex items-start justify-between">
                  <h2 className="text-lg font-medium text-gray-900">Shopping cart</h2>
                  <div className="ml-3 h-7 flex items-center">
                    <button
                      type="button"
                      className="-m-2 p-2 text-gray-400 hover:text-gray-500"
                      onClick={() => setIsOpen(false)}
                    >
                      <span className="sr-only">Close panel</span>
                      <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                    </button>
                  </div>
                </div>

                <div className="mt-8">
                  <div className="flow-root">
                    {cart.length === 0 ? (
                      <div className="text-center py-12">
                        <svg
                          className="mx-auto h-12 w-12 text-gray-400"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                          aria-hidden="true"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="1"
                            d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                          />
                        </svg>
                        <h3 className="mt-2 text-sm font-medium text-gray-900">Your cart is empty</h3>
                        <p className="mt-1 text-sm text-gray-500">
                          Start adding some items to your cart
                        </p>
                        {/* Continue Shopping button removed as requested */}
                      </div>
                    ) : (
                      <ul className="-my-6 divide-y divide-gray-200">
                        {cart.map((item) => (
                          <li key={item.id} className="py-6 flex">
                            <div className="flex-shrink-0 w-24 h-24 border border-gray-200 rounded-md overflow-hidden">
                              <img
                                src={item.imageUrl || item.image || '/placeholder-program.jpg'}
                                alt={item.name || item.title}
                                className="w-full h-full object-cover object-center"
                                loading="lazy"
                              />
                            </div>

                            <div className="ml-4 flex-1 flex flex-col">
                              <div>
                                <div className="flex justify-between text-base font-medium text-gray-900">
                                  <h3>
                                    <Link to={`/programs/${item.slug}`} onClick={() => setIsOpen(false)}>
                                      {item.name || item.title}
                                    </Link>
                                  </h3>
                                  <div className="text-right">
                                    {item.discountPrice && item.discountPrice < item.price ? (
                                      <>
                                        <span className="text-sm text-gray-500 line-through">
                                          ₹{item.price.toLocaleString('en-IN')}
                                        </span>
                                        <p className="text-lg font-bold text-purple-600">
                                          ₹{item.discountPrice.toLocaleString('en-IN')}
                                        </p>
                                      </>
                                    ) : (
                                      <p className="text-lg font-bold text-purple-600">
                                        ₹{item.price.toLocaleString('en-IN')}
                                      </p>
                                    )}
                                  </div>
                                </div>
                              </div>
                              <div className="flex-1 flex items-end justify-between text-sm">
                                <div className="flex items-center border rounded-md overflow-hidden">
                                  <button
                                    onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                    className="px-2 py-1 bg-gray-100 hover:bg-gray-200"
                                  >
                                    <MinusIcon className="h-4 w-4" />
                                  </button>
                                  <span className="px-3 py-1">{item.quantity}</span>
                                  <button
                                    onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                    className="px-2 py-1 bg-gray-100 hover:bg-gray-200"
                                  >
                                    <PlusIcon className="h-4 w-4" />
                                  </button>
                                </div>

                                <div className="flex">
                                  <button
                                    type="button"
                                    onClick={() => removeFromCart(item.id)}
                                    className="font-medium text-indigo-600 hover:text-indigo-500"
                                  >
                                    Remove
                                  </button>
                                </div>
                              </div>
                            </div>
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                </div>
              </div>

              {cart.length > 0 && (
                <div className="border-t border-gray-200 py-6 px-4 sm:px-6">
                  <div className="flex justify-between text-base font-medium text-gray-900 mb-4">
                    <p>Subtotal</p>
                    <p>₹{cartTotal.toLocaleString()}</p>
                  </div>
                  <p className="mt-0.5 text-sm text-gray-500 mb-6">
                    Shipping and taxes calculated at checkout.
                  </p>
                  <div className="space-y-3">
                    <Link
                      to="/checkout"
                      className="w-full flex justify-center items-center px-6 py-3 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-[#8e6192] hover:bg-[#704091]"
                      onClick={() => setIsOpen(false)}
                    >
                      Checkout
                    </Link>
                    <button
                      type="button"
                      onClick={clearCart}
                      className="w-full flex justify-center items-center px-6 py-3 border border-gray-300 rounded-md shadow-sm text-base font-medium text-gray-700 bg-white hover:bg-gray-50"
                    >
                      Clear Cart
                    </button>
                  </div>
                  {/* Continue Shopping link removed as requested */}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
