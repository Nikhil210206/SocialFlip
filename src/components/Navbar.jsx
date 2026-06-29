import React, { useState } from 'react';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="header">
      <div className="header-container">
        <a href="#" className="logo">
          <span className="logo-flip">flip</span>
          <span>earn</span>
          <span className="logo-dot">.</span>
        </a>

        <nav className="nav-links">
          <a href="#" className="nav-link">Home</a>
          <a href="#" className="nav-link">Marketplace</a>
          <a href="#" className="nav-link">Messages</a>
          <a href="#" className="nav-link">My Listings</a>
        </nav>

        <button className="login-btn">Login</button>

        <button className="hamburger-btn" onClick={() => setIsOpen(!isOpen)} aria-label="Toggle menu">
          {isOpen ? (
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
          ) : (
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <line x1="3" y1="12" x2="21" y2="12"></line>
              <line x1="3" y1="6" x2="21" y2="6"></line>
              <line x1="3" y1="18" x2="21" y2="18"></line>
            </svg>
          )}
        </button>
      </div>

      {/* Mobile dropdown menu */}
      <div className={`mobile-menu ${isOpen ? 'open' : ''}`}>
        <a href="#" className="nav-link" onClick={() => setIsOpen(false)}>Home</a>
        <a href="#" className="nav-link" onClick={() => setIsOpen(false)}>Marketplace</a>
        <a href="#" className="nav-link" onClick={() => setIsOpen(false)}>Messages</a>
        <a href="#" className="nav-link" onClick={() => setIsOpen(false)}>My Listings</a>
        <button className="login-btn" onClick={() => setIsOpen(false)}>Login</button>
      </div>
    </header>
  );
}
