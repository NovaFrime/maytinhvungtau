'use client';

import { useEffect, useRef, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useSearch } from '@/hooks/useSearch';
import { useProducts } from '@/hooks/useProducts';
import { formatPrice } from '@/utils/format';
import { Input } from '../ui/Input';

interface SearchOverlayProps {
  isOpen: boolean;
  onClose: () => void;
}

export const SearchOverlay = ({ isOpen, onClose }: SearchOverlayProps) => {
  const [query, setQuery] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();
  const { products } = useProducts();
  const { results, search } = useSearch(products);

  useEffect(() => {
    if (isOpen) {
      inputRef.current?.focus();
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
      setQuery('');
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };

    window.addEventListener('keydown', handleEscape);
    return () => window.removeEventListener('keydown', handleEscape);
  }, [onClose]);

  useEffect(() => {
    search(query);
  }, [query, search]);

  const handleResultClick = (slug: string) => {
    router.push(`/san-pham/${slug}`);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black bg-opacity-50">
      <div className="container mx-auto h-full px-4">
        <div className="mt-20 rounded-lg bg-white p-4 shadow-xl">
          <div className="mb-4 flex items-center justify-between">
            <h2 className="text-lg font-medium">Tìm kiếm sản phẩm</h2>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-500"
              aria-label="Đóng"
            >
              <svg
                className="h-6 w-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>

          <Input
            ref={inputRef}
            type="search"
            placeholder="Nhập tên sản phẩm cần tìm..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="mb-4"
          />

          <div className="max-h-[60vh] overflow-y-auto">
            {results.length > 0 ? (
              <div className="space-y-4">
                {results.map((product) => (
                  <button
                    key={product.id}
                    className="flex w-full items-center space-x-4 rounded-lg p-4 text-left hover:bg-gray-50"
                    onClick={() => handleResultClick(product.slug)}
                  >
                    <img
                      src={product.images[0]}
                      alt={product.name}
                      className="h-16 w-16 rounded object-cover"
                    />
                    <div>
                      <h3 className="font-medium">{product.name}</h3>
                      <p className="text-sm text-gray-500">
                        {product.brand.name}
                      </p>
                      <p className="font-medium text-blue-600">
                        {formatPrice(product.price)}
                      </p>
                    </div>
                  </button>
                ))}
              </div>
            ) : query ? (
              <div className="py-8 text-center text-gray-500">
                Không tìm thấy sản phẩm nào phù hợp
              </div>
            ) : (
              <div className="py-8 text-center text-gray-500">
                Nhập từ khóa để tìm kiếm sản phẩm
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchOverlay;
