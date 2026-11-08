import React, { useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  FiArrowUpRight,
  FiShoppingBag,
  FiZap,
  FiClock,
  FiTrendingUp,
  FiStar,
  FiCheck,
} from 'react-icons/fi';
import { useCartStore } from '../../context/useCartStore';
import {
  dealsData,
  DealProduct,
  calculateTimeLeft,
  formatTime,
  TimeLeft,
} from '../../data/dealsData';

// ─── Category Filter Config ───────────────────────────────────────────────────
type CategoryFilter = 'all' | 'flash' | 'trimmers' | 'gan-power' | 'wireless' | 'bundles';

const CATEGORY_PILLS: { id: CategoryFilter; label: string; icon?: string }[] = [
  { id: 'all', label: 'All Deals' },
  { id: 'flash', label: '⚡ Flash Deals' },
  { id: 'trimmers', label: 'Trimmers' },
  { id: 'gan-power', label: 'GaN Power' },
  { id: 'wireless', label: 'Wireless' },
  { id: 'bundles', label: 'Bundles' },
];

// ─── Mini CountdownTimer ──────────────────────────────────────────────────────
const CountdownTimer: React.FC<{ endsInHours: number; startedAt: number }> = ({
  endsInHours,
  startedAt,
}) => {
  const [time, setTime] = useState<TimeLeft>(calculateTimeLeft(endsInHours, startedAt));

  useEffect(() => {
    const id = setInterval(
      () => setTime(calculateTimeLeft(endsInHours, startedAt)),
      1000
    );
    return () => clearInterval(id);
  }, [endsInHours, startedAt]);

  return (
    <span className="inline-flex items-center gap-0.5 font-mono text-[10px] text-[#FF4D00] tracking-wider">
      <FiClock className="text-[9px]" />
      &nbsp;{formatTime(time.hours)}:{formatTime(time.minutes)}:{formatTime(time.seconds)}
    </span>
  );
};

// ─── Individual Deal Card ─────────────────────────────────────────────────────
const DealCard: React.FC<{ deal: DealProduct; startedAt: number }> = ({
  deal,
  startedAt,
}) => {
  const addItem = useCartStore((s) => s.addItem);
  const navigate = useNavigate();
  const [added, setAdded] = useState(false);

  const handleAdd = (e?: React.MouseEvent) => {
    e?.stopPropagation();
    addItem({ ...deal, price: deal.dealPrice });
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  return (
    <div
      onClick={() => navigate(`/product/${deal.slug}`)}
      className="group relative cursor-pointer flex flex-col rounded-2xl bg-[#0D1017] border border-white/[0.07] hover:border-[#FF4D00]/50 hover:shadow-[0_0_30px_rgba(255,77,0,0.12)] transition-all duration-300 overflow-hidden"
    >
      {/* Ambient glow on hover */}
      <div className="pointer-events-none absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-[radial-gradient(ellipse_at_50%_0%,rgba(255,77,0,0.08),transparent_70%)]" />

      {/* 1. Zoomed Product Image Stage */}
      <div className="relative">
        <div className="relative w-full bg-[#0A0C10] h-60 overflow-hidden flex items-center justify-center border-b border-white/[0.05]">
          <img
            src={deal.images?.[0] || '/placeholder.png'}
            alt={deal.title}
            className="w-full h-full object-cover object-center scale-110 transition-transform duration-500 group-hover:scale-125"
          />

          {/* Top-left Badges (Discount + Deal type) */}
          <div className="absolute top-3 left-3 flex flex-col gap-1.5 z-10">
            <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-[#FF4D00] text-white font-mono text-[10px] font-black tracking-wide shadow-[0_0_12px_rgba(255,77,0,0.5)]">
              -{deal.discountPercentage}% OFF
            </span>
            {deal.isFlashDeal && (
              <span className="inline-flex items-center gap-0.5 px-2 py-0.5 rounded-full bg-[#FF4D00]/20 border border-[#FF4D00]/50 text-[#FF4D00] font-mono text-[9px] font-bold animate-pulse backdrop-blur-md">
                <FiZap className="text-[9px]" />
                {deal.dealBadge}
              </span>
            )}
            {!deal.isFlashDeal && (
              <span className="inline-flex items-center gap-0.5 px-2 py-0.5 rounded-full bg-black/70 border border-white/10 text-neutral-300 font-mono text-[9px] font-bold backdrop-blur-md">
                {deal.dealBadge}
              </span>
            )}
          </div>

          {/* Claimed symbol badge at corner */}
          <div
            className="absolute top-3 right-3 z-10 flex items-center gap-1 px-2.5 py-1 rounded-full bg-black/80 backdrop-blur-md border border-white/10 font-mono text-[10px] font-bold text-neutral-200 shadow-lg"
            title={`${deal.claimedPercentage}% claimed (${deal.totalStock - deal.claimedCount} left)`}
          >
            <FiTrendingUp className="text-[11px] text-[#FF4D00]" />
            <span>{deal.claimedPercentage}%</span>
          </div>

          {/* Timer bottom-right */}
          <div className="absolute bottom-3 right-3 z-10 flex items-center gap-1 px-2 py-1 rounded-md bg-black/75 backdrop-blur-md border border-white/10">
            <CountdownTimer endsInHours={deal.endsInHours} startedAt={startedAt} />
          </div>

          {/* Quick inspect link bottom-left */}
          <Link
            to={`/product/${deal.slug}`}
            className="absolute bottom-3 left-3 z-10 p-1.5 rounded-full bg-black/75 text-neutral-300 hover:text-white hover:bg-[#FF4D00] border border-white/10 opacity-0 group-hover:opacity-100 transition-all duration-200 backdrop-blur-sm"
            title="Inspect"
          >
            <FiArrowUpRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>

      {/* 2. Card body: Name then Price with Add to Cart */}
      <div className="relative z-10 flex flex-col flex-1 p-4">
        {/* Category label */}
        <span className="text-[9px] font-semibold uppercase tracking-widest text-[#FF5722]">
          {deal.category?.name}
        </span>

        {/* Product Name */}
        <Link to={`/product/${deal.slug}`} className="mt-1">
          <h3 className="text-base font-bold text-neutral-100 line-clamp-1 group-hover:text-white transition-colors">
            {deal.title}
          </h3>
        </Link>

        {/* Spec snippet */}
        <p className="mt-1 font-mono text-[9px] text-neutral-500 line-clamp-1">
          {deal.specSnippet}
        </p>

        {/* Star Rating */}
        <div className="mt-2 flex items-center gap-1.5">
          <div className="flex items-center gap-0.5">
            {Array.from({ length: 5 }).map((_, i) => (
              <FiStar
                key={i}
                className={`text-[10px] ${
                  i < Math.floor(deal.rating) ? 'text-amber-400 fill-amber-400' : 'text-neutral-600'
                }`}
              />
            ))}
          </div>
          <span className="text-[10px] font-mono text-neutral-400">
            {deal.rating} ({deal.reviewsCount})
          </span>
        </div>

        {/* 3. Price with Add to Cart button */}
        <div className="mt-auto pt-4 border-t border-white/[0.06] flex items-end justify-between gap-2">
          <div>
            <span className="block text-[10px] text-neutral-500 line-through font-mono">
              £{deal.originalPrice.toFixed(2)}
            </span>
            <span className="text-xl font-black text-white tracking-tight leading-none">
              £{deal.dealPrice.toFixed(2)}
            </span>
            <span className="block text-[9px] text-emerald-400 font-mono mt-0.5">
              Save £{(deal.originalPrice - deal.dealPrice).toFixed(2)}
            </span>
          </div>

          <button
            onClick={handleAdd}
            disabled={deal.stock <= 0}
            className={`flex items-center gap-1.5 px-4 py-2.5 rounded-full text-xs font-bold transition-all duration-200 shadow-[0_0_18px_rgba(255,77,0,0.35)] hover:shadow-[0_0_25px_rgba(255,77,0,0.55)] hover:scale-105 active:scale-95 disabled:opacity-40 disabled:cursor-not-allowed ${
              added
                ? 'bg-emerald-500 text-white hover:bg-emerald-400'
                : 'bg-[#FF4D00] text-white hover:bg-[#E03E00]'
            }`}
          >
            {added ? (
              <>
                <FiCheck className="w-3.5 h-3.5" /> Added
              </>
            ) : (
              <>
                <FiShoppingBag className="w-3.5 h-3.5" /> Add
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

// ─── DealsSection (Main Export) ───────────────────────────────────────────────
export const DealsSection: React.FC = () => {
  const [activeFilter, setActiveFilter] = useState<CategoryFilter>('all');
  const startedAtRef = useRef<number>(Date.now());
  const [sectionTimer, setSectionTimer] = useState<TimeLeft>(
    calculateTimeLeft(6, startedAtRef.current)
  );

  // Global section countdown (6-hour flash window)
  useEffect(() => {
    const id = setInterval(
      () => setSectionTimer(calculateTimeLeft(6, startedAtRef.current)),
      1000
    );
    return () => clearInterval(id);
  }, []);

  const filteredDeals =
    activeFilter === 'all'
      ? dealsData.slice(0, 4) // show 4 on homepage
      : dealsData.filter((d) => d.dealCategory === activeFilter).slice(0, 4);

  return (
    <section className="relative border-y border-white/[0.08] bg-[#090B0E] py-14 overflow-hidden">
      {/* Subtle schematic grid background */}
      <div
        className="absolute inset-0 opacity-[0.025] pointer-events-none"
        style={{
          backgroundImage:
            'linear-gradient(#FF4D00 1px, transparent 1px), linear-gradient(90deg, #FF4D00 1px, transparent 1px)',
          backgroundSize: '48px 48px',
        }}
      />

      {/* Orange ambient glow top-right */}
      <div className="pointer-events-none absolute -top-40 -right-40 w-[600px] h-[600px] bg-[#FF4D00]/[0.06] blur-[120px] rounded-full" />
      {/* Subtle bottom-left glow */}
      <div className="pointer-events-none absolute -bottom-32 -left-32 w-[400px] h-[400px] bg-[#FF4D00]/[0.04] blur-[100px] rounded-full" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* ── Section Header ── */}
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6 mb-8 border-b border-white/[0.08] pb-6">
          <div className="space-y-2">
            {/* Status badge */}
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#FF4D00]/10 border border-[#FF4D00]/30">
              <span className="w-1.5 h-1.5 rounded-full bg-[#FF4D00] animate-pulse" />
              <span className="font-mono text-[10px] font-bold tracking-widest text-[#FF4D00] uppercase">
                SYS_PROMO // ACTIVE FLASH SALE
              </span>
            </div>

            <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight leading-tight">
              Limited Hardware Deals{' '}
              <span className="text-[#FF4D00]">&amp;</span> Drops
            </h2>
            <p className="text-sm text-neutral-400 max-w-lg">
              Precision-engineered hardware at cleared prices. Flash drops refresh every 6 hours — verified stock, direct from our facility.
            </p>
          </div>

          {/* Timer + CTA */}
          <div className="flex flex-col sm:flex-row sm:items-center gap-4 shrink-0">
            {/* Countdown block */}
            <div className="flex items-center gap-3 px-4 py-3 rounded-xl bg-[#12151D] border border-white/[0.07]">
              <FiClock className="text-[#FF4D00] text-base shrink-0" />
              <div>
                <p className="font-mono text-[9px] text-neutral-500 uppercase tracking-wider mb-1">
                  Flash sale ends in
                </p>
                <div className="flex items-center gap-1 font-mono text-base font-bold text-white tabular-nums">
                  <span className="px-1.5 py-0.5 bg-[#FF4D00]/15 border border-[#FF4D00]/30 rounded text-[#FF4D00]">
                    {formatTime(sectionTimer.hours)}
                  </span>
                  <span className="text-neutral-500">:</span>
                  <span className="px-1.5 py-0.5 bg-white/[0.04] border border-white/10 rounded">
                    {formatTime(sectionTimer.minutes)}
                  </span>
                  <span className="text-neutral-500">:</span>
                  <span className="px-1.5 py-0.5 bg-white/[0.04] border border-white/10 rounded">
                    {formatTime(sectionTimer.seconds)}
                  </span>
                </div>
              </div>
            </div>

            {/* CTA button */}
            <Link
              to="/deal"
              className="group inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-[#FF4D00] hover:bg-[#E03E00] text-white text-sm font-bold transition-all duration-200 shadow-[0_0_20px_rgba(255,77,0,0.35)] hover:shadow-[0_0_30px_rgba(255,77,0,0.55)] hover:scale-105 active:scale-95"
            >
              <span className="font-mono tracking-wide">Show more deals</span>
              <FiArrowUpRight className="text-base group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </Link>
          </div>
        </div>

        {/* ── Category Filter Pills ── */}
        <div className="flex flex-wrap items-center gap-2 mb-8">
          {CATEGORY_PILLS.map((pill) => (
            <button
              key={pill.id}
              onClick={() => setActiveFilter(pill.id)}
              className={`px-4 py-1.5 rounded-full font-mono text-xs font-semibold transition-all duration-200 border ${
                activeFilter === pill.id
                  ? 'bg-[#FF4D00] border-[#FF4D00] text-white shadow-[0_0_12px_rgba(255,77,0,0.4)]'
                  : 'bg-transparent border-white/[0.10] text-neutral-400 hover:border-[#FF4D00]/50 hover:text-neutral-200'
              }`}
            >
              {pill.label}
            </button>
          ))}
        </div>

        {/* ── Deals Grid ── */}
        {filteredDeals.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {filteredDeals.map((deal) => (
              <DealCard key={deal.id} deal={deal} startedAt={startedAtRef.current} />
            ))}
          </div>
        ) : (
          <div className="py-16 rounded-2xl border border-dashed border-white/10 bg-[#12151D]/40 text-center">
            <p className="font-mono text-sm text-neutral-500">No active deals in this category right now.</p>
            <button
              onClick={() => setActiveFilter('all')}
              className="mt-4 px-4 py-2 rounded-lg bg-[#FF4D00]/10 border border-[#FF4D00]/30 text-[#FF4D00] font-mono text-xs hover:bg-[#FF4D00]/20 transition-colors"
            >
              Show all deals
            </button>
          </div>
        )}

        {/* ── Bottom CTA Strip ── */}
        <div className="mt-10 flex flex-col sm:flex-row items-center justify-between gap-5 p-5 rounded-2xl bg-gradient-to-r from-[#FF4D00]/[0.07] to-transparent border border-[#FF4D00]/20">
          <div className="text-center sm:text-left">
            <p className="text-sm font-bold text-white">
              +{dealsData.length - 4} more active hardware deals waiting
            </p>
            <p className="text-xs text-neutral-400 mt-0.5">
              Browse our full promotions catalog — updated daily with new clearance drops.
            </p>
          </div>
          <Link
            to="/deal"
            className="group inline-flex items-center gap-2 px-6 py-3 rounded-xl border border-[#FF4D00]/50 text-[#FF4D00] font-mono text-sm font-bold hover:bg-[#FF4D00]/10 hover:border-[#FF4D00] transition-all duration-200 shrink-0"
          >
            View all deals
            <FiArrowUpRight className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default DealsSection;
