import React, { useState } from 'react';
import { X, Plus } from 'lucide-react';
import { Product } from '../types';

interface CustomizationModalProps {
  product: Product;
  isOpen: boolean;
  onClose: () => void;
  onAddToCart: (product: Product, customizations: string[], notes?: string) => void;
}

const CustomizationModal: React.FC<CustomizationModalProps> = ({
  product,
  isOpen,
  onClose,
  onAddToCart,
}) => {
  const [selectedCustomizations, setSelectedCustomizations] = useState<string[]>([]);
  const [notes, setNotes] = useState('');

  const handleCustomizationToggle = (customization: string) => {
    setSelectedCustomizations(prev =>
      prev.includes(customization)
        ? prev.filter(item => item !== customization)
        : [...prev, customization]
    );
  };

  const handleAddToCart = () => {
    onAddToCart(product, selectedCustomizations, notes || undefined);
    setSelectedCustomizations([]);
    setNotes('');
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl max-w-lg w-full max-h-[90vh] overflow-y-auto animate-scale-in shadow-2xl">
        <div className="p-8">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-2xl font-semibold text-accent">Customize Order</h3>
            <button
              onClick={onClose}
              className="p-3 hover:bg-warm-gray-100 rounded-xl transition-colors touch-manipulation"
            >
              <X className="h-6 w-6" />
            </button>
          </div>

          <div className="mb-8">
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-56 object-cover rounded-xl mb-6"
            />
            <h4 className="text-xl font-semibold text-accent mb-2">{product.name}</h4>
            <p className="text-warm-gray-600 text-base mb-4">{product.description}</p>
            <p className="text-2xl font-bold text-primary">${product.price.toFixed(2)}</p>
          </div>

          {product.customizations && product.customizations.length > 0 && (
            <div className="mb-8">
              <h5 className="font-semibold text-accent mb-4 text-lg">Customizations</h5>
              <div className="space-y-3">
                {product.customizations.map((customization) => (
                  <label
                    key={customization}
                    className="flex items-center space-x-4 p-4 hover:bg-warm-gray-50 rounded-xl cursor-pointer transition-colors touch-manipulation"
                  >
                    <input
                      type="checkbox"
                      checked={selectedCustomizations.includes(customization)}
                      onChange={() => handleCustomizationToggle(customization)}
                      className="w-5 h-5 text-primary border-warm-gray-300 rounded focus:ring-primary"
                    />
                    <span className="text-warm-gray-700 text-base">{customization}</span>
                  </label>
                ))}
              </div>
            </div>
          )}

          <div className="mb-8">
            <label className="block text-base font-semibold text-accent mb-3">
              Special Notes (Optional)
            </label>
            <textarea
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="Any special instructions..."
              className="w-full p-4 border border-warm-gray-300 rounded-xl focus:ring-2 focus:ring-primary focus:border-primary resize-none text-base"
              rows={4}
            />
          </div>

          <div className="flex space-x-4">
            <button
              onClick={onClose}
              className="flex-1 px-6 py-4 border border-warm-gray-300 text-warm-gray-700 rounded-xl hover:bg-warm-gray-50 transition-colors text-lg font-medium touch-manipulation"
            >
              Cancel
            </button>
            <button
              onClick={handleAddToCart}
              className="flex-1 flex items-center justify-center space-x-3 px-6 py-4 bg-primary text-white rounded-xl hover:bg-primary-dark transition-colors text-lg font-medium shadow-sm hover:shadow-md active:scale-95 touch-manipulation"
            >
              <Plus className="h-5 w-5" />
              <span>Add to Cart</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CustomizationModal;