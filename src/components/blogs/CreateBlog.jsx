import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const CreateBlog = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: '',
    content: '',
    image: '',
    category: '',
    tags: ''
  });
  const [error, setError] = useState('');

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

    console.log("Current User:", localStorage.getItem('currentUser'));

    // Get existing blogs from localStorage
    const existingBlogs = JSON.parse(localStorage.getItem('blogs') || '[]');
    


    // Create new blog with generated ID and current user
    const newBlog = {
      ...formData,
      id: Date.now().toString(),
      userId: localStorage.getItem('currentUser') || 'anonymous',
      createdAt: new Date().toISOString(),
      tags: formData.tags.split(',').map(tag => tag.trim()).filter(tag => tag),
      description: formData.content.substring(0, 150) + '...'
    };
    
    // Save updated blogs array
    localStorage.setItem('blogs', JSON.stringify([newBlog, ...existingBlogs]));
    
    // Redirect to all blogs page
    navigate('/blogs');
  };

  return (
    <div className="max-w-2xl mx-auto p-6">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">Create New Blog</h1>
      
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
            placeholder="Enter blog title"
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
            placeholder="e.g. react, programming, web development"
          />
        </div>
        
        <div>
          <label className="block text-gray-700 mb-2">Image Upload</label>
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
            placeholder="Write your blog content here"
          ></textarea>
        </div>
        
        <button 
          type="submit"
          className="px-6 py-3 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition"
        >
          Publish Blog
        </button>
      </form>
    </div>
  );
};

export default CreateBlog;

// import React, { useState } from 'react';
// import { useNavigate } from 'react-router-dom';

// const CreateBlog = () => {
//   const navigate = useNavigate();
//   const [formData, setFormData] = useState({
//     title: '',
//     content: '',
//     image: '',
//     category: '',
//     tags: ''
//   });
//   const [error, setError] = useState('');

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData(prevData => ({
//       ...prevData,
//       [name]: value
//     }));
//   };

//   const handleImageChange = (e) => {
//     const file = e.target.files[0];
//     if (file) {
//       const reader = new FileReader();
//       reader.onloadend = () => {
//         setFormData(prevData => ({
//           ...prevData,
//           image: reader.result
//         }));
//       };
//       reader.readAsDataURL(file);
//     }
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     if (!formData.title.trim() || !formData.content.trim()) {
//       setError('Title and content are required!');
//       return;
//     }

//     // Retrieve current user and parse it
//     const currentUser = JSON.parse(localStorage.getItem('currentUser'));
//     if (!currentUser) {
//       setError('You must be logged in to create a blog!');
//       return;
//     }

//     console.log("Current User:", currentUser);

//     // Get existing blogs from localStorage
//     const existingBlogs = JSON.parse(localStorage.getItem('blogs') || '[]');

//     // Create new blog using user's email as the identifier
//     const newBlog = {
//       ...formData,
//       id: Date.now().toString(),
//       userEmail: currentUser.email, // Using email as the username/identifier
//       createdAt: new Date().toISOString(),
//       tags: formData.tags.split(',').map(tag => tag.trim()).filter(tag => tag),
//       description: formData.content.substring(0, 150) + '...'
//     };

//     // Save updated blogs array
//     localStorage.setItem('blogs', JSON.stringify([newBlog, ...existingBlogs]));

//     // Redirect to all blogs page
//     navigate('/all-blogs');
//   };

//   return (
//     <div className="max-w-2xl mx-auto p-6">
//       <h1 className="text-3xl font-bold text-gray-800 mb-6">Create New Blog</h1>
      
//       {error && (
//         <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 mb-6">
//           <p>{error}</p>
//         </div>
//       )}
      
//       <form onSubmit={handleSubmit} className="space-y-6">
//         <div>
//           <label className="block text-gray-700 mb-2">Title</label>
//           <input
//             type="text"
//             name="title"
//             value={formData.title}
//             onChange={handleChange}
//             className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//             placeholder="Enter blog title"
//           />
//         </div>
        
//         <div>
//           <label className="block text-gray-700 mb-2">Category</label>
//           <select
//             name="category"
//             value={formData.category}
//             onChange={handleChange}
//             className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//           >
//             <option value="">Select a category</option>
//             <option value="Technology">Technology</option>
//             <option value="Health">Health</option>
//             <option value="Travel">Travel</option>
//             <option value="Food">Food</option>
//             <option value="Lifestyle">Lifestyle</option>
//           </select>
//         </div>
        
//         <div>
//           <label className="block text-gray-700 mb-2">Tags (comma separated)</label>
//           <input
//             type="text"
//             name="tags"
//             value={formData.tags}
//             onChange={handleChange}
//             className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//             placeholder="e.g. react, programming, web development"
//           />
//         </div>
        
//         <div>
//           <label className="block text-gray-700 mb-2">Image Upload</label>
//           <input
//             type="file"
//             accept="image/*"
//             onChange={handleImageChange}
//             className="w-full"
//           />
//           {formData.image && (
//             <img 
//               src={formData.image} 
//               alt="Preview" 
//               className="mt-4 w-full max-h-64 object-cover rounded-md"
//             />
//           )}
//         </div>
        
//         <div>
//           <label className="block text-gray-700 mb-2">Content</label>
//           <textarea
//             name="content"
//             value={formData.content}
//             onChange={handleChange}
//             rows="10"
//             className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//             placeholder="Write your blog content here"
//           ></textarea>
//         </div>
        
//         <button 
//           type="submit"
//           className="px-6 py-3 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition"
//         >
//           Publish Blog
//         </button>
//       </form>
//     </div>
//   );
// };

// export default CreateBlog;
