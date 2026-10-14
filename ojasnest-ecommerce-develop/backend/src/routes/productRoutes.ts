import { Router } from 'express';
import { getProducts, getProductBySlug, createProduct } from '../controllers/productController';
import { authenticate, authorizeAdmin } from '../middleware/authMiddleware';

const router = Router();

router.get('/', getProducts);
router.get('/:slug', getProductBySlug);
router.post('/', authenticate, authorizeAdmin, createProduct);

export default router;