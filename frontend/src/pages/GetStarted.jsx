import React from "react";
import { useNavigate } from "react-router-dom";

const GetStarted = () => {
  const navigate = useNavigate(); // Hook for navigation

  const handleGetStarted = () => {
    navigate("/signup"); // Redirect to the Signup page
  };

  return (
    <div className="text-center py-12">
      <h1 className="text-2xl text-black font-semibold">Get Started</h1>
      <p className="text-lg text-gray-600 mb-5">
        Join us and start your journey today!
      </p>
      <button 
        onClick={handleGetStarted} 
        className="px-6 py-3 rounded-full bg-black text-white text-lg font-medium transition duration-300 hover:bg-gray-800"
      >
        Get Started
      </button>
    </div>
  );
};

export default GetStarted;
