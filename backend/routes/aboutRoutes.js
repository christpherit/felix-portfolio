import express from 'express';
import { getAbout, updateAbout } from '../controllers/aboutController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

router.route('/')
  .get(getAbout)
  .put(protect, updateAbout);

export default router;
