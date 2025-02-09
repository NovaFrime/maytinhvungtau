'use client';

import { useState } from 'react';
import { ProductFilterParams, ProductCategory, Brand } from '@/types/product';

interface ProductFilterProps {
  onFilterChange: (filters: ProductFilterParams) => void;
  categories: ProductCategory[];
  brands: Brand[];
}

export const ProductFilter = ({ onFilterChange, categories, brands }: ProductFilterProps) => {
  const [filters, setFilters] = useState<ProductFilterParams>({
    category: undefined,
    brand: undefined,
    minPrice: undefined,
    maxPrice: undefined,
    inStock: false,
    sortBy: undefined
  });

  const handleFilterChange = <K extends keyof ProductFilterParams>(
    key: K,
    value: ProductFilterParams[K]
  ) => {
    const newFilters = { ...filters, [key]: value };
    setFilters(newFilters);
    onFilterChange(newFilters);
  };

  return (
    <div className="space-y-6">
      {/* Categories */}
      <div>
        <h3 className="text-lg font-medium text-gray-900 mb-4">Categories</h3>
        <div className="space-y-2">
          <div className="flex items-center">
            <input
              type="radio"
              id="cat-all"
              name="category"
              className="h-4 w-4 text-blue-600"
              checked={!filters.category}
              onChange={() => handleFilterChange('category', undefined)}
            />
            <label htmlFor="cat-all" className="ml-2 text-gray-600">
              All Categories
            </label>
          </div>
          {categories.map((category) => (
            <div key={category.id} className="flex items-center">
              <input
                type="radio"
                id={`cat-${category.id}`}
                name="category"
                className="h-4 w-4 text-blue-600"
                checked={filters.category === category.id}
                onChange={() => handleFilterChange('category', category.id)}
              />
              <label htmlFor={`cat-${category.id}`} className="ml-2 text-gray-600">
                {category.name}
              </label>
            </div>
          ))}
        </div>
      </div>

      {/* Brands */}
      <div>
        <h3 className="text-lg font-medium text-gray-900 mb-4">Brands</h3>
        <div className="space-y-2">
          <div className="flex items-center">
            <input
              type="radio"
              id="brand-all"
              name="brand"
              className="h-4 w-4 text-blue-600"
              checked={!filters.brand}
              onChange={() => handleFilterChange('brand', undefined)}
            />
            <label htmlFor="brand-all" className="ml-2 text-gray-600">
              All Brands
            </label>
          </div>
          {brands.map((brand) => (
            <div key={brand.id} className="flex items-center">
              <input
                type="radio"
                id={`brand-${brand.id}`}
                name="brand"
                className="h-4 w-4 text-blue-600"
                checked={filters.brand === brand.id}
                onChange={() => handleFilterChange('brand', brand.id)}
              />
              <label htmlFor={`brand-${brand.id}`} className="ml-2 text-gray-600">
                {brand.name}
              </label>
            </div>
          ))}
        </div>
      </div>

      {/* Price Range */}
      <div>
        <h3 className="text-lg font-medium text-gray-900 mb-4">Price Range</h3>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label htmlFor="min-price" className="block text-sm text-gray-600 mb-1">
              Min Price
            </label>
            <input
              type="number"
              id="min-price"
              className="w-full border border-gray-300 rounded-md px-3 py-2"
              placeholder="0"
              value={filters.minPrice || ''}
              onChange={(e) => handleFilterChange('minPrice', e.target.value ? Number(e.target.value) : undefined)}
            />
          </div>
          <div>
            <label htmlFor="max-price" className="block text-sm text-gray-600 mb-1">
              Max Price
            </label>
            <input
              type="number"
              id="max-price"
              className="w-full border border-gray-300 rounded-md px-3 py-2"
              placeholder="Max"
              value={filters.maxPrice || ''}
              onChange={(e) => handleFilterChange('maxPrice', e.target.value ? Number(e.target.value) : undefined)}
            />
          </div>
        </div>
      </div>

      {/* Stock Status */}
      <div>
        <div className="flex items-center">
          <input
            type="checkbox"
            id="in-stock"
            className="h-4 w-4 text-blue-600 rounded"
            checked={filters.inStock}
            onChange={(e) => handleFilterChange('inStock', e.target.checked)}
          />
          <label htmlFor="in-stock" className="ml-2 text-gray-600">
            In Stock Only
          </label>
        </div>
      </div>

      {/* Sort By */}
      <div>
        <h3 className="text-lg font-medium text-gray-900 mb-4">Sort By</h3>
        <select
          className="w-full border border-gray-300 rounded-md px-3 py-2"
          value={filters.sortBy || ''}
          onChange={(e) => handleFilterChange('sortBy', (e.target.value || undefined) as ProductFilterParams['sortBy'])}
        >
          <option value="">Featured</option>
          <option value="price_asc">Price: Low to High</option>
          <option value="price_desc">Price: High to Low</option>
          <option value="rating">Best Rating</option>
          <option value="newest">Newest</option>
        </select>
      </div>
    </div>
  );
};