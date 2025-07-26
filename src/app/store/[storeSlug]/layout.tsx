'use client';

import './store.css';

import type { Store } from '@/types/store';

import React, { useState, useEffect } from 'react';

import Loading from './loading';
import Header from './_components/header';
import Footer from './_components/footer';
import { CartProvider } from './_context/cart-context';

type Props = {
  children: React.ReactNode;
  params: {
    storeSlug: string;
  };
};

export default function StoreLayout({ children, params }: Props) {
  console.log(`🚀 ~ StoreLayout ~ params:`, params);
  const [store, setStore] = useState<Store | null>(null);

  useEffect(() => {
    async function fetchStore() {
      const res = await fetch(`/api/store/${params.storeSlug}`);
      console.log(`🚀 ~ fetchStore ~ res:`, res);
      if (res.ok) {
        const data = await res.json();
        setStore(data);
      }
    }
    fetchStore();
  }, [params.storeSlug]);

  useEffect(() => {
    if (store) {
      document.documentElement.style.setProperty('--primary-color', store.theme.primaryColor);
      document.documentElement.style.setProperty('--secondary-color', store.theme.secondaryColor);
    }
  }, [store]);

  if (!store) {
    return <Loading />;
  }

  return (
    <CartProvider>
      <div style={{ fontFamily: store.theme.font }}>
        <Header storeSlug={params.storeSlug} storeName={store.name} logoUrl={store.logoUrl} />
        <main>{children}</main>
        <Footer />
      </div>
    </CartProvider>
  );
}
