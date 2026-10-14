import React, { useState } from 'react';
import api from '../../api/client';

export const OrderStatusUpdater: React.FC<{ orderId: string; currentStatus: string; onUpdated: () => void }> = ({
  orderId,
  currentStatus,
  onUpdated,
}) => {
  const [status, setStatus] = useState(currentStatus);
  const [loading, setLoading] = useState(false);

  const handleChange = async (newStatus: string) => {
    setLoading(true);
    try {
      await api.patch(`/orders/${orderId}/status`, { status: newStatus });
      setStatus(newStatus);
      onUpdated();
    } catch (err) {
      alert('Failed updating dispatch state');
    } finally {
      setLoading(false);
    }
  };

  return (
    <select
      value={status}
      disabled={loading}
      onChange={(e) => handleChange(e.target.value)}
      className="bg-slate-900 border border-slate-700 text-xs text-amber-400 font-bold rounded px-2 py-1 focus:outline-none"
    >
      {['PENDING', 'PAID', 'PROCESSING', 'DISPATCHED', 'DELIVERED', 'CANCELLED'].map((s) => (
        <option key={s} value={s}>{s}</option>
      ))}
    </select>
  );
};