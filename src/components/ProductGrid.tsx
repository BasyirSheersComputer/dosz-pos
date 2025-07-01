import React from 'react';
import { Plus } from 'lucide-react';
import { Product } from '../types';

interface ProductGridProps {
  products: Product[];
  onAddToCart: (product: Product) => void;
}

const ProductGrid: React.FC<ProductGridProps> = ({ products, onAddToCart }) => {
  return (
    <div className="bg-white shadow-lg rounded-xl p-6 h-full overflow-hidden">
      <h3 className="text-xl font-semibold text-accent mb-6">Menu Items</h3>
      <div className="h-[calc(100%-3rem)] overflow-y-auto">
        <div className="grid grid-cols-2 ipad:grid-cols-3 ipad-pro:grid-cols-4 pos:grid-cols-5 gap-4 pb-4">
          {products.map((product) => (
            <div
              key={product.id}
              className="bg-cream border border-warm-gray-200 rounded-xl overflow-hidden shadow-sm hover:shadow-lg transition-all duration-200 animate-fade-in touch-manipulation"
            >
              <div className="relative">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-32 ipad:h-40 object-cover"
                />
                {!product.inStock && (
                  <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                    <span className="text-white font-semibold text-sm">Out of Stock</span>
                  </div>
                )}
              </div>
              
              <div className="p-4">
                <h4 className="font-semibold text-accent text-base mb-2 line-clamp-2 min-h-[2.5rem]">
                  {product.name}
                </h4>
                <p className="text-warm-gray-600 text-sm mb-3 line-clamp-2 min-h-[2.5rem]">
                  {product.description}
                </p>
                
                <div className="flex items-center justify-between">
                  <span className="text-xl font-bold text-primary">
                    ${product.price.toFixed(2)}
                  </span>
                  
                  <button
                    onClick={() => onAddToCart(product)}
                    disabled={!product.inStock}
                    className={`flex items-center space-x-2 px-4 py-2 rounded-lg font-medium transition-all duration-200 touch-manipulation ${
                      product.inStock
                        ? 'bg-primary text-white hover:bg-primary-dark shadow-sm hover:shadow-md active:scale-95'
                        : 'bg-warm-gray-300 text-warm-gray-500 cursor-not-allowed'
                    }`}
                  >
                    <Plus className="h-4 w-4" />
                    <span>Add</span>
                  </button>
                </div>
                
                {product.customizations && product.customizations.length > 0 && (
                  <div className="mt-3 pt-3 border-t border-warm-gray-200">
                    <p className="text-xs text-warm-gray-500">
                      Customizations available
                    </p>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProductGrid;