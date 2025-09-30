import axios from 'axios'

const API_BASE = 'https://www.alphavantage.co/query'

function getApiKey() {
  const key = import.meta.env.VITE_ALPHA_VANTAGE_KEY
  if (!key) {
    console.warn('Missing VITE_ALPHA_VANTAGE_KEY. Set it in .env or .env.local')
  }
  return key
}

export async function searchSymbols(keyword) {
  const apiKey = getApiKey()
  const params = {
    function: 'SYMBOL_SEARCH',
    keywords: keyword,
    apikey: apiKey,
  }
  const { data } = await axios.get(API_BASE, { params })
  const matches = data?.bestMatches || []
  return matches.map((m) => ({
    symbol: m['1. symbol'],
    name: m['2. name'],
    region: m['4. region'],
    currency: m['8. currency'],
    matchScore: Number(m['9. matchScore']),
  }))
}

export async function fetchQuote(symbol) {
  const apiKey = getApiKey()
  const params = {
    function: 'GLOBAL_QUOTE',
    symbol,
    apikey: apiKey,
  }
  const { data } = await axios.get(API_BASE, { params })
  const q = data?.['Global Quote'] || {}
  return {
    symbol: q['01. symbol'] || symbol,
    open: Number(q['02. open'] ?? '0'),
    high: Number(q['03. high'] ?? '0'),
    low: Number(q['04. low'] ?? '0'),
    price: Number(q['05. price'] ?? '0'),
    volume: Number(q['06. volume'] ?? '0'),
    latestTradingDay: q['07. latest trading day'] || '',
    previousClose: Number(q['08. previous close'] ?? '0'),
    change: Number(q['09. change'] ?? '0'),
    changePercent: q['10. change percent'] || '0%',
  }
}

export async function fetchIntraday(symbol, interval = '5min') {
  const apiKey = getApiKey()
  const params = {
    function: 'TIME_SERIES_INTRADAY',
    symbol,
    interval,
    outputsize: 'compact',
    apikey: apiKey,
  }
  const { data } = await axios.get(API_BASE, { params })
  const key = `Time Series (${interval})`
  const series = data?.[key] || {}
  const points = Object.entries(series).map(([ts, ohlc]) => ({
    time: ts,
    open: Number(ohlc['1. open']),
    high: Number(ohlc['2. high']),
    low: Number(ohlc['3. low']),
    close: Number(ohlc['4. close']),
    volume: Number(ohlc['5. volume']),
  }))
  // Sorted ascending by time
  points.sort((a, b) => new Date(a.time) - new Date(b.time))
  return points
}


