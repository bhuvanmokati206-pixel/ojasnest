import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { LayoutDashboard, Package, ShoppingBag } from 'lucide-react';

export const AdminSidebar: React.FC = () => {
  const location = useLocation();

  const links = [
    { to: '/admin', label: 'Overview', icon: LayoutDashboard },
    { to: '/admin/products', label: 'Inventory Control', icon: Package },
    { to: '/admin/orders', label: 'Order Dispatch', icon: ShoppingBag },
  ];

  return (
    <aside className="w-64 bg-slate-900 border-r border-slate-800 min-h-[calc(100vh-60px)] p-4 space-y-2">
      <div className="px-3 py-2 text-xs font-bold uppercase tracking-widest text-slate-500">Operations Control</div>
      {links.map(({ to, label, icon: Icon }) => (
        <Link
          key={to}
          to={to}
          className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-semibold transition ${location.pathname === to ? 'bg-amber-400 text-slate-950' : 'text-slate-400 hover:text-white hover:bg-slate-800'}`}
        >
          <Icon className="w-4 h-4" />
          {label}
        </Link>
      ))}
    </aside>
  );
};