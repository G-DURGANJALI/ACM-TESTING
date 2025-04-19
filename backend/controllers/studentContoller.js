import Student from '../models/Student.js';
import Blog from '../models/Blog.js';
import cloudinary from 'cloudinary';
import Club from '../models/Club.js'
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';

//  Logout Student
export const logoutStudent = async (req, res) => {
  try {
    // Clear our custom auth token
    res.cookie('token', '', { maxAge: 1 });

    // If the student has a clerkId, we don't need to do anything extra as Clerk handles its own cleanup
    res.status(200).json({ message: 'Logged out successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error logging out' });
  }
};

// 1. Get all approved clubs
export const getAllApprovedClubs = async (req, res) => {
  try {
    const clubs = await Club.find({ isApproved: true }).select('-password');
    res.status(200).json(clubs);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch clubs' });
  }
};
// populate them according to new date 
// 2. Get all blogs of a particular club
export const getClubBlogs = async (req, res) => {
  try {
    const { clubId } = req.params;
    const blogs = await Blog.find({ clubId }).sort({ createdAt: -1 });
    res.status(200).json(blogs);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch club blogs' });
  }
};
export const getclubprofile=async(req,res)=>{
  try{
    const { clubId } = req.params; 
    const club = await Club.findById(clubId).select('-password');

    if (!club) {
      return res.status(404).json({ message: 'Club not found' });
    }

    res.status(200).json(club);
  }catch(err)
  {
    res.status(500).json({ message: 'Failed to fetch club info ' });
  }
}

// 3. Get blogs based on section
export const getBlogsBySection = async (req, res) => {
  try {
    const { section } = req.params;

    const validSections = ["Intern", "Academic Resources", "Tech Stacks", "Experience", "Club"];
    if (!validSections.includes(section)) {
      return res.status(400).json({ message: "Invalid blog section" });
    }

    const blogs = await Blog.find({ section, status: "approved" })
      .sort({ createdAt: -1 })
     

    res.status(200).json(blogs);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch section blogs' });
  }
};

// 4. Update profile (name or photo)
export const updateStudentProfile = async (req, res) => {
  try {
    const student = await Student.findById(req.student._id);

    if (!student) return res.status(404).json({ message: 'Student not found' });

    const { name } = req.body;

    if (name) student.name = name;

    if (req.file) {
      // Delete old image if exists
      if (student.profilePic) {
        const publicId = student.profilePic.split('/').pop().split('.')[0];
        await cloudinary.uploader.destroy(`collegeBlogs/${publicId}`);
      }
      student.profilePic = req.file.path;
    }
    
    await student.save();
    res.status(200).json({ message: 'Profile updated', student });
  } catch (error) {
    res.status(500).json({ message: 'Failed to update profile' });
  }
};

// 5. Get liked blogs
export const getLikedBlogs = async (req, res) => {
  try {
    const student = await Student.findById(req.student._id).populate({
      path: 'likedBlogs',
      match: { status: 'approved' },
    });
    res.status(200).json(student.likedBlogs);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch liked blogs' });
  }
};

// 6. Get student info
export const getStudentInfo = async (req, res) => {
  try {
    const student = await Student.findById(req.student._id).select('-password');
    res.status(200).json(student);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch student info' });
  }
};
// 7. Like or Unlike a blog
export const likeOrUnlikeBlog = async (req, res) => {
  try {
    const { blogId } = req.params;
    const blog = await Blog.findById(blogId);

    if (!blog) return res.status(404).json({ message: 'Blog not found' });
    const student = await Student.findById(req.student._id);
    const hasLiked = blog.likes.includes(student._id);

    if (!hasLiked) {
      blog.likes.push(student._id);
      student.likedBlogs.push(blog._id);
      await blog.save();
      await student.save();
      return res.status(200).json({ message: 'Blog liked' });
    } else {
      blog.likes = blog.likes.filter(id => id.toString() !== student._id.toString());
      student.likedBlogs = student.likedBlogs.filter(id => id.toString() !== blog._id.toString());
      await blog.save();
      await student.save();
      return res.status(200).json({ message: 'Blog unliked' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Error liking/unliking blog' });
  }
};

// 8. Comment on a blog
export const commentOnBlog = async (req, res) => {
  try {

    const { blogId } = req.params;
    
    const  {comment}  = req.body;
     
    if (!comment || comment.trim() === "") {
      return res.status(400).json({ message: 'Comment cannot be empty' });
    }

    const blog = await Blog.findById(blogId);
    if (!blog) return res.status(404).json({ message: 'Blog not found' });

    blog.comments.push({
      student: req.student._id,
      comment
    });

    await blog.save();
    res.status(200).json({ message: 'Comment added' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const createBlog = async (req, res) => {
  try {
    const { title, description,section } = req.body;
    if(!title|| !description||!section)
      {
        return res.status(400).json({ message: ' Complete details are  missing ' });
      }

    const coverimg = req.files['coverimg']?.[0]?.path || null;
    const photos = req.files['photos']?.map((file) => file.path) || [];
    const pdfs = req.files['pdfs']?.map((file) => file.path) || [];
    if (!coverimg) {
      return res.status(400).json({ message: 'Cover image is required' });
    }
   

    const newBlog = await Blog.create({
      title,
      description,
      coverimg,
      photos,
      pdfs,
      section: section,
      authorType: 'Student',
      studentId:req.student._id,
      
      status: 'pending', 
    });

    res.status(201).json({
      success: true,
      message: 'Blog created successfully',
      blog: newBlog,
    });
  } catch (error) {
    console.error('Error creating blog:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to create blog',
      error: error.message,
    });
  }
};

// Request password reset
export const requestPasswordReset = async (req, res) => {
  try {
    const { email } = req.body;
    const student = await Student.findOne({ email });
    
    if (!student) {
      return res.status(200).json({
        message: 'If an account with that email exists, we have sent a password reset link.'
      });
    }
    
    // Create JWT with user ID and password hash (as a secret fingerprint)
    // Including current password hash in payload ensures token invalidation after password change
    const resetToken = jwt.sign(
      { 
        id: student._id,
        passwordHash: student.password.substring(0, 10) // Using part of the hash as a "fingerprint"
      }, 
      process.env.JWT_SECRET, 
      { expiresIn: '1h' }
    );
    
    // In production, send via email
    res.status(200).json({
      message: 'If an account with that email exists, we have sent a password reset link.',
      resetToken // TODO: Remove in production
    });
  } catch (error) {
    res.status(500).json({ message: 'Error processing password reset request' });
  }
};

// Reset password using token
export const resetPassword = async (req, res) => {
  try {
    const { token, newPassword } = req.body;
    if (!token || !newPassword) {
      return res.status(400).json({ message: 'Token and new password are required' });
    }
    
    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const student = await Student.findById(decoded.id);
    
    if (!student) {
      return res.status(400).json({ message: 'Invalid reset token' });
    }
    
    // Check if password hash in token matches current hash (validates token is still relevant)
    if (student.password.substring(0, 10) !== decoded.passwordHash) {
      return res.status(400).json({ message: 'Password has already been changed' });
    }
    
    // Hash new password and update student
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(newPassword, salt);
    
    student.password = hashedPassword;
    await student.save();
    
    res.status(200).json({ message: 'Password has been reset successfully' });
  } catch (error) {
    if (error.name === 'JsonWebTokenError') {
      return res.status(400).json({ message: 'Invalid token' });
    }
    if (error.name === 'TokenExpiredError') {
      return res.status(400).json({ message: 'Reset token has expired' });
    }
    res.status(500).json({ message: 'Error resetting password' });
  }
};