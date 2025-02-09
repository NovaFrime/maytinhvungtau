'use client';

import { useEffect, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { Input } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';
import { LoadingSpinner } from '@/components/ui/LoadingSpinner';
import { useSearch, SearchResult } from '@/hooks/useSearch';
import { mockProducts } from '@/lib/mockData';

interface SearchOverlayProps {
  isOpen: boolean;
  onClose: () => void;
}

export const SearchOverlay = ({ isOpen, onClose }: SearchOverlayProps) => {
  const router = useRouter();
  const inputRef = useRef<HTMLInputElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);
  
  const {
    search,
    results,
    isLoading,
    error,
    query,
    clearSearch,
    searchUrl
  } = useSearch({
    products: mockProducts,
    minSearchLength: 2,
    maxResults: 5
  });

  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (overlayRef.current && !overlayRef.current.contains(event.target as Node)) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen, onClose]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.length >= 2) {
      router.push(searchUrl);
      onClose();
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Escape') {
      onClose();
    }
  };

  const renderSearchResult = (result: SearchResult) => (
    <Link
      key={result.id}
      href={result.url}
      onClick={onClose}
      className="flex items-center gap-4 p-4 hover:bg-gray-50 transition-colors"
    >
      <div className="relative h-16 w-16 flex-shrink-0">
        <Image
          src={result.image}
          alt={result.title}
          fill
          className="object-cover rounded"
          sizes="64px"
        />
      </div>
      <div className="flex-grow min-w-0">
        <h4 className="text-sm font-medium text-gray-900 truncate">
          {result.title}
        </h4>
        <p className="text-sm text-gray-500">{result.subtitle}</p>
      </div>
    </Link>
  );

  if (!isOpen) return null;

  return (
    <>
      {/* Backdrop */}
      <div className="fixed inset-0 bg-black bg-opacity-50 z-40" />

      {/* Search Panel */}
      <div
        ref={overlayRef}
        className="fixed inset-x-0 top-0 z-50 bg-white shadow-lg transform transition-transform duration-300"
        style={{ maxHeight: '80vh' }}
      >
        <div className="container mx-auto px-4 py-4">
          {/* Search Form */}
          <form onSubmit={handleSearch} className="relative">
            <Input
              ref={inputRef}
              type="search"
              placeholder="Search products..."
              value={query}
              onChange={(e) => search(e.target.value)}
              onKeyDown={handleKeyDown}
              className="w-full pr-24"
            />
            <div className="absolute right-0 top-0 h-full flex items-center gap-2 pr-2">
              {query && (
                <button
                  type="button"
                  onClick={clearSearch}
                  className="p-2 text-gray-400 hover:text-gray-600"
                  aria-label="Clear search"
                >
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              )}
              <button
                type="button"
                onClick={onClose}
                className="p-2 text-gray-400 hover:text-gray-600"
                aria-label="Close search"
              >
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
          </form>

          {/* Results Panel */}
          <div className="mt-4">
            {isLoading ? (
              <div className="flex justify-center py-8">
                <LoadingSpinner />
              </div>
            ) : error ? (
              <div className="text-center py-8 text-red-600">{error}</div>
            ) : query.length < 2 ? (
              <div className="text-center py-8 text-gray-500">
                Enter at least 2 characters to search
              </div>
            ) : results.length > 0 ? (
              <div className="divide-y divide-gray-200">
                {results.map(renderSearchResult)}
                {/* View All Results */}
                <div className="p-4">
                  <Button
                    variant="outline"
                    fullWidth
                    onClick={() => {
                      router.push(searchUrl);
                      onClose();
                    }}
                  >
                    View all results
                  </Button>
                </div>
              </div>
            ) : (
              <div className="text-center py-8 text-gray-500">
                No results found for &quot;{query}&quot;
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};