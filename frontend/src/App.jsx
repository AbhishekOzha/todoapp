import  { useEffect,useState } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Login from './Components/login.jsx';
import Navbar from './Components/sidebar.jsx';
import Signup from './Components/signup';
import TodoApp from './Components/todo/home.jsx';
import Today from './Components/todo/today.jsx';
import Upcoming from './Components/todo/upcoming.jsx';
import './index.css';
import axios from 'axios';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  useEffect(() => {
    const checkAuthentication = () => {
      const accessToken = localStorage.getItem('access_token');

      if (accessToken) {
        setIsLoggedIn(true);
      }
    };

    checkAuthentication();
  }, []);
  const handleLogin = () => {
    setIsLoggedIn(true);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
  };

  return (
    <BrowserRouter>
      <div style={{ display: 'flex' }}>
      {isLoggedIn && <Navbar isLoggedIn={isLoggedIn} handleLogout={handleLogout} />}

        <Routes>
          <Route path="/signup" element={<Signup />} />

           <Route path="/" element={isLoggedIn ? <Today /> : <Login onLogin={handleLogin} />} />
          <Route path="login" element={<Login onLogin={handleLogin} />} />
          <Route path="/today" element={isLoggedIn ? <Today /> : <Login onLogin={handleLogin} />} />
          <Route path="/home" element={isLoggedIn ? <TodoApp /> : <Login onLogin={handleLogin} />} />
          <Route path="/upcoming" element={isLoggedIn ? <Upcoming /> : <Login onLogin={handleLogin} />} />
      
        </Routes>
      </div>
    </BrowserRouter>
  );
}
export default App;
