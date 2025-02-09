'use client';

import { Dispatch, SetStateAction } from 'react';
import { ProductFilterParams } from '@/types/product';
import { Select } from '@/components/ui/Select';

interface ProductFilterProps {
  filters: ProductFilterParams;
  onChange: Dispatch<SetStateAction<ProductFilterParams>>;
  sortOptions: Array<{ value: string; label: string }>;
}

export const ProductFilter = ({ filters, onChange, sortOptions }: ProductFilterProps) => {
  const handleChange = (key: keyof ProductFilterParams, value: string | boolean | number | undefined) => {
    onChange(prev => ({
      ...prev,
      [key]: value
    }));
  };

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium text-gray-900">Sắp xếp</h3>
        <Select
          className="mt-2"
          value={filters.sort || ''}
          onChange={(e) => handleChange('sort', e.target.value)}
          options={sortOptions}
          placeholder="Chọn cách sắp xếp"
        />
      </div>

      <div>
        <h3 className="text-lg font-medium text-gray-900">Bộ lọc</h3>
        
        <div className="mt-4 space-y-4">
          <div>
            <label className="inline-flex items-center">
              <input
                type="checkbox"
                className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                checked={filters.inStock}
                onChange={(e) => handleChange('inStock', e.target.checked)}
              />
              <span className="ml-2">Còn hàng</span>
            </label>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Giá từ
            </label>
            <input
              type="number"
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
              value={filters.minPrice || ''}
              onChange={(e) => handleChange('minPrice', e.target.value ? Number(e.target.value) : undefined)}
              placeholder="Giá thấp nhất"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Đến
            </label>
            <input
              type="number"
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
              value={filters.maxPrice || ''}
              onChange={(e) => handleChange('maxPrice', e.target.value ? Number(e.target.value) : undefined)}
              placeholder="Giá cao nhất"
            />
          </div>
        </div>
      </div>

      <button
        className="w-full rounded-md bg-gray-100 px-4 py-2 text-sm font-medium text-gray-600 hover:bg-gray-200"
        onClick={() => onChange({})}
      >
        Xóa bộ lọc
      </button>
    </div>
  );
};

export default ProductFilter;