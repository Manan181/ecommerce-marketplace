import type { Model, Types } from 'mongoose';

import { CONSTANT } from '@/config/constant';
import { model, models, Schema } from 'mongoose';

export interface IUser extends Document {
  _id: Types.ObjectId;
  email: string;
  password: string;
  role?: 'admin' | 'vendor' | 'customer';
  profile: {
    firstName: string;
    lastName: string;
    phone?: string;
    avatar?: string;
    dateOfBirth?: Date;
  };
  addresses?: Array<{
    type?: 'home' | 'work' | 'other';
    street: string;
    city: string;
    state: string;
    zipCode: string;
    country?: string;
    isDefault?: boolean;
  }>;
  vendorInfo?: {
    businessName?: string;
    businessType?: string;
    taxId?: string;
    commission?: number;
    verified?: boolean;
    socialMedia?: {
      website?: string;
      facebook?: string;
      twitter?: string;
      instagram?: string;
    };
  };
  walletAddress?: string;
  preferences?: {
    newsletter?: boolean;
    notifications?: boolean;
    currency?: string;
    language?: string;
  };
  isActive?: boolean;
  lastLogin?: Date;
  emailVerified?: boolean;
  emailVerificationToken?: string;
  passwordResetToken?: string;
  passwordResetExpires?: Date;
  createdAt?: Date;
  updatedAt?: Date;
}

const UserSchema: Schema<IUser> = new Schema<IUser>(
  {
    email: { type: String, required: true, lowercase: true, trim: true },
    password: { type: String, required: true, minlength: CONSTANT.PASSWORD_LENGTH },
    role: {
      type: String,
      enum: ['admin', 'vendor', 'customer'],
      default: 'customer',
    },
    profile: {
      firstName: { type: String, required: true, trim: true },
      lastName: { type: String, required: true, trim: true },
      phone: { type: String, trim: true },
      avatar: { type: String },
      dateOfBirth: { type: Date },
    },
    addresses: [
      {
        type: {
          type: String,
          enum: ['home', 'work', 'other'],
          default: 'home',
        },
        street: { type: String, required: true },
        city: { type: String, required: true },
        state: { type: String, required: true },
        zipCode: { type: String, required: true },
        country: { type: String, required: true, default: 'IN' },
        isDefault: { type: Boolean, default: false },
      },
    ],
    // Vendor specific fields
    vendorInfo: {
      businessName: { type: String },
      businessType: { type: String },
      taxId: { type: String },
      commission: { type: Number, default: 15 }, // Platform commission %
      verified: { type: Boolean, default: false },
      socialMedia: {
        website: { type: String },
        facebook: { type: String },
        twitter: { type: String },
        instagram: { type: String },
      },
    },
    // Web3 integration ready
    walletAddress: { type: String },
    preferences: {
      newsletter: { type: Boolean, default: true },
      notifications: { type: Boolean, default: true },
      currency: { type: String, default: 'USD' },
      language: { type: String, default: 'en' },
    },
    isActive: { type: Boolean, default: true },
    lastLogin: { type: Date },
    emailVerified: { type: Boolean, default: false },
    emailVerificationToken: { type: String },
    passwordResetToken: { type: String },
    passwordResetExpires: { type: Date },
  },
  { timestamps: true, toJSON: { virtuals: true }, toObject: { virtuals: true } }
);

UserSchema.index({ email: 1 }, { unique: true });
UserSchema.index({ role: 1 });
UserSchema.index({ 'vendorInfo.verified': 1 });
UserSchema.index({ walletAddress: 1 }, { unique: true, sparse: true });

// Virtual for full name
UserSchema.virtual('fullName').get(function getFullName() {
  return `${this.profile.firstName} ${this.profile.lastName}`;
});

const User: Model<IUser> = models.User || model<IUser>('User', UserSchema);

export default User;
