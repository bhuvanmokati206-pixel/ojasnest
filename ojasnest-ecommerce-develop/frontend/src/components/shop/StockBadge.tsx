import React from 'react';
import { useLiveStock } from '../../hooks/useLiveStock';

interface StockBadgeProps {
  productId: string;
  initialStock: number;
}

export const StockBadge: React.FC<StockBadgeProps> = ({ productId, initialStock }) => {
  const stock = useLiveStock(productId, initialStock);

  if (stock <= 0) {
    return (
      <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-mono font-medium bg-canvas-900 text-red-400 border border-red-900/50">
        <span className="w-1 h-1 rounded-full bg-red-400"></span>
        Out of Stock
      </span>
    );
  }

  if (stock <= 5) {
    return (
      <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-mono font-medium bg-canvas-900 text-amber-300 border border-amber-800/50">
        <span className="w-1 h-1 rounded-full bg-amber-400"></span>
        {stock} left
      </span>
    );
  }

  return (
    <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-mono font-medium bg-canvas-900 text-accent-sage border border-canvas-700">
      <span className="w-1 h-1 rounded-full bg-accent-sage"></span>
      In Stock
    </span>
  );
};