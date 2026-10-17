import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import api from '../api/client';
import { Product } from '../types';
import { ProductGrid } from '../components/shop/ProductGrid';
import { SkeletonLoader } from '../components/ui/SkeletonLoader';
import { demoTrimmer } from '../data/demoTrimmer';

export const CategoryPage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    api.get(`/products?category=${slug}`)
      .then((res) => {
        const categoryProducts: Product[] = res.data;
        setProducts(
          slug === 'grooming' &&
            !categoryProducts.some((product) => product.slug === demoTrimmer.slug)
            ? [demoTrimmer, ...categoryProducts]
            : categoryProducts
        );
      })
      .catch((error) => {
        console.error('Unable to load category products:', error);
        setProducts(slug === 'grooming' ? [demoTrimmer] : []);
      })
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