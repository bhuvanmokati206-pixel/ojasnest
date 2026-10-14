import React, { useEffect, useState } from 'react';
import { AdminSidebar } from '../../components/admin/AdminSidebar';
import { LiveSalesTicker } from '../../components/admin/LiveSalesTicker';
import api from '../../api/client';

export const AdminDashboardPage: React.FC = () => {
  const [stats, setStats] = useState({ productsCount: 0, ordersCount: 0 });

  useEffect(() => {
    Promise.all([api.get('/products'), api.get('/categories')]).then(([p]) => {
      setStats({ productsCount: p.data.length, ordersCount: 12 });
    });
  }, []);

  return (
    <div className="flex">
      <AdminSidebar />
      <LiveSalesTicker />
      <div className="flex-1 p-8 space-y-6">
        <h1 className="text-2xl font-black text-white">Operations Dashboard</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div className="bg-slate-900 border border-slate-800 p-6 rounded-xl">
            <span className="text-xs text-slate-400 font-bold uppercase">Active Catalog</span>
            <div className="text-3xl font-black text-amber-400 mt-2">{stats.productsCount} SKUs</div>
          </div>
          <div className="bg-slate-900 border border-slate-800 p-6 rounded-xl">
            <span className="text-xs text-slate-400 font-bold uppercase">Live Orders Pipeline</span>
            <div className="text-3xl font-black text-emerald-400 mt-2">Active</div>
          </div>
        </div>
      </div>
    </div>
  );
};