import type { Model, Types, Document } from 'mongoose';

import mongoose, { Schema } from 'mongoose';

export interface IReview extends Document {
  _id: Types.ObjectId;
  product: Types.ObjectId;
  customer: Types.ObjectId;
  order: Types.ObjectId;

  rating: number; // 1 to 5
  title: string;
  comment: string;

  images?: Array<{
    url: string;
    alt?: string;
  }>;

  verified?: boolean;
  isApproved?: boolean;
  approvedBy?: Types.ObjectId;
  approvedAt?: Date;

  helpful?: number;
  reported?: number;

  response?: {
    vendor?: Types.ObjectId;
    message?: string;
    respondedAt?: Date;
  };

  createdAt?: Date;
  updatedAt?: Date;
}

const ReviewSchema: Schema<IReview> = new Schema<IReview>(
  {
    product: {
      type: mongoose.Schema.ObjectId,
      ref: 'Product',
      required: true,
    },
    customer: {
      type: mongoose.Schema.ObjectId,
      ref: 'User',
      required: true,
    },
    order: {
      type: mongoose.Schema.ObjectId,
      ref: 'Order',
      required: true,
    },
    rating: {
      type: Number,
      required: true,
      min: 1,
      max: 5,
    },
    title: {
      type: String,
      required: true,
      trim: true,
      maxlength: 100,
    },
    comment: {
      type: String,
      required: true,
      trim: true,
      maxlength: 2000,
    },
    images: [
      {
        url: { type: String, required: true },
        alt: { type: String },
      },
    ],
    verified: {
      type: Boolean,
      default: false,
    },
    isApproved: {
      type: Boolean,
      default: false,
    },
    approvedBy: {
      type: mongoose.Schema.ObjectId,
      ref: 'User',
    },
    approvedAt: {
      type: Date,
    },
    helpful: {
      type: Number,
      default: 0,
    },
    reported: {
      type: Number,
      default: 0,
    },
    response: {
      vendor: {
        type: mongoose.Schema.ObjectId,
        ref: 'User',
      },
      message: { type: String },
      respondedAt: { type: Date },
    },
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

// Indexes
ReviewSchema.index({ product: 1, customer: 1 }, { unique: true });
ReviewSchema.index({ product: 1, isApproved: 1 });
ReviewSchema.index({ customer: 1 });
ReviewSchema.index({ rating: 1 });
ReviewSchema.index({ createdAt: -1 });

const Review: Model<IReview> =
  mongoose.models.Review || mongoose.model<IReview>('Review', ReviewSchema);

export default Review;
