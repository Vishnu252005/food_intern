export interface MenuItem {
  id: string;
  title: string; // Changed from 'name' to 'title' for consistency
  description: string;
  price: number;
  image: string;
  category: string;
  cuisine: string;
  dietary: string[];
  ingredients: string[];
  nutritionInfo: {
    calories: number;
    protein: number;
    carbs: number;
    fat: number;
  };
  rating: number;
  reviews: Review[];
}

export interface Review {
  id: string;
  userId: string;
  userName: string;
  rating: number;
  comment: string;
  date: string;
}

export interface CartItem {
  menuItem: MenuItem;
  quantity: number;
}

export interface User {
  id: string;
  name: string;
  email: string;
  favorites: string[];
  orders: Order[];
}

export interface Order {
  id: string;
  userId: string;
  items: CartItem[];
  total: number;
  status: 'pending' | 'confirmed' | 'delivered';
  date: string;
  deliveryAddress: Address;
}

export interface Address {
  street: string;
  city: string;
  state: string;
  zipCode: string;
  country: string;
}

