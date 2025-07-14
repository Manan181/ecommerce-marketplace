import type { Model, Types, Document } from 'mongoose';

import mongoose, { Schema } from 'mongoose';

export interface IUser extends Document {
  _id: Types.ObjectId;
  email: string;
  password: string;
  firstName: string;
  lastName: string;
}

const UserSchema: Schema<IUser> = new Schema<IUser>(
  {
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
  },
  { timestamps: true }
);

const User: Model<IUser> = mongoose.models.User || mongoose.model<IUser>('User', UserSchema);

export default User;
