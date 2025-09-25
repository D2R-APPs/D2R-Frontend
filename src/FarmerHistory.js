import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Dashboard.css';

const FarmerHistory = () => {
  const [listings, setListings] = useState([]);

  useEffect(() => {
    const fetchHistory = async () => {
      const token = localStorage.getItem('token');
      try {
        const res = await axios.get('http://YOUR_BACKEND_URL.onrender.com/api/inventory/history', {
          headers: { 'x-auth-token': token },
        });
        setListings(res.data);
      } catch (err) {
        console.error(err.response.data);
        alert('Failed to fetch history.');
      }
    };

    fetchHistory();
  }, []);

  return (
    <div className="dashboard-container">
      <h2>Your Inventory History</h2>
      <div className="dashboard-card">
        {listings.length > 0 ? (
          <ul>
            {listings.map((item) => (
              <li key={item._id} className="listing-card">
                <h4>{item.name}</h4>
                <p>Quantity: {item.quantity}</p>
                <p>Price: ${item.pricePerUnit}</p>
                <p>Posted: {new Date(item.dateAdded).toLocaleDateString()}</p>
              </li>
            ))}
          </ul>
        ) : (
          <p>You have not added any listings yet.</p>
        )}
      </div>
    </div>
  );
};

export default FarmerHistory;
