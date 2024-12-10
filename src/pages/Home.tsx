import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

export const Home = () => {
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
        <div className="relative max-w-7xl mx-auto py-24 px-4 sm:py-32 sm:px-6 lg:px-8 z-10">
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

      {/* Featured Categories */}
      <section className="py-12 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-8">
            Popular Categories
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {['Pizza', 'Burgers', 'Sushi', 'Desserts'].map((category) => (
              <Link
                key={category}
                to={`/menu?category=${category.toLowerCase()}`}
                className="group relative rounded-lg overflow-hidden"
              >
                <div className="aspect-w-1 aspect-h-1">
                  <img
                    src={`https://images.unsplash.com/photo-${
                      category === 'Pizza'
                        ? '1513104890138-7c749659a591'
                        : category === 'Burgers'
                        ? '1568901346375-23c9450c58cd'
                        : category === 'Sushi'
                        ? '1579871494447-9811cf80d66c'
                        : '1551024506-0a38e2b97ece'
                    }`}
                    alt={category}
                    className="w-full h-48 object-cover transform transition-transform duration-200 group-hover:scale-105"
                  />
                </div>
                <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center">
                  <h3 className="text-xl font-bold text-white">{category}</h3>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Special Offers */}
      <section className="py-12 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-8">
            Special Offers
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                title: "Chef's Special",
                description: 'Handcrafted dishes by our expert chefs',
                image: 'https://images.unsplash.com/photo-1542010589005-d1eacc3918f2',
              },
              {
                title: 'New Arrivals',
                description: 'Fresh and exciting additions to our menu',
                image: 'https://images.unsplash.com/photo-1484723091739-30a097e8f929',
              },
              {
                title: 'Popular Items',
                description: 'Most loved dishes by our customers',
                image: 'https://images.unsplash.com/photo-1473093295043-cdd812d0e601',
              },
            ].map((offer) => (
              <div
                key={offer.title}
                className="bg-white rounded-lg shadow-md overflow-hidden"
              >
                <img
                  src={offer.image}
                  alt={offer.title}
                  className="w-full h-48 object-cover"
                />
                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-2">
                    {offer.title}
                  </h3>
                  <p className="text-gray-600">{offer.description}</p>
                  <Link
                    to="/menu"
                    className="mt-4 inline-flex items-center text-red-600 hover:text-red-700"
                  >
                    View Menu
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};