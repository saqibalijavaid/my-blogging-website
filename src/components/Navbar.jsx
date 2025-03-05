// import React, { useState, createContext, useContext, useEffect } from "react";
// import { Link, useNavigate } from "react-router-dom";
// import { Sun, Moon, PenSquare } from "lucide-react";
// import logo from "../assets/logo.png";

// // Theme context components remain the same
// export const ThemeContext = createContext({
//   theme: "light",
//   toggleTheme: () => {},
// });

// export const useTheme = () => useContext(ThemeContext);

// export const ThemeProvider = ({ children }) => {
//   const [theme, setTheme] = useState("light");

//   const toggleTheme = () => {
//     const newTheme = theme === "light" ? "dark" : "light";
//     setTheme(newTheme);
//     document.documentElement.classList.toggle("dark");
//     localStorage.setItem("theme", newTheme);
//   };

//   useEffect(() => {
//     const savedTheme = localStorage.getItem("theme") || "light";
//     setTheme(savedTheme);
//     if (savedTheme === "dark") {
//       document.documentElement.classList.add("dark");
//     }
//   }, []);

//   return (
//     <ThemeContext.Provider value={{ theme, toggleTheme }}>
//       {children}
//     </ThemeContext.Provider>
//   );
// };

// const Navbar = ({ isLoggedIn, user, handleLogout }) => {
//   const navigate = useNavigate();
//   const [isDropdownOpen, setIsDropdownOpen] = useState(false);
//   const { theme, toggleTheme } = useTheme();
//   const [profilePicture, setProfilePicture] = useState(user?.photo || "");

//   useEffect(() => {
//     if (isLoggedIn) {
//       const loggedInUser = JSON.parse(localStorage.getItem("loggedInUser"));
//       const storedUsers = JSON.parse(localStorage.getItem("users")) || [];
//       const currentUser = storedUsers.find(
//         (u) => u.email === loggedInUser?.email
//       );
//       setProfilePicture(currentUser?.profilePicture || "");
//     }
//   }, [isLoggedIn]);

//   const toggleDropdown = () => {
//     setIsDropdownOpen(!isDropdownOpen);
//   };

//   const handleLogoClick = (e) => {
//     e.preventDefault();
//     navigate(isLoggedIn ? "/blogs" : "/");
//   };

//   const handleNavigation = (path) => {
//     navigate(path);
//     setIsDropdownOpen(false);
//   };

//   const handleUserLogout = () => {
//     handleLogout();
//     navigate("/");
//   };

//   const handleWriteClick = () => {
//     if (isLoggedIn) {
//       navigate("/create-blog");
//     } else {
//       navigate("/signin");
//     }
//   };

//   return (
//     <nav className="fixed top-0 left-0 w-full flex justify-between items-center px-6 py-3 bg-[#f5f5f5] border-b border-[#ccc] h-20 z-[1000] shadow-sm">
//       <div className="flex-shrink-0">
//         <a
//           href="/"
//           onClick={handleLogoClick}
//           className="flex items-center gap-2 no-underline"
//         >
//           <img
//             src={logo}
//             alt="Innovatica Logo"
//             className="h-[50px] w-auto cursor-pointer"
//           />
//           <span className="text-xl font-bold text-[#e4007c]">INNOVATICA</span>
//         </a>
//       </div>

//       <div className="flex items-center">
//         <div className="flex items-center space-x-8">
//           <Link
//             to="/our-story"
//             className="no-underline text-black font-medium text-base hover:opacity-70 transition-opacity duration-300"
//           >
//             Our Story
//           </Link>

//           <button
//             onClick={handleWriteClick}
//             className="flex items-center gap-2 text-black font-medium text-base hover:opacity-70 transition-opacity duration-300"
//           >
//             {isLoggedIn && <PenSquare size={18} />}
//             Write
//           </button>

//           {isLoggedIn ? (
//             <>
//               <button
//                 onClick={toggleTheme}
//                 className="p-2 rounded-full hover:bg-gray-200 transition-colors duration-300"
//               >
//                 {theme === "dark" ? <Sun size={22} /> : <Moon size={22} />}
//               </button>

//               <div className="relative">
//                 <button
//                   onClick={toggleDropdown}
//                   className="focus:outline-none"
//                   onBlur={() => setTimeout(() => setIsDropdownOpen(false), 200)}
//                 >
//                   {profilePicture ? (
//                     <img
//                       src={profilePicture}
//                       alt="Profile"
//                       className="h-10 w-10 rounded-full object-cover"
//                     />
//                   ) : (
//                     <div className="h-10 w-10 rounded-full bg-gray-300 flex items-center justify-center text-xl font-bold">
//                       {user?.name?.charAt(0)}
//                     </div>
//                   )}
//                 </button>
//                 {isDropdownOpen && (
//                   <div className="absolute right-0 mt-2 w-60 rounded-2xl shadow-xl bg-white/90 backdrop-blur-md border border-gray-300 ring-1 ring-gray-400/50 z-[1001] transform transition-all duration-300 ease-in-out scale-95 hover:scale-100">
//                     <div className="py-2 divide-y divide-gray-300/70">
//                       <button
//                         onClick={() => handleNavigation("/user-details")}
//                         className="w-full text-left px-5 py-3 text-[15px] font-semibold text-gray-800 hover:bg-gray-100 hover:text-gray-900 transition-all duration-300 ease-in-out cursor-pointer"
//                       >
//                         User Details
//                       </button>
//                       <button
//                         onClick={() => handleNavigation("/my-blogs")}
//                         className="w-full text-left px-5 py-3 text-[15px] font-semibold text-gray-800 hover:bg-gray-100 hover:text-gray-900 transition-all duration-300 ease-in-out cursor-pointer"
//                       >
//                         My Blogs
//                       </button>
//                       <button
//                         onClick={handleUserLogout}
//                         className="w-full text-left px-5 py-3 text-[15px] font-semibold text-red-600 hover:bg-red-100 hover:text-red-700 transition-all duration-300 ease-in-out cursor-pointer"
//                       >
//                         Sign Out
//                       </button>
//                     </div>
//                   </div>
//                 )}
//               </div>
//             </>
//           ) : (
//             <>
//               {/* <Link
//                 to="/our-story"
//                 className="no-underline text-black font-medium text-base hover:opacity-70 transition-opacity duration-300"
//               >
//                 Our Story
//               </Link> */}

//               <Link
//                 to="/signin"
//                 className="text-black font-medium text-base transition-colors duration-300 hover:opacity-70 no-underline"
//               >
//                 Sign in
//               </Link>

//               <Link
//                 to="/signup"
//                 className="px-5 py-2.5 rounded-full bg-black text-white font-medium text-base transition-colors duration-300 hover:bg-[#333] no-underline"
//               >
//                 Get Started
//               </Link>
//             </>
//           )}
//         </div>
//       </div>
//     </nav>
//   );
// };

// export default Navbar;

import React, { useState, createContext, useContext, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Sun, Moon, PenSquare, Menu, X } from "lucide-react";
import logo from "../assets/logo.png";

// Theme context components remain the same
export const ThemeContext = createContext({
  theme: "light",
  toggleTheme: () => {},
});

export const useTheme = () => useContext(ThemeContext);

export const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState("light");

  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
    document.documentElement.classList.toggle("dark");
    localStorage.setItem("theme", newTheme);
  };

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme") || "light";
    setTheme(savedTheme);
    if (savedTheme === "dark") {
      document.documentElement.classList.add("dark");
    }
  }, []);

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

const Navbar = ({ isLoggedIn, user, handleLogout }) => {
  const navigate = useNavigate();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { theme, toggleTheme } = useTheme();
  const [profilePicture, setProfilePicture] = useState(user?.photo || "");

  useEffect(() => {
    if (isLoggedIn) {
      const loggedInUser = JSON.parse(localStorage.getItem("loggedInUser"));
      const storedUsers = JSON.parse(localStorage.getItem("users")) || [];
      const currentUser = storedUsers.find(
        (u) => u.email === loggedInUser?.email
      );
      setProfilePicture(currentUser?.profilePicture || "");
    }
  }, [isLoggedIn]);

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const handleLogoClick = (e) => {
    e.preventDefault();
    navigate(isLoggedIn ? "/blogs" : "/");
    setIsMobileMenuOpen(false);
  };

  const handleNavigation = (path) => {
    navigate(path);
    setIsDropdownOpen(false);
    setIsMobileMenuOpen(false);
  };

  const handleUserLogout = () => {
    handleLogout();
    navigate("/");
    setIsMobileMenuOpen(false);
  };

  const handleWriteClick = () => {
    if (isLoggedIn) {
      navigate("/create-blog");
    } else {
      navigate("/signin");
    }
    setIsMobileMenuOpen(false);
  };

  return (
    <nav className="fixed top-0 left-0 w-full flex justify-between items-center px-6 py-3 bg-[#f5f5f5] border-b border-[#ccc] h-20 z-[1000] shadow-sm">
      {/* Logo Section */}
      <div className="flex-shrink-0 flex items-center justify-between w-full md:w-auto">
        <a
          href="/"
          onClick={handleLogoClick}
          className="flex items-center gap-2 no-underline"
        >
          <img
            src={logo}
            alt="Innovatica Logo"
            className="h-[50px] w-auto cursor-pointer"
          />
          <span className="text-xl font-bold text-[#e4007c]">INNOVATICA</span>
        </a>

        {/* Mobile Menu Toggle */}
        <button 
          className="md:hidden focus:outline-none"
          onClick={toggleMobileMenu}
        >
          {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Desktop Navigation */}
      <div className="hidden md:flex items-center">
        <div className="flex items-center space-x-8">
          <Link
            to="/our-story"
            className="no-underline text-black font-medium text-base hover:opacity-70 transition-opacity duration-300"
          >
            Our Story
          </Link>

          <button
            onClick={handleWriteClick}
            className="flex items-center gap-2 text-black font-medium text-base hover:opacity-70 transition-opacity duration-300"
          >
            {isLoggedIn && <PenSquare size={18} />}
            Write
          </button>

          {isLoggedIn ? (
            <>
              <button
                onClick={toggleTheme}
                className="p-2 rounded-full hover:bg-gray-200 transition-colors duration-300"
              >
                {theme === "dark" ? <Sun size={22} /> : <Moon size={22} />}
              </button>

              <div className="relative">
                <button
                  onClick={toggleDropdown}
                  className="focus:outline-none"
                  onBlur={() => setTimeout(() => setIsDropdownOpen(false), 200)}
                >
                  {profilePicture ? (
                    <img
                      src={profilePicture}
                      alt="Profile"
                      className="h-10 w-10 rounded-full object-cover"
                    />
                  ) : (
                    <div className="h-10 w-10 rounded-full bg-gray-300 flex items-center justify-center text-xl font-bold">
                      {user?.name?.charAt(0)}
                    </div>
                  )}
                </button>
                {isDropdownOpen && (
                  <div className="absolute right-0 mt-2 w-60 rounded-2xl shadow-xl bg-white/90 backdrop-blur-md border border-gray-300 ring-1 ring-gray-400/50 z-[1001] transform transition-all duration-300 ease-in-out scale-95 hover:scale-100">
                    <div className="py-2 divide-y divide-gray-300/70">
                      <button
                        onClick={() => handleNavigation("/user-details")}
                        className="w-full text-left px-5 py-3 text-[15px] font-semibold text-gray-800 hover:bg-gray-100 hover:text-gray-900 transition-all duration-300 ease-in-out cursor-pointer"
                      >
                        User Details
                      </button>
                      <button
                        onClick={() => handleNavigation("/my-blogs")}
                        className="w-full text-left px-5 py-3 text-[15px] font-semibold text-gray-800 hover:bg-gray-100 hover:text-gray-900 transition-all duration-300 ease-in-out cursor-pointer"
                      >
                        My Blogs
                      </button>
                      <button
                        onClick={handleUserLogout}
                        className="w-full text-left px-5 py-3 text-[15px] font-semibold text-red-600 hover:bg-red-100 hover:text-red-700 transition-all duration-300 ease-in-out cursor-pointer"
                      >
                        Sign Out
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </>
          ) : (
            <>
              <Link
                to="/signin"
                className="text-black font-medium text-base transition-colors duration-300 hover:opacity-70 no-underline"
              >
                Sign in
              </Link>

              <Link
                to="/signup"
                className="px-5 py-2.5 rounded-full bg-black text-white font-medium text-base transition-colors duration-300 hover:bg-[#333] no-underline"
              >
                Get Started
              </Link>
            </>
          )}
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="absolute top-20 left-0 w-full bg-[#f5f5f5] md:hidden">
          <div className="flex flex-col px-6 py-4 space-y-4">
            <Link
              to="/our-story"
              onClick={() => setIsMobileMenuOpen(false)}
              className="no-underline text-black font-medium text-base hover:opacity-70 transition-opacity duration-300"
            >
              Our Story
            </Link>

            <button
              onClick={handleWriteClick}
              className="flex items-center gap-2 text-black font-medium text-base hover:opacity-70 transition-opacity duration-300 text-left"
            >
              {isLoggedIn && <PenSquare size={18} />}
              Write
            </button>

            {isLoggedIn ? (
              <>
                <button
                  onClick={() => handleNavigation("/user-details")}
                  className="text-left text-black font-medium text-base hover:opacity-70 transition-opacity duration-300"
                >
                  User Details
                </button>

                <button
                  onClick={() => handleNavigation("/my-blogs")}
                  className="text-left text-black font-medium text-base hover:opacity-70 transition-opacity duration-300"
                >
                  My Blogs
                </button>

                <button
                  onClick={toggleTheme}
                  className="text-left text-black font-medium text-base hover:opacity-70 transition-opacity duration-300 flex items-center gap-2"
                >
                  {theme === "dark" ? <Sun size={18} /> : <Moon size={18} />}
                  Toggle Theme
                </button>

                <button
                  onClick={handleUserLogout}
                  className="text-left text-red-600 font-medium text-base hover:opacity-70 transition-opacity duration-300"
                >
                  Sign Out
                </button>
              </>
            ) : (
              <>
                <Link
                  to="/signin"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="text-black font-medium text-base transition-colors duration-300 hover:opacity-70 no-underline"
                >
                  Sign in
                </Link>

                <Link
                  to="/signup"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="px-5 py-2.5 rounded-full bg-black text-white font-medium text-base transition-colors duration-300 hover:bg-[#333] no-underline text-center"
                >
                  Get Started
                </Link>
              </>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;