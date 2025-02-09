export type Maybe<T> = T | null | undefined;

export interface NavigationItem {
  id: string;
  title: string;
  href: string;
  icon?: string;
  items?: NavigationItem[];
}

export interface BaseCategory {
  id: string;
  name: string;
}

export interface UserAddress {
  id: string;
  street: string;
  city: string;
  state: string;
  zipCode: string;
  country: string;
  isDefault: boolean;
}

export type OrderStatus = 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled';

export interface ApiResponse<T> {
  data: T;
  success: boolean;
  message?: string;
  error?: string;
}

export type ValidationRule = {
  required?: boolean;
  minLength?: number;
  maxLength?: number;
  pattern?: RegExp;
  validate?: (value: any) => boolean | string;
};

export interface WithChildren {
  children: React.ReactNode;
}

export type ThemeMode = 'light' | 'dark' | 'system';

export type SortDirection = 'asc' | 'desc';

export type NotificationType = 'info' | 'success' | 'warning' | 'error';

export interface MediaFile {
  id: string;
  url: string;
  type: string;
  alt?: string;
}

export interface SEOMetadata {
  title: string;
  description: string;
  keywords: string[];
  ogImage?: string;
}

export interface StoreState {
  cart: any[];
  user: any;
  wishlist: any[];
}