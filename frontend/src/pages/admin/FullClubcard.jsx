
import React, { useEffect, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
const FullBlogView = ({clubId}) => {
  const location = useLocation();
  const navigate = useNavigate();
// reject button Nand route 
  const [club, setclub] = useState(null);
  const [currentSlide, setCurrentSlide] = useState(0);

  const fetchclub = async () => {
	try {
	  const res = await axios.get(`http://localhost:5000/api/admin/club/${clubId}`);
	  setclub(res.data);
	} catch (err) {
	  console.error("Failed to load blog", err);
	}
  };

  useEffect(() => {
	fetchclub();
  }, [clubId]);
   
  if (!club) return <div className="p-6">Loading club...</div>;
  const handleApprove=async (blogId)=>{
	try {
		const res = await axios.put(
		  `http://localhost:5000/api/admin/approve-club/${clubId}`,
		  {}, // since it's a PUT without body
		  { withCredentials: true } // for cookies/JWT session
		);
	
		if (res.data.success) {
		  toast.success("club  approved successfully!");
		  // Optionally update the UI here (e.g., refetch blog list or mark as approved)
		} else {
		  toast.error(res.data.message || "Failed to approve blog");
		}
	  } catch (err) {
		console.error("Approve blog error:", err);
		toast.error("Something went wrong while approving the blog");
	  }
  };



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
		<h2 className="text-3xl font-bold">{club.name}</h2>
		
	  </div>

	 

	  {/* Description */}
	  <div>
		<h3 className="text-xl font-semibold mb-2">Description:</h3>
		<p className="text-gray-700 dark:text-gray-200">{club.description}</p>
	
	  </div>
          {/* approval*/ }
		  {club.isApproved===false&&(
				<button
		   onClick={() => handleApprove(club._id)}
		  className="mt-auto px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition">
		     Approve
	     	</button>
			)
		  }
	 

	  {/* Back button */}
	  <button
		onClick={() => navigate("/admin?tab=pendingClub")}
		className="mt-6 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
	  >
		⬅️ Back to Blogs
	  </button>
	</div>
  );
};

export default FullBlogView;
