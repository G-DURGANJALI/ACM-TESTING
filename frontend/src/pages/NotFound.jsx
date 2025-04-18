import React from 'react';
import { Link } from 'react-router-dom';

const NotFound = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 px-4">
      <div className="text-center">
        <h1 className="text-9xl font-extrabold text-gray-800">404</h1>
        <p className="text-2xl mt-4 text-gray-700">Page Not Found</p>
        <p className="mt-2 text-gray-500">Sorry, the page you’re looking for doesn’t exist.</p>
        <Link
          to="/"
          className="mt-6 inline-block px-6 py-2 text-white bg-blue-600 hover:bg-blue-700 rounded-lg transition"
        >
          Go Home
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
