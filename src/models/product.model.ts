import type { Model, Types, Document } from 'mongoose';

import mongoose, { Schema } from 'mongoose';

export interface IProduct extends Document {
  _id: Types.ObjectId;
  name: string;
  slug: string;
  description: string;
  shortDescription?: string;
  sku: string;
  vendor: Types.ObjectId;
  category: Types.ObjectId;
  subcategory?: Types.ObjectId;
  pricing: {
    basePrice: number;
    salePrice?: number;
    costPrice?: number;
    currency?: string;
  };
  inventory: {
    stock: number;
    lowStockThreshold?: number;
    trackInventory?: boolean;
    allowBackorder?: boolean;
  };
  images?: Array<{
    url: string;
    alt?: string;
    isMain?: boolean;
  }>;
  specifications?: Array<{
    name: string;
    value: string;
  }>;
  variants?: Array<{
    name: string;
    options: string[];
  }>;
  tags?: string[];
  brand?: string;
  weight?: number;
  dimensions?: {
    length?: number;
    width?: number;
    height?: number;
    unit?: string;
  };
  shipping?: {
    freeShipping?: boolean;
    weight?: number;
    length?: number;
    width?: number;
    height?: number;
  };
  seo?: {
    metaTitle?: string;
    metaDescription?: string;
    metaKeywords?: string[];
  };
  status?: 'draft' | 'active' | 'inactive' | 'out_of_stock';
  featured?: boolean;
  views?: number;
  salesCount?: number;
  tokenId?: string;
  blockchainVerified?: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}

const ProductSchema: Schema<IProduct> = new Schema<IProduct>(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    slug: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
    },
    description: {
      type: String,
      required: true,
    },
    shortDescription: {
      type: String,
      maxlength: 300,
    },
    sku: {
      type: String,
      required: true,
      unique: true,
      uppercase: true,
    },
    vendor: {
      type: mongoose.Schema.ObjectId,
      ref: 'User',
      required: true,
    },
    category: {
      type: mongoose.Schema.ObjectId,
      ref: 'Category',
      required: true,
    },
    subcategory: {
      type: mongoose.Schema.ObjectId,
      ref: 'Category',
    },
    pricing: {
      basePrice: { type: Number, required: true, min: 0 },
      salePrice: { type: Number, min: 0 },
      costPrice: { type: Number, min: 0 }, // For vendor reference
      currency: { type: String, default: 'USD' },
    },
    inventory: {
      stock: { type: Number, required: true, min: 0, default: 0 },
      lowStockThreshold: { type: Number, default: 10 },
      trackInventory: { type: Boolean, default: true },
      allowBackorder: { type: Boolean, default: false },
    },
    images: [
      {
        url: { type: String, required: true },
        alt: { type: String },
        isMain: { type: Boolean, default: false },
      },
    ],
    specifications: [
      {
        name: { type: String, required: true },
        value: { type: String, required: true },
      },
    ],
    variants: [
      {
        name: { type: String, required: true }, // Color, Size, etc.
        options: [{ type: String, required: true }], // Red, Blue, etc.
      },
    ],
    tags: [{ type: String, trim: true }],
    brand: { type: String, trim: true },
    weight: { type: Number }, // in grams
    dimensions: {
      length: { type: Number },
      width: { type: Number },
      height: { type: Number },
      unit: { type: String, default: 'cm' },
    },
    shipping: {
      freeShipping: { type: Boolean, default: false },
      weight: { type: Number },
      length: { type: Number },
      width: { type: Number },
      height: { type: Number },
    },
    seo: {
      metaTitle: { type: String },
      metaDescription: { type: String },
      metaKeywords: [{ type: String }],
    },
    status: {
      type: String,
      enum: ['draft', 'active', 'inactive', 'out_of_stock'],
      default: 'draft',
    },
    featured: { type: Boolean, default: false },
    // Analytics
    views: { type: Number, default: 0 },
    salesCount: { type: Number, default: 0 },
    // Future blockchain integration
    tokenId: { type: String, unique: true, sparse: true },
    blockchainVerified: { type: Boolean, default: false },
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

// Indexes for performance optimization
ProductSchema.index({ slug: 1 });
ProductSchema.index({ vendor: 1 });
ProductSchema.index({ category: 1 });
ProductSchema.index({ status: 1 });
ProductSchema.index({ featured: 1 });
ProductSchema.index({ 'pricing.basePrice': 1 });
ProductSchema.index({ tags: 1 });
ProductSchema.index({ brand: 1 });
ProductSchema.index({ createdAt: -1 });

// Text search index
ProductSchema.index({
  name: 'text',
  description: 'text',
  tags: 'text',
  brand: 'text',
});

// Virtual for effective price
ProductSchema.virtual('effectivePrice').get(function getEffectivePrice() {
  return this.pricing.salePrice || this.pricing.basePrice;
});

// Virtual for discount percentage
ProductSchema.virtual('discountPercentage').get(function getDiscountPercentage() {
  if (!this.pricing.salePrice) return 0;
  return Math.round(
    ((this.pricing.basePrice - this.pricing.salePrice) / this.pricing.basePrice) * 100
  );
});

// Virtual for average rating
ProductSchema.virtual('averageRating', {
  ref: 'Review',
  localField: '_id',
  foreignField: 'product',
  options: { match: { isApproved: true } },
});

// Virtual for reviews count
ProductSchema.virtual('reviewsCount', {
  ref: 'Review',
  localField: '_id',
  foreignField: 'product',
  count: true,
  options: { match: { isApproved: true } },
});

// Pre-save middleware to update slug
ProductSchema.pre('save', function updateSlug(next) {
  if (this.isModified('name')) {
    this.slug = this.name
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-+|-+$/g, '');
  }
  next();
});

const Product: Model<IProduct> =
  mongoose.models.Product || mongoose.model<IProduct>('Product', ProductSchema);

export default Product;
