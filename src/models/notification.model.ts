import type { Model, Types, Document } from 'mongoose';

import mongoose, { Schema } from 'mongoose';

export interface INotification extends Document {
  _id: Types.ObjectId;
  recipient: Types.ObjectId;
  sender?: Types.ObjectId;
  type:
    | 'order_placed'
    | 'order_confirmed'
    | 'order_shipped'
    | 'order_delivered'
    | 'payment_received'
    | 'payment_failed'
    | 'product_review'
    | 'low_stock'
    | 'new_message'
    | 'account_update'
    | 'promotion'
    | 'system';
  title: string;
  message: string;
  data?: Record<string, any>; // Because `Mixed` can be anything
  read?: boolean;
  readAt?: Date;
  action?: {
    type?: string;
    url?: string;
  };
  createdAt?: Date;
  updatedAt?: Date;
}

const NotificationSchema = new Schema(
  {
    recipient: {
      type: mongoose.Schema.ObjectId,
      ref: 'User',
      required: true,
    },
    sender: {
      type: mongoose.Schema.ObjectId,
      ref: 'User',
    },
    type: {
      type: String,
      enum: [
        'order_placed',
        'order_confirmed',
        'order_shipped',
        'order_delivered',
        'payment_received',
        'payment_failed',
        'product_review',
        'low_stock',
        'new_message',
        'account_update',
        'promotion',
        'system',
      ],
      required: true,
    },
    title: {
      type: String,
      required: true,
      trim: true,
    },
    message: {
      type: String,
      required: true,
      trim: true,
    },
    data: {
      type: mongoose.Schema.Types.Mixed,
    },
    read: {
      type: Boolean,
      default: false,
    },
    readAt: {
      type: Date,
    },
    action: {
      type: String,
      url: String,
    },
  },
  {
    timestamps: true,
  }
);

// Indexes
NotificationSchema.index({ recipient: 1, read: 1 });
NotificationSchema.index({ createdAt: -1 });
NotificationSchema.index({ type: 1 });

const Notification: Model<INotification> =
  mongoose.models.Notification || mongoose.model('Notification', NotificationSchema);

export default Notification;
