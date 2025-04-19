import React, { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import StudentProfileEditSection from "./StudentProfileEditSection";

function Profile() {
    const navigate = useNavigate();

    const [name, setName] = useState("User name");
    const [photo, setPhoto] = useState(null);

    useEffect(() => {
        const storedName = localStorage.getItem("profileName");
        const storedPhoto = localStorage.getItem("profilePhoto");

        if (storedName) setName(storedName);
        if (storedPhoto) setPhoto(storedPhoto);
    }, []);

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <div className="p-10 w-[20rem] w-full bg-white border border-gray-200 shadow-2xl rounded-3xl flex flex-col items-center transition duration-300 hover:shadow-[0_10px_40px_rgba(0,0,0,0.1)] hover:border-blue-300">

                {/* Profile Picture and Name */}
                <div className="flex items-center gap-6 mb-10">
                    <img
                        className="w-32 h-32 rounded-full object-cover border-4 border-blue-400 shadow"
                    />
                    <div className="text-left">
                        <h1 className="text-4xl sm:text-5xl font-bold text-gray-800">{name}</h1>
                    </div>
                </div>

                {/* Buttons Section */}
                <div className="w-full flex flex-col gap-4">
                    <button
                        className="w-full bg-blue-500 hover:scale-105 bg-blue-600 transition duration-300 text-white py-3 rounded-xl text-lg font-medium shadow"
                        onClick={() => navigate("/StudentProfileEditSection")}
                    >
                        Edit Profile
                    </button>
                    <button
                        className="w-full bg-purple-500 hover:scale-105 bg-purple-600 transition duration-300 text-white py-3 rounded-xl text-lg font-medium shadow"
                        onClick={() => navigate("/Posted")}
                    >
                        Posted  Blogs
                    </button>
                    <button
                        className="w-full bg-pink-500 hover:scale-105 bg-pink-600 transition duration-300 text-white py-3 rounded-xl text-lg font-medium shadow"
                        onClick={() => navigate("/LikedBlogs")}
                    >
                        Liked Blogs
                    </button>
                </div>
            </div>
            {/* Your content goes here */}
        </div>
    );
}

export default Profile;
