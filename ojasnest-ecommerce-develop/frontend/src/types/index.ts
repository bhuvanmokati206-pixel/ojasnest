export interface User {
  id: string;
  email: string;
  name: string;
  role: 'CUSTOMER' | 'ADMIN';
  createdAt?: string;
}

export interface Category {
  id: string;
  name: string;
  slug: string;
  image?: string | null;
}

export interface Product {
  id: string;
  title: string;
  slug: string;
  description: string;
  price: number | string;
  stock: number;
  images: string[];
  featured?: boolean;
  categoryId: string;
  category?: Category;
  createdAt?: string;
}

export interface OrderItem {
  id: string;
  productId: string;
  product: Product;
  quantity: number;
  price: number | string;
}

export interface Order {
  id: string;
  userId: string;
  totalAmount: number | string;
  status: 'PENDING' | 'PAID' | 'PROCESSING' | 'DISPATCHED' | 'DELIVERED' | 'CANCELLED';
  trackingNumber?: string | null;
  items: OrderItem[];
  createdAt: string;
}