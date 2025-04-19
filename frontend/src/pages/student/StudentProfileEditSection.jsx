import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import StudentPasswordEditSection from "./StudentPasswordEditSection"

function EditProfile() {
    const [name, setName] = useState(""); 
    const [photo, setPhoto] = useState(null); 
    const [preview, setPreview] = useState(null);
    const [changes, setChanges] = useState(false);


    const navigate = useNavigate();

    // Load profile data from localStorage when component mounts
    useEffect(() => {
        const savedName = localStorage.getItem("profileName");
        const savedPhoto = localStorage.getItem("profilePhoto");

        if (savedName) {
            setName(savedName);
        }

        if (savedPhoto) {
            setPreview(savedPhoto);
        }
    }, []);

    const changeName = (e) => {
        setName(e);
        setChanges(true);
    }

    const changePassword = () => {
        setChanges(true);
    }

    const handlePhotoChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setPhoto(file);
            setPreview(URL.createObjectURL(file));
        }
        setChanges(true);
    };

    const handleSave = () => {
        if(changes === false){
            toast.error("No changes were done!")
            return ;
        }

        if (preview && typeof preview === "string") {
            URL.revokeObjectURL(preview);
        }
    
        // Save to localStorage
        localStorage.setItem("profileName", name);
        localStorage.setItem("profilePhoto", preview);
    
        toast.success("Profile updated successfully!");
    
        navigate("/");
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <div className="p-10 max-w-md w-full bg-white border border-gray-200 shadow-2xl rounded-3xl flex flex-col  transition duration-300 hover:shadow-[0_10px_40px_rgba(0,0,0,0.1)] hover:border-blue-300">
            <h1 className="text-4xl text-pink-600 font-bold mb-10 text-center ">Edit Profile</h1>

            <div className="flex flex-col items-center">
                <label htmlFor="profilePhoto">
                    <img
                        src={preview || "https://via.placeholder.com/150"} 
                        className="w-32 h-32 rounded-full object-cover cursor-pointer border-2 border-gray-300"
                    />
                </label>
                <input
                    type="file"
                    id="profilePhoto"
                    accept="image/*"
                    className="hidden"
                    onChange={handlePhotoChange}
                />
                <p className="text-sm text-gray-500 mt-2">Click image to change photo</p>
            </div>

            <div className="mt-6">
                <label className="block ml-0 text-lg font-medium mb-2">Edit name</label>
                <input
                    type="text"
                    className="w-full border border-gray-300 p-2 rounded  "
                    value={name}
                    onChange={(e) => changeName(e.target.value)}
                    alt="Name"
                />
            </div>
            <br></br>

<button className="mt-6 w-full bg-blue-500 hover:scale-105 bg-blue-600 text-white py-2 rounded-2xl text-lg" onChange = {() => changePassword()} onClick={() => navigate("/StudentPasswordEditSection")}>Change password</button>

            <button
                className="mt-6 w-full bg-green-500 hover:scale-105 bg-green-600 text-white py-2 rounded-2xl text-lg"
                onClick={handleSave}
            >
                Save changes
            </button>
        </div>
     </div>
    );
}

export default EditProfile;
