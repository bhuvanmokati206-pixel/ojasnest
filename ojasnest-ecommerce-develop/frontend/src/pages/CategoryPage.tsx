import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import api from '../api/client';
import { Product } from '../types';
import { ProductGrid } from '../components/shop/ProductGrid';
import { SkeletonLoader } from '../components/ui/SkeletonLoader';

export const CategoryPage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    api.get(`/products?category=${slug}`)
      .then((res) => setProducts(res.data))
      .catch(console.error)
      .finally(() => setLoading(false));
  }, [slug]);

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-black text-slate-100 uppercase mb-8 border-b border-slate-800 pb-4">
        {slug?.replace('-', ' ')}
      </h1>
      {loading ? <SkeletonLoader /> : <ProductGrid products={products} />}
    </div>
  );
};