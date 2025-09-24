import React, { useState, useEffect } from 'react';
import axios from 'axios';

const InventoryFeed = () => {
  const [listings, setListings] = useState([]);
  const [loading, setLoading] = useState(true);
  const API_URL = 'http://localhost:5000/api/inventory';

  useEffect(() => {
    const fetchListings = async () => {
      try {
        const res = await axios.get(API_URL);
        setListings(res.data);
      } catch (error) {
        console.error('Error fetching inventory:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchListings();
  }, []);

  if (loading) return <h2>Loading local surplus...</h2>;
  if (listings.length === 0) return <h2>No surplus available nearby today.</h2>;

  return (
    <div className="inventory-feed">
      <h1>Local Surplus for Restaurants</h1>
      {listings.map((item) => (
        <div key={item._id} className="listing-card" style={{border: '1px solid #ccc', margin: '10px', padding: '10px'}}>
          <h3>{item.name}</h3>
          <p>
            **Quantity:** {item.quantity} {item.unit} | **Grade:** {item.qualityGrade}
          </p>
          <p>
            **Price:** ${item.pricePerUnit} per {item.unit}
          </p>
          <p>
            **Available Until:** {new Date(item.availableUntil).toLocaleDateString()}
          </p>
          <button>Buy Now</button>
        </div>
      ))}
    </div>
  );
};

export default InventoryFeed;