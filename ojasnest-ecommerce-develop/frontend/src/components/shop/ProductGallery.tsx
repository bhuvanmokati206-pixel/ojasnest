import React, { useState } from 'react';

export const ProductGallery: React.FC<{ images: string[]; title: string }> = ({ images, title }) => {
  const [active, setActive] = useState(images[0] || '/placeholder.png');

  return (
    <div className="space-y-4">
      <div className="bg-slate-900 border border-slate-800 rounded-xl p-6 flex items-center justify-center h-80 sm:h-96">
        <img src={active} alt={title} className="max-h-full object-contain" />
      </div>
      {images.length > 1 && (
        <div className="flex gap-3 overflow-x-auto pb-2">
          {images.map((img, idx) => (
            <button
              key={idx}
              onClick={() => setActive(img)}
              className={`w-16 h-16 rounded-lg border p-1 bg-slate-950 flex-shrink-0 transition ${active === img ? 'border-amber-400' : 'border-slate-800 opacity-60 hover:opacity-100'}`}
            >
              <img src={img} alt="" className="w-full h-full object-contain" />
            </button>
          ))}
        </div>
      )}
    </div>
  );
};