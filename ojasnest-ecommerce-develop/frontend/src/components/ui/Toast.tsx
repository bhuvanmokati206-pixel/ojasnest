import React from 'react';
import { CheckCircle, AlertCircle, X } from 'lucide-react';

export const Toast: React.FC<{ type?: 'success' | 'error'; message: string; onClose: () => void }> = ({
  type = 'success',
  message,
  onClose,
}) => (
  <div className={`fixed bottom-5 right-5 z-50 flex items-center gap-3 px-4 py-3 rounded-lg border shadow-xl ${type === 'success' ? 'bg-slate-900 border-emerald-500 text-emerald-400' : 'bg-slate-900 border-red-500 text-red-400'}`}>
    {type === 'success' ? <CheckCircle className="w-5 h-5" /> : <AlertCircle className="w-5 h-5" />}
    <span className="text-sm font-medium text-slate-200">{message}</span>
    <button onClick={onClose} className="text-slate-400 hover:text-white ml-2"><X className="w-4 h-4" /></button>
  </div>
);