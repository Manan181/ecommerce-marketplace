import type { Model, Types, Document } from 'mongoose';

import mongoose, { Schema } from 'mongoose';

export interface ICoupon extends Document {
  _id: Types.ObjectId;
  code: string;
  name: string;
  description?: string;
  type: 'percentage' | 'fixed' | 'free_shipping' | 'buy_x_get_y';
  value: number;
  minimumAmount?: number;
  maximumDiscount?: number;
  usageLimit?: number | null;
  usageCount?: number;
  userLimit?: number;
  validFrom: Date;
  validUntil: Date;
  applicableProducts?: Array<Types.ObjectId | string>;
  applicableCategories?: Array<Types.ObjectId | string>;
  excludeProducts?: Array<Types.ObjectId | string>;
  excludeCategories?: Array<Types.ObjectId | string>;
  applicableUsers?: Array<Types.ObjectId | string>;
  vendor?: Types.ObjectId | string;
  isActive?: boolean;

  // Specific to buy_x_get_y type
  buyQuantity?: number;
  getQuantity?: number;
  getDiscount?: number;

  createdBy: Types.ObjectId | string;

  createdAt?: Date;
  updatedAt?: Date;
}

const CouponSchema: Schema<ICoupon> = new Schema<ICoupon>(
  {
    code: {
      type: String,
      required: true,
      unique: true,
      uppercase: true,
      trim: true,
    },
    name: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      trim: true,
    },
    type: {
      type: String,
      enum: ['percentage', 'fixed', 'free_shipping', 'buy_x_get_y'],
      required: true,
    },
    value: {
      type: Number,
      required: true,
      min: 0,
    },
    minimumAmount: {
      type: Number,
      default: 0,
      min: 0,
    },
    maximumDiscount: {
      type: Number,
      min: 0,
    },
    usageLimit: {
      type: Number,
      default: null,
    },
    usageCount: {
      type: Number,
      default: 0,
    },
    userLimit: {
      type: Number,
      default: 1,
    },
    validFrom: {
      type: Date,
      required: true,
    },
    validUntil: {
      type: Date,
      required: true,
    },
    applicableProducts: [
      {
        type: mongoose.Schema.ObjectId,
        ref: 'Product',
      },
    ],
    applicableCategories: [
      {
        type: mongoose.Schema.ObjectId,
        ref: 'Category',
      },
    ],
    excludeProducts: [
      {
        type: mongoose.Schema.ObjectId,
        ref: 'Product',
      },
    ],
    excludeCategories: [
      {
        type: mongoose.Schema.ObjectId,
        ref: 'Category',
      },
    ],
    applicableUsers: [
      {
        type: mongoose.Schema.ObjectId,
        ref: 'User',
      },
    ],
    vendor: {
      type: mongoose.Schema.ObjectId,
      ref: 'User',
    },
    isActive: {
      type: Boolean,
      default: true,
    },
    // For buy_x_get_y coupons
    buyQuantity: { type: Number },
    getQuantity: { type: Number },
    getDiscount: { type: Number }, // Percentage discount on Y items

    createdBy: {
      type: mongoose.Schema.ObjectId,
      ref: 'User',
      required: true,
    },
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

// Indexes
CouponSchema.index({ code: 1 });
CouponSchema.index({ validFrom: 1, validUntil: 1 });
CouponSchema.index({ isActive: 1 });
CouponSchema.index({ vendor: 1 });

// Virtual for validity check
CouponSchema.virtual('isValid').get(function isValidCoupon() {
  const now = new Date();
  return (
    this.isActive &&
    this.validFrom <= now &&
    this.validUntil >= now &&
    (this.usageLimit === null || (this.usageCount ?? 0) < (this.usageLimit ?? Infinity))
  );
});

// Method to check if coupon is applicable to user
CouponSchema.methods.isApplicableToUser = function isCouponApplicableToUser(
  userId: Types.ObjectId | string
) {
  if (this.applicableUsers.length === 0) return true;
  return this.applicableUsers.includes(userId);
};

// Method to check if coupon is applicable to product
CouponSchema.methods.isApplicableToProduct = function isCouponApplicableToProduct(
  productId: Types.ObjectId | string,
  categoryId: Types.ObjectId | string
) {
  // Check exclusions first
  if (this.excludeProducts.includes(productId)) return false;
  if (this.excludeCategories.includes(categoryId)) return false;

  // If no specific inclusions, apply to all
  if (this.applicableProducts.length === 0 && this.applicableCategories.length === 0) {
    return true;
  }

  // Check inclusions
  return (
    this.applicableProducts.includes(productId) || this.applicableCategories.includes(categoryId)
  );
};

const Coupon: Model<ICoupon> = mongoose.models.Coupon || mongoose.model('Coupon', CouponSchema);

export default Coupon;
