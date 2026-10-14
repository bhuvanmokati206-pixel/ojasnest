import React from 'react';

export const SkeletonLoader: React.FC<{ count?: number; className?: string }> = ({ count = 4, className = 'h-64' }) => (
  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 w-full">
    {Array.from({ length: count }).map((_, i) => (
      <div key={i} className={`bg-slate-900/80 border border-slate-800 rounded-xl animate-pulse ${className}`} />
    ))}
  </div>
);