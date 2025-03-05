import React, { useState, useEffect } from 'react';
import BlogCard from './BlogCard';
import { defaultBlogs } from './DefaultBlogs';


const AllBlogs = () => {
  const [allBlogs, setAllBlogs] = useState([]);
  const [filteredBlogs, setFilteredBlogs] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    // Get user blogs from localStorage
    const userBlogs = JSON.parse(localStorage.getItem('blogs') || '[]');
    
    // Combine with default blogs
    const combined = [...userBlogs, ...defaultBlogs];
    setAllBlogs(combined);
    setFilteredBlogs(combined);
    
    // Extract unique categories
    const uniqueCategories = Array.from(
      new Set(combined.map(blog => blog.category).filter(Boolean))
    );
    setCategories(uniqueCategories);
  }, []);

  useEffect(() => {
    let filtered = [...allBlogs];
    
    // Filter by search term
    if (searchTerm.trim()) {
      const term = searchTerm.toLowerCase();
      filtered = filtered.filter(blog => 
        blog.title.toLowerCase().includes(term) || 
        blog.description.toLowerCase().includes(term) ||
        (blog.tags && blog.tags.some(tag => tag.toLowerCase().includes(term)))
      );
    }
    
    // Filter by category
    if (selectedCategory) {
      filtered = filtered.filter(blog => blog.category === selectedCategory);
    }
    
    setFilteredBlogs(filtered);
  }, [searchTerm, selectedCategory, allBlogs]);

  return (
    <div className="max-w-6xl mx-auto p-6">
      <h1 className="text-3xl font-bold text-gray-800 mb-8">Explore All Blogs</h1>
      
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
        
        <select
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
          className="px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="">All Categories</option>
          {categories.map(category => (
            <option key={category} value={category}>
              {category}
            </option>
          ))}
        </select>
      </div>
      
      {filteredBlogs.length === 0 ? (
        <div className="bg-gray-100 rounded-lg p-8 text-center">
          <h2 className="text-xl text-gray-700">No blogs found</h2>
          <p className="text-gray-600 mt-2">Try different search terms or filters</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredBlogs.map(blog => (
            <BlogCard key={blog.id} blog={blog} />
          ))}
        </div>
      )}
    </div>
  );
};

export default AllBlogs;