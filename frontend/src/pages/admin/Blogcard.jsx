import React from "react";
import { Heart, Share2 } from "lucide-react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const BlogCard = ({ blog }) => {
  const navigate = useNavigate();

  const handleReadMore = (blogId) => {
	navigate(`/admin?tab=fullblogcard&id=${blogId}`);
  };
  return (
	<div
	  className="bg-white dark:bg-gray-800 rounded-xl shadow-md overflow-hidden 
				 transform transition-transform duration-300 hover:scale-105 
				 hover:shadow-xl cursor-pointer flex flex-col"
	>
	  <img
		src={blog.coverimg}
		alt="cover"
		className="h-48 w-full object-cover transition-transform duration-300 hover:scale-110"
	  />
	  <div className="p-4 flex flex-col flex-grow">
		<h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-2">
		  {blog.title}
		</h3>
	
		<button
		   onClick={() => handleReadMore(blog._id)}
		  className="mt-auto px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition"
		>
		  Read
		</button>
	  </div>
	</div>
  );
};

export default BlogCard;
