import { Routes, Route, useLocation } from 'react-router-dom'
import NavBar from './components/NavBar'
import LandingPage from './components/Landing'
import Footer from './components/Footer'

import MarketplacePage from './pages/Marketplace'
import ListingDetailsPage from './pages/ListingDetails'
import MessagesPage from './pages/Messages'
import SellPage from './pages/Sell'
import DashboardPage from './pages/Dashboard'

function App() {
  const location = useLocation();
  const hideNavAndFooter = location.pathname.startsWith('/dashboard');

  return (
    <div className="min-h-screen flex flex-col">
      {!hideNavAndFooter && <NavBar />}
      <main className={`flex-1 ${!hideNavAndFooter ? "pt-[72px] lg:pt-[88px]" : ""}`}>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/marketplace" element={<MarketplacePage />} />
          <Route path="/marketplace/:id" element={<ListingDetailsPage />} />
          <Route path="/messages" element={<MessagesPage />} />
          <Route path="/sell" element={<SellPage />} />
          <Route path="/dashboard" element={<DashboardPage />} />
        </Routes>
      </main>
      {!hideNavAndFooter && <Footer />}
    </div>
  )
}

export default App;
