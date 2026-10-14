import React from 'react';
import { useAuthStore } from '../context/useAuthStore';

export const UserProfilePage: React.FC = () => {
  const { user, logout } = useAuthStore();

  return (
    <div className="max-w-3xl mx-auto px-4 py-12 space-y-6">
      <h2 className="text-2xl font-black text-white">Account Details</h2>
      <div className="bg-slate-900 border border-slate-800 p-6 rounded-xl space-y-3">
        <p className="text-sm text-slate-400">Name: <strong className="text-white">{user?.name}</strong></p>
        <p className="text-sm text-slate-400">Email: <strong className="text-white">{user?.email}</strong></p>
        <p className="text-sm text-slate-400">Role: <strong className="text-amber-400">{user?.role}</strong></p>
      </div>
      <button onClick={logout} className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white font-bold rounded-lg text-sm">
        Log Out
      </button>
    </div>
  );
};