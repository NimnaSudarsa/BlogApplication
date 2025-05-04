import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './styles.css';

import Login from './pages/Login';
import Register from './pages/Register';
import BlogList from './pages/BlogList';
import BlogDetail from './pages/BlogDetails';
import BlogForm from './pages/BlogForm';
import EditBlog from './pages/EditBlog'; // Make sure this file exists


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<BlogList />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/blogs/:id" element={<BlogDetail />} />
        <Route path="/create" element={<BlogForm />} />
        <Route path="/edit/:id" element={<EditBlog />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
