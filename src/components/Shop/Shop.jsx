import React from 'react';
import './Shop.css';
import shopSustainableImage from '../../assets/shop-section-girl.jpg';
import shopLuxuryImage from '../../assets/shop-section-man.jpg';

const Shop = () => {
  return (
    <section className="shop-container">
      <div className="shop-header">
        <h1>Shop Luxury & Sustainable Fashion</h1>
        <p>E-commerce platform where users can purchase luxury and sustainable goods on discounted prices</p>
      </div>
      
      <div className="shop-cards">
        <div className="shop-card">
          <div className="card-text">
            <h2>Sustainable</h2>
            <p>Sustainability in fashion focuses on minimizing the industry's environmental impact while promoting ethical practices.</p>
            <button className="coming-soon-btn">Coming Soon</button>
          </div>
          <div className="shop-card-image">
            <img src={shopSustainableImage} alt="Sustainable Fashion" />
          </div>
        </div>

        <div className="shop-card">
          <div className="card-text">
            <h2>LUXURY</h2>
            <p>Luxury is a highly subjective concept that transcends material wealth. It's about living life on one's own terms.</p>
            <button className="coming-soon-btn">Coming Soon</button>
          </div>
          <div className="shop-card-image">
            <img src={shopLuxuryImage} alt="Luxury Fashion" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Shop; 