import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Dashboard.css'; // Import new CSS

const FarmerDashboard = () => {
  const [listing, setListing] = useState({
    name: '',
    quantity: '',
    unit: 'kg',
    pricePerUnit: '',
    qualityGrade: 'Surplus',
    availableUntil: '',
  });

  useEffect(() => {
    const animatedElements = document.querySelectorAll('.dashboard-card');
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1 });
    animatedElements.forEach(el => observer.observe(el));
  }, []);

  const handlePostListing = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token');
      await axios.post('https://d2r-backend-83gd.onrender.com/api/inventory', listing, {
        headers: { 'x-auth-token': token },
      });
      alert('Listing posted successfully!');
      setListing({
        name: '', quantity: '', unit: 'kg', pricePerUnit: '', qualityGrade: 'Surplus', availableUntil: '',
      });
    } catch (err) {
      alert('Failed to post listing. Please ensure you are logged in as a farmer.');
    }
  };

  return (
    <div className="dashboard-container">
      <h2>Farmer Dashboard</h2>
      <div className="dashboard-card" style={{ opacity: 0 }}>
        <h3>Create New Listing</h3>
        <form onSubmit={handlePostListing}>
          <input type="text" placeholder="Item Name" value={listing.name} onChange={(e) => setListing({ ...listing, name: e.target.value })} required />
          <input type="number" placeholder="Quantity" value={listing.quantity} onChange={(e) => setListing({ ...listing, quantity: e.target.value })} required />
          <select value={listing.unit} onChange={(e) => setListing({ ...listing, unit: e.target.value })}>
            <option value="kg">kg</option>
            <option value="lbs">lbs</option>
          </select>
          <input type="number" placeholder="Price Per Unit (Rs)" value={listing.pricePerUnit} onChange={(e) => setListing({ ...listing, pricePerUnit: e.target.value })} required />
          <select value={listing.qualityGrade} onChange={(e) => setListing({ ...listing, qualityGrade: e.target.value })}>
            <option value="Surplus">Surplus</option>
            <option value="Imperfect">Imperfect</option>
          </select>
          <input type="datetime-local" value={listing.availableUntil} onChange={(e) => setListing({ ...listing, availableUntil: e.target.value })} required />
          <button type="submit">Post Listing</button>
        </form>
      </div>
    </div>
  );
};

export default FarmerDashboard;
