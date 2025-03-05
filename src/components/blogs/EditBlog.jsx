import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

const EditBlog = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: '',
    content: '',
    image: '',
    category: '',
    tags: ''
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const allBlogs = JSON.parse(localStorage.getItem('blogs') || '[]');
    const blog = allBlogs.find(blog => blog.id === id);
    
    if (!blog) {
      setError('Blog not found');
      setLoading(false);
      return;
    }
    
    setFormData({
      ...blog,
      tags: Array.isArray(blog.tags) ? blog.tags.join(', ') : ''
    });
    setLoading(false);
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevData => ({
      ...prevData,
      [name]: value
    }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData(prevData => ({
          ...prevData,
          image: reader.result
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.title.trim() || !formData.content.trim()) {
      setError('Title and content are required!');
      return;
    }

    // Get existing blogs from localStorage
    const allBlogs = JSON.parse(localStorage.getItem('blogs') || '[]');
    
    // Find index of blog to update
    const blogIndex = allBlogs.findIndex(blog => blog.id === id);
    
    if (blogIndex === -1) {
      setError('Blog not found');
      return;
    }
    
    // Prepare updated blog
    const updatedBlog = {
      ...allBlogs[blogIndex],
      ...formData,
      tags: formData.tags.split(',').map(tag => tag.trim()).filter(tag => tag),
      updatedAt: new Date().toISOString(),
      description: formData.content.substring(0, 150) + '...'
    };
    
    // Update blogs array
    allBlogs[blogIndex] = updatedBlog;
    localStorage.setItem('blogs', JSON.stringify(allBlogs));
    
    // Redirect to user blogs page
    // navigate('/user-blogs');
  };

  if (loading) {
    return <div className="max-w-2xl mx-auto p-6 text-center">Loading...</div>;
  }

  // if (error === 'Blog not found') {
  //   return (
  //     <div className="max-w-2xl mx-auto p-6 text-center">
  //       <h2 className="text-xl text-red-600 mb-4">Blog not found</h2>
  //       <button 
  //          onClick={() => {
  //           console.log("edit blog Navigating to /my-blogs...");
  //           navigate("/my-blogs");
  //         }}
  //         className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition"
  //       >
  //         Back to My Blogs
  //       </button>
  //     </div>
  //   );
  // }

  return (
    <div className="max-w-2xl mx-auto p-6">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">Edit Blog</h1>
      
      {error && (
        <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 mb-6">
          <p>{error}</p>
        </div>
      )}
      
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block text-gray-700 mb-2">Title</label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        
        <div>
          <label className="block text-gray-700 mb-2">Category</label>
          <select
            name="category"
            value={formData.category}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">Select a category</option>
            <option value="Technology">Technology</option>
            <option value="Health">Health</option>
            <option value="Travel">Travel</option>
            <option value="Food">Food</option>
            <option value="Lifestyle">Lifestyle</option>
          </select>
        </div>
        
        <div>
          <label className="block text-gray-700 mb-2">Tags (comma separated)</label>
          <input
            type="text"
            name="tags"
            value={formData.tags}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        
        <div>
          <label className="block text-gray-700 mb-2">Image</label>
          <input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            className="w-full"
          />
          {formData.image && (
            <img 
              src={formData.image} 
              alt="Preview" 
              className="mt-4 w-full max-h-64 object-cover rounded-md"
            />
          )}
        </div>
        
        <div>
          <label className="block text-gray-700 mb-2">Content</label>
          <textarea
            name="content"
            value={formData.content}
            onChange={handleChange}
            rows="10"
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          ></textarea>
        </div>
        
        <div className="flex space-x-4">
          <button 
            type="submit"
            onClick={() => navigate('/blogs')}
            className="px-6 py-3 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition"
          >
            Update Blog
          </button>
          <button 
            type="button"
            onClick={() => navigate('/blogs')}
            className="px-6 py-3 bg-gray-500 text-white rounded-md hover:bg-gray-600 transition"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditBlog;