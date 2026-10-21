import React from 'react';
import { Link } from 'react-router-dom';
import { FiArrowUpRight, FiStar } from 'react-icons/fi';
import { ProductCard } from '../components/shop/ProductCard';
import { demoTrimmer } from '../data/demoTrimmer';

export const BestSellersPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-[#090B0E] text-neutral-200 selection:bg-[#FF4D00] selection:text-white pb-24">
      <div className="mx-auto max-w-7xl px-4 pt-8 sm:px-6 lg:px-8">
        <section className="relative overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-br from-[#1A1F2B] via-[#12161F] to-[#0A0D12] p-8 shadow-2xl sm:p-12 lg:p-14">
          <div
            className="pointer-events-none absolute inset-0 opacity-[0.04]"
            style={{
              backgroundImage: 'linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)',
              backgroundSize: '32px 32px',
            }}
          />
          <div className="pointer-events-none absolute -right-24 -top-24 h-[450px] w-[450px] rounded-full bg-[#FF4D00]/15 blur-[120px]" />

          <div className="relative z-10 max-w-3xl">
            <span className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.06] px-3 py-1.5 font-mono text-[11px] font-bold uppercase tracking-widest text-[#FF4D00]">
              <FiStar />
              CUSTOMER FAVORITES
            </span>
            <h1 className="text-4xl font-extrabold uppercase leading-none tracking-tight text-white sm:text-5xl lg:text-6xl">
              OJASNEST
              <br />
              <span className="bg-gradient-to-r from-white via-neutral-200 to-[#FF4D00] bg-clip-text text-transparent">
                BEST SELLERS
              </span>
            </h1>
            <p className="mt-5 max-w-xl text-sm leading-relaxed text-neutral-400 sm:text-base">
              A focused selection of Ojasnest favorites. Start with our precision trimmer, made for a comfortable, dependable grooming routine.
            </p>
            <Link
              to="/category/grooming"
              className="mt-7 inline-flex items-center gap-2 rounded-lg border border-[#FF4D00]/30 bg-[#FF4D00]/10 px-4 py-2.5 font-mono text-xs font-semibold uppercase tracking-wide text-[#FF4D00] transition hover:border-[#FF4D00] hover:bg-[#FF4D00]/20"
            >
              Explore trimmers <FiArrowUpRight />
            </Link>
          </div>
        </section>

        <section className="mt-12">
          <div className="mb-7 flex items-end justify-between gap-4 border-b border-white/[0.08] pb-4">
            <div>
              <span className="font-mono text-[11px] uppercase tracking-wider text-[#FF4D00]">THE CUSTOMER FAVORITE</span>
              <h2 className="mt-1 text-2xl font-extrabold tracking-tight text-white sm:text-3xl">Best sellers</h2>
            </div>
            <span className="shrink-0 font-mono text-xs text-neutral-500">01 PRODUCT</span>
          </div>

          <div className="mx-auto max-w-sm">
            <ProductCard product={demoTrimmer} />
          </div>
        </section>
      </div>
    </div>
  );
};

export default BestSellersPage;
