import { Product } from '../types';

// ─── Extended Deal Product Interface ──────────────────────────────────────────
export interface DealProduct extends Product {
  originalPrice: number;
  dealPrice: number;
  discountPercentage: number;
  dealBadge: string;
  claimedPercentage: number;
  claimedCount: number;
  totalStock: number;
  specSnippet: string;
  rating: number;
  reviewsCount: number;
  isFlashDeal: boolean;
  dealCategory: 'flash' | 'trimmers' | 'gan-power' | 'wireless' | 'bundles';
  endsInHours: number; // hours from now until deal expires
}

// ─── Time Helper ──────────────────────────────────────────────────────────────
export interface TimeLeft {
  hours: number;
  minutes: number;
  seconds: number;
}

export function calculateTimeLeft(endsInHours: number, startedAt: number): TimeLeft {
  const totalMs = endsInHours * 60 * 60 * 1000;
  const elapsed = Date.now() - startedAt;
  const remaining = Math.max(0, totalMs - (elapsed % totalMs));

  const hours = Math.floor(remaining / (1000 * 60 * 60));
  const minutes = Math.floor((remaining % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((remaining % (1000 * 60)) / 1000);

  return { hours, minutes, seconds };
}

export function formatTime(n: number): string {
  return String(n).padStart(2, '0');
}

// ─── Live Deal Catalog ────────────────────────────────────────────────────────
export const dealsData: DealProduct[] = [
  {
    // Flash Deal: Precision Trimmer
    id: 'deal-ojasnest-precision-trimmer',
    title: 'OJASNEST Precision Trimmer',
    slug: 'ojasnest-precision-trimmer',
    description:
      'A compact grooming trimmer with a precision cutting head and a comfortable, easy-to-control design. Dual ceramic-coated cutters, USB-C rapid charging, and waterproof IPX5 housing.',
    price: 549,
    stock: 7,
    images: [
      '/products/ojasnest-trimmer-front.png',
      '/products/ojasnest-trimmer-side.png',
      '/products/ojasnest-trimmer-rear.png',
      '/products/ojasnest-trimmer-detail.png',
    ],
    featured: true,
    categoryId: 'grooming',
    category: { id: 'grooming', name: 'Trimmers', slug: 'grooming' },

    originalPrice: 800,
    dealPrice: 549,
    discountPercentage: 31,
    dealBadge: '⚡ FLASH DROP',
    claimedPercentage: 83,
    claimedCount: 47,
    totalStock: 57,
    specSnippet: 'Titanium Blade · USB-C · IPX5 · 90 min runtime',
    rating: 4.8,
    reviewsCount: 214,
    isFlashDeal: true,
    dealCategory: 'trimmers',
    endsInHours: 6,
  },
  {
    // Nose Trimmer Deal
    id: 'deal-ojasnest-nose-trimmer',
    title: 'OJASNEST Nose Trimmer',
    slug: 'ojasnest-nose-trimmer',
    description:
      'A precision nose trimmer built for clean, comfortable detailing with a smooth, easy-grip profile and all-day control.',
    price: 69,
    stock: 18,
    images: [
      '/products/ojasnest-nose-trimmer-front.png',
      '/products/ojasnest-nose-trimmer-side.png',
      '/products/ojasnest-nose-trimmer-rear.png',
      '/products/ojasnest-nose-trimmer-detail.png',
    ],
    featured: true,
    categoryId: 'grooming',
    category: { id: 'grooming', name: 'Trimmers', slug: 'grooming' },

    originalPrice: 119,
    dealPrice: 69,
    discountPercentage: 42,
    dealBadge: '🔥 HOT DEAL',
    claimedPercentage: 61,
    claimedCount: 23,
    totalStock: 38,
    specSnippet: 'Self-Honing Blades · 45-min Charge · Waterproof',
    rating: 4.6,
    reviewsCount: 97,
    isFlashDeal: false,
    dealCategory: 'trimmers',
    endsInHours: 18,
  },
  {
    // GaN Power Bank Deal
    id: 'deal-ojasnest-gan-power-bank',
    title: 'OJASNEST GaN Power Bank',
    slug: 'ojasnest-gan-power-bank',
    description:
      'A compact GaN power bank with fast, efficient charging, a rugged matte finish, and a sleek profile built to keep your devices ready all day.',
    price: 89,
    stock: 22,
    images: [
      '/products/ojasnest-gan-power-bank-front.png',
      '/products/ojasnest-gan-power-bank-side.png',
      '/products/ojasnest-gan-power-bank-rear.png',
      '/products/ojasnest-gan-power-bank-detail.png',
    ],
    featured: true,
    categoryId: 'chargers',
    category: { id: 'chargers', name: 'GaN Power Bank', slug: 'chargers' },

    originalPrice: 149,
    dealPrice: 89,
    discountPercentage: 40,
    dealBadge: '⚡ FLASH DROP',
    claimedPercentage: 71,
    claimedCount: 31,
    totalStock: 44,
    specSnippet: 'GaN-III · 140W PD · 3-Port · Active Thermal Guard',
    rating: 4.9,
    reviewsCount: 338,
    isFlashDeal: true,
    dealCategory: 'gan-power',
    endsInHours: 4,
  },
  {
    // Wireless Charger Deal
    id: 'deal-ojasnest-wireless-charger',
    title: 'OJASNEST Wireless Charger',
    slug: 'ojasnest-wireless-charger',
    description:
      'A premium wireless charging pad with a smooth circular profile, efficient heat management, and a minimalist design made for daily desk setups.',
    price: 75,
    stock: 24,
    images: [
      '/products/ojasnest-wireless-charger-front.png',
      '/products/ojasnest-wireless-charger-side.png',
      '/products/ojasnest-wireless-charger-rear.png',
      '/products/ojasnest-wireless-charger-detail.png',
    ],
    featured: true,
    categoryId: 'wireless-chargers',
    category: {
      id: 'wireless-chargers',
      name: 'Wireless Chargers',
      slug: 'wireless-chargers',
    },

    originalPrice: 129,
    dealPrice: 75,
    discountPercentage: 42,
    dealBadge: '🔥 BEST VALUE',
    claimedPercentage: 54,
    claimedCount: 19,
    totalStock: 35,
    specSnippet: 'Qi2 15W · 100% Safe Temp Control · MagSafe Compat.',
    rating: 4.7,
    reviewsCount: 156,
    isFlashDeal: false,
    dealCategory: 'wireless',
    endsInHours: 24,
  },
  {
    // BUNDLE: Grooming + Power
    id: 'deal-ojasnest-grooming-power-bundle',
    title: 'Grooming + Power Bundle',
    slug: 'ojasnest-precision-trimmer', // link to trimmer detail page
    description:
      'The complete Ojasnest daily carry bundle: the Titanium Precision Trimmer paired with the GaN Power Bank. Everything you need, shipped together.',
    price: 589,
    stock: 12,
    images: [
      '/products/ojasnest-trimmer-front.png',
      '/products/ojasnest-gan-power-bank-front.png',
    ],
    featured: true,
    categoryId: 'chargers',
    category: { id: 'chargers', name: 'Bundles', slug: 'chargers' },

    originalPrice: 949,
    dealPrice: 589,
    discountPercentage: 38,
    dealBadge: '💎 BUNDLE SAVE',
    claimedPercentage: 91,
    claimedCount: 11,
    totalStock: 12,
    specSnippet: 'Trimmer + GaN Power Bank · FREE Priority Shipping',
    rating: 5.0,
    reviewsCount: 42,
    isFlashDeal: true,
    dealCategory: 'bundles',
    endsInHours: 3,
  },
  {
    // Wireless + Nose Trimmer bundle
    id: 'deal-ojasnest-desk-essentials-bundle',
    title: 'Desk Essentials Bundle',
    slug: 'ojasnest-wireless-charger', // links to wireless detail
    description:
      'The Ojasnest desk bundle: pairing the Mag Wireless Charger with the Nose Trimmer for a clean, minimal desk-to-bathroom carry essentials set.',
    price: 119,
    stock: 16,
    images: [
      '/products/ojasnest-wireless-charger-front.png',
      '/products/ojasnest-nose-trimmer-front.png',
    ],
    featured: false,
    categoryId: 'wireless-chargers',
    category: { id: 'wireless-chargers', name: 'Bundles', slug: 'wireless-chargers' },

    originalPrice: 248,
    dealPrice: 119,
    discountPercentage: 52,
    dealBadge: '🎯 CLEARANCE',
    claimedPercentage: 43,
    claimedCount: 7,
    totalStock: 16,
    specSnippet: 'Wireless Charger + Nose Trimmer · Minimalist Set',
    rating: 4.5,
    reviewsCount: 29,
    isFlashDeal: false,
    dealCategory: 'bundles',
    endsInHours: 36,
  },
];

// ─── Spotlight / Deal-of-the-Day (always the highest-savings flash deal) ─────
export const spotlightDeal: DealProduct = dealsData.find((d) => d.isFlashDeal && d.endsInHours <= 4) ?? dealsData[2];
