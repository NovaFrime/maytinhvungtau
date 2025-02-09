import { Product, ProductCategory, Brand } from '@/types/product';

export const mockCategories: ProductCategory[] = [
  {
    id: 'gaming-laptops',
    name: 'Gaming Laptops',
    slug: 'gaming-laptops',
    description: 'High-performance gaming laptops',
    featured: true,
    orderIndex: 1
  },
  {
    id: 'business-laptops',
    name: 'Business Laptops',
    slug: 'business-laptops',
    description: 'Professional business laptops',
    featured: true,
    orderIndex: 2
  }
];

export const mockBrands: Brand[] = [
  {
    id: 'asus',
    name: 'ASUS',
    slug: 'asus',
    logo: '/brands/asus.png',
    featured: true,
    productCount: 10
  },
  {
    id: 'apple',
    name: 'Apple',
    slug: 'apple',
    logo: '/brands/apple.png',
    featured: true,
    productCount: 5
  },
  {
    id: 'lenovo',
    name: 'Lenovo',
    slug: 'lenovo',
    logo: '/brands/lenovo.png',
    featured: true,
    productCount: 8
  },
  {
    id: 'dell',
    name: 'Dell',
    slug: 'dell',
    logo: '/brands/dell.png',
    featured: true,
    productCount: 12
  }
];

export const mockProducts: Product[] = [
  {
    id: '1',
    name: 'ROG Strix G15 Gaming Laptop',
    slug: 'rog-strix-g15-gaming-laptop',
    description: 'ASUS ROG Strix G15 Gaming Laptop with AMD Ryzen 9 and RTX 3080',
    shortDescription: 'Premium gaming laptop with high-end specifications',
    sku: 'ROG-G15-001',
    price: 45990000,
    originalPrice: 49990000,
    stock: 10,
    stockStatus: 'in_stock',
    lowStockThreshold: 5,
    category: mockCategories[0],
    brand: mockBrands[0],
    tags: ['gaming', 'laptop', 'asus', 'rog'],
    images: ['/images/products/rog-strix-g15.jpg'],
    specs: {
      processor: 'AMD Ryzen 9 5900HX',
      graphics: 'NVIDIA GeForce RTX 3080',
      memory: '32GB DDR4',
      storage: '1TB NVMe SSD',
      display: '15.6" QHD 165Hz'
    },
    hasVariants: false,
    rating: 4.8,
    reviewCount: 12,
    reviews: [],
    featured: true,
    createdAt: new Date('2024-01-01'),
    updatedAt: new Date('2024-01-01')
  },
  {
    id: '2',
    name: 'MacBook Pro 14"',
    slug: 'macbook-pro-14',
    description: 'Apple MacBook Pro 14" with M2 Pro chip',
    shortDescription: 'Professional laptop for creators',
    sku: 'MBP-14-001',
    price: 52990000,
    originalPrice: 54990000,
    stock: 5,
    stockStatus: 'low_stock',
    lowStockThreshold: 3,
    category: mockCategories[1],
    brand: mockBrands[1],
    tags: ['apple', 'macbook', 'pro', 'laptop'],
    images: ['/images/products/macbook-pro-14.jpg'],
    specs: {
      processor: 'Apple M2 Pro',
      memory: '16GB Unified Memory',
      storage: '512GB SSD',
      display: '14" Liquid Retina XDR'
    },
    hasVariants: false,
    rating: 4.9,
    reviewCount: 8,
    reviews: [],
    featured: true,
    createdAt: new Date('2024-01-01'),
    updatedAt: new Date('2024-01-01')
  },
  {
    id: '3',
    name: 'ThinkPad X1 Carbon Gen 10',
    slug: 'thinkpad-x1-carbon-gen-10',
    description: 'Lenovo ThinkPad X1 Carbon Gen 10 Business Laptop',
    shortDescription: 'Premium business ultrabook',
    sku: 'TP-X1-001',
    price: 38990000,
    originalPrice: 41990000,
    stock: 8,
    stockStatus: 'in_stock',
    lowStockThreshold: 4,
    category: mockCategories[1],
    brand: mockBrands[2],
    tags: ['lenovo', 'thinkpad', 'business', 'laptop'],
    images: ['/images/products/thinkpad-x1.jpg'],
    specs: {
      processor: 'Intel Core i7-1260P',
      memory: '16GB LPDDR5',
      storage: '1TB NVMe SSD',
      display: '14" WQUXGA'
    },
    hasVariants: false,
    rating: 4.7,
    reviewCount: 15,
    reviews: [],
    featured: false,
    createdAt: new Date('2024-01-01'),
    updatedAt: new Date('2024-01-01')
  },
  {
    id: '4',
    name: 'Dell XPS 15',
    slug: 'dell-xps-15',
    description: 'Dell XPS 15 Premium Laptop',
    shortDescription: 'Premium multimedia laptop',
    sku: 'XPS-15-001',
    price: 49990000,
    originalPrice: 51990000,
    stock: 6,
    stockStatus: 'in_stock',
    lowStockThreshold: 3,
    category: mockCategories[1],
    brand: mockBrands[3],
    tags: ['dell', 'xps', 'premium', 'laptop'],
    images: ['/images/products/dell-xps-15.jpg'],
    specs: {
      processor: 'Intel Core i9-12900HK',
      graphics: 'NVIDIA RTX 3050 Ti',
      memory: '32GB DDR5',
      storage: '1TB NVMe SSD',
      display: '15.6" 4K OLED'
    },
    hasVariants: false,
    rating: 4.8,
    reviewCount: 10,
    reviews: [],
    featured: true,
    createdAt: new Date('2024-01-01'),
    updatedAt: new Date('2024-01-01')
  }
];