import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import CategorySidebar from './components/CategorySidebar';
import ProductGrid from './components/ProductGrid';
import Cart from './components/Cart';
import OrderHistory from './components/OrderHistory';
import CustomizationModal from './components/CustomizationModal';
import WelcomeScreen from './components/WelcomeScreen';
import { products, categories } from './data/products';
import { CartItem, Product, Order, Staff, Customer } from './types';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [currentTime, setCurrentTime] = useState(new Date().toLocaleTimeString());
  const [activeCategory, setActiveCategory] = useState('All');
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [orders, setOrders] = useState<Order[]>([]);
  const [currentStaff, setCurrentStaff] = useState<Staff | null>(null);
  const [currentCustomer, setCurrentCustomer] = useState<Customer>();
  const [isCustomizationModalOpen, setIsCustomizationModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  // Staff database - in production, this would be from a secure backend
  const staffDatabase = {
    '1': { id: '1', name: 'Sarah Johnson', role: 'cashier' as const },
    '2': { id: '2', name: 'Mike Chen', role: 'manager' as const },
    '3': { id: '3', name: 'Emma Davis', role: 'barista' as const },
  };

  // Update time every second
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date().toLocaleTimeString());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  // Handle authentication
  const handleAuthenticate = (staffId: string) => {
    const staff = staffDatabase[staffId as keyof typeof staffDatabase];
    if (staff) {
      setCurrentStaff(staff);
      setIsAuthenticated(true);
    }
  };

  // Handle logout
  const handleLogout = () => {
    setIsAuthenticated(false);
    setCurrentStaff(null);
    setCartItems([]);
    setCurrentCustomer(undefined);
    setActiveCategory('All');
  };

  // Show welcome screen if not authenticated
  if (!isAuthenticated || !currentStaff) {
    return <WelcomeScreen onAuthenticate={handleAuthenticate} />;
  }

  // Filter products by category
  const filteredProducts = activeCategory === 'All' 
    ? products 
    : products.filter(product => product.category === activeCategory);

  const handleAddToCart = (product: Product) => {
    if (product.customizations && product.customizations.length > 0) {
      setSelectedProduct(product);
      setIsCustomizationModalOpen(true);
    } else {
      addToCartDirectly(product, []);
    }
  };

  const addToCartDirectly = (product: Product, customizations: string[], notes?: string) => {
    const existingItem = cartItems.find(
      item => item.product.id === product.id && 
      JSON.stringify(item.customizations) === JSON.stringify(customizations)
    );

    if (existingItem) {
      handleUpdateQuantity(existingItem.id, existingItem.quantity + 1);
    } else {
      const newItem: CartItem = {
        id: `${product.id}-${Date.now()}-${Math.random()}`,
        product,
        quantity: 1,
        customizations,
        notes,
      };
      setCartItems(prev => [...prev, newItem]);
    }
  };

  const handleUpdateQuantity = (itemId: string, quantity: number) => {
    if (quantity <= 0) {
      handleRemoveItem(itemId);
    } else {
      setCartItems(prev =>
        prev.map(item =>
          item.id === itemId ? { ...item, quantity } : item
        )
      );
    }
  };

  const handleRemoveItem = (itemId: string) => {
    setCartItems(prev => prev.filter(item => item.id !== itemId));
  };

  const handleCheckout = (paymentMethod: 'cash' | 'card' | 'mobile') => {
    if (cartItems.length === 0) return;

    const subtotal = cartItems.reduce((sum, item) => sum + (item.product.price * item.quantity), 0);
    const tax = subtotal * 0.08;
    const total = subtotal + tax;

    const newOrder: Order = {
      id: `ORD-${Date.now()}`,
      items: [...cartItems],
      customer: currentCustomer,
      subtotal,
      tax,
      discount: 0,
      total,
      paymentMethod,
      status: 'pending',
      timestamp: new Date(),
      orderType: 'dine-in',
    };

    setOrders(prev => [newOrder, ...prev.slice(0, 19)]); // Keep last 20 orders
    setCartItems([]);
    
    // Simulate order progression
    setTimeout(() => {
      setOrders(prev => prev.map(order => 
        order.id === newOrder.id ? { ...order, status: 'preparing' } : order
      ));
    }, 2000);

    setTimeout(() => {
      setOrders(prev => prev.map(order => 
        order.id === newOrder.id ? { ...order, status: 'ready' } : order
      ));
    }, 5000);
  };

  const handleCustomerSelect = () => {
    // Mock customer selection - in real app, this would open a customer search modal
    const mockCustomer: Customer = {
      id: '1',
      name: 'John Doe',
      phone: '(555) 123-4567',
      loyaltyPoints: 125,
    };
    setCurrentCustomer(currentCustomer ? undefined : mockCustomer);
  };

  const handleOrderSelect = (order: Order) => {
    // In real app, this would open order details modal
    console.log('Selected order:', order);
  };

  const handleSettings = () => {
    console.log('Settings');
  };

  return (
    <div className="min-h-screen bg-warm-gray-100">
      <Header
        currentStaff={currentStaff}
        currentTime={currentTime}
        onLogout={handleLogout}
        onSettings={handleSettings}
      />
      
      <div className="h-[calc(100vh-80px)] overflow-hidden">
        <div className="h-full flex">
          {/* Left Sidebar - Categories */}
          <div className="w-48 ipad:w-56 pos:w-64 flex-shrink-0 p-4">
            <CategorySidebar
              categories={categories}
              activeCategory={activeCategory}
              onCategorySelect={setActiveCategory}
            />
          </div>

          {/* Main Content - Products */}
          <div className="flex-1 p-4 overflow-hidden">
            <ProductGrid
              products={filteredProducts}
              onAddToCart={handleAddToCart}
            />
          </div>

          {/* Right Sidebar - Cart and Orders */}
          <div className="w-80 ipad:w-96 pos:w-[420px] flex-shrink-0 p-4 space-y-4 overflow-y-auto">
            <Cart
              items={cartItems}
              customer={currentCustomer}
              onUpdateQuantity={handleUpdateQuantity}
              onRemoveItem={handleRemoveItem}
              onCustomerSelect={handleCustomerSelect}
              onCheckout={handleCheckout}
            />
            
            <OrderHistory
              orders={orders}
              onOrderSelect={handleOrderSelect}
            />
          </div>
        </div>
      </div>

      {/* Customization Modal */}
      {selectedProduct && (
        <CustomizationModal
          product={selectedProduct}
          isOpen={isCustomizationModalOpen}
          onClose={() => {
            setIsCustomizationModalOpen(false);
            setSelectedProduct(null);
          }}
          onAddToCart={addToCartDirectly}
        />
      )}
    </div>
  );
}

export default App;