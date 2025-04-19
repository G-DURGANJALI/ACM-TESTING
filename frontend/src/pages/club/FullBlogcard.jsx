// src/pages/FullBlogView.jsx
import React, { useEffect, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";

const FullBlogView = ({blog}) => {
  const location = useLocation();
  const navigate = useNavigate();


  const [currentSlide, setCurrentSlide] = useState(0);



  if (!blog) return <div className="p-6">Loading blog ...</div>;

  const images = [blog.coverimg, ...blog.photos];
  const totalImages = images.length;

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % totalImages);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + totalImages) % totalImages);
  };

  return (
    <div className="max-w-4xl mx-auto p-4 space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <h2 className="text-3xl font-bold">{blog.title}</h2>
        <span className="text-red-600 font-semibold text-lg">
          ❤️ {blog.likes.length}
        </span>
      </div>

      {/* Image slider */}
      <div className="relative w-full h-80 rounded overflow-hidden">
        <img
          src={images[currentSlide]}
          alt="Blog Slide"
          className="w-full h-full object-cover rounded shadow-lg"
        />
        <button
          onClick={prevSlide}
          className="absolute top-1/2 left-2 transform -translate-y-1/2 bg-white p-1 rounded-full shadow hover:bg-gray-200"
        >
          <ChevronLeft />
        </button>
        <button
          onClick={nextSlide}
          className="absolute top-1/2 right-2 transform -translate-y-1/2 bg-white p-1 rounded-full shadow hover:bg-gray-200"
        >
          <ChevronRight />
        </button>
      </div>

      {/* Description */}
      <div>
        <h3 className="text-xl font-semibold mb-2">Description:</h3>
        <p className="text-gray-700 dark:text-gray-200">{blog.description}</p>
     
      </div>

      {/* Comments */}
      <div>
        <h3 className="text-xl font-semibold mb-2">Comments:</h3>
        {blog.comments.length === 0 ? (
          <p className="text-gray-500">No comments yet.</p>
        ) : (
          <ul className="space-y-3">
            {blog.comments.map((c, idx) => (
              <li
                key={idx}
                className="bg-gray-100 dark:bg-gray-800 p-3 rounded shadow"
              >
                <span className="font-medium">{idx+1}</span>{" "}
                {c.comment}
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* Back button */}
      <button
        onClick={() => navigate("/club/home?tab=allBlogs")}
        className="mt-6 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
      >
        ⬅️ Back to Blogs
      </button>
    </div>
  );
};

export default FullBlogView;
