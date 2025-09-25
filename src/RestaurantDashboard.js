import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Dashboard.css';

const RestaurantDashboard = () => {
    const [listings, setListings] = useState([]);

    const fetchListings = async () => {
        try {
            const res = await axios.get('http://d2r-backend-83gdonrender.com/api/inventory');
            setListings(res.data);
            
            // Add a temporary animation fix after fetching data
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

    useEffect(() => {
        fetchListings(); // Fetch listings on initial load
    }, []);

    return (
        <div className="dashboard-container">
            <h2>Restaurant Dashboard</h2>
            <div className="dashboard-card">
                <h3>Available Listings</h3>
                <button onClick={fetchListings} style={{ marginBottom: '1rem', padding: '0.5rem 1rem', backgroundColor: '#3498db', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer' }}>Refresh Listings</button>
                {listings.length > 0 ? (
                    <ul>
                        {listings.map((item, index) => (
                            <li key={item._id} className="listing-card" style={{ animationDelay: `${index * 0.1}s` }}>
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
