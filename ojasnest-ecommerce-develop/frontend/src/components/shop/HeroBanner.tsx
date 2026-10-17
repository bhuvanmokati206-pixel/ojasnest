import React from 'react';

export const HeroBanner: React.FC = () => {
  return (
    <section className="relative w-full h-[560px] md:h-[640px] overflow-hidden bg-[#090B0E] select-none group">
      <video
        className="absolute inset-0 h-full w-full object-contain"
        src="/hero-video.mp4"
        poster="/hero-grooming.jpg"
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
        aria-hidden="true"
      />
    </section>
  );
};

export default HeroBanner;