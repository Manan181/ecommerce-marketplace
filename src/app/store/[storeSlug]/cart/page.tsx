'use client';

import React from 'react';
import { useCart } from '../_context/cart-context';
import Image from 'next/image';
import Link from 'next/link';

export default function CartPage() {
  const { cartItems, removeFromCart, updateQuantity, clearCart } = useCart();
  const storeSlug = window.location.pathname.split('/')[2];

  const totalPrice = cartItems.reduce((total, item) => total + item.price * item.quantity, 0);

  return (
    <div className="cart-page">
      <h1>Shopping Cart</h1>
      {cartItems.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <div className="cart-container">
          <div className="cart-items">
            {cartItems.map((item) => (
              <div key={item.id} className="cart-item">
                <Image src={item.imageUrl} alt={item.name} width={100} height={100} />
                <div className="item-details">
                  <h2>{item.name}</h2>
                  <p>Price: ${item.price}</p>
                  <div className="quantity-control">
                    <button onClick={() => updateQuantity(item.id, item.quantity - 1)}>-</button>
                    <span>{item.quantity}</span>
                    <button onClick={() => updateQuantity(item.id, item.quantity + 1)}>+</button>
                  </div>
                  <button onClick={() => removeFromCart(item.id)}>Remove</button>
                </div>
              </div>
            ))}
          </div>
          <div className="cart-summary">
            <h2>Cart Summary</h2>
            <p>Total: ${totalPrice.toFixed(2)}</p>
            <button onClick={clearCart}>Clear Cart</button>
            <Link href={`/store/${storeSlug}/checkout`}>
              <button className="checkout-btn">Checkout</button>
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}

