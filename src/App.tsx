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
import { MessageCircle as WhatsApp, Home as HomeIcon, Grid as FourBox, ShoppingCart, User as UserIcon, Menu as MenuIcon, X as CloseIcon, Search } from 'lucide-react';
import { SignIn } from './pages/SignIn';
import { SignUp } from './pages/SignUp';

const MobileTopNav: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsMenuOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <header className="md:hidden bg-white shadow-sm fixed top-0 left-0 right-0 z-50">
      <div className="flex justify-between items-center h-16 px-4">
        <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="text-gray-700 hover:text-gray-900">
          <MenuIcon size={24} />
        </button>
        <Link to="/" className="text-xl font-bold text-gray-900">
          Logo
        </Link>
        <div className="flex items-center space-x-4">
          <a
            href="https://wa.me/yourwhatsappnumber"
            className="text-green-500 hover:text-green-600"
            target="_blank"
            rel="noopener noreferrer"
          >
            <WhatsApp size={24} />
          </a>
          {/* Updated "Call Now" button to orange */}
          <a
            href="tel:+1234567890" // Replace with your actual phone number
            className="bg-orange-500 text-white px-3 py-1 rounded-md hover:bg-orange-600 transition-colors" // Changed from bg-blue-500 to bg-orange-500 and hover:bg-blue-600 to hover:bg-orange-600
          >
            Call Now
          </a>
        </div>
      </div>
      {isMenuOpen && (
        <div ref={menuRef} className="bg-white border-t border-gray-200">
          <Link to="/" onClick={() => setIsMenuOpen(false)} className="block px-4 py-2 text-gray-700 hover:bg-gray-100">Home</Link>
          <Link to="/categories" onClick={() => setIsMenuOpen(false)} className="block px-4 py-2 text-gray-700 hover:bg-gray-100">Categories</Link>
          <Link to="/cart" onClick={() => setIsMenuOpen(false)} className="block px-4 py-2 text-gray-700 hover:bg-gray-100">Cart</Link>
          <Link to="/about" onClick={() => setIsMenuOpen(false)} className="block px-4 py-2 text-gray-700 hover:bg-gray-100">About</Link>
          <Link to="/menu" onClick={() => setIsMenuOpen(false)} className="block px-4 py-2 text-gray-700 hover:bg-gray-100">Menu</Link>
        </div>
      )}
    </header>
  );
};

const MobileNav: React.FC = () => {
  const { state } = useCart();
  const totalItems = state.items.reduce((sum, item) => sum + item.quantity, 0);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
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

  return (
    <>
      {isMenuOpen && (
        <div className="fixed top-12 left-0 right-0 bg-white border-b border-gray-200 text-gray-700 flex flex-col py-2 md:hidden shadow-lg z-50">
          <Link to="/" className="px-4 py-2 text-gray-700 hover:bg-gray-100">Home</Link>
          <Link to="/categories" className="px-4 py-2 text-gray-700 hover:bg-gray-100">Categories</Link>
          <Link to="/cart" className="px-4 py-2 text-gray-700 hover:bg-gray-100">Cart</Link>
          <Link to="/about" className="px-4 py-2 text-gray-700 hover:bg-gray-100">About</Link>
          <Link to="/menu" className="px-4 py-2 text-gray-700 hover:bg-gray-100">Menu</Link>
        </div>
      )}
      
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 text-gray-700 flex justify-around items-center py-2 md:hidden shadow-lg z-50">
        <Link to="/" className="flex flex-col items-center text-gray-700 hover:text-gray-900">
          <HomeIcon size={24} />
          {/* Removed the "Home" label */}
          {/* <span className="text-xs">Home</span> */}
        </Link>
        <Link to="/categories" className="flex flex-col items-center text-gray-700 hover:text-gray-900">
          <FourBox size={24} />
          {/* Removed the "Categories" label */}
          {/* <span className="text-xs">Categories</span> */}
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

// Add MobileSearchBar component
const MobileSearchBar: React.FC = () => {
  return (
    // Updated to fixed positioning below the navbar with enhanced styling
    <div className="md:hidden bg-orange-50 px-4 py-3 fixed top-16 left-0 right-0 z-40 shadow-md">
      <div className="relative">
        <input
          type="text"
          placeholder="Search for dishes..."
          className="w-full border border-orange-300 rounded-full px-4 py-2 pr-12 bg-white text-gray-700 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-orange-500"
        />
        <button className="absolute inset-y-0 right-4 flex items-center">
          <Search size={20} className="text-orange-500" />
        </button>
      </div>
    </div>
  );
};

export interface IFooterProps {
  className?: string;
}

const LocalFooter: React.FC<IFooterProps> = ({ className }) => {
  return (
    <footer className={`bg-gray-800 text-white py-4 ${className}`}>
      <div className="container mx-auto text-center">
        &copy; {new Date().getFullYear()} Your Company. All rights reserved.
      </div>
    </footer>
  );
};

function App() {
  return (
    <Router>
      <CartProvider>
        <div className="min-h-screen flex flex-col">
          <Header className="hidden md:block" /> {/* Hide Header on mobile */}
          <MobileTopNav /> {/* Add Mobile Top Navbar */}
          <MobileSearchBar /> {/* Add Mobile Search Bar */}
          <MobileNav /> {/* Ensure MobileNav is always present */}
          {/* Adjusted top padding to accommodate both navbar and search bar */}
          <main className="flex-grow pt-24 md:pt-0">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/categories" element={<Categories />} />
              <Route path="/cart" element={<Cart />} />
              <Route path="/about" element={<About />} />
              <Route path="/menu" element={<Menu />} /> {/* Updated Route */}
              <Route path="/signin" element={<SignIn />} />
              <Route path="/signup" element={<SignUp />} />
              {/* <Route path="/offers" element={<Offers />} /> */}
            </Routes>
          </main>
          <LocalFooter className="hidden md:block" />
        </div>
        <Toaster 
          position="bottom-right" 
          toastOptions={{
            duration: 1000, // Set duration to 1 second
          }}
        />
        <a
          href="https://wa.me/yourwhatsappnumber"
          className="fixed bottom-4 right-4 bg-green-500 text-white p-3 rounded-full shadow-lg hover:bg-green-600 transition-colors"
          target="_blank"
          rel="noopener noreferrer"
        >
          <WhatsApp size={24} />
        </a>
      </CartProvider>
    </Router>
  );
}

export default App;