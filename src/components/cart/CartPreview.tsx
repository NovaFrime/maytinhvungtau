'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useCart } from '@/hooks/useCart';

export const CartPreview = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { cart, cartTotal, cartItemsCount, formatCartPrice } = useCart();

  if (cartItemsCount === 0) {
    return (
      <span className="absolute -right-1 -top-1 flex h-4 w-4 items-center justify-center rounded-full bg-gray-200 text-xs">
        0
      </span>
    );
  }

  return (
    <>
      <button
        className="absolute -right-1 -top-1 flex h-4 w-4 items-center justify-center rounded-full bg-blue-600 text-xs text-white"
        onMouseEnter={() => setIsOpen(true)}
        onMouseLeave={() => setIsOpen(false)}
      >
        {cartItemsCount}
      </button>

      {isOpen && (
        <div
          className="absolute right-0 mt-2 w-80 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5"
          onMouseEnter={() => setIsOpen(true)}
          onMouseLeave={() => setIsOpen(false)}
          style={{ top: '100%' }}
        >
          <div className="py-2">
            <div className="border-b border-gray-100 px-4 py-2">
              <p className="text-sm font-medium text-gray-900">
                Giỏ hàng của bạn ({cartItemsCount} sản phẩm)
              </p>
            </div>

            <div className="max-h-96 overflow-y-auto">
              {cart.map((item) => (
                <div
                  key={item.product.id}
                  className="flex items-center px-4 py-2 hover:bg-gray-50"
                >
                  <img
                    src={item.product.images[0]}
                    alt={item.product.name}
                    className="h-12 w-12 rounded object-cover"
                  />
                  <div className="ml-3 flex-1">
                    <p className="text-sm font-medium text-gray-900">
                      {item.product.name}
                    </p>
                    <p className="text-sm text-gray-500">
                      SL: {item.quantity} ×{' '}
                      {formatCartPrice(item.product.price)}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            <div className="border-t border-gray-100 px-4 py-2">
              <div className="flex justify-between py-2">
                <p className="text-sm font-medium text-gray-900">Tổng cộng:</p>
                <p className="text-sm font-medium text-gray-900">
                  {formatCartPrice(cartTotal)}
                </p>
              </div>

              <Link
                href="/gio-hang"
                className="mt-2 block w-full rounded-md bg-blue-600 px-4 py-2 text-center text-sm font-medium text-white hover:bg-blue-700"
              >
                Xem giỏ hàng
              </Link>

              <Link
                href="/thanh-toan"
                className="mt-2 block w-full rounded-md bg-green-600 px-4 py-2 text-center text-sm font-medium text-white hover:bg-green-700"
              >
                Thanh toán
              </Link>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default CartPreview;
