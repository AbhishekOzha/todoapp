import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function Login(props) {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');



  const handleLogin = async () => {
  
      const response = await axios.post('http://localhost:7000/api/login/', {
        username: username,
        password: password,
        action: 'login',
      });

      if (response.data.message === 'Login successful') {
        const accessToken = response.data.access_token;
        const refreshToken = response.data.refresh_token;
        axios.defaults.headers.common['Authorization'] = `Bearer ${accessToken}`;
        props.onLogin(); 
        localStorage.setItem('access_token', accessToken);
        localStorage.setItem('refresh_token', refreshToken);
        navigate('/today');
      } 
    
  };

  return (
    <div>
      <h1>Login</h1>
      <div>
        <label>
          Username:
          <input
            type="text"
            name="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </label>
      </div>
      <div>
        <label>
          Password:
          <input
            type="password"
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </label>
      </div>
      <div>
        <button onClick={handleLogin}>Login</button>
      </div>
      <div>
        <button onClick={() => navigate('/signup')}>Sign Up</button>
      </div>
    
    </div>
  );
}

export default Login;
