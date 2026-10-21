import { Product } from '../types';

const randomPrice = (min: number, max: number) =>
  Number((Math.random() * (max - min) + min).toFixed(2));

export const demoGaNPowerBank: Product = {
  id: 'demo-ojasnest-gan-power-bank',
  title: 'OJASNEST GaN Power Bank',
  slug: 'ojasnest-gan-power-bank',
  description:
    'A compact GaN power bank with fast, efficient charging, a rugged matte finish, and a sleek profile built to keep your devices ready all day.',
  price: randomPrice(79, 189),
  stock: 22,
  images: [
    '/products/ojasnest-gan-power-bank-front.png',
    '/products/ojasnest-gan-power-bank-side.png',
    '/products/ojasnest-gan-power-bank-rear.png',
    '/products/ojasnest-gan-power-bank-detail.png',
  ],
  featured: true,
  categoryId: 'chargers',
  category: {
    id: 'chargers',
    name: 'GaN Power Bank',
    slug: 'chargers',
  },
};
