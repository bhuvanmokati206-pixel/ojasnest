import React from 'react';
import { useParams } from 'react-router-dom';
import { useOrderTracker } from '../hooks/useOrderTracker';
//import { Package, Truck, CheckCircle2, Clock } from 'lucide-react';

export const OrderTrackingPage: React.FC = () => {
  const { orderId } = useParams<{ orderId: string }>();
  const { order, loading } = useOrderTracker(orderId);

  if (loading) return <div className="p-12 text-center text-slate-400">Tracking shipment in real time...</div>;
  if (!order) return <div className="p-12 text-center text-slate-400">Order not found.</div>;

  const statuses = ['PENDING', 'PAID', 'PROCESSING', 'DISPATCHED', 'DELIVERED'];
  const currentIndex = statuses.indexOf(order.status);

  return (
    <div className="max-w-3xl mx-auto px-4 py-12 space-y-8">
      <div className="bg-slate-900 border border-slate-800 p-6 rounded-xl">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-xl font-bold text-white">Live Tracking: #{order.id.slice(0, 8)}</h1>
            <p className="text-xs text-slate-400 mt-1">Status: <span className="text-amber-400 font-bold">{order.status}</span></p>
          </div>
          <span className="w-3 h-3 rounded-full bg-emerald-500 animate-ping"></span>
        </div>

        <div className="flex justify-between items-center relative py-6">
          {statuses.map((s, idx) => {
            const isCompleted = idx <= currentIndex;
            return (
              <div key={s} className="flex flex-col items-center relative z-10">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold ${isCompleted ? 'bg-amber-400 text-slate-950' : 'bg-slate-800 text-slate-500'}`}>
                  {idx + 1}
                </div>
                <span className="text-[10px] mt-2 font-semibold text-slate-400 uppercase">{s}</span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};