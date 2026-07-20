import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import rateLimit from 'express-rate-limit';

// Database config
import connectDB from './config/db.js';
import { errorHandler } from './middleware/errorMiddleware.js';

// Route files
import authRoutes from './routes/authRoutes.js';
import aboutRoutes from './routes/aboutRoutes.js';
import projectRoutes from './routes/projectRoutes.js';
import skillRoutes from './routes/skillRoutes.js';
import experienceRoutes from './routes/experienceRoutes.js';
import settingRoutes from './routes/settingRoutes.js';
import contactRoutes from './routes/contactRoutes.js';
import uploadRoutes from './routes/uploadRoutes.js';

// Seed model
import User from './models/User.js';

// Load environment variables
dotenv.config();

// Connect to database
connectDB();

const app = express();

// Security middle-tier
app.use(helmet({
  crossOriginResourcePolicy: false // allow loading local images / third-party CDN images
}));
app.use(cors());
app.use(express.json());

// Logger
if (process.env.NODE_ENV !== 'production') {
  app.use(morgan('dev'));
} else {
  app.use(morgan('combined'));
}

// Rate Limiter: max 150 requests per 15 minutes per IP
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 150,
  message: {
    success: false,
    message: 'Too many requests from this IP. Please try again after 15 minutes.',
  },
});
app.use('/api/', limiter);

// Mount routers
app.use('/api/auth', authRoutes);
app.use('/api/about', aboutRoutes);
app.use('/api/projects', projectRoutes);
app.use('/api/skills', skillRoutes);
app.use('/api/experiences', experienceRoutes);
app.use('/api/settings', settingRoutes);
app.use('/api/contacts', contactRoutes);
app.use('/api/uploads', uploadRoutes);

// Base Router Root
app.get('/', (req, res) => {
  res.json({ message: 'Christopher Felix Portfolio API is active.' });
});

// Centralized error interceptor
app.use(errorHandler);

// Seed default administrator if DB is empty
const seedAdmin = async () => {
  try {
    const adminCount = await User.countDocuments();
    if (adminCount === 0) {
      const adminPass = process.env.ADMIN_PASSWORD || 'adminpassword';
      await User.create({
        username: 'admin',
        email: 'admin@example.com',
        password: adminPass, // User pre-save hook handles hashing
      });
      console.log('--------------------------------------------------');
      console.log('✔ Default Admin Account Initialized:');
      console.log('Username: admin');
      console.log('Email: admin@example.com');
      console.log(`Password: ${adminPass}`);
      console.log('--------------------------------------------------');
    }
  } catch (err) {
    console.error('✘ Default Admin Account Seeding Failed:', err.message);
  }
};

const PORT = process.env.PORT || 5000;
app.listen(PORT, async () => {
  console.log(`✔ Server Active on port ${PORT}`);
  await seedAdmin();
});
export default app;
