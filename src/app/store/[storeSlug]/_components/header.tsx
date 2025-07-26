import React from 'react';
import Link from 'next/link';
import Image from 'next/image';

type Props = {
  storeSlug: string;
  storeName: string;
  logoUrl?: string;
};

export default function Header({ storeSlug, storeName, logoUrl }: Props) {
  return (
    <header>
      <nav>
        <Link href={`/store/${storeSlug}`}>
          {logoUrl ? (
            <Image src={logoUrl} alt={storeName} width={100} height={50} />
          ) : (
            <h1>{storeName}</h1>
          )}
        </Link>
        <Link href={`/store/${storeSlug}/products`}>Products</Link>
        <Link href={`/store/${storeSlug}/cart`}>Cart</Link>
      </nav>
    </header>
  );
}
