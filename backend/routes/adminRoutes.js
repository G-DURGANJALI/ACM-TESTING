
import express from 'express';

import { isAdmin } from '../middlewares/authMiddleware.js';

import {
 
  approveClub,
  rejectClub,
  approveBlog,
  rejectBlog,
  allClubs,
  allBlogs,

} from "../controllers/adminController.js";
const router = express.Router();
// Middleware: Student must be admin
// CLUB ROUTES
router.get('/all-clubs', isAdmin, allClubs);
router.put('/approve-club/:clubId', isAdmin, approveClub);
router.put('/reject-club/:clubId', isAdmin, rejectClub);

// BLOG ROUTES
router.get('/all-blogs', isAdmin, allBlogs);
router.put('/approve-blog/:blogId', isAdmin, approveBlog);
router.put('/reject-blog/:blogId', isAdmin, rejectBlog);

export default router;