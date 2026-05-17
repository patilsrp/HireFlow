import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { connectDB } from './config/db.js';
import authRoutes from './routes/auth.js';
import jobRoutes from './routes/jobs.js';
import applicationRoutes from './routes/applications.js';
import { 
  helmetMiddleware, 
  generalLimiter, 
  authLimiter,
  jobPostingLimiter,
  applicationLimiter,
  mongoSanitizeMiddleware, 
  preventXSS,
  limitInputSize 
} from './middleware/security.js';

dotenv.config();
connectDB();

const app = express();

// Security middleware
app.use(helmetMiddleware);
app.use(mongoSanitizeMiddleware);
app.use(preventXSS);
app.use(limitInputSize);

// CORS configuration
app.use(cors({ 
  origin: process.env.CLIENT_URL || 'http://localhost:5173',
  credentials: true,
  optionsSuccessStatus: 200
}));

// Body parsing middleware with size limit
app.use(express.json({ limit: '10kb' }));
app.use(express.urlencoded({ extended: true, limit: '10kb' }));

// General rate limiting
app.use(generalLimiter);

// Routes with specific rate limiters
app.use('/api/auth/login', authLimiter);
app.use('/api/auth/register', authLimiter);
app.use('/api/auth', authRoutes);

app.use('/api/jobs', jobRoutes);
app.post('/api/jobs', jobPostingLimiter); // Additional limit for job posting

app.use('/api/applications', applicationRoutes);
app.post('/api/applications', applicationLimiter); // Additional limit for applications

app.get('/health', (req, res) => res.json({ status: 'ok' }));

// Global error handler
app.use((err, req, res, next) => {
  console.error('Error:', err.stack);
  
  // Don't leak error details in production
  const message = process.env.NODE_ENV === 'production' 
    ? 'Something went wrong!' 
    : err.message;
    
  res.status(err.status || 500).json({ 
    message,
    ...(process.env.NODE_ENV !== 'production' && { stack: err.stack })
  });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT} in ${process.env.NODE_ENV || 'development'} mode`));