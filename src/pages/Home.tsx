import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { useCart } from '../context/CartContext'; // Ensure the correct path

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
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              {
                name: 'Italian',
                image: 'https://images.unsplash.com/photo-1586190848861-99aa4a171e90?auto=format&fit=crop&w=800&q=80',
              },
              {
                name: 'American',
                image: 'https://images.unsplash.com/photo-1550547660-d9450f859349?auto=format&fit=crop&w=800&q=80',
              },
              {
                name: 'Japanese',
                image: 'https://images.unsplash.com/photo-1553621042-f6e147245754?auto=format&fit=crop&w=800&q=80', // Updated URL
              },
              {
                name: 'Desserts',
                image: 'https://images.unsplash.com/photo-1511690743698-d9d85f2fbf38?auto=format&fit=crop&w=800&q=80',
              },
              {
                name: 'Mexican',
                image: 'https://images.unsplash.com/photo-1600891964599-f61ba0e24092?auto=format&fit=crop&w=800&q=80',
              },
              {
                name: 'Indian',
                image: 'https://images.unsplash.com/photo-1598514982083-3f025af13b39?auto=format&fit=crop&w=800&q=80', // Updated URL
              },
              {
                name: 'Chinese',
                image: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=800&q=80', // Updated URL
              },
              {
                name: 'Middle Eastern',
                image: 'https://images.unsplash.com/photo-1609458446334-7956d4f3b3b4?auto=format&fit=crop&w=800&q=80', // Updated URL
              },
            ].map((category) => (
              <Link
                key={category.name}
                to={`/menu?category=${category.name.toLowerCase().replace(' ', '-')}`}
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
            {[
              {
                id: '1',
                title: "Chef's Special",
                description: 'Handcrafted dishes by our expert chefs',
                image: 'https://images.unsplash.com/photo-1542010589005-d1eacc3918f2',
                price: 19.99,
              },
              {
                id: '2',
                title: 'New Arrivals',
                description: 'Fresh and exciting additions to our menu',
                image: 'https://images.unsplash.com/photo-1484723091739-30a097e8f929',
                price: 14.99,
              },
              {
                id: '3',
                title: 'Popular Items',
                description: 'Most loved dishes by our customers',
                image: 'https://images.unsplash.com/photo-1473093295043-cdd812d0e601',
                price: 12.99,
              },
              {
                id: '4',
                title: 'Grilled Salmon',
                description: 'Perfectly grilled salmon with lemon butter sauce',
                image: 'https://images.unsplash.com/photo-1551183053-bf91a1d81141',
                price: 18.99,
              },
              {
                id: '5',
                title: 'Vegan Buddha Bowl',
                description: 'A wholesome bowl with fresh vegetables and quinoa',
                image: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c',
                price: 15.99,
              },
              // Add more items as needed
            ].map((offer) => {
              const cartItem = isInCart(offer.title);
              return (
                <div key={offer.id} className="flex-shrink-0 bg-white rounded-lg shadow-md overflow-hidden w-64">
                  <img
                    src={offer.image}
                    alt={offer.title}
                    className="w-full h-40 object-cover"
                  />
                  <div className="p-4">
                    <h3 className="text-xl font-bold text-gray-900 mb-2">{offer.title}</h3>
                    <p className="text-gray-600">{offer.description}</p>
                    <p className="text-gray-900">₹{offer.price.toFixed(2)}</p> {/* Display price in INR */}
                    {/* Add to Cart Button */}
                    {!cartItem ? (
                      <button
                        onClick={() => addItem({ id: offer.id, title: offer.title, quantity: 1, price: offer.price })}
                        className="mt-4 inline-flex items-center px-4 py-2 bg-green-600 text-white text-sm font-medium rounded-md hover:bg-green-700"
                      >
                        Add to Cart
                      </button>
                    ) : (
                      <div className="mt-4 flex items-center">
                        <button
                          onClick={() => removeItem(offer.id)}
                          className="px-2 py-1 bg-red-600 text-white rounded-l-md hover:bg-red-700"
                        >
                          -
                        </button>
                        <span className="px-4 py-1 border-t border-b border-gray-300">{cartItem.quantity}</span>
                        <button
                          onClick={() => addItem({ id: offer.id, title: offer.title, quantity: 1, price: offer.price })}
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