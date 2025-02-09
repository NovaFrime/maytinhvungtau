import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { Product } from '@/types/product';

interface CartItem {
  product: Product;
  quantity: number;
}

interface UserState {
  isAuthenticated: boolean;
  user: {
    id?: string;
    name?: string;
    email?: string;
  } | null;
}

interface StoreState {
  // Cart State
  cart: CartItem[];
  cartTotal: number;
  
  // Cart Actions
  addToCart: (product: Product, quantity: number) => void;
  removeFromCart: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  
  // User State
  user: UserState;
  
  // User Actions
  setUser: (userData: UserState['user']) => void;
  logout: () => void;
  
  // Wishlist State
  wishlist: Product[];
  
  // Wishlist Actions
  addToWishlist: (product: Product) => void;
  removeFromWishlist: (productId: string) => void;
}

export const useStore = create<StoreState>()(
  persist(
    (set, get) => ({
      // Initial Cart State
      cart: [],
      cartTotal: 0,
      
      // Cart Actions
      addToCart: (product, quantity) => {
        const cart = get().cart;
        const existingItem = cart.find(item => item.product.id === product.id);
        
        if (existingItem) {
          const updatedCart = cart.map(item =>
            item.product.id === product.id
              ? { ...item, quantity: item.quantity + quantity }
              : item
          );
          set({ cart: updatedCart });
        } else {
          set({ cart: [...cart, { product, quantity }] });
        }
        
        // Update cart total
        set(state => ({
          cartTotal: state.cart.reduce(
            (total, item) => total + item.product.price * item.quantity,
            0
          ),
        }));
      },
      
      removeFromCart: (productId) => {
        set(state => ({
          cart: state.cart.filter(item => item.product.id !== productId),
          cartTotal: state.cart
            .filter(item => item.product.id !== productId)
            .reduce((total, item) => total + item.product.price * item.quantity, 0),
        }));
      },
      
      updateQuantity: (productId, quantity) => {
        set(state => ({
          cart: state.cart.map(item =>
            item.product.id === productId ? { ...item, quantity } : item
          ),
          cartTotal: state.cart
            .map(item =>
              item.product.id === productId
                ? { ...item, quantity }
                : item
            )
            .reduce((total, item) => total + item.product.price * item.quantity, 0),
        }));
      },
      
      clearCart: () => {
        set({ cart: [], cartTotal: 0 });
      },
      
      // Initial User State
      user: {
        isAuthenticated: false,
        user: null,
      },
      
      // User Actions
      setUser: (userData) => {
        set({
          user: {
            isAuthenticated: !!userData,
            user: userData,
          },
        });
      },
      
      logout: () => {
        set({
          user: {
            isAuthenticated: false,
            user: null,
          },
        });
      },
      
      // Initial Wishlist State
      wishlist: [],
      
      // Wishlist Actions
      addToWishlist: (product) => {
        set(state => ({
          wishlist: [...state.wishlist, product],
        }));
      },
      
      removeFromWishlist: (productId) => {
        set(state => ({
          wishlist: state.wishlist.filter(product => product.id !== productId),
        }));
      },
    }),
    {
      name: 'maytinhvungtau-store',
      skipHydration: true,
    }
  )
);