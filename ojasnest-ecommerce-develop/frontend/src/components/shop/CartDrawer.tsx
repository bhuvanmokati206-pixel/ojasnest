import React, { useEffect } from 'react';
import { useCartStore } from '../../context/useCartStore';
import { ArrowRight, Minus, Plus, ShieldCheck, ShoppingBag, Trash2, X } from 'lucide-react';
import { Link } from 'react-router-dom';

export const CartDrawer: React.FC<{ isOpen: boolean; onClose: () => void }> = ({ isOpen, onClose }) => {
  const { items, removeItem, updateQuantity, total } = useCartStore();

  useEffect(() => {
    if (!isOpen) return;

    const previousOverflow = document.body.style.overflow;
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') onClose();
    };

    document.body.style.overflow = 'hidden';
    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[60] flex justify-end">
      <button
        type="button"
        onClick={onClose}
        aria-label="Close cart"
        className="absolute inset-0 bg-black/65 backdrop-blur-[2px]"
      />

      <aside
        role="dialog"
        aria-modal="true"
        aria-labelledby="cart-drawer-title"
        className="relative flex h-full w-full max-w-[390px] flex-col border-l border-white/10 bg-[#09090B] text-white shadow-2xl"
      >
        <header className="flex items-center justify-between border-b border-white/10 px-5 py-4">
          <div>
            <h2 id="cart-drawer-title" className="text-lg font-bold">Your cart</h2>
            <p className="mt-0.5 text-xs text-neutral-400">
              {items.length} {items.length === 1 ? 'item' : 'items'}
            </p>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close cart"
            className="p-2 text-neutral-400 transition-colors hover:text-white"
          >
            <X className="h-5 w-5" />
          </button>
        </header>

        <div className="border-b border-white/10 px-5 py-4">
          <div className="flex items-center justify-between text-[11px] font-semibold uppercase tracking-wide">
            <span className="text-neutral-300">Express shipping</span>
            <span className="text-emerald-400">Free</span>
          </div>
          <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-white/10">
            <div className="h-full w-full rounded-full bg-emerald-400" />
          </div>
          <p className="mt-1.5 text-[10px] text-neutral-500">Free shipping included with every order</p>
        </div>

        <div className="flex-1 overflow-y-auto px-5">
          {items.length === 0 ? (
            <div className="flex h-full flex-col items-center justify-center text-center">
              <ShoppingBag className="h-9 w-9 text-neutral-600" />
              <p className="mt-4 font-semibold text-neutral-200">Your cart is empty</p>
              <p className="mt-1 text-sm text-neutral-500">Add something you love and it will show up here.</p>
              <button
                type="button"
                onClick={onClose}
                className="mt-5 text-sm font-semibold text-[#FF4D00] hover:text-orange-300"
              >
                Continue shopping
              </button>
            </div>
          ) : (
            <div className="divide-y divide-white/10">
              {items.map(({ product, quantity }) => (
                <article key={product.id} className="flex gap-3 py-4">
                  <div className="h-20 w-20 shrink-0 rounded-md bg-white p-2">
                    <img
                      src={product.images?.[0] || '/placeholder.png'}
                      alt={product.title}
                      className="h-full w-full object-contain"
                    />
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="flex items-start justify-between gap-2">
                      <h3 className="line-clamp-2 text-sm font-semibold text-neutral-100">{product.title}</h3>
                      <button
                        type="button"
                        onClick={() => removeItem(product.id)}
                        aria-label={`Remove ${product.title}`}
                        className="shrink-0 p-1 text-neutral-500 hover:text-red-400"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                    <p className="mt-1 text-sm font-semibold text-white">£{Number(product.price).toFixed(2)}</p>
                    <div className="mt-2 inline-flex items-center rounded border border-white/15">
                      <button
                        type="button"
                        onClick={() => updateQuantity(product.id, quantity - 1)}
                        aria-label={`Decrease quantity of ${product.title}`}
                        className="px-2 py-1 text-neutral-300 hover:bg-white/10"
                      >
                        <Minus className="h-3 w-3" />
                      </button>
                      <span className="min-w-8 text-center text-xs">{quantity}</span>
                      <button
                        type="button"
                        onClick={() => updateQuantity(product.id, quantity + 1)}
                        aria-label={`Increase quantity of ${product.title}`}
                        className="px-2 py-1 text-neutral-300 hover:bg-white/10"
                      >
                        <Plus className="h-3 w-3" />
                      </button>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          )}
        </div>

        {items.length > 0 && (
          <footer className="border-t border-white/10 px-5 pb-5 pt-4">
            <div className="flex items-center justify-between text-sm">
              <span className="text-neutral-400">Estimated total</span>
              <span className="font-bold text-white">£{total().toFixed(2)}</span>
            </div>
            <Link
              to="/checkout"
              onClick={onClose}
              className="mt-4 flex w-full items-center justify-center gap-2 rounded-md bg-white px-4 py-3 text-sm font-bold text-black transition-colors hover:bg-neutral-200"
            >
              Checkout <ArrowRight className="h-4 w-4" />
            </Link>
            <div className="mt-3 flex items-center justify-center gap-1.5 text-[11px] text-neutral-500">
              <ShieldCheck className="h-3.5 w-3.5 text-emerald-400" />
              Secure checkout
            </div>
          </footer>
        )}
      </aside>
    </div>
  );
};