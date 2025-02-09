'use client';

import { useState } from 'react';
import { ProductFilter } from '@/components/product/ProductFilter';
import { ProductGrid } from '@/components/product/ProductGrid';
import { mockProducts, mockCategories, mockBrands } from '@/lib/mockData';
import { useProducts } from '@/hooks/useProducts';

export default function ProductsPage() {
  const [isMobileFiltersOpen, setIsMobileFiltersOpen] = useState(false);
  const { 
    filters,
    setFilters,
    sortOptions,
    getSortedAndFilteredProducts,
  } = useProducts({ products: mockProducts });

  const sortedAndFilteredProducts = getSortedAndFilteredProducts();

  const getFilterSummary = () => {
    const parts: string[] = [];

    if (filters.category) {
      const category = mockCategories.find(c => c.id === filters.category);
      if (category) {
        parts.push(`in ${category.name}`);
      }
    }

    if (filters.brand) {
      const brand = mockBrands.find(b => b.id === filters.brand);
      if (brand) {
        parts.push(`by ${brand.name}`);
      }
    }

    if (filters.minPrice || filters.maxPrice) {
      const priceRange: string[] = [];
      if (filters.minPrice) {
        priceRange.push(`min ${new Intl.NumberFormat('vi-VN', { 
          style: 'currency', 
          currency: 'VND' 
        }).format(filters.minPrice)}`);
      }
      if (filters.maxPrice) {
        priceRange.push(`max ${new Intl.NumberFormat('vi-VN', { 
          style: 'currency', 
          currency: 'VND' 
        }).format(filters.maxPrice)}`);
      }
      parts.push(`price range: ${priceRange.join(' - ')}`);
    }

    if (filters.inStock) {
      parts.push('in stock only');
    }

    return parts.length > 0 ? ` (${parts.join(', ')})` : '';
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col md:flex-row gap-8">
        {/* Filters Sidebar */}
        <div className={`
          md:w-64 flex-shrink-0
          ${isMobileFiltersOpen ? 'fixed inset-0 z-40 bg-white md:relative md:bg-transparent' : 'hidden md:block'}
        `}>
          <div className="bg-white rounded-lg shadow-sm p-6 sticky top-4">
            <div className="flex justify-between items-center md:hidden mb-4">
              <h2 className="text-xl font-bold">Filters</h2>
              <button
                onClick={() => setIsMobileFiltersOpen(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                <span className="sr-only">Close filters</span>
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            <ProductFilter
              onFilterChange={setFilters}
              categories={mockCategories}
              brands={mockBrands}
            />
          </div>
        </div>

        {/* Products Section */}
        <div className="flex-grow">
          {/* Results Summary */}
          <div className="mb-6">
            <h1 className="text-3xl font-bold mb-2">Products</h1>
            <p className="text-gray-600">
              Showing {sortedAndFilteredProducts.length} results{getFilterSummary()}
            </p>
          </div>

          {/* Mobile Filters Button */}
          <button
            onClick={() => setIsMobileFiltersOpen(true)}
            className="md:hidden w-full mb-4 px-4 py-2 bg-white border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50"
          >
            Show Filters
          </button>

          {/* Sort Dropdown */}
          <div className="flex justify-end mb-4">
            <select
              value={filters.sortBy || ''}
              onChange={(e) => setFilters({ ...filters, sortBy: e.target.value as typeof filters.sortBy })}
              className="border border-gray-300 rounded-md shadow-sm px-3 py-2 text-sm"
            >
              {sortOptions.map((option) => (
                <option key={option.value || 'default'} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>

          {/* No Results Message */}
          {sortedAndFilteredProducts.length === 0 ? (
            <div className="text-center py-12">
              <h3 className="text-lg font-medium text-gray-900 mb-2">
                No products found
              </h3>
              <p className="text-gray-600">
                Try adjusting your filters to find what you&apos;re looking for.
              </p>
              <button
                onClick={() => setFilters({})}
                className="mt-4 text-blue-600 hover:text-blue-700"
              >
                Clear all filters
              </button>
            </div>
          ) : (
            <ProductGrid products={sortedAndFilteredProducts} />
          )}
        </div>
      </div>

      {/* Mobile Filters Overlay */}
      {isMobileFiltersOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-30 md:hidden"
          onClick={() => setIsMobileFiltersOpen(false)}
        />
      )}
    </div>
  );
}