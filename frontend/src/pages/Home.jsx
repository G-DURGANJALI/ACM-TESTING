import { useNavigate } from 'react-router-dom';

export default function Home() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 to-purple-200 flex flex-col justify-center items-center px-4">
      <h1 className="text-4xl md:text-5xl font-bold mb-6 text-center text-gray-800">Welcome to College Blog</h1>
      <p className="text-lg text-gray-600 mb-10 text-center max-w-lg">
        Share your ideas, internships, and academic resources. Choose how you'd like to get started.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full max-w-3xl">
        {/* Student Options */}
        <div className="bg-white rounded-2xl shadow-lg p-6 flex flex-col items-center">
          <h2 className="text-xl font-semibold mb-4 text-blue-600">Student</h2>
          <button
            onClick={() => navigate('/student/login')}
            className="w-full mb-3 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition"
          >
            Login as Student
          </button>
          <button
            onClick={() => navigate('/student/register')}
            className="w-full px-4 py-2 bg-blue-100 text-blue-800 rounded-lg hover:bg-blue-200 transition"
          >
            Register as Student
          </button>
        </div>

        {/* Club Options */}
        <div className="bg-white rounded-2xl shadow-lg p-6 flex flex-col items-center">
          <h2 className="text-xl font-semibold mb-4 text-purple-600">Club Representative</h2>
          <button
            onClick={() => navigate('/club/login')}
            className="w-full mb-3 px-4 py-2 bg-purple-500 text-white rounded-lg hover:bg-purple-600 transition"
          >
            Login as Club
          </button>
          <button
            onClick={() => navigate('/club/register')}
            className="w-full px-4 py-2 bg-purple-100 text-purple-800 rounded-lg hover:bg-purple-200 transition"
          >
            Register as Club
          </button>
        </div>
      </div>
    </div>
  );
}
// done 