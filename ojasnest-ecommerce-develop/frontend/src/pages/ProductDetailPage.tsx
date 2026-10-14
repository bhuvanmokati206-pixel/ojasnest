import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import api from '../api/client';
import { Product } from '../types';
import { ProductGallery } from '../components/shop/ProductGallery';
import { StockBadge } from '../components/shop/StockBadge';
import { useCartStore } from '../context/useCartStore';

export const ProductDetailPage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const [product, setProduct] = useState<Product | null>(null);
  const addItem = useCartStore((s) => s.addItem);

  useEffect(() => {
    api.get(`/products/${slug}`).then((res) => setProduct(res.data));
  }, [slug]);

  if (!product) return <div className="p-12 text-center text-slate-400">Loading hardware specifications...</div>;

  return (
    <div className="max-w-7xl mx-auto px-4 py-12 grid grid-cols-1 md:grid-cols-2 gap-12">
      <ProductGallery images={product.images} title={product.title} />
      <div className="space-y-6">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-amber-400">{product.category?.name}</span>
          <h1 className="text-2xl sm:text-3xl font-black text-white mt-1">{product.title}</h1>
          <div className="mt-2"><StockBadge productId={product.id} initialStock={product.stock} /></div>
        </div>
        <div className="text-3xl font-black text-amber-400">£{Number(product.price).toFixed(2)}</div>
        <p className="text-slate-300 text-sm leading-relaxed border-t border-b border-slate-800 py-4">{product.description}</p>
        <button
          onClick={() => addItem(product)}
          className="w-full bg-amber-400 hover:bg-amber-500 text-slate-950 font-black py-3.5 rounded-lg text-sm uppercase tracking-wider transition"
        >
          Add to Basket
        </button>
      </div>
    </div>
  );
};