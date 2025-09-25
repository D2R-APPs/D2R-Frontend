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

  const handleHomeClick = () => {
    if (isAuthenticated) {
      onLogout();
    }
    navigate('/');
  };

  return (
    <nav className="navbar">
      <div className="navbar-left">
        <Link to="/" onClick={handleHomeClick} className="navbar-logo">D2R</Link>
      </div>
      <div className="navbar-right">
        {/* The Home link will now handle the logout logic */}
        <Link to="/" onClick={handleHomeClick} className="nav-link">Home</Link>
        
        {/* Only show Logout button if authenticated */}
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
