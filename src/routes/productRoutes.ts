import {Router} from 'express';
import { buyProduct } from '../controllers/productController';

const router = Router();

router.post('/buy', buyProduct);

export {router as purchaseProduct};