// src/Navbar.js
import React from 'react';
import './Navbar.css'; // Import the CSS for styling

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="navbar-content">
        <div className="navbar-title"></div>
        <div className="navbar-info">
          <div className="scrolling-text">
            Here you get information of the country about their capital, population, currency, official languages.
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;