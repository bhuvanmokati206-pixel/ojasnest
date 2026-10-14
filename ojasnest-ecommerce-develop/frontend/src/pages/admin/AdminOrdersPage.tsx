import React, { useEffect, useState } from 'react';
import { AdminSidebar } from '../../components/admin/AdminSidebar';
import { OrderStatusUpdater } from '../../components/admin/OrderStatusUpdater';
import api from '../../api/client';
import { Order } from '../../types';

export const AdminOrdersPage: React.FC = () => {
  const [orders, setOrders] = useState<Order[]>([]);

  const loadOrders = () => {
    api.get('/orders/all').then((res) => setOrders(res.data)).catch(() => {});
  };

  useEffect(() => {
    loadOrders();
  }, []);

  return (
    <div className="flex">
      <AdminSidebar />
      <div className="flex-1 p-8 space-y-6">
        <h1 className="text-2xl font-black text-white">Fulfillment & Live Status Dispatch</h1>
        <div className="overflow-x-auto border border-slate-800 rounded-xl">
          <table className="w-full text-left text-sm text-slate-300">
            <thead className="bg-slate-900 text-xs font-bold text-slate-400 uppercase border-b border-slate-800">
              <tr>
                <th className="px-4 py-3">Order ID</th>
                <th className="px-4 py-3">Amount</th>
                <th className="px-4 py-3">Update Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800 bg-slate-950">
              {orders.map((o) => (
                <tr key={o.id}>
                  <td className="px-4 py-3 font-semibold text-white">{o.trackingNumber}</td>
                  <td className="px-4 py-3 text-amber-400 font-bold">£{Number(o.totalAmount).toFixed(2)}</td>
                  <td className="px-4 py-3">
                    <OrderStatusUpdater orderId={o.id} currentStatus={o.status} onUpdated={loadOrders} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};