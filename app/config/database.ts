import { env } from './env';
import mongoose from 'mongoose';
import { UserModel } from '../features/users/models/user.model';

export default async function connectDB(
    url: string = env.MONGO_URI
): Promise<void> {
  await mongoose.connect(url);
  await UserModel.syncIndexes();
  console.log('✓ MongoDB connected');
}