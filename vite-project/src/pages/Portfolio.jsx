import Card from '../components/Card.jsx'

function Portfolio() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <Card title="投資組合 (預留)">
        <div className="text-sm text-neutral-400">建立持股清單、損益試算、走勢追蹤</div>
      </Card>
      <Card title="股票比較 (預留)">
        <div className="text-sm text-neutral-400">支援多檔股票走勢與指標比較</div>
      </Card>
    </div>
  )
}

export default Portfolio


