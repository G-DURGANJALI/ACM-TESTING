
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Menu, X, Sun, Moon, Search, CircleUserRound } from "lucide-react";
import axios from "../../api/axios";
import { toast } from "react-toastify";
import { motion } from "framer-motion";
import { useNavigate, useLocation } from "react-router-dom";
import Clubinfo from "./Clubinfo";
import Postblog from "./postblog";
import FullBlogView from "./FullBlogcard";
import AllBlogs from "./AllBlogs";
export const fetchAllClubs = async () => {
  try {
    const response = await axios.get(
      "http://localhost:5000/api/students/clubs",
      {
        withCredentials: true, // in case you're using cookies for auth
      }
    );
    return response.data; // this should be the list of clubs
  } catch (error) {
    console.error("Error fetching clubs:", error);
    throw error;
  }
};
export const fetchstudentinfo = async () => {
  try {
    const name = "abx";

    const response = await axios.get("http://localhost:5000/api/students/me", {
      withCredentials: true, // in case you're using cookies for auth
    });
    return response.data; // this should be the list of clubs
  } catch (error) {
    console.error("Error fetching clubs:", error);
    throw error;
  }
};
export const fetchallblogs = async () => {
  try {
    const name = "abx";

    const response = await axios.get("http://localhost:5000/api/students/blogs", {
      withCredentials: true, // in case you're using cookies for auth
    });
    return response.data; // this should be the list of clubs
  } catch (error) {
    console.error("Error fetching clubs:", error);
    throw error;
  }
};

const StudentHome = () => {
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [likedBlogs, setLikedBlogs] = useState([]);
  const [savedBlogs, setSavedBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [clubs, setClubs] = useState([]);
  const [student, setstudent] = useState([]);
  const [blogs,setblogs]=useState([]);

  const getClubById = (clubsArray, clubId) => {
    return clubsArray.find((club) => club._id === clubId);
  };
  const getblogbyid = (blogsArray, id) => {
    return blogsArray.find((blog) => blog._id === id);
  };
  const filterBlogsByClub = (blogs, clubId) => {
    if (!Array.isArray(blogs) || !clubId) return [];
  
    return blogs.filter((blog) => blog.clubId === clubId);
  };
  const getsectionblogs = (blogs, section) => {
    if (!Array.isArray(blogs) || !section) return [];
  
    return blogs.filter((blog) => blog.section === section);
  };
  const toggleTheme = () => setDarkMode(!darkMode);


  useEffect(() => {
    const getClubs = async () => {
      try {
        const clubData = await fetchAllClubs();
        const studentdata = await fetchstudentinfo();
         const blogdata=await fetchallblogs();
        setstudent(studentdata);
        setClubs(clubData);
        setblogs(blogdata);
        setLoading(false);
      } catch (err) {
        console.error("Failed to load clubs:", err);
        setLoading(false);
      }
    };

    getClubs();
  }, []);
  
  const tab = new URLSearchParams(location.search).get("tab") || "allBlogs";
  const id = new URLSearchParams(location.search).get("id") || 12;

   
  const renderTabContent = () => {

    if(tab==="clubinfo")
    {
      const foundClub = getClubById(clubs, id);
      return <Clubinfo club={foundClub}/>
    }
    else if(tab==="postblog")
    {
       return <Postblog/>
    }
    else if(tab==="clubblogs")
    {
      const clubblogs=filterBlogsByClub(blogs,id);
      return <AllBlogs blogs={clubblogs}/>
    }
    else if(tab==="fullcard")
    {
        const blog=getblogbyid(blogs,id);
        return <FullBlogView blog={blog} student={student}/>
        
    }
    else if(tab==="Experience"||tab==="Academic Resources"||tab==="Intern"||tab==="Tech Stacks" )
    {
      // section wise blogs 
      const sectionblogs=getsectionblogs(blogs,tab);
      return <AllBlogs blogs={sectionblogs}/>

    }
    else{
      return <AllBlogs blogs={blogs}/>
      
    }
   
  };

  if (loading) return <p>Loading clubs...</p>;
  return (
    <div
      className={`flex h-screen ${
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
          <h1 className="text-xl font-bold">Student Panel</h1>
          <button className="md:hidden" onClick={() => setSidebarOpen(false)}>
            <X />
          </button>
        </div>
        <nav className="p-4 space-y-4 text-sm">
          <div>
            <h3 className="text-lg font-semibold mb-2">Student Blogs</h3>
            <Link
              to="/student/home?tab=home"
              className="block px-3 py-2 rounded hover:bg-blue-700"
            >
               Home
            </Link>
            <Link
              to="/student/home?tab=Intern"
              className="block px-3 py-2 rounded hover:bg-blue-700"
            >
              Intern / Placemnet
            </Link>
            <Link
              to="/student/home?tab=Academic Resources"
              className="block px-3 py-2 rounded hover:bg-blue-700"
            >
              Academic Resources
            </Link>
            <Link
              to="/student/home?tab=Tech Stacks"
              className="block px-3 py-2 rounded hover:bg-blue-700"
            >
              Tech Stacks
            </Link>
            <Link
              to="/student/home?tab=Experience"
              className="block px-3 py-2 rounded hover:bg-blue-700"
            >
              Experience
            </Link>
           
            <Link
              to="/student/home?tab=postblog"
              className="block px-3 py-2 rounded hover:bg-blue-700"
            >
              Post New Blog
            </Link>
          </div>

          <div>
            <h3 className="text-lg font-semibold mt-4 mb-2">Clubs</h3>
            {clubs.map((club) => (
              <div key={club._id} className="ml-2">
                <p className="font-medium uppercase">{club.name}</p>
                <Link
                  to={`/student/home?tab=clubinfo&&id=${club._id}`}
                  className="block ml-3 mt-1 px-2 py-1 rounded hover:bg-blue-700"
                >
                  Club Info
                </Link>
                <Link
                  to={`/student/home?tab=clubblogs&&id=${club._id}`}
                  className="block ml-3 px-2 py-1 rounded hover:bg-blue-700"
                >
                  Club Blogs
                </Link>
              </div>
            ))}
          </div>
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
             {student.name}
          </h2>

          <div className="flex items-center gap-4">
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
            <button onClick={() => navigate("/StudentProfileSection")}>
              <img
                src={student.profilePic}
                alt="Profile"
                className="w-10 h-10 rounded-full object-cover border-2 border-gray-300"
              />
            </button>

            <button onClick={toggleTheme}>
              {darkMode ? <Sun /> : <Moon />}
            </button>

            <button
              onClick={() => navigate("/student/login")}
              className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded-md text-sm"
            >
              Logout
            </button>
          </div>
        </div>

        {/* Page content */}
        {/*<div className="p-6 overflow-y-auto flex-1">
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
                  <Link
                    to={`/blog/${blog._id}`}
                    className="text-blue-500 hover:underline mt-3 inline-block"
                  >
                    Read More
                  </Link>
                </div>
              ))
            ) : (
              <p>No blogs found.</p>
            )}
          </div>
        </div>*/}
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

export default StudentHome;
// show search item only in blogs page also search functionality  , shrae functionality , comment 
// implement share functionality 
//continue with google and forgot password 
// logout  // profile update,show liked blogs,his blogs 
