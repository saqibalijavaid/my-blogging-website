// import { Link } from "react-router-dom";

// const BlogCard = ({ blog }) => {
//   return (
//     <div className="bg-white border border-gray-300 rounded-lg shadow-lg overflow-hidden w-80 transform transition duration-300 hover:scale-105 hover:shadow-xl">
//       {/* Blog Image */}
//       <img
//         src={blog.image}
//         alt={blog.title}
//         className="w-full h-48 object-cover"
//       />

//       {/* Blog Content */}
//       <div className="p-4">
//         {/* Blog Title */}
//         <h2 className="text-xl font-bold text-gray-800 truncate">{blog.title}</h2>

//         {/* Author & Date */}
//         <div className="flex justify-between text-gray-600 text-sm my-2">
//           <span>✍ {blog.author}</span>
//           <span>📅 {blog.date}</span>
//         </div>

//         {/* Short Description */}
//         <p className="text-gray-700 text-sm line-clamp-3">{blog.description}</p>

//         {/* Read More Button */}
//         <Link
//           to={`/blog/${blog.id}`}
//           className="block mt-4 text-center bg-blue-600 text-white py-2 rounded-lg transition duration-300 hover:bg-blue-800"
//         >
//           Read More →
//         </Link>
//       </div>
//     </div>
//   );
// };

// export default BlogCard;

import React from 'react';
import { Link } from 'react-router-dom';

const BlogCard = ({ blog }) => {
  return (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden transition transform hover:scale-105">
      <img 
        src={blog.image || '/api/placeholder/400/250'} 
        alt={blog.title} 
        className="w-full h-48 object-cover"
      />
      <div className="p-6">
        <div className="flex justify-between items-start">
          <h2 className="text-xl font-bold text-gray-800 mb-2 line-clamp-2">{blog.title}</h2>
          {blog.category && (
            <span className="px-2 py-1 bg-purple-100 text-purple-800 text-xs rounded-full">
              {blog.category}
            </span>
          )}
        </div>
        
        {blog.tags && blog.tags.length > 0 && (
          <div className="flex flex-wrap gap-1 mt-2 mb-3">
            {blog.tags.map((tag, index) => (
              <span key={index} className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-full">
                {tag}
              </span>
            ))}
          </div>
        )}
        
        <p className="text-gray-600 mb-4 line-clamp-3">{blog.description}</p>
        
        <Link 
          to={`/blog/${blog.id}`} 
          className="inline-block px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition"
        >
          Read More
        </Link>
      </div>
    </div>
  );
};

export default BlogCard;