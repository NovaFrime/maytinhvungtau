import { BaseCategory } from './common';

export interface ProductVariant {
  id: string;
  name: string;
  sku: string;
  price: number;
  stock: number;
  attributes: Record<string, string>;
}

export interface ProductSpecs {
  weight: number;
  dimensions: {
    length: number;
    width: number;
    height: number;
  };
  manufacturer: string;
  model: string;
  warranty: string;
  processor?: string;
  memory?: string;
  graphics?: string;
  storage?: string;
  display?: string;
  connectivity?: string;
  ports?: string[];
  battery?: string;
  os?: string;
}

export interface Review {
  id: string;
  userId: string;
  userName: string;
  rating: number;
  comment: string;
  createdAt: Date;
  helpful: number;
}

export interface ProductCategory extends BaseCategory {
  slug: string;
  description: string;
  image: string;
  parentId?: string;
  featured: boolean;
  productCount: number;
  orderIndex?: number;
}

export type FilterType = 'select' | 'multi-select' | 'range' | 'boolean';

export interface ProductFilterParams {
  category?: string;
  brand?: string;
  minPrice?: number;
  maxPrice?: number;
  inStock?: boolean;
  search?: string;
  sort?: string;
  sortBy?: string;
  page?: number;
  limit?: number;
}

export interface Brand {
  id: string;
  name: string;
  slug: string;
  logo: string;
  description: string;
  website: string;
  productCount: number;
  featured?: boolean;
}

export type StockStatus = 'in_stock' | 'out_of_stock' | 'low_stock' | 'discontinued';

export const STOCK_STATUS_LABELS: Record<StockStatus, string> = {
  in_stock: 'Còn hàng',
  out_of_stock: 'Hết hàng',
  low_stock: 'Sắp hết hàng',
  discontinued: 'Ngừng kinh doanh'
};

export const SORT_OPTIONS = [
  { value: 'price-asc', label: 'Giá: Thấp đến cao' },
  { value: 'price-desc', label: 'Giá: Cao đến thấp' },
  { value: 'name-asc', label: 'Tên: A-Z' },
  { value: 'name-desc', label: 'Tên: Z-A' },
  { value: 'rating-desc', label: 'Đánh giá cao nhất' }
];

export interface Product {
  id: string;
  name: string;
  slug: string;
  description: string;
  shortDescription?: string;
  price: number;
  originalPrice?: number;
  discountPrice?: number;
  stock: number;
  sku: string;
  stockStatus: StockStatus;
  category: ProductCategory;
  brand: Brand;
  images: string[];
  specs: ProductSpecs;
  hasVariants: boolean;
  variants?: ProductVariant[];
  rating: number;
  reviewCount: number;
  reviews?: Review[];
  metaTitle?: string;
  metaDescription?: string;
  featured: boolean;
  tags: string[];
  relatedProducts?: string[];
  createdAt: Date;
  updatedAt: Date;
}

export interface CartItem {
  productId: string;
  quantity: number;
  variant?: ProductVariant;
}