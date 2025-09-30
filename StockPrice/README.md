# Stock Price (React + Vite)

A minimal stock search and quote viewer powered by Alpha Vantage.

## Setup

1. Get a free API key from `https://www.alphavantage.co/support/#api-key`.
2. Create a `.env.local` file in the project root based on `.env.example`:

```
VITE_ALPHA_VANTAGE_KEY=your_alpha_vantage_api_key
```

3. Install dependencies and start the dev server:

```
npm i
npm run dev
```

## Features (current)

- Search symbols via Alpha Vantage SYMBOL_SEARCH
- View latest quote via GLOBAL_QUOTE
- Simple intraday list (5min interval)

## Notes

- Free tier has rate limits; expect throttling. Queries are cached with React Query.
- Do not commit `.env.local` with your real key.
