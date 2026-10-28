import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import {
  ArrowRight,
  Minus,
  Plus,
  ShieldCheck,
  ShoppingBag,
  Trash2,
  X,
  Truck,
  Tag,
  Zap,
  CheckCircle2,
  Lock,
  CreditCard,
  RefreshCw,
} from 'lucide-react';
import { useCartStore } from '../../context/useCartStore';
import { dealsData } from '../../data/dealsData';
import { Product } from '../../types';

// ─── Constants ────────────────────────────────────────────────────────────────
/** Free shipping unlocks at this order value */
const FREE_SHIPPING_THRESHOLD = 50;

// ─── Upsell Rail Item ─────────────────────────────────────────────────────────
const UpsellCard: React.FC<{ product: Product; discountPct?: number }> = ({
  product,
  discountPct,
}) => {
  const addItem = useCartStore((s) => s.addItem);
  const [added, setAdded] = useState(false);

  const handleAdd = () => {
    addItem(product);
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  return (
    <article className="relative flex-none w-36 rounded-xl border border-white/[0.08] bg-[#0D1017] overflow-hidden group hover:border-[#FF4D00]/40 transition-colors duration-200">
      {discountPct && (
        <span className="absolute top-2 left-2 z-10 px-1.5 py-0.5 rounded-full bg-[#FF4D00] font-mono text-[9px] font-black text-white shadow-[0_0_8px_rgba(255,77,0,0.5)]">
          -{discountPct}%
        </span>
      )}
      <div className="h-24 bg-[#0A0C11] flex items-center justify-center p-3 overflow-hidden">
        <img
          src={product.images?.[0] ?? '/placeholder.png'}
          alt={product.title}
          className="max-h-full max-w-full object-contain transition-transform duration-300 group-hover:scale-110"
        />
      </div>
      <div className="p-2.5">
        <p className="text-[11px] font-semibold text-neutral-200 leading-tight line-clamp-2 mb-2">
          {product.title}
        </p>
        <div className="flex items-center justify-between gap-1">
          <span className="font-mono text-xs font-black text-white">
            £{Number(product.price).toFixed(2)}
          </span>
          <button
            type="button"
            onClick={handleAdd}
            aria-label={added ? `${product.title} added` : `Add ${product.title} to cart`}
            className={`flex items-center gap-1 px-2 py-1 rounded-lg font-mono text-[10px] font-bold transition-all duration-200 ${
              added
                ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                : 'bg-[#FF4D00]/15 text-[#FF4D00] border border-[#FF4D00]/30 hover:bg-[#FF4D00] hover:text-white hover:shadow-[0_0_10px_rgba(255,77,0,0.4)]'
            }`}
          >
            {added ? <CheckCircle2 className="h-3 w-3" /> : <Plus className="h-3 w-3" />}
            {added ? 'Added' : 'Add'}
          </button>
        </div>
      </div>
    </article>
  );
};

// ─── Shipping Progress Bar ────────────────────────────────────────────────────
const ShippingProgress: React.FC<{ cartTotal: number }> = ({ cartTotal }) => {
  const remaining = Math.max(0, FREE_SHIPPING_THRESHOLD - cartTotal);
  const pct = Math.min(100, (cartTotal / FREE_SHIPPING_THRESHOLD) * 100);
  const unlocked = remaining === 0;

  return (
    <div className="border-b border-white/[0.07] px-5 py-3.5 bg-[#0D1017]/60">
      <div className="flex items-center justify-between mb-2">
        <span className="flex items-center gap-1.5 text-[11px] font-semibold text-neutral-300">
          <Truck className="h-3.5 w-3.5 text-[#FF4D00]" />
          {unlocked ? 'Free express shipping unlocked! 🎉' : `Add £${remaining.toFixed(2)} for free shipping`}
        </span>
        {unlocked && (
          <span className="text-[10px] font-mono font-bold text-emerald-400">FREE</span>
        )}
      </div>
      <div className="h-1.5 w-full overflow-hidden rounded-full bg-white/[0.08]">
        <div
          className={`h-full rounded-full transition-all duration-500 ${
            unlocked
              ? 'bg-gradient-to-r from-emerald-500 to-emerald-400'
              : 'bg-gradient-to-r from-[#FF4D00] to-amber-400'
          }`}
          style={{ width: `${pct}%` }}
        />
      </div>
    </div>
  );
};

// ─── Cart Item Row ────────────────────────────────────────────────────────────
const CartItemRow: React.FC<{ product: Product; quantity: number }> = ({
  product,
  quantity,
}) => {
  const { removeItem, updateQuantity } = useCartStore();
  const [removing, setRemoving] = useState(false);

  const handleRemove = () => {
    setRemoving(true);
    setTimeout(() => removeItem(product.id), 250);
  };

  return (
    <article
      className={`flex gap-3.5 py-4 transition-all duration-250 ${removing ? 'opacity-0 -translate-x-2' : 'opacity-100'}`}
    >
      {/* Product image */}
      <div className="h-[72px] w-[72px] shrink-0 rounded-xl bg-[#0D1017] border border-white/[0.07] p-2 flex items-center justify-center overflow-hidden">
        <img
          src={product.images?.[0] ?? '/placeholder.png'}
          alt={product.title}
          className="h-full w-full object-contain"
        />
      </div>

      {/* Info */}
      <div className="min-w-0 flex-1">
        <div className="flex items-start justify-between gap-2">
          <div className="min-w-0">
            <h3 className="text-[13px] font-semibold text-neutral-100 leading-snug line-clamp-2">
              {product.title}
            </h3>
            {product.category && (
              <span className="mt-0.5 inline-block font-mono text-[9px] tracking-widest text-[#FF5722] uppercase">
                {product.category.name}
              </span>
            )}
          </div>
          <button
            type="button"
            onClick={handleRemove}
            aria-label={`Remove ${product.title}`}
            className="shrink-0 mt-0.5 p-1 rounded-md text-neutral-600 hover:text-red-400 hover:bg-red-500/10 transition-all duration-150"
          >
            <Trash2 className="h-3.5 w-3.5" />
          </button>
        </div>

        {/* Price + Qty */}
        <div className="mt-2.5 flex items-center justify-between">
          <span className="font-mono text-sm font-black text-white">
            £{(Number(product.price) * quantity).toFixed(2)}
          </span>
          {/* Stepper */}
          <div className="inline-flex items-center rounded-lg border border-white/[0.10] overflow-hidden bg-[#0D1017]">
            <button
              type="button"
              onClick={() => updateQuantity(product.id, quantity - 1)}
              aria-label={`Decrease quantity of ${product.title}`}
              disabled={quantity <= 1}
              className="px-2.5 py-1.5 text-neutral-400 hover:text-white hover:bg-white/[0.06] transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
            >
              <Minus className="h-3 w-3" />
            </button>
            <span className="min-w-[28px] text-center font-mono text-xs font-semibold text-neutral-100">
              {quantity}
            </span>
            <button
              type="button"
              onClick={() => updateQuantity(product.id, quantity + 1)}
              aria-label={`Increase quantity of ${product.title}`}
              className="px-2.5 py-1.5 text-neutral-400 hover:text-white hover:bg-white/[0.06] transition-colors"
            >
              <Plus className="h-3 w-3" />
            </button>
          </div>
        </div>
      </div>
    </article>
  );
};

// ─── Main Cart Drawer ─────────────────────────────────────────────────────────
export const CartDrawer: React.FC<{ isOpen: boolean; onClose: () => void }> = ({
  isOpen,
  onClose,
}) => {
  const { items, total } = useCartStore();
  const drawerRef = useRef<HTMLElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);

  // Scroll into view on open + focus management
  useEffect(() => {
    if (!isOpen) return;
    closeButtonRef.current?.focus();
  }, [isOpen]);

  // Body scroll lock + Escape key
  useEffect(() => {
    if (!isOpen) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose(); };
    document.addEventListener('keydown', onKey);
    return () => {
      document.body.style.overflow = prev;
      document.removeEventListener('keydown', onKey);
    };
  }, [isOpen, onClose]);

  // Upsell products: from dealsData, excluding already-in-cart items, max 6
  const cartIds = new Set(items.map((i) => i.product.id));
  const upsells = dealsData
    .filter((d) => !cartIds.has(d.id))
    .slice(0, 6);

  const cartTotal = total();
  const hasItems = items.length > 0;

  // Promo code state
  const [promoInput, setPromoInput] = useState('');
  const [promoApplied, setPromoApplied] = useState(false);
  const [promoError, setPromoError] = useState('');
  const VALID_CODE = 'OJAS10';

  const handlePromo = () => {
    if (promoInput.trim().toUpperCase() === VALID_CODE) {
      setPromoApplied(true);
      setPromoError('');
    } else {
      setPromoError('Invalid code. Try OJAS10!');
    }
  };
  const discount = promoApplied ? cartTotal * 0.1 : 0;
  const finalTotal = cartTotal - discount;

  return (
    <>
      {/* Backdrop scrim — always rendered, visibility toggled */}
      <div
        onClick={onClose}
        aria-hidden="true"
        className={`fixed inset-0 z-[59] bg-black/70 backdrop-blur-[3px] transition-opacity duration-300 ${
          isOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
      />

      {/* Drawer panel */}
      <aside
        ref={drawerRef}
        role="dialog"
        aria-modal="true"
        aria-label="Shopping cart"
        aria-labelledby="cart-title"
        className={`fixed right-0 top-0 z-[60] flex h-full w-full max-w-[440px] flex-col bg-[#090B0E] border-l border-white/[0.08] shadow-[−20px_0_80px_rgba(0,0,0,0.6)] transition-transform duration-300 ease-out will-change-transform ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        {/* ── Header ── */}
        <header className="flex items-center justify-between px-5 py-4 border-b border-white/[0.07] shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-[#FF4D00]/15 border border-[#FF4D00]/30 flex items-center justify-center">
              <ShoppingBag className="h-4 w-4 text-[#FF4D00]" />
            </div>
            <div>
              <h2 id="cart-title" className="text-sm font-bold text-white tracking-tight">
                Your Cart
              </h2>
              <p className="text-[10px] font-mono text-neutral-500">
                {items.length} {items.length === 1 ? 'item' : 'items'}
              </p>
            </div>
          </div>
          <button
            ref={closeButtonRef}
            type="button"
            onClick={onClose}
            aria-label="Close cart"
            className="p-2 rounded-lg text-neutral-400 hover:text-white hover:bg-white/[0.06] border border-transparent hover:border-white/10 transition-all duration-150"
          >
            <X className="h-5 w-5" />
          </button>
        </header>

        {/* ── Shipping Progress ── */}
        <ShippingProgress cartTotal={cartTotal} />

        {/* ── Scrollable Body ── */}
        <div className="flex-1 overflow-y-auto">
          {!hasItems ? (
            /* ── Empty State ── */
            <div className="flex h-full flex-col items-center justify-center text-center px-8 py-16">
              <div className="w-16 h-16 rounded-2xl bg-white/[0.04] border border-white/10 flex items-center justify-center mb-5">
                <ShoppingBag className="h-7 w-7 text-neutral-600" />
              </div>
              <h3 className="text-base font-bold text-neutral-200">Your cart is empty</h3>
              <p className="mt-2 text-sm text-neutral-500 leading-relaxed max-w-xs">
                Add something you love and it will appear here. Check out our hot deals!
              </p>
              <button
                type="button"
                onClick={onClose}
                className="mt-6 inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#FF4D00] hover:bg-[#E03E00] text-white font-mono text-xs font-bold transition-all shadow-[0_0_15px_rgba(255,77,0,0.35)] hover:scale-105"
              >
                <Zap className="h-3.5 w-3.5" /> Browse Deals
              </button>

              {/* Upsells even in empty state */}
              {upsells.length > 0 && (
                <div className="mt-10 w-full text-left">
                  <p className="font-mono text-[10px] text-neutral-500 uppercase tracking-widest mb-3 px-1">
                    Popular picks
                  </p>
                  <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-none">
                    {upsells.map((p) => (
                      <UpsellCard key={p.id} product={p} discountPct={p.discountPercentage} />
                    ))}
                  </div>
                </div>
              )}
            </div>
          ) : (
            /* ── Cart Items ── */
            <div className="px-5">
              <div className="divide-y divide-white/[0.06]">
                {items.map(({ product, quantity }) => (
                  <CartItemRow key={product.id} product={product} quantity={quantity} />
                ))}
              </div>

              {/* ── Promo Code ── */}
              <div className="mt-4 mb-2 p-3.5 rounded-xl border border-white/[0.07] bg-[#0D1017]/60">
                <p className="flex items-center gap-1.5 font-mono text-[10px] text-neutral-400 uppercase tracking-widest mb-2.5">
                  <Tag className="h-3 w-3 text-[#FF4D00]" /> Promo code
                </p>
                {promoApplied ? (
                  <div className="flex items-center gap-2 px-3 py-2 rounded-lg bg-emerald-500/10 border border-emerald-500/20">
                    <CheckCircle2 className="h-4 w-4 text-emerald-400 shrink-0" />
                    <span className="text-xs font-semibold text-emerald-400">
                      OJAS10 applied — 10% off!
                    </span>
                    <button
                      type="button"
                      onClick={() => { setPromoApplied(false); setPromoInput(''); }}
                      className="ml-auto text-neutral-500 hover:text-neutral-300 transition-colors"
                      aria-label="Remove promo code"
                    >
                      <X className="h-3.5 w-3.5" />
                    </button>
                  </div>
                ) : (
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={promoInput}
                      onChange={(e) => { setPromoInput(e.target.value); setPromoError(''); }}
                      onKeyDown={(e) => { if (e.key === 'Enter') handlePromo(); }}
                      placeholder="Enter code (e.g. OJAS10)"
                      aria-label="Promo code input"
                      className="flex-1 min-w-0 bg-[#090B0E] border border-white/[0.10] rounded-lg px-3 py-2 font-mono text-xs text-neutral-200 placeholder:text-neutral-600 focus:border-[#FF4D00]/50 focus:ring-1 focus:ring-[#FF4D00]/30 outline-none transition-all"
                    />
                    <button
                      type="button"
                      onClick={handlePromo}
                      className="shrink-0 px-4 py-2 rounded-lg bg-[#FF4D00]/15 border border-[#FF4D00]/30 text-[#FF4D00] font-mono text-xs font-bold hover:bg-[#FF4D00]/25 transition-colors"
                    >
                      Apply
                    </button>
                  </div>
                )}
                {promoError && (
                  <p className="mt-1.5 font-mono text-[10px] text-red-400">{promoError}</p>
                )}
              </div>

              {/* ── Upsell Rail ── */}
              {upsells.length > 0 && (
                <div className="mt-5 mb-3">
                  <div className="flex items-center justify-between mb-3">
                    <p className="font-mono text-[10px] text-neutral-500 uppercase tracking-widest flex items-center gap-1.5">
                      <Zap className="h-3 w-3 text-[#FF4D00]" />
                      You might also like
                    </p>
                    <Link
                      to="/deal"
                      onClick={onClose}
                      className="font-mono text-[10px] text-[#FF4D00] hover:text-orange-300 transition-colors"
                    >
                      See all →
                    </Link>
                  </div>
                  <div className="flex gap-3 overflow-x-auto pb-3 scrollbar-none -mx-1 px-1">
                    {upsells.map((p) => (
                      <UpsellCard key={p.id} product={p} discountPct={p.discountPercentage} />
                    ))}
                  </div>
                </div>
              )}

              {/* ── Trust Badges ── */}
              <div className="mt-2 mb-4 grid grid-cols-3 gap-2">
                {[
                  { icon: RefreshCw, label: '30-day returns' },
                  { icon: ShieldCheck, label: '2-yr warranty' },
                  { icon: Truck, label: '<24h dispatch' },
                ].map(({ icon: Icon, label }) => (
                  <div
                    key={label}
                    className="flex flex-col items-center gap-1.5 p-2.5 rounded-xl border border-white/[0.06] bg-[#0D1017]/40 text-center"
                  >
                    <Icon className="h-3.5 w-3.5 text-neutral-400" />
                    <span className="font-mono text-[9px] text-neutral-500 leading-tight">{label}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* ── Sticky Footer (only when cart has items) ── */}
        {hasItems && (
          <footer className="shrink-0 border-t border-white/[0.07] bg-[#090B0E] px-5 pb-6 pt-4">
            {/* Order summary */}
            <div className="space-y-1.5 mb-4">
              <div className="flex items-center justify-between text-xs text-neutral-400">
                <span>Subtotal ({items.reduce((s, i) => s + i.quantity, 0)} items)</span>
                <span className="font-mono text-neutral-200">£{cartTotal.toFixed(2)}</span>
              </div>
              {promoApplied && (
                <div className="flex items-center justify-between text-xs text-emerald-400">
                  <span className="flex items-center gap-1">
                    <Tag className="h-3 w-3" /> OJAS10 (10% off)
                  </span>
                  <span className="font-mono">−£{discount.toFixed(2)}</span>
                </div>
              )}
              <div className="flex items-center justify-between text-xs text-neutral-400">
                <span className="flex items-center gap-1">
                  <Truck className="h-3 w-3 text-emerald-400" /> Express shipping
                </span>
                <span className="font-mono text-emerald-400">FREE</span>
              </div>
              <div className="flex items-center justify-between pt-2 border-t border-white/[0.06]">
                <span className="text-sm font-bold text-white">Total</span>
                <span className="font-mono text-base font-black text-white">£{finalTotal.toFixed(2)}</span>
              </div>
            </div>

            {/* Primary CTA */}
            <Link
              to="/checkout"
              onClick={onClose}
              className="flex w-full items-center justify-center gap-2 rounded-xl bg-[#FF4D00] px-5 py-3.5 text-sm font-black text-white shadow-[0_0_25px_rgba(255,77,0,0.45)] hover:bg-[#E03E00] hover:shadow-[0_0_35px_rgba(255,77,0,0.6)] hover:scale-[1.02] active:scale-[0.98] transition-all duration-200"
            >
              <CreditCard className="h-4 w-4" />
              Proceed to Checkout
              <ArrowRight className="h-4 w-4" />
            </Link>

            {/* Security note */}
            <div className="mt-3 flex items-center justify-center gap-1.5 font-mono text-[10px] text-neutral-500">
              <Lock className="h-3 w-3 text-emerald-400" />
              Secured by 256-bit SSL encryption
            </div>

            {/* Payment icons */}
            <div className="mt-3 flex items-center justify-center gap-2 flex-wrap">
              {['VISA', 'MC', 'AMEX', 'STRIPE'].map((brand) => (
                <span
                  key={brand}
                  className="px-2.5 py-1 rounded bg-white/[0.05] border border-white/10 font-mono text-[9px] text-neutral-500 tracking-wider"
                >
                  {brand}
                </span>
              ))}
            </div>
          </footer>
        )}
      </aside>
    </>
  );
};
