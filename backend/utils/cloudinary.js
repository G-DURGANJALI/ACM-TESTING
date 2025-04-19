import { v2 as cloudinary } from 'cloudinary';
import dotenv from 'dotenv';
dotenv.config();
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});
export const deleteImage = async (url) => {
  if (!url) return;

  try {
    // Extract public_id from URL
    const segments = url.split('/');
    const filename = segments[segments.length - 1];
    const publicId = `collegeBlogs/${filename.split('.')[0]}`; // since you store in 'collegeBlogs' folder

    await cloudinary.uploader.destroy(publicId, { resource_type: 'image' });
  } catch (err) {
    console.error('Cloudinary delete error:', err.message);
  }
};

export default cloudinary;