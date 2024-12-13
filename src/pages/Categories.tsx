// Consider removing this file if it's redundant
// Remove or comment out the entire content if not needed
// ...

import React from 'react';
import { Link } from 'react-router-dom';

export const Categories = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">Categories</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {[
          {
            id: 'veg',
            name: 'Veg',
            imageUrl: 'https://images.unsplash.com/photo-1543353071-087092ec393a?auto=format&fit=crop&w=800&q=80', // Updated URL
          },
          {
            id: 'non-veg',
            name: 'Non-Veg',
            imageUrl: 'https://images.unsplash.com/photo-1600891964599-f61ba0e24092?auto=format&fit=crop&w=800&q=80',
          },
          {
            id: 'sweets',
            name: 'Sweets',
            imageUrl: 'https://images.unsplash.com/photo-1525755662778-989d0524087e?auto=format&fit=crop&w=800&q=80', // Updated URL
          },
        ].map((category) => (
          <Link
            key={category.id}
            to={`/category/${category.id}`}
            className="group relative rounded-lg overflow-hidden"
          >
            <div className="aspect-w-1 aspect-h-1">
              <img
                src={category.imageUrl}
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
  );
};