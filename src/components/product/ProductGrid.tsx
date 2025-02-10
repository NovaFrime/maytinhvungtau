'use client';

import { Product } from '@/types/product';
import { formatPrice } from '@/utils/format';
import Image from 'next/image';
import Link from 'next/link';
import { Badge } from '@/components/ui/Badge';

interface ProductGridProps {
  products: Product[];
  title?: string;
}

export const ProductGrid = ({ products, title }: ProductGridProps) => {
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
      <div className="py-12 text-center">
        <p className="text-gray-500">
          Không tìm thấy sản phẩm nào phù hợp với điều kiện tìm kiếm
        </p>
      </div>
    );
  }

  return (
    <div>
      {title && (
        <h2 className="mb-8 text-2xl font-bold text-gray-900">{title}</h2>
      )}
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {products.map((product) => (
          <Link
            key={product.id}
            href={`/san-pham/${product.slug}`}
            className="group"
          >
            <div className="rounded-lg bg-white shadow-sm transition-shadow hover:shadow-md">
              <div className="relative aspect-square">
                <Image
                  src={product.images[0]}
                  alt={product.name}
                  fill
                  className="rounded-t-lg object-cover"
                />
                {product.discountPrice && (
                  <div className="absolute right-2 top-2 rounded bg-red-500 px-2 py-1 text-sm text-white">
                    -
                    {Math.round(
                      ((product.price - product.discountPrice) / product.price) *
                        100
                    )}
                    %
                  </div>
                )}
              </div>

              <div className="p-4">
                <h3 className="line-clamp-2 text-sm font-medium text-gray-900 group-hover:text-blue-600">
                  {product.name}
                </h3>

                <p className="mt-1 text-sm text-gray-500">{product.brand.name}</p>

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

                  <div>{getStockBadge(product.stockStatus)}</div>
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default ProductGrid;
