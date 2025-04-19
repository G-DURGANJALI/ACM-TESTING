import { Link } from 'react-router-dom';

export default function App() {
  return (
    <div className="h-screen flex flex-col items-center justify-center text-center bg-gray-50 px-4">
      <h1 className="text-5xl font-bold text-red-500 mb-4">404</h1>
      <p className="text-lg text-gray-600 mb-6">Oops! Page not found.</p>
      <Link to="/" className="text-blue-600 hover:underline">
        Go back to Home
      </Link>
    </div>
  );
}