import { useState } from 'react';
import Link from 'next/link';
import { useCart } from '@/hooks/useCart';

export const CartPreview = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { cart, cartTotal, cartItemsCount, formatCartPrice } = useCart();

  if (cartItemsCount === 0) {
    return (
      <span className="absolute -top-1 -right-1 h-4 w-4 rounded-full bg-gray-200 text-xs flex items-center justify-center">
        0
      </span>
    );
  }

  return (
    <>
      <button
        className="absolute -top-1 -right-1 h-4 w-4 rounded-full bg-blue-600 text-white text-xs flex items-center justify-center"
        onMouseEnter={() => setIsOpen(true)}
        onMouseLeave={() => setIsOpen(false)}
      >
        {cartItemsCount}
      </button>

      {isOpen && (
        <div
          className="absolute right-0 mt-2 w-80 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5"
          onMouseEnter={() => setIsOpen(true)}
          onMouseLeave={() => setIsOpen(false)}
          style={{ top: '100%' }}
        >
          <div className="py-2">
            <div className="px-4 py-2 border-b border-gray-100">
              <p className="text-sm font-medium text-gray-900">
                Giỏ hàng của bạn ({cartItemsCount} sản phẩm)
              </p>
            </div>

            <div className="max-h-96 overflow-y-auto">
              {cart.map((item) => (
                <div
                  key={item.product.id}
                  className="px-4 py-2 hover:bg-gray-50 flex items-center"
                >
                  <img
                    src={item.product.images[0]}
                    alt={item.product.name}
                    className="h-12 w-12 object-cover rounded"
                  />
                  <div className="ml-3 flex-1">
                    <p className="text-sm font-medium text-gray-900">
                      {item.product.name}
                    </p>
                    <p className="text-sm text-gray-500">
                      SL: {item.quantity} × {formatCartPrice(item.product.price)}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            <div className="px-4 py-2 border-t border-gray-100">
              <div className="flex justify-between py-2">
                <p className="text-sm font-medium text-gray-900">Tổng cộng:</p>
                <p className="text-sm font-medium text-gray-900">
                  {formatCartPrice(cartTotal)}
                </p>
              </div>

              <Link
                href="/gio-hang"
                className="mt-2 block w-full bg-blue-600 text-white rounded-md px-4 py-2 text-sm text-center font-medium hover:bg-blue-700"
              >
                Xem giỏ hàng
              </Link>

              <Link
                href="/thanh-toan"
                className="mt-2 block w-full bg-green-600 text-white rounded-md px-4 py-2 text-sm text-center font-medium hover:bg-green-700"
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