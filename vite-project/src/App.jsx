import { Routes, Route } from 'react-router-dom'
import './App.css'
import Navbar from './components/Navbar.jsx'
import Home from './pages/Home.jsx'
import StockDetail from './pages/StockDetail.jsx'
import MarketOverview from './pages/MarketOverview.jsx'
import Portfolio from './pages/Portfolio.jsx'

function App() {
  return (
    <div className="min-h-screen bg-neutral-950 text-neutral-200">
      <Navbar />
      <main className="container-responsive py-8 sm:py-10">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/stock/:symbol" element={<StockDetail />} />
          <Route path="/market" element={<MarketOverview />} />
          <Route path="/portfolio" element={<Portfolio />} />
        </Routes>
      </main>
    </div>
  )
}

export default App
