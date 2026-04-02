import React, { createContext, useContext, useState, useEffect } from 'react';

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);
  const [isOpen, setIsOpen] = useState(false);

  // Load cart from localStorage on initial render
  useEffect(() => {
    const savedCart = localStorage.getItem('svasamCart');
    if (savedCart) {
      try {
        setCart(JSON.parse(savedCart));
      } catch (error) {
        console.error('Failed to parse cart from localStorage', error);
        localStorage.removeItem('svasamCart');
      }
    }
  }, []);

  // Save cart to localStorage whenever it changes
  useEffect(() => {
    if (cart.length > 0) {
      localStorage.setItem('svasamCart', JSON.stringify(cart));
    } else {
      localStorage.removeItem('svasamCart');
    }
  }, [cart]);

  const addToCart = (item) => {
    setCart((currentCart) => {
      // Check if item already exists in cart
      const existingItemIndex = currentCart.findIndex(
        (cartItem) => cartItem.id === item.id
      );

      if (existingItemIndex >= 0) {
        // Item exists, update quantity
        const newCart = [...currentCart];
        newCart[existingItemIndex] = {
          ...newCart[existingItemIndex],
          quantity: newCart[existingItemIndex].quantity + item.quantity,
        };
        return newCart;
      }

      // Item doesn't exist, add new item
      return [...currentCart, item];
    });
    setIsOpen(true);
  };

  const removeFromCart = (id) => {
    setCart((currentCart) => currentCart.filter((item) => item.id !== id));
  };

  const updateQuantity = (id, quantity) => {
    if (quantity <= 0) {
      removeFromCart(id);
      return;
    }

    setCart((currentCart) =>
      currentCart.map((item) =>
        item.id === id ? { ...item, quantity } : item
      )
    );
  };

  const clearCart = () => {
    setCart([]);
    localStorage.removeItem('svasamCart');
  };

  const cartTotal = cart.reduce(
    (total, item) => {
      const price = item.discountPrice && item.discountPrice < item.price ? item.discountPrice : item.price;
      return total + (price * item.quantity);
    },
    0
  );

  const itemCount = cart.reduce((count, item) => count + item.quantity, 0);

  return (
    <CartContext.Provider
      value={{
        cart,
        isOpen,
        setIsOpen,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        cartTotal,
        itemCount,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};
