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
  products: '/san-pham',
  about: '/gioi-thieu',
  contact: '/lien-he',
  cart: '/gio-hang'
};

export const PRODUCT_CATEGORIES = [
  { id: 'laptops', name: 'Laptop', path: '/san-pham?danh-muc=laptops' },
  { id: 'desktops', name: 'Máy Tính Để Bàn', path: '/san-pham?danh-muc=desktops' },
  { id: 'components', name: 'Linh Kiện', path: '/san-pham?danh-muc=components' },
  { id: 'accessories', name: 'Phụ Kiện', path: '/san-pham?danh-muc=accessories' }
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
  general: 'Đã xảy ra lỗi. Vui lòng thử lại.',
  network: 'Lỗi kết nối. Vui lòng kiểm tra đường truyền.',
  auth: {
    invalid: 'Email hoặc mật khẩu không đúng',
    required: 'Vui lòng đăng nhập để tiếp tục'
  },
  validation: {
    required: 'Vui lòng điền thông tin này',
    email: 'Vui lòng nhập email hợp lệ',
    phone: 'Vui lòng nhập số điện thoại hợp lệ',
    password: 'Mật khẩu phải từ 8 đến 32 ký tự'
  }
};