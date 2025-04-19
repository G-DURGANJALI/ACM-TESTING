import express from 'express';
import {
  logoutStudent,
  getAllApprovedClubs,
  // getallblogs,
  getBlogsBySection,
  updateStudentProfile,
  getLikedBlogs,
  getStudentInfo,
  likeOrUnlikeBlog,
  commentOnBlog,
  getclubprofile,
  createBlog,
  requestPasswordReset,
  resetPassword
} from '../controllers/studentContoller.js';

import { protectStudent } from '../middlewares/authMiddleware.js';
import upload from '../middlewares/multer.js';

const router = express.Router();

// Public routes
router.post('/forgot-password', requestPasswordReset);
router.post('/reset-password', resetPassword);

// Protected routes
router.get('/clubs', protectStudent, getAllApprovedClubs);
// router.get('/clubs/:clubId/blogs', protectStudent, getClubBlogs);  
router.get('/clubs/:clubId/profile', protectStudent, getclubprofile);
router.get('/blogs/section/:section', protectStudent, getBlogsBySection);
router.put('/update-profile', protectStudent, upload.single('profilePic'), updateStudentProfile);
router.get('/liked-blogs', protectStudent, getLikedBlogs);
router.get('/me', protectStudent, getStudentInfo);
router.post('/like/:blogId', protectStudent, likeOrUnlikeBlog);
router.post('/comment/:blogId', protectStudent, commentOnBlog);
router.post('/create-blog', upload.fields([
    { name: 'coverimg', maxCount: 1 },
    { name: 'photos', maxCount: 10 },
    { name: 'pdfs', maxCount: 10 },
]),protectStudent,createBlog);

export default router;
