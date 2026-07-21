import express from 'express';
import { 
  loginAdmin, verifyAdmin, getAdmins, 
  createAdmin, deleteAdmin, changeAdminPassword 
} from '../controllers/authController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

router.post('/login', loginAdmin);
router.get('/verify', protect, verifyAdmin);

// Admin Account Management CRUD Routes
router.get('/admins', protect, getAdmins);
router.post('/admins', protect, createAdmin);
router.delete('/admins/:id', protect, deleteAdmin);
router.put('/admins/:id/password', protect, changeAdminPassword);

export default router;
