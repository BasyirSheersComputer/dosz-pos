import React from 'react';
import { Coffee, Leaf, Cookie, Sandwich } from 'lucide-react';

interface CategorySidebarProps {
  categories: string[];
  activeCategory: string;
  onCategorySelect: (category: string) => void;
}

const CategorySidebar: React.FC<CategorySidebarProps> = ({
  categories,
  activeCategory,
  onCategorySelect,
}) => {
  const getCategoryIcon = (category: string) => {
    switch (category.toLowerCase()) {
      case 'coffee':
        return <Coffee className="h-7 w-7" />;
      case 'tea':
        return <Leaf className="h-7 w-7" />;
      case 'pastries':
        return <Cookie className="h-7 w-7" />;
      case 'sandwiches':
        return <Sandwich className="h-7 w-7" />;
      default:
        return <Coffee className="h-7 w-7" />;
    }
  };

  return (
    <div className="bg-white shadow-lg rounded-xl p-6 h-full">
      <h3 className="text-xl font-semibold text-accent mb-6">Categories</h3>
      <div className="space-y-3">
        {categories.map((category) => (
          <button
            key={category}
            onClick={() => onCategorySelect(category)}
            className={`w-full flex items-center space-x-4 p-4 rounded-xl text-left transition-all duration-200 touch-manipulation ${
              activeCategory === category
                ? 'bg-primary text-white shadow-lg transform scale-105'
                : 'text-warm-gray-700 hover:bg-warm-gray-100 hover:shadow-md'
            }`}
          >
            {getCategoryIcon(category)}
            <span className="font-semibold text-lg">{category}</span>
          </button>
        ))}
      </div>
    </div>
  );
};

export default CategorySidebar;