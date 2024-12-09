
import React from 'react';
import { useCart } from '../context/CartContext';

export const Cart = () => {
  const { state, removeItem, updateQuantity, clearCart } = useCart();

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">Your Cart</h1>
      {state.items.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <div>
          <ul>
            {state.items.map((item) => (
              <li key={item.menuItem.id} className="flex justify-between items-center mb-4">
                <div>
                  <h3 className="text-lg font-bold">{item.menuItem.name}</h3>
                  <p className="text-gray-600">{item.menuItem.description}</p>
                  <p className="text-gray-900">${item.menuItem.price.toFixed(2)}</p>
                </div>
                <div className="flex items-center space-x-4">
                  <input
                    type="number"
                    value={item.quantity}
                    onChange={(e) => updateQuantity(item.menuItem.id, parseInt(e.target.value))}
                    className="border rounded-md px-2 py-1 w-16"
                  />
                  <button
                    onClick={() => removeItem(item.menuItem.id)}
                    className="text-red-600 hover:text-red-800"
                  >
                    Remove
                  </button>
                </div>
              </li>
            ))}
          </ul>
          <div className="mt-8">
            <h2 className="text-2xl font-bold">Total: ${state.total.toFixed(2)}</h2>
            <button
              onClick={clearCart}
              className="mt-4 px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700"
            >
              Clear Cart
            </button>
          </div>
        </div>
      )}
    </div>
  );
};