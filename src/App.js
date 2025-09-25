import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useNavigate } from 'react-router-dom';
import LoginPage from './LoginPage';
import RegisterPage from './RegisterPage';
import FarmerDashboard from './FarmerDashboard';
import RestaurantDashboard from './RestaurantDashboard';
import HomePage from './HomePage';
import Navbar from './Navbar';
import './App.css';
import FarmerHistory from './FarmerHistory';
const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userRole, setUserRole] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem('token');
    const role = localStorage.getItem('userRole');
    if (token && role) {
      setIsAuthenticated(true);
      setUserRole(role);
    } else {
      setIsAuthenticated(false);
      setUserRole(null);
    }
  }, []);

  const handleLoginSuccess = (role) => {
    setIsAuthenticated(true);
    setUserRole(role);
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('userRole');
    setIsAuthenticated(false);
    setUserRole(null);
  };

  return (
    <Router>
      <Navbar isAuthenticated={isAuthenticated} onLogout={handleLogout} />
      <div className="App-container">
        <Routes>
          {/* This route will log out the user automatically */}
          <Route path="/" element={<HomePage onHomeClick={() => handleLogout()} />} />

          <Route path="/login" element={<LoginPage onLoginSuccess={handleLoginSuccess} />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/farmer-dashboard/history" element={
    isAuthenticated && userRole === 'farmer' ? (
        <FarmerHistory />
    ) : (
        <Navigate to="/login" />
    )
} />
          <Route path="/farmer-dashboard" element={
            isAuthenticated && userRole === 'farmer' ? (
              <FarmerDashboard />
            ) : (
              <Navigate to="/login" />
            )
          } />
          <Route path="/restaurant-dashboard" element={
            isAuthenticated && userRole === 'restaurant' ? (
              <RestaurantDashboard />
            ) : (
              <Navigate to="/login" />
            )
          } />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
