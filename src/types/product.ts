import { BaseCategory, MediaFile } from './common';

// Product Variants
export interface ProductVariant {
  id: string;
  sku: string;
  name: string;
  price: number;
  originalPrice?: number;
  stock: number;
  attributes: {
    [key: string]: string;
  };
  images: string[];
}

// Product Specifications
export interface ProductSpecs {
  [key: string]: string | number | boolean;
}

// Product Review
export interface Review {
  id: string;
  userId: string;
  userName: string;
  rating: number;
  comment: string;
  images?: string[];
  likes: number;
  verified: boolean;
  createdAt: Date;
  updatedAt: Date;
}

// Product Category with specific e-commerce fields
export interface ProductCategory extends BaseCategory {
  parentId?: string;
  featured: boolean;
  orderIndex: number;
  filters?: ProductFilter[];
  icon?: string;
  metaTitle?: string;
  metaDescription?: string;
}

// Product Filters
export type FilterType = 'select' | 'multi-select' | 'range' | 'boolean';

export interface ProductFilter {
  id: string;
  name: string;
  type: FilterType;
  field: string;
  options?: {
    value: string;
    label: string;
  }[];
  min?: number;
  max?: number;
  unit?: string;
}

// Product Search and Filter Parameters
export interface ProductFilterParams {
  category?: string;
  brand?: string;
  minPrice?: number;
  maxPrice?: number;
  inStock?: boolean;
  attributes?: {
    [key: string]: string | string[] | number | boolean;
  };
  sortBy?: 'price_asc' | 'price_desc' | 'rating' | 'newest';
  page?: number;
  limit?: number;
  search?: string;
}

// Brand
export interface Brand {
  id: string;
  name: string;
  slug: string;
  logo?: string;
  description?: string;
  website?: string;
  featured: boolean;
  productCount: number;
}

// Main Product Interface
export interface Product {
  // Basic Information
  id: string;
  name: string;
  slug: string;
  description: string;
  shortDescription?: string;
  sku: string;
  
  // Pricing
  price: number;
  originalPrice?: number;
  discount?: {
    type: 'percentage' | 'fixed';
    value: number;
    startDate?: Date;
    endDate?: Date;
  };
  
  // Inventory
  stock: number;
  lowStockThreshold?: number;
  stockStatus: 'in_stock' | 'low_stock' | 'out_of_stock' | 'discontinued';
  
  // Categorization
  category: ProductCategory;
  subcategory?: ProductCategory;
  brand: Brand;
  tags: string[];
  
  // Media
  images: string[];
  videos?: string[];
  documents?: MediaFile[];
  
  // Specifications
  specs: ProductSpecs;
  
  // Variants
  hasVariants: boolean;
  variants?: ProductVariant[];
  defaultVariant?: string;
  
  // Ratings & Reviews
  rating: number;
  reviewCount: number;
  reviews: Review[];
  
  // SEO
  metaTitle?: string;
  metaDescription?: string;
  keywords?: string[];
  
  // Additional Information
  featured: boolean;
  warranty?: string;
  shippingInfo?: {
    weight: number;
    dimensions: {
      length: number;
      width: number;
      height: number;
    };
    freeShipping: boolean;
  };
  
  // Related Products
  relatedProducts?: string[];
  crossSellProducts?: string[];
  
  // Timestamps
  createdAt: Date;
  updatedAt: Date;
}

// Cart Related Types
export interface CartItem {
  product: Product;
  variant?: ProductVariant;
  quantity: number;
}

export interface CartSummary {
  subtotal: number;
  shipping: number;
  tax: number;
  discount: number;
  total: number;
  itemCount: number;
}

export interface Cart {
  id: string;
  userId?: string;
  items: CartItem[];
  summary: CartSummary;
  couponCode?: string;
  updatedAt: Date;
}