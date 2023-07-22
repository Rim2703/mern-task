import React, { useState } from 'react';
import axios from 'axios';

function Register() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [dob, setDob] = useState('');
  const [password, setPassword] = useState('');

  const handleRegister = async (e) => {
    e.preventDefault();

    // Perform field validations
    if (!name || !email || !phone || !dob || !password) {
      alert('All fields are required');
      return;
    }

    try {
      await axios.post('http://localhost:8000/register', {
        name,
        email,
        phone,
        dob,
        password,
      });

      // Redirect to login page or show a success message
      window.location = '/login';
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className='form'>
      <h2>Register</h2>
      <form onSubmit={handleRegister}>
        <div className="form-control">
          <label>
            Name:
            <input type="text" value={name} onChange={(e) => setName(e.target.value)} />
          </label>
        </div>
        <div className="form-control">
          <label>
            Email:
            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
          </label>
        </div>
        <div className="form-control">
          <label>
            Phone:
            <input type="text" value={phone} onChange={(e) => setPhone(e.target.value)} />
          </label>
        </div>
        <div className="form-control">
          <label>
            Date of Birth:
            <input type="date" value={dob} onChange={(e) => setDob(e.target.value)} />
          </label>
        </div>
        <div className="form-control">
          <label>
            Password:
            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
          </label>
        </div>
        <button type="submit">Register</button>
      </form>
    </div>
  );
}

export default Register;

