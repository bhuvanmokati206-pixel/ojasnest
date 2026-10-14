import { Router, raw } from 'express';
import { handleStripeWebhook } from '../controllers/webhookController';

const router = Router();

router.post('/stripe', raw({ type: 'application/json' }), handleStripeWebhook);

export default router;