# Implementation Plan: Ojasnest Homepage Deals Section & Deals Page (deal.tsx)

## Overview
Implement an attractive, cyber-industrial themed Deals Section for the Ojasnest homepage (`HomePage.tsx`) and a dedicated Deals Page (`frontend/src/pages/deal.tsx`). The homepage section will display limited-time sale products with live countdown timers, discount badges, stock claim bars, category tabs, and an interactive "Show more" CTA. Clicking "Show more" will navigate to `/deal` (and `/deals`), rendering a comprehensive deals page with filtering, sorting, spotlight deal banners, and direct add-to-cart functionality.

## Architecture Decisions
- **Design System Alignment**: Dark industrial aesthetic (`#090B0E`, `#12151D`, `#161A22`), sharp typography (`font-mono` spec codes, bold headings), vibrant electric orange accents (`#FF4D00` / `#FF5722`), ambient radial glows, and sleek border transitions.
- **Resilient Data Layer**: Create `frontend/src/data/dealsData.ts` providing rich promotional metadata (original price, deal price, discount percentage, stock claim progress, countdown durations, tech specs snippet) on top of the existing Ojasnest hardware lineup. If backend API is reachable, dynamic products are merged; otherwise, high-definition hardware fallbacks are seamlessly displayed so the UI is always functional.
- **Component Modularity**: Build a dedicated `DealsSection.tsx` component imported into `HomePage.tsx` for clean separation of concerns and maintainability.
- **Comprehensive Routing**: In `App.tsx`, register both `/deal` and `/deals` pointing to `deal.tsx` so users and links work with both singular and plural paths.
- **Cart Integration**: Use `useCartStore` in all deal cards to enable instant 1-click cart addition with reactive feedback and navbar counter updates.

## Task List

### Phase 1: Foundation & Data Layer
- [ ] Task 1: Create Deals Data Model & Hardware Catalog (`frontend/src/data/dealsData.ts`)

### Checkpoint: Foundation
- [ ] Verify TypeScript types compile and mock data exports accurately

### Phase 2: Core Components & Pages
- [ ] Task 2: Build Homepage Deals Section Component (`frontend/src/components/shop/DealsSection.tsx`)
- [ ] Task 3: Build Dedicated Deals Page (`frontend/src/pages/deal.tsx`)
- [ ] Task 4: Integrate Deals Section into `HomePage.tsx` & Configure Routes in `App.tsx` and `Navbar.tsx`

### Checkpoint: Core Features
- [ ] Build succeeds with Vite & TypeScript
- [ ] Homepage renders deal section with live countdown, badges, and stock meters
- [ ] "Show more" navigates cleanly to `/deal`
- [ ] Deals page filtering, sorting, and add-to-cart work flawlessly

### Phase 3: Verification & Polish
- [ ] Task 5: Run full automated build check and manual responsiveness verification

### Checkpoint: Complete
- [ ] All acceptance criteria met
- [ ] Production ready

## Risks and Mitigations
| Risk | Impact | Mitigation |
|------|--------|------------|
| Backend API down or empty products | High | `dealsData.ts` contains rich fallback products with local images and prices so the UI never displays broken/empty states |
| Route mismatch (`/deal` vs `/deals`) | Medium | Register both `/deal` and `/deals` in `App.tsx` |
| Layout shifts from countdown timer | Low | Use tabular numbers (`font-mono`) and fixed width time slots |

## Open Questions
- None. Requirements are clear from user prompt and existing codebase structure.
