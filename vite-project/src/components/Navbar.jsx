import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

function Navbar() {
  const navigate = useNavigate()
  const [query, setQuery] = useState('')

  function onSubmit(e) {
    e.preventDefault()
    const trimmed = query.trim()
    if (!trimmed) return
    navigate(`/stock/${encodeURIComponent(trimmed.toUpperCase())}`)
    setQuery('')
  }

  return (
    <header className="min-h-screen bg-neutral-950/95 border-b border-neutral-900 flex flex-col">
      {/* Top nav bar */}
      <div className="container-responsive py-3 sm:py-4 flex items-center gap-4">
        <Link to="/" className="text-xl font-semibold tracking-wide">
          <span className="accent-gold">股</span>價觀測
        </Link>
        <nav className="ml-2 hidden sm:flex items-center gap-4 text-sm">
          <Link to="/" className="hover:text-yellow-400">首頁</Link>
          <Link to="/stock/2330.TW" className="hover:text-yellow-400">個股查詢</Link>
          <Link to="/market" className="hover:text-yellow-400">市場總覽</Link>
          <Link to="/portfolio" className="hover:text-yellow-400">投資組合</Link>
        </nav>
      </div>

      {/* Hero area with search */}
      <div className="container-responsive flex-1 grid place-content-center">
        <div className="text-center max-w-2xl mx-auto">
          <h1 className="text-3xl sm:text-5xl font-bold tracking-wide">
            <span className="accent-gold">查</span>股價 · 市場總覽 · 個股資訊
          </h1>
          <p className="mt-3 section-subtle">輸入股票代號或公司名稱，例如 2330.TW、TSLA</p>
          <form onSubmit={onSubmit} className="mt-6 flex items-center gap-2">
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="flex-1 px-4 py-3 rounded-xl bg-neutral-900 border border-neutral-700 focus:outline-none focus:border-yellow-500"
              placeholder="輸入代號或公司名..."
            />
            <button type="submit" className="px-4 py-3 rounded-xl bg-yellow-500 text-neutral-900 font-semibold hover:bg-yellow-400">
              查詢
            </button>
          </form>
        </div>
      </div>
    </header>
  )
}

export default Navbar


