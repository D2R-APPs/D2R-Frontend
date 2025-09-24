import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Dashboard.css'; // Import new CSS

const RestaurantDashboard = () => {
  const [listings, setListings] = useState([]);

  useEffect(() => {
    const fetchListings = async () => {
      try {
        const res = await axios.get('http://localhost:5000/api/inventory');
        setListings(res.data);
        
        // This is a simple trick to ensure animations run after data is fetched
        setTimeout(() => {
          const animatedElements = document.querySelectorAll('.listing-card');
          const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
              if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
              }
            });
          }, { threshold: 0.1 });
          animatedElements.forEach(el => observer.observe(el));
        }, 100);

      } catch (err) {
        alert('Failed to fetch listings.');
      }
    };
    fetchListings();
  }, []);

  return (
    <div className="dashboard-container">
      <h2>Restaurant Dashboard</h2>
      <div className="dashboard-card">
        <h3>Available Listings</h3>
        {listings.length > 0 ? (
          <ul>
            {listings.map((item, index) => (
              <li key={item._id} className="listing-card" style={{ animationDelay: `${index * 0.1}s`, opacity: 0 }}>
                <h4>{item.name}</h4>
                <p>Quantity: {item.quantity} {item.unit}</p>
                <p>Price: ${item.pricePerUnit} per {item.unit}</p>
                <p>Quality: {item.qualityGrade}</p>
                <p>Available Until: {new Date(item.availableUntil).toLocaleDateString()}</p>
              </li>
            ))}
          </ul>
        ) : (
          <p>No listings available at the moment.</p>
        )}
      </div>
    </div>
  );
};

export default RestaurantDashboard;