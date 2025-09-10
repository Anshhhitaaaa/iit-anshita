import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import mongoose from 'mongoose';
import authRoutes from './routes/auth.js';

// Load environment variables
dotenv.config({ path: '../.env' });

// Create Express app
const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/auth', authRoutes);

// Basic route for testing
app.get('/', (req, res) => {
  res.send('API is running...');
});

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('MongoDB Connected'))
  .catch(err => console.error('MongoDB connection error:', err));

// Start server
const PORT = 5002; // Using port 5002 explicitly
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});