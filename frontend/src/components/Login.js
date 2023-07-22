import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import ChangePassword from './ChangePassword';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showChangePassword, setShowChangePassword] = useState(false);
  const history = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    localStorage.setItem('username', email);
    try {
      const response = await axios.post('http://localhost:8000/login', {
        email,
        password,
      });

      console.log(response.data);

      const token = response.data.token;

      // Store the token in localStorage
      localStorage.setItem('token', token);
      // Redirect to the dashboard or home page on successful login
      history('/products');
    } catch (error) {
      console.error(error);
    }
  };

  const handleShowChangePassword = () => {
    setShowChangePassword(true);
  };

  const handleLogout = () => {
    // Remove the authentication token from local storage
    localStorage.removeItem('token');
    // Redirect to the login page or any other page after logout
    history('/login');
  };

  return (
    <div className='form'>
      <h1>Login</h1>
      <form onSubmit={handleSubmit}>
        <label>Email:</label>
        <input
          type="text"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <label>Password:</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit">Login</button>
      </form>

      <div>
        <button onClick={handleShowChangePassword}>Change Password</button>
        <button onClick={handleLogout}>Logout</button>
      </div>

      {showChangePassword && <ChangePassword />}
    </div>
  );
}

export default Login;

