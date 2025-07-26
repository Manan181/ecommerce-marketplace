'use client';

import React, { useEffect, useState } from 'react';
import { Product } from '@/types/store';
import Image from 'next/image';
import Link from 'next/link';
import { useCart } from '../_context/cart-context';

export default function ProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const { addToCart } = useCart();
  const [storeSlug, setStoreSlug] = useState('');

  useEffect(() => {
    const slug = window.location.pathname.split('/')[2];
    setStoreSlug(slug);
    async function fetchProducts() {
      const res = await fetch(`/api/store/${slug}`);
      if (res.ok) {
        const data = await res.json();
        setProducts(data.products);
      }
    }
    fetchProducts();
  }, []);

  return (
    <div className="products-grid">
      {products.map((product) => (
        <div key={product.id} className="product-card">
          <Link href={`/store/${storeSlug}/products/${product.id}`}>
            <Image src={product.imageUrl} alt={product.name} width={200} height={200} />
            <h2>{product.name}</h2>
          </Link>
          <p>{product.description}</p>
          <p>${product.price}</p>
          <button onClick={() => addToCart(product)}>Add to Cart</button>
        </div>
      ))}
    </div>
  );
}
