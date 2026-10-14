export interface StockUpdatePayload {
  productId: string;
  currentStock: number;
}

export interface OrderStatusPayload {
  orderId: string;
  status: 'PENDING' | 'PAID' | 'PROCESSING' | 'DISPATCHED' | 'DELIVERED' | 'CANCELLED';
}

export interface ChatMessagePayload {
  id: string;
  room: string;
  text: string;
  isAdmin: boolean;
  createdAt: string;
  user: {
    id: string;
    name: string;
    role: string;
  };
}