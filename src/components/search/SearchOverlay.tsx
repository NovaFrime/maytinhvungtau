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
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50">
      <div className="container mx-auto px-4 h-full">
        <div className="bg-white rounded-lg shadow-xl mt-20 p-4">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-medium">Tìm kiếm sản phẩm</h2>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-500"
              aria-label="Đóng"
            >
              <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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
                    className="w-full text-left p-4 hover:bg-gray-50 rounded-lg flex items-center space-x-4"
                    onClick={() => handleResultClick(product.slug)}
                  >
                    <img
                      src={product.images[0]}
                      alt={product.name}
                      className="w-16 h-16 object-cover rounded"
                    />
                    <div>
                      <h3 className="font-medium">{product.name}</h3>
                      <p className="text-gray-500 text-sm">{product.brand.name}</p>
                      <p className="text-blue-600 font-medium">
                        {formatPrice(product.price)}
                      </p>
                    </div>
                  </button>
                ))}
              </div>
            ) : query ? (
              <div className="text-center py-8 text-gray-500">
                Không tìm thấy sản phẩm nào phù hợp
              </div>
            ) : (
              <div className="text-center py-8 text-gray-500">
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