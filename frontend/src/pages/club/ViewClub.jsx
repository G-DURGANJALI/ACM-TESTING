import React, { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
const ViewClub = ({club}) => {
  const [logo, setLogo] = useState("/images/acm-logo.png"); // Default logo path
 const [newName, setNewName] = useState("");
    const [edit, setedit] = useState(false);
  const handleLogoChange = async(e) => {
    const file = e.target.files[0];
    try {
      const formData = new FormData();
      formData.append('photo', file);
  
      const response = await axios.put(
        'http://localhost:5000/api/club/update-profile-photo',
        formData,
        {
          withCredentials: true,
        }
      );
  
      toast.success('Profile photo updated successfully!');
      return response.data;
    } catch (error) {
      console.error('Error uploading photo:', error);
      toast.error(error?.response?.data?.message || 'Failed to update photo');
    }
  };
  const handleSubmit = async(e) => {
   
    try {
      const formData = new FormData();
      formData.append('description', newName);
  
      const response = await axios.put(
        'http://localhost:5000/api/club/update-description',
        formData,
        {
          withCredentials: true,
        }
      );
  
      toast.success('Profile photo updated successfully!');
      setNewName("");
      setedit(false);
      return response.data;

    } catch (error) {
      console.error('Error updating  description :', error);
      toast.error(error?.response?.data?.message || 'Failed to update photo');
    }
  };
  return (
    <div className="max-w-3xl mx-auto p-6 bg-white dark:bg-gray-800 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-6 text-center">ACM Coding Club</h2>

      {/* Centered Club Logo Section */}
      <div className="mb-6 flex flex-col items-center">
        <p className="text-lg font-semibold text-gray-700 dark:text-gray-300 mb-2">Club Logo:</p>
        <img
          src={club.photo}
          alt="Club Logo"
          className="w-28 h-28 object-contain border-2 border-gray-300 dark:border-gray-600 rounded mb-3"
        />
        <input
          id="logoInput"
          type="file"
          accept="image/*"
          onChange={handleLogoChange}
          className="hidden"
        />
        <button
          onClick={() => document.getElementById("logoInput").click()}
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
        >
          Upload New Logo
        </button>
      </div>

      {/* Club Description */}
      {/*<p className="text-gray-700 dark:text-gray-300 text-center">
       {club.description}
      </p>*/}
      {edit=== true ? (
              <textarea
                value={newName}
                onChange={(e) => setNewName(e.target.value)}
               
                className="w-full mb-2 p-2 rounded border text-center text-sm dark:bg-gray-800 dark:text-white"
              />
            ) : (
              <p className="text-gray-700 dark:text-gray-300 text-center">
       {club.description}
      </p>
            )}
               <button
          onClick={() => {
            setNewName(club.description);
             setedit(true);
           
          }

          }
         className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
        >
          Update description
        </button>
      

     
      
    </div>
  );
};
// update description and styling is pending 
export default ViewClub;
