import React, { useState, useEffect } from "react";
import BlogCard from "./BlogCard";

const AllBlogs = () => {
  const [filteredBlogs, setFilteredBlogs] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [categories, setCategories] = useState([]);

  // Fetch all blogs
  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        let url = "http://localhost:5000/api/posts";
        const queryParams = [];

        if (searchTerm.trim()) {
          queryParams.push(`search=${encodeURIComponent(searchTerm)}`);
        }

        if (selectedCategory) {
          queryParams.push(
            `category_id=${encodeURIComponent(selectedCategory)}`
          );
        }

        if (queryParams.length > 0) {
          url += `?${queryParams.join("&")}`;
        }

        const res = await fetch(url, {
          credentials: "include", // required to send cookies/session with request
        });
        const data = await res.json();
        // setAllBlogs(data);
        setFilteredBlogs(data);
      } catch (err) {
        console.error("Error fetching blogs:", err);
      }
    };

    fetchBlogs();
  }, [searchTerm, selectedCategory]);

  // Fetch all categories
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await fetch("http://localhost:5000/api/posts/categories", {
          credentials: "include",
        });

        if (!res.ok) {
          throw new Error("Failed to fetch categories");
        }

        const data = await res.json();

        // Check if it's already an array of objects
        if (Array.isArray(data) && typeof data[0] === "object") {
          setCategories(data);
        } else {
          console.warn("Unexpected data format:", data);
          setCategories([]);
        }
      } catch (err) {
        console.error("Error fetching categories:", err);
      }
    };

    fetchCategories();
  }, []);

  return (
    <div className="max-w-6xl mx-auto p-6">
      <h1 className="text-3xl font-bold text-gray-800 mb-8">
        Explore All Blogs
      </h1>

      <div className="flex flex-col md:flex-row justify-between gap-4 mb-8">
        <div className="relative flex-1">
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search blogs..."
            className="w-full px-4 py-2 pr-10 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5 text-gray-400 absolute right-3 top-3"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
        </div>

        <div className="relative">
          <select
            id="categoryFilter"
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 appearance-none cursor-pointer pr-10"
            aria-label="Filter by category"
          >
            <option value="">All Categories</option>
            {categories.map((category) => (
              <option key={category.id} value={category.id}>
                {category.name}
              </option>
            ))}
          </select>

          <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3 text-gray-700">
            <svg
              className="w-4 h-4 fill-current"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
            >
              <path d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" />
            </svg>
          </div>
        </div>
      </div>

      {filteredBlogs.length === 0 ? (
        <div className="bg-gray-100 rounded-lg p-8 text-center">
          <h2 className="text-xl text-gray-700">No blogs found</h2>
          <p className="text-gray-600 mt-2">
            Try different search terms or filters
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* {filteredBlogs.map((blog) => (
            <BlogCard key={blog.id} blog={blog} />
          ))} */}

          {filteredBlogs.map((blog) => {
            let tagsArray = [];

            if (Array.isArray(blog.tags)) {
              tagsArray = blog.tags;
            } else if (typeof blog.tags === "string") {
              tagsArray = blog.tags.split(",").map((tag) => tag.trim());
            }

            return (
              <BlogCard
                key={blog.id}
                blog={{
                  ...blog,
                  tags: tagsArray,
                  category: blog.category_name || "", // normalize to expected key
                  description: blog.content?.slice(0, 180) + "...", // optional fallback
                }}
              />
            );
          })}
        </div>
      )}
    </div>
  );
};

export default AllBlogs;
