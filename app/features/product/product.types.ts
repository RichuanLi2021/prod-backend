import { Document, Types } from 'mongoose';

export interface Product extends Document {
  name: string;
  description: string;
  banner: string;
  price: number;
  seller: Types.ObjectId; // reference to User
  createdAt: Date;
  updatedAt: Date;
}

export type ProductInput = Omit<Product, 'createdAt' | 'updatedAt' | 'seller'> & { seller?: Types.ObjectId };
