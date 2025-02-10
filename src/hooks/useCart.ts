import { useMemo } from 'react';
import useStore from '@/store/useStore';
import { formatPrice } from '@/utils/format';

export const useCart = () => {
  const { cart, addToCart, removeFromCart, updateCartQuantity, clearCart } =
    useStore();

  const cartTotal = useMemo(() => {
    return cart.reduce(
      (total, item) => total + item.product.price * item.quantity,
      0
    );
  }, [cart]);

  const cartItemsCount = useMemo(() => {
    return cart.reduce((count, item) => count + item.quantity, 0);
  }, [cart]);

  const calculateShipping = () => {
    return cartTotal >= 10000000 ? 0 : 50000;
  };

  const orderTotal = useMemo(() => {
    return cartTotal + calculateShipping();
  }, [cartTotal]);

  const formatCartPrice = (price: number) => formatPrice(price);

  return {
    cart,
    cartTotal,
    cartItemsCount,
    shippingFee: calculateShipping(),
    orderTotal,
    addToCart,
    removeFromCart,
    updateCartQuantity,
    clearCart,
    formatCartPrice,
  };
};

export default useCart;
