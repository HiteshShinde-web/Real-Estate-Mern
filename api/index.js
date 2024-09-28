import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cors from 'cors'; // Import CORS package
import userRouter from './routes/user.route.js';
import authRouter from './routes/auth.route.js';
import listingRouter from './routes/listing.route.js';
import cookieParser from 'cookie-parser';
import path from 'path';

dotenv.config(); // Load environment variables

// Connect to MongoDB
mongoose
  .connect(process.env.MONGO, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('Connected to MongoDB!');
  })
  .catch((err) => {
    console.log('Failed to connect to MongoDB:', err);
  });

const app = express();

// Add CORS middleware
app.use(cors({
  origin: 'https://your-frontend-url.onrender.com', // Replace with your actual frontend URL
  credentials: true,  // Allow cookies
}));

// Parse JSON and cookies
app.use(express.json());
app.use(cookieParser());

// API Routes
app.use('/api/user', userRouter);
app.use('/api/auth', authRouter);
app.use('/api/listing', listingRouter);

// Serve frontend static files
const __dirname = path.resolve();
app.use(express.static(path.join(__dirname, '/client/dist')));

// Catch-all route for serving index.html for React SPA
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'client', 'dist', 'index.html'));
});

// Error handling middleware
app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || 'Internal Server Error';
  return res.status(statusCode).json({
    success: false,
    statusCode,
    message,
  });
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}!`);
});
