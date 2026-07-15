import React from 'react';

export default function OrderCard({
  platform,
  title,
  username,
  platformText,
  price,
  badges = [],
  date
}) {
  // Platform icon renderer
  const renderPlatformIcon = () => {
    if (platform === 'youtube') {
      return (
        <svg viewBox="0 0 24 24" width="26" height="26" fill="#FF0000">
          <path d="M23.498 6.163a3.003 3.003 0 0 0-2.11-2.11C19.518 3.545 12 3.545 12 3.545s-7.518 0-9.388.507a3.003 3.003 0 0 0-2.11 2.11C0 8.033 0 12 0 12s0 3.967.502 5.837a3.003 3.003 0 0 0 2.11 2.11c1.87.507 9.388.507 9.388.507s7.518 0 9.388-.507a3.003 3.003 0 0 0 2.11-2.11C24 15.967 24 12 24 12s0-3.967-.502-5.837zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
        </svg>
      );
    } else if (platform === 'instagram') {
      return (
        <svg viewBox="0 0 24 24" width="26" height="26">
          <defs>
            <radialGradient id="ig-grad" cx="30%" cy="107%" r="130%">
              <stop offset="0%" stopColor="#fdf497" />
              <stop offset="5%" stopColor="#fdf497" />
              <stop offset="45%" stopColor="#fd5949" />
              <stop offset="60%" stopColor="#d6249f" />
              <stop offset="90%" stopColor="#285AEB" />
            </radialGradient>
          </defs>
          <path fill="url(#ig-grad)" d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.051.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324zM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm6.406-11.845a1.44 1.44 0 1 0 0 2.881 1.44 1.44 0 0 0 0-2.881z" />
        </svg>
      );
    }
    return null;
  };

  return (
    <div className="card">
      <div className="card-left">
        {/* Platform icon on desktop */}
        <div className="platform-icon-container">
          {renderPlatformIcon()}
        </div>

        {/* Info Area */}
        <div className="card-info">
          <h2 className="card-title">{title}</h2>
          
          {/* Mobile Price Section (displayed inside card-info grid on mobile) */}
          <div className="mobile-price-section">
            <span className="mobile-price-amount">{price}</span>
            <span className="mobile-price-currency">USD</span>
          </div>

          <div className="card-subtitle">
            {username} &bull; {platformText}
          </div>

          {badges.length > 0 && (
            <div className="card-badges">
              {badges.map((badge, idx) => {
                if (badge.type === 'verified') {
                  return (
                    <div key={idx} className="badge badge-verified">
                      <svg className="badge-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                        <circle cx="12" cy="12" r="10"></circle>
                        <polyline points="9 11 12 14 16 9"></polyline>
                      </svg>
                      {badge.label}
                    </div>
                  );
                }
                if (badge.type === 'monetized') {
                  return (
                    <div key={idx} className="badge badge-monetized">
                      <svg className="badge-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                        <circle cx="12" cy="12" r="10"></circle>
                        <line x1="12" y1="8" x2="12" y2="16"></line>
                        <path d="M16 9a2 2 0 0 0-2-2h-3.5a2 2 0 0 0 0 4h3a2 2 0 0 1 0 4H10a2 2 0 0 1-2-2"></path>
                      </svg>
                      {badge.label}
                    </div>
                  );
                }
                return null;
              })}
            </div>
          )}
        </div>
      </div>

      <div className="card-right">
        {/* Desktop Price Section */}
        <div className="price-section desktop-price-section">
          <div className="price-amount">{price}</div>
          <div className="price-currency">USD</div>
        </div>

        {/* Action Button & Date */}
        <div className="action-section">
          <button className="view-creds-btn">
            <svg className="view-creds-btn-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="6 9 12 15 18 9"></polyline>
            </svg>
            View Credentials
          </button>
          <span className="purchase-date">{date}</span>
        </div>
      </div>
    </div>
  );
}
