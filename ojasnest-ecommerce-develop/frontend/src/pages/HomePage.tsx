import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  FiZap, 
  FiShield, 
  FiRepeat, 
  FiCpu, 
  FiArrowUpRight, 
  FiTerminal,
  FiStar
} from 'react-icons/fi';
import { HeroBanner } from '../components/shop/HeroBanner';
import { ProductCard } from '../components/shop/ProductCard';
import { DealsSection } from '../components/shop/DealsSection';
import { Product } from '../types';
import client from '../api/client';

export const HomePage: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCatalog = async () => {
      try {
        const res = await client.get('/products?limit=8');
        setProducts(res.data.products || res.data || []);
      } catch (err) {
        console.warn('Backend unavailable, rendering hardware showcase cards');
      } finally {
        setLoading(false);
      }
    };
    fetchCatalog();
  }, []);

  const bestSellers = products.filter((product) => product.featured).slice(0, 8);

  return (
    <div className="min-h-screen bg-[#090B0E] text-neutral-200 selection:bg-[#FF4D00] selection:text-white">

      {/* 1. Hero */}
      <HeroBanner />

      {/* 2. Product information */}
      <section className="border-y border-white/[0.08] bg-[#0E1116] py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-7 max-w-2xl">
            <span className="font-mono text-[11px] text-[#FF4D00] tracking-wider uppercase flex items-center gap-1.5">
              <FiTerminal className="text-sm" /> PRODUCT INFORMATION
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white mt-2">Details that earn their place</h2>
            <p className="mt-2 text-sm leading-relaxed text-neutral-400">Purpose-built grooming and charging hardware, supported by clear standards and straightforward service.</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              { icon: FiZap, code: 'SPEC: GAN-III', title: 'GaN Thermal Efficiency', desc: 'Active dissipation across 140W PD nodes' },
              { icon: FiCpu, code: 'BLADE: 0.1MM', title: 'Self-Honing Titanium', desc: 'Micro-ground blades rated for 500+ hours' },
              { icon: FiShield, code: 'WARRANTY: 2YR', title: 'Direct Replacement', desc: 'Advance cross-shipment on defective units' },
              { icon: FiRepeat, code: 'TRIAL: 30D', title: 'Zero-Risk Return', desc: 'Direct refund with prepaid label provided' },
            ].map((item) => {
              const Icon = item.icon;
              return (
                <div key={item.code} className="p-4 border border-white/[0.07] bg-[#12151D] flex flex-col">
                  <div className="flex items-center justify-between mb-3">
                    <div className="w-8 h-8 rounded bg-[#FF4D00]/10 border border-[#FF4D00]/20 flex items-center justify-center text-[#FF4D00]">
                      <Icon className="text-base" />
                    </div>
                    <span className="font-mono text-[9px] text-neutral-400">{item.code}</span>
                  </div>
                  <h3 className="text-sm font-bold text-white">{item.title}</h3>
                  <p className="text-xs text-neutral-400 mt-1 leading-relaxed">{item.desc}</p>
                </div>
              );
            })}
          </div>

          <div className="mt-10 flex items-end justify-between gap-4 border-b border-white/[0.08] pb-3">
            <div>
              <span className="font-mono text-[10px] text-neutral-500 tracking-wider uppercase">COLLECTIONS</span>
              <h3 className="text-xl font-bold text-white mt-1">Choose your setup</h3>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
            <Link to="/category/grooming" className="group min-h-48 border border-white/[0.08] bg-[#12151D] p-6 flex flex-col justify-between hover:border-[#FF4D00]/50 transition-colors">
              <div>
                <span className="font-mono text-[10px] text-[#FF4D00] tracking-widest uppercase">LAB LINE // 01</span>
                <h3 className="text-xl font-bold text-white mt-2 group-hover:text-[#FF4D00] transition-colors">Titanium Trimmer System</h3>
                <p className="text-sm text-neutral-400 mt-2 max-w-lg">Dual ceramic-coated cutters, USB-C rapid charging, and waterproof housing for a dependable daily routine.</p>
              </div>
              <span className="mt-5 flex items-center gap-1 font-mono text-[11px] text-neutral-300">EXPLORE GROOMING <FiArrowUpRight /></span>
            </Link>
            <Link to="/category/chargers" className="group min-h-48 border border-white/[0.08] bg-[#12151D] p-6 flex flex-col justify-between hover:border-[#FF4D00]/50 transition-colors">
              <div>
                <span className="font-mono text-[10px] text-[#FF4D00] tracking-widest uppercase">LAB LINE // 02</span>
                <h3 className="text-xl font-bold text-white mt-2 group-hover:text-[#FF4D00] transition-colors">GaN Multi-port Chargers</h3>
                <p className="text-sm text-neutral-400 mt-2 max-w-lg">Compact Gallium Nitride charging with multi-device power delivery and active thermal protection.</p>
              </div>
              <span className="mt-5 flex items-center gap-1 font-mono text-[11px] text-neutral-300">EXPLORE POWER <FiArrowUpRight /></span>
            </Link>
          </div>
        </div>
      </section>

      {/* 3. Best sellers */}
      <section id="products" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-7 border-b border-white/[0.08] pb-4">
          <div>
            <span className="font-mono text-[11px] text-[#FF4D00] tracking-wider uppercase">CUSTOMER FAVORITES</span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white mt-1">Best sellers</h2>
            <p className="text-sm text-neutral-400 mt-1">A considered shortlist of Ojasnest essentials.</p>
          </div>
          <Link to="/category/grooming" className="font-mono text-xs text-neutral-400 hover:text-white flex items-center gap-1">
            EXPLORE THE COLLECTION <FiArrowUpRight />
          </Link>
        </div>

        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {Array.from({ length: 4 }, (_, index) => (
              <div key={index} className="h-72 bg-[#12151D] border border-white/[0.06] animate-pulse" />
            ))}
          </div>
        ) : bestSellers.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {bestSellers.map((product) => <ProductCard key={product.id} product={product} />)}
          </div>
        ) : (
          <div className="flex items-center gap-4 border border-white/[0.08] bg-[#12151D] px-5 py-6">
            <FiStar className="shrink-0 text-xl text-[#FF4D00]" />
            <div>
              <h3 className="text-sm font-bold text-white">Best sellers are being curated</h3>
              <p className="mt-1 text-xs text-neutral-400">Featured products selected by the team will appear here.</p>
            </div>
          </div>
        )}
      </section>

      {/* 4. Deals */}
      <DealsSection />

      {/* 5. Reviews */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.2fr] gap-8 lg:gap-16 items-center">
          <div>
            <span className="font-mono text-[11px] text-[#FF4D00] tracking-wider uppercase">CUSTOMER REVIEWS</span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white mt-2">Made better by real routines.</h2>
            <p className="mt-3 max-w-xl text-sm leading-relaxed text-neutral-400">We’re preparing a verified review collection. When customers share their experience, their feedback will live here.</p>
          </div>
          <div className="border-y border-white/[0.1] py-7 flex items-center gap-5">
            <div className="flex h-12 w-12 shrink-0 items-center justify-center border border-[#FF4D00]/30 bg-[#FF4D00]/10 text-[#FF4D00]">
              <FiStar className="text-xl" />
            </div>
            <div>
              <p className="text-sm font-semibold text-white">Verified customer reviews</p>
              <p className="mt-1 text-xs text-neutral-500">Reviews will appear here as they become available.</p>
            </div>
          </div>
        </div>
      </section>

      {/* 6. Grooming guide */}
      <section className="border-t border-white/[0.08] bg-[#0E1116] py-14">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">
          <div>
            <span className="font-mono text-[11px] text-[#FF4D00] tracking-wider uppercase">THE GROOMING GUIDE</span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white mt-2">A sharper routine, made simple.</h2>
            <p className="mt-3 text-sm leading-relaxed text-neutral-400">A few considered steps help you get a clean, comfortable finish from your trimmer.</p>

            <ol className="mt-7 divide-y divide-white/[0.08]">
              <li className="flex gap-4 py-4">
                <span className="font-mono text-xs text-[#FF4D00]">01</span>
                <div><h3 className="text-sm font-semibold text-white">Start with a clean, dry trim</h3><p className="mt-1 text-xs leading-relaxed text-neutral-400">Comb through first and choose a guard that leaves room to refine.</p></div>
              </li>
              <li className="flex gap-4 py-4">
                <span className="font-mono text-xs text-[#FF4D00]">02</span>
                <div><h3 className="text-sm font-semibold text-white">Work with the shape</h3><p className="mt-1 text-xs leading-relaxed text-neutral-400">Move slowly in short passes, checking both sides as you go.</p></div>
              </li>
              <li className="flex gap-4 py-4">
                <span className="font-mono text-xs text-[#FF4D00]">03</span>
                <div><h3 className="text-sm font-semibold text-white">Rinse and reset</h3><p className="mt-1 text-xs leading-relaxed text-neutral-400">Clean the blades after use and store the tool ready for next time.</p></div>
              </li>
            </ol>

            <Link to="/category/grooming" className="mt-3 inline-flex items-center gap-2 text-sm font-semibold text-[#FF4D00] hover:text-orange-300">
              Shop grooming tools <FiArrowUpRight />
            </Link>
          </div>
          <div className="min-h-[280px] lg:min-h-[430px] overflow-hidden bg-[#12151D]">
            <img src="/hero-grooming.jpg" alt="Ojasnest grooming tools" className="h-full min-h-[280px] lg:min-h-[430px] w-full object-cover" />
          </div>
        </div>
      </section>

    </div>
  );
};

export default HomePage;