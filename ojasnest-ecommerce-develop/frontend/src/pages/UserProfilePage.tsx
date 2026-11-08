import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { 
  FiUser, 
  FiMail, 
  FiShield, 
  FiPackage, 
  FiShoppingBag, 
  FiLogOut, 
  FiArrowUpRight, 
  FiCheckCircle, 
  FiTruck, 
  FiKey
} from 'react-icons/fi';
import { useAuthStore } from '../context/useAuthStore';
import { useCartStore } from '../context/useCartStore';

export const UserProfilePage: React.FC = () => {
  const { user, logout } = useAuthStore();
  const cartItems = useCartStore((s) => s.items);
  const cartTotal = useCartStore((s) => s.total);
  const navigate = useNavigate();

  const [activeTab, setActiveTab] = useState<'profile' | 'orders' | 'warranty'>('profile');

  // Realistic mock recent orders for the customer
  const mockOrders = [
    {
      id: 'OJ-89421',
      date: 'Oct 29, 2026',
      status: 'DISPATCHED',
      statusColor: 'text-amber-400 bg-amber-400/10 border-amber-400/30',
      total: 89.0,
      item: 'OJASNEST GaN Power Bank (140W PD)',
      tracking: 'GB-DHL-994821',
    },
    {
      id: 'OJ-77319',
      date: 'Oct 14, 2026',
      status: 'DELIVERED',
      statusColor: 'text-emerald-400 bg-emerald-400/10 border-emerald-400/30',
      total: 69.0,
      item: 'Titanium Precision Trimmer System',
      tracking: 'GB-ROYAL-448102',
    },
  ];

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-[#090B0E] text-neutral-200 selection:bg-[#FF4D00] selection:text-white py-10 sm:py-14">
      {/* Ambient background glow */}
      <div className="pointer-events-none fixed inset-0 bg-[radial-gradient(ellipse_at_80%_10%,rgba(255,77,0,0.06),transparent_60%)]" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 space-y-8">
        
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 font-mono text-xs text-neutral-400">
          <Link to="/" className="transition hover:text-[#FF4D00]">STOREFRONT</Link>
          <span className="text-neutral-600">//</span>
          <span className="text-[#FF4D00]">ACCOUNT REGISTRY</span>
        </div>

        {/* Hero Header Banner */}
        <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-br from-[#121620] via-[#0C0F14] to-black p-6 sm:p-10 shadow-[0_0_50px_rgba(0,0,0,0.6)]">
          {/* Neon orange accent strip */}
          <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-transparent via-[#FF4D00] to-transparent shadow-[0_0_15px_#FF4D00]" />
          
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
            <div className="flex items-center gap-5">
              {/* Avatar Hex / Rounded Card with Glow */}
              <div className="relative flex h-20 w-20 shrink-0 items-center justify-center rounded-2xl bg-[#090B0E] border-2 border-[#FF4D00] shadow-[0_0_25px_rgba(255,77,0,0.4)]">
                <span className="font-mono text-2xl font-black text-white">
                  {user?.name ? user.name.slice(0, 2).toUpperCase() : 'OJ'}
                </span>
                <span className="absolute -bottom-1 -right-1 h-4 w-4 rounded-full bg-emerald-500 border-2 border-[#090B0E] shadow-[0_0_8px_#10B981]" />
              </div>

              <div>
                <div className="flex items-center gap-2">
                  <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
                    {user?.name || 'Authorized Member'}
                  </h1>
                  <span className="rounded-full bg-[#FF4D00]/15 border border-[#FF4D00]/40 px-2.5 py-0.5 font-mono text-[10px] font-bold text-[#FF4D00]">
                    {user?.role || 'CUSTOMER'}
                  </span>
                </div>
                <p className="mt-1 font-mono text-xs text-neutral-400 flex items-center gap-2">
                  <FiMail className="text-[#FF4D00]" /> {user?.email || 'member@ojasnest.io'}
                </p>
              </div>
            </div>

            {/* Quick Metrics Bar */}
            <div className="flex items-center gap-3 w-full md:w-auto">
              {user?.role === 'ADMIN' && (
                <Link
                  to="/admin"
                  className="flex-1 md:flex-none flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl border border-[#FF4D00] bg-[#FF4D00]/15 text-[#FF4D00] font-mono text-xs font-bold hover:bg-[#FF4D00] hover:text-white transition-all shadow-[0_0_15px_rgba(255,77,0,0.3)]"
                >
                  <FiKey className="text-sm" /> ADMIN CONSOLE
                </Link>
              )}

              <button
                onClick={handleLogout}
                className="flex-1 md:flex-none flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl border border-white/10 bg-white/[0.04] text-neutral-300 font-mono text-xs font-bold hover:border-red-500/50 hover:bg-red-500/10 hover:text-red-400 transition-all"
              >
                <FiLogOut className="text-sm" /> LOGOUT
              </button>
            </div>
          </div>

          {/* Quick Stats Grid */}
          <div className="mt-8 pt-6 border-t border-white/[0.06] grid grid-cols-2 sm:grid-cols-4 gap-4">
            <div className="p-3.5 rounded-xl bg-black/40 border border-white/5">
              <span className="block font-mono text-[10px] text-neutral-500 uppercase">Total Orders</span>
              <span className="font-mono text-lg font-bold text-white mt-0.5 block">02 Units</span>
            </div>
            <div className="p-3.5 rounded-xl bg-black/40 border border-white/5">
              <span className="block font-mono text-[10px] text-neutral-500 uppercase">Hardware Warranty</span>
              <span className="font-mono text-lg font-bold text-emerald-400 mt-0.5 block">Active · 2 YR</span>
            </div>
            <div className="p-3.5 rounded-xl bg-black/40 border border-white/5">
              <span className="block font-mono text-[10px] text-neutral-500 uppercase">Active Bag</span>
              <span className="font-mono text-lg font-bold text-[#FF4D00] mt-0.5 block">{cartItems.length} Items (£{cartTotal().toFixed(2)})</span>
            </div>
            <div className="p-3.5 rounded-xl bg-black/40 border border-white/5">
              <span className="block font-mono text-[10px] text-neutral-500 uppercase">Security Tier</span>
              <span className="font-mono text-lg font-bold text-neutral-200 mt-0.5 block">Passkey + JWT</span>
            </div>
          </div>
        </div>

        {/* Tab Selector */}
        <div className="flex items-center gap-2 border-b border-white/[0.08] pb-1">
          {[
            { id: 'profile', label: 'Security & Profile', icon: FiUser },
            { id: 'orders', label: 'Order Telemetry', icon: FiPackage },
            { id: 'warranty', label: 'Hardware Assurance', icon: FiShield },
          ].map((tab) => {
            const Icon = tab.icon;
            const active = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`relative flex items-center gap-2 px-5 py-3 font-mono text-xs font-bold transition-all rounded-t-xl ${
                  active
                    ? 'text-[#FF4D00] bg-white/[0.04] border-t-2 border-[#FF4D00]'
                    : 'text-neutral-400 hover:text-white hover:bg-white/[0.02]'
                }`}
              >
                <Icon className={active ? 'text-[#FF4D00]' : 'text-neutral-500'} />
                {tab.label}
              </button>
            );
          })}
        </div>

        {/* Tab 1: Profile & Credentials */}
        {activeTab === 'profile' && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-6">
              <div className="rounded-2xl border border-white/10 bg-[#0C0F14] p-6 sm:p-8 space-y-6 shadow-xl">
                <div className="flex items-center justify-between border-b border-white/[0.06] pb-4">
                  <div>
                    <h3 className="text-base font-bold text-white">Identity Credentials</h3>
                    <p className="font-mono text-xs text-neutral-500 mt-0.5">Verified profile attributes for dispatch & tracking</p>
                  </div>
                  <span className="font-mono text-[10px] text-[#FF4D00] bg-[#FF4D00]/10 border border-[#FF4D00]/30 px-2.5 py-1 rounded-full font-bold">
                    ID: {user?.id?.slice(0, 8) || 'USR-2026'}
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div className="p-4 rounded-xl bg-black/50 border border-white/5 space-y-1">
                    <span className="font-mono text-[10px] uppercase tracking-wider text-neutral-500">Full Name</span>
                    <p className="font-sans font-bold text-white text-sm">{user?.name || 'Registered Customer'}</p>
                  </div>

                  <div className="p-4 rounded-xl bg-black/50 border border-white/5 space-y-1">
                    <span className="font-mono text-[10px] uppercase tracking-wider text-neutral-500">Email Address</span>
                    <p className="font-mono text-xs text-white">{user?.email || 'user@ojasnest.io'}</p>
                  </div>

                  <div className="p-4 rounded-xl bg-black/50 border border-white/5 space-y-1">
                    <span className="font-mono text-[10px] uppercase tracking-wider text-neutral-500">System Role</span>
                    <p className="font-mono text-xs font-bold text-amber-400">{user?.role || 'CUSTOMER'}</p>
                  </div>

                  <div className="p-4 rounded-xl bg-black/50 border border-white/5 space-y-1">
                    <span className="font-mono text-[10px] uppercase tracking-wider text-neutral-500">Dispatch Priority</span>
                    <p className="font-mono text-xs font-bold text-emerald-400">&lt;24H Direct Shipment</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Quick Actions & Cart Preview */}
            <div className="space-y-6">
              <div className="rounded-2xl border border-white/10 bg-[#0C0F14] p-6 space-y-4 shadow-xl">
                <div className="flex items-center justify-between">
                  <h4 className="text-sm font-bold text-white flex items-center gap-2">
                    <FiShoppingBag className="text-[#FF4D00]" /> Cart Snapshot
                  </h4>
                  <Link to="/cart" className="font-mono text-[10px] text-[#FF4D00] hover:underline flex items-center gap-1">
                    VIEW CART <FiArrowUpRight />
                  </Link>
                </div>

                {cartItems.length > 0 ? (
                  <div className="space-y-3">
                    {cartItems.slice(0, 3).map((item) => (
                      <div key={item.product.id} className="flex items-center justify-between p-3 rounded-xl bg-black/40 border border-white/5">
                        <div className="truncate pr-2">
                          <p className="text-xs font-bold text-white truncate">{item.product.title}</p>
                          <p className="font-mono text-[10px] text-neutral-500">Qty: {item.quantity}</p>
                        </div>
                        <span className="font-mono text-xs font-bold text-white">
                          £{(Number(item.product.price) * item.quantity).toFixed(2)}
                        </span>
                      </div>
                    ))}
                    <div className="pt-2 border-t border-white/[0.06] flex items-center justify-between font-mono text-xs">
                      <span className="text-neutral-400">Total:</span>
                      <span className="font-black text-[#FF4D00]">£{cartTotal().toFixed(2)}</span>
                    </div>
                  </div>
                ) : (
                  <p className="font-mono text-xs text-neutral-500 py-3 text-center bg-black/40 rounded-xl border border-white/5">
                    Your cart is currently empty.
                  </p>
                )}
              </div>
            </div>
          </div>
        )}

        {/* Tab 2: Orders Telemetry */}
        {activeTab === 'orders' && (
          <div className="rounded-2xl border border-white/10 bg-[#0C0F14] p-6 sm:p-8 space-y-6 shadow-xl">
            <div className="flex items-center justify-between border-b border-white/[0.06] pb-4">
              <div>
                <h3 className="text-base font-bold text-white">Order Telemetry &amp; Shipments</h3>
                <p className="font-mono text-xs text-neutral-500 mt-0.5">Real-time status updates and carrier tracking numbers</p>
              </div>
            </div>

            <div className="space-y-4">
              {mockOrders.map((order) => (
                <div key={order.id} className="p-5 rounded-2xl bg-black/60 border border-white/[0.07] hover:border-[#FF4D00]/40 transition-all flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
                  <div className="space-y-1">
                    <div className="flex items-center gap-3">
                      <span className="font-mono text-sm font-black text-white">{order.id}</span>
                      <span className={`px-2.5 py-0.5 rounded-full font-mono text-[9px] font-bold border ${order.statusColor}`}>
                        {order.status}
                      </span>
                    </div>
                    <p className="text-sm font-semibold text-neutral-200">{order.item}</p>
                    <p className="font-mono text-[10px] text-neutral-500">Ordered: {order.date} · Tracking: {order.tracking}</p>
                  </div>

                  <div className="flex items-center gap-4 w-full md:w-auto justify-between md:justify-end border-t md:border-t-0 border-white/5 pt-3 md:pt-0">
                    <div className="text-left md:text-right">
                      <span className="font-mono text-[10px] text-neutral-500 block">TOTAL AMOUNT</span>
                      <span className="font-mono text-base font-black text-white">£{order.total.toFixed(2)}</span>
                    </div>

                    <Link
                      to={`/orders/track/${order.id}`}
                      className="px-3.5 py-2 rounded-xl bg-[#FF4D00] hover:bg-[#E03E00] text-white font-mono text-xs font-bold transition-all shadow-[0_0_15px_rgba(255,77,0,0.3)] flex items-center gap-1.5"
                    >
                      <FiTruck className="text-sm" /> TRACK
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Tab 3: Warranty & Guarantee */}
        {activeTab === 'warranty' && (
          <div className="rounded-2xl border border-white/10 bg-[#0C0F14] p-6 sm:p-8 space-y-6 shadow-xl">
            <div className="flex items-center justify-between border-b border-white/[0.06] pb-4">
              <div>
                <h3 className="text-base font-bold text-white">Ojasnest Hardware Guarantee</h3>
                <p className="font-mono text-xs text-neutral-500 mt-0.5">2-Year Direct Replacement &amp; Technical Support Coverage</p>
              </div>
              <FiCheckCircle className="text-emerald-400 text-2xl" />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              <div className="p-5 rounded-2xl bg-black/60 border border-white/5 space-y-2">
                <span className="font-mono text-[10px] text-[#FF4D00] font-bold uppercase">GUARANTEE 01</span>
                <h4 className="text-sm font-bold text-white">Advanced Cross-Shipment</h4>
                <p className="text-xs text-neutral-400 leading-relaxed">Defective units are replaced immediately with prepaid return packaging dispatched first.</p>
              </div>

              <div className="p-5 rounded-2xl bg-black/60 border border-white/5 space-y-2">
                <span className="font-mono text-[10px] text-[#FF4D00] font-bold uppercase">GUARANTEE 02</span>
                <h4 className="text-sm font-bold text-white">Blade &amp; Cell Calibration</h4>
                <p className="text-xs text-neutral-400 leading-relaxed">Titanium cutting blocks and GaN power nodes covered against thermal or motor degradation.</p>
              </div>

              <div className="p-5 rounded-2xl bg-black/60 border border-white/5 space-y-2">
                <span className="font-mono text-[10px] text-[#FF4D00] font-bold uppercase">GUARANTEE 03</span>
                <h4 className="text-sm font-bold text-white">30-Day Zero-Risk Trial</h4>
                <p className="text-xs text-neutral-400 leading-relaxed">Full reimbursement with no hidden restocking fees if not completely satisfied with your routine.</p>
              </div>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};

export default UserProfilePage;
