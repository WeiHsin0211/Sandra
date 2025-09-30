// Mock market overview data
export const indices = [
  { name: '台灣加權', symbol: 'TAIEX', price: 20543.12, change: 0.83 },
  { name: 'NASDAQ', symbol: 'IXIC', price: 17542.34, change: -0.37 },
  { name: 'S&P 500', symbol: 'GSPC', price: 5298.22, change: 0.15 },
]

// Mock ranking lists
export const rankings = {
  gainers: [
    { symbol: 'TSLA', name: 'Tesla', changePct: 7.3, volume: 55432123 },
    { symbol: 'NVDA', name: 'NVIDIA', changePct: 5.8, volume: 44213456 },
    { symbol: '2610.TW', name: '華航', changePct: 4.9, volume: 29873456 },
  ],
  losers: [
    { symbol: 'AAPL', name: 'Apple', changePct: -3.2, volume: 61234567 },
    { symbol: '0050.TW', name: '台灣50', changePct: -2.6, volume: 21345678 },
    { symbol: 'AMD', name: 'AMD', changePct: -2.4, volume: 19876543 },
  ],
  volume: [
    { symbol: '2330.TW', name: '台積電', changePct: 1.2, volume: 84567890 },
    { symbol: '2317.TW', name: '鴻海', changePct: -0.5, volume: 73456789 },
    { symbol: '0056.TW', name: '高股息', changePct: 0.3, volume: 65432123 },
  ],
}

// Mock historical OHLCV data (daily close simplified)
export const mockHistory = Array.from({ length: 60 }).map((_, i) => {
  const base = 150 + Math.sin(i / 6) * 6 + Math.random() * 2
  return {
    date: new Date(Date.now() - (60 - i) * 24 * 3600 * 1000)
      .toISOString()
      .slice(5, 10),
    open: base - Math.random() * 1.5,
    high: base + Math.random() * 2,
    low: base - Math.random() * 2,
    close: base + (Math.random() - 0.5) * 2,
    volume: 1_000_000 + Math.floor(Math.random() * 500_000),
  }
})

export const companyProfile = {
  symbol: '2330.TW',
  name: '台積電',
  industry: '半導體',
  description:
    '全球領先的半導體晶圓代工廠，提供先進製程與設計生態系服務。',
}


