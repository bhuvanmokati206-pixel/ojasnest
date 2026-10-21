import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import api from '../api/client';
import { Product } from '../types';
import { ProductGallery } from '../components/shop/ProductGallery';
import { StockBadge } from '../components/shop/StockBadge';
import { useCartStore } from '../context/useCartStore';
import { demoTrimmer } from '../data/demoTrimmer';
import { demoNoseTrimmer } from '../data/demoNoseTrimmer';
import { demoWirelessCharger } from '../data/demoWirelessCharger';
import { demoGaNPowerBank } from '../data/demoGaNPowerBank';

export const ProductDetailPage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const [product, setProduct] = useState<Product | null>(null);
  const [addedToCart, setAddedToCart] = useState(false);
  const addItem = useCartStore((s) => s.addItem);

  useEffect(() => {
    if (slug === demoTrimmer.slug) {
      setProduct(demoTrimmer);
      return;
    }

    if (slug === demoNoseTrimmer.slug) {
      setProduct(demoNoseTrimmer);
      return;
    }

    if (slug === demoWirelessCharger.slug) {
      setProduct(demoWirelessCharger);
      return;
    }

    if (slug === demoGaNPowerBank.slug) {
      setProduct(demoGaNPowerBank);
      return;
    }

    api.get(`/products/${slug}`).then((res) => setProduct(res.data));
  }, [slug]);

  if (!product) return <div className="p-12 text-center text-slate-400">Loading hardware specifications...</div>;

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8 lg:py-12">
      <div className="mb-5 text-xs text-neutral-400">
        <Link to="/" className="transition hover:text-white">Home</Link>
        <span className="mx-2">/</span>
        <Link to="/category/grooming" className="transition hover:text-white">Trimmers</Link>
        <span className="mx-2">/</span>
        <span className="text-neutral-200">{product.title}</span>
      </div>

      <div className="grid grid-cols-1 gap-8 lg:grid-cols-[minmax(0,1.25fr)_minmax(340px,0.75fr)] lg:gap-12">
        <div className="rounded-2xl bg-[#F3F0E9] p-3 sm:p-5 lg:p-7">
          <ProductGallery images={product.images} title={product.title} />
        </div>

        <div className="py-2 lg:py-5">
          <span className="text-xs font-semibold uppercase tracking-[0.2em] text-[#FF4D00]">
            {product.category?.name || 'Grooming'}
          </span>
          <h1 className="mt-3 text-3xl font-bold tracking-tight text-white sm:text-4xl">
            {product.title}
          </h1>
          <div className="mt-4">
            <StockBadge productId={product.id} initialStock={product.stock} />
          </div>

          <p className="mt-6 text-3xl font-bold text-white">
            £{Number(product.price).toFixed(2)}
          </p>
          <p className="mt-1 text-xs text-neutral-400">Price includes free shipping</p>

          <p className="mt-6 border-y border-white/10 py-5 text-sm leading-7 text-neutral-300">
            {product.description}
          </p>

          <div className="mt-6">
            <h2 className="text-xs font-semibold uppercase tracking-wider text-neutral-200">
              Product details
            </h2>
            <ul className="mt-3 space-y-2.5 text-sm text-neutral-300">
              <li className="flex gap-3">
                <span className="text-[#FF4D00]">•</span>
                Precision cutting head for detailed grooming
              </li>
              <li className="flex gap-3">
                <span className="text-[#FF4D00]">•</span>
                Compact design for a steady, comfortable grip
              </li>
              <li className="flex gap-3">
                <span className="text-[#FF4D00]">•</span>
                Four product views shown in the gallery
              </li>
            </ul>
          </div>

          <button
            onClick={() => {
              addItem(product);
              setAddedToCart(true);
            }}
            disabled={product.stock <= 0}
            className="mt-8 w-full rounded-md bg-[#FF4D00] px-6 py-4 text-sm font-bold uppercase tracking-wider text-white transition hover:bg-[#E03E00] disabled:cursor-not-allowed disabled:bg-neutral-700"
          >
            {addedToCart ? 'Added to cart' : 'Add to cart'}
          </button>
          <p className="mt-3 text-center text-xs text-neutral-500">
            Secure checkout · Free shipping
          </p>
        </div>
      </div>
    </div>
  );
};