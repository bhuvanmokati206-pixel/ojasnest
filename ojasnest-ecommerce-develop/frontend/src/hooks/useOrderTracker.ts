import { useState, useEffect } from 'react';
import { getSocket } from './useSocket';
import api from '../api/client';
import { Order } from '../types';

export const useOrderTracker = (orderId: string | undefined) => {
  const [order, setOrder] = useState<Order | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!orderId) return;
    setLoading(true);

    api.get(`/orders/${orderId}`)
      .then((res) => setOrder(res.data))
      .catch(console.error)
      .finally(() => setLoading(false));

    const socket = getSocket();
    socket.emit('join:order', orderId);

    const handleStatusUpdate = (data: { orderId: string; status: Order['status'] }) => {
      if (data.orderId === orderId) {
        setOrder((prev) => (prev ? { ...prev, status: data.status } : null));
      }
    };

    socket.on('order:status_change', handleStatusUpdate);

    return () => {
      socket.emit('leave:order', orderId);
      socket.off('order:status_change', handleStatusUpdate);
    };
  }, [orderId]);

  return { order, loading };
};