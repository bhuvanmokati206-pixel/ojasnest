import React from 'react';
import { Link } from 'react-router-dom';
import { ShoppingBag, ArrowUpRight } from 'lucide-react';
import { Product } from '../../types';
import { StockBadge } from './StockBadge';
import { useCartStore } from '../../context/useCartStore';

export const ProductCard: React.FC<{ product: Product }> = ({ product }) => {
  const addItem = useCartStore((s) => s.addItem);

  return (
    <div className="group relative rounded-2xl bg-[#0D0D10]/90 backdrop-blur-md border border-white/10 p-4 flex flex-col justify-between transition-all duration-300 hover:border-[#FF5722]/50 hover:shadow-[0_12px_35px_rgba(255,87,34,0.12)]">
      {/* Hover Ambient Glow */}
      <div className="pointer-events-none absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-[radial-gradient(circle_at_50%_30%,rgba(255,87,34,0.14),transparent_70%)]" />

      <div className="relative z-10">
        {/* Product Image Stage */}
        <div className="relative w-full h-48 rounded-xl bg-[#131317] overflow-hidden flex items-center justify-center border border-white/5 p-4 group-hover:border-white/10 transition-colors">
          <img
            src={product.images?.[0] || '/placeholder.png'}
            alt={product.title}
            className="max-h-full max-w-full object-contain transition-transform duration-500 group-hover:scale-105"
          />

          <div className="absolute top-2.5 left-2.5">
            <StockBadge productId={product.id} initialStock={product.stock} />
          </div>

          <Link
            to={`/product/${product.slug}`}
            className="absolute bottom-2.5 right-2.5 p-2 rounded-full bg-[#0D0D10]/80 text-neutral-300 hover:text-white hover:bg-[#FF5722] border border-white/10 opacity-0 group-hover:opacity-100 transition-all duration-200"
            title="Inspect"
          >
            <ArrowUpRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        {/* Product Meta */}
        <div className="mt-4 space-y-1.5">
          <span className="text-[10px] font-semibold uppercase tracking-widest text-[#FF5722]">
            {product.category?.name || 'Component'}
          </span>

          <Link to={`/product/${product.slug}`} className="block">
            <h3 className="text-sm font-medium text-neutral-100 line-clamp-1 group-hover:text-white transition-colors">
              {product.title}
            </h3>
          </Link>

          <p className="text-xs text-neutral-400 line-clamp-2 font-normal leading-relaxed">
            {product.description}
          </p>
        </div>
      </div>

      {/* Price & Add to Cart */}
      <div className="relative z-10 mt-5 pt-3.5 border-t border-white/10 flex items-center justify-between">
        <div>
          <span className="text-[10px] text-neutral-400 uppercase tracking-wider block">Price</span>
          <span className="text-base font-semibold text-white tracking-tight">
            £{Number(product.price).toFixed(2)}
          </span>
        </div>

        <button
          onClick={() => addItem(product)}
          disabled={product.stock <= 0}
          className="flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-semibold text-white bg-[#FF5722] hover:bg-[#FF6E40] shadow-[0_0_18px_rgba(255,87,34,0.35)] hover:shadow-[0_0_24px_rgba(255,87,34,0.5)] transition-all duration-200 hover:scale-105 active:scale-95 disabled:bg-neutral-800 disabled:text-neutral-500 disabled:shadow-none disabled:cursor-not-allowed disabled:hover:scale-100"
        >
          <ShoppingBag className="w-3 h-3" />
          <span>Add</span>
        </button>
      </div>
    </div>
  );
};