import express from 'express';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import connectDB from './config/db.js';
import authRoutes from './routes/authRoutes.js';
import studentRoutes from './routes/studentRoutes.js';
import adminRoutes from './routes/adminRoutes.js';
import clubRoutes  from './routes/clubRoutes.js';
// import commentRoutes from './routes/commentRoutes.js';


dotenv.config();

const app = express();

// Middleware
app.use(express.json());
app.use(cookieParser());
app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true
}));

// Connect DB
connectDB();


app.use('/api/auth', authRoutes);
app.use('/api/students',studentRoutes);
app.use('/api/admin',adminRoutes);
app.use('/api/club',clubRoutes);
// app.use('/api/club/blogs/comments', commentRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
