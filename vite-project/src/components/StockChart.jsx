import { useMemo } from 'react'
import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  AreaChart,
  Area,
} from 'recharts'

function StockChart({ data, type = 'line', color = '#facc15', height = 360 }) {
  const parsed = useMemo(() => data ?? [], [data])

  return (
    <div className="w-full" style={{ height }}>
      <ResponsiveContainer width="100%" height="100%">
        {type === 'area' ? (
          <AreaChart data={parsed} margin={{ left: 8, right: 8, top: 8, bottom: 0 }}>
            <defs>
              <linearGradient id="priceFill" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor={color} stopOpacity={0.4} />
                <stop offset="95%" stopColor={color} stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid stroke="#262626" vertical={false} />
            <XAxis dataKey="date" stroke="#a3a3a3" tickLine={false} axisLine={false} minTickGap={24} />
            <YAxis stroke="#a3a3a3" tickLine={false} axisLine={false} width={56} />
            <Tooltip contentStyle={{ background: '#0a0a0a', border: '1px solid #262626' }} />
            <Area type="monotone" dataKey="close" stroke={color} fill="url(#priceFill)" strokeWidth={2} />
          </AreaChart>
        ) : (
          <LineChart data={parsed} margin={{ left: 8, right: 8, top: 8, bottom: 0 }}>
            <CartesianGrid stroke="#262626" vertical={false} />
            <XAxis dataKey="date" stroke="#a3a3a3" tickLine={false} axisLine={false} minTickGap={24} />
            <YAxis stroke="#a3a3a3" tickLine={false} axisLine={false} width={56} />
            <Tooltip contentStyle={{ background: '#0a0a0a', border: '1px solid #262626' }} />
            <Line type="monotone" dataKey="close" stroke={color} dot={false} strokeWidth={2} />
          </LineChart>
        )}
      </ResponsiveContainer>
    </div>
  )
}

export default StockChart


