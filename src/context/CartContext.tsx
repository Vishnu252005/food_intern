import React, { createContext, useContext, useReducer } from 'react';
import { CartItem, MenuItem } from '../types';
import toast from 'react-hot-toast';

interface CartState {
  items: CartItem[];
  total: number;
}

type Action =
  | { type: 'ADD_ITEM'; payload: CartItem }
  | { type: 'REMOVE_ITEM'; payload: string }
  | { type: 'UPDATE_QUANTITY'; payload: { id: string; quantity: number } }
  | { type: 'CLEAR_CART' };

const CartContext = createContext<{
  state: CartState;
  addItem: (item: CartItem) => void;
  removeItem: (id: string) => void;
  updateQuantity: (id: string, quantity: number) => void;
  clearCart: () => void;
}>({
  state: { items: [], total: 0 },
  addItem: () => {},
  removeItem: () => {},
  updateQuantity: () => {},
  clearCart: () => {},
});

const cartReducer = (state: CartState, action: Action): CartState => {
  switch (action.type) {
    case 'ADD_ITEM': {
      const existingItem = state.items.find(item => item.menuItem.id === action.payload.menuItem.id);
      let updatedItems;
      if (existingItem) {
        updatedItems = state.items.map(item =>
          item.menuItem.id === action.payload.menuItem.id
            ? { ...item, quantity: item.quantity + action.payload.quantity }
            : item
        );
      } else {
        updatedItems = [...state.items, action.payload];
      }
      const newTotal = updatedItems.reduce((acc, item) => acc + item.menuItem.price * item.quantity, 0);
      return { items: updatedItems, total: newTotal };
    }
    case 'REMOVE_ITEM': {
      const updatedItems = state.items.filter(item => item.menuItem.id !== action.payload);
      const newTotal = updatedItems.reduce((acc, item) => acc + item.menuItem.price * item.quantity, 0);
      return { items: updatedItems, total: newTotal };
    }
    case 'UPDATE_QUANTITY': {
      const updatedItems = state.items.map(item =>
        item.menuItem.id === action.payload.id
          ? { ...item, quantity: action.payload.quantity }
          : item
      ).filter(item => item.quantity > 0);
      const newTotal = updatedItems.reduce((acc, item) => acc + item.menuItem.price * item.quantity, 0);
      return { items: updatedItems, total: newTotal };
    }
    case 'CLEAR_CART': {
      return { items: [], total: 0 };
    }
    default:
      return state;
  }
};

export const CartProvider: React.FC = ({ children }) => {
  const [state, dispatch] = useReducer(cartReducer, { items: [], total: 0 });

  const addItem = (item: CartItem) => {
    dispatch({ type: 'ADD_ITEM', payload: item });
    toast.success(`Added ${item.menuItem.title} to cart`, { duration: 1000 }); // Set duration to 1 second
  };

  const removeItem = (id: string) => {
    dispatch({ type: 'REMOVE_ITEM', payload: id });
    toast.success('Item removed from cart', { duration: 1000 }); // Set duration to 1 second
  };

  const updateQuantity = (id: string, quantity: number) => {
    dispatch({ type: 'UPDATE_QUANTITY', payload: { id, quantity } });
  };

  const clearCart = () => {
    dispatch({ type: 'CLEAR_CART' });
    toast.success('Cart cleared', { duration: 1000 }); // Set duration to 1 second
  };

  return (
    <CartContext.Provider value={{ state, addItem, removeItem, updateQuantity, clearCart }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);