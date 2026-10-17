import { Product } from '../types';

export const demoTrimmer: Product = {
  id: 'demo-ojasnest-precision-trimmer',
  title: 'OJASNEST Precision Trimmer',
  slug: 'ojasnest-precision-trimmer',
  description:
    'A compact grooming trimmer with a precision cutting head and a comfortable, easy-to-control design. Explore the front, side and rear views to see the details up close.',
  price: 800,
  stock: 25,
  images: [
    '/products/ojasnest-trimmer-front.png',
    '/products/ojasnest-trimmer-side.png',
    '/products/ojasnest-trimmer-rear.png',
    '/products/ojasnest-trimmer-detail.png',
  ],
  featured: true,
  categoryId: 'grooming',
  category: {
    id: 'grooming',
    name: 'Trimmers',
    slug: 'grooming',
  },
};
