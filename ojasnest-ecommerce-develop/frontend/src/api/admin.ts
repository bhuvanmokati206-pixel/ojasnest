import api from './client';

export const createProduct = (data: any) => api.post('/products', data);
export const updateStockStatus = (orderId: string, status: string) => 
  api.patch(`/orders/${orderId}/status`, { status });
export const getUploadPresignedUrl = (fileName: string, fileType: string) => 
  api.post('/upload/presigned-url', { fileName, fileType });