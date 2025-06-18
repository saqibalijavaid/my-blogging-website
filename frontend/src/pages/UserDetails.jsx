import React, { useState, useEffect } from "react";
import ProfilePicture, { generateAvatarUrl } from "./ProfilePicture";
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

  const fetchCurrentUser = async () => {
    try {
      const res = await fetch("http://localhost:5000/api/user/me", {
        method: "GET",
        credentials: "include",
      });
      if (res.ok) return await res.json();
      else throw new Error("Failed to fetch user");
    } catch (err) {
      console.error(err);
      return null;
    }
  };

  const updateUserProfile = async (updatedData) => {
    try {
      const res = await fetch("http://localhost:5000/api/user/me", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify(updatedData),
      });
      const data = await res.json();
      return { success: res.ok, message: data.message };
    } catch (err) {
      console.error(err);
      return { success: false, message: "An error occurred" };
    }
  };

  useEffect(() => {
    const loadUser = async () => {
      const user = await fetchCurrentUser();
      if (!user) {
        navigate("/signin");
        return;
      }

      setUser(user);
      setName(user.name);
      setEmail(user.email);
      setProfilePicture(user.profile_picture || "");
    };

    loadUser();
  }, [navigate]);

  const validatePassword = (pwd) => {
    if (pwd.length < 8) {
      setPasswordError("Password must be at least 8 characters long");
      return false;
    }
    setPasswordError("");
    return true;
  };

  const handleUpdateProfile = async (e) => {
    e.preventDefault();

    if (!validatePassword(password)) return;

    let finalProfilePicture = profilePicture;
    let hasCustomPicture = user.has_custom_picture || false;
    const nameChanged = name !== user.name;

    if (!profilePicture) {
      finalProfilePicture = generateAvatarUrl(name);
      hasCustomPicture = false;
    } else if (nameChanged && !user.has_custom_picture) {
      finalProfilePicture = generateAvatarUrl(name);
    } else if (profilePicture !== user.profile_picture) {
      hasCustomPicture = true;
    }

    const updatedData = {
      name,
      profile_picture: finalProfilePicture,
      has_custom_picture: hasCustomPicture,
      // password,
    };

    const result = await updateUserProfile(updatedData);
    alert(result.message);
    if (result.success) {
      setUser({
        ...user,
        name,
        profile_picture: finalProfilePicture,
        has_custom_picture: hasCustomPicture,
      });

      setIsEditing(false);
    }
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

  const handleClearProfilePicture = () => {
    setProfilePicture("");
  };

  const handleNameChange = (e) => {
    setName(e.target.value);
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

        {/* Profile picture section */}
        <div className="-mt-16 mb-4">
          <ProfilePicture
            name={name}
            profilePicture={profilePicture}
            isEditing={isEditing}
            handleImageChange={handleImageChange}
            handleClearProfilePicture={handleClearProfilePicture}
          />
        </div>

        <div className="px-8 pb-8">
          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold text-white">{name}</h2>
            <p className="text-indigo-200 mt-1">{email}</p>
          </div>

          {/* Edit Mode Form */}
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
                  onChange={handleNameChange}
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

              {/* Form Action Buttons */}
              <div className="flex gap-4 pt-4">
                <button
                  type="submit"
                  className="flex-1 bg-gradient-to-br from-purple-500 to-indigo-600 text-white py-3 rounded-xl text-lg font-semibold hover:from-purple-600 hover:to-indigo-700 transition-all duration-300 shadow-lg shadow-purple-500/30 hover:shadow-purple-500/50 transform hover:-translate-y-0.5 relative overflow-hidden group cursor-pointer"
                >
                  <span className="absolute w-0 h-0 transition-all duration-500 ease-in-out bg-white rounded-full group-hover:w-56 group-hover:h-56 opacity-10"></span>
                  <span className="relative">Save Changes</span>
                </button>
                <button
                  type="button"
                  onClick={() => setIsEditing(false)}
                  className="flex-1 bg-white/10 border border-white/20 text-white py-3 rounded-xl text-lg font-semibold hover:bg-white/20 transition-all duration-300 backdrop-blur-sm transform hover:-translate-y-0.5 cursor-pointer"
                >
                  Cancel
                </button>
              </div>
            </form>
          ) : (
            // View Mode - Edit Profile Button
            <button
              onClick={() => setIsEditing(true)}
              className="w-full bg-gradient-to-br from-purple-500 to-indigo-600 text-white py-3 rounded-xl text-lg font-semibold hover:from-purple-600 hover:to-indigo-700 transition-all duration-300 shadow-lg shadow-purple-500/30 hover:shadow-purple-500/50 transform hover:-translate-y-0.5 relative overflow-hidden group cursor-pointer"
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
