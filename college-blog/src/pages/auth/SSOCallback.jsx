import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useClerk, useSignIn } from "@clerk/clerk-react";
import axios from "axios";
import { toast } from "react-toastify";

export default function SSOCallback() {
  const { handleRedirectCallback } = useClerk();
  const navigate = useNavigate();

  useEffect(() => {
    const handleCallback = async () => {
      try {
        console.log("Starting OAuth callback handling...");
        const response = await handleRedirectCallback();
        console.log("Clerk callback response:", response);

        if (!response?.userData) {
          throw new Error("Failed to get user data from OAuth provider");
        }

        // Send user data to our backend
        const { data } = await axios.post(
          `${import.meta.env.VITE_API_BASE_URL}/api/auth/student/oauth`,
          {
            email: response.userData.emailAddress,
            name: response.userData.fullName,
            clerkId: response.userData.id,
            photo: response.userData.imageUrl,
          }
        );

        console.log("Backend response:", data);

        if (data.token) {
          toast.success("Successfully logged in!");
          navigate("/student/home");
        } else {
          throw new Error("Authentication failed");
        }
      } catch (err) {
        console.error("OAuth callback error:", err);
        toast.error(err.message || "Login failed. Please try again.");
        navigate("/student/login");
      }
    };

    handleCallback();
  }, [handleRedirectCallback, navigate]);

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-blue-500 mx-auto mb-4"></div>
        <p className="text-gray-600">Completing sign in...</p>
      </div>
    </div>
  );
}