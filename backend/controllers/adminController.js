
import Blog from '../models/Blog.js';
import Club from '../models/Club.js';

export const allClubs = async (req, res) => {
  try {
    const clubs = await Club.find();
    res.status(200).json({success:true,clubs});
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch pending clubs' });
  }
};

export const approveClub = async (req, res) => {
  try {
    const club = await Club.findById(req.params.clubId);
    if (!club) return res.status(404).json({ message: 'Club not found' });

    club.isApproved = true;
    await club.save();
    res.status(200).json({ message: 'Club approved successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Failed to approve club' });
  }
};

export const rejectClub = async (req, res) => {
  try {
    const club = await Club.findById(req.params.clubId);
    if (!club) return res.status(404).json({ message: 'Club not found' });

    await Club.findByIdAndDelete(req.params.clubId); // or set isRejected = true if you want to keep data
    res.status(200).json({ message: 'Club rejected and deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Failed to reject club' });
  }
};

// --- BLOGS ---

export const allBlogs = async (req, res) => {
  try {
    const blogs = await Blog.find();
    res.status(200).json( {
      success: true,
      blogs
    });
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch pending blogs' });
  }
};

export const approveBlog = async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.blogId);
    if (!blog) return res.status(404).json({ message: 'Blog not found' });

    blog.status = 'approved';
    await blog.save();
    res.status(200).json({ success: true,message: 'Blog approved successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Failed to approve blog' });
  }
};

export const rejectBlog = async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.blogId);
    if (!blog) return res.status(404).json({ message: 'Blog not found' });

    blog.status = 'rejected';
    await Blog.findByIdAndDelete(req.params.blogId);
   
    res.status(200).json({ message: 'Blog rejected  and deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Failed to reject blog' });
  }
};

