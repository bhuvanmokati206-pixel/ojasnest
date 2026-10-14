import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search } from 'lucide-react';

export const SearchBar: React.FC = () => {
  const [term, setTerm] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (term.trim()) navigate(`/?q=${encodeURIComponent(term.trim())}`);
  };

  return (
    <form onSubmit={handleSubmit} className="relative w-full">
      <input
        type="text"
        value={term}
        onChange={(e) => setTerm(e.target.value)}
        placeholder="Search precision components, chargers, smart tech..."
        className="w-full bg-slate-900 border border-slate-700 rounded-lg pl-4 pr-10 py-2 text-sm text-white focus:outline-none focus:border-amber-400"
      />
      <button type="submit" className="absolute right-3 top-2.5 text-slate-400 hover:text-amber-400">
        <Search className="w-4 h-4" />
      </button>
    </form>
  );
};