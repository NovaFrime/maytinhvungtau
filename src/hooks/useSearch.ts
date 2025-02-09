import { useState, useCallback, useMemo } from 'react';
import { Product } from '@/types/product';

interface SearchResult {
  item: Product;
  score: number;
}

export const useSearch = (products: Product[]) => {
  const [query, setQuery] = useState('');
  const [isSearching, setIsSearching] = useState(false);

  const searchIndex = useMemo(() => {
    return products.map(product => ({
      ...product,
      searchText: [
        product.name,
        product.brand.name,
        product.category.name,
        product.description,
        ...product.tags
      ].join(' ').toLowerCase()
    }));
  }, [products]);

  const performSearch = useCallback((searchQuery: string): SearchResult[] => {
    const queryTerms = searchQuery.toLowerCase().split(' ').filter(Boolean);
    
    const scoredResults = searchIndex
      .map(product => {
        let score = 0;
        
        queryTerms.forEach(term => {
          if (product.name.toLowerCase().includes(term)) {
            score += 10;
          }
          
          if (product.brand.name.toLowerCase().includes(term) ||
              product.category.name.toLowerCase().includes(term)) {
            score += 5;
          }
          
          if (product.tags.some(tag => tag.toLowerCase().includes(term))) {
            score += 3;
          }
          
          if (product.description.toLowerCase().includes(term)) {
            score += 1;
          }
        });

        return {
          item: product,
          score
        };
      })
      .filter(result => result.score > 0)
      .sort((a, b) => b.score - a.score);

    return scoredResults;
  }, [searchIndex]);

  const search = useCallback((searchQuery: string) => {
    setQuery(searchQuery);
    setIsSearching(true);
  }, []);

  const results = useMemo(() => {
    if (!query) return [];
    return performSearch(query);
  }, [query, performSearch]);

  const clearSearch = useCallback(() => {
    setQuery('');
    setIsSearching(false);
  }, []);

  const searchUrl = useMemo(() => {
    if (!query) return '';
    return `/products?search=${encodeURIComponent(query)}`;
  }, [query]);

  return {
    query,
    results: results.map(r => r.item),
    isSearching,
    search,
    clearSearch,
    searchUrl
  };
};

export default useSearch;