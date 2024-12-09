import React from 'react';
import { useLocation } from 'react-router-dom';
import { products } from '../data/products';
import { ProductCard } from '../components/ProductCard';
import { useCart } from '../context/CartContext';

export const Menu = () => {
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const category = params.get('category');
  const { addItem } = useCart();

  const filteredProducts = category
    ? products.filter((product) => product.category === category)
    : products;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">
        {category ? category.charAt(0).toUpperCase() + category.slice(1) : 'Menu'}
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {filteredProducts.map((product) => (
          <div key={product.id} className="relative">
            <ProductCard product={product} />
            {/* <button
              onClick={() => addItem(product)}
              className="absolute bottom-4 right-4 px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700"
            >
              Add to Cart
            </button> */}
          </div>
        ))}
      </div>
    </div>
  );
};