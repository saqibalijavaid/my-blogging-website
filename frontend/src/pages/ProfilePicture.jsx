import React from "react";

/**
 * Generate avatar URL from UI Avatars API
 * This is exported as a standalone function to be used by other components
 * @param {string} userName - The user's name to generate avatar from
 * @returns {string} URL to the generated avatar
 */
export const generateAvatarUrl = (userName) => {
  if (!userName) return "";
  return `https://ui-avatars.com/api/?name=${encodeURIComponent(userName)}&background=random`;
};

/**
 * ProfilePicture Component
 * 
 * Displays user profile picture or initial letter avatar
 * Supports edit mode with upload functionality
 * 
 * @param {Object} props - Component props
 * @param {string} props.name - User's name for initial letter avatar
 * @param {string} props.profilePicture - Image data URL or empty string
 * @param {boolean} props.isEditing - Whether edit mode is active
 * @param {function} props.handleImageChange - Handler for image file upload
 * @param {function} props.handleClearProfilePicture - Handler to clear profile image
 * @param {string} props.size - Size of the profile picture (small, medium, large)
 */
const ProfilePicture = ({ 
  name, 
  profilePicture, 
  isEditing = false, 
  handleImageChange, 
  handleClearProfilePicture,
  size = "medium"
}) => {
  /**
   * Generate default profile picture based on the first letter of user's name
   * @returns {string} The first character of the user's name in uppercase
   */
  const getInitialLetter = () => {
    return name && name.length > 0 ? name.charAt(0).toUpperCase() : "";
  };

  // Setup size classes based on the size prop
  const sizeClasses = {
    small: "w-10 h-10",
    medium: "w-32 h-32",
    large: "w-40 h-40"
  };
  
  const containerSize = sizeClasses[size] || sizeClasses.medium;
  const fontSize = size === "small" ? "text-xl" : "text-4xl";
  const removeButtonSize = size === "small" ? "w-6 h-6 -bottom-1 -right-1" : "w-8 h-8 -bottom-2 -right-2";
  const removeIconSize = size === "small" ? "h-4 w-4" : "h-5 w-5";

  return (
    <div className={`relative mx-auto ${containerSize} z-10`}>
      <label
        htmlFor="profilePicture"
        className={`cursor-pointer block ${isEditing ? "group" : ""}`}
      >
        <div className={`mx-auto ${containerSize}`}>
          {profilePicture ? (
            // Display uploaded profile picture if available
            <div className={`relative ${containerSize}`}>
              <div className="absolute inset-0 rounded-full bg-gradient-to-r from-blue-400 to-purple-500 blur-md transform scale-110 animate-pulse"></div>
              <img
                src={profilePicture}
                alt="Profile"
                className={`relative ${containerSize} rounded-full object-cover border-4 border-indigo-900/80 shadow-lg shadow-indigo-700/30`}
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
            // Display initial letter if no profile picture is uploaded
            <div className={`relative ${containerSize}`}>
              <div className="absolute inset-0 rounded-full bg-gradient-to-r from-blue-400 to-purple-500 blur-md transform scale-110 animate-pulse"></div>
              <div className={`relative ${containerSize} rounded-full bg-gradient-to-br from-blue-400 to-indigo-500 flex items-center justify-center text-white ${fontSize} font-bold border-4 border-indigo-900/80 shadow-lg shadow-indigo-700/30`}>
                {getInitialLetter()}
              </div>
            </div>
          )}
        </div>
      </label>
      
      {/* Profile picture input and clear button for edit mode */}
      {isEditing && (
        <>
          <input
            type="file"
            id="profilePicture"
            accept="image/*"
            onChange={handleImageChange}
            className="hidden"
          />
          {profilePicture && (
            <button
              onClick={handleClearProfilePicture}
              className={`absolute ${removeButtonSize} bg-red-500 hover:bg-red-600 text-white p-1 rounded-full flex items-center justify-center shadow-md transition-all duration-200`}
              title="Remove profile picture"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className={removeIconSize} viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
            </button>
          )}
        </>
      )}
    </div>
  );
};

export default ProfilePicture;