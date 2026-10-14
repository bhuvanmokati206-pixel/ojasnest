import api from './client';

export const createCheckout = (items: any[]) => api.post('/orders/checkout', { items });
export const fetchOrder = (orderId: string) => api.get(`/orders/${orderId}`);