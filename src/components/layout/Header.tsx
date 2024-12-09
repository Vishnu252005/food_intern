import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Menu, Search, ShoppingCart, User } from 'lucide-react';
import { useCart } from '../../context/CartContext';

export const Header = () => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const navigate = useNavigate();
  const { state } = useCart();

  const totalItems = state.items.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <header className="bg-white shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link to="/" className="flex items-center">
            <span className="text-xl font-bold text-gray-900">FoodieHub</span>
          </Link>
          
          <nav className="hidden md:flex space-x-8">
            <Link to="/" className="text-gray-700 hover:text-gray-900">
              Home
            </Link>
            <Link to="/categories" className="text-gray-700 hover:text-gray-900">
              Categories
            </Link>
            <Link to="/offers" className="text-gray-700 hover:text-gray-900">
              Offers
            </Link>
            <Link to="/about" className="text-gray-700 hover:text-gray-900">
              About Us
            </Link>
          </nav>

          <div className="flex items-center space-x-4">
            <input
              type="text"
              placeholder="Search..."
              className="border rounded-md px-2 py-1"
            />
            <button className="text-gray-700 hover:text-gray-900">
              <Search size={20} />
            </button>
            <button className="relative text-gray-700 hover:text-gray-900" onClick={() => navigate('/cart')}>
              <ShoppingCart size={20} />
              {totalItems > 0 && (
                <span className="absolute bottom-0 right-0 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-red-100 bg-red-600 rounded-full">
                  {totalItems}
                </span>
              )}
            </button>
            <div className="relative">
              <button
                className="text-gray-700 hover:text-gray-900"
                onClick={() => setDropdownOpen(!dropdownOpen)}
              >
                <User size={20} />
              </button>
              {dropdownOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded-md shadow-lg">
                  <Link
                    to="/signin"
                    className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
                    onClick={() => navigate('/signin')}
                  >
                    Sign In
                  </Link>
                  <Link
                    to="/signup"
                    className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
                    onClick={() => navigate('/signup')}
                  >
                    Sign Up
                  </Link>
                </div>
              )}
            </div>
            <button className="md:hidden text-gray-700 hover:text-gray-900">
              <Menu size={20} />
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};