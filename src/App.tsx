import React, { useState, useEffect, useRef } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { CartProvider, useCart } from './context/CartContext';
import { Header } from './components/layout/Header';
import { Footer } from './components/layout/Footer';
import { Home } from './pages/Home';
import { Categories } from './pages/Categories';
import { Cart } from './pages/Cart';
import { About } from './pages/About';
import { Menu } from './pages/Menu';
import { MessageCircle as WhatsApp, Home as HomeIcon, Grid as FourBox, ShoppingCart, User as UserIcon, Menu as MenuIcon, X as CloseIcon, Sun, Moon } from 'lucide-react';
import { SignIn } from './pages/SignIn';
import { SignUp } from './pages/SignUp';

const MobileNav: React.FC = () => {
  const { state } = useCart();
  const totalItems = state.items.reduce((sum, item) => sum + item.quantity, 0);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  useEffect(() => {
    document.documentElement.classList.toggle('dark', isDarkMode);
  }, [isDarkMode]);

  return (
    <>
      <div className="fixed top-0 left-0 right-0 bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300 flex justify-between items-center py-2 md:hidden shadow-lg z-50 px-4">
        <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-gray-100">
          {isMenuOpen ? <CloseIcon size={24} /> : <MenuIcon size={24} />}
        </button>
        <Link to="/" className="text-xl font-bold text-gray-900 dark:text-gray-100">Logo</Link>
        <div className="relative" ref={dropdownRef}>
          <button
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            className="text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-gray-100"
          >
            <UserIcon size={24} />
          </button>
          {isDropdownOpen && (
            <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-md shadow-lg z-50">
              <Link to="/signin" className="block px-4 py-2 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700">
                Sign In
              </Link>
              <Link to="/signup" className="block px-4 py-2 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700">
                Sign Up
              </Link>
            </div>
          )}
        </div>
        <button onClick={() => setIsDarkMode(!isDarkMode)} className="text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-gray-100 ml-4">
          {isDarkMode ? <Sun size={24} /> : <Moon size={24} />}
        </button>
      </div>
      {isMenuOpen && (
        <div className="fixed top-12 left-0 right-0 bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300 flex flex-col py-2 md:hidden shadow-lg z-50">
          <Link to="/" className="px-4 py-2 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700">Home</Link>
          <Link to="/categories" className="px-4 py-2 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700">Categories</Link>
          <Link to="/cart" className="px-4 py-2 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700">Cart</Link>
          <Link to="/about" className="px-4 py-2 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700">About</Link>
          <Link to="/menu" className="px-4 py-2 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700">Menu</Link>
        </div>
      )}
      <div className="fixed bottom-0 left-0 right-0 bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300 flex justify-around items-center py-2 md:hidden shadow-lg z-50">
        <Link to="/" className="flex flex-col items-center text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-gray-100">
          <HomeIcon size={24} />
        </Link>
        <Link to="/categories" className="flex flex-col items-center text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-gray-100">
          <FourBox size={24} />
        </Link>
        <Link to="/cart" className="flex items-center bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600 transition-colors">
          <ShoppingCart size={24} />
          <span className="ml-2 text-xs">Proceed</span>
          {totalItems > 0 && (
            <span className="ml-2 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-red-100 bg-red-600 rounded-full">
              {totalItems}
            </span>
          )}
        </Link>
        
      </div>
    </>
  );
};

function App() {
  return (
    <Router>
      <CartProvider>
        <div className="min-h-screen flex flex-col bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100">
          <Header />
          <main className="flex-grow">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/categories" element={<Categories />} />
              <Route path="/cart" element={<Cart />} />
              <Route path="/about" element={<About />} />
              <Route path="/menu" element={<Menu />} />
              <Route path="/signin" element={<SignIn />} />
              <Route path="/signup" element={<SignUp />} />
              {/* <Route path="/offers" element={<Offers />} /> */}
            </Routes>
          </main>
          <Footer />
        </div>
        <Toaster position="bottom-right" />
        <a
          href="https://wa.me/yourwhatsappnumber"
          className="fixed bottom-4 right-4 bg-green-500 text-white p-3 rounded-full shadow-lg hover:bg-green-600 transition-colors"
          target="_blank"
          rel="noopener noreferrer"
        >
          <WhatsApp size={24} />
        </a>
        <MobileNav />
      </CartProvider>
    </Router>
  );
}

export default App;