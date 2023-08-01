import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from "react-router-dom";

function Register() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [dob, setDob] = useState('');
  const [image, setImage] = useState("");
  const [preview, setPreview] = useState("");
  const [password, setPassword] = useState('');

  useEffect(() => {
    if (image) {
      setPreview(URL.createObjectURL(image))
    }
  }, [image])

  const handleRegister = async (e) => {
    e.preventDefault();

    // Perform field validations
    if (!name || !email || !phone || !dob || !password) {
      alert('All fields are required');
      return;
    }

    try {
      const formData = new FormData();
      formData.append('name', name);
      formData.append('email', email);
      formData.append('phone', phone);
      formData.append('dob', dob);
      formData.append('password', password);
      formData.append('profileImage', image);

      await axios.post('http://localhost:8000/register', formData);

      // Redirect to login page or show a success message
      window.location = '/login';
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className='signup_container'>
      <div className='signup_form_container'>
        <div className='left'>
          <h1>Welcome Back</h1>
          <Link to="/login">
            <button type="button" className='white_btn'>
              Sign in
            </button>
          </Link>
        </div>

        <div className='right'>
          <form className="form_container" onSubmit={handleRegister}>
            <h2>Register</h2>

            <div className="profile_div">
              <img src={preview ? preview : "/man.png"} alt="img" />
            </div>

            <label>
              Name:
              <input type="text" value={name} onChange={(e) => setName(e.target.value)} />
            </label>

            <label>
              Email:
              <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
            </label>

            <label>
              Phone:
              <input type="text" value={phone} onChange={(e) => setPhone(e.target.value)} />
            </label>

            <label>
              DOB:
              <input type="date" value={dob} onChange={(e) => setDob(e.target.value)} />
            </label>

            <label>
              Image:
              <input type="file" onChange={(e) => setImage(e.target.files[0])} />
            </label>

            <label>
              Password:
              <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
            </label>

            <button className="green_btn" type="submit">Register</button>
          </form>
        </div>
      </div>
    </div>
  )
}

export default Register;

