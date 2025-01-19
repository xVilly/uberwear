import React, { createContext, useContext, useState, useEffect } from 'react';

// Define types for the cart items
type CartItem = {
  color: string;
  size: string;
  price: number;
  imageUrl: string;
  name: string;
};

type CartContextType = {
  cart: CartItem[];
  addToCart: (item: CartItem) => void;
  removeFromCart: (index: number) => void;
  clearCart: () => void;
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

  const [cart, setCart] = useState<CartItem[]>(loadCartFromStorage);
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

  const addToCart = (item: CartItem) => {
    setCart((prevCart) => [...prevCart, item]);
  };

  const removeFromCart = (index: number) => {
    setCart((prevCart) => prevCart.filter((_, i) => i !== index));
  };

  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart, clearCart}}>
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
