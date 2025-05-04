import React, { useState } from 'react';
import axios from 'axios';
import '../style/Register.css'; // ← import the CSS file
import { Link } from 'react-router-dom';

export default function Register() {
  const [form, setForm] = useState({ username: '', email: '', password: '' });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('http://127.0.0.1:8000/api/register/', form);
      alert('Registered! Token: ' + res.data.token);
      localStorage.setItem('token', res.data.token);
    } catch (err) {
      alert('Registration failed');
    }
  };

//   return (
//     <form className="register-form" onSubmit={handleSubmit}>
//       <h2 className="form-title">Register</h2>
//       <input
//         className="form-input"
//         placeholder="Username"
//         value={form.username}
//         onChange={e => setForm({ ...form, username: e.target.value })}
//       />
//       <input
//         className="form-input"
//         placeholder="Email"
//         value={form.email}
//         onChange={e => setForm({ ...form, email: e.target.value })}
//       />
//       <input
//         className="form-input"
//         placeholder="Password"
//         type="password"
//         value={form.password}
//         onChange={e => setForm({ ...form, password: e.target.value })}
//       />
//       <button className="form-button" type="submit">Register</button>
//       <p className="login-link">
//           Already have an account? <Link to="/login">Login here</Link>
//         </p>
//     </form>
//   );
// }


return (
  <div className="register-container">
    <div className="register-left">
      <h1>Welcome </h1>
      <p>Welcome to our Blog Website!</p>
    </div>
    <form className="register-form" onSubmit={handleSubmit}>
      <h2 className="form-title">Register</h2>
      <input
        className="form-input"
        placeholder="Username"
        value={form.username}
        onChange={e => setForm({ ...form, username: e.target.value })}
      />
      <input
        className="form-input"
        placeholder="Email"
        value={form.email}
        onChange={e => setForm({ ...form, email: e.target.value })}
      />
      <input
        className="form-input"
        placeholder="Password"
        type="password"
        value={form.password}
        onChange={e => setForm({ ...form, password: e.target.value })}
      />
      <button className="form-button" type="submit">Register</button>
      <p className="login-link">
        Already have an account? <Link to="/login">Login here</Link>
      </p>
    </form>
  </div>
);
}