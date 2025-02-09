'use client';

import { useCart } from '@/hooks/useCart';
import { CartItem } from '@/components/cart/CartItem';
import Link from 'next/link';

export default function CartPage() {
  const { cart, getSummary } = useCart();
  const { subtotal, shipping, total, itemCount, freeShippingThreshold, remainingForFreeShipping } = getSummary();

  if (itemCount === 0) {
    return (
      <div className="container mx-auto px-4 py-16">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Your Cart is Empty</h1>
          <p className="text-gray-600 mb-8">
            Browse our products and add some items to your cart
          </p>
          <Link
            href="/products"
            className="inline-block bg-blue-600 text-white px-8 py-3 rounded-md hover:bg-blue-700 transition-colors"
          >
            Continue Shopping
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Shopping Cart</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Cart Items */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-lg shadow-sm p-6 space-y-6">
            {cart.map((item) => (
              <CartItem
                key={item.product.id}
                product={item.product}
                quantity={item.quantity}
              />
            ))}
          </div>
        </div>

        {/* Cart Summary */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-lg shadow-sm p-6 sticky top-4">
            <h2 className="text-xl font-semibold mb-6">Order Summary</h2>

            {/* Item Count */}
            <div className="flex justify-between mb-4 text-gray-600">
              <span>Items ({itemCount})</span>
              <span>{new Intl.NumberFormat('vi-VN', {
                style: 'currency',
                currency: 'VND'
              }).format(subtotal)}</span>
            </div>

            {/* Shipping */}
            <div className="flex justify-between mb-4 text-gray-600">
              <span>Shipping</span>
              {shipping === 0 ? (
                <span className="text-green-600">Free</span>
              ) : (
                <span>{new Intl.NumberFormat('vi-VN', {
                  style: 'currency',
                  currency: 'VND'
                }).format(shipping)}</span>
              )}
            </div>

            {/* Free Shipping Progress */}
            {remainingForFreeShipping > 0 && (
              <div className="mb-4">
                <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-blue-600 rounded-full"
                    style={{
                      width: `${(subtotal / freeShippingThreshold) * 100}%`
                    }}
                  />
                </div>
                <p className="mt-2 text-sm text-gray-600">
                  Add{' '}
                  {new Intl.NumberFormat('vi-VN', {
                    style: 'currency',
                    currency: 'VND'
                  }).format(remainingForFreeShipping)}{' '}
                  more to get free shipping!
                </p>
              </div>
            )}

            {/* Total */}
            <div className="border-t pt-4 mt-4">
              <div className="flex justify-between mb-6">
                <span className="text-lg font-semibold">Total</span>
                <span className="text-lg font-semibold text-blue-600">
                  {new Intl.NumberFormat('vi-VN', {
                    style: 'currency',
                    currency: 'VND'
                  }).format(total)}
                </span>
              </div>
            </div>

            {/* Checkout Button */}
            <button className="w-full bg-blue-600 text-white py-3 px-4 rounded-md hover:bg-blue-700 transition-colors mb-4">
              Proceed to Checkout
            </button>

            {/* Continue Shopping */}
            <Link
              href="/products"
              className="block text-center text-blue-600 hover:text-blue-700"
            >
              Continue Shopping
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}