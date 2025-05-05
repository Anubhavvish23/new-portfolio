import express from 'express';
import { loginAdmin, getAdminProfile, setupAdmin } from '../controllers/adminController';
import { protect, admin } from '../middleware/auth';

const router = express.Router();

router.post('/setup', setupAdmin);
router.post('/login', loginAdmin);
router.get('/profile', protect, admin, getAdminProfile);

export default router; 