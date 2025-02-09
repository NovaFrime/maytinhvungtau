'use client';

import { useRef, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useCart } from '@/hooks/useCart';

interface CartPreviewProps {
  isOpen: boolean;
  onClose: () => void;
}

export const CartPreview = ({ isOpen, onClose }: CartPreviewProps) => {
  const { cart, getSummary, removeItem } = useCart();
  const { subtotal, itemCount } = getSummary();
  const previewRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (previewRef.current && !previewRef.current.contains(event.target as Node)) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className="absolute top-full right-0 mt-2 w-96 bg-white rounded-lg shadow-lg z-50" ref={previewRef}>
      <div className="p-4">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-semibold">Shopping Cart</h3>
          <span className="text-gray-600">{itemCount} items</span>
        </div>

        {cart.length === 0 ? (
          <div className="text-center py-8">
            <p className="text-gray-600 mb-4">Your cart is empty</p>
            <Link
              href="/products"
              className="text-blue-600 hover:text-blue-700"
              onClick={onClose}
            >
              Continue Shopping
            </Link>
          </div>
        ) : (
          <>
            {/* Cart Items */}
            <div className="max-h-96 overflow-y-auto space-y-4">
              {cart.map((item) => (
                <div key={item.product.id} className="flex items-center gap-4 py-4 border-b">
                  {/* Product Image */}
                  <div className="relative h-16 w-16 flex-shrink-0">
                    <Image
                      src={item.product.images[0]}
                      alt={item.product.name}
                      fill
                      className="object-cover rounded"
                    />
                  </div>

                  {/* Product Details */}
                  <div className="flex-grow min-w-0">
                    <h4 className="text-sm font-medium text-gray-900 truncate">
                      {item.product.name}
                    </h4>
                    <p className="text-sm text-gray-500">
                      Qty: {item.quantity}
                    </p>
                    <p className="text-sm font-medium text-blue-600">
                      {new Intl.NumberFormat('vi-VN', {
                        style: 'currency',
                        currency: 'VND'
                      }).format(item.product.price * item.quantity)}
                    </p>
                  </div>

                  {/* Remove Button */}
                  <button
                    onClick={() => removeItem(item.product.id)}
                    className="text-gray-400 hover:text-red-500"
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
                        d="M6 18L18 6M6 6l12 12"
                      />
                    </svg>
                  </button>
                </div>
              ))}
            </div>

            {/* Cart Summary */}
            <div className="mt-4 pt-4 border-t">
              <div className="flex justify-between mb-4">
                <span className="text-gray-600">Subtotal</span>
                <span className="font-medium">
                  {new Intl.NumberFormat('vi-VN', {
                    style: 'currency',
                    currency: 'VND'
                  }).format(subtotal)}
                </span>
              </div>

              {/* Action Buttons */}
              <div className="space-y-2">
                <Link
                  href="/cart"
                  className="block w-full text-center bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 transition-colors"
                  onClick={onClose}
                >
                  View Cart
                </Link>
                <Link
                  href="/checkout"
                  className="block w-full text-center border border-blue-600 text-blue-600 py-2 px-4 rounded hover:bg-blue-50 transition-colors"
                  onClick={onClose}
                >
                  Checkout
                </Link>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};