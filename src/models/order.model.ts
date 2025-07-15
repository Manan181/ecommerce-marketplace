import type { Model, Types, Document } from 'mongoose';

import mongoose, { Schema } from 'mongoose';

export interface IOrder extends Document {
  _id: Types.ObjectId;
  orderNumber: string;
  customer: Types.ObjectId;
  items: Array<{
    product: Types.ObjectId;
    vendor: Types.ObjectId;
    name: string;
    sku: string;
    quantity: number;
    price: number;
    variants: Array<{
      name: string;
      value: string;
    }>;
    status?:
      | 'pending'
      | 'confirmed'
      | 'processing'
      | 'shipped'
      | 'delivered'
      | 'cancelled'
      | 'returned';
    trackingNumber?: string;
    shippedAt?: Date;
    deliveredAt?: Date;
  }>;
  shippingAddress: {
    firstName: string;
    lastName: string;
    email: string;
    phone?: string;
    street: string;
    city: string;
    state: string;
    zipCode: string;
    country: string;
  };
  billingAddress: {
    firstName: string;
    lastName: string;
    email: string;
    phone?: string;
    street: string;
    city: string;
    state: string;
    zipCode: string;
    country: string;
  };
  payment: {
    method: 'credit_card' | 'debit_card' | 'paypal' | 'stripe' | 'bank_transfer' | 'crypto';
    status?: 'pending' | 'processing' | 'completed' | 'failed' | 'refunded' | 'cancelled';
    transactionId?: string;
    paymentIntentId?: string;
    paidAt?: Date;
    walletAddress?: string;
    txHash?: string;
    blockNumber?: number;
    gasUsed?: number;
  };
  pricing: {
    subtotal: number;
    discount?: number;
    tax: number;
    shipping: number;
    total: number;
  };
  appliedCoupon?: {
    code?: string;
    discount?: number;
  };
  status?:
    | 'pending'
    | 'confirmed'
    | 'processing'
    | 'shipped'
    | 'delivered'
    | 'cancelled'
    | 'returned';
  notes?: string;
  adminNotes?: string;
  timeline?: Array<{
    status: string;
    timestamp?: Date;
    note?: string;
    updatedBy?: Types.ObjectId | string;
  }>;
  estimatedDelivery?: Date;
  actualDelivery?: Date;
  isGift?: boolean;
  giftMessage?: string;
  createdAt?: Date;
  updatedAt?: Date;
}

const OrderSchema: Schema<IOrder> = new Schema<IOrder>(
  {
    orderNumber: {
      type: String,
      required: true,
      unique: true,
    },
    customer: {
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
        vendor: {
          type: mongoose.Schema.ObjectId,
          ref: 'User',
          required: true,
        },
        name: { type: String, required: true },
        sku: { type: String, required: true },
        quantity: { type: Number, required: true, min: 1 },
        price: { type: Number, required: true, min: 0 },
        variants: [
          {
            name: { type: String, required: true },
            value: { type: String, required: true },
          },
        ],
        status: {
          type: String,
          enum: [
            'pending',
            'confirmed',
            'processing',
            'shipped',
            'delivered',
            'cancelled',
            'returned',
          ],
          default: 'pending',
        },
        trackingNumber: { type: String },
        shippedAt: { type: Date },
        deliveredAt: { type: Date },
      },
    ],
    shippingAddress: {
      firstName: { type: String, required: true },
      lastName: { type: String, required: true },
      email: { type: String, required: true },
      phone: { type: String },
      street: { type: String, required: true },
      city: { type: String, required: true },
      state: { type: String, required: true },
      zipCode: { type: String, required: true },
      country: { type: String, required: true },
    },
    billingAddress: {
      firstName: { type: String, required: true },
      lastName: { type: String, required: true },
      email: { type: String, required: true },
      phone: { type: String },
      street: { type: String, required: true },
      city: { type: String, required: true },
      state: { type: String, required: true },
      zipCode: { type: String, required: true },
      country: { type: String, required: true },
    },
    payment: {
      method: {
        type: String,
        enum: ['credit_card', 'debit_card', 'paypal', 'stripe', 'bank_transfer', 'crypto'],
        required: true,
      },
      status: {
        type: String,
        enum: ['pending', 'processing', 'completed', 'failed', 'refunded', 'cancelled'],
        default: 'pending',
      },
      transactionId: { type: String },
      paymentIntentId: { type: String }, // For Stripe
      paidAt: { type: Date },
      // Web3 payment fields
      walletAddress: { type: String },
      txHash: { type: String },
      blockNumber: { type: Number },
      gasUsed: { type: Number },
    },
    pricing: {
      subtotal: { type: Number, required: true, min: 0 },
      discount: { type: Number, default: 0, min: 0 },
      tax: { type: Number, required: true, min: 0 },
      shipping: { type: Number, required: true, min: 0 },
      total: { type: Number, required: true, min: 0 },
    },
    appliedCoupon: {
      code: { type: String },
      discount: { type: Number, default: 0 },
    },
    status: {
      type: String,
      enum: ['pending', 'confirmed', 'processing', 'shipped', 'delivered', 'cancelled', 'returned'],
      default: 'pending',
    },
    notes: { type: String },
    adminNotes: { type: String },
    timeline: [
      {
        status: { type: String, required: true },
        timestamp: { type: Date, default: Date.now },
        note: { type: String },
        updatedBy: { type: mongoose.Schema.ObjectId, ref: 'User' },
      },
    ],
    estimatedDelivery: { type: Date },
    actualDelivery: { type: Date },
    isGift: { type: Boolean, default: false },
    giftMessage: { type: String },
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

// Indexes for performance
OrderSchema.index({ orderNumber: 1 });
OrderSchema.index({ customer: 1 });
OrderSchema.index({ status: 1 });
OrderSchema.index({ 'payment.status': 1 });
OrderSchema.index({ createdAt: -1 });
OrderSchema.index({ 'items.vendor': 1 });

// Pre-save middleware to generate order number
OrderSchema.pre('save', async function generateOrderNumber(next) {
  if (!this.orderNumber) {
    const count = await (this.constructor as Model<IOrder>).countDocuments();
    this.orderNumber = `ORD-${Date.now()}-${String(count + 1).padStart(4, '0')}`;
  }
  next();
});

// Virtual for vendors involved
OrderSchema.virtual('vendorsInvolved').get(function getVendorsInvolved() {
  return [...new Set(this.items.map((item) => item.vendor.toString()))];
});

const Order: Model<IOrder> = mongoose.models.Order || mongoose.model<IOrder>('Order', OrderSchema);

export default Order;
