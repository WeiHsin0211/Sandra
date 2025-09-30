import { useQuery } from '@tanstack/react-query'
import { searchSymbols, fetchQuote, fetchIntraday } from '../lib/alphaVantage'

export function useSymbolSearch(keyword) {
  return useQuery({
    queryKey: ['alphaVantage', 'search', keyword],
    queryFn: () => searchSymbols(keyword),
    enabled: Boolean(keyword && keyword.length >= 2),
    staleTime: 1000 * 60 * 5,
  })
}

export function useQuote(symbol) {
  return useQuery({
    queryKey: ['alphaVantage', 'quote', symbol],
    queryFn: () => fetchQuote(symbol),
    enabled: Boolean(symbol),
    refetchInterval: 1000 * 30,
    staleTime: 1000 * 15,
  })
}

export function useIntraday(symbol, interval = '5min') {
  return useQuery({
    queryKey: ['alphaVantage', 'intraday', symbol, interval],
    queryFn: () => fetchIntraday(symbol, interval),
    enabled: Boolean(symbol),
    staleTime: 1000 * 60,
  })
}


