import React, { createContext, useContext, useState, useEffect } from 'react';
import { Product } from '../models/Product';

type CartContextType = {
  cart: Product[];
  addToCart: (item: Product) => void;
  removeFromCart: (id: number) => void;
  clearCart: () => void;
  getTotalPrice: () => number;
};

// Define the CartProviderProps to explicitly type `children`
type CartProviderProps = {
  children: React.ReactNode; // Typing children as React nodes
};

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider: React.FC<CartProviderProps> = ({ children }) => {
  // Load cart data from localStorage or set to an empty array if not available
  const loadCartFromStorage = () => {
    const storedCart = localStorage.getItem('cart');
    return storedCart ? JSON.parse(storedCart) : [];
  };

  const [cart, setCart] = useState<Product[]>(loadCartFromStorage);
  const clearCart = () => {
    setCart([]);
    localStorage.removeItem('cart');
  };

  // Store the cart data in localStorage whenever it changes
  useEffect(() => {
    if (cart.length > 0) {
      localStorage.setItem('cart', JSON.stringify(cart));
    }
  }, [cart]);

  const addToCart = (item: Product) => {
    setCart((prevCart) => [...prevCart, item]);
  };

  const removeFromCart = (id: number) => {
    setCart((prevCart) => prevCart.filter(product => product.product_ID !== id));
  };

  const getTotalPrice = () => {
    return cart.reduce((acc, item) => acc + item.price, 0);
  }

  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart, clearCart, getTotalPrice }}>
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
