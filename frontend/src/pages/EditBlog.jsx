import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../style/EditBlog.css';  

export default function EditBlogModal({ blog, closeModal }) {
  const [form, setForm] = useState({ title: '', content: '' });
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (blog) {
      setForm({ title: blog.title, content: blog.content });
    }
  }, [blog]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');
    setIsLoading(true);

    try {
      await axios.put(`http://localhost:8000/api/blogs/${blog.id}/`, form, {
        headers: { Authorization: `Token ${token}` },
      });
      alert('Blog updated successfully!');
      closeModal();  // Close the modal after success
    } catch (error) {
      console.error('Error updating blog:', error);
      alert('Update failed');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h2>Edit Blog</h2>

        <form className="edit-blog-form" onSubmit={handleSubmit}>
          <label htmlFor="title">Title</label>
          <input
            id="title"
            type="text"
            placeholder="Enter blog title"
            value={form.title}
            onChange={(e) => setForm({ ...form, title: e.target.value })}
          />

          <label htmlFor="content">Content</label>
          <textarea
            id="content"
            placeholder="Update your content..."
            value={form.content}
            onChange={(e) => setForm({ ...form, content: e.target.value })}
          ></textarea>

          <button type="submit" disabled={isLoading}>
            {isLoading ? 'Updating...' : 'Update Blog'}
          </button>
        </form>

        <button onClick={closeModal}>Close</button> {/* Close button */}
      </div>
    </div>
  );
}
