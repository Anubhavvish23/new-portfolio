import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import path from 'path';
import adminRoutes from './routes/adminRoutes';
import projectRoutes from './routes/projectRoutes';
import aboutRoutes from './routes/aboutRoutes';

// Load environment variables
dotenv.config();

// Create Express app
const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve static files from uploads directory
app.use('/uploads', express.static(path.join(__dirname, '../uploads')));

// Routes
app.use('/api/admin', adminRoutes);
app.use('/api/projects', projectRoutes);
app.use('/api/about', aboutRoutes);
// Other routes will be added here
// app.use('/api/certificates', certificateRoutes);
// app.use('/api/gallery', galleryRoutes);
// app.use('/api/ratings', ratingRoutes);

// Error handling middleware
app.use((err: any, req: express.Request, res: express.Response, next: express.NextFunction) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Something went wrong!' });
});

// Start server
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
}); 