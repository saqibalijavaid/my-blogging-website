import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import BlogForm from './BlogForm';

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
  const [categories, setCategories] = useState([]);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);

  // Fetch blog data and categories
  useEffect(() => {
    const fetchData = async () => {
      try {
        const [blogRes, categoriesRes] = await Promise.all([
          fetch(`http://localhost:5000/api/posts/${id}`, {
            credentials: 'include'
          }),
          fetch('http://localhost:5000/api/posts/categories', {
            credentials: 'include'
          })
        ]);

        if (!blogRes.ok) throw new Error('❌ Failed to fetch blog');
        if (!categoriesRes.ok) throw new Error('❌ Failed to fetch categories');

        const blog = await blogRes.json();
        const catData = await categoriesRes.json();

        setFormData({
          title: blog.title,
          content: blog.content,
          image: blog.image,
          category: blog.category_id,
          tags: Array.isArray(blog.tags) ? blog.tags.join(', ') : ''
        });

        setCategories(catData || []);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData(prev => ({ ...prev, image: reader.result }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    const updatedData = {
      ...formData,
      tags: formData.tags.split(',').map(tag => tag.trim()).filter(tag => tag)
    };

    try {
      const res = await fetch(`http://localhost:5000/api/posts/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        credentials: 'include',
        body: JSON.stringify(updatedData)
      });

      if (!res.ok) {
        const result = await res.json();
        throw new Error(result.message || '❌ Failed to update post.');
      }

      navigate('/blogs');
    } catch (err) {
      setError(err.message);
    }
  };

// const handleSubmit = async (e) => {
//   e.preventDefault();
//   setError('');

//   const updatedData = {
//     ...formData,
//     category: parseInt(formData.category), // 🔥 Fix category type
//     tags: formData.tags
//       .split(',')
//       .map(tag => tag.trim())
//       .filter(tag => tag)
//   };

//   try {
//     const res = await fetch(`http://localhost:5000/api/posts/${id}`, {
//       method: 'PUT',
//       headers: {
//         'Content-Type': 'application/json'
//       },
//       credentials: 'include',
//       body: JSON.stringify(updatedData)
//     });

//     if (!res.ok) {
//       const result = await res.json();
//       throw new Error(result.message || '❌ Failed to update post.');
//     }

//     navigate('/blogs');
//   } catch (err) {
//     setError(err.message);
//   }
// };


  if (loading) return <div className="text-center p-6">Loading...</div>;

  return (
    <div className="max-w-2xl mx-auto p-6">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">Edit Blog</h1>

      {error && (
        <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 mb-6">
          <p>{error}</p>
        </div>
      )}

      <BlogForm
        formData={formData}
        handleChange={handleChange}
        handleImageChange={handleImageChange}
        handleSubmit={handleSubmit}
        categories={categories}
        error={error}
      />
    </div>
  );
};

export default EditBlog;
