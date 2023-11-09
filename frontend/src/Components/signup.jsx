import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Signup() {
  const navigate = useNavigate();
  const [userData, setUserData] = useState({
    username: '',
    password1: '',
    password2: '',
    mobile: '',
    email: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData({ ...userData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
      const response = await axios.post('http://localhost:7000/api/signup/', {
        username: userData.username,
        password1: userData.password1,
        password2: userData.password2,
        mobile: userData.mobile,
        email: userData.email,
        action: 'signup',
      });
      if (response.data.message === 'Signup successful') {
        navigate('/login');
      }
  };

  return (
    <div>
      <h1>Sign Up</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Username:
          <input
            type="text"
            name="username"
            value={userData.username}
            onChange={handleChange}
          />
        </label>
        <br />
        <label>
          Password:
          <input
            type="password"
            name="password1"
            value={userData.password1}
            onChange={handleChange}
          />
        </label>
        <br />
        <label>
          Confirm Password:
          <input
            type="password"
            name="password2"
            value={userData.password2}
            onChange={handleChange}
          />
        </label>
        <br />
        <label>
          Mobile Number:
          <input
            type="text"
            name="mobile"
            value={userData.mobile}
            onChange={handleChange}
          />
        </label>
        <br />
        <label>
          Email:
          <input
            type="email"
            name="email"
            value={userData.email}
            onChange={handleChange}
          />
        </label>
        <br />
        <button type="submit">Sign Up</button>
      </form>
    </div>
  );
}

export default Signup;
