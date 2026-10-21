import { Product } from '../types';

const randomPrice = (min: number, max: number) =>
  Number((Math.random() * (max - min) + min).toFixed(2));

export const demoWirelessCharger: Product = {
  id: 'demo-ojasnest-wireless-charger',
  title: 'OJASNEST Wireless Charger',
  slug: 'ojasnest-wireless-charger',
  description:
    'A premium wireless charging pad with a smooth circular profile, efficient heat management, and a minimalist design made for daily desk setups.',
  price: randomPrice(59, 149),
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
};
