import React, { useState } from 'react';

export const ProductGallery: React.FC<{ images: string[]; title: string }> = ({ images, title }) => {
  const [active, setActive] = useState(images[0] || '/placeholder.png');

  return (
    <div className="flex flex-col gap-4 md:flex-row">
      {images.length > 1 && (
        <div className="order-2 flex gap-3 overflow-x-auto pb-1 md:order-1 md:w-20 md:flex-col md:overflow-x-visible md:overflow-y-auto md:pb-0">
          {images.map((img, idx) => (
            <button
              key={idx}
              onClick={() => setActive(img)}
              aria-label={`Show product image ${idx + 1}`}
              aria-pressed={active === img}
              className={`h-20 w-20 flex-shrink-0 overflow-hidden rounded-xl border p-1 transition-all duration-200 bg-[#0A0C10] ${
                active === img
                  ? 'border-[#FF4D00] shadow-[0_0_15px_rgba(255,77,0,0.45)] ring-1 ring-[#FF4D00]'
                  : 'border-white/10 opacity-60 hover:opacity-100 hover:border-[#FF4D00]/50'
              }`}
            >
              <img src={img} alt="" className="h-full w-full rounded-lg object-contain" />
            </button>
          ))}
        </div>
      )}
      <div className="order-1 flex min-h-[420px] flex-1 items-center justify-center overflow-hidden rounded-xl bg-black border border-white/5 relative group/img sm:min-h-[560px] md:order-2">
        <img
          src={active}
          alt={title}
          className="h-full max-h-[680px] w-full object-contain transition-transform duration-500 group-hover/img:scale-105"
        />
      </div>
    </div>
  );
};
