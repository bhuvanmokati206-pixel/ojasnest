import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  FiClock, 
  FiShield, 
  FiPercent, 
  FiZap, 
  FiTag, 
  FiBox,
  FiArrowUpRight} from 'react-icons/fi';
import { ProductCard } from '../components/shop/ProductCard';
import { Product } from '../types';
import client from '../api/client';

export const OffersPage: React.FC = () => {
  const [dealProducts, setDealProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDeals = async () => {
      try {
        const res = await client.get('/products?sale=true&limit=12');
        setDealProducts(res.data.products || res.data || []);
      } catch (err) {
        console.warn('Deals catalog will populate once products are added in admin');
      } finally {
        setLoading(false);
      }
    };
    fetchDeals();
  }, []);

  return (
    <div className="min-h-screen bg-[#090B0E] text-neutral-200 selection:bg-[#FF4D00] selection:text-white pb-24 font-sans">
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
        
        {/* 1. HERO ROUNDED BANNER (Same structure, Precision Industrial theme) */}
        <div className="relative w-full rounded-3xl bg-gradient-to-br from-[#1A1F2B] via-[#12161F] to-[#0A0D12] border border-white/10 p-8 sm:p-12 lg:p-14 overflow-hidden shadow-2xl">
          
          {/* Subtle schematic background grid */}
          <div 
            className="absolute inset-0 opacity-[0.04] pointer-events-none"
            style={{
              backgroundImage: 'linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)',
              backgroundSize: '32px 32px'
            }}
          />

          {/* Precision orange gradient glow in top corner */}
          <div className="pointer-events-none absolute -top-24 -right-24 w-[450px] h-[450px] bg-[#FF4D00]/15 blur-[120px] rounded-full" />

          <div className="relative z-10 max-w-3xl">
            {/* Pill badge */}
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/[0.06] border border-white/10 backdrop-blur-md mb-6">
              
              <span className="font-mono text-[11px] font-bold tracking-widest text-[#FF4D00] uppercase">
                LIMITED HARDWARE CLEARANCE
              </span>
            </div>

            {/* Main Title */}
            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold text-white tracking-tight uppercase leading-none font-sans">
              OJASNEST HOT DEALS <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-neutral-200 to-[#FF4D00]">
                &amp; SPECIAL OFFERS
              </span>
            </h1>

            {/* Description */}
            <p className="mt-5 text-sm sm:text-base text-neutral-400 leading-relaxed font-sans max-w-xl">
              Discounts on precision titanium hardware, multi-port GaN fast chargers, and smart electronic accessories.
            </p>

            {/* Meta Tags */}
            <div className="mt-8 flex flex-wrap items-center gap-3">
              <span className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-white/[0.05] border border-white/10 font-mono text-xs text-neutral-300 backdrop-blur-sm">
                <FiClock className="text-[#FF4D00]" />
                <span>Updated Daily</span>
              </span>
              <span className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-white/[0.05] border border-white/10 font-mono text-xs text-neutral-300 backdrop-blur-sm">
                <FiShield className="text-emerald-400" />
                <span>Full 2-Year Warranty Included</span>
              </span>
            </div>
          </div>
        </div>

        {/* 2. THREE CARDS ROW (Exact same 3-card structure, Industrial card styling) */}
        <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-5">
          
          {/* Card 1 */}
          <div className="p-6 rounded-2xl bg-[#12151D] border border-white/[0.08] hover:border-[#FF4D00]/40 transition-all flex items-center gap-4 group">
            <div className="w-12 h-12 rounded-xl bg-[#FF4D00]/10 border border-[#FF4D00]/20 flex items-center justify-center text-[#FF4D00] shrink-0 text-xl group-hover:scale-105 transition-transform">
              <FiPercent />
            </div>
            <div>
              <h4 className="text-sm font-bold text-white uppercase tracking-wide">DIRECT DISCOUNTS</h4>
              <p className="text-xs text-neutral-400 mt-0.5">Savings applied directly at checkout</p>
            </div>
          </div>

          {/* Card 2 */}
          <div className="p-6 rounded-2xl bg-[#12151D] border border-white/[0.08] hover:border-sky-500/40 transition-all flex items-center gap-4 group">
            <div className="w-12 h-12 rounded-xl bg-sky-500/10 border border-sky-500/20 flex items-center justify-center text-sky-400 shrink-0 text-xl group-hover:scale-105 transition-transform">
              <FiZap />
            </div>
            <div>
              <h4 className="text-sm font-bold text-white uppercase tracking-wide">GAN POWER BUNDLES</h4>
              <p className="text-xs text-neutral-400 mt-0.5">Extra cables included in multi-port kits</p>
            </div>
          </div>

          {/* Card 3 */}
          <div className="p-6 rounded-2xl bg-[#12151D] border border-white/[0.08] hover:border-emerald-500/40 transition-all flex items-center gap-4 group">
            <div className="w-12 h-12 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400 shrink-0 text-xl group-hover:scale-105 transition-transform">
              <FiTag />
            </div>
            <div>
              <h4 className="text-sm font-bold text-white uppercase tracking-wide">PRICE MATCH PROMISE</h4>
              <p className="text-xs text-neutral-400 mt-0.5">Verified official distributor rates</p>
            </div>
          </div>

        </div>

        {/* 3. ACTIVE DEALS & STOCK DROPS REGISTRY */}
        <div className="mt-14">
          
          <div className="flex items-center justify-between pb-4 border-b border-white/[0.08] mb-8">
            <h2 className="text-xl sm:text-2xl font-extrabold text-white tracking-tight uppercase">
              ACTIVE DEALS &amp; STOCK DROPS
            </h2>
            <span className="font-mono text-xs text-neutral-500">
              {dealProducts.length} Products
            </span>
          </div>

          {loading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {[...Array(4)].map((_, i) => (
                <div key={i} className="h-80 rounded-2xl bg-[#12151D] border border-white/[0.06] animate-pulse" />
              ))}
            </div>
          ) : dealProducts.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {dealProducts.map((prod) => (
                <ProductCard key={prod.id} product={prod} />
              ))}
            </div>
          ) : (
            /* Clean Precision Industrial Empty State */
            <div className="py-20 rounded-2xl border border-dashed border-white/10 bg-[#12151D]/40 text-center flex flex-col items-center justify-center px-4">
              <div className="w-12 h-12 rounded-xl bg-white/[0.04] border border-white/10 flex items-center justify-center text-neutral-400 mb-3">
                <FiBox className="text-xl" />
              </div>
              <h3 className="text-base font-bold text-white tracking-wide">
                No active promotions right now
              </h3>
              <p className="text-xs text-neutral-500 mt-1 max-w-sm">
                Check back later for newly announced clearance items or browse our standard hardware lineup.
              </p>
              <Link
                to="/products"
                className="mt-6 inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-[#FF4D00] hover:bg-[#E03E00] text-white font-mono text-xs uppercase font-bold transition-all shadow-[0_0_15px_rgba(255,77,0,0.3)]"
              >
                <span>Browse Products</span>
                <FiArrowUpRight />
              </Link>
            </div>
          )}

        </div>

      </div>
    </div>
  );
};

export default OffersPage;