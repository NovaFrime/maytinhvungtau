'use client';

import { useState, useCallback, useMemo } from 'react';
import { useRouter } from 'next/navigation';
import { Product } from '@/types/product';

interface UseSearchProps {
  products: Product[];
  minSearchLength?: number;
  maxResults?: number;
}

export interface SearchResult {
  id: string;
  title: string;
  subtitle: string;
  image: string;
  url: string;
  relevance: number;
}

interface UseSearchReturn {
  search: (query: string) => void;
  results: SearchResult[];
  isLoading: boolean;
  error: string | null;
  query: string;
  clearSearch: () => void;
  searchUrl: string;
}

export const useSearch = ({
  products,
  minSearchLength = 2,
  maxResults = 5
}: UseSearchProps): UseSearchReturn => {
  const router = useRouter();
  const [query, setQuery] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Prepare search index
  const searchIndex = useMemo(() => {
    return products.map(product => ({
      id: product.id,
      searchableText: `
        ${product.name.toLowerCase()}
        ${product.description.toLowerCase()}
        ${product.brand.name.toLowerCase()}
        ${product.category.name.toLowerCase()}
        ${product.tags.join(' ').toLowerCase()}
      `.replace(/\s+/g, ' ').trim(),
      product
    }));
  }, [products]);

  // Search function
  const performSearch = useCallback((searchQuery: string): SearchResult[] => {
    if (searchQuery.length < minSearchLength) {
      return [];
    }

    const normalizedQuery = searchQuery.toLowerCase().trim();
    const queryTerms = normalizedQuery.split(/\s+/);

    // Calculate relevance score for each product
    const scoredResults = searchIndex
      .map(({ id, searchableText, product }) => {
        let relevance = 0;

        // Check each search term
        queryTerms.forEach(term => {
          // Exact matches in name
          if (product.name.toLowerCase().includes(term)) {
            relevance += 10;
          }
          // Exact matches in brand or category
          if (product.brand.name.toLowerCase().includes(term) ||
              product.category.name.toLowerCase().includes(term)) {
            relevance += 5;
          }
          // Matches in tags
          if (product.tags.some(tag => tag.toLowerCase().includes(term))) {
            relevance += 3;
          }
          // Matches in description
          if (product.description.toLowerCase().includes(term)) {
            relevance += 1;
          }
        });

        if (relevance > 0) {
          return {
            id: product.id,
            title: product.name,
            subtitle: product.brand.name,
            image: product.images[0],
            url: `/product/${product.slug}`,
            relevance
          };
        }
        return null;
      })
      .filter((result): result is SearchResult => result !== null)
      .sort((a, b) => b.relevance - a.relevance)
      .slice(0, maxResults);

    return scoredResults;
  }, [searchIndex, minSearchLength]);

  // Handle search
  const search = useCallback((searchQuery: string) => {
    setQuery(searchQuery);
    setError(null);

    if (searchQuery.length < minSearchLength) {
      return;
    }

    setIsLoading(true);

    try {
      performSearch(searchQuery);
    } catch (err) {
      setError('An error occurred while searching');
    } finally {
      setIsLoading(false);
    }
  }, [minSearchLength, performSearch]);

  // Get search results
  const results = useMemo(() => {
    if (query.length < minSearchLength) return [];
    return performSearch(query);
  }, [query, minSearchLength, performSearch]);

  // Clear search
  const clearSearch = useCallback(() => {
    setQuery('');
    setError(null);
  }, []);

  // Generate search URL
  const searchUrl = useMemo(() => {
    if (!query) return '/products';
    const params = new URLSearchParams();
    params.set('q', query);
    return `/products?${params.toString()}`;
  }, [query]);

  return {
    search,
    results,
    isLoading,
    error,
    query,
    clearSearch,
    searchUrl
  };
};