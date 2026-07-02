import { useState } from 'react'
import { Routes, Route } from 'react-router-dom'
import NavBar from './components/NavBar'
import LandingPage from './components/Landing'
import Footer from './components/Footer'

function App() {
  return (
    <div className="min-h-screen">
      <NavBar />
      <main className="pt-[72px] lg:pt-[88px]">
        <Routes>
          <Route path="/" element={<LandingPage />} />
        </Routes>
      </main>
      <Footer />
    </div>
  )
}

export default App
