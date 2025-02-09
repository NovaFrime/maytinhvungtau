'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Product } from '@/types';
import { formatPrice } from '@/lib/utils';
import { Button } from '@/components/ui/Button';
import { useCartStore } from '@/store/cart';
import { Star } from 'lucide-react';

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  const addItem = useCartStore((state) => state.addItem);

  const discountPercentage = product.originalPrice
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : 0;

  return (
    <div className="group relative rounded-lg border bg-white p-4 transition-all hover:shadow-lg">
      {discountPercentage > 0 && (
        <div className="absolute right-2 top-2 z-10 rounded-full bg-red-500 px-2 py-1 text-xs font-semibold text-white">
          -{discountPercentage}%
        </div>
      )}
      
      <Link href={`/san-pham/${product.slug}`}>
        <div className="relative aspect-square overflow-hidden rounded-md">
          <Image
            src={product.images[0]}
            alt={product.name}
            fill
            className="object-cover transition-transform group-hover:scale-105"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        </div>
      </Link>

      <div className="mt-4 space-y-2">
        <Link href={`/san-pham/${product.slug}`}>
          <h3 className="line-clamp-2 text-sm font-medium text-gray-900 hover:text-blue-600">
            {product.name}
          </h3>
        </Link>

        <div className="flex items-center gap-1">
          <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
          <span className="text-sm text-gray-600">
            {product.rating} ({product.reviewCount} đánh giá)
          </span>
        </div>

        <div className="space-y-1">
          <div className="text-lg font-bold text-red-600">
            {formatPrice(product.price)}
          </div>
          {product.originalPrice && (
            <div className="text-sm text-gray-500 line-through">
              {formatPrice(product.originalPrice)}
            </div>
          )}
        </div>

        <Button
          onClick={() => addItem(product, 1)}
          className="w-full"
          variant="default"
        >
          Thêm vào giỏ hàng
        </Button>
      </div>
    </div>
  );
}