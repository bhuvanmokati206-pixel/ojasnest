import React from 'react';
import { Product } from '../../types';

export const InventoryTable: React.FC<{ products: Product[] }> = ({ products }) => (
  <div className="overflow-x-auto border border-slate-800 rounded-xl">
    <table className="w-full text-left text-sm text-slate-300">
      <thead className="bg-slate-900 text-xs font-bold text-slate-400 uppercase border-b border-slate-800">
        <tr>
          <th className="px-4 py-3">Product</th>
          <th className="px-4 py-3">Category</th>
          <th className="px-4 py-3">Price</th>
          <th className="px-4 py-3">Current Stock</th>
        </tr>
      </thead>
      <tbody className="divide-y divide-slate-800 bg-slate-950">
        {products.map((p) => (
          <tr key={p.id}>
            <td className="px-4 py-3 font-semibold text-white">{p.title}</td>
            <td className="px-4 py-3 text-slate-400">{p.category?.name}</td>
            <td className="px-4 py-3 text-amber-400 font-bold">£{Number(p.price).toFixed(2)}</td>
            <td className="px-4 py-3">
              <span className={`px-2 py-0.5 rounded text-xs font-bold ${p.stock > 5 ? 'bg-emerald-950 text-emerald-400' : 'bg-red-950 text-red-400'}`}>
                {p.stock} units
              </span>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);