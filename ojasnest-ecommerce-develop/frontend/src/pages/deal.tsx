import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import {
  FiSearch,
  FiZap,
  FiShield,
  FiRefreshCw,
  FiTruck,
  FiPercent,
  FiStar,
  FiClock,
  FiArrowUpRight,
  FiShoppingBag,
  FiBox,
  FiX,
  FiTrendingUp,
  FiFilter,
  FiCheck,
  FiTag,
} from 'react-icons/fi';
import { useCartStore } from '../context/useCartStore';
import {
  dealsData,
  spotlightDeal,
  DealProduct,
  calculateTimeLeft,
  formatTime,
  TimeLeft,
} from '../data/dealsData';

// ─── Types ────────────────────────────────────────────────────────────────────
type SortOption = 'savings' | 'price-asc' | 'price-desc' | 'ending-soon';
type DiscountFilter = 'all' | '20' | '30' | '40';
type CategoryFilter = 'all' | 'flash' | 'trimmers' | 'gan-power' | 'wireless' | 'bundles';

// ─── Sub-components ───────────────────────────────────────────────────────────

// Live countdown timer display
const CountdownDisplay: React.FC<{ endsInHours: number; startedAt: number; size?: 'sm' | 'lg' }> = ({
  endsInHours,
  startedAt,
  size = 'sm',
}) => {
  const [time, setTime] = useState<TimeLeft>(calculateTimeLeft(endsInHours, startedAt));
  useEffect(() => {
    const id = setInterval(() => setTime(calculateTimeLeft(endsInHours, startedAt)), 1000);
    return () => clearInterval(id);
  }, [endsInHours, startedAt]);

  if (size === 'lg') {
    return (
      <div className="flex items-center gap-2">
        {[time.hours, time.minutes, time.seconds].map((unit, i) => (
          <React.Fragment key={i}>
            <div className="flex flex-col items-center">
              <span className="px-3 py-2 rounded-lg bg-[#FF4D00]/15 border border-[#FF4D00]/30 font-mono text-2xl font-black text-[#FF4D00] tabular-nums leading-none w-14 text-center">
                {formatTime(unit)}
              </span>
              <span className="mt-1 font-mono text-[9px] text-neutral-500 uppercase tracking-widest">
                {i === 0 ? 'HRS' : i === 1 ? 'MIN' : 'SEC'}
              </span>
            </div>
            {i < 2 && <span className="font-mono text-xl font-black text-[#FF4D00] -mt-4">:</span>}
          </React.Fragment>
        ))}
      </div>
    );
  }

  return (
    <span className="inline-flex items-center gap-1 font-mono text-xs text-[#FF4D00]">
      <FiClock className="text-[10px]" />
      {formatTime(time.hours)}:{formatTime(time.minutes)}:{formatTime(time.seconds)}
    </span>
  );
};

// Deal card (full-featured)
const DealCard: React.FC<{ deal: DealProduct; startedAt: number }> = ({ deal, startedAt }) => {
  const addItem = useCartStore((s) => s.addItem);
  const [added, setAdded] = useState(false);

  const handleAdd = () => {
    addItem({ ...deal, price: deal.dealPrice });
    setAdded(true);
    setTimeout(() => setAdded(false), 2200);
  };

  const claimedColor =
    deal.claimedPercentage >= 80 ? 'bg-red-500' : deal.claimedPercentage >= 50 ? 'bg-amber-500' : 'bg-emerald-500';

  return (
    <div className="group relative flex flex-col rounded-2xl bg-[#0D1017] border border-white/[0.07] hover:border-[#FF4D00]/50 hover:shadow-[0_0_35px_rgba(255,77,0,0.12)] transition-all duration-300 overflow-hidden">
      {/* Ambient glow */}
      <div className="pointer-events-none absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-[radial-gradient(ellipse_at_50%_0%,rgba(255,77,0,0.08),transparent_70%)]" />

      {/* Image area */}
      <div className="relative w-full h-48 bg-[#0A0C10] border-b border-white/[0.04] flex items-center justify-center p-4 overflow-hidden">
        <img
          src={deal.images?.[0] || '/placeholder.png'}
          alt={deal.title}
          className="max-h-full max-w-full object-contain transition-transform duration-500 group-hover:scale-110"
        />

        {/* Top-left badges */}
        <div className="absolute top-3 left-3 flex flex-col gap-1.5">
          <span className="inline-flex items-center gap-1 px-2 py-1 rounded-full bg-[#FF4D00] text-white font-mono text-[10px] font-black shadow-[0_0_10px_rgba(255,77,0,0.5)]">
            -{deal.discountPercentage}% OFF
          </span>
          {deal.isFlashDeal ? (
            <span className="inline-flex items-center gap-1 px-2 py-1 rounded-full bg-[#FF4D00]/15 border border-[#FF4D00]/40 text-[#FF4D00] font-mono text-[9px] font-bold animate-pulse">
              <FiZap className="text-[9px]" /> {deal.dealBadge}
            </span>
          ) : (
            <span className="inline-flex items-center gap-1 px-2 py-1 rounded-full bg-white/[0.06] border border-white/10 text-neutral-300 font-mono text-[9px] font-bold">
              <FiTag className="text-[9px]" /> {deal.dealBadge}
            </span>
          )}
        </div>

        {/* Timer bottom-right */}
        <div className="absolute bottom-3 right-3 px-2 py-1 rounded bg-black/70 backdrop-blur-sm border border-white/10 flex items-center gap-1">
          <CountdownDisplay endsInHours={deal.endsInHours} startedAt={startedAt} />
        </div>

        {/* Inspect icon */}
        <Link
          to={`/product/${deal.slug}`}
          className="absolute top-3 right-3 p-1.5 rounded-full bg-[#0D0D10]/80 text-neutral-300 hover:text-white hover:bg-[#FF4D00] border border-white/10 opacity-0 group-hover:opacity-100 transition-all duration-200"
        >
          <FiArrowUpRight className="w-3 h-3" />
        </Link>
      </div>

      {/* Card body */}
      <div className="relative z-10 flex flex-col flex-1 p-4">
        <span className="text-[9px] font-semibold uppercase tracking-widest text-[#FF5722]">
          {deal.category?.name}
        </span>

        <Link to={`/product/${deal.slug}`} className="mt-1 block">
          <h3 className="text-sm font-bold text-neutral-100 line-clamp-1 group-hover:text-white transition-colors">
            {deal.title}
          </h3>
        </Link>

        <p className="mt-1 font-mono text-[9px] text-neutral-500 line-clamp-1">{deal.specSnippet}</p>

        {/* Stars */}
        <div className="mt-2 flex items-center gap-1.5">
          <div className="flex gap-0.5">
            {Array.from({ length: 5 }).map((_, i) => (
              <FiStar
                key={i}
                className={`text-[10px] ${i < Math.floor(deal.rating) ? 'text-amber-400 fill-amber-400' : 'text-neutral-600'}`}
              />
            ))}
          </div>
          <span className="font-mono text-[10px] text-neutral-400">
            {deal.rating} ({deal.reviewsCount})
          </span>
        </div>

        {/* Claimed progress */}
        <div className="mt-3">
          <div className="flex justify-between mb-1">
            <span className="flex items-center gap-1 font-mono text-[9px] text-neutral-400">
              <FiTrendingUp className="text-[9px]" />
              {deal.claimedPercentage}% Claimed
            </span>
            <span className="font-mono text-[9px] text-neutral-500">
              {deal.totalStock - deal.claimedCount} left
            </span>
          </div>
          <div className="h-1.5 w-full rounded-full bg-white/[0.06] overflow-hidden">
            <div
              className={`h-full rounded-full transition-all ${claimedColor}`}
              style={{ width: `${deal.claimedPercentage}%` }}
            />
          </div>
          {deal.claimedPercentage >= 80 && (
            <p className="mt-1 font-mono text-[9px] text-red-400 animate-pulse">
              🔥 Hurry! {deal.totalStock - deal.claimedCount} units remaining
            </p>
          )}
        </div>

        {/* Price + Add to Cart */}
        <div className="mt-4 pt-3 border-t border-white/[0.06] flex items-end justify-between gap-2">
          <div>
            <span className="block text-[10px] text-neutral-500 line-through font-mono">
              £{deal.originalPrice.toFixed(2)}
            </span>
            <span className="text-lg font-black text-white tracking-tight leading-none">
              £{deal.dealPrice.toFixed(2)}
            </span>
            <span className="block text-[9px] text-emerald-400 font-mono mt-0.5">
              You save £{(deal.originalPrice - deal.dealPrice).toFixed(2)}
            </span>
          </div>
          <button
            onClick={handleAdd}
            disabled={deal.stock <= 0}
            className={`flex items-center gap-1.5 px-3.5 py-2 rounded-full text-xs font-bold transition-all duration-200 shadow-[0_0_16px_rgba(255,77,0,0.3)] hover:shadow-[0_0_24px_rgba(255,77,0,0.5)] hover:scale-105 active:scale-95 disabled:opacity-40 disabled:cursor-not-allowed ${
              added ? 'bg-emerald-500 hover:bg-emerald-400 text-white' : 'bg-[#FF4D00] hover:bg-[#E03E00] text-white'
            }`}
          >
            {added ? <><FiCheck className="w-3 h-3" /> Added</> : <><FiShoppingBag className="w-3 h-3" /> Add</>}
          </button>
        </div>
      </div>
    </div>
  );
};

// ─── Spotlight Deal Component ─────────────────────────────────────────────────
const SpotlightBanner: React.FC<{ deal: DealProduct; startedAt: number }> = ({ deal, startedAt }) => {
  const addItem = useCartStore((s) => s.addItem);
  const [added, setAdded] = useState(false);
  const handleAdd = () => {
    addItem({ ...deal, price: deal.dealPrice });
    setAdded(true);
    setTimeout(() => setAdded(false), 2200);
  };

  return (
    <div className="relative rounded-3xl overflow-hidden border border-[#FF4D00]/20 bg-gradient-to-br from-[#151A24] via-[#0F1218] to-[#090B0E] shadow-[0_0_60px_rgba(255,77,0,0.08)]">
      {/* Grid overlay */}
      <div
        className="absolute inset-0 opacity-[0.035] pointer-events-none"
        style={{
          backgroundImage:
            'linear-gradient(#FF4D00 1px, transparent 1px), linear-gradient(90deg, #FF4D00 1px, transparent 1px)',
          backgroundSize: '32px 32px',
        }}
      />
      {/* Radial glow */}
      <div className="absolute -top-20 -right-20 w-[500px] h-[500px] bg-[#FF4D00]/[0.08] blur-[100px] rounded-full pointer-events-none" />

      <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-8 p-8 sm:p-10 lg:p-12 items-center">
        {/* Left: Info */}
        <div className="space-y-5">
          <div className="flex flex-wrap gap-2">
            <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#FF4D00]/15 border border-[#FF4D00]/30 font-mono text-[10px] font-black text-[#FF4D00] animate-pulse">
              <FiZap /> DEAL OF THE DAY
            </span>
            <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#FF4D00] font-mono text-[10px] font-black text-white shadow-[0_0_12px_rgba(255,77,0,0.5)]">
              -{deal.discountPercentage}% OFF
            </span>
          </div>

          <div>
            <span className="font-mono text-[10px] text-neutral-500 uppercase tracking-widest">
              {deal.category?.name}
            </span>
            <h2 className="mt-1 text-2xl sm:text-3xl font-black text-white tracking-tight leading-tight">
              {deal.title}
            </h2>
            <p className="mt-3 text-sm text-neutral-400 leading-relaxed max-w-lg">
              {deal.description}
            </p>
          </div>

          {/* Spec pills */}
          <div className="flex flex-wrap gap-2">
            {deal.specSnippet.split('·').map((spec, i) => (
              <span
                key={i}
                className="px-3 py-1 rounded-lg bg-white/[0.05] border border-white/10 font-mono text-[10px] text-neutral-300"
              >
                {spec.trim()}
              </span>
            ))}
          </div>

          {/* Star rating */}
          <div className="flex items-center gap-2">
            <div className="flex gap-0.5">
              {Array.from({ length: 5 }).map((_, i) => (
                <FiStar
                  key={i}
                  className={`text-sm ${i < Math.floor(deal.rating) ? 'text-amber-400 fill-amber-400' : 'text-neutral-600'}`}
                />
              ))}
            </div>
            <span className="font-mono text-xs text-neutral-400">
              {deal.rating} · {deal.reviewsCount} verified purchases
            </span>
          </div>

          {/* Claimed bar */}
          <div className="space-y-1.5">
            <div className="flex justify-between">
              <span className="font-mono text-xs text-neutral-400 flex items-center gap-1">
                <FiTrendingUp className="text-[10px]" />
                {deal.claimedPercentage}% Claimed — {deal.totalStock - deal.claimedCount} units left
              </span>
            </div>
            <div className="h-2 rounded-full bg-white/[0.06] overflow-hidden">
              <div
                className="h-full rounded-full bg-gradient-to-r from-[#FF4D00] to-amber-400 transition-all"
                style={{ width: `${deal.claimedPercentage}%` }}
              />
            </div>
          </div>

          {/* Pricing + CTA */}
          <div className="flex flex-wrap items-center gap-5">
            <div>
              <span className="block font-mono text-sm text-neutral-500 line-through">
                £{deal.originalPrice.toFixed(2)}
              </span>
              <span className="text-3xl font-black text-white tracking-tight">
                £{deal.dealPrice.toFixed(2)}
              </span>
              <span className="ml-3 text-sm font-semibold text-emerald-400">
                Save £{(deal.originalPrice - deal.dealPrice).toFixed(2)}
              </span>
            </div>

            <button
              onClick={handleAdd}
              disabled={deal.stock <= 0}
              className={`flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-black transition-all duration-200 hover:scale-105 active:scale-95 ${
                added
                  ? 'bg-emerald-500 text-white shadow-[0_0_20px_rgba(34,197,94,0.4)]'
                  : 'bg-[#FF4D00] hover:bg-[#E03E00] text-white shadow-[0_0_25px_rgba(255,77,0,0.45)]'
              }`}
            >
              {added ? <><FiCheck className="w-4 h-4" /> Added to Cart!</> : <><FiShoppingBag className="w-4 h-4" /> Claim This Deal</>}
            </button>

            <Link
              to={`/product/${deal.slug}`}
              className="flex items-center gap-1.5 font-mono text-xs text-neutral-400 hover:text-white transition-colors"
            >
              Full specs <FiArrowUpRight className="text-[10px]" />
            </Link>
          </div>
        </div>

        {/* Right: Image + Timer */}
        <div className="flex flex-col gap-4 items-center lg:items-end">
          <div className="relative w-full max-w-sm aspect-square rounded-2xl bg-[#0A0C10] border border-white/[0.06] flex items-center justify-center p-8 overflow-hidden">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(255,77,0,0.05),transparent_70%)]" />
            <img
              src={deal.images?.[0] || '/placeholder.png'}
              alt={deal.title}
              className="relative z-10 max-h-full max-w-full object-contain drop-shadow-[0_0_30px_rgba(255,77,0,0.25)]"
            />
          </div>
          {/* Big countdown */}
          <div className="p-4 rounded-2xl bg-[#0A0C10] border border-white/[0.08] w-full max-w-sm text-center">
            <p className="font-mono text-[10px] text-neutral-500 uppercase tracking-widest mb-3">
              Deal expires in
            </p>
            <div className="flex justify-center">
              <CountdownDisplay endsInHours={deal.endsInHours} startedAt={startedAt} size="lg" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// ─── Deals Page ───────────────────────────────────────────────────────────────
export const DealPage: React.FC = () => {
  const startedAtRef = useRef<number>(Date.now());

  // Filters & sorting
  const [search, setSearch] = useState('');
  const [categoryFilter, setCategoryFilter] = useState<CategoryFilter>('all');
  const [discountFilter, setDiscountFilter] = useState<DiscountFilter>('all');
  const [sortBy, setSortBy] = useState<SortOption>('savings');

  const CATEGORY_PILLS: { id: CategoryFilter; label: string }[] = [
    { id: 'all', label: 'All' },
    { id: 'flash', label: '⚡ Flash' },
    { id: 'trimmers', label: 'Trimmers' },
    { id: 'gan-power', label: 'GaN Power' },
    { id: 'wireless', label: 'Wireless' },
    { id: 'bundles', label: 'Bundles' },
  ];

  const SORT_OPTIONS: { value: SortOption; label: string }[] = [
    { value: 'savings', label: 'Biggest Savings' },
    { value: 'price-asc', label: 'Price: Low → High' },
    { value: 'price-desc', label: 'Price: High → Low' },
    { value: 'ending-soon', label: 'Ending Soon' },
  ];

  const DISCOUNT_OPTIONS: { value: DiscountFilter; label: string }[] = [
    { value: 'all', label: 'All Deals' },
    { value: '20', label: '20%+ OFF' },
    { value: '30', label: '30%+ OFF' },
    { value: '40', label: '40%+ OFF' },
  ];

  const VALUE_BADGES = [
    { icon: FiPercent, label: 'Price Match Promise', sub: 'Verified distributor rates', color: 'text-[#FF4D00]', bgColor: 'bg-[#FF4D00]/10 border-[#FF4D00]/20' },
    { icon: FiShield, label: '2-Year Direct Warranty', sub: 'Advance cross-shipment on defects', color: 'text-emerald-400', bgColor: 'bg-emerald-500/10 border-emerald-500/20' },
    { icon: FiRefreshCw, label: '30-Day Money Back', sub: 'Free prepaid return label included', color: 'text-sky-400', bgColor: 'bg-sky-500/10 border-sky-500/20' },
    { icon: FiTruck, label: '<24H Dispatch', sub: 'Express processing guaranteed', color: 'text-violet-400', bgColor: 'bg-violet-500/10 border-violet-500/20' },
  ];

  // Apply filters + sort
  const filteredDeals = dealsData
    .filter((d) => {
      const matchSearch =
        search.trim() === '' ||
        d.title.toLowerCase().includes(search.toLowerCase()) ||
        d.specSnippet.toLowerCase().includes(search.toLowerCase());
      const matchCategory = categoryFilter === 'all' || d.dealCategory === categoryFilter;
      const matchDiscount =
        discountFilter === 'all' || d.discountPercentage >= parseInt(discountFilter);
      return matchSearch && matchCategory && matchDiscount;
    })
    .sort((a, b) => {
      if (sortBy === 'savings') return b.discountPercentage - a.discountPercentage;
      if (sortBy === 'price-asc') return a.dealPrice - b.dealPrice;
      if (sortBy === 'price-desc') return b.dealPrice - a.dealPrice;
      if (sortBy === 'ending-soon') return a.endsInHours - b.endsInHours;
      return 0;
    });

  const hasActiveFilters = search !== '' || categoryFilter !== 'all' || discountFilter !== 'all';

  const resetFilters = () => {
    setSearch('');
    setCategoryFilter('all');
    setDiscountFilter('all');
    setSortBy('savings');
  };

  return (
    <div className="min-h-screen bg-[#090B0E] text-neutral-200 selection:bg-[#FF4D00] selection:text-white pb-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 space-y-10">

        {/* ── 1. Hero Banner ── */}
        <div className="relative w-full rounded-3xl bg-gradient-to-br from-[#1A1F2B] via-[#12161F] to-[#0A0D12] border border-white/10 p-8 sm:p-12 lg:p-14 overflow-hidden shadow-2xl">
          {/* Grid bg */}
          <div
            className="absolute inset-0 opacity-[0.04] pointer-events-none"
            style={{
              backgroundImage:
                'linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)',
              backgroundSize: '32px 32px',
            }}
          />
          {/* Glows */}
          <div className="absolute -top-24 -right-24 w-[450px] h-[450px] bg-[#FF4D00]/15 blur-[120px] rounded-full pointer-events-none" />
          <div className="absolute -bottom-24 -left-12 w-[300px] h-[300px] bg-[#FF4D00]/[0.06] blur-[100px] rounded-full pointer-events-none" />

          <div className="relative z-10 flex flex-col lg:flex-row lg:items-center lg:justify-between gap-8">
            {/* Left */}
            <div className="max-w-2xl">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/[0.06] border border-white/10 backdrop-blur-md mb-5">
                <span className="w-1.5 h-1.5 rounded-full bg-[#FF4D00] animate-pulse" />
                <span className="font-mono text-[11px] font-bold tracking-widest text-[#FF4D00] uppercase">
                  LIMITED HARDWARE CLEARANCE
                </span>
              </div>

              <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black text-white tracking-tight uppercase leading-none">
                OJASNEST HOT DEALS
                <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-neutral-200 to-[#FF4D00]">
                  &amp; SPECIAL OFFERS
                </span>
              </h1>

              <p className="mt-5 text-sm sm:text-base text-neutral-400 leading-relaxed max-w-xl">
                Discounts on precision titanium hardware, multi-port GaN fast chargers, and smart accessories. Stocks verified — prices won't last.
              </p>

              <div className="mt-6 flex flex-wrap gap-3">
                <span className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-white/[0.05] border border-white/10 font-mono text-xs text-neutral-300 backdrop-blur-sm">
                  <FiClock className="text-[#FF4D00]" /> Updated Daily
                </span>
                <span className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-white/[0.05] border border-white/10 font-mono text-xs text-neutral-300 backdrop-blur-sm">
                  <FiShield className="text-emerald-400" /> Full 2-Year Warranty
                </span>
                <span className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-white/[0.05] border border-white/10 font-mono text-xs text-neutral-300 backdrop-blur-sm">
                  <FiTruck className="text-sky-400" /> &lt;24H Dispatch
                </span>
              </div>
            </div>

            {/* Right: next cycle timer */}
            <div className="flex flex-col items-start lg:items-end gap-3 shrink-0">
              <p className="font-mono text-[10px] text-neutral-500 uppercase tracking-widest">
                Next promo cycle refreshes in
              </p>
              <CountdownDisplay endsInHours={24} startedAt={startedAtRef.current} size="lg" />
              <p className="font-mono text-[10px] text-neutral-500">
                {dealsData.length} active promotions • {dealsData.filter(d => d.isFlashDeal).length} flash drops
              </p>
            </div>
          </div>
        </div>

        {/* ── 2. Value Badges ── */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {VALUE_BADGES.map(({ icon: Icon, label, sub, color, bgColor }) => (
            <div
              key={label}
              className={`flex items-center gap-4 p-5 rounded-2xl border ${bgColor} hover:scale-[1.02] transition-transform`}
            >
              <div className={`w-11 h-11 rounded-xl ${bgColor} flex items-center justify-center shrink-0 text-xl ${color}`}>
                <Icon />
              </div>
              <div>
                <h4 className="text-sm font-bold text-white uppercase tracking-wide leading-tight">{label}</h4>
                <p className="text-xs text-neutral-400 mt-0.5">{sub}</p>
              </div>
            </div>
          ))}
        </div>

        {/* ── 3. Spotlight Deal ── */}
        <div>
          <div className="flex items-center gap-3 mb-5">
            <span className="h-px flex-1 bg-white/[0.08]" />
            <span className="font-mono text-[10px] text-neutral-500 uppercase tracking-widest whitespace-nowrap flex items-center gap-1.5">
              <FiZap className="text-[#FF4D00]" /> Deal of the Day
            </span>
            <span className="h-px flex-1 bg-white/[0.08]" />
          </div>
          <SpotlightBanner deal={spotlightDeal} startedAt={startedAtRef.current} />
        </div>

        {/* ── 4. Filter & Sort Bar ── */}
        <div className="sticky top-[73px] z-30 bg-[#090B0E]/95 backdrop-blur-xl border-b border-white/[0.07] -mx-4 sm:-mx-6 lg:-mx-8 px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex flex-col gap-3">
            {/* Top row: Search + Sort + Reset */}
            <div className="flex flex-col sm:flex-row gap-3">
              {/* Search */}
              <div className="relative flex-1">
                <FiSearch className="absolute left-3.5 top-1/2 -translate-y-1/2 text-neutral-500 text-sm" />
                <input
                  type="text"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Search deals..."
                  className="w-full bg-[#12151D] border border-white/[0.08] rounded-xl pl-10 pr-4 py-2.5 text-sm text-neutral-200 placeholder:text-neutral-500 focus:border-[#FF4D00]/50 focus:ring-1 focus:ring-[#FF4D00]/30 outline-none transition-colors font-mono"
                />
                {search && (
                  <button
                    onClick={() => setSearch('')}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-neutral-500 hover:text-white"
                  >
                    <FiX className="text-sm" />
                  </button>
                )}
              </div>

              {/* Sort select */}
              <div className="relative shrink-0">
                <FiFilter className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-500 text-sm pointer-events-none" />
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value as SortOption)}
                  className="appearance-none bg-[#12151D] border border-white/[0.08] rounded-xl pl-9 pr-8 py-2.5 text-sm text-neutral-200 font-mono focus:border-[#FF4D00]/50 outline-none transition-colors cursor-pointer"
                >
                  {SORT_OPTIONS.map((o) => (
                    <option key={o.value} value={o.value}>{o.label}</option>
                  ))}
                </select>
              </div>

              {/* Reset */}
              {hasActiveFilters && (
                <button
                  onClick={resetFilters}
                  className="flex items-center gap-1.5 px-4 py-2.5 rounded-xl border border-[#FF4D00]/30 text-[#FF4D00] font-mono text-xs hover:bg-[#FF4D00]/10 transition-colors shrink-0"
                >
                  <FiX className="text-xs" /> Reset
                </button>
              )}
            </div>

            {/* Second row: Category pills + Discount filters */}
            <div className="flex flex-wrap items-center gap-2">
              {CATEGORY_PILLS.map((p) => (
                <button
                  key={p.id}
                  onClick={() => setCategoryFilter(p.id)}
                  className={`px-3.5 py-1.5 rounded-full font-mono text-xs font-semibold border transition-all duration-200 ${
                    categoryFilter === p.id
                      ? 'bg-[#FF4D00] border-[#FF4D00] text-white shadow-[0_0_10px_rgba(255,77,0,0.35)]'
                      : 'bg-transparent border-white/[0.08] text-neutral-400 hover:border-[#FF4D00]/40 hover:text-neutral-200'
                  }`}
                >
                  {p.label}
                </button>
              ))}

              <span className="h-4 w-px bg-white/[0.12] mx-1 hidden sm:block" />

              {DISCOUNT_OPTIONS.map((d) => (
                <button
                  key={d.value}
                  onClick={() => setDiscountFilter(d.value)}
                  className={`px-3.5 py-1.5 rounded-full font-mono text-xs font-semibold border transition-all duration-200 ${
                    discountFilter === d.value
                      ? 'bg-emerald-500/20 border-emerald-500/50 text-emerald-400'
                      : 'bg-transparent border-white/[0.08] text-neutral-400 hover:border-emerald-500/30 hover:text-neutral-200'
                  }`}
                >
                  {d.label}
                </button>
              ))}

              <span className="ml-auto font-mono text-[10px] text-neutral-500 shrink-0">
                {filteredDeals.length} deal{filteredDeals.length !== 1 ? 's' : ''} found
              </span>
            </div>
          </div>
        </div>

        {/* ── 5. Deals Grid ── */}
        {filteredDeals.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 pt-2">
            {filteredDeals.map((deal) => (
              <DealCard key={deal.id} deal={deal} startedAt={startedAtRef.current} />
            ))}
          </div>
        ) : (
          /* Empty state */
          <div className="py-24 rounded-3xl border border-dashed border-white/10 bg-[#12151D]/40 flex flex-col items-center justify-center text-center px-8">
            <div className="w-14 h-14 rounded-2xl bg-white/[0.04] border border-white/10 flex items-center justify-center text-neutral-500 mb-4">
              <FiBox className="text-2xl" />
            </div>
            <h3 className="text-base font-bold text-white">No deals match your filters</h3>
            <p className="text-sm text-neutral-500 mt-2 max-w-sm">
              Try adjusting your search query, category, or discount threshold to find available promotions.
            </p>
            <button
              onClick={resetFilters}
              className="mt-6 inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#FF4D00] hover:bg-[#E03E00] text-white font-mono text-xs font-bold transition-all shadow-[0_0_15px_rgba(255,77,0,0.3)] hover:scale-105"
            >
              <FiRefreshCw className="text-xs" /> Reset All Filters
            </button>
          </div>
        )}

        {/* ── 6. Guarantee Strip ── */}
        <div className="rounded-2xl bg-[#0E1116] border border-white/[0.07] p-6 sm:p-8">
          <div className="text-center mb-6">
            <span className="font-mono text-[10px] text-[#FF4D00] tracking-widest uppercase">Deal Guarantees</span>
            <h3 className="text-lg font-bold text-white mt-1">Buy with complete confidence</h3>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 text-center">
            {[
              { icon: FiShield, title: '2-Year Warranty', desc: 'Advance cross-shipment for any defective unit, no returns needed.' },
              { icon: FiRefreshCw, title: '30-Day Returns', desc: 'Full refund with prepaid shipping label, no questions asked.' },
              { icon: FiPercent, title: 'Price Match', desc: 'Found it cheaper officially? We match the price, same day.' },
              { icon: FiTruck, title: 'Express Dispatch', desc: 'All orders processed and dispatched within 24 hours guaranteed.' },
            ].map(({ icon: Icon, title, desc }) => (
              <div key={title} className="flex flex-col items-center gap-2">
                <div className="w-10 h-10 rounded-xl bg-[#FF4D00]/10 border border-[#FF4D00]/20 flex items-center justify-center text-[#FF4D00]">
                  <Icon />
                </div>
                <h4 className="text-sm font-bold text-white">{title}</h4>
                <p className="text-xs text-neutral-500 leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
};

export default DealPage;

