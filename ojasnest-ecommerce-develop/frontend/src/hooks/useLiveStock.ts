import { useState, useEffect } from 'react';
import { getSocket } from './useSocket';

export interface StockPayload {
  productId: string;
  currentStock: number;
}

export const useLiveStock = (productId: string, initialStock: number) => {
  const [stock, setStock] = useState<number>(initialStock);

  useEffect(() => {
    setStock(initialStock);
    const socket = getSocket();

    const handleStockUpdate = (data: StockPayload) => {
      if (data.productId === productId) {
        setStock(data.currentStock);
      }
    };

    socket.on('stock:update', handleStockUpdate);
    socket.emit('stock:query', productId);

    return () => {
      socket.off('stock:update', handleStockUpdate);
    };
  }, [productId, initialStock]);

  return stock;
};