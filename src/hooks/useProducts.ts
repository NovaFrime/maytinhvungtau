'use client';

import { useState, useCallback, useMemo } from 'react';
import { Product, ProductFilterParams } from '@/types/product';
import { mockProducts } from '@/lib/mockData';
import { formatPrice } from '@/utils/format';

interface UseProductsConfig {
  initialFilters?: ProductFilterParams;
  products?: Product[];
}

export const useProducts = (config: UseProductsConfig = {}) => {
  const { initialFilters = {}, products = mockProducts } = config;
  const [filters, setFilters] = useState<ProductFilterParams>(initialFilters);

  const priceRange = useMemo(() => {
    const prices = products.map(p => p.price);
    return {
      min: Math.min(...prices),
      max: Math.max(...prices)
    };
  }, [products]);

  const filteredProducts = useMemo(() => {
    return products.filter(product => {
      if (filters.category && product.category.id !== filters.category) {
        return false;
      }

      if (filters.brand && product.brand.id !== filters.brand) {
        return false;
      }

      if (filters.minPrice && product.price < filters.minPrice) {
        return false;
      }

      if (filters.maxPrice && product.price > filters.maxPrice) {
        return false;
      }

      if (filters.inStock && product.stockStatus !== 'in_stock') {
        return false;
      }

      if (filters.search) {
        const searchTerm = filters.search.toLowerCase();
        const searchFields = [
          product.name,
          product.description,
          product.brand.name,
          product.category.name,
          ...product.tags
        ].map(field => field.toLowerCase());

        return searchFields.some(field => field.includes(searchTerm));
      }

      return true;
    });
  }, [products, filters]);

  const getSortedProducts = useCallback(() => {
    const sorted = [...filteredProducts];
    const { sort } = filters;

    if (!sort) return sorted;

    sorted.sort((a, b) => {
      switch (sort) {
        case 'price-asc':
          return a.price - b.price;
        case 'price-desc':
          return b.price - a.price;
        case 'name-asc':
          return a.name.localeCompare(b.name);
        case 'name-desc':
          return b.name.localeCompare(a.name);
        case 'rating-desc':
          return b.rating - a.rating;
        default:
          return 0;
      }
    });

    return sorted;
  }, [filteredProducts, filters]);

  const getRelatedProducts = useCallback((product: Product, limit: number = 4): Product[] => {
    return products
      .filter(p => p.id !== product.id)
      .sort((a, b) => {
        const aScore = (a.category.id === product.category.id ? 2 : 0) +
          (a.brand.id === product.brand.id ? 1 : 0);
        const bScore = (b.category.id === product.category.id ? 2 : 0) +
          (b.brand.id === product.brand.id ? 1 : 0);
        return bScore - aScore;
      })
      .slice(0, limit);
  }, [products]);

  const isProductInStock = useCallback((product: Product) => {
    return product.stockStatus === 'in_stock';
  }, []);

  const formatProductPrice = useCallback((price: number) => formatPrice(price), []);

  return {
    products: getSortedProducts(),
    filteredProducts,
    priceRange,
    filters,
    setFilters,
    getRelatedProducts,
    formatProductPrice,
    isProductInStock
  };
};

export default useProducts;