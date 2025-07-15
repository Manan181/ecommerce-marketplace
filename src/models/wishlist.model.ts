import type { Model, Types, Document } from 'mongoose';

import mongoose, { Schema } from 'mongoose';

export interface IWishlist extends Document {
  _id: Types.ObjectId;
  user: Types.ObjectId;
  products: Array<{
    product: Types.ObjectId;
    addedAt?: Date;
  }>;
  name?: string;
  isPublic?: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}

const WishlistSchema: Schema<IWishlist> = new Schema<IWishlist>(
  {
    user: {
      type: mongoose.Schema.ObjectId,
      ref: 'User',
      required: true,
    },
    products: [
      {
        product: {
          type: mongoose.Schema.ObjectId,
          ref: 'Product',
          required: true,
        },
        addedAt: {
          type: Date,
          default: Date.now,
        },
      },
    ],
    name: {
      type: String,
      default: 'My Wishlist',
      trim: true,
    },
    isPublic: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

WishlistSchema.index({ user: 1 });
WishlistSchema.index({ 'products.product': 1 });

// Virtual for products count
WishlistSchema.virtual('productsCount').get(function getProductsCount() {
  return this.products.length;
});

const Wishlist: Model<IWishlist> =
  mongoose.models.Wishlist || mongoose.model('Wishlist', WishlistSchema);

export default Wishlist;
