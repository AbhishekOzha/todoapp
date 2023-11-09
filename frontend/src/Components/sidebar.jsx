import HomeIcon from '@mui/icons-material/Home';
import SearchIcon from '@mui/icons-material/Search';
import TodayIcon from '@mui/icons-material/Today';
import AddIcon from '@mui/icons-material/Add';
import Button from '@mui/material/Button';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const iconStyle = {
  fontSize: '24px',
};

const Navbar = ({ isLoggedIn, handleLogout }) => {
  const navigate = useNavigate();
  const handleLogoutClick = async () => {
    try {
      // Revoke the token on the server
      await axios.post("http://localhost:7000/api/token/revoke/", {
        refresh: localStorage.getItem('refresh_token')
      });
    } catch (error) {
      // Handle error if the server request fails
      console.error('Error revoking token:', error);
    } finally {
      // Clear tokens from local storage
      localStorage.removeItem('access_token');
      localStorage.removeItem('refresh_token');
      
      // Update the state to indicate user logout
      handleLogout();

      // Redirect to the login page
      navigate('/login');
    }
  };


  return (
    <div className="sidebar">
     {isLoggedIn && (
        <Button variant="contained" color="primary" style={{ marginTop: '20px' }}  onClick={handleLogoutClick}>
           <ExitToAppIcon style={{ marginRight: '8px' }} />
          Logout
        </Button>
      )}

{isLoggedIn && (
        <ul>
          <li>
            <HomeIcon style={iconStyle} />
            <Link to="/home">Home</Link>
          </li>
          <li>
            <SearchIcon style={iconStyle} />
            <a href="#">Search</a>
          </li>
          <li>
            <TodayIcon style={iconStyle} />
            <Link to="/today">Today</Link>
          </li>
          <li>
            <AddIcon style={iconStyle} />
            <Link to="/upcoming">Upcoming</Link>
          </li>
        </ul>
      )}
    </div>
  );
};

export default Navbar;
