'use client';

import { Product } from '@/types/product';
import Link from 'next/link';
import Image from 'next/image';
import { Badge } from '@/components/ui/Badge';

interface ProductGridProps {
  products: Product[];
  formatPrice: (price: number) => string;
}

export const ProductGrid = ({ products, formatPrice }: ProductGridProps) => {
  const getStockBadge = (status: Product['stockStatus']) => {
    switch (status) {
      case 'in_stock':
        return <Badge variant="success">Còn hàng</Badge>;
      case 'low_stock':
        return <Badge variant="warning">Sắp hết hàng</Badge>;
      case 'out_of_stock':
        return <Badge variant="danger">Hết hàng</Badge>;
      default:
        return <Badge variant="danger">Ngừng kinh doanh</Badge>;
    }
  };

  if (products.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-500">
          Không tìm thấy sản phẩm nào phù hợp với điều kiện tìm kiếm
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {products.map((product) => (
        <Link
          key={product.id}
          href={`/san-pham/${product.slug}`}
          className="group"
        >
          <div className="bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow">
            <div className="relative aspect-square">
              <Image
                src={product.images[0]}
                alt={product.name}
                fill
                className="object-cover rounded-t-lg"
              />
              {product.discountPrice && (
                <div className="absolute top-2 right-2 bg-red-500 text-white px-2 py-1 rounded text-sm">
                  -{Math.round(((product.price - product.discountPrice) / product.price) * 100)}%
                </div>
              )}
            </div>

            <div className="p-4">
              <h3 className="text-sm font-medium text-gray-900 group-hover:text-blue-600 line-clamp-2">
                {product.name}
              </h3>
              
              <p className="mt-1 text-sm text-gray-500">
                {product.brand.name}
              </p>

              <div className="mt-2 flex items-center justify-between">
                <div>
                  <p className="text-lg font-medium text-blue-600">
                    {formatPrice(product.price)}
                  </p>
                  {product.discountPrice && (
                    <p className="text-sm text-gray-500 line-through">
                      {formatPrice(product.originalPrice!)}
                    </p>
                  )}
                </div>

                <div>
                  {getStockBadge(product.stockStatus)}
                </div>
              </div>
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
};

export default ProductGrid;