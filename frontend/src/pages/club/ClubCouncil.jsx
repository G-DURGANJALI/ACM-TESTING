
import React, { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

const ClubCouncil = ({ club }) => {
  const [editingId, setEditingId] = useState(null);
  const [newName, setNewName] = useState("");
  const [newImage, setNewImage] = useState(null);
  const [activeImageId, setActiveImageId] = useState(null);
  const [newRole, setNewRole] = useState("");

  const handleAddMember=async()=>{
       

   
    const formData = new FormData();
    formData.append("name", newName);
    formData.append("profilepic", newImage);
    formData.append("role", newRole);
    try {
      const res = await axios.post(
        `http://localhost:5000/api/club/add-council-member`,
        formData,
        {
          
          withCredentials: true,
        }
      );

      toast.success("Council member  added  successfully!");
      
       setNewRole("");
       setNewName("");
      setNewImage(null);
    } catch (error) {
      console.error(error);
      toast.error("Update failed");
    }


  }
  const handleNameEdit = (memberId, currentName) => {
    setEditingId(memberId);
    setNewName(currentName);
    setActiveImageId(null);
  };

  const handleImageEdit = (memberId) => {
    setActiveImageId(memberId);
   
 
  };
  const handleDelete=async(memberId)=>{
   
    try {
      const res = await axios.delete(
        `http://localhost:5000/api/club/delete-council-member/${memberId}`,
       
        {
          
          withCredentials: true,
        }
      );

      toast.success("Council member  Deleted  successfully!");
      
    } catch (error) {
      console.error(error);
      toast.error("Delete failed");
    }
  }
  const handleSubmit = async (e, memberId) => {
    if (e.key === "Enter") {
      e.preventDefault();

      const formData = new FormData();
      formData.append("name", newName);
      if (newImage) formData.append("profilepic", newImage);

      try {
        const res = await axios.put(
          `http://localhost:5000/api/club/update-council-member/${memberId}`,
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
            withCredentials: true,
          }
        );

        toast.success("Council member  profile updated successfully!");
        setEditingId(null);
        setActiveImageId(null);
        setNewImage(null);
      } catch (error) {
        console.error(error);
        toast.error("Update failed");
      }
    }
  };

  return (
    <div className="p-6 bg-white dark:bg-gray-800 rounded-lg shadow-lg">
      <h2 className="text-xl font-semibold text-center text-gray-800 dark:text-white mb-6">
        Meet our Dynamic Council!
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mb-10">
        {club.clubCouncil.map((member, i) => (
          <div
            key={i}
            className="bg-white dark:bg-gray-700 p-4 rounded-lg shadow-md text-center hover:scale-105 transform transition duration-300"
          >
            <img
              src={member.profilepic}
              alt={member.name}
              className="w-24 h-24 rounded-full mx-auto mb-3 border-4 border-gray-200 dark:border-gray-600 object-cover"
            />

            {editingId === member._id ? (
              <textarea
                value={newName}
                onChange={(e) => setNewName(e.target.value)}
                onKeyDown={(e) => handleSubmit(e, member._id)}
                className="w-full mb-2 p-2 rounded border text-center text-sm dark:bg-gray-800 dark:text-white"
              />
            ) : (
              <h1 className="text-xl font-semibold text-gray-800 dark:text-white">{member.name}</h1>
            )}

            <button className="w-full py-2 mb-2 bg-purple-600 text-white rounded hover:bg-purple-700 transition">
              {member.role}
            </button>

            <button
              onClick={() => handleNameEdit(member._id, member.name)}
              className="w-full py-2 mb-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
            >
              Change Name
            </button>

            <button
              onClick={() => handleImageEdit(member._id)}
             className="w-full py-2 bg-gray-300 dark:bg-gray-600 text-gray-800 dark:text-white rounded hover:bg-gray-400 dark:hover:bg-gray-500 transition"
            >
              Upload New Photo
            </button>
             
            {activeImageId === member._id && (
              <div className="mt-2 text-left">
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => setNewImage(e.target.files[0])}
                  onKeyDown={(e) => handleSubmit(e, member._id)}
                  
                 className="w-full py-2 mb-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
                />
                <p className="text-xs text-gray-500 mt-1">
                  Press <strong>Enter</strong> to upload
                </p>
              </div>
            )}
               <button 
                onClick={() => handleDelete(member._id)}
               className="w-full py-2 mb-2 bg-purple-600 text-white rounded hover:bg-purple-700 transition">
               Delete Member 

            </button>
          </div>
        ))}
      </div>
           {/* Add New Member Section */}
           <div className="max-w-xl mx-auto mt-10 p-6 bg-gray-100 dark:bg-gray-700 rounded-lg shadow-md">
        <h3 className="text-xl font-semibold text-gray-800 dark:text-white mb-4 text-center">Add New Member</h3>
        <div className="space-y-4">
          <input
            type="text"
            placeholder="Role (e.g., Design Head)"
            value={newRole}
            onChange={(e) => setNewRole(e.target.value)}
            className="w-full p-2 rounded border dark:bg-gray-800 dark:text-white"
          />
          <input
            type="text"
            placeholder="Full Name"
            value={newName}
            onChange={(e) => setNewName(e.target.value)}
            className="w-full p-2 rounded border dark:bg-gray-800 dark:text-white"
          />
          <div className="flex items-center space-x-4">
  <input
    type="file"
    id="newImageInput"
    accept="image/*"
    onChange={(e) => setNewImage(e.target.files[0])}
    className="hidden"
  />
  <button
    type="button"
    onClick={() => document.getElementById("newImageInput").click()}
    className="px-4 py-2 bg-gray-300 dark:bg-gray-600 text-gray-800 dark:text-white rounded hover:bg-gray-400 dark:hover:bg-gray-500 transition"
  >
    Choose Photo
  </button>
  <span className="text-sm text-gray-700 dark:text-gray-300">
    {newImage ? newImage.name : "No file chosen"}
  </span>
</div>

          <button
            onClick={handleAddMember}
            className="w-full py-2 bg-green-600 text-white rounded hover:bg-green-700 transition"
          >
            Add Member
          </button>
        </div>
      </div>
    
    
    </div>
  );
};

export default ClubCouncil;
