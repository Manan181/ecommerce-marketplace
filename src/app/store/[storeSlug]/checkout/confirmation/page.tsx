'use client';

import React from 'react';
import Link from 'next/link';

export default function OrderConfirmationPage() {
  const storeSlug = window.location.pathname.split('/')[2];

  return (
    <div className="order-confirmation-page">
      <h1>Thank you for your order!</h1>
      <p>Your order has been placed successfully.</p>
      <Link href={`/store/${storeSlug}`}>
        <button>Continue Shopping</button>
      </Link>
    </div>
  );
}
