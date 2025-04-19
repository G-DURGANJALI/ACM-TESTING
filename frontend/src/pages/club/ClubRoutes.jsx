// src/routes/ClubRoutes.jsx
import React from "react";
import { Route } from "react-router-dom";

import AllBlogs from "../pages/Club/AllBlogs";
import ClubDashboard from "../pages/Club/ClubDashboard";
import BlogDetails from "../pages/Club/BlogDetails";
import UploadBlog from "../pages/Club/UploadBlog";

const ClubRoutes = () => {
  return (
    <>
      <Route path="/club/blogs" element={<AllBlogs />} />
      <Route path="/club/dashboard" element={<ClubDashboard />} />
      <Route path="/club/upload" element={<UploadBlog />} />
      <Route path="/blog/:id" element={<BlogDetails />} />
    </>
  );
};

export default ClubRoutes;
