'use client';

import React from 'react';
import Link from 'next/link';

export default function CheckoutPage() {
  const storeSlug = window.location.pathname.split('/')[2];

  return (
    <div className="checkout-page">
      <h1>Checkout</h1>
      <div className="checkout-container">
        <div className="shipping-form">
          <h2>Shipping Information</h2>
          <form>
            <input type="text" placeholder="Full Name" />
            <input type="text" placeholder="Address" />
            <input type="text" placeholder="City" />
            <input type="text" placeholder="State" />
            <input type="text" placeholder="Zip Code" />
          </form>
        </div>
        <div className="payment-form">
          <h2>Payment Information</h2>
          <form>
            <input type="text" placeholder="Card Number" />
            <input type="text" placeholder="Expiration Date (MM/YY)" />
            <input type="text" placeholder="CVV" />
          </form>
        </div>
      </div>
      <Link href={`/store/${storeSlug}/checkout/confirmation`}>
        <button className="place-order-btn">Place Order</button>
      </Link>
    </div>
  );
}
