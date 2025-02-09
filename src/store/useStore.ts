import { create } from 'zustand';
import { Product } from '@/types/product';

interface UserState {
  user: {
    id: string;
    name: string;
    email: string;
    avatar?: string;
  } | null;
  isAuthenticated: boolean;
}

interface CartItem {
  product: Product;
  quantity: number;
}

interface StoreState {
  cart: CartItem[];
  user: UserState;
  wishlist: Product[];
  addToCart: (product: Product, quantity: number) => void;
  removeFromCart: (productId: string) => void;
  updateCartQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  setUser: (userData: UserState['user']) => void;
  logout: () => void;
  addToWishlist: (product: Product) => void;
  removeFromWishlist: (productId: string) => void;
  clearWishlist: () => void;
}

const useStore = create<StoreState>((set, get) => ({
  cart: [],
  user: {
    user: null,
    isAuthenticated: false
  },
  wishlist: [],

  addToCart: (product, quantity) => {
    set(state => {
      const existingItem = state.cart.find(item => item.product.id === product.id);
      if (existingItem) {
        return {
          cart: state.cart.map(item =>
            item.product.id === product.id
              ? { ...item, quantity: item.quantity + quantity }
              : item
          )
        };
      }
      return { cart: [...state.cart, { product, quantity }] };
    });
  },

  removeFromCart: (productId) => {
    set(state => ({
      cart: state.cart.filter(item => item.product.id !== productId)
    }));
  },

  updateCartQuantity: (productId, quantity) => {
    set(state => ({
      cart: state.cart.map(item =>
        item.product.id === productId ? { ...item, quantity } : item
      )
    }));
  },

  clearCart: () => {
    set({ cart: [] });
  },

  setUser: (userData) => {
    set(state => ({
      user: {
        user: userData,
        isAuthenticated: !!userData
      }
    }));
  },

  logout: () => {
    set(state => ({
      user: {
        user: null,
        isAuthenticated: false
      }
    }));
  },

  addToWishlist: (product) => {
    set(state => {
      if (state.wishlist.find(item => item.id === product.id)) {
        return state;
      }
      return { wishlist: [...state.wishlist, product] };
    });
  },

  removeFromWishlist: (productId) => {
    set(state => ({
      wishlist: state.wishlist.filter(product => product.id !== productId)
    }));
  },

  clearWishlist: () => {
    set({ wishlist: [] });
  }
}));

export default useStore;