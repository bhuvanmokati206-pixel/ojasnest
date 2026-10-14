import api from './client';

export const fetchProducts = (params?: { category?: string; q?: string }) => 
  api.get('/products', { params });
export const fetchProductBySlug = (slug: string) => api.get(`/products/${slug}`);
export const fetchCategories = () => api.get('/categories');