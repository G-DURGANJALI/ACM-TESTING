import React, { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { ImagePlus, FileText, UploadCloud } from "lucide-react";

const UploadBlog = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [coverImage, setCoverImage] = useState(null);
  const [coverPreview, setCoverPreview] = useState(null);
  const [images, setImages] = useState([]);
  const [imagePreviews, setImagePreviews] = useState([]);
  const [pdfs, setPdfs] = useState([]);

  const handleCoverImageChange = (e) => {
    const file = e.target.files[0];
    setCoverImage(file);
    if (file) {
      setCoverPreview(URL.createObjectURL(file));
    }
  };

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    setImages(files);
    const previews = files.map((file) => URL.createObjectURL(file));
    setImagePreviews(previews);
  };

  const handlePdfChange = (e) => {
    setPdfs(Array.from(e.target.files));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title || !description || !coverImage) {
      toast.error("Title, Description & Cover Image are mandatory!");
      return;
    }

    const formData = new FormData();
    formData.append("title", title);
    formData.append("description", description);
    formData.append("coverImage", coverImage);
    images.forEach((img) => formData.append("images", img));
    pdfs.forEach((pdf) => formData.append("pdfs", pdf));

    try {
      const res = await axios.post("/api/blogs/upload", formData);
      toast.success("Blog uploaded successfully!");
      setTitle("");
      setDescription("");
      setCoverImage(null);
      setCoverPreview(null);
      setImages([]);
      setImagePreviews([]);
      setPdfs([]);
    } catch (err) {
      console.error(err);
      toast.error("Upload failed!");
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-6 bg-gradient-to-br from-indigo-50 via-white to-blue-50 dark:from-gray-800 dark:via-gray-900 dark:to-gray-800 rounded-xl shadow-lg mt-8 w-[95%]">
      <h2 className="text-3xl font-extrabold mb-6 text-center text-indigo-700 dark:text-white">📤 Upload a Blog</h2>
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Title */}
        <div>
          <label className="block font-medium text-gray-700 dark:text-white">Blog Title *</label>
          <input
            type="text"
            className="w-full p-3 mt-1 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
            placeholder="Enter blog title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>

        {/* Description */}
        <div>
          <label className="block font-medium text-gray-700 dark:text-white">Description *</label>
          {/*<textarea
            className="w-full p-3 mt-1 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
            placeholder="Write your blog description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
            
          ></textarea>*/}
          <textarea
  className="w-full p-3 mt-1 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
  placeholder="Write your blog description"
  value={description}
  onChange={(e) => setDescription(e.target.value)}
  required
></textarea>

        </div>

        {/* Cover Image Upload */}
        <div>
          <label className="block font-medium text-gray-700 dark:text-white mb-1">Cover Image *</label>
          <label className="flex items-center gap-2 px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg cursor-pointer w-fit transition duration-300">
            <ImagePlus className="w-5 h-5" />
            Upload Cover
            <input
              type="file"
              accept="image/*"
              onChange={handleCoverImageChange}
              className="hidden"
              required
            />
          </label>
          {coverPreview && (
            <img
              src={coverPreview}
              alt="Cover Preview"
              className="mt-3 max-h-48 w-full object-cover rounded shadow-md"
            />
          )}
        </div>

        {/* Blog Images Upload */}
        <div>
          <label className="block font-medium text-gray-700 dark:text-white mb-1">Additional Images</label>
          <label className="flex items-center gap-2 px-4 py-2 bg-green-500 hover:bg-green-600 text-white rounded-lg cursor-pointer w-fit transition duration-300">
            <ImagePlus className="w-5 h-5" />
            Upload Images
            <input
              type="file"
              accept="image/*"
              multiple
              onChange={handleImageChange}
              className="hidden"
            />
          </label>
          {imagePreviews.length > 0 && (
            <div className="flex flex-wrap gap-2 mt-3">
              {imagePreviews.map((preview, i) => (
                <img
                  key={i}
                  src={preview}
                  alt={`Preview ${i}`}
                  className="h-24 w-24 object-cover rounded shadow-sm"
                />
              ))}
            </div>
          )}
        </div>

        {/* Blog PDFs Upload */}
        <div>
          <label className="block font-medium text-gray-700 dark:text-white mb-1">Attach PDFs</label>
          <label className="flex items-center gap-2 px-4 py-2 bg-yellow-500 hover:bg-yellow-600 text-white rounded-lg cursor-pointer w-fit transition duration-300">
            <FileText className="w-5 h-5" />
            Upload PDFs
            <input
              type="file"
              accept="application/pdf"
              multiple
              onChange={handlePdfChange}
              className="hidden"
            />
          </label>
          {pdfs.length > 0 && (
            <div className="mt-2 space-y-1 text-sm text-gray-600 dark:text-gray-300">
              {pdfs.map((pdf, i) => (
                <div key={i} className="flex items-center gap-1">
                  <FileText size={16} />
                  {pdf.name}
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Submit Button */}
        <div className="text-center">
          <button
            type="submit"
            className="bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white font-semibold px-8 py-3 rounded-full shadow-lg transition duration-300 flex items-center justify-center gap-2"
          >
            <UploadCloud className="w-5 h-5" />
            Publish Blog
          </button>
        </div>
      </form>
    </div>
  );
};

export default UploadBlog;
