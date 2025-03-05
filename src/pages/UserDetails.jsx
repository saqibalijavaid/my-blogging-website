// import React, { useState, useEffect } from "react";
// import { useNavigate } from "react-router-dom";

// const UserDetails = () => {
//   const [user, setUser] = useState(null);
//   const [name, setName] = useState("");
//   const [email, setEmail] = useState("");
//   const [profilePicture, setProfilePicture] = useState("");
//   const [password, setPassword] = useState("");
//   const [isEditing, setIsEditing] = useState(false);
//   const navigate = useNavigate();

//   useEffect(() => {
//     const loggedInUser = JSON.parse(localStorage.getItem("loggedInUser"));
//     if (!loggedInUser) {
//       navigate("/signin");
//       return;
//     }

//     const storedUsers = JSON.parse(localStorage.getItem("users")) || [];
//     const currentUser = storedUsers.find((u) => u.email === loggedInUser.email);

//     if (currentUser) {
//       setUser(currentUser);
//       setName(currentUser.name);
//       setEmail(currentUser.email);
//       setProfilePicture(currentUser.profilePicture || "");
//       setPassword(currentUser.password);
//     }
//   }, [navigate]);

//   const handleUpdateProfile = (e) => {
//     e.preventDefault();

//     const storedUsers = JSON.parse(localStorage.getItem("users")) || [];
//     const updatedUsers = storedUsers.map((u) =>
//       u.email === user.email ? { ...u, name, profilePicture, password } : u
//     );

//     localStorage.setItem("users", JSON.stringify(updatedUsers));
//     setUser({ ...user, name, profilePicture, password });
//     setIsEditing(false);
//   };

//   const handleImageChange = (e) => {
//     const file = e.target.files[0];
//     if (file) {
//       const reader = new FileReader();
//       reader.onloadend = () => {
//         setProfilePicture(reader.result);
//       };
//       reader.readAsDataURL(file);
//     }
//   };

//   if (!user) {
//     return (
//       <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-black to-indigo-900 relative overflow-hidden">
//         <div className="absolute w-full h-full opacity-20">
//           <div className="absolute top-10 left-10 w-32 h-32 bg-blue-400 rounded-full filter blur-3xl animate-pulse"></div>
//           <div
//             className="absolute bottom-10 right-10 w-32 h-32 bg-purple-400 rounded-full filter blur-3xl animate-pulse"
//             style={{ animationDelay: "1s" }}
//           ></div>
//         </div>
//         <div className="animate-pulse flex flex-col items-center backdrop-blur-lg bg-white/10 p-12 rounded-2xl">
//           <div className="rounded-full bg-white/20 h-20 w-20 mb-4"></div>
//           <div className="h-4 bg-white/20 rounded w-48 mb-4"></div>
//           <div className="h-3 bg-white/20 rounded w-32"></div>
//         </div>
//       </div>
//     );
//   }

//   return (
//     // <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-black to-indigo-900 relative overflow-hidden">
//     // <div className="min-h-screen flex items-start justify-center pt-7 bg-gradient-to-br from-black to-indigo-900 relative overflow-hidden">
//     <div
//       className={`min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-black to-indigo-900 relative overflow-hidden transition-all duration-500 ${
//         isEditing ? "pt-20 pb-32" : "pt-10 pb-10"
//       }`}
//     >
//       {/* Animated background elements */}
//       <div className="absolute w-full h-full opacity-20">
//         <div className="absolute top-10 left-10 w-32 h-32 bg-blue-400 rounded-full filter blur-3xl animate-pulse"></div>
//         <div
//           className="absolute bottom-10 right-10 w-32 h-32 bg-purple-400 rounded-full filter blur-3xl animate-pulse"
//           style={{ animationDelay: "1s" }}
//         ></div>
//         <div
//           className="absolute top-1/2 left-1/4 w-48 h-48 bg-indigo-400 rounded-full filter blur-3xl animate-pulse"
//           style={{ animationDelay: "2s" }}
//         ></div>
//       </div>

//       {/* Glass morphism card - Smaller size */}
//       <div className="relative backdrop-blur-xl bg-white/10 rounded-2xl w-full max-w-md overflow-hidden transition-all duration-500 hover:shadow-[0_0_30px_rgba(139,92,246,0.5)] transform hover:scale-[1.01] border border-white/20">
//         {/* Header with abstract design */}
//         <div className="relative h-48 overflow-hidden">
//           <div className="absolute -top-20 -left-20 w-80 h-80 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-full opacity-70"></div>
//           <div className="absolute -top-10 -right-20 w-60 h-60 bg-gradient-to-br from-purple-500 to-pink-600 rounded-full opacity-70"></div>
//           <div className="absolute top-0 left-0 w-full h-full bg-black/30"></div>

//           {/* Decorative elements */}
//           <div className="absolute top-5 right-5">
//             <svg
//               width="24"
//               height="24"
//               viewBox="0 0 24 24"
//               fill="none"
//               xmlns="http://www.w3.org/2000/svg"
//             >
//               <path
//                 d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z"
//                 stroke="white"
//                 strokeOpacity="0.5"
//                 strokeWidth="2"
//               />
//               <path
//                 d="M17 12C17 14.7614 14.7614 17 12 17C9.23858 17 7 14.7614 7 12C7 9.23858 9.23858 7 12 7C14.7614 7 17 9.23858 17 12Z"
//                 stroke="white"
//                 strokeOpacity="0.7"
//                 strokeWidth="2"
//               />
//             </svg>
//           </div>
//         </div>

//         {/* Fix profile picture positioning - moved down and z-index added */}
//         <div className="relative mx-auto -mt-16 mb-4 w-32 h-32 z-10">
//           <label
//             htmlFor="profilePicture"
//             className={`cursor-pointer block ${isEditing ? "group" : ""}`}
//           >
//             <div className="mx-auto w-32 h-32">
//               {profilePicture ? (
//                 <div className="relative w-32 h-32">
//                   <div className="absolute inset-0 rounded-full bg-gradient-to-r from-blue-400 to-purple-500 blur-md transform scale-110 animate-pulse"></div>
//                   <img
//                     src={profilePicture}
//                     alt="Profile"
//                     className="relative w-32 h-32 rounded-full object-cover border-4 border-indigo-900/80 shadow-lg shadow-indigo-700/30"
//                   />
//                   {isEditing && (
//                     <div className="absolute inset-0 bg-black/50 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
//                       <svg
//                         xmlns="http://www.w3.org/2000/svg"
//                         className="h-10 w-10 text-white"
//                         fill="none"
//                         viewBox="0 0 24 24"
//                         stroke="currentColor"
//                       >
//                         <path
//                           strokeLinecap="round"
//                           strokeLinejoin="round"
//                           strokeWidth={2}
//                           d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z"
//                         />
//                         <path
//                           strokeLinecap="round"
//                           strokeLinejoin="round"
//                           strokeWidth={2}
//                           d="M15 13a3 3 0 11-6 0 3 3 0 016 0z"
//                         />
//                       </svg>
//                     </div>
//                   )}
//                 </div>
//               ) : (
//                 <div className="relative w-32 h-32">
//                   <div className="absolute inset-0 rounded-full bg-gradient-to-r from-blue-400 to-purple-500 blur-md transform scale-110 animate-pulse"></div>
//                   <div className="relative w-32 h-32 rounded-full bg-gradient-to-br from-blue-400 to-indigo-500 flex items-center justify-center text-white text-4xl font-bold border-4 border-indigo-900/80 shadow-lg shadow-indigo-700/30">
//                     {name.charAt(0).toUpperCase()}
//                   </div>
//                 </div>
//               )}
//             </div>
//           </label>
//           {isEditing && (
//             <input
//               type="file"
//               id="profilePicture"
//               accept="image/*"
//               onChange={handleImageChange}
//               className="hidden"
//             />
//           )}
//         </div>

//         <div className="px-8 pb-8">
//           <div className="text-center mb-8">
//             <h2 className="text-2xl font-bold text-white">{name}</h2>
//             <p className="text-indigo-200 mt-1">{email}</p>
//           </div>

//           {/* Edit Mode */}
//           {isEditing ? (
//             <form onSubmit={handleUpdateProfile} className="space-y-6">
//               {/* Name Input */}
//               <div>
//                 <label className="block text-sm font-medium text-indigo-200 mb-1">
//                   Full Name
//                 </label>
//                 <input
//                   type="text"
//                   placeholder="Enter your name"
//                   value={name}
//                   onChange={(e) => setName(e.target.value)}
//                   required
//                   className="w-full px-4 py-3 rounded-xl border border-white/20 bg-white/10 text-white placeholder-indigo-200/70 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200 backdrop-blur-sm"
//                 />
//               </div>

//               {/* Email (Read-Only) */}
//               <div>
//                 <label className="block text-sm font-medium text-indigo-200 mb-1">
//                   Email
//                 </label>
//                 <input
//                   type="email"
//                   value={email}
//                   readOnly
//                   className="w-full px-4 py-3 rounded-xl border border-white/10 bg-white/5 text-indigo-200/80 cursor-not-allowed backdrop-blur-sm"
//                 />
//               </div>

//               {/* Password Input */}
//               <div>
//                 <label className="block text-sm font-medium text-indigo-200 mb-1">
//                   New Password
//                 </label>
//                 <input
//                   type="password"
//                   placeholder="Enter new password"
//                   value={password}
//                   onChange={(e) => setPassword(e.target.value)}
//                   className="w-full px-4 py-3 rounded-xl border border-white/20 bg-white/10 text-white placeholder-indigo-200/70 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200 backdrop-blur-sm"
//                 />
//               </div>

//               {/* Buttons */}
//               <div className="flex gap-4 pt-4">
//                 <button
//                   type="submit"
//                   className="flex-1 bg-gradient-to-br from-purple-500 to-indigo-600 text-white py-3 rounded-xl text-lg font-semibold hover:from-purple-600 hover:to-indigo-700 transition-all duration-300 shadow-lg shadow-purple-500/30 hover:shadow-purple-500/50 transform hover:-translate-y-0.5 relative overflow-hidden group"
//                 >
//                   <span className="absolute w-0 h-0 transition-all duration-500 ease-in-out bg-white rounded-full group-hover:w-56 group-hover:h-56 opacity-10"></span>
//                   <span className="relative">Save Changes</span>
//                 </button>
//                 <button
//                   type="button"
//                   onClick={() => setIsEditing(false)}
//                   className="flex-1 bg-white/10 border border-white/20 text-white py-3 rounded-xl text-lg font-semibold hover:bg-white/20 transition-all duration-300 backdrop-blur-sm transform hover:-translate-y-0.5"
//                 >
//                   Cancel
//                 </button>
//               </div>
//             </form>
//           ) : (
//             <button
//               onClick={() => setIsEditing(true)}
//               className="w-full bg-gradient-to-br from-purple-500 to-indigo-600 text-white py-3 rounded-xl text-lg font-semibold hover:from-purple-600 hover:to-indigo-700 transition-all duration-300 shadow-lg shadow-purple-500/30 hover:shadow-purple-500/50 transform hover:-translate-y-0.5 relative overflow-hidden group"
//             >
//               <span className="absolute w-0 h-0 transition-all duration-500 ease-in-out bg-white rounded-full group-hover:w-96 group-hover:h-96 opacity-10"></span>
//               <span className="relative">Edit Profile</span>
//             </button>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default UserDetails;

import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const UserDetails = () => {
  const [user, setUser] = useState(null);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [profilePicture, setProfilePicture] = useState("");
  const [password, setPassword] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const loggedInUser = JSON.parse(localStorage.getItem("loggedInUser"));
    if (!loggedInUser) {
      navigate("/signin");
      return;
    }

    const storedUsers = JSON.parse(localStorage.getItem("users")) || [];
    const currentUser = storedUsers.find((u) => u.email === loggedInUser.email);

    if (currentUser) {
      setUser(currentUser);
      setName(currentUser.name);
      setEmail(currentUser.email);
      setProfilePicture(currentUser.profilePicture || "");
      setPassword(currentUser.password);
    }
  }, [navigate]);

  const validatePassword = (pwd) => {
    if (pwd.length < 8) {
      setPasswordError("Password must be at least 8 characters long");
      return false;
    }
    setPasswordError("");
    return true;
  };

  const handleUpdateProfile = (e) => {
    e.preventDefault();

    // Validate password before updating
    if (!validatePassword(password)) {
      return;
    }

    const storedUsers = JSON.parse(localStorage.getItem("users")) || [];
    const updatedUsers = storedUsers.map((u) =>
      u.email === user.email ? { ...u, name, profilePicture, password } : u
    );

    localStorage.setItem("users", JSON.stringify(updatedUsers));
    setUser({ ...user, name, profilePicture, password });
    setIsEditing(false);
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfilePicture(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-black to-indigo-900 relative overflow-hidden">
        <div className="absolute w-full h-full opacity-20">
          <div className="absolute top-10 left-10 w-32 h-32 bg-blue-400 rounded-full filter blur-3xl animate-pulse"></div>
          <div
            className="absolute bottom-10 right-10 w-32 h-32 bg-purple-400 rounded-full filter blur-3xl animate-pulse"
            style={{ animationDelay: "1s" }}
          ></div>
        </div>
        <div className="animate-pulse flex flex-col items-center backdrop-blur-lg bg-white/10 p-12 rounded-2xl">
          <div className="rounded-full bg-white/20 h-20 w-20 mb-4"></div>
          <div className="h-4 bg-white/20 rounded w-48 mb-4"></div>
          <div className="h-3 bg-white/20 rounded w-32"></div>
        </div>
      </div>
    );
  }

  return (
    <div
      className={`min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-black to-indigo-900 relative overflow-hidden transition-all duration-500 ${
        isEditing ? "pt-20 pb-32" : "pt-10 pb-10"
      }`}
    >
      {/* Animated background elements */}
      <div className="absolute w-full h-full opacity-20">
        <div className="absolute top-10 left-10 w-32 h-32 bg-blue-400 rounded-full filter blur-3xl animate-pulse"></div>
        <div
          className="absolute bottom-10 right-10 w-32 h-32 bg-purple-400 rounded-full filter blur-3xl animate-pulse"
          style={{ animationDelay: "1s" }}
        ></div>
        <div
          className="absolute top-1/2 left-1/4 w-48 h-48 bg-indigo-400 rounded-full filter blur-3xl animate-pulse"
          style={{ animationDelay: "2s" }}
        ></div>
      </div>

      {/* Glass morphism card - Smaller size */}
      <div className="relative backdrop-blur-xl bg-white/10 rounded-2xl w-full max-w-md overflow-hidden transition-all duration-500 hover:shadow-[0_0_30px_rgba(139,92,246,0.5)] transform hover:scale-[1.01] border border-white/20">
        {/* Header with abstract design */}
        <div className="relative h-48 overflow-hidden">
          <div className="absolute -top-20 -left-20 w-80 h-80 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-full opacity-70"></div>
          <div className="absolute -top-10 -right-20 w-60 h-60 bg-gradient-to-br from-purple-500 to-pink-600 rounded-full opacity-70"></div>
          <div className="absolute top-0 left-0 w-full h-full bg-black/30"></div>

          {/* Decorative elements */}
          <div className="absolute top-5 right-5">
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z"
                stroke="white"
                strokeOpacity="0.5"
                strokeWidth="2"
              />
              <path
                d="M17 12C17 14.7614 14.7614 17 12 17C9.23858 17 7 14.7614 7 12C7 9.23858 9.23858 7 12 7C14.7614 7 17 9.23858 17 12Z"
                stroke="white"
                strokeOpacity="0.7"
                strokeWidth="2"
              />
            </svg>
          </div>
        </div>

        {/* Fix profile picture positioning - moved down and z-index added */}
        <div className="relative mx-auto -mt-16 mb-4 w-32 h-32 z-10">
          <label
            htmlFor="profilePicture"
            className={`cursor-pointer block ${isEditing ? "group" : ""}`}
          >
            <div className="mx-auto w-32 h-32">
              {profilePicture ? (
                <div className="relative w-32 h-32">
                  <div className="absolute inset-0 rounded-full bg-gradient-to-r from-blue-400 to-purple-500 blur-md transform scale-110 animate-pulse"></div>
                  <img
                    src={profilePicture}
                    alt="Profile"
                    className="relative w-32 h-32 rounded-full object-cover border-4 border-indigo-900/80 shadow-lg shadow-indigo-700/30"
                  />
                  {isEditing && (
                    <div className="absolute inset-0 bg-black/50 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-10 w-10 text-white"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z"
                        />
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M15 13a3 3 0 11-6 0 3 3 0 016 0z"
                        />
                      </svg>
                    </div>
                  )}
                </div>
              ) : (
                <div className="relative w-32 h-32">
                  <div className="absolute inset-0 rounded-full bg-gradient-to-r from-blue-400 to-purple-500 blur-md transform scale-110 animate-pulse"></div>
                  <div className="relative w-32 h-32 rounded-full bg-gradient-to-br from-blue-400 to-indigo-500 flex items-center justify-center text-white text-4xl font-bold border-4 border-indigo-900/80 shadow-lg shadow-indigo-700/30">
                    {name.charAt(0).toUpperCase()}
                  </div>
                </div>
              )}
            </div>
          </label>
          {isEditing && (
            <input
              type="file"
              id="profilePicture"
              accept="image/*"
              onChange={handleImageChange}
              className="hidden"
            />
          )}
        </div>

        <div className="px-8 pb-8">
          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold text-white">{name}</h2>
            <p className="text-indigo-200 mt-1">{email}</p>
          </div>

          {/* Edit Mode */}
          {isEditing ? (
            <form onSubmit={handleUpdateProfile} className="space-y-6">
              {/* Name Input */}
              <div>
                <label className="block text-sm font-medium text-indigo-200 mb-1">
                  Full Name
                </label>
                <input
                  type="text"
                  placeholder="Enter your name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                  className="w-full px-4 py-3 rounded-xl border border-white/20 bg-white/10 text-white placeholder-indigo-200/70 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200 backdrop-blur-sm"
                />
              </div>

              {/* Email (Read-Only) */}
              <div>
                <label className="block text-sm font-medium text-indigo-200 mb-1">
                  Email
                </label>
                <input
                  type="email"
                  value={email}
                  readOnly
                  className="w-full px-4 py-3 rounded-xl border border-white/10 bg-white/5 text-indigo-200/80 cursor-not-allowed backdrop-blur-sm"
                />
              </div>

              {/* Password Input */}
              <div>
                <label className="block text-sm font-medium text-indigo-200 mb-1">
                  New Password
                </label>
                <input
                  type="password"
                  placeholder="Enter new password"
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                    validatePassword(e.target.value);
                  }}
                  className={`w-full px-4 py-3 rounded-xl border ${
                    passwordError 
                      ? "border-red-500 bg-red-500/10" 
                      : "border-white/20 bg-white/10"
                  } text-white placeholder-indigo-200/70 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200 backdrop-blur-sm`}
                />
                {passwordError && (
                  <p className="text-red-500 text-sm mt-1">{passwordError}</p>
                )}
              </div>

              {/* Buttons */}
              <div className="flex gap-4 pt-4">
                <button
                  type="submit"
                  className="flex-1 bg-gradient-to-br from-purple-500 to-indigo-600 text-white py-3 rounded-xl text-lg font-semibold hover:from-purple-600 hover:to-indigo-700 transition-all duration-300 shadow-lg shadow-purple-500/30 hover:shadow-purple-500/50 transform hover:-translate-y-0.5 relative overflow-hidden group"
                >
                  <span className="absolute w-0 h-0 transition-all duration-500 ease-in-out bg-white rounded-full group-hover:w-56 group-hover:h-56 opacity-10"></span>
                  <span className="relative">Save Changes</span>
                </button>
                <button
                  type="button"
                  onClick={() => setIsEditing(false)}
                  className="flex-1 bg-white/10 border border-white/20 text-white py-3 rounded-xl text-lg font-semibold hover:bg-white/20 transition-all duration-300 backdrop-blur-sm transform hover:-translate-y-0.5"
                >
                  Cancel
                </button>
              </div>
            </form>
          ) : (
            <button
              onClick={() => setIsEditing(true)}
              className="w-full bg-gradient-to-br from-purple-500 to-indigo-600 text-white py-3 rounded-xl text-lg font-semibold hover:from-purple-600 hover:to-indigo-700 transition-all duration-300 shadow-lg shadow-purple-500/30 hover:shadow-purple-500/50 transform hover:-translate-y-0.5 relative overflow-hidden group"
            >
              <span className="absolute w-0 h-0 transition-all duration-500 ease-in-out bg-white rounded-full group-hover:w-96 group-hover:h-96 opacity-10"></span>
              <span className="relative">Edit Profile</span>
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default UserDetails;