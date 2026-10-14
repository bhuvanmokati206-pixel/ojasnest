import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi';

const slides = [
  {
    tag: 'CARE & PRECISION',
    title: 'Better care for every home',
    desc: 'High-precision grooming tools paired with intelligent GaN power architecture engineered for daily life.',
    cta: 'Discover more',
    link: '/products',
    bgImage: 'https://images.unsplash.com/photo-1507679799987-c73779587ccf?q=80&w=2200&auto=format&fit=crop'
  },
  {
    tag: 'POWER ARCHITECTURE',
    title: 'High-speed GaN Charging Systems',
    desc: 'Gallium Nitride semiconductors engineered for multi-device rapid delivery and active thermal protection.',
    cta: 'Explore chargers',
    link: '/category/chargers',
    bgImage: 'https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=2200&auto=format&fit=crop'
  }
];

export const HeroBanner: React.FC = () => {
  const [current, setCurrent] = useState(0);
  const navigate = useNavigate();

  const prevSlide = () => setCurrent((curr) => (curr === 0 ? slides.length - 1 : curr - 1));
  const nextSlide = () => setCurrent((curr) => (curr === slides.length - 1 ? 0 : curr + 1));

  const slide = slides[current];

  return (
    <section className="relative w-full h-[560px] md:h-[640px] overflow-hidden bg-slate-900 select-none">
      {/* Background Image Layer */}
      <div 
        className="absolute inset-0 bg-cover bg-center transition-all duration-700 ease-in-out"
        style={{ backgroundImage: `url(${slide.bgImage})` }}
      >
        {/* Soft bottom vignette so white text is crystal clear */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/35 to-black/20" />
      </div>

      {/* Hero Content Container */}
      <div className="relative max-w-7xl mx-auto h-full px-6 md:px-12 flex flex-col justify-end pb-16 md:pb-20 text-white z-10">
        
        {/* Subtitle tag */}
        <span className="text-xs uppercase tracking-widest font-semibold text-[#FF4D00] mb-2 font-sans">
          {slide.tag}
        </span>

        {/* Big Headline */}
        <h1 className="text-3xl md:text-5xl lg:text-6xl font-normal tracking-tight max-w-2xl leading-tight font-sans">
          {slide.title}
        </h1>

        {/* Subtext */}
        <p className="mt-3 text-sm md:text-base text-gray-200 max-w-xl font-sans leading-relaxed">
          {slide.desc}
        </p>

        {/* CTA Button in Brand Signal Orange */}
        <div className="mt-6 flex items-center gap-4">
          <button
            onClick={() => navigate(slide.link)}
            className="bg-[#FF4D00] hover:bg-[#E03E00] text-white font-medium px-8 py-3 rounded-full text-sm transition-all duration-200 shadow-[0_4px_20px_rgba(255,77,0,0.35)] hover:shadow-[0_6px_25px_rgba(255,77,0,0.5)] active:scale-95"
          >
            {slide.cta}
          </button>
        </div>
      </div>

      {/* Circular Carousel Controls */}
      <button
        onClick={prevSlide}
        aria-label="Previous slide"
        className="absolute left-5 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white/25 hover:bg-white/40 text-white backdrop-blur-md flex items-center justify-center transition-colors z-20"
      >
        <FiChevronLeft className="text-2xl" />
      </button>

      <button
        onClick={nextSlide}
        aria-label="Next slide"
        className="absolute right-5 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white/25 hover:bg-white/40 text-white backdrop-blur-md flex items-center justify-center transition-colors z-20"
      >
        <FiChevronRight className="text-2xl" />
      </button>
    </section>
  );
};

export default HeroBanner;