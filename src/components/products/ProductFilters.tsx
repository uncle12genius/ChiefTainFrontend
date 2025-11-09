import React, { useState } from 'react';
import type { Category } from '../../types/product.types';
import type { ProductFilter } from '../../types/product.types';

interface ProductFiltersProps {
  categories: Category[];
  filters: ProductFilter;
  onFilterChange: (filters: ProductFilter) => void;
}

const ProductFilters: React.FC<ProductFiltersProps> = ({
  categories,
  filters,
  onFilterChange,
}) => {
  const [priceRange, setPriceRange] = useState({
    min: filters.minPrice || 0,
    max: filters.maxPrice || 100000,
  });

  const brands = ['Dell', 'HP', 'Lenovo', 'Apple', 'Acer', 'Asus', 'Toshiba', 'Samsung'];
  const conditions = ['NEW', 'REFURBISHED', 'USED'];

  const handleCategoryChange = (categoryId: string, checked: boolean) => {
    const currentCategories = filters.categories || [];
    const newCategories = checked
      ? [...currentCategories, categoryId]
      : currentCategories.filter(id => id !== categoryId);
    
    onFilterChange({
      ...filters,
      categories: newCategories.length > 0 ? newCategories : undefined,
    });
  };

  const handleBrandChange = (brand: string, checked: boolean) => {
    const currentBrands = filters.brands || [];
    const newBrands = checked
      ? [...currentBrands, brand]
      : currentBrands.filter(b => b !== brand);
    
    onFilterChange({
      ...filters,
      brands: newBrands.length > 0 ? newBrands : undefined,
    });
  };

  const handleConditionChange = (condition: string, checked: boolean) => {
    const currentConditions = filters.conditions || [];
    const newConditions = checked
      ? [...currentConditions, condition]
      : currentConditions.filter(c => c !== condition);
    
    onFilterChange({
      ...filters,
      conditions: newConditions.length > 0 ? newConditions : undefined,
    });
  };

  const handlePriceChange = () => {
    onFilterChange({
      ...filters,
      minPrice: priceRange.min > 0 ? priceRange.min : undefined,
      maxPrice: priceRange.max < 100000 ? priceRange.max : undefined,
    });
  };

  const clearAllFilters = () => {
    setPriceRange({ min: 0, max: 100000 });
    onFilterChange({});
  };

  const hasActiveFilters = Object.keys(filters).some(
    key => filters[key as keyof ProductFilter] !== undefined
  );

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-lg font-medium text-gray-900">Filters</h3>
        {hasActiveFilters && (
          <button
            onClick={clearAllFilters}
            className="text-sm text-primary hover:text-primary-dark"
          >
            Clear all
          </button>
        )}
      </div>

      {/* Categories */}
      <div className="mb-6">
        <h4 className="text-sm font-medium text-gray-900 mb-3">Categories</h4>
        <div className="space-y-2">
          {categories.map((category) => (
            <label key={category.id} className="flex items-center">
              <input
                type="checkbox"
                checked={filters.categories?.includes(category.id) || false}
                onChange={(e) => handleCategoryChange(category.id, e.target.checked)}
                className="rounded border-gray-300 text-primary focus:ring-primary"
              />
              <span className="ml-2 text-sm text-gray-700">{category.name}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Price Range */}
      <div className="mb-6">
        <h4 className="text-sm font-medium text-gray-900 mb-3">Price Range</h4>
        <div className="space-y-4">
          <div className="flex space-x-4">
            <div>
              <label htmlFor="min-price" className="block text-xs text-gray-500">
                Min
              </label>
              <input
                type="number"
                id="min-price"
                value={priceRange.min}
                onChange={(e) => setPriceRange(prev => ({ ...prev, min: Number(e.target.value) }))}
                className="w-full border border-gray-300 rounded px-2 py-1 text-sm"
              />
            </div>
            <div>
              <label htmlFor="max-price" className="block text-xs text-gray-500">
                Max
              </label>
              <input
                type="number"
                id="max-price"
                value={priceRange.max}
                onChange={(e) => setPriceRange(prev => ({ ...prev, max: Number(e.target.value) }))}
                className="w-full border border-gray-300 rounded px-2 py-1 text-sm"
              />
            </div>
          </div>
          <button
            onClick={handlePriceChange}
            className="w-full bg-primary text-white py-2 rounded text-sm font-medium hover:bg-primary-dark"
          >
            Apply Price
          </button>
        </div>
      </div>

      {/* Brands */}
      <div className="mb-6">
        <h4 className="text-sm font-medium text-gray-900 mb-3">Brands</h4>
        <div className="space-y-2">
          {brands.map((brand) => (
            <label key={brand} className="flex items-center">
              <input
                type="checkbox"
                checked={filters.brands?.includes(brand) || false}
                onChange={(e) => handleBrandChange(brand, e.target.checked)}
                className="rounded border-gray-300 text-primary focus:ring-primary"
              />
              <span className="ml-2 text-sm text-gray-700">{brand}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Condition */}
      <div className="mb-6">
        <h4 className="text-sm font-medium text-gray-900 mb-3">Condition</h4>
        <div className="space-y-2">
          {conditions.map((condition) => (
            <label key={condition} className="flex items-center">
              <input
                type="checkbox"
                checked={filters.conditions?.includes(condition) || false}
                onChange={(e) => handleConditionChange(condition, e.target.checked)}
                className="rounded border-gray-300 text-primary focus:ring-primary"
              />
              <span className="ml-2 text-sm text-gray-700 capitalize">
                {condition.toLowerCase()}
              </span>
            </label>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProductFilters;