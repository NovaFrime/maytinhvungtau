import { Product, ProductCategory, Brand } from '@/types/product';

export const mockCategories: ProductCategory[] = [
  {
    id: 'laptops',
    name: 'Laptop',
    slug: 'laptop',
    description: 'Laptop văn phòng, gaming và workstation',
    image: 'https://images.unsplash.com/photo-1603302576837-37561b2e2302?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1000&q=80',
    featured: true,
    productCount: 24,
    orderIndex: 1
  },
  {
    id: 'desktops',
    name: 'Máy Tính Để Bàn',
    slug: 'may-tinh-de-ban',
    description: 'PC văn phòng, gaming và đồ họa chuyên nghiệp',
    image: 'https://images.unsplash.com/photo-1593640408182-31c70c8268f5?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1000&q=80',
    featured: true,
    productCount: 18,
    orderIndex: 2
  }
];

export const mockBrands: Brand[] = [
  {
    id: 'dell',
    name: 'Dell',
    slug: 'dell',
    logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/82/Dell_Logo.png/640px-Dell_Logo.png',
    description: 'Thương hiệu máy tính hàng đầu thế giới',
    website: 'https://dell.com',
    productCount: 32,
    featured: true
  },
  {
    id: 'lenovo',
    name: 'Lenovo',
    slug: 'lenovo',
    logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/b/b8/Lenovo_logo_2015.svg/640px-Lenovo_logo_2015.svg.png',
    description: 'Nhà sản xuất PC lớn nhất thế giới',
    website: 'https://lenovo.com',
    productCount: 28,
    featured: true
  },
  {
    id: 'asus',
    name: 'Asus',
    slug: 'asus',
    logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/2e/ASUS_Logo.svg/640px-ASUS_Logo.svg.png',
    description: 'Thương hiệu điện tử hàng đầu Đài Loan',
    website: 'https://asus.com',
    productCount: 45,
    featured: true
  },
  {
    id: 'hp',
    name: 'HP',
    slug: 'hp',
    logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/ad/HP_logo_2012.svg/640px-HP_logo_2012.svg.png',
    description: 'Hewlett-Packard - Thương hiệu công nghệ lâu đời',
    website: 'https://hp.com',
    productCount: 36,
    featured: true
  }
];

export const mockProducts: Product[] = [
  {
    id: 'dell-latitude-3520',
    name: 'Dell Latitude 3520',
    slug: 'dell-latitude-3520',
    description: 'Laptop doanh nhân cao cấp với hiệu năng mạnh mẽ và độ bền cao',
    shortDescription: 'Laptop doanh nhân đến từ Dell',
    price: 16990000,
    originalPrice: 18990000,
    stock: 15,
    sku: 'DELL-LAT-3520',
    stockStatus: 'in_stock',
    category: mockCategories[0],
    brand: mockBrands[0],
    images: [
      'https://images.unsplash.com/photo-1588872657578-7efd1f1555ed?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1588872657578-7efd1f1555ed?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1000&q=80'
    ],
    specs: {
      processor: 'Intel Core i5-1135G7',
      memory: '8GB DDR4',
      storage: 'SSD 256GB NVMe',
      display: '15.6" FHD (1920x1080)',
      graphics: 'Intel Iris Xe Graphics',
      battery: '4 Cell 54WHr',
      weight: 1.79,
      dimensions: {
        length: 361,
        width: 240.9,
        height: 18
      },
      manufacturer: 'Dell',
      model: 'Latitude 3520',
      warranty: '12 tháng'
    },
    hasVariants: false,
    rating: 4.5,
    reviewCount: 12,
    featured: true,
    tags: ['laptop', 'dell', 'business'],
    createdAt: new Date('2024-01-01'),
    updatedAt: new Date('2024-01-01')
  },
  {
    id: 'lenovo-thinkpad-e15',
    name: 'Lenovo ThinkPad E15',
    slug: 'lenovo-thinkpad-e15',
    description: 'Laptop doanh nhân bền bỉ với bàn phím tốt nhất phân khúc',
    shortDescription: 'ThinkPad cho doanh nghiệp',
    price: 19990000,
    originalPrice: 21990000,
    stock: 8,
    sku: 'LEN-TP-E15',
    stockStatus: 'in_stock',
    category: mockCategories[0],
    brand: mockBrands[1],
    images: [
      'https://images.unsplash.com/photo-1593642702821-c8da6771f0c6?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1593642702821-c8da6771f0c6?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1000&q=80'
    ],
    specs: {
      processor: 'Intel Core i7-1165G7',
      memory: '16GB DDR4',
      storage: 'SSD 512GB NVMe',
      display: '15.6" FHD IPS (1920x1080)',
      battery: '3 Cell 45WHr',
      weight: 1.7,
      dimensions: {
        length: 365,
        width: 245,
        height: 18.9
      },
      manufacturer: 'Lenovo',
      model: 'ThinkPad E15 Gen 2',
      warranty: '24 tháng'
    },
    hasVariants: false,
    rating: 4.8,
    reviewCount: 15,
    featured: true,
    tags: ['laptop', 'lenovo', 'thinkpad', 'business'],
    createdAt: new Date('2024-01-02'),
    updatedAt: new Date('2024-01-02')
  }
];