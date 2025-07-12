import { Schema, model, Types } from 'mongoose';
import type { Product } from './product.types';

const ProductSchema = new Schema<Product>({
  name: { 
    type: String, 
    required: true 
},
  description: {
     type: String,
     required: true 
    },
  banner: {
     type: String, 
     required: true 
    },
  price: {
     type: Number, 
     required: true 
    },
  seller: {
     type: Schema.Types.ObjectId,
      ref: 'User',
      required: true 
    },
}, { timestamps: true });

export const ProductModel = model<Product>('Product', ProductSchema);
