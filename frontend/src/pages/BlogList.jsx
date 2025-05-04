// import React, { useState } from 'react';
// import axios from 'axios';
// import { useNavigate } from 'react-router-dom';

// export default function BlogForm() {
//   const [form, setForm] = useState({ title: '', content: '' });
//   const navigate = useNavigate();

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     const token = localStorage.getItem('token');
//     await axios.post('http://localhost:8000/api/blogs/create/', form, {
//       headers: { Authorization: `Token ${token}` }
//     });
//     navigate('/');
//   };

//   return (
//     <form onSubmit={handleSubmit}>
//       <h2>Create Blog</h2>
//       <input placeholder="Title" onChange={e => setForm({ ...form, title: e.target.value })} />
//       <textarea placeholder="Content" onChange={e => setForm({ ...form, content: e.target.value })} />
//       <button type="submit">Publish</button>
//     </form>
//   );
// }


// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import '../style/BlogList.css';  // Make sure this path is correct

// export default function BlogList() {
//   const [blogs, setBlogs] = useState([]);

//   useEffect(() => {
//     // Get the token from localStorage
//     const token = localStorage.getItem('token');
//     if (token) {
//       // Make the request with the token in the Authorization header
//       axios.get('http://localhost:8000/api/blogs/', {
//         headers: {
//           Authorization: `Token ${token}`, // Attach the token here
//         }
//       })
//       .then(res => setBlogs(res.data))
//       .catch(err => console.error('Error fetching blogs:', err));
//     } else {
//       console.log('No token found.');
//     }
//   }, []); 

//   return (
//     <div className="blog-container">
//       <h2 className="blog-heading">All Blog Posts</h2>
//       {blogs.length === 0 ? (
//         <p className="no-blogs">No blogs available.</p>
//       ) : (
//         blogs.map(blog => (
//           <div key={blog.id} className="blog-card">
//             <h3 className="blog-title">{blog.title}</h3>
//             <p className="blog-content">{blog.content}</p>
//             <p className="blog-author">Author: {blog.author}</p> {/* Display author's username */}
//           </div>
//         ))
//       )}
//     </div>
//   );
// }


// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import '../style/BlogList.css';  // Ensure this path is correct
// import EditBlogModal from './EditBlog';

// export default function BlogList() {
//   const [blogs, setBlogs] = useState([]);
//   const [showModal, setShowModal] = useState(false);  // For toggling the modal
//   const [selectedBlog, setSelectedBlog] = useState(null);  // Store selected blog for editing

//   useEffect(() => {
//     // Get the token from localStorage
//     const token = localStorage.getItem('token');
//     if (token) {
//       // Fetch the blogs
//       axios.get('http://localhost:8000/api/blogs/', {
//         headers: {
//           Authorization: `Token ${token}`, // Attach the token here
//         }
//       })
//         .then(res => setBlogs(res.data))
//         .catch(err => console.error('Error fetching blogs:', err));
//     } else {
//       console.log('No token found.');
//     }
//   }, []);

//   // Function to handle the opening of the modal with the selected blog
//   const openEditModal = (blog) => {
//     setSelectedBlog(blog);
//     setShowModal(true);
//   };

//   return (
//     <div className="blog-container">
//       <h2 className="blog-heading">All Blog Posts</h2>
//       {blogs.length === 0 ? (
//         <p className="no-blogs">No blogs available.</p>
//       ) : (
//         blogs.map(blog => (
//           <div key={blog.id} className="blog-card">
//             <h3 className="blog-title">{blog.title}</h3>
//             <p className="blog-content">{blog.content}</p>
//             <p className="blog-author">Author: {blog.author}</p>
//             <button onClick={() => openEditModal(blog)}>Edit</button>  {/* Edit button */}
//           </div>
//         ))
//       )}

//       {/* Modal for editing blog */}
//       {showModal && selectedBlog && (
//         <EditBlogModal
//           blog={selectedBlog}
//           closeModal={() => setShowModal(false)}  // Close modal
//         />
//       )}
//     </div>
//   );
// }


// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import '../style/BlogList.css';  // Ensure this path is correct
// import EditBlogModal from './EditBlog';

// export default function BlogList() {
//   const [blogs, setBlogs] = useState([]);
//   const [showModal, setShowModal] = useState(false);  // For toggling the modal
//   const [selectedBlog, setSelectedBlog] = useState(null);  // Store selected blog for editing
//   const [userId, setUserId] = useState(null);  
//   useEffect(() => {
//     const token = localStorage.getItem('token');
  
//     // Always fetch blogs
//     axios.get('http://localhost:8000/api/blogs/', {
//       headers: token ? { Authorization: `Token ${token}` } : {}
//     })
//       .then(res => setBlogs(res.data))
//       .catch(err => console.error('Error fetching blogs:', err));
  
//     // Fetch user only if token exists
//     if (token) {
//       axios.get('http://localhost:8000/api/user/', {
//         headers: { Authorization: `Token ${token}` }
//       })
//         .then(res => setUserId(res.data.id))
//         .catch(err => console.error('Error fetching user:', err));
//     }
//   }, []);
  
//   const handleDelete = (blogId) => {
//     const token = localStorage.getItem('token');
//     if (window.confirm('Are you sure you want to delete this blog?')) {
//       axios.delete(`http://localhost:8000/api/blogs/${blogId}/`, {
//         headers: { Authorization: `Token ${token}` }
//       })
//       .then(() => {
//         // Remove the deleted blog from state
//         setBlogs(prevBlogs => prevBlogs.filter(blog => blog.id !== blogId));
//       })
//       .catch(err => console.error('Error deleting blog:', err));
//     }
//   };
  

//   // Function to handle the opening of the modal with the selected blog
//   const openEditModal = (blog) => {
//     setSelectedBlog(blog);
//     setShowModal(true);
//   };

//   return (
//     <div className="blog-container">
//       <h2 className="blog-heading">All Blog Posts</h2>
//       {blogs.length === 0 ? (
//         <p className="no-blogs">No blogs available.</p>
//       ) : (
//         blogs.map(blog => (
//           <div key={blog.id} className="blog-card">
//             <h3 className="blog-title">{blog.title}</h3>
//             <p className="blog-content">{blog.content}</p>
//             <p className="blog-author">Author: {blog.author.username}</p>
//             {/* Show the Edit button only if the logged-in user is the author */}
//             {userId === blog.author.id && (
//   <div>
//     <button onClick={() => openEditModal(blog)}>Edit</button>
//     <button onClick={() => handleDelete(blog.id)}>Delete</button>
//   </div>
// )}


//           </div>
//         ))
//       )}

//       {/* Modal for editing blog */}
//       {showModal && selectedBlog && (
//         <EditBlogModal
//           blog={selectedBlog}
//           closeModal={() => setShowModal(false)}  // Close modal
//         />
//       )}
//     </div>
//   );
// }



// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import { Link, useNavigate } from 'react-router-dom';
// import '../style/BlogList.css';
// import EditBlogModal from './EditBlog';

// export default function BlogList() {
//   const [blogs, setBlogs] = useState([]);
//   const [user, setUser] = useState(null);
//   const [showModal, setShowModal] = useState(false);
//   const [selectedBlog, setSelectedBlog] = useState(null);
//   const navigate = useNavigate();

//   useEffect(() => {
//     const token = localStorage.getItem('token');

//     axios.get('http://localhost:8000/api/blogs/', {
//       headers: token ? { Authorization: `Token ${token}` } : {}
//     })
//       .then(res => setBlogs(res.data))
//       .catch(err => console.error('Error fetching blogs:', err));

//     if (token) {
//       axios.get('http://localhost:8000/api/user/', {
//         headers: { Authorization: `Token ${token}` }
//       })
//         .then(res => setUser(res.data))
//         .catch(err => console.error('Error fetching user:', err));
//     }
//   }, []);

//   const handleDelete = (blogId) => {
//     const token = localStorage.getItem('token');
//     if (window.confirm('Are you sure you want to delete this blog?')) {
//       axios.delete(`http://localhost:8000/api/blogs/${blogId}/`, {
//         headers: { Authorization: `Token ${token}` }
//       })
//       .then(() => {
//         setBlogs(prevBlogs => prevBlogs.filter(blog => blog.id !== blogId));
//       })
//       .catch(err => console.error('Error deleting blog:', err));
//     }
//   };

//   const openEditModal = (blog) => {
//     setSelectedBlog(blog);
//     setShowModal(true);
//   };

//   const handleLogout = () => {
//     localStorage.removeItem('token');
//     setUser(null);
//     navigate('/login');
//   };

//   return (
//     <div className="blog-container">
//       <div className="header">
//         <h2>All Blog Posts</h2>
//         {user ? (
//           <div className="user-info">
//             <span>Welcome, {user.username}</span>
//             <button onClick={handleLogout} className="logout-btn">Logout</button>
//           </div>
//         ) : (
//           <Link to="/login" className="login-btn">Login</Link>
//         )}
//       </div>

//       {blogs.length === 0 ? (
//         <p className="no-blogs">No blogs available.</p>
//       ) : (
//         blogs.map(blog => (
//           <div key={blog.id} className="blog-card">
//             <h3 className="blog-title">{blog.title}</h3>
//             <p className="blog-content">{blog.content}</p>
//             <p className="blog-author">Author: {blog.author.username}</p>

//             {user?.id === blog.author.id && (
//               <div className="blog-actions">
//                 <button className="edit-btn" onClick={() => openEditModal(blog)}>Edit</button>
//                 {/* <Link to={`/edit/${blog.id}`} className="edit-btn">Edit</Link> */}

//                 <button className="delete-btn" onClick={() => handleDelete(blog.id)}>Delete</button>
//               </div>
//             )}
//           </div>
//         ))
//       )}

//       {showModal && selectedBlog && (
//         <EditBlogModal
//           blog={selectedBlog}
//           closeModal={() => setShowModal(false)}
//         />
//       )}
//     </div>
//   );
// }




















import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import '../style/BlogList.css';
import EditBlogModal from './EditBlog';

export default function BlogList() {
  const [blogs, setBlogs] = useState([]);
  const [user, setUser] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [selectedBlog, setSelectedBlog] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');

    axios.get('http://localhost:8000/api/blogs/', {
      headers: token ? { Authorization: `Token ${token}` } : {}
    })
      .then(res => setBlogs(res.data))
      .catch(err => console.error('Error fetching blogs:', err));

    if (token) {
      axios.get('http://localhost:8000/api/user/', {
        headers: { Authorization: `Token ${token}` }
      })
        .then(res => setUser(res.data))
        .catch(err => console.error('Error fetching user:', err));
    }
  }, []);

  const handleDelete = (blogId) => {
    const token = localStorage.getItem('token');
    if (window.confirm('Are you sure you want to delete this blog?')) {
      axios.delete(`http://localhost:8000/api/blogs/${blogId}/`, {
        headers: { Authorization: `Token ${token}` }
      })
        .then(() => {
          setBlogs(prevBlogs => prevBlogs.filter(blog => blog.id !== blogId));
        })
        .catch(err => console.error('Error deleting blog:', err));
    }
  };

  const openEditModal = (blog) => {
    setSelectedBlog(blog);
    setShowModal(true);
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    setUser(null);
    navigate('/login');
  };

  return (
    <div className="blog-container">
      <div className="header">
        <h2>All Blog Posts</h2>
        {user ? (
          <div className="user-info">
            <span>Welcome, {user.username}</span>
            <button onClick={handleLogout} className="logout-btn">Logout</button>
            <Link to="/create" className="create-btn">Create Blog</Link>
          </div>
        ) : (
          <Link to="/login" className="login-btn">Login</Link>
        )}
      </div>

      {blogs.length === 0 ? (
        <p className="no-blogs">No blogs available.</p>
      ) : (
        blogs.map(blog => (
          <div key={blog.id} className="blog-card">
            <h3 className="blog-title">{blog.title}</h3>
            <p className="blog-content">{blog.content}</p>
            <p className="blog-author">Author: {blog.author.username}</p>

            {user?.id === blog.author.id && (
              <div className="blog-actions">
                <button className="edit-btn" onClick={() => openEditModal(blog)}>Edit</button>
                <button className="delete-btn" onClick={() => handleDelete(blog.id)}>Delete</button>
              </div>
            )}
          </div>
        ))
      )}

      {showModal && selectedBlog && (
        <EditBlogModal
          blog={selectedBlog}
          closeModal={() => setShowModal(false)}
        />
      )}
    </div>
  );
}
