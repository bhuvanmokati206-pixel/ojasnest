import React, { useState } from 'react';

export const ProductGallery: React.FC<{ images: string[]; title: string }> = ({ images, title }) => {
  const [active, setActive] = useState(images[0] || '/placeholder.png');

  return (
    <div className="flex flex-col gap-4 md:flex-row">
      {images.length > 1 && (
        <div className="order-2 flex gap-3 overflow-x-auto pb-1 md:order-1 md:w-16 md:flex-col md:overflow-x-visible md:overflow-y-auto md:pb-0">
          {images.map((img, idx) => (
            <button
              key={idx}
              onClick={() => setActive(img)}
              aria-label={`Show product image ${idx + 1}`}
              aria-pressed={active === img}
              className={`h-16 w-16 flex-shrink-0 overflow-hidden rounded-lg border bg-white p-1 transition ${
                active === img
                  ? 'border-[#FF4D00]'
                  : 'border-neutral-300 opacity-70 hover:opacity-100'
              }`}
            >
              <img src={img} alt="" className="h-full w-full rounded object-cover" />
            </button>
          ))}
        </div>
      )}
      <div className="order-1 flex min-h-[420px] flex-1 items-center justify-center overflow-hidden rounded-xl bg-[#E9E4DA] sm:min-h-[560px] md:order-2">
        <img src={active} alt={title} className="h-full max-h-[680px] w-full object-contain" />
      </div>
    </div>
  );
};