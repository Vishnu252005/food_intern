import React from 'react';
import { useLocation } from 'react-router-dom';
import { menuItems } from '../data/menuItems'; // Updated path
import { useCart } from '../context/CartContext';

export const Menu = () => {
  const { state, addItem, removeItem } = useCart();
  const location = useLocation();

  // Parse query parameters to get the selected category
  const queryParams = new URLSearchParams(location.search);
  const selectedCategory = queryParams.get('category');

  // Function to check if the item is in the cart
  const isInCart = (id: string) => {
    return state.items.find(item => item.menuItem.id === id);
  };

  // Update the category filtering to ensure exact match without replacing hyphens
  const filteredItems = selectedCategory
    ? menuItems.filter(
        item =>
          item.category.toLowerCase() === selectedCategory.toLowerCase()
      )
    : menuItems;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-3xl font-bold text-gray-900 mb-8 capitalize">
        {selectedCategory ? selectedCategory.replace('-', ' ') : 'All'} Dishes
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {filteredItems.map(item => {
          const cartItem = isInCart(item.id);
          return (
            <div key={item.id} className="bg-white rounded-lg shadow-md overflow-hidden">
              <img
                src={item.imageUrl} // Changed from 'image' to 'imageUrl'
                alt={item.title}
                className="w-full h-48 object-cover"
              />
              <div className="p-4">
                <h3 className="text-xl font-bold text-gray-900">{item.title}</h3>
                <p className="text-gray-600">{item.description}</p>
                <p className="text-gray-900 font-semibold mt-2">₹{item.price.toFixed(2)}</p>
                {!cartItem ? (
                  <button
                    onClick={() => addItem({
                      id: item.id,
                      title: item.title,
                      quantity: 1,
                      price: item.price,
                      menuItem: item, // Ensure the entire MenuItem is passed
                    })}
                    className="mt-4 w-full bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600 transition-colors"
                  >
                    Add to Cart
                  </button>
                ) : (
                  <div className="mt-4 flex items-center justify-center">
                    <button
                      onClick={() => removeItem(item.id)}
                      className="px-2 py-1 bg-red-600 text-white rounded-l-md hover:bg-red-700"
                    >
                      -
                    </button>
                    <span className="px-4 py-1 border-t border-b border-gray-300">{cartItem.quantity}</span>
                    <button
                      onClick={() => addItem({
                        id: item.id,
                        title: item.title,
                        quantity: 1,
                        price: item.price,
                        menuItem: item,
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
        {filteredItems.length === 0 && (
          <p className="text-gray-700">No items found for this category.</p>
        )}
      </div>
    </div>
  );
};