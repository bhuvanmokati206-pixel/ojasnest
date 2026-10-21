# Implementation Tasks: Ojasnest Homepage Deals Section & Deals Page

## Task 1: Create Deals Data Model & Hardware Catalog ✅
**Description:** Define the `DealProduct` TypeScript interface and a rich promotional data set in `frontend/src/data/dealsData.ts`.

**Acceptance criteria:**
- [x] Export `DealProduct` interface extending `Product` with promotional fields.
- [x] Export curated list of 6 deal products referencing local product images.
- [x] Export helper utilities `calculateTimeLeft()`, `formatTime()`, and `spotlightDeal`.

**Files touched:**
- `frontend/src/data/dealsData.ts` ✅

---

## Task 2: Build Homepage Deals Section Component ✅
**Description:** Created `frontend/src/components/shop/DealsSection.tsx`.

**Acceptance criteria:**
- [x] Live ticking countdown timer (hours:minutes:seconds).
- [x] Status indicators: pulsing flash deal badge, animated ambient glow, schematic grid.
- [x] Category filter pills (`All`, `Flash Deals`, `Trimmers`, `GaN Power`, `Wireless`, `Bundles`).
- [x] Deal Cards with discount badge, stock claim progress bar, star ratings, spec snippet, crossed-out price, Add to Cart button.
- [x] "Show more deals" CTA navigating to `/deal`.

**Files touched:**
- `frontend/src/components/shop/DealsSection.tsx` ✅

---

## Task 3: Build Dedicated Deals Page (deal.tsx) ✅
**Description:** Created `frontend/src/pages/deal.tsx`.

**Acceptance criteria:**
- [x] Hero banner with gradient, schematic grid, promo timer, and trust badges.
- [x] Spotlight / Deal-of-the-day bento banner with spec pills, big countdown, pricing, add-to-cart.
- [x] Search input, category filter pills, discount threshold filter, sort dropdown.
- [x] Full deals grid with stock progress bars, discount badges, and cart integration.
- [x] Empty state with "Reset Filters" action.
- [x] Guarantee strip (Price Match, 2yr Warranty, 30-Day Return, <24H Dispatch).

**Files touched:**
- `frontend/src/pages/deal.tsx` ✅

---

## Task 4: Integrate Deals Section into HomePage & Configure Routes ✅
**Acceptance criteria:**
- [x] `HomePage.tsx` renders `<DealsSection />` replacing static banner.
- [x] `App.tsx` registers both `/deal` and `/deals` routes.
- [x] Navbar includes `🔥 HOT DEALS` nav link to `/deal`.

**Files touched:**
- `frontend/src/pages/HomePage.tsx` ✅
- `frontend/src/App.tsx` ✅
- `frontend/src/components/common/Navbar.tsx` ✅

---

## Checkpoint: Core Features ✅
- [x] TypeScript + Vite production build passes with 0 errors
- [x] Build output: `dist/assets/index-Do9ERGFn.js 386.06 kB` (gzip: 116.32 kB)

---

## Task 5: End-to-End Build Verification ✅
- [x] `npm run build` passes with 0 warnings / errors
- [x] Walkthrough documentation created
