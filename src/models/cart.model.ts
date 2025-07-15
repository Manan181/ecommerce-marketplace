import type { Model, Types, Document } from 'mongoose';

import mongoose, { Schema } from 'mongoose';

export interface ICart extends Document {
  _id: Types.ObjectId;
  user: Types.ObjectId;
  items: Array<{
    product: Types.ObjectId;
    quantity: number;
    price: number;
    variants: Array<{
      name: string;
      value: string;
    }>;
    addedAt?: Date;
  }>;
  appliedCoupon?: Types.ObjectId;
  totals?: {
    subtotal?: number;
    discount?: number;
    tax?: number;
    shipping?: number;
    total?: number;
  };
  isActive?: boolean;
  expiresAt?: Date;
  createdAt?: Date;
  updatedAt?: Date;
}

const CartSchema: Schema<ICart> = new Schema<ICart>(
  {
    user: {
      type: mongoose.Schema.ObjectId,
      ref: 'User',
      required: true,
    },
    items: [
      {
        product: {
          type: mongoose.Schema.ObjectId,
          ref: 'Product',
          required: true,
        },
        quantity: {
          type: Number,
          required: true,
          min: 1,
          default: 1,
        },
        price: {
          type: Number,
          required: true,
          min: 0,
        },
        variants: [
          {
            name: { type: String, required: true },
            value: { type: String, required: true },
          },
        ],
        addedAt: {
          type: Date,
          default: Date.now,
        },
      },
    ],
    appliedCoupon: {
      type: mongoose.Schema.ObjectId,
      ref: 'Coupon',
    },
    totals: {
      subtotal: { type: Number, default: 0 },
      discount: { type: Number, default: 0 },
      tax: { type: Number, default: 0 },
      shipping: { type: Number, default: 0 },
      total: { type: Number, default: 0 },
    },
    isActive: {
      type: Boolean,
      default: true,
    },
    expiresAt: {
      type: Date,
      default: Date.now,
      expires: 2592000, // 30 days
    },
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

// Indexes
CartSchema.index({ user: 1 });
CartSchema.index({ isActive: 1 });
CartSchema.index({ expiresAt: 1 });

// Virtual for items count
CartSchema.virtual('itemsCount').get(function getItemsCount() {
  return this.items.reduce((total, item) => total + item.quantity, 0);
});

// Method to calculate totals
CartSchema.methods.calculateTotals = async function calculateTotals() {
  const subtotal = this.items.reduce(
    (sum: number, item: { price: number; quantity: number }) => sum + item.price * item.quantity,
    0
  );

  let discount = 0;
  if (this.appliedCoupon) {
    await this.populate('appliedCoupon');
    if (this.appliedCoupon.type === 'percentage') {
      discount = (subtotal * this.appliedCoupon.value) / 100;
    } else {
      discount = this.appliedCoupon.value;
    }
    discount = Math.min(discount, subtotal);
  }

  const tax = (subtotal - discount) * 0.08; // 8% tax rate
  const shipping = subtotal > 100 ? 0 : 10; // Free shipping over $100
  const total = subtotal - discount + tax + shipping;

  this.totals = { subtotal, discount, tax, shipping, total };
  return this.totals;
};

const Cart: Model<ICart> = mongoose.models.Cart || mongoose.model<ICart>('Cart', CartSchema);

export default Cart;
