import React, { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";

const BlogDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const currentUser = localStorage.getItem("currentUser") || "anonymous";

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const res = await fetch(`http://localhost:5000/api/posts/${id}`, {
          credentials: "include",
        });
        if (!res.ok) {
          throw new Error("❌ Blog not found");
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

  if (loading) {
    return <div className="max-w-4xl mx-auto p-6 text-center">Loading...</div>;
  }

  if (error) {
    return (
      <div className="max-w-4xl mx-auto p-6 text-center">
        <h2 className="text-xl text-red-600 mb-4">{error}</h2>
        <button
          onClick={() => navigate("/blogs")}
          className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition"
        >
          Back to All Blogs
        </button>
      </div>
    );
  }

  const formatDate = (dateString) => {
    const options = { year: "numeric", month: "long", day: "numeric" };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  // ✅ Normalize blog before using it
  const normalizedBlog = {
    ...blog,
    tags: Array.isArray(blog?.tags)
      ? blog.tags
      : typeof blog?.tags === "string"
      ? blog.tags.split(",").map((tag) => tag.trim())
      : [],
    category: blog.category_name || blog.category || "",
    description: blog.content?.slice(0, 180) + "...",
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <article className="bg-white rounded-xl shadow-lg overflow-hidden">
        {normalizedBlog.image && (
          <img
            src={normalizedBlog.image}
            alt={normalizedBlog.title}
            className="w-full h-64 md:h-96 object-cover"
          />
        )}

        <div className="p-6 md:p-8">
          <div className="flex flex-col md:flex-row md:items-center justify-between mb-6">
            <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4 md:mb-0">
              {normalizedBlog.title}
            </h1>

            {normalizedBlog.userId === currentUser && (
              <div className="flex space-x-4">
                <Link
                  to={`/edit-blog/${normalizedBlog.id}`}
                  className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition"
                >
                  Edit
                </Link>
                <Link
                  to={`/delete-blog/${normalizedBlog.id}`}
                  className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 transition"
                >
                  Delete
                </Link>
              </div>
            )}
          </div>

          <div className="flex flex-wrap items-center text-sm text-gray-600 mb-6">
            {normalizedBlog.created_at && (
              <span className="mr-4">
                Published: {formatDate(normalizedBlog.created_at)}
              </span>
            )}
            {normalizedBlog.category && (
              <span className="px-2 py-1 bg-purple-100 text-purple-800 rounded-full mr-4">
                {normalizedBlog.category}
              </span>
            )}
          </div>

          {normalizedBlog.tags.length > 0 && (
            <div className="flex flex-wrap gap-2 mb-8">
              {normalizedBlog.tags.map((tag, index) => (
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
            {normalizedBlog.content?.split("\n").map((paragraph, index) =>
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
          onClick={() => navigate("/blogs")}
          className="px-4 py-2 bg-gray-500 text-white rounded-md hover:bg-gray-600 transition cursor-pointer"
        >
          Back to All Blogs
        </button>
      </div>
    </div>
  );
};

export default BlogDetails;
