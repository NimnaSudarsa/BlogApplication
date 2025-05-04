// import React, { useState } from 'react';
// import axios from 'axios';
// import { useNavigate, Link } from 'react-router-dom'; // <-- add Link
// import '../style/Login.css';

// export default function Login() {
//   const [form, setForm] = useState({ username: '', password: '' });
//   const navigate = useNavigate();
//   console.log(form);
  

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       const res = await axios.post('http://localhost:8000/api/login/', form);
//       localStorage.setItem('token', res.data.token);
//       navigate('/');
//     } catch {
//       alert('Login failed');
//     }
//   };

//   return (
//     <div className="login-container">
//       <form onSubmit={handleSubmit} className="login-form">
//         <h2>Login</h2>

//         <label htmlFor="username">Username</label>
//         <input
//           id="username"
//           type="text"
//           placeholder="Enter your username"
//           onChange={(e) => setForm({ ...form, username: e.target.value })}
//         />

//         <label htmlFor="password">Password</label>
//         <input
//           id="password"
//           type="password"
//           placeholder="Enter your password"
//           onChange={(e) => setForm({ ...form, password: e.target.value })}
//         />

//         <button type="submit">Login</button>

//         <p className="register-link">
//           Don’t have an account? <Link to="/register">Register here</Link>
//         </p>
//       </form>
//     </div>
//   );
// }






import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import '../style/Login.css';

export default function Login() {
  const [form, setForm] = useState({ username: '', password: '' });
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('http://localhost:8000/api/login/', form);
      localStorage.setItem('token', res.data.token);
      navigate('/');
    } catch {
      alert('Login failed');
    }
  };

  return (
    <div className="login-container">
      <div className="login-left">
        <h2>Nice to see you again</h2>
        <h1>WELCOME BACK</h1>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. 
          Start managing with utmost comfort at second ease right now.
        </p>
      </div>
      <form onSubmit={handleSubmit} className="login-form">
        <h2>Login Account</h2>

        <label htmlFor="username">Username</label>
        <input
          id="username"
          type="text"
          placeholder="Enter your username"
          onChange={(e) => setForm({ ...form, username: e.target.value })}
        />

        <label htmlFor="password">Password</label>
        <input
          id="password"
          type="password"
          placeholder="Enter your password"
          onChange={(e) => setForm({ ...form, password: e.target.value })}
        />

        <div className="form-footer">
          <label>
            <input type="checkbox" /> Remember me
          </label>
          <span className="login-link">Already a member?</span>
        </div>

        <button type="submit">SUBSCRIBE</button>

        <p className="register-link">
          Don’t have an account? <Link to="/register">Register here</Link>
        </p>
      </form>
    </div>
  );
}

