// Site Configuration
export const SITE_CONFIG = {
  name: 'MayTinhVungTau',
  title: 'MayTinhVungTau - Computer Store',
  description: 'Your trusted computer store in Vung Tau, offering the latest technology and expert service',
  contactEmail: 'info@maytinhvungtau.com',
  contactPhone: '1800-1234',
  address: '123 Main Street, Vung Tau City, Vietnam',
  socialLinks: {
    facebook: 'https://facebook.com/maytinhvungtau',
    instagram: 'https://instagram.com/maytinhvungtau',
    youtube: 'https://youtube.com/maytinhvungtau'
  }
};

// Navigation Links
export const NAV_LINKS = {
  main: [
    { label: 'Products', href: '/products' },
    { label: 'Promotions', href: '/promotions' },
    { label: 'Services', href: '/services' },
    { label: 'About', href: '/about' },
    { label: 'Contact', href: '/contact' }
  ],
  footer: [
    {
      title: 'Quick Links',
      links: [
        { label: 'About Us', href: '/about' },
        { label: 'Products', href: '/products' },
        { label: 'Services', href: '/services' },
        { label: 'Contact', href: '/contact' }
      ]
    },
    {
      title: 'Customer Service',
      links: [
        { label: 'Shipping Policy', href: '/shipping' },
        { label: 'Returns', href: '/returns' },
        { label: 'Warranty', href: '/warranty' },
        { label: 'FAQ', href: '/faq' }
      ]
    }
  ]
};

// Product Categories
export const PRODUCT_CATEGORIES = [
  {
    id: 'laptops',
    name: 'Laptops',
    slug: 'laptops',
    subcategories: [
      { id: 'gaming-laptops', name: 'Gaming Laptops', slug: 'gaming-laptops' },
      { id: 'business-laptops', name: 'Business Laptops', slug: 'business-laptops' },
      { id: 'macbooks', name: 'MacBooks', slug: 'macbooks' }
    ]
  },
  {
    id: 'desktops',
    name: 'Desktops',
    slug: 'desktops',
    subcategories: [
      { id: 'gaming-pcs', name: 'Gaming PCs', slug: 'gaming-pcs' },
      { id: 'workstations', name: 'Workstations', slug: 'workstations' },
      { id: 'all-in-one', name: 'All-in-One PCs', slug: 'all-in-one' }
    ]
  },
  {
    id: 'components',
    name: 'Components',
    slug: 'components',
    subcategories: [
      { id: 'processors', name: 'Processors', slug: 'processors' },
      { id: 'graphics-cards', name: 'Graphics Cards', slug: 'graphics-cards' },
      { id: 'memory', name: 'Memory', slug: 'memory' },
      { id: 'storage', name: 'Storage', slug: 'storage' }
    ]
  }
];

// Shopping Cart Configuration
export const CART_CONFIG = {
  freeShippingThreshold: 10000000, // 10M VND
  standardShippingFee: 50000, // 50K VND
  maxQuantityPerItem: 10
};

// API Configuration
export const API_CONFIG = {
  baseUrl: '/api',
  endpoints: {
    products: '/products',
    categories: '/categories',
    cart: '/cart',
    orders: '/orders',
    auth: '/auth'
  },
  itemsPerPage: 12
};

// Form Validation Rules
export const VALIDATION_RULES = {
  email: {
    pattern: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
    message: 'Invalid email address'
  },
  password: {
    minLength: 8,
    message: 'Password must be at least 8 characters'
  },
  phone: {
    pattern: /^[0-9]{10}$/,
    message: 'Phone number must be 10 digits'
  }
};

// Local Storage Keys
export const STORAGE_KEYS = {
  cart: 'maytinhvungtau_cart',
  auth: 'maytinhvungtau_auth',
  theme: 'maytinhvungtau_theme',
  recentlyViewed: 'maytinhvungtau_recently_viewed'
};

// Error Messages
export const ERROR_MESSAGES = {
  general: 'An error occurred. Please try again.',
  network: 'Network error. Please check your connection.',
  auth: {
    invalidCredentials: 'Invalid email or password',
    sessionExpired: 'Your session has expired. Please log in again.'
  },
  cart: {
    addFailed: 'Failed to add item to cart',
    updateFailed: 'Failed to update cart',
    removeFailed: 'Failed to remove item from cart'
  }
};

export const SUPPORT_LINKS = [
  {
    title: 'Hệ thống showroom',
    href: '/showroom'
  },
  {
    title: 'Trung tâm bảo hành',
    href: '/bao-hanh'
  },
  {
    title: 'Hotline: 1800.xxxx',
    href: 'tel:1800xxxx'
  }
];

export const MAIN_CATEGORIES = [
  {
    title: 'Laptop',
    href: '/laptop',
    subcategories: [
      { title: 'Gaming Laptop', href: '/laptop/gaming' },
      { title: 'Văn Phòng', href: '/laptop/van-phong' },
      { title: 'Đồ Họa', href: '/laptop/do-hoa' }
    ]
  },
  {
    title: 'PC - Máy Tính Bộ',
    href: '/pc',
    subcategories: [
      { title: 'PC Gaming', href: '/pc/gaming' },
      { title: 'PC Văn Phòng', href: '/pc/van-phong' },
      { title: 'PC Đồ Họa', href: '/pc/do-hoa' }
    ]
  },
  {
    title: 'Linh Kiện PC',
    href: '/linh-kien',
    subcategories: [
      { title: 'CPU', href: '/linh-kien/cpu' },
      { title: 'Mainboard', href: '/linh-kien/mainboard' },
      { title: 'RAM', href: '/linh-kien/ram' },
      { title: 'SSD', href: '/linh-kien/ssd' }
    ]
  }
];

export const USER_MENU = [
  {
    title: 'Đăng Nhập',
    href: '/dang-nhap'
  },
  {
    title: 'Đăng Ký',
    href: '/dang-ky'
  },
  {
    title: 'Đơn Hàng',
    href: '/don-hang'
  }
];

export const SORT_OPTIONS = [
  { label: 'Giá Thấp đến Cao', value: 'price-asc' },
  { label: 'Giá Cao đến Thấp', value: 'price-desc' },
  { label: 'Mới Nhất', value: 'newest' },
  { label: 'Bán Chạy', value: 'best-selling' }
];

export const PRICE_RANGES = [
  { label: 'Dưới 5 triệu', min: 0, max: 5000000 },
  { label: '5 - 10 triệu', min: 5000000, max: 10000000 },
  { label: '10 - 20 triệu', min: 10000000, max: 20000000 },
  { label: '20 - 30 triệu', min: 20000000, max: 30000000 },
  { label: 'Trên 30 triệu', min: 30000000, max: null }
];