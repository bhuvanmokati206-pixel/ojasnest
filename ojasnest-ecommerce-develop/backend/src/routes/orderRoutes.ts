import { Router } from 'express';
import { createCheckoutSession, getOrderById, getAllOrders, updateOrderStatus } from '../controllers/orderController';
import { authenticate, authorizeAdmin } from '../middleware/authMiddleware';

const router = Router();

router.post('/checkout', createCheckoutSession);
router.get('/all', authenticate, authorizeAdmin, getAllOrders);
router.get('/:id', getOrderById);
router.patch('/:id/status', authenticate, authorizeAdmin, updateOrderStatus);

export default router;