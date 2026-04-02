import React from 'react';
import { ShoppingBagIcon } from '@heroicons/react/24/outline';
import { useCart } from '../contexts/CartContext';

const CartIcon = () => {
  const { itemCount, setIsOpen } = useCart();

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(true)}
        className="p-2 text-gray-400 hover:text-gray-500 relative"
      >
        <span className="sr-only">Cart</span>
        <ShoppingBagIcon className="h-6 w-6" aria-hidden="true" />
        {itemCount > 0 && (
          <span className="absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-main text-xs font-medium text-white">
            {itemCount > 9 ? '9+' : itemCount}
          </span>
        )}
      </button>
    </div>
  );
};

export default CartIcon;
