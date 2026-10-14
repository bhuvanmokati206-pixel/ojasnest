import React from 'react';

interface FilterProps {
  categories: { id: string; name: string; slug: string }[];
  selectedCategory: string;
  onSelectCategory: (slug: string) => void;
}

export const FiltersSidebar: React.FC<FilterProps> = ({ categories, selectedCategory, onSelectCategory }) => (
  <aside className="w-64 bg-slate-900 border border-slate-800 p-5 rounded-xl h-fit space-y-6">
    <div>
      <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-3">Filter by Category</h4>
      <div className="space-y-2">
        <button
          onClick={() => onSelectCategory('')}
          className={`block w-full text-left text-sm px-2 py-1.5 rounded transition ${selectedCategory === '' ? 'bg-amber-400/10 text-amber-400 font-bold' : 'text-slate-400 hover:text-white'}`}
        >
          All Hardware
        </button>
        {categories.map((c) => (
          <button
            key={c.id}
            onClick={() => onSelectCategory(c.slug)}
            className={`block w-full text-left text-sm px-2 py-1.5 rounded transition ${selectedCategory === c.slug ? 'bg-amber-400/10 text-amber-400 font-bold' : 'text-slate-400 hover:text-white'}`}
          >
            {c.name}
          </button>
        ))}
      </div>
    </div>
  </aside>
);