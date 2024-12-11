import React, { createContext, useState, useContext } from 'react';
import { PRODUCTS } from '../data/mockData';

const CartContext = createContext(null);

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);
  const [couponCode, setCouponCode] = useState('');

  const addToCart = (productId) => {
    const product = PRODUCTS.find(p => p.id === productId);
    if (!product) return;

    setCart(prevCart => {
      const existingItem = prevCart.find(item => item.id === productId);
      if (existingItem) {
        if (existingItem.quantity >= product.stock) {
          throw new Error('No more stock available');
        }
        return prevCart.map(item =>
          item.id === productId
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prevCart, { ...product, quantity: 1 }];
    });
  };

  const removeFromCart = (productId) => {
    setCart(prevCart => prevCart.filter(item => item.id !== productId));
  };

  const clearCart = () => {
    setCart([]);
    setCouponCode('');
  };

  const updateQuantity = (productId, quantity) => {
    const product = PRODUCTS.find(p => p.id === productId);
    if (!product || quantity > product.stock) {
      throw new Error('Invalid quantity');
    }

    setCart(prevCart =>
      prevCart.map(item =>
        item.id === productId
          ? { ...item, quantity }
          : item
      ).filter(item => item.quantity > 0)
    );
  };

  return (
    <CartContext.Provider value={{
      cart,
      couponCode,
      setCouponCode,
      addToCart,
      removeFromCart,
      updateQuantity,
      clearCart
    }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);