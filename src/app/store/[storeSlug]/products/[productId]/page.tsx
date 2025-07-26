'use client';

import React, { useEffect, useState } from 'react';
import { Product } from '@/types/store';
import Image from 'next/image';
import { useCart } from '../../_context/cart-context';

type Props = {
  params: {
    storeSlug: string;
    productId: string;
  };
};

export default function ProductDetailPage({ params }: Props) {
  const [product, setProduct] = useState<Product | null>(null);
  const { addToCart } = useCart();

  useEffect(() => {
    async function fetchProduct() {
      const res = await fetch(`/api/store/${params.storeSlug}`);
      if (res.ok) {
        const data = await res.json();
        const product = data.products.find((p: Product) => p.id === params.productId);
        setProduct(product);
      }
    }
    fetchProduct();
  }, [params.storeSlug, params.productId]);

  if (!product) {
    return <div>Loading...</div>;
  }

  return (
    <div className="product-detail">
      <Image src={product.imageUrl} alt={product.name} width={400} height={400} />
      <div>
        <h1>{product.name}</h1>
        <p>{product.description}</p>
        <p>${product.price}</p>
        <button onClick={() => addToCart(product)}>Add to Cart</button>
      </div>
    </div>
  );
}