import express from 'express';
import {
  createContact,
  getContacts,
  updateContact,
  deleteContact,
} from '../controllers/contactController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

router.route('/')
  .post(createContact)
  .get(protect, getContacts);

router.route('/:id')
  .put(protect, updateContact)
  .delete(protect, deleteContact);

export default router;
