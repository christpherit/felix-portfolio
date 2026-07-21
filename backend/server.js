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

// Seed models
import User from './models/User.js';
import Project from './models/Project.js';

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

// Seed default projects if not present and remove Twitter
const seedProjects = async () => {
  try {
    // Delete any old projects with Twitter in title
    const deleteResult = await Project.deleteMany({ title: /Twitter/i });
    if (deleteResult.deletedCount > 0) {
      console.log(`✔ Removed ${deleteResult.deletedCount} Twitter-related projects.`);
    }

    const defaultProjects = [
      {
        title: 'Lala Invoice',
        description: 'A professional invoicing platform for freelancers and small businesses to generate, track, and manage billing dynamically.',
        image: 'https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?auto=format&fit=crop&q=80&w=800',
        liveUrl: '#',
        githubUrl: 'https://github.com/christpherit',
        techStack: ['React', 'Node.js', 'Express', 'MongoDB', 'Tailwind CSS'],
        category: 'MERN',
        featured: true,
        order: 1,
        overview: 'Lala Invoice is a modern invoice builder designed to simplify financial tracking for independent contractors and agencies.',
        businessProblem: 'Manual invoicing is prone to calculation errors and hard to track over time.',
        solution: 'Built a clean invoicing tool with PDF generation, automatic tax calculations, and status tracking.',
        challengesFaced: 'Generating PDFs client-side without bloat was complex.',
        howSolved: 'Implemented backend microservice for layout rendering and stream piping.',
        lessonsLearned: 'Decoupling rendering from main CPU loops preserves dashboard speed.',
        features: ['PDF generation', 'Automatic calculations', 'Status tracking']
      },
      {
        title: 'S2S Security Management',
        description: 'An enterprise-grade physical security visitor logging and patrol tracking application.',
        image: 'https://images.unsplash.com/photo-1563986768609-322da13575f3?auto=format&fit=crop&q=80&w=800',
        liveUrl: '#',
        githubUrl: 'https://github.com/christpherit',
        techStack: ['React', 'GraphQL', 'Hasura', 'PostgreSQL', 'Node.js'],
        category: 'GraphQL',
        featured: true,
        order: 2,
        overview: 'A secure, high-performance portal for security guards and administrators to monitor check-ins and patrol routes in real time.',
        businessProblem: 'Paper logs at security gates lead to slow searchability and security audits.',
        solution: 'Designed an interactive visitor check-in application backed by Hasura GraphQL subscriptions.',
        challengesFaced: 'WebSocket reconnection leaks when pages unmounted.',
        howSolved: 'Created React cleanup hooks to close subscription sockets on route switch.',
        lessonsLearned: 'Always throttle socket events on frequent payload triggers.',
        features: ['Real-time logs', 'Patrol checks', 'Alert alerts']
      },
      {
        title: 'Dental Suite 360',
        description: 'A comprehensive clinic management console for dental practices to log patients, schedule treatments, and track invoices.',
        image: 'https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?auto=format&fit=crop&q=80&w=800',
        liveUrl: '#',
        githubUrl: 'https://github.com/christpherit',
        techStack: ['Angular', 'Node.js', 'Express', 'MongoDB', 'Material UI'],
        category: 'MEAN',
        featured: true,
        order: 3,
        overview: 'Dental Suite 360 streamlines patient records, dentist scheduling, and insurance claim tracking in a single application.',
        businessProblem: 'Dental practices often struggle with appointment double-bookings and scattered dental charts.',
        solution: 'Developed a unified MEAN stack application featuring a calendar dashboard and interactive treatment tracker.',
        challengesFaced: 'Managing multi-dentist schedules concurrently.',
        howSolved: 'Implemented Mongoose transaction locks and live calendar updates.',
        lessonsLearned: 'Optimizing calendar renders saves client memory.',
        features: ['Patient charts', 'Calendar bookings', 'Insurance logs']
      },
      {
        title: 'Enterprise Employee Management System (Coming Soon)',
        description: 'A complete employee management solution for organizations with secure authentication, dashboards, and administrative features.',
        image: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&q=80&w=800',
        liveUrl: '#',
        githubUrl: 'https://github.com/christpherit',
        techStack: ['React', 'Node.js', 'Express', 'MongoDB', 'JWT', 'Tailwind CSS'],
        category: 'MERN',
        featured: false,
        order: 4,
        overview: 'An administrative employee hub for time tracking, leave requests, and performance management.',
        businessProblem: 'Managing remote employees with separate spreadsheets is error-prone and time-consuming.',
        solution: 'A secure, role-based dashboard for employee operations.',
        challengesFaced: 'Role-based route blocking on client side.',
        howSolved: 'Utilized React Context combined with JWT verification endpoints.',
        lessonsLearned: 'Frontend route checks must always be backed by backend route guards.',
        features: ['Employee CRUD', 'Leave workflows', 'Analytics dashboard']
      },
      {
        title: 'Hospital Appointment Management System (Coming Soon)',
        description: 'A healthcare management platform allowing patients and doctors to manage appointments and records efficiently.',
        image: 'https://images.unsplash.com/photo-1505751172876-fa1923c5c528?auto=format&fit=crop&q=80&w=800',
        liveUrl: '#',
        githubUrl: 'https://github.com/christpherit',
        techStack: ['React', 'Node.js', 'Express', 'MongoDB', 'GraphQL', 'Hasura'],
        category: 'GraphQL',
        featured: false,
        order: 5,
        overview: 'A portal for patients to schedule checkups and for doctors to configure their weekly availability.',
        businessProblem: 'Patient bookings via phone lines lead to long waiting lists and miscommunication.',
        solution: 'An automated scheduling portal with Hasura-backed medical logs.',
        challengesFaced: 'Structuring GraphQL queries for doctor schedules.',
        howSolved: 'Designed Postgres views and query bindings inside Hasura.',
        lessonsLearned: 'Database views save immense execution time for multi-join operations.',
        features: ['Scheduling engine', 'Patient registration', 'Medical logs']
      }
    ];

    for (const proj of defaultProjects) {
      const existing = await Project.findOne({ title: proj.title });
      if (!existing) {
        await Project.create(proj);
        console.log(`✔ Seeded Project: ${proj.title}`);
      }
    }
  } catch (err) {
    console.error('✘ Default Projects Seeding Failed:', err.message);
  }
};

const PORT = process.env.PORT || 5000;
app.listen(PORT, async () => {
  console.log(`✔ Server Active on port ${PORT}`);
  await seedAdmin();
  await seedProjects();
});
export default app;
