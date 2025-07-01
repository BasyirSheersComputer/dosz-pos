export interface Product {
  id: string;
  name: string;
  category: string;
  price: number;
  image: string;
  description?: string;
  customizations?: string[];
  inStock: boolean;
}

export interface CartItem {
  id: string;
  product: Product;
  quantity: number;
  customizations: string[];
  notes?: string;
}

export interface Customer {
  id?: string;
  name: string;
  phone?: string;
  email?: string;
  loyaltyPoints?: number;
}

export interface Order {
  id: string;
  items: CartItem[];
  customer?: Customer;
  total: number;
  subtotal: number;
  tax: number;
  discount: number;
  paymentMethod: 'cash' | 'card' | 'mobile';
  status: 'pending' | 'preparing' | 'ready' | 'completed' | 'cancelled';
  timestamp: Date;
  orderType: 'dine-in' | 'takeout' | 'delivery';
}

export interface Staff {
  id: string;
  name: string;
  role: 'cashier' | 'manager' | 'barista';
  avatar?: string;
}