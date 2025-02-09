export const SITE_CONFIG = {
  name: 'Máy Tính Vũng Tàu',
  domain: 'maytinhvungtau.com',
  socialLinks: {
    facebook: 'https://facebook.com/maytinhvungtau',
    instagram: 'https://instagram.com/maytinhvungtau',
    youtube: 'https://youtube.com/maytinhvungtau'
  }
};

export const NAV_LINKS = {
  home: '/',
  products: '/products',
  about: '/about',
  contact: '/contact',
  cart: '/cart'
};

export const PRODUCT_CATEGORIES = [
  { id: 'laptops', name: 'Laptops', path: '/products?category=laptops' },
  { id: 'desktops', name: 'Desktops', path: '/products?category=desktops' },
  { id: 'components', name: 'Components', path: '/products?category=components' },
  { id: 'accessories', name: 'Accessories', path: '/products?category=accessories' }
];

export const CART_CONFIG = {
  maxQuantityPerItem: 10,
  freeShippingThreshold: 10000000,
  standardShippingFee: 50000
};

export const API_CONFIG = {
  baseUrl: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000/api',
  timeout: 5000,
  retryAttempts: 3
};

export const VALIDATION_RULES = {
  email: {
    required: true,
    pattern: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i
  },
  password: {
    required: true,
    minLength: 8,
    maxLength: 32
  },
  phone: {
    required: true,
    pattern: /^(\+84|0)[0-9]{9,10}$/
  }
};

export const STORAGE_KEYS = {
  cart: 'mvt_cart',
  user: 'mvt_user',
  theme: 'mvt_theme',
  wishlist: 'mvt_wishlist'
};

export const ERROR_MESSAGES = {
  general: 'An error occurred. Please try again.',
  network: 'Network error. Please check your connection.',
  auth: {
    invalid: 'Invalid email or password',
    required: 'Please sign in to continue'
  },
  validation: {
    required: 'This field is required',
    email: 'Please enter a valid email address',
    phone: 'Please enter a valid phone number',
    password: 'Password must be between 8 and 32 characters'
  }
};