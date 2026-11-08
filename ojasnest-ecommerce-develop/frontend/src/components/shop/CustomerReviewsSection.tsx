import React, { useState } from 'react';
import { FiArrowLeft, FiArrowRight, FiCheck } from 'react-icons/fi';

interface ReviewItem {
  id: number;
  text: string;
  author: string;
  role: string;
}

const REVIEWS: ReviewItem[] = [
  // ─── Set 1 (Reviews 1 - 4) ──────────────────────────────────────────────────
  {
    id: 1,
    text: "Few grooming tools stand the test of constant travel and morning rush hours, but this trimmer delivers every single day. It's earned a permanent place in my dopp kit.",
    author: "Marcus Vance",
    role: "Verified Buyer · London, UK",
  },
  {
    id: 2,
    text: "One trimmer now handles my beard, chest, and body grooming without needing a drawer full of loose attachments. The titanium precision edge makes clean work effortlessly.",
    author: "David Sterling",
    role: "Verified Buyer · Berlin, DE",
  },
  {
    id: 3,
    text: "The ceramic blade feels remarkably gentle on sensitive neck areas and still delivers a razor-crisp line. Zero tugging, zero irritation even on 3-day dry growth.",
    author: "Liam K.",
    role: "Verified Buyer · Manchester, UK",
  },
  {
    id: 4,
    text: "The Type-C fast charging is genuinely convenient. I charge it using the exact same GaN cable I use for my laptop and phone. One full charge lasted me a 3-week trip.",
    author: "Oliver Chen",
    role: "Verified Buyer · Edinburgh, UK",
  },

  // ─── Set 2 (Reviews 5 - 8) ──────────────────────────────────────────────────
  {
    id: 5,
    text: "Flash charging, indestructible build, and whisper-quiet motor. I’ve gone through 4 different brands over the years and this completely outclasses all of them.",
    author: "Alexander Reed",
    role: "Verified Buyer · Bristol, UK",
  },
  {
    id: 6,
    text: "The GaN power bank charges my laptop and phone simultaneously at peak wattage without getting burning hot. The matte cyber finish feels like premium aerospace gear.",
    author: "Julian Frost",
    role: "Verified Buyer · Stockholm, SE",
  },
  {
    id: 7,
    text: "The wireless charging pad is so sleek on my desk. Magnetic lock is firm, night light is non-intrusive, and it charges twice as fast as my previous pad.",
    author: "Sebastian Cole",
    role: "Verified Buyer · Dublin, IE",
  },
  {
    id: 8,
    text: "Self-honing blades are no gimmick. After 4 months of weekly trimming, the cut is just as surgical and sharp as Day 1. The ergonomics are exceptional.",
    author: "Noah Bennett",
    role: "Verified Buyer · Amsterdam, NL",
  },

  // ─── Set 3 (Reviews 9 - 12) ─────────────────────────────────────────────────
  {
    id: 9,
    text: "Compact enough for my gym bag, powerful enough to shave heavy stubble in one continuous pass. The waterproof housing makes cleaning it under the sink effortless.",
    author: "Ethan Wright",
    role: "Verified Buyer · Toronto, CA",
  },
  {
    id: 10,
    text: "The battery display indicator actually gives honest minutes remaining. Never died mid-fade on me once. Build quality is solid metal, not creaky plastic.",
    author: "Lucas Meyer",
    role: "Verified Buyer · Zurich, CH",
  },
  {
    id: 11,
    text: "Switched from a high-end salon brand to Ojasnest and honestly couldn't be happier. The zero-gap cut accuracy for clean cheek lines is unbelievable.",
    author: "Gabriel Santos",
    role: "Verified Buyer · Madrid, ES",
  },
  {
    id: 12,
    text: "Fastest customer support and delivery I have experienced. Product arrived in military-grade packaging with high-spec braided USB-C cables. 10/10.",
    author: "Kieran Hughes",
    role: "Verified Buyer · Melbourne, AU",
  },
];

const SET_SIZE = 4;
const TOTAL_SETS = Math.ceil(REVIEWS.length / SET_SIZE); // 3 sets of 4

export const CustomerReviewsSection: React.FC = () => {
  const [currentSet, setCurrentSet] = useState(0);

  const prev = () => {
    setCurrentSet((s) => (s === 0 ? TOTAL_SETS - 1 : s - 1));
  };

  const next = () => {
    setCurrentSet((s) => (s === TOTAL_SETS - 1 ? 0 : s + 1));
  };

  const visibleReviews = REVIEWS.slice(currentSet * SET_SIZE, (currentSet + 1) * SET_SIZE);

  return (
    <section className="relative border-y border-white/[0.08] bg-[#090B0E] py-20 overflow-hidden select-none">
      {/* Background radial glow */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_50%_40%,rgba(255,77,0,0.06),transparent_70%)]" />

      <div className="relative mx-auto max-w-[1440px] px-4 sm:px-6 lg:px-8">
        {/* Header with sticky note badge */}
        <div className="flex flex-col items-center text-center mb-16">
          <div className="relative inline-block mb-3">
            <span className="font-mono text-xs font-bold uppercase tracking-[0.25em] text-[#FF4D00]">
              CUSTOMER REVIEWS
            </span>

            {/* Sticky note badge */}
            <span className="absolute -top-4 -right-28 rotate-[6deg] rounded bg-[#FF4D00] px-2.5 py-0.5 font-mono text-[10px] font-extrabold text-white shadow-lg tracking-wider">
              +counting...
            </span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight">
            Built for real routines.
          </h2>
          <p className="mt-3 max-w-xl text-sm text-neutral-400 font-sans">
            12 verified experiences from men who expect precision, endurance, and zero compromise.
          </p>
        </div>

        {/* 4 Cards Side-by-Side Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 items-stretch pt-5">
          {visibleReviews.map((review, idx) => {
            // Alternate colors: White Card vs Signal Orange Card
            const isWhiteCard = idx % 2 === 0;

            return (
              <div
                key={review.id}
                className={`group relative flex flex-col justify-between p-6 sm:p-7 transition-all duration-300 rounded-3xl ${
                  isWhiteCard
                    ? 'bg-white text-neutral-900 border border-white shadow-[0_10px_30px_rgba(255,255,255,0.08)] hover:shadow-[0_15px_35px_rgba(255,255,255,0.18)] hover:-translate-y-1'
                    : 'bg-[#FF4D00] text-white border border-[#FF4D00] shadow-[0_10px_35px_rgba(255,77,0,0.35)] hover:shadow-[0_15px_45px_rgba(255,77,0,0.55)] hover:-translate-y-1'
                }`}
                style={{
                  clipPath: 'polygon(0 0, 100% 0, 100% 100%, 32px 100%, 0 calc(100% - 32px))',
                }}
              >
                {/* Authentic Double Quotation Mark Glyph from Reference Image */}
                <div className="absolute -top-5 left-1/2 -translate-x-1/2 z-20 flex items-center justify-center">
                  <svg
                    className="w-12 h-10 drop-shadow-[0_2px_10px_rgba(204,255,0,0.4)] transition-transform duration-300 group-hover:scale-110"
                    viewBox="0 0 48 38"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    {/* Left comma quote */}
                    <path
                      d="M19 12C19 5.37258 13.6274 0 7 0C3.13401 0 0 3.13401 0 7C0 13.6274 5.37258 19 12 19C12 25 8 32 1 37L4 38C13 35 19 26 19 17V12Z"
                      fill="#CCFF00"
                    />
                    {/* Right comma quote */}
                    <path
                      d="M48 12C48 5.37258 42.6274 0 36 0C32.134 0 29 3.13401 29 7C29 13.6274 34.3726 19 41 19C41 25 37 32 30 37L33 38C42 35 48 26 48 17V12Z"
                      fill="#CCFF00"
                    />
                  </svg>
                </div>

                {/* Corner folded notch accent */}
                <div
                  className={`pointer-events-none absolute bottom-0 left-0 w-8 h-8 ${
                    isWhiteCard
                      ? 'bg-gradient-to-tr from-neutral-300 to-transparent border-t border-r border-neutral-300'
                      : 'bg-gradient-to-tr from-[#992E00] to-transparent border-t border-r border-[#992E00]'
                  }`}
                />

                {/* Review Quote Body */}
                <div className="mt-4 pt-3">
                  <p
                    className={`font-mono text-xs sm:text-[13px] leading-relaxed font-medium ${
                      isWhiteCard ? 'text-neutral-900' : 'text-white'
                    }`}
                  >
                    {review.text}
                  </p>
                </div>

                {/* Author & Verified Tag */}
                <div
                  className={`mt-6 pt-4 flex items-center justify-between border-t ${
                    isWhiteCard ? 'border-neutral-200' : 'border-white/20'
                  }`}
                >
                  <div>
                    <h4
                      className={`text-xs font-bold tracking-wide ${
                        isWhiteCard ? 'text-neutral-900' : 'text-white'
                      }`}
                    >
                      {review.author}
                    </h4>
                    <p
                      className={`font-mono text-[9px] mt-0.5 ${
                        isWhiteCard ? 'text-neutral-500' : 'text-neutral-200'
                      }`}
                    >
                      {review.role}
                    </p>
                  </div>

                  <span
                    className={`inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-[9px] font-mono font-bold ${
                      isWhiteCard
                        ? 'bg-neutral-100 text-neutral-800 border border-neutral-300'
                        : 'bg-black/25 text-white border border-white/20'
                    }`}
                  >
                    <FiCheck className="text-[10px]" /> Verified
                  </span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Set Navigator Controls & Indicator Dots */}
        <div className="mt-12 flex items-center justify-center gap-6">
          <button
            onClick={prev}
            aria-label="Previous review set"
            className="p-3 rounded-full border border-white/10 bg-[#12151B] text-white hover:border-[#FF4D00] hover:text-[#FF4D00] hover:shadow-[0_0_15px_rgba(255,77,0,0.3)] transition-all active:scale-95"
          >
            <FiArrowLeft className="text-lg" />
          </button>

          {/* Pagination dots for the 3 sets */}
          <div className="flex items-center gap-2.5">
            {Array.from({ length: TOTAL_SETS }).map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrentSet(i)}
                aria-label={`Go to review set ${i + 1}`}
                className={`h-2 rounded-full transition-all duration-300 ${
                  currentSet === i ? 'w-8 bg-[#FF4D00]' : 'w-2 bg-white/20 hover:bg-white/40'
                }`}
              />
            ))}
          </div>

          <button
            onClick={next}
            aria-label="Next review set"
            className="p-3 rounded-full border border-white/10 bg-[#12151B] text-white hover:border-[#FF4D00] hover:text-[#FF4D00] hover:shadow-[0_0_15px_rgba(255,77,0,0.3)] transition-all active:scale-95"
          >
            <FiArrowRight className="text-lg" />
          </button>
        </div>

        {/* Micro Set Indicator */}
        <div className="text-center mt-3">
          <span className="font-mono text-[10px] text-neutral-500 uppercase tracking-widest">
            SET {currentSet + 1} OF {TOTAL_SETS} (4 REVIEWS PER VIEW)
          </span>
        </div>
      </div>
    </section>
  );
};
