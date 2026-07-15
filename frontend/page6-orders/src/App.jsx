import React from 'react';
import Navbar from './components/Navbar';
import OrderCard from './components/OrderCard';

function App() {
  const orders = [
    {
      platform: 'youtube',
      title: 'Tech YouTube Channel with 120k Subscribers',
      username: '@TechSavvyAlex',
      platformText: 'Youtube',
      price: '$2,500',
      badges: [
        { type: 'verified', label: 'Verified' },
        { type: 'monetized', label: 'Monetized' }
      ],
      date: 'Credential Purchased: Nov 7, 2025'
    },
    {
      platform: 'instagram',
      title: 'Travel Instagram Page with 50k Followers',
      username: '@wanderlust.sophia',
      platformText: 'Instagram',
      price: '$2,500',
      badges: [],
      date: 'Credential Purchased: Nov 10, 2025'
    }
  ];

  return (
    <div className="app-container">
      <Navbar />
      
      <main className="main-content">
        <h1 className="page-title">My Orders</h1>
        
        <div className="cards-list">
          {orders.map((order, index) => (
            <OrderCard key={index} {...order} />
          ))}
        </div>
      </main>
    </div>
  );
}

export default App;
