'use client';

import { useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import { mockProducts } from '@/lib/mockData';
import { ProductGrid } from '@/components/product/ProductGrid';
import { ProductFilter } from '@/components/product/ProductFilter';
import { useProducts } from '@/hooks/useProducts';
import { SORT_OPTIONS } from '@/types/product';

export default function ProductsPage() {
  const searchParams = useSearchParams();
  const { products, filters, setFilters } = useProducts({
    products: mockProducts,
  });

  useEffect(() => {
    const category = searchParams.get('category');
    const brand = searchParams.get('brand');
    const search = searchParams.get('search');
    const sort = searchParams.get('sort');

    setFilters((prev) => ({
      ...prev,
      category: category || undefined,
      brand: brand || undefined,
      search: search || undefined,
      sort: sort || undefined,
    }));
  }, [searchParams, setFilters]);

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col gap-8 md:flex-row">
        <aside className="w-full flex-shrink-0 md:w-64">
          <ProductFilter
            filters={filters}
            onChange={setFilters}
            sortOptions={SORT_OPTIONS}
          />
        </aside>

        <main className="flex-1">
          <div className="mb-6">
            <h1 className="text-2xl font-bold">Tất cả sản phẩm</h1>
            <p className="mt-2 text-gray-600">
              Hiển thị {products.length} sản phẩm
            </p>
          </div>

          <ProductGrid products={products} />
        </main>
      </div>
    </div>
  );
}
