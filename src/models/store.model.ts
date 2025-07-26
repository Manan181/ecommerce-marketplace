import type { Model, Types } from 'mongoose';

import { model, Schema, models } from 'mongoose';

if (process.env.NODE_ENV === 'development') {
  delete models.Store;
}

export interface IStore extends Document {
  _id: Types.ObjectId;
  vendorId: Types.ObjectId;
  name: string;
  storeSlug: string; // unique subdomain
  customDomain: string | null;
  domainVerified: boolean;
  sslEnabled: boolean;
  branding: {
    logoUrl: string;
    primaryColor: string;
  };
  storeBanner?: string;
  storeDescription?: string;
}

const StoreSchema: Schema<IStore> = new Schema<IStore>(
  {
    vendorId: { type: Schema.ObjectId, required: true },
    name: { type: String },
    storeSlug: { type: String, required: true },
    customDomain: { type: String },
    domainVerified: { type: Boolean, default: false },
    sslEnabled: { type: Boolean, default: false },
    branding: { logoUrl: String, primaryColor: String },
    storeBanner: { type: String },
    storeDescription: { type: String },
  },
  { timestamps: true, toJSON: { virtuals: true }, toObject: { virtuals: true } }
);

StoreSchema.index({ storeSlug: 1 }, { unique: true, sparse: true });

const Store: Model<IStore> = models.Store || model<IStore>('Store', StoreSchema);

export default Store;
