import mongoose from 'mongoose';

const blogSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
    },
    coverimg: {
      type: String,
      required:true,

    },
    pdfs: [String],    // URLs to uploaded PDFs (Cloudinary or local)
    photos: [String],  // URLs to uploaded images

    authorType: {
      type: String,
      enum: ["Student", "Club"],
      required: true,
    },
    studentId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Student",
      default: null,
    },
     section: {
      type: String,
      enum: ["Intern", "Academic Resources", "Tech Stacks", "Experience", "Club"],
      required: true,
    },
    clubId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Club",
      default: null,
    },
   
    likes: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Student' }],
    comments: [
      {
        student: { type: mongoose.Schema.Types.ObjectId, ref: 'Student' },
        comment: String,
        createdAt: { type: Date, default: Date.now },
      },
    ],
    status: {
      type: String,
      enum: ['pending', 'approved', 'rejected'],
      default: 'pending',
    }
   
  },
  { timestamps: true }
);

const Blog = mongoose.model('Blog', blogSchema);
export default Blog;
// final blog model 