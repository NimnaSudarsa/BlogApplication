import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, useNavigate, Link } from 'react-router-dom';
import '../style/BlogDetail.css';  

export default function BlogDetail() {
  const { id } = useParams();
  const [blog, setBlog] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    axios.get(`http://localhost:8000/api/blogs/${id}/`)
      .then(res => setBlog(res.data));
  }, [id]);

  const handleDelete = async () => {
    const token = localStorage.getItem('token');
    await axios.delete(`http://localhost:8000/api/blogs/${id}/delete/`, {
      headers: { Authorization: `Token ${token}` }
    });
    navigate('/');
  };

  if (!blog) return <p className="loading-text">Loading...</p>;

  const currentUser = localStorage.getItem('user');
  const canEdit = blog.author.username === currentUser;

  return (
    <div className="blog-detail-container">
      <div className="blog-detail-card">
        <h2 className="blog-title">{blog.title}</h2>
        <p className="blog-content">{blog.content}</p>
        <p className="blog-author">By {blog.author.username}</p>

        {canEdit && (
          <div className="blog-actions">
            <Link className="edit-link" to={`/edit/${id}`}>Edit</Link>
            <button className="delete-button" onClick={handleDelete}>Delete</button>
          </div>
        )}
      </div>
    </div>
  );
}
