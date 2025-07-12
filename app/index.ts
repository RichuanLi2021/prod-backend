import { Router } from "express";
import authRouter from "./features/auth/routes/auth.routes";
import {userRouter, adminRouter } from "./features/users/routes/user.routes";
import productRouter from "./features/product/product.route";

const apiRouter = Router();
apiRouter.use('/auth', authRouter);

apiRouter.use('/users', userRouter);
apiRouter.use('/admin/users', adminRouter);

// products
apiRouter.use('/products', productRouter);



export default apiRouter;