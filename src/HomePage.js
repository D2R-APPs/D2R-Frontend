import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './HomePage.css';
import './Footer.css'; 

const HomePage = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const animatedElements = document.querySelectorAll('.animate-on-scroll');
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1 });
    animatedElements.forEach(el => observer.observe(el));

    const counters = document.querySelectorAll('.counter');
    const speed = 200;

    counters.forEach(counter => {
      const updateCount = () => {
        const target = +counter.getAttribute('data-target');
        const count = +counter.innerText.replace('%', '');
        const increment = target / speed;

        if (count < target) {
          counter.innerText = `${Math.ceil(count + increment)}%`;
          setTimeout(updateCount, 15);
        } else {
          counter.innerText = `${target}%`;
        }
      };

      const counterObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            updateCount();
            counterObserver.unobserve(entry.target);
          }
        });
      }, { threshold: 0.5 });
      counterObserver.observe(counter);
    });
  }, []);

  return (
    <div className="homepage-container">
      {/* Hero Section */}
      <section className="hero-section">
        <div className="floating-icon icon-apple animate-on-scroll">🍎</div>
        <div className="floating-icon icon-carrot animate-on-scroll">🥕</div>
        <div className="floating-icon icon-leaf animate-on-scroll">🌿</div>
        <div className="floating-icon icon-utensils animate-on-scroll">🍽️</div>
        <div className="floating-icon icon-corn animate-on-scroll">🌽</div>
    
        <div className="floating-icon icon-tractor animate-on-scroll">🚜</div>
        <div className="floating-icon icon-onion animate-on-scroll">🧅</div>
        <div className="floating-icon icon-farm animate-on-scroll">🌾</div>
        <div className="floating-icon icon-chicken animate-on-scroll">🐔</div>
    
        <div className="floating-icon icon-eggplant animate-on-scroll">🍆</div>
        <div className="floating-icon icon-cow animate-on-scroll">🐄</div>
        <div className="floating-icon icon-sunflower animate-on-scroll">🌻</div>
        <div className="floating-icon icon-radish animate-on-scroll">🥬</div>


        <div className="hero-content animate-on-scroll">
          <h1 className="main-heading">Fresh from the Farm, Direct to Your Plate</h1>
          <p className="sub-heading">
            Connecting local farmers directly with restaurants for a sustainable food ecosystem
          </p>
          <div className="hero-buttons">
            <button className="btn-farmer" onClick={() => navigate('/register')}>Join as Farmer</button>
            <button className="btn-restaurant" onClick={() => navigate('/register')}>Join as Restaurant</button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="features-section">
        <h2 className="section-title animate-on-scroll">Our Platform Features</h2>
        <div className="features-grid">
          <div className="feature-card animate-on-scroll">
            <div className="card-icon">🛒</div>
            <h3>Marketplace</h3>
            <p>Direct connection between farmers and restaurants for seamless transactions.</p>
          </div>
          <div className="feature-card animate-on-scroll delay-1">
            <div className="card-icon">🗺️</div>
            <h3>Geo-Mapping</h3>
            <p>Locate nearby farms and restaurants with our intelligent mapping system.</p>
          </div>
          <div className="feature-card animate-on-scroll delay-2">
            <div className="card-icon">📦</div>
            <h3>Inventory</h3>
            <p>Real-time inventory management for farmers and order tracking for restaurants.</p>
          </div>
          <div className="feature-card animate-on-scroll delay-3">
            <div className="card-icon">👁️‍🗨️</div>
            <h3>Transparency</h3>
            <p>Complete supply chain transparency from farm to restaurant table.</p>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="how-it-works-section">
        <h2 className="section-title animate-on-scroll">How It Works</h2>
        <div className="how-it-works-steps">
          <div className="step-card animate-on-scroll">
            <div className="step-number">1</div>
            <h3>Farmer Lists Produce</h3>
            <p>Farmers upload their fresh produce with details and pricing.</p>
          </div>
          <div className="step-arrow animate-on-scroll">→</div>
          <div className="step-card animate-on-scroll">
            <div className="step-number">2</div>
            <h3>Restaurant Browses</h3>
            <p>Restaurants explore available produce and place orders directly.</p>
          </div>
          <div className="step-arrow animate-on-scroll">→</div>
          <div className="step-card animate-on-scroll">
            <div className="step-number">3</div>
            <h3>Order & Delivery</h3>
            <p>Orders are processed and delivered fresh to the restaurant's door.</p>
          </div>
        </div>
      </section>

      {/* Impact Section */}
      <section className="impact-section">
        <h2 className="section-title animate-on-scroll">Our Impact</h2>
        <div className="impact-grid">
          <div className="impact-card animate-on-scroll">
            <div className="impact-icon">👨‍🌾</div>
            <h3>Farmers</h3>
            <div className="counter" data-target="25">0%</div>
            <p>Increase in farmer income</p>
          </div>
          <div className="impact-card animate-on-scroll delay-1">
            <div className="impact-icon">🍽️</div>
            <h3>Restaurants</h3>
            <div className="counter" data-target="30">0%</div>
            <p>Cost savings on fresh produce</p>
          </div>
          <div className="impact-card animate-on-scroll delay-2">
            <div className="impact-icon">🌍</div>
            <h3>Community</h3>
            <div className="counter" data-target="40">0%</div>
            <p>Reduction in food waste</p>
          </div>
        </div>
      </section>

      {/* Vision Section */}
      <section className="vision-section">
        <div className="vision-content">
          <h2 className="typewriter-text animate-on-scroll">
            "Swadeshi for Atmanirbhar Bharat – Building a resilient, transparent, and sustainable food supply chain."
          </h2>
        </div>
      </section>

      {/* Call to Action Footer */}
      <footer className="footer-container">
        <div className="cta-section">
          <h2 className="footer-cta-title">Ready to Transform the Food Supply Chain?</h2>
          <p>Join thousands of farmers and restaurants already benefiting from our platform.</p>
          <button className="cta-button" onClick={() => navigate('/register')}>Join the Movement →</button>
        </div>
        <div className="footer-content">
          <div className="footer-column">
            <h3>About D2R</h3>
            <p>D2R is a platform connecting local farmers directly with restaurants to create a more efficient and sustainable food supply chain.</p>
          </div>
          {/* Quick Links column has been removed here */}
          <div className="footer-column">
            <h3>Contact Us</h3>
            <p>Email: <a href="mailto:farmtorestaurant20@gmail.com">farmtorestaurant20@gmail.com</a></p>
            <p>Phone: +91 7989407709</p>
          </div>
        </div>
        <div className="footer-bottom">
          <p>&copy; 2025 D2R. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default HomePage;
