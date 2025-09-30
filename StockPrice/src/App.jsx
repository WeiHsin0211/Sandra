import { useEffect, useMemo, useState } from 'react'
import './App.css'
import { useSymbolSearch, useQuote, useIntraday } from './hooks/useAlphaVantage'
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from 'recharts'

function App() {
  const [keyword, setKeyword] = useState('TSLA')
  const [selected, setSelected] = useState('TSLA')
  const [theme, setTheme] = useState(() => localStorage.getItem('theme') || 'dark')
  const [watchlist, setWatchlist] = useState(() => {
    try {
      const raw = localStorage.getItem('watchlist')
      return raw ? JSON.parse(raw) : ['AAPL', 'TSLA', 'MSFT']
    } catch {
      return ['AAPL', 'TSLA', 'MSFT']
    }
  })

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme)
    localStorage.setItem('theme', theme)
  }, [theme])

  useEffect(() => {
    localStorage.setItem('watchlist', JSON.stringify(watchlist))
  }, [watchlist])

  const { data: suggestions = [], isFetching: searching } = useSymbolSearch(keyword)
  const { data: quote, isFetching: loadingQuote, error: quoteError } = useQuote(selected)
  const { data: intraday = [], isFetching: loadingChart } = useIntraday(selected, '5min')

  const chartData = useMemo(() => {
    return intraday.slice(-60).map((p) => ({
      time: new Date(p.time).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      close: p.close,
    }))
  }, [intraday])

  const inWatchlist = watchlist.includes(selected)

  function toggleWatchlist(symbol) {
    setWatchlist((prev) => (prev.includes(symbol) ? prev.filter((s) => s !== symbol) : [...prev, symbol]))
  }

  return (
    <div style={{ maxWidth: 1040, margin: '0 auto', padding: 24 }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
        <h1 style={{ margin: 0 }}>Stock Price</h1>
        <div style={{ display: 'flex', gap: 8 }}>
          <button onClick={() => setTheme((t) => (t === 'dark' ? 'light' : 'dark'))}>
            Theme: {theme}
          </button>
        </div>
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: '220px 1fr', gap: 16 }}>
        <aside style={{ border: '1px solid var(--border)', borderRadius: 8, padding: 12, background: 'var(--panel)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <strong>Watchlist</strong>
            <button onClick={() => toggleWatchlist(selected)}>{inWatchlist ? '− Remove' : '+ Add'}</button>
          </div>
          <ul style={{ listStyle: 'none', padding: 0, marginTop: 8 }}>
            {watchlist.map((sym) => (
              <li key={sym} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '6px 4px', cursor: 'pointer' }}>
                <span onClick={() => setSelected(sym)}>{sym}</span>
                <button onClick={() => toggleWatchlist(sym)} style={{ padding: '2px 8px' }}>✕</button>
              </li>
            ))}
          </ul>
        </aside>
        <main>
          <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
        <input
          placeholder="Search symbol or company..."
          value={keyword}
          onChange={(e) => setKeyword(e.target.value)}
          style={{ flex: 1, padding: 8, fontSize: 16 }}
        />
          <button onClick={() => suggestions[0]?.symbol && setSelected(suggestions[0].symbol)}>
            Pick first
          </button>
        </div>

        {searching ? (
          <p>Searching…</p>
        ) : (
          suggestions?.length > 0 && (
            <div style={{ marginTop: 12 }}>
              <strong>Suggestions</strong>
              <ul>
                {suggestions.map((s) => (
                  <li key={s.symbol} style={{ cursor: 'pointer' }} onClick={() => setSelected(s.symbol)}>
                    {s.symbol} — {s.name} ({s.region}) [{s.currency}]
                  </li>
                ))}
              </ul>
            </div>
          )
        )}

        <hr style={{ margin: '16px 0' }} />

        <h2 style={{ display: 'flex', alignItems: 'center', gap: 12, marginTop: 0 }}>
          {selected}
          <button onClick={() => toggleWatchlist(selected)} style={{ padding: '4px 8px' }}>
            {inWatchlist ? '− Remove from Watchlist' : '+ Add to Watchlist'}
          </button>
        </h2>
        {quoteError && <p style={{ color: 'var(--negative)' }}>Failed to load quote.</p>}
        {loadingQuote ? (
          <p>Loading quote…</p>
        ) : quote ? (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 12 }}>
            <div><strong>Price</strong><div>{quote.price}</div></div>
            <div>
              <strong>Change</strong>
              <div style={{ color: (quote.change || 0) >= 0 ? 'var(--positive)' : 'var(--negative)' }}>
                {quote.change} ({quote.changePercent})
              </div>
            </div>
            <div><strong>Prev Close</strong><div>{quote.previousClose}</div></div>
            <div><strong>Open</strong><div>{quote.open}</div></div>
            <div><strong>High</strong><div>{quote.high}</div></div>
            <div><strong>Low</strong><div>{quote.low}</div></div>
            <div><strong>Volume</strong><div>{quote.volume.toLocaleString()}</div></div>
            <div><strong>Date</strong><div>{quote.latestTradingDay}</div></div>
          </div>
        ) : (
          <p>No data</p>
        )}

        <div style={{ marginTop: 16, border: '1px solid var(--border)', borderRadius: 8, padding: 8, background: 'var(--panel)' }}>
          <strong>Intraday (5min)</strong>
          {loadingChart ? (
            <p>Loading chart…</p>
          ) : chartData.length ? (
            <div style={{ height: 260 }}>
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={chartData} margin={{ top: 12, right: 12, bottom: 0, left: 0 }}>
                  <CartesianGrid stroke="var(--border)" strokeDasharray="3 3" />
                  <XAxis dataKey="time" minTickGap={24} tick={{ fill: 'var(--muted)', fontSize: 12 }} />
                  <YAxis tick={{ fill: 'var(--muted)', fontSize: 12 }} domain={["dataMin", "dataMax"]} />
                  <Tooltip contentStyle={{ background: 'var(--panel)', border: '1px solid var(--border)', color: 'var(--text)' }} />
                  <Line type="monotone" dataKey="close" stroke="var(--primary)" strokeWidth={2} dot={false} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          ) : (
            <p>No intraday data</p>
          )}
        </div>
        </main>
      </div>
    </div>
  )
}

export default App
