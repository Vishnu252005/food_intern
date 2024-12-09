import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import type { MenuItem } from '../types';
import { useCart } from '../context/CartContext';

interface ProductCardProps {
  product: MenuItem;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { state, addItem, updateQuantity, removeItem } = useCart();
  const cartItem = state.items.find((item) => item.menuItem.id === product.id);
  const [quantity, setQuantity] = useState(cartItem ? cartItem.quantity : 0);

  const handleAddToCart = () => {
    addItem(product);
    setQuantity(1);
  };

  const handleIncrease = () => {
    updateQuantity(product.id, quantity + 1);
    setQuantity(quantity + 1);
  };

  const handleDecrease = () => {
    if (quantity > 1) {
      updateQuantity(product.id, quantity - 1);
      setQuantity(quantity - 1);
    } else {
      removeItem(product.id);
      setQuantity(0);
    }
  };

  return (
    <div className="group">
      <Link to={`/product/${product.id}`} className="block">
        <div className="bg-white rounded-lg shadow-md overflow-hidden transition-transform duration-200 hover:scale-105">
          <div className="aspect-w-1 aspect-h-1 w-full overflow-hidden">
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-64 object-cover object-center"
            />
          </div>
          <div className="p-4">
            <h3 className="text-lg font-medium text-gray-900">{product.name}</h3>
            <p className="mt-1 text-sm text-gray-500">{product.description}</p>
            <p className="mt-2 text-lg font-semibold text-gray-900">
              ${product.price.toLocaleString()}
            </p>
          </div>
        </div>
      </Link>
      <div className="mt-4 flex justify-center">
        {quantity === 0 ? (
          <button
            onClick={handleAddToCart}
            className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors"
          >
            Add to Cart
          </button>
        ) : (
          <div className="flex items-center space-x-2">
            <button
              onClick={handleDecrease}
              className="px-2 py-1 bg-gray-200 rounded-md hover:bg-gray-300 transition-colors"
            >
              -
            </button>
            <span className="px-2">{quantity}</span>
            <button
              onClick={handleIncrease}
              className="px-2 py-1 bg-gray-200 rounded-md hover:bg-gray-300 transition-colors"
            >
              +
            </button>
          </div>
        )}
      </div>
    </div>
  );
};