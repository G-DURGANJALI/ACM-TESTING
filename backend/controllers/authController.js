import bcrypt from 'bcryptjs';
import Student from '../models/student.js';
import Club from '../models/Club.js';
import generateToken from '../utils/generateToken.js';

// ------------------------ Student + Admin -----------------------

export const registerStudent = async (req, res) => {
  const { name,password, email } = req.body;

  try {
   
    const userExists = await Student.findOne({ email });
    if (userExists) return res.status(400).json({ message: 'Student already exists' });

    const hashedPassword = await bcrypt.hash(password, 10);
    let photo = "";
    if (req.file) {
      photo= req.file.path; // cloudinary URL from multer-storage-cloudinary
    }

    const student = await Student.create({
      name,
      email,
      password: hashedPassword,
      profilePic : photo,
    });

    generateToken(res, student._id, 'student');
    res.status(201).json({ message: 'Student registered successfully', student });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};

export const loginStudent = async (req, res) => {
  const { email, password } = req.body;

  try {
    // Admin login check
    if (
      email === process.env.ADMIN_EMAIL &&
      password === process.env.ADMIN_PASSWORD
    ) {
      generateToken(res, 'admin_id', 'admin');
      return res.status(200).json({ message: 'Admin login success', isAdmin: true, });
    }

    const student = await Student.findOne({ email });
    if (!student) return res.status(404).json({ message: 'Student not found' });

    const isMatch = await bcrypt.compare(password, student.password);
    if (!isMatch) return res.status(401).json({ message: 'Invalid credentials' });

    generateToken(res, student._id, 'student');
    res.status(200).json({ message: 'Student login success', student });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};

export const handleOAuthLogin = async (req, res) => {
  const { email, name, clerkId, photo } = req.body;
  console.log('OAuth Login Request:', { email, name, clerkId });

  try {
    // Check if user exists
    let student = await Student.findOne({ email });
    console.log('Existing student:', student);

    if (!student) {
      // Create new user if doesn't exist
      student = await Student.create({
        name,
        email,
        clerkId,
        profilePic: photo
      });
      console.log('Created new student:', student);
    } else {
      // Update existing user with Clerk ID if needed
      if (!student.clerkId) {
        student.clerkId = clerkId;
        student.profilePic = photo || student.profilePic;
        await student.save();
        console.log('Updated existing student with clerk ID:', student);
      }
    }

    // Generate token and send response
    generateToken(res, student._id, 'student');
    res.status(200).json({ 
      message: 'OAuth login successful',
      token: true,
      student: {
        _id: student._id,
        name: student.name,
        email: student.email,
        profilePic: student.profilePic
      }
    });
  } catch (error) {
    console.error('OAuth login error:', error);
    res.status(500).json({ message: 'OAuth login failed' });
  }
};

// -------------------------- Club -------------------------------
export const registerClub = async (req, res) => {
  const { name, password, description } = req.body;

  try {
   
    const clubExists = await Club.findOne({ name });
    if (clubExists) {
      return res.status(400).json({ message: "Club already exists" });
    }
   
    const hashedPassword = await bcrypt.hash(password, 10);
   
    let clubPhoto = "";
    if (req.file) {
      clubPhoto = req.file.path; // multer-storage-cloudinary gives the cloud URL here
    }
  
    const club = await Club.create({
      name,
      password: hashedPassword,
      description,
      photo: clubPhoto, // assuming 'photo' is the field in your model
    });
   
    generateToken(res, club._id, "club");

    res.status(201).json({
      message: "Club registered successfully",
      club,
    });
  } catch (err) {
    console.log("5");
    console.error("Error in club registration:", err);
    res.status(500).json({ message: "Server error" });
  }
};


export const loginClub = async (req, res) => {
  const { name, password } = req.body;

  try {
    const club = await Club.findOne({ name });
    if (!club) return res.status(404).json({ message: 'Club not found' });

    const isMatch = await bcrypt.compare(password, club.password);
    if (!isMatch) return res.status(401).json({ message: 'Invalid credentials' });

    generateToken(res, club._id, 'club');
    res.status(200).json({ message: 'Club login success', club });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};
// controllers/logoutController.js

export const logoutUser = async (req, res) => {
  try {
    console.log("inside");
    res
      .clearCookie("token", {
        httpOnly: true,
        sameSite: "Lax", // Or "None" if you're using cross-site cookies with HTTPS
        secure: process.env.NODE_ENV === "production", // true in production
      })
      .status(200)
      .json({ message: "Logged out successfully" });
  } catch (err) {
    console.error("Logout error:", err);
    res.status(500).json({ error: "Server error during logout" });
  }
};

export default logoutUser;

// done cpmpletely
