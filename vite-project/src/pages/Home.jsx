import { Link } from 'react-router-dom'
import Card from '../components/Card.jsx'
import StockChart from '../components/StockChart.jsx'
import { indices, rankings, mockHistory } from '../data/mock.js'

function Ticker({ label, value, change }) {
  const positive = change >= 0
  return (
    <div className="kpi-chip">
      <div className="text-neutral-400 text-xs">{label}</div>
      <div className="flex items-baseline gap-2">
        <span className="text-xl font-semibold">{value.toLocaleString()}</span>
        <span className={positive ? 'text-emerald-400' : 'text-rose-400'}>
          {positive ? '+' : ''}
          {change}%
        </span>
      </div>
    </div>
  )
}

function RankingTable({ title, data }) {
  return (
    <Card title={title}>
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
            {data.map((row, idx) => (
              <tr key={row.symbol} className={`border-t border-neutral-800 ${idx % 2 === 1 ? 'bg-neutral-900/40' : ''}`}>
                <td className="py-2">
                  <Link className="hover:text-yellow-400" to={`/stock/${row.symbol}`}>
                    {row.symbol} · {row.name}
                  </Link>
                </td>
                <td className={`text-right ${row.changePct >= 0 ? 'text-emerald-400' : 'text-rose-400'}`}>
                  {row.changePct > 0 ? '+' : ''}{row.changePct}%
                </td>
                <td className="text-right text-neutral-300">{row.volume.toLocaleString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Card>
  )
}

function Home() {
  return (
    <div className="space-y-6">
      <h1 className="page-title">市場總覽與熱門排行</h1>
      <div className="gold-divider" />

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        <Card title="大盤指數總覽" className="xl:col-span-2">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {indices.map((idx) => (
              <Ticker key={idx.symbol} label={`${idx.name} · ${idx.symbol}`} value={idx.price} change={idx.change} />
            ))}
          </div>
          <div className="mt-4">
            <StockChart data={mockHistory} type="area" height={420} />
          </div>
        </Card>

        <Card title="股票搜尋">
          <p className="section-subtle">在上方導覽列使用搜尋框輸入代號或公司名稱</p>
          <p className="mt-2 text-sm">例如：<span className="accent-gold">2330.TW</span>、<span className="accent-gold">TSLA</span></p>
        </Card>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        <RankingTable title="漲幅榜" data={rankings.gainers} />
        <RankingTable title="跌幅榜" data={rankings.losers} />
        <RankingTable title="成交量榜" data={rankings.volume} />
      </div>
    </div>
  )
}

export default Home


