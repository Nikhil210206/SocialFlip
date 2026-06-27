import { useState } from 'react'
import NavBar from './components/NavBar'
import LandingPage from './components/Landing'
import Footer from './components/Footer'

function App() {
  return (
    <div className="min-h-screen">
      <NavBar />
      <main className="pt-[72px] lg:pt-[88px]">
        <LandingPage />
      </main>
      <Footer />
    </div>
  )
}

export default App
