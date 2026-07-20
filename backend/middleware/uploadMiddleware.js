import multer from 'multer';
import cloudinary from '../config/cloudinary.js';

// Initialize multer memory buffer storage
const storage = multer.memoryStorage();
export const upload = multer({ storage });

// Helper to stream file buffers to Cloudinary
export const uploadToCloudinary = (fileBuffer, folder = 'portfolio') => {
  return new Promise((resolve, reject) => {
    const uploadStream = cloudinary.uploader.upload_stream(
      { 
        folder,
        resource_type: 'auto' // automatically detect if image or pdf
      },
      (error, result) => {
        if (error) {
          return reject(error);
        }
        resolve(result.secure_url);
      }
    );
    
    uploadStream.end(fileBuffer);
  });
};
