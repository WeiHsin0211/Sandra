import { useMemo, useState } from 'react'
import { useParams } from 'react-router-dom'
import Card from '../components/Card.jsx'
import StockChart from '../components/StockChart.jsx'
import { mockHistory, companyProfile } from '../data/mock.js'

function Stat({ label, value, highlight }) {
  return (
    <div>
      <div className="text-neutral-400 text-xs">{label}</div>
      <div className={`text-lg font-semibold ${highlight ?? ''}`}>{value}</div>
    </div>
  )
}

function StockDetail() {
  const { symbol } = useParams()
  const [range, setRange] = useState('D')

  const latest = useMemo(() => mockHistory[mockHistory.length - 1], [])
  const changePct = useMemo(() => {
    const first = mockHistory[0]?.close ?? 0
    const last = latest?.close ?? 0
    if (!first) return 0
    return Number((((last - first) / first) * 100).toFixed(2))
  }, [latest])

  return (
    <div className="space-y-6">
      <Card>
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
          <div>
            <div className="text-sm text-neutral-400">{companyProfile.name} · {companyProfile.industry}</div>
            <h1 className="text-2xl font-bold tracking-wide">{symbol}</h1>
          </div>
          <div className="flex items-end gap-6">
            <div className="text-3xl font-bold">{latest.close.toFixed(2)}</div>
            <div className={changePct >= 0 ? 'text-emerald-400' : 'text-rose-400'}>
              {changePct >= 0 ? '+' : ''}{changePct}%
            </div>
          </div>
        </div>
        <div className="mt-4 grid grid-cols-2 sm:grid-cols-4 gap-4">
          <Stat label="開盤" value={latest.open.toFixed(2)} />
          <Stat label="最高" value={latest.high.toFixed(2)} />
          <Stat label="最低" value={latest.low.toFixed(2)} />
          <Stat label="成交量" value={latest.volume.toLocaleString()} />
        </div>
      </Card>

      <Card title="歷史走勢">
        <div className="flex gap-2 mb-3">
          {['D','W','M'].map((r) => (
            <button
              key={r}
              onClick={() => setRange(r)}
              className={`px-3 py-1 rounded-lg border ${range === r ? 'border-yellow-500 text-yellow-400 bg-yellow-500/10' : 'border-neutral-700 text-neutral-300 hover:border-neutral-600'}`}
            >{r}</button>
          ))}
        </div>
        <StockChart data={mockHistory} type="area" height={420} />
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card title="成交資訊">
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
            <Stat label="成交量" value={latest.volume.toLocaleString()} />
            <Stat label="成交值" value={(latest.volume * latest.close).toLocaleString()} />
            <Stat label="內外盤比" value="52 / 48" />
          </div>
        </Card>
        <Card title="公司基本資料">
          <div className="space-y-1 text-sm">
            <div><span className="text-neutral-400">公司：</span>{companyProfile.name}</div>
            <div><span className="text-neutral-400">產業：</span>{companyProfile.industry}</div>
            <div className="text-neutral-300 leading-6">{companyProfile.description}</div>
          </div>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card title="技術分析 (預留)">
          <div className="text-sm text-neutral-400">均線、MACD、RSI 之後實作</div>
        </Card>
        <Card title="財務基本面 (預留)">
          <div className="text-sm text-neutral-400">EPS、ROE、毛利率、股利政策</div>
        </Card>
        <Card title="價格提醒 (預留)">
          <div className="text-sm text-neutral-400">設定提醒條件與通知方式</div>
        </Card>
      </div>
    </div>
  )
}

export default StockDetail


