import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FiSearch, FiShoppingCart, FiUser } from 'react-icons/fi';
import { useCartStore } from '../../context/useCartStore';

export const Navbar: React.FC = () => {
  const [query, setQuery] = useState('');
  const navigate = useNavigate();

  let cartCount = 0;
  try {
    const cart = useCartStore();
    cartCount = cart.items ? cart.items.reduce((sum: number, item: any) => sum + (item.quantity || 1), 0) : 0;
  } catch {
    cartCount = 0;
  }

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      navigate(`/category/${encodeURIComponent(query.trim())}`);
    }
  };

  return (
    <header className="sticky top-0 z-50 bg-[#090B0E]/90 backdrop-blur-xl border-b border-white/[0.08] text-white">
      {/* Micro Status Bar */}
      <div className="hidden md:flex items-center justify-between px-6 py-1 border-b border-white/[0.04] text-[10px] font-mono tracking-wider text-neutral-400">
        <div className="flex items-center gap-4">
          <span className="flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
            SYS_ONLINE: 2026 PRODUCTION BATCH
          </span>
          <span>// SPEC: GaN-III &amp; TITANIUM COATED</span>
        </div>
        <div className="flex items-center gap-4">
          <span className="text-[#FF4D00]">DISPATCH GUARANTEE: &lt;24H</span>
          <span>GLOBAL EU/UK STANDARDS</span>
        </div>
      </div>

      {/* Main Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-6">
        
        {/* Brand */}
        <Link to="/" className="flex items-center gap-3 shrink-0 group">
          <div className="w-8 h-8 rounded bg-gradient-to-br from-[#FF4D00] to-[#E03E00] flex items-center justify-center font-mono font-bold text-white text-sm tracking-tighter shadow-[0_0_15px_rgba(255,77,0,0.4)]">
            OJ
          </div>
          <div className="flex flex-col">
            <span className="text-base font-extrabold tracking-tight font-sans text-neutral-100 flex items-center">
              OJASNEST
              <span className="inline-block w-1.5 h-1.5 rounded-full bg-[#FF4D00] ml-1"></span>
            </span>
            <span className="text-[9px] font-mono text-neutral-400 tracking-widest uppercase -mt-0.5"></span>
          </div>
        </Link>

        {/* Primary Navigation */}
        <nav className="hidden md:flex items-center gap-1 font-mono text-xs text-neutral-300">
          <Link to="/category/grooming" className="px-3 py-1.5 rounded-md hover:text-white hover:bg-white/[0.04] transition-all">
          TRIMMERS
          </Link>
          <Link to="/category/chargers" className="px-3 py-1.5 rounded-md hover:text-white hover:bg-white/[0.04] transition-all">
          GaN POWER
          </Link>
          <Link to="/category/audio" className="px-3 py-1.5 rounded-md hover:text-white hover:bg-white/[0.04] transition-all">
          ACOUSTICS
          </Link>
          <Link to="/offers" className="px-3 py-1.5 rounded-md text-[#FF4D00] hover:bg-[#FF4D00]/10 transition-all">
          SPECIAL DROPS
          </Link>
        </nav>

        {/* Search Bar */}
        <div className="flex-1 max-w-sm hidden sm:block">
          <form onSubmit={handleSearchSubmit} className="relative">
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search hardware specs (e.g. 140W, Titanium)..."
              className="w-full bg-[#12151B] text-neutral-200 text-xs font-mono placeholder:text-neutral-500 pl-9 pr-12 py-2 rounded-lg border border-white/10 focus:border-[#FF4D00] focus:ring-1 focus:ring-[#FF4D00] outline-none transition-all"
            />
            <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-500 text-sm" />
            <span className="absolute right-2.5 top-1/2 -translate-y-1/2 text-[10px] font-mono text-neutral-500 bg-white/[0.06] px-1.5 py-0.5 rounded border border-white/5">
              ⌘K
            </span>
          </form>
        </div>

        {/* Action Tray */}
        <div className="flex items-center gap-3">
          <Link
            to="/account"
            className="p-2 rounded-lg border border-white/[0.08] bg-[#12151B] text-neutral-300 hover:text-white hover:border-neutral-500 transition-colors"
            title="Account Portal"
          >
            <FiUser className="text-base" />
          </Link>

          <Link
            to="/cart"
            className="flex items-center gap-2 px-3 py-2 rounded-lg border border-[#FF4D00]/30 bg-[#FF4D00]/10 hover:bg-[#FF4D00]/20 text-[#FF4D00] transition-colors font-mono text-xs"
          >
            <FiShoppingCart className="text-sm" />
            <span className="font-bold">CART [{cartCount}]</span>
          </Link>
        </div>

      </div>
    </header>
  );
};

export default Navbar;