import mongoose from 'mongoose';
import validator from 'validator';

const studentSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    validate: {
      validator: (value) => {
        return validator.isEmail(value);
      }
    },
  },
  password: {
    type: String,
    // Not required for OAuth users
  },
  profilePic: {
    type: String,
  },
  clerkId: {
    type: String,
    sparse: true, // Allows null values but ensures uniqueness when present
    unique: true,
  },
  likedBlogs: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Blog'
  }],
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Student = mongoose.models.Student || mongoose.model('Student', studentSchema);

export default Student;