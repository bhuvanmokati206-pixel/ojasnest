import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ShoppingBag, ArrowRight, Trash2, Plus, Minus, ShieldCheck, ArrowLeft } from 'lucide-react';
import { useCartStore } from '../context/useCartStore';

export const CartPage: React.FC = () => {
  const navigate = useNavigate();
  const { items, updateQuantity, removeItem, total, clearCart } = useCartStore();

  const cartTotal = total();
  const shippingFee = cartTotal > 999 || cartTotal === 0 ? 0 : 99;
  const finalTotal = cartTotal + shippingFee;

  if (items.length === 0) {
    return (
      <div className="min-h-[calc(100vh-220px)] flex items-center justify-center bg-neutral-50 px-4 py-16 font-sans">
        <div className="w-full max-w-md bg-white rounded-2xl border border-neutral-200/80 shadow-xl shadow-neutral-100 p-8 sm:p-10 text-center">
          <div className="flex justify-center mb-6">
            <div className="w-16 h-16 bg-blue-50 border border-blue-100 rounded-full flex items-center justify-center text-[#0b5ed7] shadow-sm">
              <ShoppingBag size={30} />
            </div>
          </div>

          <h1 className="text-2xl font-bold text-neutral-900 tracking-tight">
            Your Basket is Empty
          </h1>
          <p className="text-xs text-neutral-500 mt-2 leading-relaxed max-w-xs mx-auto">
            Explore our store for GaN fast chargers, titanium grooming hardware, and precision adapters.
          </p>

          <button
            onClick={() => navigate('/category/all')}
            className="w-full py-3.5 px-6 bg-[#0b5ed7] hover:bg-blue-700 text-white text-xs font-bold uppercase tracking-wider rounded-xl shadow-md hover:shadow-blue-500/20 transition-all flex items-center justify-center space-x-2 mt-8 cursor-pointer"
          >
            <span>Browse Products</span>
            <ArrowRight size={16} />
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-neutral-50 py-12 px-4 sm:px-6 lg:px-8 font-sans">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold text-neutral-900 tracking-tight">
              Shopping Basket
            </h1>
            <p className="text-xs text-neutral-500 mt-1">
              {items.length} {items.length === 1 ? 'item' : 'items'} in your cart
            </p>
          </div>
          <button
            onClick={clearCart}
            className="text-xs font-semibold text-neutral-400 hover:text-red-600 transition-colors"
          >
            Clear Basket
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Items List */}
          <div className="lg:col-span-2 space-y-4">
            {items.map(({ product, quantity }) => (
              <div
                key={product.id}
                className="bg-white border border-neutral-200/80 rounded-2xl p-4 sm:p-6 flex flex-col sm:flex-row items-center justify-between gap-4 shadow-sm"
              >
                {/* Product Image & Details */}
                <div className="flex items-center space-x-4 w-full sm:w-auto">
                  <div className="w-20 h-20 bg-neutral-100 rounded-xl flex items-center justify-center p-2 flex-shrink-0">
                    <img
                      src={
                        (product as any).imageUrl ||
                        (product as any).images?.[0] ||
                        (product as any).image ||
                        '/placeholder.png'
                      }
                      alt={(product as any).title || (product as any).name || 'Product'}
                      className="w-full h-full object-contain"
                    />
                  </div>
                  <div>
                    <span className="text-[10px] font-bold text-neutral-400 uppercase tracking-wider">
                      {typeof product.category === 'object'
                        ? (product.category as any)?.name
                        : product.category || 'Gadget'}
                    </span>
                    <h3 className="text-sm font-bold text-neutral-900 line-clamp-1">
                      {(product as any).title || (product as any).name}
                    </h3>
                    <p className="text-sm font-bold text-[#0b5ed7] mt-1">
                      ₹{Number(product.price).toLocaleString('en-IN')}
                    </p>
                  </div>
                </div>

                {/* Quantity & Actions */}
                <div className="flex items-center justify-between w-full sm:w-auto space-x-6">
                  <div className="flex items-center border border-neutral-300 rounded-lg bg-neutral-50">
                    <button
                      onClick={() => updateQuantity(product.id, quantity - 1)}
                      className="p-1.5 hover:bg-neutral-200 rounded-l-lg transition-colors text-neutral-600"
                      aria-label="Decrease quantity"
                    >
                      <Minus size={14} />
                    </button>
                    <span className="px-3 text-xs font-bold text-neutral-800">{quantity}</span>
                    <button
                      onClick={() => updateQuantity(product.id, quantity + 1)}
                      className="p-1.5 hover:bg-neutral-200 rounded-r-lg transition-colors text-neutral-600"
                      aria-label="Increase quantity"
                    >
                      <Plus size={14} />
                    </button>
                  </div>

                  <span className="text-sm font-black text-neutral-900 min-w-[70px] text-right">
                    ₹{(Number(product.price) * quantity).toLocaleString('en-IN')}
                  </span>

                  <button
                    onClick={() => removeItem(product.id)}
                    className="text-neutral-400 hover:text-red-600 transition-colors p-1"
                    aria-label="Remove item"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              </div>
            ))}

            <Link
              to="/category/all"
              className="inline-flex items-center space-x-2 text-xs font-bold text-[#0b5ed7] hover:underline pt-2"
            >
              <ArrowLeft size={14} />
              <span>Continue Shopping</span>
            </Link>
          </div>

          {/* Order Summary */}
          <div className="bg-white border border-neutral-200/80 rounded-2xl p-6 sm:p-8 h-max shadow-sm space-y-6">
            <h2 className="text-base font-bold text-neutral-900 border-b border-neutral-100 pb-3">
              Order Summary
            </h2>

            <div className="space-y-3 text-xs text-neutral-600">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span className="font-semibold text-neutral-900">
                  ₹{cartTotal.toLocaleString('en-IN')}
                </span>
              </div>
              <div className="flex justify-between">
                <span>Estimated Shipping</span>
                <span className="font-semibold text-neutral-900">
                  {shippingFee === 0 ? <span className="text-emerald-600 font-bold">FREE</span> : `₹${shippingFee}`}
                </span>
              </div>
              <div className="flex justify-between">
                <span>Warranty Coverage</span>
                <span className="font-semibold text-emerald-600">2-Year Included</span>
              </div>
              <div className="border-t border-neutral-100 pt-3 flex justify-between text-sm font-black text-neutral-900">
                <span>Total</span>
                <span className="text-[#0b5ed7]">₹{finalTotal.toLocaleString('en-IN')}</span>
              </div>
            </div>

            <button
              onClick={() => navigate('/checkout')}
              className="w-full py-3.5 px-4 bg-[#0b5ed7] hover:bg-blue-700 text-white text-xs font-bold uppercase tracking-wider rounded-xl shadow-md hover:shadow-blue-500/20 transition-all flex items-center justify-center space-x-2 cursor-pointer"
            >
              <span>Proceed to Checkout</span>
              <ArrowRight size={16} />
            </button>

            <div className="flex items-center justify-center space-x-1.5 text-[11px] text-neutral-400">
              <ShieldCheck size={14} className="text-[#0b5ed7]" />
              <span>Safe & Secure 256-Bit Checkout</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};