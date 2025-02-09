'use client';

import Link from 'next/link';
import { useCart } from '@/hooks/useCart';
import { CartItem } from '@/components/cart/CartItem';
import { Button } from '@/components/ui/Button';

export default function CartPage() {
  const { cart, cartTotal, shippingFee, orderTotal, formatCartPrice } = useCart();

  if (cart.length === 0) {
    return (
      <div className="container mx-auto px-4 py-16">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Giỏ hàng của bạn</h1>
          <p className="text-gray-600 mb-8">
            Giỏ hàng của bạn đang trống
          </p>
          <Link href="/san-pham">
            <Button>
              Tiếp tục mua sắm
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-16">
      <h1 className="text-2xl font-bold mb-8">Giỏ hàng của bạn</h1>

      <div className="lg:grid lg:grid-cols-12 lg:gap-x-12 lg:items-start">
        <div className="lg:col-span-7">
          {cart.map((item) => (
            <CartItem
              key={item.product.id}
              product={item.product}
              quantity={item.quantity}
              productId={item.product.id}
            />
          ))}
        </div>

        <div className="mt-16 rounded-lg bg-gray-50 px-4 py-6 sm:p-6 lg:col-span-5 lg:mt-0 lg:p-8">
          <h2 className="text-lg font-medium text-gray-900">
            Tổng đơn hàng
          </h2>

          <div className="mt-6 space-y-4">
            <div className="flex items-center justify-between">
              <p className="text-sm text-gray-600">Tạm tính</p>
              <p className="text-sm font-medium text-gray-900">
                {formatCartPrice(cartTotal)}
              </p>
            </div>

            <div className="flex items-center justify-between border-t border-gray-200 pt-4">
              <p className="text-sm text-gray-600">Phí vận chuyển</p>
              <p className="text-sm font-medium text-gray-900">
                {shippingFee === 0 ? (
                  <span className="text-green-600">Miễn phí</span>
                ) : (
                  formatCartPrice(shippingFee)
                )}
              </p>
            </div>

            {shippingFee > 0 && (
              <div className="rounded-md bg-blue-50 p-4">
                <p className="text-sm text-blue-700">
                  Mua thêm {formatCartPrice(10000000 - cartTotal)} để được miễn phí vận chuyển
                </p>
              </div>
            )}

            <div className="flex items-center justify-between border-t border-gray-200 pt-4">
              <p className="text-base font-medium text-gray-900">Tổng cộng</p>
              <p className="text-base font-medium text-gray-900">
                {formatCartPrice(orderTotal)}
              </p>
            </div>
          </div>

          <Link href="/thanh-toan">
            <Button
              variant="primary"
              fullWidth
              className="mt-6"
            >
              Tiến hành thanh toán
            </Button>
          </Link>

          <div className="mt-6 text-center">
            <Link href="/san-pham">
              <Button variant="outline">
                Tiếp tục mua sắm
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}