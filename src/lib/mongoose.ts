import mongoose from 'mongoose';

const MONGODB_URI = process.env.DATABASE_URL as string;

if (!MONGODB_URI) {
  throw new Error('Please define the MONGODB_URI environment variable inside .env.local');
}

const globalWithMongoose = global as typeof global & {
  mongoose?: { conn: typeof mongoose | null; promise: Promise<typeof mongoose> | null };
};

if (!globalWithMongoose.mongoose) {
  globalWithMongoose.mongoose = { conn: null, promise: null };
}

export async function connectDB() {
  if (globalWithMongoose.mongoose!.conn) {
    return globalWithMongoose.mongoose!.conn;
  }
  if (!globalWithMongoose.mongoose!.promise) {
    globalWithMongoose.mongoose!.promise = mongoose.connect(MONGODB_URI, {
      bufferCommands: false,
    });
  }
  globalWithMongoose.mongoose!.conn = await globalWithMongoose.mongoose!.promise;
  return globalWithMongoose.mongoose!.conn;
}
