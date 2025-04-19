import express from 'express';
import { createBlog, getClubBlogs ,updateClubDescription,
	updateClubProfilePhoto,
	addCouncilMember,
	updateCouncilMember,getClubInfo,
	changeClubPassword,deleteCouncilMember,getblog} from '../controllers/clubController.js';
import { protectClub } from '../middlewares/authMiddleware.js';
import upload from '../middlewares/multer.js';
const router = express.Router();

// Create a new blog (for club)
router.post('/create-blog', upload.fields([
    { name: 'coverimg', maxCount: 1 },
    { name: 'photos', maxCount: 10 },
    
  ]),protectClub,createBlog);

// Get all blogs for the club
router.get('/blogs',protectClub, getClubBlogs);

router.put('/update-description', protectClub, updateClubDescription);

router.put(
  '/update-profile-photo',
  protectClub,
  upload.single('photo'),
  updateClubProfilePhoto
);

router.post(
  '/add-council-member',
  protectClub,
  upload.single('profilepic'),
  addCouncilMember
);

router.get('/blog/:id',protectClub,getblog);
router.get('/info', protectClub, getClubInfo);
router.put('/change-password', protectClub, changeClubPassword);
router.put('/update-council-member/:memberId', protectClub, upload.single('profilepic'), updateCouncilMember);
router.delete('/delete-council-member/:memberId', protectClub, deleteCouncilMember);

export default router;
//When rendering the club council list, pass member._id along with role/name so that updates/deletes target the right person.

// done completely