import React, { createContext, useContext, useReducer, useEffect } from 'react';
import { CartContextType, Cart, CartItem } from '../types/cart.types';
import { useAuth } from './AuthContext';
import { cartService } from '../services/cartService';

const CartContext = createContext<CartContextType | undefined>(undefined);

interface CartAction {
  type: 'SET_CART' | 'SET_LOADING' | 'ADD_ITEM' | 'REMOVE_ITEM' | 'UPDATE_QUANTITY' | 'CLEAR_CART';
  payload?: any;
}

const cartReducer = (state: { cart: Cart | null; loading: boolean }, action: CartAction) => {
  switch (action.type) {
    case 'SET_CART':
      return { cart: action.payload, loading: false };
    case 'SET_LOADING':
      return { ...state, loading: action.payload };
    case 'ADD_ITEM':
    case 'REMOVE_ITEM':
    case 'UPDATE_QUANTITY':
      return { ...state, cart: action.payload };
    case 'CLEAR_CART':
      return { cart: null, loading: false };
    default:
      return state;
  }
};

const initialState = {
  cart: null,
  loading: false,
};

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(cartReducer, initialState);
  const { user } = useAuth();

  useEffect(() => {
    if (user) {
      fetchCart();
    } else {
      dispatch({ type: 'CLEAR_CART' });
    }
  }, [user]);

  const fetchCart = async () => {
    try {
      dispatch({ type: 'SET_LOADING', payload: true });
      const cart = await cartService.getCart();
      dispatch({ type: 'SET_CART', payload: cart });
    } catch (error) {
      dispatch({ type: 'SET_LOADING', payload: false });
    }
  };

  const addToCart = async (productId: string, quantity: number) => {
    try {
      const updatedCart = await cartService.addToCart(productId, quantity);
      dispatch({ type: 'ADD_ITEM', payload: updatedCart });
    } catch (error) {
      throw error;
    }
  };

  const removeFromCart = async (cartItemId: string) => {
    try {
      const updatedCart = await cartService.removeFromCart(cartItemId);
      dispatch({ type: 'REMOVE_ITEM', payload: updatedCart });
    } catch (error) {
      throw error;
    }
  };

  const updateQuantity = async (cartItemId: string, quantity: number) => {
    try {
      const updatedCart = await cartService.updateQuantity(cartItemId, quantity);
      dispatch({ type: 'UPDATE_QUANTITY', payload: updatedCart });
    } catch (error) {
      throw error;
    }
  };

  const clearCart = async () => {
    try {
      await cartService.clearCart();
      dispatch({ type: 'CLEAR_CART' });
    } catch (error) {
      throw error;
    }
  };

  const value: CartContextType = {
    cart: state.cart,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    loading: state.loading,
  };

  return (
    <CartContext.Provider value={value}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = (): CartContextType => {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};