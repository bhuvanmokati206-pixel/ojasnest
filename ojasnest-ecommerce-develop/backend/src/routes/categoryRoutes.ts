import { Router } from 'express';
import { getCategories, createCategory } from '../controllers/categoryController';
import { authenticate, authorizeAdmin } from '../middleware/authMiddleware';

const router = Router();

router.get('/', getCategories);
router.post('/', authenticate, authorizeAdmin, createCategory);

export default router;