import React from 'react';
import { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import axios from 'axios';
import Home from './pages/Home';
import StudentLogin from './pages/student/StudentLogin';
import StudentRegister from './pages/student/StudentRegister';
import ClubLogin from './pages/club/ClubLogin';
import ClubRegister from './pages/club/ClubRegister';
import StudentHome from './pages/student/StudentHome';
import StudentProfileSection from './pages/student/StudentProfileSection';
import StudentProfileEditSection from './pages/student/StudentProfileEditSection';
import StudentPasswordEditSection from './pages/student/StudentPasswordEditSection';
import ClubHome from './pages/club/ClubHome';
import AdminDashboard from './pages/admin/AdminDashboard';
import NotFound from './pages/NotFound';
import SSOCallback from './pages/auth/SSOCallback';
import { ClerkProvider } from '@clerk/clerk-react';

import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import ForgotPassword from './pages/student/ForgotPassword';
axios.defaults.withCredentials = true;

export default function App() {
  return (
    <ClerkProvider publishableKey={import.meta.env.VITE_CLERK_PUBLISHABLE_KEY}>
      <Router>
        <ToastContainer position="top-right" autoClose={3000} />
        <Routes>
          {/* Landing/Home Page */}
          <Route path="/" element={<Home />} />

          {/* Auth Routes */}
          <Route path="/sso-callback" element={<SSOCallback />} />
          
          {/* Student Auth */}
          <Route path="/student/login" element={<StudentLogin />} />
          <Route path="/student/register" element={<StudentRegister />} />
          <Route path="/StudentProfileSection" element={<StudentProfileSection />} />
          <Route path="/StudentProfileEditSection" element={<StudentProfileEditSection />} />
          <Route path="/StudentPasswordEditSection" element={<StudentPasswordEditSection />} />
          <Route path="/student/forgotPassword" element={<ForgotPassword />} />

          {/* Club Auth */}
          <Route path="/club/login" element={<ClubLogin />} />
          <Route path="/club/register" element={<ClubRegister />} />

          {/* Redirect based on role */}
          <Route path="/student/home" element={<StudentHome />} />
          <Route path="/club/home" element={<ClubHome />} />
          <Route path="/admin" element={<AdminDashboard />} />

          {/* 404 Page */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Router>
    </ClerkProvider>
  );
}
