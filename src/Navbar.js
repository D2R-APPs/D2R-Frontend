import React from 'react';
import { useNavigate, Link } from 'react-router-dom';
import './Navbar.css';

const Navbar = ({ isAuthenticated, onLogout }) => {
  const navigate = useNavigate();

  const handleLogoutClick = () => {
    if (onLogout) {
      onLogout();
    }
    navigate('/');
  };

  return (
    <nav className="navbar">
      <div className="navbar-left">
        <Link to="/" className="navbar-logo">D2R</Link>
      </div>
      <div className="navbar-right">
        <Link to="/" className="nav-link">Home</Link>
        
        {isAuthenticated ? (
          <button onClick={handleLogoutClick} className="logout-button">Logout</button>
        ) : (
          <>
            <Link to="/login" className="login-button">Login</Link>
            <Link to="/register" className="login-button">Register</Link>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;