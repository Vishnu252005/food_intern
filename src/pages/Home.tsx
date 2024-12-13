import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { useCart } from '../context/CartContext'; // Ensure the correct path
import { menuItems } from '../data/menuItems'; // Added import for menuItems

export interface MenuItem {
  id: string;
  title: string;
  quantity: number;
  price: number; // Ensure price is included
}

export const Home = () => {
  const { state, addItem, removeItem } = useCart();

  const isInCart = (title: string) => {
    return state.items.find(item => item.menuItem.title === title);
  };

  return (
    <div>
      {/* Hero Section */}
      <section className="relative bg-gray-900">
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1504674900247-0877df9cc836"
            alt="Delicious food"
            className="w-full h-full object-cover opacity-40"
          />
        </div>
        <div className="relative max-w-7xl mx-auto py-24 px-4 sm:py-32 sm:px-6 lg:px-8">
          <h1 className="text-4xl font-extrabold tracking-tight text-white sm:text-5xl lg:text-6xl">
            Delicious Food,
            <br />
            Delivered to You
          </h1>
          <p className="mt-6 text-xl text-gray-300 max-w-3xl">
            Experience the finest cuisine from top restaurants in your area.
            Quick delivery, exceptional taste, and perfect service.
          </p>
          <div className="mt-10">
            <Link
              to="/cart"
              className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-red-600 hover:bg-red-700 transition-colors"
            >
              Order Now
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </div>
        </div>
      </section>

      {/* Shop by Category */}
      <section className="py-12 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-8">
            Shop by Category
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                name: 'Veg',
                image: 'https://images.unsplash.com/photo-1543353071-087092ec393a?auto=format&fit=crop&w=800&q=80', // Updated URL
              },
              {
                name: 'Non-Veg',
                image: 'https://images.unsplash.com/photo-1600891964599-f61ba0e24092?auto=format&fit=crop&w=800&q=80',
              },
              {
                name: 'Sweets',
                image: 'https://images.unsplash.com/photo-1525755662778-989d0524087e?auto=format&fit=crop&w=800&q=80', // Updated URL
              },
            ].map((category) => (
              <Link
                key={category.name}
                to={`/menu?category=${category.name.toLowerCase()}`} // Ensure category.id is used consistently
                className="group relative rounded-lg overflow-hidden"
              >
                <div className="aspect-w-1 aspect-h-1">
                  <img
                    src={category.image}
                    alt={category.name}
                    className="w-full h-48 object-cover transform transition-transform duration-200 group-hover:scale-105"
                  />
                </div>
                <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center">
                  <h3 className="text-xl font-bold text-white">{category.name}</h3>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Today's Special */}
      <section className="py-12 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-8">
            Today's Special
          </h2>
          <div className="flex space-x-4 overflow-x-auto scrollbar-hide">
            {menuItems.filter(item => item.rating >= 4.5).map((item) => {
              const cartItem = isInCart(item.title);
              return (
                <div key={item.id} className="flex-shrink-0 bg-white rounded-lg shadow-md overflow-hidden w-64">
                  <img
                    src={item.imageUrl}
                    alt={item.title}
                    className="w-full h-40 object-cover"
                  />
                  <div className="p-4">
                    <h3 className="text-xl font-bold text-gray-900 mb-2">{item.title}</h3>
                    <p className="text-gray-600">{item.description}</p>
                    <p className="text-gray-900">₹{item.price.toFixed(2)}</p>
                    {/* Add to Cart Button */}
                    {!cartItem ? (
                      <button
                        onClick={() => addItem({
                          menuItem: item,
                          quantity: 1
                        })}
                        className="mt-4 inline-flex items-center px-4 py-2 bg-green-600 text-white text-sm font-medium rounded-md hover:bg-green-700"
                      >
                        Add to Cart
                      </button>
                    ) : (
                      <div className="mt-4 flex items-center">
                        <button
                          onClick={() => removeItem(item.id)}
                          className="px-2 py-1 bg-red-600 text-white rounded-l-md hover:bg-red-700"
                        >
                          -
                        </button>
                        <span className="px-4 py-1 border-t border-b border-gray-300">
                          {cartItem.quantity}
                        </span>
                        <button
                          onClick={() => addItem({
                            menuItem: item,
                            quantity: 1
                          })}
                          className="px-2 py-1 bg-green-600 text-white rounded-r-md hover:bg-green-700"
                        >
                          +
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="hidden md:block">
        {/* Contact content here */}
      </section>
    </div>
  );
};