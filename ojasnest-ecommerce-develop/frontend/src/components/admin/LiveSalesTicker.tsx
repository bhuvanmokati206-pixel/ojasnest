import React, { useEffect, useState } from 'react';
import { getSocket } from '../../hooks/useSocket';
import { Toast } from '../ui/Toast';

export const LiveSalesTicker: React.FC = () => {
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  useEffect(() => {
    const socket = getSocket();
    socket.on('admin:order_created', (data: { orderId: string; total: number }) => {
      setToastMessage(`⚡ New Order! ID: ${data.orderId.slice(0, 8)}... (£${Number(data.total).toFixed(2)})`);
    });

    return () => {
      socket.off('admin:order_created');
    };
  }, []);

  if (!toastMessage) return null;
  return <Toast message={toastMessage} onClose={() => setToastMessage(null)} />;
};