import React, { useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { 
  FiZap, 
  FiShield, 
  FiRepeat, 
  FiCpu, 
  FiArrowUpRight, 
  FiCheck,
  FiTerminal
} from 'react-icons/fi';
import { HeroBanner } from '../components/shop/HeroBanner';
import { ProductCard } from '../components/shop/ProductCard';
import { Product } from '../types';
import client from '../api/client';

export const HomePage: React.FC = () => {
  const navigate = useNavigate();
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

  return (
    <div className="min-h-screen bg-[#090B0E] text-neutral-200 selection:bg-[#FF4D00] selection:text-white">
      
      {/* 1. Industrial Hero Showcase */}
      <HeroBanner />

      {/* 2. Technical Assurance Matrix */}
      <section className="border-b border-white/[0.08] bg-[#0E1116] py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-2 md:grid-cols-4 gap-6">
          {[
            { icon: FiZap, code: 'SPEC: GAN-III', title: 'GaN Thermal Efficiency', desc: 'Active dissipation across 140W PD nodes' },
            { icon: FiCpu, code: 'BLADE: 0.1MM', title: 'Self-Honing Titanium', desc: 'Micro-ground blades rated for 500+ hours' },
            { icon: FiShield, code: 'WARRANTY: 2YR', title: 'Direct Replacement', desc: 'Advance cross-shipment on defective units' },
            { icon: FiRepeat, code: 'TRIAL: 30D', title: 'Zero-Risk Return', desc: 'Direct refund with prepaid label provided' },
          ].map((item, idx) => {
            const Icon = item.icon;
            return (
              <div key={idx} className="p-4 rounded-xl border border-white/[0.05] bg-[#12151D] flex flex-col">
                <div className="flex items-center justify-between mb-3">
                  <div className="w-8 h-8 rounded bg-[#FF4D00]/10 border border-[#FF4D00]/20 flex items-center justify-center text-[#FF4D00]">
                    <Icon className="text-base" />
                  </div>
                  <span className="font-mono text-[9px] text-neutral-400">{item.code}</span>
                </div>
                <h4 className="text-sm font-bold text-white font-sans">{item.title}</h4>
                <p className="text-xs text-neutral-400 mt-1 leading-relaxed font-sans">{item.desc}</p>
              </div>
            );
          })}
        </div>
      </section>

      {/* 3. Engineering Bento Showcase */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="flex items-center justify-between mb-8">
          <div>
            <span className="font-mono text-xs text-[#FF4D00] tracking-wider uppercase flex items-center gap-1.5">
              <FiTerminal className="text-sm" /> ARCHITECTURE BENCH
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white mt-1">
              Precision Collections
            </h2>
          </div>
          <Link to="/products" className="font-mono text-xs text-neutral-400 hover:text-white flex items-center gap-1">
            VIEW ALL HARDWARE <FiArrowUpRight />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Card 1: Grooming */}
          <div 
            onClick={() => navigate('/category/grooming')}
            className="group cursor-pointer rounded-2xl bg-[#12151D] border border-white/[0.08] hover:border-[#FF4D00]/50 p-8 transition-all relative overflow-hidden flex flex-col justify-between h-96"
          >
            <div className="relative z-10">
              <span className="font-mono text-[10px] text-[#FF4D00] tracking-widest uppercase">LAB LINE // 01</span>
              <h3 className="text-2xl font-bold text-white mt-1 group-hover:text-[#FF4D00] transition-colors">
                Titanium Trimmer System
              </h3>
              <p className="text-xs text-neutral-400 mt-2 max-w-sm">
                Dual ceramic-coated cutters, 120-min Li-ion rapid recharge via USB-C, IPX8 waterproof housing.
              </p>
            </div>

            <div className="relative z-10 flex items-center justify-between border-t border-white/[0.06] pt-4 font-mono text-xs">
              <span className="text-neutral-400">8,200 RPM MICRO-DRIVE</span>
              <span className="text-[#FF4D00] flex items-center gap-1">EXPLORE SPEC <FiArrowUpRight /></span>
            </div>
          </div>

          {/* Card 2: GaN Power */}
          <div 
            onClick={() => navigate('/category/chargers')}
            className="group cursor-pointer rounded-2xl bg-[#12151D] border border-white/[0.08] hover:border-[#FF4D00]/50 p-8 transition-all relative overflow-hidden flex flex-col justify-between h-96"
          >
            <div className="relative z-10">
              <span className="font-mono text-[10px] text-[#FF4D00] tracking-widest uppercase">LAB LINE // 02</span>
              <h3 className="text-2xl font-bold text-white mt-1 group-hover:text-[#FF4D00] transition-colors">
                GaN Multi-port Chargers
              </h3>
              <p className="text-xs text-neutral-400 mt-2 max-w-sm">
                Advanced Gallium Nitride topology. Powers 3 devices simultaneously at peak PD 3.1 speeds with dynamic voltage allocation.
              </p>
            </div>

            <div className="relative z-10 flex items-center justify-between border-t border-white/[0.06] pt-4 font-mono text-xs">
              <span className="text-neutral-400">140W MAXIMUM LOAD</span>
              <span className="text-[#FF4D00] flex items-center gap-1">EXPLORE SPEC <FiArrowUpRight /></span>
            </div>
          </div>
        </div>
      </section>

      {/* 4. Live Product Registry */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
        <div className="flex items-center justify-between mb-8 border-b border-white/[0.08] pb-4">
          <div>
            <h3 className="text-xl font-bold text-white">Production Units Ready for Dispatch</h3>
            <p className="text-xs text-neutral-400 font-mono mt-1">QC Tested • Packaged with braided cables</p>
          </div>
        </div>

        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="h-72 rounded-xl bg-[#12151D] border border-white/[0.06] animate-pulse" />
            ))}
          </div>
        ) : products.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {products.map((prod) => (
              <ProductCard key={prod.id} product={prod} />
            ))}
          </div>
        ) : (
          <div className="py-12 px-6 rounded-xl border border-white/[0.06] bg-[#12151D] text-center font-mono text-xs text-neutral-400">
            [DATABASE READY: NO HARDWARE UNITS POPULATED YET IN THIS VIEW]
          </div>
        )}
      </section>

    </div>
  );
};

export default HomePage;