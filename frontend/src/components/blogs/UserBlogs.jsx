import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import BlogCard from "./BlogCard";

const UserBlogs = () => {
  const [userBlogs, setUserBlogs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUserBlogs = async () => {
      try {
        const res = await fetch("http://localhost:5000/api/posts/mine", {
          credentials: "include", // Sends cookies for session auth
        });

        if (!res.ok) {
          throw new Error("Failed to fetch user blogs");
        }

        const data = await res.json();

        // ✅ Normalize each blog's tags + category before storing
        const normalizedData = data.map((blog) => ({
          ...blog,
          tags: Array.isArray(blog.tags)
            ? blog.tags
            : typeof blog.tags === "string"
            ? blog.tags.split(",").map((tag) => tag.trim())
            : [],
          category: blog.category_name || blog.category || "",
          description: blog.content?.slice(0, 180) + "..." || "",
        }));

        setUserBlogs(normalizedData);
      } catch (err) {
        console.error("Error fetching user blogs:", err);
        setUserBlogs([]); // fallback to empty
      } finally {
        setLoading(false);
      }
    };

    fetchUserBlogs();
  }, []);

  return (
    <div className="max-w-6xl mx-auto p-6">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-gray-800">My Blogs</h1>
        <Link
          to="/create-blog"
          className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 transition"
        >
          Create New Blog
        </Link>
      </div>

      {userBlogs.length === 0 ? (
        <div className="bg-gray-100 rounded-lg p-8 text-center">
          <h2 className="text-xl text-gray-700 mb-4">
            You haven't created any blogs yet
          </h2>
          <Link
            to="/create-blog"
            className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition"
          >
            Create Your First Blog
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {userBlogs.map((blog) => (
            <div key={blog.id} className="relative">
              <BlogCard blog={blog} />
              <div className="absolute top-2 right-2 flex space-x-2">
                <Link
                  to={`/edit-blog/${blog.id}`}
                  className="p-2 bg-white text-blue-500 rounded-full shadow hover:bg-blue-50 transition"
                >
                  {/* ✏️ Edit icon */}
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
                  </svg>
                </Link>
                <Link
                  to={`/delete-blog/${blog.id}`}
                  className="p-2 bg-white text-red-500 rounded-full shadow hover:bg-red-50 transition"
                >
                  {/* 🗑️ Delete icon */}
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z"
                      clipRule="evenodd"
                    />
                  </svg>
                </Link>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default UserBlogs;
