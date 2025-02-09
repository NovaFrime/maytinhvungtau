export interface Product {
  id: string;
  name: string;
  slug: string;
  description: string;
  price: number;
  originalPrice?: number;
  discount?: number;
  images: string[];
  category: string;
  subcategory?: string;
  brand: string;
  specifications: Record<string, string>;
  stock: number;
  rating: number;
  reviewCount: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface Category {
  id: string;
  name: string;
  slug: string;
  description?: string;
  image?: string;
  subcategories?: Category[];
  parentId?: string;
}

export interface Brand {
  id: string;
  name: string;
  slug: string;
  logo: string;
  description?: string;
}

export interface CartItem {
  product: Product;
  quantity: number;
}

export interface User {
  id: string;
  email: string;
  name: string;
  phone?: string;
  address?: Address[];
  orders?: Order[];
  createdAt: Date;
  updatedAt: Date;
}

export interface Address {
  id: string;
  userId: string;
  fullName: string;
  phone: string;
  province: string;
  district: string;
  ward: string;
  streetAddress: string;
  isDefault: boolean;
}

export interface Order {
  id: string;
  userId: string;
  items: OrderItem[];
  status: OrderStatus;
  totalAmount: number;
  shippingAddress: Address;
  paymentMethod: PaymentMethod;
  createdAt: Date;
  updatedAt: Date;
}

export interface OrderItem {
  productId: string;
  quantity: number;
  price: number;
  product: Product;
}

export type OrderStatus = 
  | 'pending'
  | 'confirmed'
  | 'shipping'
  | 'delivered'
  | 'cancelled';

export type PaymentMethod = 
  | 'cod'
  | 'banking'
  | 'momo'
  | 'vnpay'
  | 'zalopay';

export interface Review {
  id: string;
  userId: string;
  productId: string;
  rating: number;
  comment: string;
  images?: string[];
  createdAt: Date;
  updatedAt: Date;
}

export interface Promotion {
  id: string;
  title: string;
  description: string;
  image: string;
  startDate: Date;
  endDate: Date;
  discountType: 'PERCENTAGE' | 'FIXED';
  discountValue: number;
  minimumPurchase?: number;
  productIds?: string[];
  categoryIds?: string[];
  active: boolean;
} 