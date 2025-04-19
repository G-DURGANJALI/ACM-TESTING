import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Search, Menu, X, CircleUserRound , Moon, Sun } from "lucide-react";
import axios from "axios";
import { toast } from "react-toastify";
import StudentProfileSection from "./StudentProfileSection.jsx";
import { useClerk } from "@clerk/clerk-react";

const StudentHome = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const [blogs, setBlogs] = useState([]); // Initialize as an empty array
  const [clubs, setClubs] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [likedBlogs, setLikedBlogs] = useState([]);
  const [savedBlogs, setSavedBlogs] = useState([]);
  const navigate = useNavigate();
  const { signOut } = useClerk();

  // Fetching blogs and clubs data
  const fetchData = async () => {
    try {
      const blogsRes = await axios.get("/api/blogs");
      if (Array.isArray(blogsRes.data)) {
        setBlogs(blogsRes.data); // Ensure the response is an array
      } else {
        toast.error("Blogs data is not in the expected format.");
      }

      const clubsRes = await axios.get("/api/clubs");
      if (Array.isArray(clubsRes.data)) {
        setClubs(clubsRes.data); // Ensure clubs data is in array format
      } else {
        toast.error("Clubs data is not in the expected format.");
      }
    } catch (err) {
      console.error("Error fetching data:", err);
      toast.error("Failed to load blogs or clubs.");
    }
  };

  // Handle liking a blog
  const handleLike = async (blogId) => {
    try {
      await axios.post(`/api/student/like/${blogId}`);
      setLikedBlogs([...likedBlogs, blogId]);
      toast.success("Blog liked!");
    } catch (err) {
      toast.error("Error liking blog.");
    }
  };

  // Handle saving a blog
  const handleSave = async (blogId) => {
    try {
      await axios.post(`/api/student/save/${blogId}`);
      setSavedBlogs([...savedBlogs, blogId]);
      toast.success("Blog saved!");
    } catch (err) {
      toast.error("Error saving blog.");
    }
  };

  // Handle theme toggle
  const toggleTheme = () => {
    setDarkMode(!darkMode);
    document.documentElement.classList.toggle("dark");
  };

  // Handle logout
  const handleLogout = async () => {
    try {
      // Sign out from Clerk
      await signOut();
      // Sign out from our backend
      await axios.post("http://localhost:5000/api/students/logout");
      toast.success("Logged out successfully");
      navigate("/student/login");
    } catch (err) {
      console.error("Logout error:", err);
      toast.error("Error logging out");
    }
  };

  // Filter blogs based on search term
  const filteredBlogs = blogs.filter(
    (blog) =>
      blog.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      blog.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  useEffect(() => {
    fetchData();
  }, []);

  const goToProfileSection = () => {
    useNavigate("/StudentProfileSection");
  }

  return (
    <div className={`flex h-screen ${darkMode ? "bg-gray-900 text-white" : "bg-gray-100 text-black"}`}>
      {/* Sidebar */}
      <div className={`fixed z-30 md:static top-0 left-0 h-full w-64 ${darkMode ? "bg-gray-800" : "bg-blue-900"} text-white transform transition-transform duration-300 ${sidebarOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"}`}>
        <div className="flex items-center justify-between px-4 py-4 border-b border-blue-700">
          <h1 className="text-xl font-bold">Student Panel</h1>
          <button className="md:hidden" onClick={() => setSidebarOpen(false)}>
            <X />
          </button>
        </div>
        <nav className="p-4 space-y-4">
          <div>
            <h3 className="text-lg font-semibold mb-2">Clubs</h3>
            {clubs.map((club) => (
              <Link
                key={club._id}
                to={`/club/${club._id}`}
                className="block px-3 py-2 rounded hover:bg-blue-700"
              >
                {club.name}
              </Link>
            ))}
          </div>
        </nav>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Navbar */}
        <div className={`flex justify-between items-center shadow-md px-4 py-4 md:px-6 ${darkMode ? "bg-gray-800 text-white" : "bg-white text-black"}`}>
          <button className="md:hidden" onClick={() => setSidebarOpen(true)}>
            <Menu />
          </button>

          <h2 className="text-xl font-semibold text-blue-700 dark:text-white">Welcome Student</h2>

          <div className="flex items-center gap-4">
            {/* Search Bar */}
            <div className="flex items-center bg-gray-200 dark:bg-gray-700 rounded-lg px-4 py-2">
              <Search className="text-gray-500 dark:text-gray-400" />
              <input
                type="text"
                className="bg-transparent text-sm ml-2 outline-none w-48"
                placeholder="Search blogs..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>

            {/* Notification */}
              <button onClick={ ()=> navigate("/StudentProfileSection")} ><CircleUserRound/></button>
              
            

            {/* Theme Toggle */}
            <button onClick={toggleTheme}>
              {darkMode ? <Sun /> : <Moon />}
            </button>

            {/* Logout */}
            <button onClick={handleLogout} className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded-md text-sm">
              Logout
            </button>
          </div>
        </div>

        {/* Page content */}
        <div className="p-6 overflow-y-auto flex-1">
          <h2 className="text-2xl font-bold mb-4">Blogs</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredBlogs.length > 0 ? (
              filteredBlogs.map((blog) => (
                <div
                  key={blog._id}
                  className="bg-white dark:bg-gray-800 p-4 rounded shadow-md hover:shadow-lg transition-shadow"
                >
                  <h3 className="text-lg font-semibold mb-2">{blog.title}</h3>
                  <p className="text-sm mb-4">{blog.description}</p>
                  <div className="flex items-center justify-between">
                    <button
                      onClick={() => handleLike(blog._id)}
                      className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded text-sm"
                    >
                      {likedBlogs.includes(blog._id) ? "Liked" : "Like"}
                    </button>
                    <button
                      onClick={() => handleSave(blog._id)}
                      className="bg-green-500 hover:bg-green-600 text-white px-3 py-1 rounded text-sm"
                    >
                      {savedBlogs.includes(blog._id) ? "Saved" : "Save"}
                    </button>
                  </div>
                  <Link to={`/blog/${blog._id}`} className="text-blue-500 hover:underline mt-3 inline-block">
                    Read More
                  </Link>
                </div>
              ))
            ) : (
              <p>No blogs found.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentHome;
