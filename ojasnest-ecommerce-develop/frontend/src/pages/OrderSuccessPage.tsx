import React, { useEffect } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { useCartStore } from '../context/useCartStore';
import { CheckCircle } from 'lucide-react';

export const OrderSuccessPage: React.FC = () => {
  const [params] = useSearchParams();
  const orderId = params.get('orderId');
  const clearCart = useCartStore((s) => s.clearCart);

  useEffect(() => {
    clearCart();
  }, [clearCart]);

  return (
    <div className="max-w-lg mx-auto px-4 py-20 text-center space-y-6">
      <CheckCircle className="w-16 h-16 text-emerald-400 mx-auto" />
      <h1 className="text-3xl font-black text-white">Order Confirmed!</h1>
      <p className="text-slate-400 text-sm">Payment received. Real-time warehouse routing initiated for Order #{orderId}.</p>
      {orderId && (
        <Link
          to={`/orders/track/${orderId}`}
          className="inline-block bg-amber-400 hover:bg-amber-500 text-slate-950 font-bold px-6 py-2.5 rounded-lg text-sm transition"
        >
          View Live Order Tracker
        </Link>
      )}
    </div>
  );
};