import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

const DeleteBlog = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");

  // Fetch the blog info just for confirmation display
  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const res = await fetch(`http://localhost:5000/api/posts/${id}`, {
          credentials: "include",
        });

        if (!res.ok) {
          throw new Error("Blog not found or access denied");
        }

        const data = await res.json();
        setBlog(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchBlog();
  }, [id]);

  const handleDelete = async () => {
    try {
      const res = await fetch(`http://localhost:5000/api/posts/${id}`, {
        method: "DELETE",
        credentials: "include",
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || "Failed to delete blog.");
      }

      setMessage(data.message);
      setTimeout(() => navigate("/blogs"), 1500);
    } catch (err) {
      setError(err.message);
    }
  };

  if (loading) {
    return <div className="max-w-2xl mx-auto p-6 text-center">Loading...</div>;
  }

  if (error) {
    return (
      <div className="max-w-2xl mx-auto p-6 text-center">
        <h2 className="text-xl text-red-600 mb-4">{error}</h2>
        <button
          onClick={() => navigate("/blogs")}
          className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition"
        >
          Back to Blogs
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto p-6">
      <div className="bg-white rounded-xl shadow-lg p-8">
        <h1 className="text-2xl font-bold text-gray-800 mb-6">
          Confirm Deletion
        </h1>
        <div className="bg-red-50 border-l-4 border-red-400 p-4 mb-6">
          <div className="flex">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6 text-red-400"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
              />
            </svg>
            <div className="ml-3">
              <p className="text-red-700">
                Are you sure you want to delete the following blog? This action
                cannot be undone.
              </p>
            </div>
          </div>
        </div>

        {blog && (
          <div className="mb-6">
            <h2 className="text-xl font-semibold mb-2">{blog.title}</h2>
            {blog.image && (
              <img
                src={blog.image}
                alt={blog.title}
                className="w-full h-48 object-cover rounded-md mb-4"
              />
            )}
            <p className="text-gray-600 line-clamp-3">
              {blog.content || blog.description || "No content available"}
            </p>
          </div>
        )}

        <div className="flex space-x-4">
          <button
            onClick={handleDelete}
            className="px-6 py-3 bg-red-500 text-white rounded-md hover:bg-red-600 transition cursor-pointer"
          >
            Confirm Delete
          </button>
          <button
            onClick={() => navigate("/blogs")}
            className="px-6 py-3 bg-gray-500 text-white rounded-md hover:bg-gray-600 transition cursor-pointer"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteBlog;
