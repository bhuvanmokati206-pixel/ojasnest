import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi';

const slides = [
  {
    tag: 'CARE & PRECISION',
    title: 'BUILT FOR THE MAN YOU ARE.',
    desc: "Powerful grooming tools for a look that's unmistakably yours.",
    cta: 'Explore Grooming',
    link: '/category/grooming',
    bgImage: '/hero-grooming.jpg'
  },
  {
    tag: 'CARE & PRECISION',
    title: 'NO SHORTCUTS. JUST STANDARDS.',
    desc: 'A better ritual for the man who expects more.',
    cta: 'Explore Grooming',
    link: '/category/grooming',
    bgImage: '/hero-section%202%20.png'
  },
  {
    tag: 'POWER ARCHITECTURE',
    title: 'High-speed GaN Charging Systems',
    desc: 'Gallium Nitride semiconductors engineered for multi-device rapid delivery and active thermal protection.',
    cta: 'Explore Chargers',
    link: '/category/chargers',
    bgImage: 'https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=2200&auto=format&fit=crop'
  }
];

export const Hero1: React.FC = () => {
  const [current, setCurrent] = useState(0);
  const navigate = useNavigate();
  const timerRef = useRef<number | null>(null);

  const prevSlide = () => {
    setCurrent((curr) => (curr === 0 ? slides.length - 1 : curr - 1));
  };

  const nextSlide = () => {
    setCurrent((curr) => (curr === slides.length - 1 ? 0 : curr + 1));
  };

  // 4-second auto-sliding interval
  useEffect(() => {
    timerRef.current = setInterval(() => {
      setCurrent((curr) => (curr === slides.length - 1 ? 0 : curr + 1));
    }, 4000);

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [current]);

  return (
    <section className="relative w-full h-[560px] md:h-[640px] overflow-hidden bg-[#090B0E] select-none group">
      {/* Sliding Track */}
      <div 
        className="flex w-full h-full transition-transform duration-700 ease-in-out"
        style={{ transform: `translateX(-${current * 100}%)` }}
      >
        {slides.map((slide, idx) => (
          <div 
            key={idx}
            className="relative w-full h-full flex-shrink-0 bg-cover bg-right md:bg-center brightness-[1.08] contrast-[1.03]"
            style={{ backgroundImage: `url(${slide.bgImage})` }}
          >
            {/* High-transparency overlay: shadows text on the left, completely clear and bright on the right */}
            <div className="absolute inset-0 bg-gradient-to-r from-[#090B0E]/90 via-[#090B0E]/30 to-transparent md:w-3/5" />
            {/* Soft bottom edge fade to smoothly transition into the next section */}
            <div className="absolute bottom-0 inset-x-0 h-28 bg-gradient-to-t from-[#090B0E] to-transparent pointer-events-none" />

            {/* Slide Content */}
            <div className="relative max-w-7xl mx-auto h-full px-6 md:px-12 flex flex-col justify-end pb-16 md:pb-20 text-white z-10">
              <span className="text-xs uppercase tracking-widest font-semibold text-[#FF4D00] mb-2 font-mono">
                {slide.tag}
              </span>

              <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold tracking-tight max-w-2xl leading-tight font-sans">
                {slide.title}
              </h1>

              <p className="mt-3 text-sm md:text-base text-neutral-300 max-w-xl font-sans leading-relaxed">
                {slide.desc}
              </p>

              <div className="mt-6 flex items-center gap-4">
                <button
                  onClick={() => navigate(slide.link)}
                  className="bg-[#FF4D00] hover:bg-[#E03E00] text-white font-medium px-8 py-3 rounded-full text-sm transition-all duration-200 shadow-[0_4px_20px_rgba(255,77,0,0.35)] hover:shadow-[0_6px_25px_rgba(255,77,0,0.5)] active:scale-95"
                >
                  {slide.cta}
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Slide Navigation Buttons */}
      <button
        onClick={prevSlide}
        aria-label="Previous slide"
        className="absolute left-5 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-black/40 hover:bg-black/70 text-white border border-white/10 backdrop-blur-md flex items-center justify-center transition-all z-20 hover:scale-105"
      >
        <FiChevronLeft className="text-2xl" />
      </button>

      <button
        onClick={nextSlide}
        aria-label="Next slide"
        className="absolute right-5 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-black/40 hover:bg-black/70 text-white border border-white/10 backdrop-blur-md flex items-center justify-center transition-all z-20 hover:scale-105"
      >
        <FiChevronRight className="text-2xl" />
      </button>

      {/* Bottom Slide Indicators */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex items-center gap-2 z-20">
        {slides.map((_, idx) => (
          <button
            key={idx}
            onClick={() => setCurrent(idx)}
            aria-label={`Go to slide ${idx + 1}`}
            className={`h-1.5 rounded-full transition-all duration-300 ${
              current === idx ? 'w-8 bg-[#FF4D00]' : 'w-2 bg-white/40 hover:bg-white/70'
            }`}
          />
        ))}
      </div>
    </section>
  );
};

export default Hero1;