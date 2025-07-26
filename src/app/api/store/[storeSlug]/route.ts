import type { Store } from '@/types/store';

import { NextResponse } from 'next/server';

const stores: Store[] = [
  {
    id: '1',
    slug: 'my-store',
    name: 'My Awesome Store',
    logoUrl: '/logo/logo-full.png',
    theme: {
      primaryColor: '#007bff',
      secondaryColor: '#6c757d',
      font: 'Roboto',
    },
    products: [
      {
        id: 'prod1',
        name: 'Product 1',
        description: 'This is product 1',
        price: 29.99,
        imageUrl: '/assets/images/product/product-1.jpg',
      },
      {
        id: 'prod2',
        name: 'Product 2',
        description: 'This is product 2',
        price: 39.99,
        imageUrl: '/assets/images/product/product-2.jpg',
      },
    ],
  },
  {
    id: '2',
    slug: 'another-store',
    name: 'Another Great Store',
    logoUrl: '/logo/logo-single.svg',
    theme: {
      primaryColor: '#28a745',
      secondaryColor: '#ffc107',
      font: 'Arial',
    },
    products: [
      {
        id: 'prod3',
        name: 'Product 3',
        description: 'This is product 3',
        price: 49.99,
        imageUrl: '/assets/images/product/product-3.jpg',
      },
      {
        id: 'prod4',
        name: 'Product 4',
        description: 'This is product 4',
        price: 59.99,
        imageUrl: '/assets/images/product/product-4.jpg',
      },
    ],
  },
];

export async function GET(request: Request, { params }: { params: { storeSlug: string } }) {
  console.log(`🚀 ~ GET ~ request:`, request);
  console.log(`🚀 ~ GET ~ params:`, params);
  const { storeSlug } = params;
  const store = stores.find((s) => s.slug === storeSlug);

  if (store) {
    return NextResponse.json(store);
  }
  return NextResponse.json({ message: 'Store not found' }, { status: 404 });
}
