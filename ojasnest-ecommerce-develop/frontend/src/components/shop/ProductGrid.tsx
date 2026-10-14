import React from 'react';
import { Product } from '../../types';
import { ProductCard } from './ProductCard';

export const ProductGrid: React.FC<{ products: Product[] }> = ({ products }) => {
  if (products.length === 0) {
    return <div className="p-12 text-center text-slate-500">No electronics products found in this category.</div>;
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
};