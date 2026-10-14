import React from 'react';
import { useCartStore } from '../context/useCartStore';
import { useAuthStore } from '../context/useAuthStore';
import api from '../api/client';

export const CheckoutPage: React.FC = () => {
  const { items, total } = useCartStore();
  const user = useAuthStore((s) => s.user);

  const handlePay = async () => {
    try {
      const res = await api.post('/orders/checkout', {
        items: items.map((i) => ({
          id: i.product.id,
          title: i.product.title,
          price: i.product.price,
          quantity: i.quantity,
        })),
      });
      window.location.href = res.data.url;
    } catch (err) {
      alert('Checkout initialization error');
    }
  };

  return (
    <div className="max-w-2xl mx-auto px-4 py-16 text-center space-y-6">
      <h2 className="text-3xl font-black text-white">Direct Order Finalization</h2>
      <p className="text-sm text-slate-400">Buyer: {user?.email}</p>
      <div className="p-6 bg-slate-900 border border-slate-800 rounded-xl space-y-3">
        <div className="flex justify-between text-slate-300 text-sm"><span>Items ({items.length})</span><span>£{total().toFixed(2)}</span></div>
        <div className="flex justify-between text-slate-300 text-sm"><span>Express Shipping</span><span className="text-emerald-400">FREE</span></div>
        <div className="border-t border-slate-800 pt-3 flex justify-between font-bold text-white text-lg">
          <span>Amount Due:</span><span className="text-amber-400">£{total().toFixed(2)}</span>
        </div>
      </div>
      <button onClick={handlePay} className="w-full py-3 bg-amber-400 hover:bg-amber-500 text-slate-950 font-bold rounded-lg transition">
        Pay via Secure Stripe Checkout
      </button>
    </div>
  );
};