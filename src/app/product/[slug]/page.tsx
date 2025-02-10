'use client';

import { useState } from 'react';
import Image from 'next/image';
import { mockProducts } from '@/lib/mockData';
import { useCart } from '@/hooks/useCart';
import { useProducts } from '@/hooks/useProducts';
import { Button } from '@/components/ui/Button';
import { Product } from '@/types/product';

interface ProductPageProps {
  params: {
    slug: string;
  };
}

type TabType = 'description' | 'specifications' | 'reviews';

export default function ProductPage({ params }: ProductPageProps) {
  const product = mockProducts.find((p) => p.slug === params.slug);
  const { addToCart, cart } = useCart();
  const { formatProductPrice, isProductInStock } = useProducts();
  const [selectedQuantity, setSelectedQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState<TabType>('description');

  if (!product) {
    return (
      <div className="container mx-auto px-4 py-16">
        <div className="text-center">
          <h1 className="mb-4 text-2xl font-bold">Không tìm thấy sản phẩm</h1>
          <p className="text-gray-600">
            Sản phẩm bạn đang tìm kiếm không tồn tại hoặc đã bị xóa.
          </p>
        </div>
      </div>
    );
  }

  const isInStock = isProductInStock(product);
  const isInCart = cart.some((item) => item.product.id === product.id);
  const cartItem = cart.find((item) => item.product.id === product.id);

  const handleAddToCart = () => {
    addToCart(product, selectedQuantity);
  };

  return (
    <div className="container mx-auto px-4 py-16">
      <div className="lg:grid lg:grid-cols-2 lg:gap-x-8">
        <div className="relative">
          <div className="aspect-w-16 aspect-h-9 overflow-hidden rounded-lg">
            <Image
              src={product.images[0]}
              alt={product.name}
              fill
              className="object-cover"
              priority
            />
          </div>
        </div>

        <div className="mt-8 lg:mt-0">
          <h1 className="text-3xl font-bold">{product.name}</h1>

          <div className="mt-4">
            <p className="text-2xl font-bold text-blue-600">
              {formatProductPrice(product.price)}
            </p>
            {product.originalPrice && (
              <p className="mt-1 text-gray-500 line-through">
                {formatProductPrice(product.originalPrice)}
              </p>
            )}
          </div>

          {isInStock ? (
            <div className="mt-8">
              <div className="flex items-center space-x-4">
                <div className="flex items-center rounded border">
                  <button
                    className="px-3 py-1 text-gray-600 hover:text-gray-700"
                    onClick={() =>
                      setSelectedQuantity(Math.max(1, selectedQuantity - 1))
                    }
                  >
                    -
                  </button>
                  <span className="border-x px-3 py-1 text-gray-600">
                    {selectedQuantity}
                  </span>
                  <button
                    className="px-3 py-1 text-gray-600 hover:text-gray-700"
                    onClick={() =>
                      setSelectedQuantity(Math.min(10, selectedQuantity + 1))
                    }
                  >
                    +
                  </button>
                </div>

                <Button
                  onClick={handleAddToCart}
                  variant={isInCart ? 'outline' : 'primary'}
                  className="flex-1"
                >
                  {isInCart
                    ? `Cập nhật số lượng (${cartItem?.quantity || 0})`
                    : 'Thêm vào giỏ hàng'}
                </Button>
              </div>

              {product.stockStatus === 'low_stock' && (
                <p className="mt-2 text-yellow-600">
                  Chỉ còn {product.stock} sản phẩm
                </p>
              )}
            </div>
          ) : (
            <div className="mt-8">
              <Button disabled variant="danger">
                Hết hàng
              </Button>
            </div>
          )}

          <div className="mt-8 border-t border-gray-200 pt-8">
            <div className="flex space-x-4 border-b border-gray-200">
              {(['description', 'specifications', 'reviews'] as const).map(
                (tab) => (
                  <button
                    key={tab}
                    className={`
                    pb-4 text-sm font-medium 
                    ${
                      activeTab === tab
                        ? 'border-b-2 border-blue-600 text-blue-600'
                        : 'text-gray-500 hover:text-gray-700'
                    }
                  `}
                    onClick={() => setActiveTab(tab)}
                  >
                    {tab === 'description' && 'Mô tả'}
                    {tab === 'specifications' && 'Thông số kỹ thuật'}
                    {tab === 'reviews' && `Đánh giá (${product.reviewCount})`}
                  </button>
                )
              )}
            </div>

            <div className="mt-8">
              {activeTab === 'description' && (
                <div className="prose max-w-none">{product.description}</div>
              )}

              {activeTab === 'specifications' && (
                <div className="grid grid-cols-1 gap-4">
                  {Object.entries(product.specs).map(([key, value]) => (
                    <div key={key} className="grid grid-cols-3 gap-4">
                      <dt className="text-gray-600">{key}</dt>
                      <dd className="col-span-2">{value}</dd>
                    </div>
                  ))}
                </div>
              )}

              {activeTab === 'reviews' && product.reviews && (
                <div className="space-y-6">
                  {product.reviews.map((review) => (
                    <div
                      key={review.id}
                      className="border-b border-gray-200 pb-6"
                    >
                      <div className="mb-2 flex items-center">
                        <span className="font-medium">{review.userName}</span>
                        <span className="mx-2">•</span>
                        <span className="text-yellow-400">
                          {'★'.repeat(review.rating)}
                          {'☆'.repeat(5 - review.rating)}
                        </span>
                      </div>
                      <p className="text-gray-600">{review.comment}</p>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
