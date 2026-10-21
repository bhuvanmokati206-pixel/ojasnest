import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FiSearch, FiShoppingCart, FiUser, FiX } from 'react-icons/fi';
import { useCartStore } from '../../context/useCartStore';

export const Navbar: React.FC<{ onOpenCart: () => void }> = ({ onOpenCart }) => {
  const [query, setQuery] = useState('');
  const [searchOpen, setSearchOpen] = useState(false);
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
      setSearchOpen(false);
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
      <div className="max-w-7xl mx-auto px-4 lg:px-8 h-16 flex items-center justify-between gap-2 lg:gap-6">
        
        {/* Brand */}
        <Link to="/" className="flex items-center gap-3 shrink-0 group transition-all duration-300">
          <div className="w-8 h-8 rounded bg-gradient-to-br from-[#FF4D00] to-[#E03E00] flex items-center justify-center font-mono font-bold text-white text-sm tracking-tighter shadow-[0_0_15px_rgba(255,77,0,0.4)] group-hover:shadow-[0_0_25px_rgba(255,77,0,0.8)] group-hover:scale-110 transition-all duration-300">
            OJ
          </div>
          <div className="flex flex-col">
            <span className="text-base font-extrabold tracking-tight font-sans text-neutral-100 group-hover:text-[#FF4D00] transition-colors duration-300 flex items-center">
              OJASNEST
              <span className="inline-block w-1.5 h-1.5 rounded-full bg-[#FF4D00] ml-1 group-hover:shadow-[0_0_8px_#FF4D00] transition-all"></span>
            </span>
          </div>
        </Link>

        {/* Primary Navigation */}
        <nav className="hidden md:flex items-center gap-0 font-mono text-xs lg:text-sm text-neutral-300">
          {[
            { label: 'TRIMMERS', path: '/category/grooming' },
            { label: 'GaN-POWER BANK', path: '/category/chargers' },
            { label: 'WIRELESS CHARGERS', path: '/category/wireless-chargers' },
            { label: 'OTHERS', path: '/category/accessories' },
            { label: 'BEST SELLERS', path: '/best-sellers', isDrop: true },
          ].map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={`relative px-1.5 lg:px-3.5 py-2 rounded-md transition-all duration-300 group flex items-center ${
                item.isDrop
                  ? 'text-[#FF4D00] hover:bg-[#FF4D00]/15 hover:shadow-[0_0_15px_rgba(255,77,0,0.25)] border border-[#FF4D00]/20'
                  : 'hover:text-[#FF4D00] hover:bg-[#FF4D00]/10 border border-transparent hover:border-[#FF4D00]/30 hover:shadow-[0_0_15px_rgba(255,77,0,0.15)]'
              }`}
            >
                <span className="relative z-10 whitespace-nowrap transition-transform duration-300 group-hover:scale-105">
                {item.label}
              </span>
              {/* Animated glowing orange underline on hover */}
              <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-[2px] bg-[#FF4D00] group-hover:w-4/5 transition-all duration-300 rounded-full shadow-[0_0_8px_#FF4D00]" />
            </Link>
          ))}
        </nav>

        {/* Action Tray */}
        <div className="flex items-center gap-1.5 lg:gap-3">
          <div className="relative shrink-0">
            <button
              type="button"
              onClick={() => setSearchOpen((open) => !open)}
              aria-label={searchOpen ? 'Close search' : 'Open search'}
              aria-expanded={searchOpen}
              aria-controls="navbar-search"
              className="p-2.5 rounded-lg border border-white/[0.08] bg-[#12151B] text-neutral-300 hover:text-[#FF4D00] hover:border-[#FF4D00]/50 hover:bg-[#FF4D00]/10 transition-all duration-300"
            >
              {searchOpen ? <FiX className="text-base" /> : <FiSearch className="text-base" />}
            </button>

            {searchOpen && (
              <div id="navbar-search" className="absolute right-0 top-full mt-2 w-72 max-w-[calc(100vw-2rem)] rounded-lg border border-white/10 bg-[#090B0E] p-2 shadow-xl sm:w-80">
                <form onSubmit={handleSearchSubmit} className="relative group">
                  <input
                    type="text"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    placeholder="Search products..."
                    autoFocus
                    className="w-full bg-[#12151B] text-neutral-200 text-xs font-mono placeholder:text-neutral-500 pl-9 pr-10 py-2.5 rounded-md border border-white/10 focus:border-[#FF4D00] focus:ring-1 focus:ring-[#FF4D00] outline-none transition-all duration-300"
                  />
                  <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-500 group-focus-within:text-[#FF4D00] transition-colors duration-300 text-sm" />
                  <button
                    type="submit"
                    aria-label="Submit search"
                    className="absolute right-2 top-1/2 -translate-y-1/2 p-1 text-neutral-400 hover:text-[#FF4D00]"
                  >
                    <FiSearch className="text-sm" />
                  </button>
                </form>
              </div>
            )}
          </div>

          <Link
            to="/account"
            className="p-2.5 rounded-lg border border-white/[0.08] bg-[#12151B] text-neutral-300 hover:text-[#FF4D00] hover:border-[#FF4D00]/50 hover:bg-[#FF4D00]/10 hover:shadow-[0_0_18px_rgba(255,77,0,0.25)] hover:scale-105 active:scale-95 transition-all duration-300"
            title="Account Portal"
          >
            <FiUser className="text-base transition-transform duration-300" />
          </Link>

          <button
            type="button"
            onClick={onOpenCart}
            aria-label={`Open cart with ${cartCount} items`}
            className="flex items-center gap-2 px-3.5 py-2 rounded-lg border border-[#FF4D00]/40 bg-[#FF4D00]/10 hover:bg-[#FF4D00]/25 hover:border-[#FF4D00] text-[#FF4D00] shadow-[0_0_12px_rgba(255,77,0,0.15)] hover:shadow-[0_0_22px_rgba(255,77,0,0.4)] hover:scale-105 active:scale-95 transition-all duration-300 font-mono text-xs group"
          >
            <FiShoppingCart className="text-sm transition-transform duration-300 group-hover:-rotate-6" />
            <span className="font-bold">CART [{cartCount}]</span>
          </button>
        </div>

      </div>
    </header>
  );
};

export default Navbar;