import React from 'react';
import { useParams } from 'react-router-dom';
import { menuItems } from '../data/menuItems'; // Import menuItems
import { useCart } from '../context/CartContext'; // Ensure correct import path

const CategoryPage: React.FC = () => {
  const { categoryId } = useParams<{ categoryId: string }>();

  const { addItem, removeItem, state } = useCart();

  const isInCart = (id: string) => {
    return state.items.find(item => item.menuItem.id === id);
  };

  const filteredItems = menuItems.filter(item => item.category === categoryId);

  if (!filteredItems.length) {
    return <div>Category not found</div>;
  }

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">{categoryId}</h1>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {filteredItems.map(item => {
          const cartItem = isInCart(item.id);
          return (
            <div key={item.id} className="bg-white rounded-lg shadow-md overflow-hidden">
              <img
                src={item.imageUrl}
                alt={item.title}
                className="w-full h-40 object-cover"
              />
              <div className="p-4">
                <h3 className="text-xl font-bold text-gray-900 mb-2">{item.title}</h3>
                <p className="text-gray-600">{item.description}</p>
                <p className="text-gray-900">₹{item.price.toFixed(2)}</p>
                {!cartItem ? (
                  <button
                    onClick={() =>
                      addItem({
                        menuItem: item,
                        quantity: 1
                      })
                    }
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
                      onClick={() =>
                        addItem({
                          menuItem: item,
                          quantity: 1
                        })
                      }
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
  );
};

export default CategoryPage;