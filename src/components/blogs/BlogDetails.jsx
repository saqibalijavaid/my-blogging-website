import React, { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { defaultBlogs } from "./DefaultBlogs";

const BlogDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const currentUser = localStorage.getItem("currentUser") || "anonymous";

  useEffect(() => {
    // Get user blogs from localStorage
    const userBlogs = JSON.parse(localStorage.getItem("blogs") || "[]");

    // Combine with default blogs
    const allBlogs = [...userBlogs, ...defaultBlogs];

    // Find the requested blog
    const foundBlog = allBlogs.find((blog) => blog.id === id);

    if (!foundBlog) {
      setError("Blog not found");
    } else {
      setBlog(foundBlog);
    }

    setLoading(false);
  }, [id]);

  if (loading) {
    return <div className="max-w-4xl mx-auto p-6 text-center">Loading...</div>;
  }

  // if (error) {
  //   return (
  //     <div className="max-w-4xl mx-auto p-6 text-center">
  //       <h2 className="text-xl text-red-600 mb-4">{error}</h2>
  //       <button
  //         onClick={() => {
  //           console.log("blog detail Navigating to /my-blogs...");
  //           navigate("/my-blogs");
  //         }}
          
  //         className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition"
  //       >
  //         Back to All Blogs
  //       </button>
  //     </div>
  //   );
  // }

  const formatDate = (dateString) => {
    const options = { year: "numeric", month: "long", day: "numeric" };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <article className="bg-white rounded-xl shadow-lg overflow-hidden">
        {blog.image && (
          <img
            src={blog.image}
            alt={blog.title}
            className="w-full h-64 md:h-96 object-cover"
          />
        )}

        <div className="p-6 md:p-8">
          <div className="flex flex-col md:flex-row md:items-center justify-between mb-6">
            <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4 md:mb-0">
              {blog.title}
            </h1>

            {blog.userId === currentUser && (
              <div className="flex space-x-4">
                <Link
                  to={`/edit-blog/${blog.id}`}
                  className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition"
                >
                  Edit
                </Link>
                <Link
                  to={`/delete-blog/${blog.id}`}
                  className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 transition"
                >
                  Delete
                </Link>
              </div>
            )}
          </div>

          <div className="flex flex-wrap items-center text-sm text-gray-600 mb-6">
            {blog.createdAt && (
              <span className="mr-4">
                Published: {formatDate(blog.createdAt)}
              </span>
            )}
            {blog.category && (
              <span className="px-2 py-1 bg-purple-100 text-purple-800 rounded-full mr-4">
                {blog.category}
              </span>
            )}
          </div>

          {blog.tags && blog.tags.length > 0 && (
            <div className="flex flex-wrap gap-2 mb-8">
              {blog.tags.map((tag, index) => (
                <span
                  key={index}
                  className="px-2 py-1 bg-gray-100 text-gray-600 text-sm rounded-full"
                >
                  #{tag}
                </span>
              ))}
            </div>
          )}

          <div className="prose max-w-none">
            {blog.content.split("\n").map((paragraph, index) =>
              paragraph ? (
                <p key={index} className="mb-4">
                  {paragraph}
                </p>
              ) : (
                <br key={index} />
              )
            )}
          </div>
        </div>
      </article>

      <div className="mt-8 flex justify-between">
        <button
          onClick={() => navigate("/my-blogs")}
          className="px-4 py-2 bg-gray-500 text-white rounded-md hover:bg-gray-600 transition"
        >
          Back to All Blogs
        </button>
      </div>
    </div>
  );
};

export default BlogDetails;
