'use client';

import Image from 'next/image';
import { useCart } from '@/hooks/useCart';
import { Product } from '@/types/product';

interface CartItemProps {
  productId: string;
  quantity: number;
  product: Product;
}

export const CartItem = ({ product, quantity }: CartItemProps) => {
  const { updateCartQuantity, removeFromCart, formatCartPrice } = useCart();

  const handleQuantityChange = (newQuantity: number) => {
    if (newQuantity < 1) return;
    if (newQuantity > 10) {
      alert('Số lượng tối đa là 10 sản phẩm');
      return;
    }
    updateCartQuantity(product.id, newQuantity);
  };

  return (
    <div className="flex items-center border-b border-gray-200 py-6">
      <div className="relative h-24 w-24 flex-shrink-0">
        <Image
          src={product.images[0]}
          alt={product.name}
          fill
          className="rounded object-cover"
        />
      </div>

      <div className="ml-4 flex-1">
        <div className="flex justify-between">
          <div>
            <h3 className="text-lg font-medium text-gray-900">
              {product.name}
            </h3>
            <p className="mt-1 text-sm text-gray-500">{product.brand.name}</p>
            {product.discountPrice && (
              <div className="mt-1">
                <span className="text-sm font-medium text-red-600">
                  Tiết kiệm:{' '}
                  {formatCartPrice(product.price - product.discountPrice)}
                </span>
              </div>
            )}
          </div>
          <button
            onClick={() => removeFromCart(product.id)}
            className="text-gray-400 hover:text-red-500"
            aria-label="Xóa sản phẩm"
          >
            <svg
              className="h-5 w-5"
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

        <div className="mt-4 flex items-center justify-between">
          <div className="flex items-center rounded border">
            <button
              className="px-3 py-1 text-gray-600 hover:text-gray-700"
              onClick={() => handleQuantityChange(quantity - 1)}
              aria-label="Giảm số lượng"
            >
              -
            </button>
            <span className="border-x px-3 py-1 text-gray-600">{quantity}</span>
            <button
              className="px-3 py-1 text-gray-600 hover:text-gray-700"
              onClick={() => handleQuantityChange(quantity + 1)}
              aria-label="Tăng số lượng"
            >
              +
            </button>
          </div>

          <div className="text-right">
            <p className="text-lg font-medium text-gray-900">
              {formatCartPrice(product.price * quantity)}
            </p>
            {product.discountPrice && (
              <p className="text-sm text-gray-500 line-through">
                {formatCartPrice(product.originalPrice! * quantity)}
              </p>
            )}
          </div>
        </div>

        {product.stockStatus === 'low_stock' && (
          <p className="mt-2 text-sm text-yellow-600">
            Chỉ còn {product.stock} sản phẩm
          </p>
        )}
      </div>
    </div>
  );
};

export default CartItem;
