'use client';

import { useStore } from '@/store/useStore';
import { Product } from '@/types/product';

export const useCart = () => {
  const cart = useStore(state => state.cart);
  const cartTotal = useStore(state => state.cartTotal);
  const addToCart = useStore(state => state.addToCart);
  const removeFromCart = useStore(state => state.removeFromCart);
  const updateQuantity = useStore(state => state.updateQuantity);
  const clearCart = useStore(state => state.clearCart);

  const getItemQuantity = (productId: string) => {
    const item = cart.find(item => item.product.id === productId);
    return item?.quantity || 0;
  };

  const isInCart = (productId: string) => {
    return cart.some(item => item.product.id === productId);
  };

  const calculateShipping = () => {
    // Free shipping over 10M VND
    return cartTotal >= 10000000 ? 0 : 50000;
  };

  const calculateTotal = () => {
    const shipping = calculateShipping();
    return cartTotal + shipping;
  };

  const addItem = (product: Product, quantity: number = 1) => {
    if (quantity <= 0) return;
    if (quantity > product.stock) {
      quantity = product.stock;
    }
    addToCart(product, quantity);
  };

  const removeItem = (productId: string) => {
    removeFromCart(productId);
  };

  const updateItem = (productId: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(productId);
      return;
    }
    const item = cart.find(item => item.product.id === productId);
    if (item && quantity <= item.product.stock) {
      updateQuantity(productId, quantity);
    }
  };

  const getSummary = () => {
    const subtotal = cartTotal;
    const shipping = calculateShipping();
    const total = subtotal + shipping;
    const itemCount = cart.reduce((sum, item) => sum + item.quantity, 0);

    return {
      subtotal,
      shipping,
      total,
      itemCount,
      freeShippingThreshold: 10000000,
      remainingForFreeShipping: Math.max(0, 10000000 - subtotal)
    };
  };

  return {
    cart,
    cartTotal,
    addItem,
    removeItem,
    updateItem,
    clearCart,
    getItemQuantity,
    isInCart,
    calculateShipping,
    calculateTotal,
    getSummary
  };
};