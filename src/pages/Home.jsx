import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

// const Home = ({ isLoggedIn }) => {

const Home = ({ isLoggedIn }) => {
  console.log("Received isLoggedIn in Home:", isLoggedIn);

  const navigate = useNavigate();

  const handleStartReading = () => {
    console.log("Start Reading button clicked");
    console.log("Current isLoggedIn value:", isLoggedIn);
    console.log("Navigate function:", navigate); // Check if navigate is defined
  
    if (!navigate) {
      console.error("Navigate is undefined! React Router might not be working.");
      return;
    }
  
    navigate(isLoggedIn ? "/my-blogs" : "/signup");
  };
  
  

  return (
    <div className="relative flex flex-col justify-center items-center min-h-screen bg-gradient-to-br from-[#0f2027] via-[#203a43] to-[#2c5364] overflow-hidden pt-2">
      {/* Floating Blur Effect */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-purple-400 opacity-30 blur-[120px] rounded-full animate-float"></div>
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-teal-400 opacity-30 blur-[120px] rounded-full animate-float-delay"></div>

      {/* Move Content Up */}
      <div className="mt-[-60px] flex flex-col items-center">
        {/* Animated Headline */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="font-noe text-6xl md:text-8xl font-bold text-center text-white drop-shadow-2xl"
        >
          <span className="block">Human</span>
          <span className="block text-5xl md:text-7xl text-gray-300 mt-2">
            Stories & Ideas
          </span>
        </motion.h1>

        {/* Animated Subtext */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 1, ease: "easeOut" }}
          className="font-inter text-lg md:text-xl text-gray-200 mt-6 text-center max-w-2xl px-4 py-3 rounded-lg bg-white/20 backdrop-blur-md shadow-lg"
        >
          A place to read, write, and deepen your understanding of the world.
        </motion.p>

        {/* Animated 3D Button */}
        <motion.button
          whileHover={{ scale: 1.05, y: -5 }}
          whileTap={{ scale: 0.95 }}
          className="relative z-10 mt-8 px-12 py-4 text-lg md:text-xl font-semibold rounded-full bg-gradient-to-r from-teal-500 to-purple-500 text-white transition-all duration-300 hover:from-teal-600 hover:to-purple-600 shadow-xl hover:shadow-2xl"
          onClick={handleStartReading}
        >
          Start Reading
        </motion.button>
      </div>

      {/* Decorative Grid Background */}
      <div className="absolute inset-0 z-0 opacity-10">
        <div className="grid grid-cols-12 gap-4 h-full w-full">
          {Array.from({ length: 144 }).map((_, index) => (
            <div
              key={index}
              className="border border-gray-300 rounded-lg"
            ></div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Home;