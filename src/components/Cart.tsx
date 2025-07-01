import React from 'react';
import { Minus, Plus, Trash2, User, CreditCard, Smartphone, DollarSign } from 'lucide-react';
import { CartItem, Customer } from '../types';

interface CartProps {
  items: CartItem[];
  customer?: Customer;
  onUpdateQuantity: (itemId: string, quantity: number) => void;
  onRemoveItem: (itemId: string) => void;
  onCustomerSelect: () => void;
  onCheckout: (paymentMethod: 'cash' | 'card' | 'mobile') => void;
}

const Cart: React.FC<CartProps> = ({
  items,
  customer,
  onUpdateQuantity,
  onRemoveItem,
  onCustomerSelect,
  onCheckout,
}) => {
  const subtotal = items.reduce((sum, item) => sum + (item.product.price * item.quantity), 0);
  const tax = subtotal * 0.08; // 8% tax
  const total = subtotal + tax;

  const paymentMethods = [
    { id: 'cash' as const, label: 'Cash', icon: DollarSign, color: 'bg-green-500 hover:bg-green-600' },
    { id: 'card' as const, label: 'Card', icon: CreditCard, color: 'bg-blue-500 hover:bg-blue-600' },
    { id: 'mobile' as const, label: 'Mobile', icon: Smartphone, color: 'bg-purple-500 hover:bg-purple-600' },
  ];

  return (
    <div className="bg-white shadow-lg rounded-xl p-6 animate-slide-in h-fit max-h-[calc(100vh-200px)] flex flex-col">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-xl font-semibold text-accent">Current Order</h3>
        <div className="text-sm text-warm-gray-500 bg-warm-gray-100 px-3 py-1 rounded-full">
          {items.length} item{items.length !== 1 ? 's' : ''}
        </div>
      </div>

      {/* Customer Section */}
      <div className="mb-6 p-4 bg-cream rounded-xl">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <User className="h-5 w-5 text-primary" />
            <span className="font-medium text-accent">
              {customer ? customer.name : 'Walk-in Customer'}
            </span>
          </div>
          <button
            onClick={onCustomerSelect}
            className="text-primary hover:text-primary-dark font-medium text-sm transition-colors px-3 py-1 rounded-lg hover:bg-white touch-manipulation"
          >
            {customer ? 'Change' : 'Add Customer'}
          </button>
        </div>
        {customer?.loyaltyPoints && (
          <p className="text-sm text-warm-gray-600 mt-2">
            Loyalty Points: {customer.loyaltyPoints}
          </p>
        )}
      </div>

      {/* Cart Items */}
      <div className="flex-1 overflow-y-auto mb-6">
        <div className="space-y-3">
          {items.length === 0 ? (
            <div className="text-center py-12 text-warm-gray-500">
              <p className="text-lg font-medium">No items in cart</p>
              <p className="text-sm mt-1">Add items from the menu to get started</p>
            </div>
          ) : (
            items.map((item) => (
              <div key={item.id} className="flex items-center space-x-3 p-4 bg-warm-gray-50 rounded-xl">
                <img
                  src={item.product.image}
                  alt={item.product.name}
                  className="w-16 h-16 object-cover rounded-lg flex-shrink-0"
                />
                
                <div className="flex-1 min-w-0">
                  <h4 className="font-medium text-accent truncate text-base">{item.product.name}</h4>
                  <p className="text-sm text-warm-gray-600">${item.product.price.toFixed(2)} each</p>
                  {item.customizations.length > 0 && (
                    <p className="text-xs text-primary mt-1">{item.customizations.join(', ')}</p>
                  )}
                </div>
                
                <div className="flex items-center space-x-2 flex-shrink-0">
                  <button
                    onClick={() => onUpdateQuantity(item.id, item.quantity - 1)}
                    className="p-2 hover:bg-warm-gray-200 rounded-lg transition-colors touch-manipulation"
                  >
                    <Minus className="h-4 w-4" />
                  </button>
                  <span className="w-8 text-center font-semibold text-lg">{item.quantity}</span>
                  <button
                    onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}
                    className="p-2 hover:bg-warm-gray-200 rounded-lg transition-colors touch-manipulation"
                  >
                    <Plus className="h-4 w-4" />
                  </button>
                  <button
                    onClick={() => onRemoveItem(item.id)}
                    className="p-2 hover:bg-red-100 text-red-600 rounded-lg ml-2 transition-colors touch-manipulation"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      {/* Order Summary */}
      {items.length > 0 && (
        <div className="border-t border-warm-gray-200 pt-6 flex-shrink-0">
          <div className="space-y-3 mb-6">
            <div className="flex justify-between text-warm-gray-600 text-lg">
              <span>Subtotal</span>
              <span>${subtotal.toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-warm-gray-600 text-lg">
              <span>Tax (8%)</span>
              <span>${tax.toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-xl font-bold text-accent border-t border-warm-gray-200 pt-3">
              <span>Total</span>
              <span>${total.toFixed(2)}</span>
            </div>
          </div>

          {/* Payment Methods */}
          <div className="space-y-4">
            <h4 className="font-semibold text-accent text-lg">Payment Method</h4>
            <div className="grid grid-cols-1 gap-3">
              {paymentMethods.map((method) => (
                <button
                  key={method.id}
                  onClick={() => onCheckout(method.id)}
                  className={`flex items-center justify-center space-x-3 p-4 ${method.color} text-white rounded-xl transition-all duration-200 shadow-sm hover:shadow-md active:scale-95 touch-manipulation`}
                >
                  <method.icon className="h-6 w-6" />
                  <span className="font-semibold text-lg">Pay with {method.label}</span>
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;