import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import '../style/BlogForm.css';

export default function BlogForm() {
  const [form, setForm] = useState({ title: '', content: '' });
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');
    try {
      await axios.post('http://localhost:8000/api/blogs/', form, {
        headers: { Authorization: `Token ${token}` }
      });
      navigate('/');
    } catch (error) {
      console.error('Error creating blog:', error.response?.data);
      alert('Failed to create blog post.');
    }
  };

  return (
    <div className="blog-form-container">
      <form onSubmit={handleSubmit} className="blog-form">
        <h2>Create Blog</h2>

        <label htmlFor="title">Title</label>
        <input
          id="title"
          type="text"
          placeholder="Enter the blog title"
          value={form.title}
          onChange={e => setForm({ ...form, title: e.target.value })}
        />

        <label htmlFor="content">Content</label>
        <textarea
          id="content"
          placeholder="Write your blog content"
          value={form.content}
          onChange={e => setForm({ ...form, content: e.target.value })}
        ></textarea>

        <button type="submit">Publish</button>
      </form>
    </div>
  );
}
