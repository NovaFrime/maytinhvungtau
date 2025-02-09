import { ReactNode } from 'react';

// Common Utility Types
export type Maybe<T> = T | null | undefined;
export type Subset<K> = {
  [attr in keyof K]?: K[attr];
};

// Route & Navigation Types
export interface NavigationItem {
  label: string;
  href: string;
  icon?: ReactNode;
}

export interface NavigationSection {
  title: string;
  links: NavigationItem[];
}

// Category Types
export interface BaseCategory {
  id: string;
  name: string;
  slug: string;
  description?: string;
  image?: string;
}

export interface SubCategory extends BaseCategory {
  parentId: string;
}

export interface Category extends BaseCategory {
  subcategories?: SubCategory[];
}

// User Types
export interface UserAddress {
  id: string;
  fullName: string;
  phone: string;
  street: string;
  city: string;
  province: string;
  postalCode: string;
  isDefault?: boolean;
}

export interface UserProfile {
  id: string;
  email: string;
  fullName: string;
  phone?: string;
  avatar?: string;
  addresses: UserAddress[];
}

// Order Types
export type OrderStatus = 
  | 'pending'
  | 'processing'
  | 'shipped'
  | 'delivered'
  | 'cancelled';

export interface OrderItem {
  productId: string;
  quantity: number;
  price: number;
  name: string;
  image: string;
}

export interface Order {
  id: string;
  userId: string;
  items: OrderItem[];
  status: OrderStatus;
  totalAmount: number;
  shippingAddress: UserAddress;
  paymentMethod: string;
  createdAt: Date;
  updatedAt: Date;
}

// API Response Types
export interface ApiResponse<T> {
  data: T;
  error?: string;
  message?: string;
}

export interface PaginatedResponse<T> {
  items: T[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

// Form Types
export type ValidationRule = {
  required?: boolean;
  minLength?: number;
  maxLength?: number;
  pattern?: RegExp;
  validate?: (value: any) => boolean | string;
  message?: string;
};

export type FieldValidation = {
  [key: string]: ValidationRule;
};

// Component Types
export interface WithChildren {
  children: ReactNode;
}

export interface WithClassName {
  className?: string;
}

export type BaseComponentProps = WithChildren & WithClassName;

// Theme Types
export type ThemeMode = 'light' | 'dark' | 'system';

export interface ThemeColors {
  primary: string;
  secondary: string;
  success: string;
  danger: string;
  warning: string;
  info: string;
}

// Event Types
export type SortDirection = 'asc' | 'desc';

export interface SortConfig {
  field: string;
  direction: SortDirection;
}

export interface FilterConfig {
  [key: string]: any;
}

// Notification Types
export type NotificationType = 'info' | 'success' | 'warning' | 'error';

export interface Notification {
  id: string;
  type: NotificationType;
  message: string;
  title?: string;
  autoClose?: boolean;
  duration?: number;
}

// Media Types
export interface MediaFile {
  id: string;
  url: string;
  type: 'image' | 'video' | 'document';
  name: string;
  size: number;
  mimeType: string;
  createdAt: Date;
}

// SEO Types
export interface SEOMetadata {
  title: string;
  description: string;
  keywords?: string[];
  ogImage?: string;
  ogTitle?: string;
  ogDescription?: string;
  twitterCard?: string;
  canonical?: string;
}