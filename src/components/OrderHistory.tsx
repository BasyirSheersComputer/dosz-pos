import React from 'react';
import { Clock, CheckCircle, XCircle, AlertCircle } from 'lucide-react';
import { Order } from '../types';

interface OrderHistoryProps {
  orders: Order[];
  onOrderSelect: (order: Order) => void;
}

const OrderHistory: React.FC<OrderHistoryProps> = ({ orders, onOrderSelect }) => {
  const getStatusIcon = (status: Order['status']) => {
    switch (status) {
      case 'pending':
        return <Clock className="h-5 w-5 text-yellow-500" />;
      case 'preparing':
        return <AlertCircle className="h-5 w-5 text-orange-500" />;
      case 'ready':
        return <CheckCircle className="h-5 w-5 text-green-500" />;
      case 'completed':
        return <CheckCircle className="h-5 w-5 text-primary" />;
      case 'cancelled':
        return <XCircle className="h-5 w-5 text-red-500" />;
      default:
        return <Clock className="h-5 w-5 text-warm-gray-400" />;
    }
  };

  const getStatusColor = (status: Order['status']) => {
    switch (status) {
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'preparing':
        return 'bg-orange-100 text-orange-800';
      case 'ready':
        return 'bg-green-100 text-green-800';
      case 'completed':
        return 'bg-primary/10 text-primary';
      case 'cancelled':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-warm-gray-100 text-warm-gray-600';
    }
  };

  return (
    <div className="bg-white shadow-lg rounded-xl p-6 h-fit">
      <h3 className="text-xl font-semibold text-accent mb-6">Recent Orders</h3>
      
      <div className="space-y-3 max-h-80 overflow-y-auto">
        {orders.length === 0 ? (
          <div className="text-center py-8 text-warm-gray-500">
            <p className="text-lg font-medium">No recent orders</p>
          </div>
        ) : (
          orders.map((order) => (
            <div
              key={order.id}
              onClick={() => onOrderSelect(order)}
              className="p-4 border border-warm-gray-200 rounded-xl hover:bg-warm-gray-50 cursor-pointer transition-all duration-200 hover:shadow-md touch-manipulation"
            >
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center space-x-3">
                  <span className="font-semibold text-accent text-lg">#{order.id}</span>
                  <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(order.status)}`}>
                    <div className="flex items-center space-x-2">
                      {getStatusIcon(order.status)}
                      <span className="capitalize">{order.status}</span>
                    </div>
                  </span>
                </div>
                <span className="font-bold text-primary text-lg">${order.total.toFixed(2)}</span>
              </div>
              
              <div className="flex items-center justify-between text-sm text-warm-gray-600">
                <span>{order.items.length} item{order.items.length !== 1 ? 's' : ''}</span>
                <span>{order.timestamp.toLocaleTimeString()}</span>
              </div>
              
              {order.customer && (
                <p className="text-sm text-warm-gray-600 mt-2">
                  Customer: {order.customer.name}
                </p>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default OrderHistory;