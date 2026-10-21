import { Product } from '../types';

const randomPrice = (min: number, max: number) =>
  Number((Math.random() * (max - min) + min).toFixed(2));

export const demoNoseTrimmer: Product = {
  id: 'demo-ojasnest-nose-trimmer',
  title: 'OJASNEST Nose Trimmer',
  slug: 'ojasnest-nose-trimmer',
  description:
    'A precision nose trimmer built for clean, comfortable detailing with a smooth, easy-grip profile and all-day control.',
  price: randomPrice(49, 119),
  stock: 18,
  images: [
    '/products/ojasnest-nose-trimmer-front.png',
    '/products/ojasnest-nose-trimmer-side.png',
    '/products/ojasnest-nose-trimmer-rear.png',
    '/products/ojasnest-nose-trimmer-detail.png',
  ],
  featured: true,
  categoryId: 'grooming',
  category: {
    id: 'grooming',
    name: 'Trimmers',
    slug: 'grooming',
  },
};
