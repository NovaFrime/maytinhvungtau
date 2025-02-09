'use client';

import { useMemo, useState } from 'react';
import { Product, ProductFilterParams } from '@/types/product';
import { formatPrice } from '@/utils/format';

interface UseProductsProps {
  products: Product[];
  initialFilters?: ProductFilterParams;
}

interface UseProductsReturn {
  filteredProducts: Product[];
  filters: ProductFilterParams;
  setFilters: (filters: ProductFilterParams) => void;
  totalProducts: number;
  priceRange: {
    min: number;
    max: number;
  };
  sortOptions: Array<{
    value: ProductFilterParams['sortBy'];
    label: string;
  }>;
  getSortedAndFilteredProducts: () => Product[];
  getRelatedProducts: (product: Product, limit?: number) => Product[];
  formatProductPrice: (price: number) => string;
  calculateDiscount: (originalPrice: number, currentPrice: number) => number;
  isProductInStock: (product: Product) => boolean;
  isProductLowStock: (product: Product) => boolean;
}

const sortOptions: Array<{ value: ProductFilterParams['sortBy']; label: string }> = [
  { value: undefined, label: 'Featured' },
  { value: 'price_asc', label: 'Price: Low to High' },
  { value: 'price_desc', label: 'Price: High to Low' },
  { value: 'rating', label: 'Best Rating' },
  { value: 'newest', label: 'Newest' },
];

export const useProducts = ({ products, initialFilters = {} }: UseProductsProps): UseProductsReturn => {
  const [filters, setFilters] = useState<ProductFilterParams>(initialFilters);

  // Calculate price range
  const priceRange = useMemo(() => {
    return products.reduce(
      (acc, product) => ({
        min: Math.min(acc.min, product.price),
        max: Math.max(acc.max, product.price),
      }),
      { min: Infinity, max: -Infinity }
    );
  }, [products]);

  // Filter products based on current filters
  const filteredProducts = useMemo(() => {
    return products.filter(product => {
      // Category filter
      if (filters.category && product.category.id !== filters.category) {
        return false;
      }

      // Brand filter
      if (filters.brand && product.brand.id !== filters.brand) {
        return false;
      }

      // Price range filter
      if (filters.minPrice && product.price < filters.minPrice) {
        return false;
      }
      if (filters.maxPrice && product.price > filters.maxPrice) {
        return false;
      }

      // Stock filter
      if (filters.inStock && product.stockStatus !== 'in_stock') {
        return false;
      }

      // Search filter
      if (filters.search) {
        const searchTerm = filters.search.toLowerCase();
        return (
          product.name.toLowerCase().includes(searchTerm) ||
          product.description.toLowerCase().includes(searchTerm) ||
          product.brand.name.toLowerCase().includes(searchTerm) ||
          product.category.name.toLowerCase().includes(searchTerm) ||
          product.tags.some(tag => tag.toLowerCase().includes(searchTerm))
        );
      }

      return true;
    });
  }, [products, filters]);

  // Sort filtered products
  const getSortedAndFilteredProducts = () => {
    const sorted = [...filteredProducts];
    
    switch (filters.sortBy) {
      case 'price_asc':
        return sorted.sort((a, b) => a.price - b.price);
      case 'price_desc':
        return sorted.sort((a, b) => b.price - a.price);
      case 'rating':
        return sorted.sort((a, b) => b.rating - a.rating);
      case 'newest':
        return sorted.sort((a, b) => 
          b.createdAt.getTime() - a.createdAt.getTime()
        );
      default:
        return sorted.sort((a, b) => {
          if (a.featured !== b.featured) {
            return b.featured ? 1 : -1;
          }
          return a.name.localeCompare(b.name);
        });
    }
  };

  // Get related products
  const getRelatedProducts = (product: Product, limit: number = 4): Product[] => {
    return products
      .filter(p => 
        (p.category.id === product.category.id || p.brand.id === product.brand.id) &&
        p.id !== product.id
      )
      .sort((a, b) => {
        // Prioritize products from the same category and brand
        const aScore = (a.category.id === product.category.id ? 2 : 0) +
                      (a.brand.id === product.brand.id ? 1 : 0);
        const bScore = (b.category.id === product.category.id ? 2 : 0) +
                      (b.brand.id === product.brand.id ? 1 : 0);
        return bScore - aScore;
      })
      .slice(0, limit);
  };

  // Helper functions
  const formatProductPrice = (price: number) => formatPrice(price);

  const calculateDiscount = (originalPrice: number, currentPrice: number): number => {
    if (!originalPrice || originalPrice <= currentPrice) return 0;
    return Math.round(((originalPrice - currentPrice) / originalPrice) * 100);
  };

  const isProductInStock = (product: Product): boolean => {
    return product.stockStatus === 'in_stock';
  };

  const isProductLowStock = (product: Product): boolean => {
    return product.stockStatus === 'low_stock';
  };

  return {
    filteredProducts,
    filters,
    setFilters,
    totalProducts: products.length,
    priceRange,
    sortOptions,
    getSortedAndFilteredProducts,
    getRelatedProducts,
    formatProductPrice,
    calculateDiscount,
    isProductInStock,
    isProductLowStock,
  };
};