import React from 'react';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
}

export const Input: React.FC<InputProps> = ({ label, error, className = '', ...props }) => (
  <div className="w-full">
    {label && <label className="block text-xs font-semibold text-slate-400 mb-1">{label}</label>}
    <input
      className={`w-full bg-slate-900 border ${error ? 'border-red-500' : 'border-slate-700'} rounded-lg px-3 py-2 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-amber-400 transition ${className}`}
      {...props}
    />
    {error && <span className="text-xs text-red-400 mt-1 block">{error}</span>}
  </div>
);