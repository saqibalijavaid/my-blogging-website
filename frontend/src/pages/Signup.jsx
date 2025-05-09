// This file has two code blocks.
// To use the email validator, comment out the first block and uncomment the second one.

import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { generateAvatarUrl } from "./ProfilePicture";

const Signup = ({ setUsers }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [passwordError, setPasswordError] = useState("");
  const navigate = useNavigate();

  const handlePasswordChange = (e) => {
    const newPassword = e.target.value;
    setPassword(newPassword);
    if (newPassword.length > 0 && newPassword.length < 8) {
      setPasswordError("Password must be at least 8 characters long");
    } else {
      setPasswordError("");
    }
  };

  const handleSignup = async (e) => {
    e.preventDefault();
    console.log("🔐 Signup process started...");

    if (password.length < 8) {
      setPasswordError("Password must be at least 8 characters long");
      console.warn("❌ Password too short:", password);
      return;
    }

    setIsSubmitting(true);
    console.log("📤 Submitting...");

    const profilePicture = generateAvatarUrl(name);
    console.log("🖼️ Generated profile picture URL:", profilePicture);

    const newUser = {
      name,
      email,
      password,
      profilePicture,
      hasCustomPicture: false,
    };

    console.log("📦 Payload to send:", newUser);

    try {
      const response = await fetch("http://localhost:5000/api/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newUser),
      });

      console.log("📨 Request sent. Awaiting response...");

      const data = await response.json();

      console.log("📬 Response received:", data);

      if (!response.ok) {
        console.error("❌ Backend error:", data.message || "Signup failed.");
        alert(data.message || "Signup failed.");
        setIsSubmitting(false);
        return;
      }

      console.log("✅ Signup successful!");

      // Optional: update frontend state
      setUsers((prev) => [...prev, { name, email, profilePicture }]);

      alert("Signup successful! You can now log in.");
      navigate("/signin");
    } catch (error) {
      console.error("🚨 Error during signup:", error);
      alert("Something went wrong. Please try again.");
    } finally {
      setIsSubmitting(false);
      console.log("🔚 Signup process finished.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-50 to-purple-50 p-4">
      <div className="w-full max-w-md">
        <div className="bg-white rounded-2xl shadow-xl p-8">
          <div className="text-center mb-4">
            <h1 className="text-indigo-600 text-3xl font-bold">Innovatica</h1>
            <p className="text-gray-600 mt-1">
              Where innovation meets collaboration.
            </p>
          </div>

          <h2 className="text-2xl font-bold text-gray-800 mb-6">
            Create your account
          </h2>

          <form onSubmit={handleSignup} className="space-y-5">
            {/* Name Input */}
            <div>
              <label className="block text-gray-700 text-sm font-medium mb-1">
                Full Name
              </label>
              <div className="relative">
                <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-400">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
                      clipRule="evenodd"
                    />
                  </svg>
                </span>
                <input
                  type="text"
                  placeholder="Enter your name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all bg-white"
                />
              </div>
            </div>

            {/* Email Input */}
            <div>
              <label className="block text-gray-700 text-sm font-medium mb-1">
                Email Address
              </label>
              <div className="relative">
                <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-400">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                    <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                  </svg>
                </span>
                <input
                  type="email"
                  placeholder="you@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all bg-white"
                />
              </div>
            </div>

            {/* Password Input */}
            <div>
              <label className="block text-gray-700 text-sm font-medium mb-1">
                Password
              </label>
              <div className="relative">
                <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-400">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                </span>
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Create a secure password"
                  value={password}
                  onChange={handlePasswordChange}
                  required
                  autoComplete="new-password"
                  className={`w-full pl-10 pr-10 py-3 border ${
                    passwordError ? "border-red-500" : "border-gray-300"
                  } rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all bg-white`}
                />
                <button
                  type="button"
                  className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M3.707 2.293a1 1 0 00-1.414 1.414l14 14a1 1 0 001.414-1.414l-1.473-1.473A10.014 10.014 0 0019.542 10C18.268 5.943 14.478 3 10 3a9.958 9.958 0 00-4.512 1.074l-1.78-1.781zm4.261 4.26l1.514 1.515a2.003 2.003 0 012.45 2.45l1.514 1.514a4 4 0 00-5.478-5.478z"
                        clipRule="evenodd"
                      />
                      <path d="M12.454 16.697L9.75 13.992a4 4 0 01-3.742-3.741L2.335 6.578A9.98 9.98 0 00.458 10c1.274 4.057 5.065 7 9.542 7 .847 0 1.669-.105 2.454-.303z" />
                    </svg>
                  ) : (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
                      <path
                        fillRule="evenodd"
                        d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z"
                        clipRule="evenodd"
                      />
                    </svg>
                  )}
                </button>
              </div>
              {passwordError ? (
                <p className="text-xs text-red-500 mt-1">{passwordError}</p>
              ) : (
                <p className="text-xs text-gray-500 mt-1">
                  Must be at least 8 characters
                </p>
              )}
            </div>

            {/* Terms & Conditions Checkbox */}
            <div className="flex items-start">
              <input
                id="terms"
                name="terms"
                type="checkbox"
                required
                className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded mt-1"
              />
              <label
                htmlFor="terms"
                className="ml-2 block text-sm text-gray-600"
              >
                I agree to the{" "}
                <a href="#" className="text-indigo-600 hover:text-indigo-800">
                  Terms of Service
                </a>{" "}
                and{" "}
                <a href="#" className="text-indigo-600 hover:text-indigo-800">
                  Privacy Policy
                </a>
              </label>
            </div>

            {/* Signup Button */}
            <button
              type="submit"
              disabled={isSubmitting || password.length < 8}
              className={`w-full ${
                isSubmitting || password.length < 8
                  ? "bg-indigo-400"
                  : "bg-indigo-600 hover:bg-indigo-700"
              } text-white py-3 rounded-lg text-sm font-semibold transition duration-300 shadow-md hover:shadow-lg flex items-center justify-center`}
            >
              {isSubmitting ? (
                <>
                  <svg
                    className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    ></path>
                  </svg>
                  Creating your account...
                </>
              ) : (
                "Create Account"
              )}
            </button>
          </form>
        </div>

        {/* Signin Link */}
        <p className="text-center text-gray-600 mt-6">
          Already have an account?{" "}
          <Link
            to="/signin"
            className="text-indigo-600 hover:text-indigo-800 font-medium hover:underline transition"
          >
            Sign in
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Signup;

// import React, { useState } from "react";
// import { Link, useNavigate } from "react-router-dom";
// import { generateAvatarUrl } from "./ProfilePicture";
// import EmailInput from "./signup-comp/EmailInput"; // Import the new component

// const Signup = ({ setUsers }) => {
//   const [name, setName] = useState("");
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [showPassword, setShowPassword] = useState(false);
//   const [isSubmitting, setIsSubmitting] = useState(false);
//   const [passwordError, setPasswordError] = useState("");
//   const [isEmailValid, setIsEmailValid] = useState(false);
//   const navigate = useNavigate();

//   const handlePasswordChange = (e) => {
//     const newPassword = e.target.value;
//     setPassword(newPassword);
//     if (newPassword.length > 0 && newPassword.length < 8) {
//       setPasswordError("Password must be at least 8 characters");
//     } else {
//       setPasswordError("");
//     }
//   };

//   const handleSignup = (e) => {
//     e.preventDefault();

//     if (password.length < 8) {
//       setPasswordError("Password must be at least 8 characters");
//       return;
//     }

//     if (!isEmailValid) {
//       alert("Please enter a valid email address");
//       return;
//     }

//     setIsSubmitting(true);

//     // Simulate network delay for better UX
//     setTimeout(() => {
//       // Get existing users from localStorage
//       const storedUsers = JSON.parse(localStorage.getItem("users")) || [];

//       // Check if user already exists
//       if (storedUsers.some((user) => user.email === email)) {
//         alert("User already exists with this email!");
//         setIsSubmitting(false);
//         return;
//       }

//       // Generate profile picture using the exported function
//       const profilePicture = generateAvatarUrl(name);

//       // New user object with hasCustomPicture flag
//       const newUser = {
//         name,
//         email,
//         password,
//         profilePicture,
//         hasCustomPicture: false, // Initialize as false since we're using generated avatar
//       };

//       // Save new user in state & localStorage
//       const updatedUsers = [...storedUsers, newUser];
//       setUsers(updatedUsers);
//       localStorage.setItem("users", JSON.stringify(updatedUsers));

//       // Also store a copy as loggedInUser for immediate access
//       localStorage.setItem(
//         "loggedInUser",
//         JSON.stringify({
//           email,
//           name,
//           profilePicture,
//         })
//       );

//       alert("Signup successful! You can now log in.");
//       navigate("/signin"); // Redirect to signin page
//     }, 800);
//   };

//   return (
//     <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-50 to-purple-50 p-4">
//       <div className="w-full max-w-md">
//         <div className="bg-white rounded-2xl shadow-xl p-8">
//           <div className="text-center mb-4">
//             <h1 className="text-indigo-600 text-3xl font-bold">Innovatica</h1>
//             <p className="text-gray-600 mt-1">
//               Where innovation meets collaboration.
//             </p>
//           </div>

//           <h2 className="text-2xl font-bold text-gray-800 mb-6">
//             Create your account
//           </h2>

//           <form onSubmit={handleSignup} className="space-y-5">
//             {/* Name Input */}
//             <div>
//               <label className="block text-gray-700 text-sm font-medium mb-1">
//                 Full Name
//               </label>
//               <div className="relative">
//                 <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-400">
//                   <svg
//                     xmlns="http://www.w3.org/2000/svg"
//                     className="h-5 w-5"
//                     viewBox="0 0 20 20"
//                     fill="currentColor"
//                   >
//                     <path
//                       fillRule="evenodd"
//                       d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
//                       clipRule="evenodd"
//                     />
//                   </svg>
//                 </span>
//                 <input
//                   type="text"
//                   placeholder="Enter your name"
//                   value={name}
//                   onChange={(e) => setName(e.target.value)}
//                   required
//                   className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all bg-white"
//                 />
//               </div>
//             </div>

//             {/* Email Input - Using the new component */}
//             <EmailInput
//               email={email}
//               setEmail={setEmail}
//               onValidationChange={setIsEmailValid}
//             />

//             {/* Password Input */}
//             <div>
//               <label className="block text-gray-700 text-sm font-medium mb-1">
//                 Password
//               </label>
//               <div className="relative">
//                 <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-400">
//                   <svg
//                     xmlns="http://www.w3.org/2000/svg"
//                     className="h-5 w-5"
//                     viewBox="0 0 20 20"
//                     fill="currentColor"
//                   >
//                     <path
//                       fillRule="evenodd"
//                       d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z"
//                       clipRule="evenodd"
//                     />
//                   </svg>
//                 </span>
//                 <input
//                   type={showPassword ? "text" : "password"}
//                   placeholder="Create a secure password"
//                   value={password}
//                   onChange={handlePasswordChange}
//                   required
//                   autoComplete="new-password"
//                   className={`w-full pl-10 pr-10 py-3 border ${
//                     passwordError ? "border-red-500" : "border-gray-300"
//                   } rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all bg-white`}
//                 />
//                 <button
//                   type="button"
//                   className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600"
//                   onClick={() => setShowPassword(!showPassword)}
//                 >
//                   {showPassword ? (
//                     <svg
//                       xmlns="http://www.w3.org/2000/svg"
//                       className="h-5 w-5"
//                       viewBox="0 0 20 20"
//                       fill="currentColor"
//                     >
//                       <path
//                         fillRule="evenodd"
//                         d="M3.707 2.293a1 1 0 00-1.414 1.414l14 14a1 1 0 001.414-1.414l-1.473-1.473A10.014 10.014 0 0019.542 10C18.268 5.943 14.478 3 10 3a9.958 9.958 0 00-4.512 1.074l-1.78-1.781zm4.261 4.26l1.514 1.515a2.003 2.003 0 012.45 2.45l1.514 1.514a4 4 0 00-5.478-5.478z"
//                         clipRule="evenodd"
//                       />
//                       <path d="M12.454 16.697L9.75 13.992a4 4 0 01-3.742-3.741L2.335 6.578A9.98 9.98 0 00.458 10c1.274 4.057 5.065 7 9.542 7 .847 0 1.669-.105 2.454-.303z" />
//                     </svg>
//                   ) : (
//                     <svg
//                       xmlns="http://www.w3.org/2000/svg"
//                       className="h-5 w-5"
//                       viewBox="0 0 20 20"
//                       fill="currentColor"
//                     >
//                       <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
//                       <path
//                         fillRule="evenodd"
//                         d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z"
//                         clipRule="evenodd"
//                       />
//                     </svg>
//                   )}
//                 </button>
//               </div>
//               {passwordError ? (
//                 <p className="text-xs text-red-500 mt-1">{passwordError}</p>
//               ) : (
//                 <p className="text-xs text-gray-500 mt-1">
//                   Password must be at least 8 characters
//                 </p>
//               )}
//             </div>

//             {/* Terms & Conditions Checkbox */}
//             <div className="flex items-start">
//               <input
//                 id="terms"
//                 name="terms"
//                 type="checkbox"
//                 required
//                 className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded mt-1"
//               />
//               <label
//                 htmlFor="terms"
//                 className="ml-2 block text-sm text-gray-600"
//               >
//                 I agree to the{" "}
//                 <a href="#" className="text-indigo-600 hover:text-indigo-800">
//                   Terms of Service
//                 </a>{" "}
//                 and{" "}
//                 <a href="#" className="text-indigo-600 hover:text-indigo-800">
//                   Privacy Policy
//                 </a>
//               </label>
//             </div>

//             {/* Signup Button */}
//             <button
//               type="submit"
//               disabled={isSubmitting || password.length < 8 || !isEmailValid}
//               className={`w-full ${
//                 isSubmitting || password.length < 8 || !isEmailValid
//                   ? "bg-indigo-400"
//                   : "bg-indigo-600 hover:bg-indigo-700 cursor-pointer"
//               } text-white py-3 rounded-lg text-sm font-semibold transition duration-300 shadow-md hover:shadow-lg flex items-center justify-center`}
//             >
//               {isSubmitting ? (
//                 <>
//                   <svg
//                     className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
//                     xmlns="http://www.w3.org/2000/svg"
//                     fill="none"
//                     viewBox="0 0 24 24"
//                   >
//                     <circle
//                       className="opacity-25"
//                       cx="12"
//                       cy="12"
//                       r="10"
//                       stroke="currentColor"
//                       strokeWidth="4"
//                     ></circle>
//                     <path
//                       className="opacity-75"
//                       fill="currentColor"
//                       d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
//                     ></path>
//                   </svg>
//                   Creating your account...
//                 </>
//               ) : (
//                 "Create Account"
//               )}
//             </button>
//           </form>
//         </div>

//         {/* Signin Link */}
//         <p className="text-center text-gray-600 mt-6">
//           Already have an account?{" "}
//           <Link
//             to="/signin"
//             className="text-indigo-600 hover:text-indigo-800 font-medium hover:underline transition"
//           >
//             Sign in
//           </Link>
//         </p>
//       </div>
//     </div>
//   );
// };

// export default Signup;
