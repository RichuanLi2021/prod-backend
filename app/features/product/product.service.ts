import { ProductModel } from './product.model';
import type { Product, ProductInput } from './product.types';
import { Types } from 'mongoose';

export class ProductService {
  static async getAll() {
    return ProductModel.find().populate('seller', 'name email');
  }

  static async getById(id: string) {
    return ProductModel.findById(id).populate('seller', 'name email');
  }

  static async createProduct(data: ProductInput, sellerId: string) {
    return ProductModel.create({ ...data, seller: new Types.ObjectId(sellerId) });
  }

  static async update(
    id: string, 
    data: Partial<ProductInput>, 
    user: { id: string; role: string }) {
    const product = await ProductModel.findById(id);
    if (!product) 
        throw new Error('Product not found');
    if (user.role !== 'ADMIN' && product.seller.toString() !== user.id) {
      throw new Error('Forbidden: not your product');
    }
    Object.assign(product, data);
    return product.save();
  }

  static async delete(id: string, user: { id: string; role: string }) {
    const product = await ProductModel.findById(id);
    if (!product) throw new Error('Product not found');
    if (user.role !== 'ADMIN' && product.seller.toString() !== user.id) {
      throw new Error('Forbidden: not your product');
    }
    await product.deleteOne();
    return product;
  }
}
