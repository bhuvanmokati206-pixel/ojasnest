import React from 'react';
import { useCartStore } from '../../context/useCartStore';
import { X, Trash2, ShoppingBag } from 'lucide-react';
import { Link } from 'react-router-dom';

export const CartDrawer: React.FC<{ isOpen: boolean; onClose: () => void }> = ({ isOpen, onClose }) => {
  const { items, removeItem, total } = useCartStore();
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex justify-end">
      <div className="w-full max-w-md bg-slate-950 border-l border-slate-800 h-full p-6 flex flex-col justify-between shadow-2xl animate-in slide-in-from-right duration-300">
        <div>
          <div className="flex justify-between items-center pb-4 border-b border-slate-800">
            <h3 className="font-bold text-slate-100 flex items-center gap-2">
              <ShoppingBag className="w-5 h-5 text-amber-400" /> Cart Overview
            </h3>
            <button onClick={onClose} className="text-slate-400 hover:text-white"><X className="w-5 h-5" /></button>
          </div>

          <div className="mt-4 space-y-4 max-h-[60vh] overflow-y-auto">
            {items.length === 0 ? (
              <p className="text-sm text-slate-500 text-center py-8">Your cart is currently empty.</p>
            ) : (
              items.map(({ product, quantity }) => (
                <div key={product.id} className="flex justify-between items-center bg-slate-900 p-3 rounded-lg border border-slate-800">
                  <div className="flex items-center gap-3">
                    <img src={product.images[0]} alt="" className="w-10 h-10 object-contain rounded bg-slate-950 p-1" />
                    <div>
                      <h5 className="text-xs font-semibold text-white line-clamp-1">{product.title}</h5>
                      <span className="text-xs text-amber-400 font-bold">Qty: {quantity} × £{Number(product.price).toFixed(2)}</span>
                    </div>
                  </div>
                  <button onClick={() => removeItem(product.id)} className="text-red-400 hover:text-red-300">
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              ))
            )}
          </div>
        </div>

        <div className="border-t border-slate-800 pt-4 space-y-4">
          <div className="flex justify-between text-base font-bold">
            <span className="text-slate-400">Total:</span>
            <span className="text-amber-400">£{total().toFixed(2)}</span>
          </div>
          <Link
            to="/cart"
            onClick={onClose}
            className="block text-center bg-amber-400 hover:bg-amber-500 text-slate-950 font-bold py-2.5 rounded-lg text-sm transition uppercase tracking-wide"
          >
            Go to Checkout
          </Link>
        </div>
      </div>
    </div>
  );
};