import express from 'express';
import { upload, uploadToCloudinary } from '../middleware/uploadMiddleware.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

// @desc    Upload single file to Cloudinary
// @route   POST /api/uploads
// @access  Private
router.post('/', protect, upload.single('file'), async (req, res) => {
  if (!req.file) {
    return res.status(400).json({ success: false, message: 'Please upload a file attachment.' });
  }

  try {
    // Stream multer memory buffer directly to Cloudinary
    const url = await uploadToCloudinary(req.file.buffer, 'portfolio');
    
    res.json({ 
      success: true, 
      url,
      message: 'File uploaded successfully.'
    });
  } catch (error) {
    console.error('[Upload Route] Cloudinary streaming error:', error);
    res.status(500).json({ success: false, message: error.message || 'File upload pipeline failed.' });
  }
});

export default router;
