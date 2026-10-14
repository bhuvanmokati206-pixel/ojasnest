import { Router } from 'express';
import { getPresignedUrl } from '../controllers/uploadController';
import { authenticate, authorizeAdmin } from '../middleware/authMiddleware';

const router = Router();

router.post('/presigned-url', authenticate, authorizeAdmin, getPresignedUrl);

export default router;