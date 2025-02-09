'use client';

import Image from 'next/image';
import { Product } from '@/types/product';
import { useCart } from '@/hooks/useCart';

interface CartItemProps {
  product: Product;
  quantity: number;
}

export const CartItem = ({ product, quantity }: CartItemProps) => {
  const { updateItem, removeItem } = useCart();

  const handleQuantityChange = (newQuantity: number) => {
    if (newQuantity > 0 && newQuantity <= product.stock) {
      updateItem(product.id, newQuantity);
    }
  };

  return (
    <div className="flex items-center py-6 border-b border-gray-200">
      {/* Product Image */}
      <div className="relative h-24 w-24 flex-shrink-0">
        <Image
          src={product.images[0]}
          alt={product.name}
          fill
          className="object-cover rounded-md"
          sizes="(max-width: 96px) 100vw, 96px"
        />
      </div>

      {/* Product Details */}
      <div className="flex-grow ml-4">
        <div className="flex justify-between">
          <div>
            <h3 className="text-lg font-medium text-gray-900 mb-1">{product.name}</h3>
            <p className="text-sm text-gray-500 mb-1">{product.brand}</p>
            {product.stock < 5 && product.stock > 0 && (
              <p className="text-sm text-orange-500">
                Only {product.stock} left in stock
              </p>
            )}
          </div>
          <button
            onClick={() => removeItem(product.id)}
            className="text-gray-400 hover:text-red-500 transition-colors"
            aria-label="Remove item"
          >
            <svg
              className="w-5 h-5"
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

        <div className="mt-4 flex justify-between items-center">
          {/* Quantity Controls */}
          <div className="flex items-center border rounded-md">
            <button
              onClick={() => handleQuantityChange(quantity - 1)}
              className="p-2 text-gray-600 hover:text-blue-600 disabled:text-gray-400 disabled:cursor-not-allowed transition-colors"
              disabled={quantity <= 1}
              aria-label="Decrease quantity"
            >
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M20 12H4"
                />
              </svg>
            </button>
            <span className="w-12 text-center text-gray-900">{quantity}</span>
            <button
              onClick={() => handleQuantityChange(quantity + 1)}
              className="p-2 text-gray-600 hover:text-blue-600 disabled:text-gray-400 disabled:cursor-not-allowed transition-colors"
              disabled={quantity >= product.stock}
              aria-label="Increase quantity"
            >
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 4v16m8-8H4"
                />
              </svg>
            </button>
          </div>

          {/* Price */}
          <div className="text-right">
            <p className="text-lg font-medium text-blue-600">
              {new Intl.NumberFormat('vi-VN', {
                style: 'currency',
                currency: 'VND'
              }).format(product.price * quantity)}
            </p>
            {product.originalPrice && (
              <p className="text-sm text-gray-500 line-through">
                {new Intl.NumberFormat('vi-VN', {
                  style: 'currency',
                  currency: 'VND'
                }).format(product.originalPrice * quantity)}
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};