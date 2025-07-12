import { Router } from 'express';
import * as productController from './product.controller';
import { authenticate } from '../../global_middleware/authenticator';
import { authorize } from '../../global_middleware/authorizor';

const productRouter = Router();

// Public: Get all products
productRouter.get('/', productController.getAllProducts);
// Protected: Get product by id (USER, SELLER, ADMIN)
productRouter.get('/:id', authenticate, authorize('USER', 'SELLER', 'ADMIN'), productController.getProductById);
// Seller: Create product (SELLER, ADMIN)
productRouter.post('/', authenticate, authorize('SELLER', 'ADMIN'), productController.createProduct);
// Seller: Update/delete own product, Admin: any product
productRouter.put('/:id', authenticate, authorize('SELLER', 'ADMIN'), productController.updateProduct);
productRouter.delete('/:id', authenticate, authorize('SELLER', 'ADMIN'), productController.deleteProduct);

export default productRouter;
