import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const history = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    localStorage.setItem('email', email);
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
      history('/home');
    } catch (error) {
      console.error(error);
      if (error.response && error.response.data && error.response.data.message) {
        setErrorMessage(error.response.data.message);
      } else {
        setErrorMessage('An error occurred during login. Please try again.');
      }
    }
  };

  return (
    <div className='login_container'>
      <div className='login_form_container'>
        <div className='left-side'>
          <form className='form_container' onSubmit={handleSubmit}>
            <h1>Login</h1>
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
            {errorMessage && <p className="error-message">{errorMessage}</p>}

            <button className='green_btn' type="submit">Login</button>
          </form>

          <div>
            <Link to="/change-pass"> <button className='green_btn'>Change Password</button>   </Link>
          </div>
        </div>

        <div className='right-side'>
          <h1>New Here ?</h1>
          <Link to="/">
            <button type="button" className='white_btn'>
              Sign Up
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Login;
