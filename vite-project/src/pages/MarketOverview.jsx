import Card from '../components/Card.jsx'
import { rankings } from '../data/mock.js'

function Table({ rows }) {
  return (
    <div className="overflow-x-auto">
      <table className="w-full text-sm">
        <thead className="text-neutral-400">
          <tr>
            <th className="text-left py-2 font-medium">股票</th>
            <th className="text-right py-2 font-medium">漲跌幅</th>
            <th className="text-right py-2 font-medium">成交量</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((r, idx) => (
            <tr key={r.symbol} className={`border-t border-neutral-800 ${idx % 2 === 1 ? 'bg-neutral-900/40' : ''}`}>
              <td className="py-2">{r.symbol} · {r.name}</td>
              <td className={`text-right ${r.changePct >= 0 ? 'text-emerald-400' : 'text-rose-400'}`}>{r.changePct}%</td>
              <td className="text-right text-neutral-300">{r.volume.toLocaleString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

function MarketOverview() {
  return (
    <div className="space-y-6">
      <h1 className="page-title">市場總覽</h1>
      <div className="gold-divider" />
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card title="漲幅榜"><Table rows={rankings.gainers} /></Card>
        <Card title="跌幅榜"><Table rows={rankings.losers} /></Card>
        <Card title="成交量榜"><Table rows={rankings.volume} /></Card>
      </div>
    </div>
  )
}

export default MarketOverview


