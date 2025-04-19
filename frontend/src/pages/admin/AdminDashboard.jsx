// src/pages/ClubHome.jsx
import React, { useState } from "react";
import { Menu, X, ChevronDown, ChevronRight, Moon, Sun } from "lucide-react";
import { motion } from "framer-motion";
import { useNavigate, useLocation } from "react-router-dom";

import AllBlogs from "./AllBlogs";
import Allclubs from "./Allclubs";
import FullBlogcard from "./FullBlogcard";
import axios from "axios";
import { toast } from "react-toastify";
import FullClubcard from "./FullClubcard";
export const fetchclubs = async () => {
  try {
    const res = await axios.get("http://localhost:5000/api/admin/all-clubs", {
      withCredentials: true,
    });
    return res.data.clubs;
  } catch (err) {
    console.error("Error fetching clubs:", err);
    //toast.error("Failed to load blogs");
  }
};
export const fetchblogs = async () => {
  try {
    const res = await axios.get("http://localhost:5000/api/admin/all-blogs", {
      withCredentials: true,
    });
      return res.data.blogs;
  } catch (err) {
    console.error("Error fetching blogs:", err);
    //toast.error("Failed to load blogs");
  } finally {
    setLoading(false);
  }
};
const AdminHome = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [collapseMenu, setCollapseMenu] = useState(null);
  const [darkMode, setDarkMode] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
   const [loading, setLoading] = useState(true); 
 
  const tab = new URLSearchParams(location.search).get("tab") || "allBlogs";
  const id = new URLSearchParams(location.search).get("id") || 12;
   useEffect(() => {
          const getinfo = async () => {
            try {
              const clubdata = await fetchclubinfo();
              setclub(clubdata);
              const blogsdata=await fetchclubblogs();
              setblogs(blogsdata);
              setLoading(false);
             
            } catch (err) {
              console.error("Failed to load clubs:", err);
              setLoading(false);
            }
          };
      
          getinfo();
        }, []);
 
 
  const handlelogout = async () => {
    console.log("hello");
    try {
      const res = await axios.get("http://localhost:5000/api/auth/logout", {
        withCredentials: true,
      });

      toast.success("Logout succesfully");
      navigate("/");
    } catch (err) {
      console.error("Error in inside :", err);
      //toast.error("Failed to logout ");
    }
  };

  const toggleTheme = () => {
    setDarkMode(!darkMode);
    document.documentElement.classList.toggle("dark");
  };

  const sidebarItems = [
    {
      title: "Manage Blogs",
      subItems: [
        { name: "Pending Blog", to: "/admin?tab=pendingBlogs" },
        { name: " All Blogs", to: "/admin?tab=allBlogs" },
      ],
    },
    {
      title: "Club Info",
      subItems: [
        { name: "Pending Clubs", to: "/admin?tab=pendingClub" },
        { name: " All clubs ", to: "/admin?tab=allclubs" },
      ],
    },
   
  ];

  const renderTabContent = () => {
    switch (tab) {
      case "pendingBlogs":
        return  <AllBlogs  />;
      case "allBlogs":
        return  <AllBlogs   />;

      case "pendingClub":
        return  <Allclubs />;
      case "allclubs":
          return  <Allclubs />;
      case "fullblogcard":
         return <FullBlogcard blogId={id} />;
      case "fullViewclub":
          return <FullClubcard  clubId={id} />;
    
      default:
        return <Allclubs />;
    }
  };
  // display og all blogs and all clubs are pending try for notifications too to 
  return (
    <div
      className={`flex h-screen transition-colors duration-500 ${
        darkMode ? "bg-gray-900 text-white" : "bg-gray-100 text-black"
      }`}
    >
      {/* Sidebar */}
      <div
        className={`fixed z-30 md:static top-0 left-0 h-full w-64 ${
          darkMode ? "bg-gray-800" : "bg-blue-900"
        } text-white transform transition-transform duration-300 ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"
        }`}
      >
        <div className="flex items-center justify-between px-4 py-4 border-b border-blue-700">
          <h1 className="text-xl font-bold">Admin Panel</h1>
          <button className="md:hidden" onClick={() => setSidebarOpen(false)}>
            <X />
          </button>
        </div>
        <nav className="p-4 space-y-4">
          {sidebarItems.map((item, i) => (
            <div key={i}>
              <div
                className="flex items-center justify-between cursor-pointer hover:bg-blue-800 px-3 py-2 rounded"
                onClick={() => setCollapseMenu(collapseMenu === i ? null : i)}
              >
                <span>{item.title}</span>
                {collapseMenu === i ? <ChevronDown /> : <ChevronRight />}
              </div>
              {collapseMenu === i && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  transition={{ duration: 0.3 }}
                  className="ml-4 mt-1 space-y-2"
                >
                  {item.subItems.map((sub, j) => (
                    <button
                      key={j}
                      onClick={() => navigate(sub.to)}
                      className="block text-left w-full px-3 py-1 rounded hover:bg-blue-700 text-sm"
                    >
                      {sub.name}
                    </button>
                  ))}
                </motion.div>
              )}
            </div>
          ))}
        </nav>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Navbar */}
        <div
          className={`flex justify-between items-center shadow-md px-4 py-4 md:px-6 ${
            darkMode ? "bg-gray-800 text-white" : "bg-white text-black"
          }`}
        >
          <button className="md:hidden" onClick={() => setSidebarOpen(true)}>
            <Menu />
          </button>

          <h2 className="text-xl font-semibold text-blue-700 dark:text-white">
            Hello  Admin 
          </h2>

          <div className="flex items-center gap-4">
           

            <button onClick={toggleTheme}>
              {darkMode ? <Sun /> : <Moon />}
            </button>

          
            <button
              onClick={handlelogout}
              className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 transition"
            >
              Logout
            </button>
          </div>
        </div>

        {/* Page content */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="p-6 overflow-y-auto flex-1"
        >
          {/*<h2 className="text-2xl font-bold mb-4 capitalize">
            {tab.replace(/([A-Z])/g, " $1")}
          </h2>*/}
          {renderTabContent()}
        </motion.div>
      </div>
    </div>
  );
};

export default AdminHome;
