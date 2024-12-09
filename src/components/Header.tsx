import React from 'react';
import { Link } from 'react-router-dom';
import { Menu, Search, ShoppingCart } from 'lucide-react';

export const Header = () => {
  return (
    <header className="bg-white shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link to="/" className="flex items-center">
            <span className="text-xl font-bold text-gray-900">FurnitureCatalog</span>
          </Link>
          
          <nav className="hidden md:flex space-x-8">
            <Link to="/categories" className="text-gray-700 hover:text-gray-900">
              Categories
            </Link>
            <Link to="/new-arrivals" className="text-gray-700 hover:text-gray-900">
              New Arrivals
            </Link>
            <Link to="/sale" className="text-gray-700 hover:text-gray-900">
              Sale
            </Link>
          </nav>

          <div className="flex items-center space-x-4">
            <button className="text-gray-700 hover:text-gray-900">
              <Search size={20} />
            </button>
            <button className="text-gray-700 hover:text-gray-900">
              <ShoppingCart size={20} />
            </button>
            <button className="md:hidden text-gray-700 hover:text-gray-900">
              <Menu size={20} />
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};