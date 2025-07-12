import { Request, Response } from 'express';
import { ProductService } from './product.service';

export const getAllProducts = async (req: Request, res: Response): Promise<void> => {
  try {
    const products = await ProductService.getAll();
    res.json(products);
  } catch (err) {
    res.status(500).json({ message: err instanceof Error ? err.message : 'Server error' });
  }
};

export const getProductById = async (req: Request, res: Response): Promise<void> => {
  try {
    const product = await ProductService.getById(req.params.id);
    if (!product) 
        res.status(404).json({ message: 'Product not found' });
    res.json(product);
  } catch (err) {
    res.status(500).json({ message: err instanceof Error ? err.message : 'Server error' });
  }
};

export const createProduct = async (req: Request, res: Response): Promise<void> => {
  if (!req.user) {
    res.status(401).json({ message: 'Unauthorized' });
    return;
  }
  try {
    // req.user.id comes from the JWT token payload, set by the authenticate middleware
    const newProduct = await ProductService.createProduct(req.body, req.user.id);
    res.status(201).json(newProduct);
  } catch (err) {
    res.status(400).json({ message: err instanceof Error ? err.message : 'Bad request' });
  }
};

export const updateProduct = async (req: Request, res: Response): Promise<void> => {
  if (!req.user) {
    res.status(401).json({ message: 'Unauthorized' });
    return;
  }
    try {
    const updatedProduct = await ProductService.update(req.params.id, req.body, req.user);
    res.json(updatedProduct);
  } catch (err) {
    if (err instanceof Error && err.message.startsWith('Forbidden')) {
      res.status(403).json({ message: err.message });
    } else if (err instanceof Error && err.message === 'Product not found') {
      res.status(404).json({ message: err.message });
    } else {
      res.status(400).json({ message: err instanceof Error ? err.message : 'Bad request' });
    }
  }
};

export const deleteProduct = async (req: Request, res: Response): Promise<void> => {
  if (!req.user) {
    res.status(401).json({ message: 'Unauthorized' });
    return;
  }
  try {
    const deletedProduct = await ProductService.delete(req.params.id, req.user);
    res.json({ message: 'Product deleted', deletedProduct });
  } catch (err) {
    if (err instanceof Error && err.message.startsWith('Forbidden')) {
      res.status(403).json({ message: err.message });
    } else if (err instanceof Error && err.message === 'Product not found') {
      res.status(404).json({ message: err.message });
    } else {
      res.status(400).json({ message: err instanceof Error ? err.message : 'Bad request' });
    }
  }
};
