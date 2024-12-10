import React from 'react';
import { categories } from '../data/categories';
import { Link } from 'react-router-dom';

export const Categories = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">Categories</h1>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
        {categories.map((category) => (
          <Link
            key={category.id}
            to={`/menu?category=${category.id}`}
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