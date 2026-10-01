import { Link } from 'react-router-dom'
import { getOrders } from '../store'

const fmtDate = (d: string) => d.replaceAll('-', '/')

export default function OrderList() {
  const orders = [...getOrders()].sort((a, b) => a.due.localeCompare(b.due))
  return (
    <main className="page" style={{ maxWidth: 1200 }}>
      <div className="toolbar">
        <div style={{ display: 'flex', alignItems: 'baseline', gap: 8 }}>
          <h1>受注一覧</h1>
          <span className="count">全 {orders.length} 件</span>
        </div>
        <Link to="/orders/new" className="btn btn-primary">＋ 新規作成</Link>
      </div>
      <div className="card table-wrap">
        <table>
          <thead>
            <tr>
              <th>品名</th>
              <th>得意先</th>
              <th style={{ textAlign: 'right' }}>数量</th>
              <th>納期</th>
              <th>備考</th>
            </tr>
          </thead>
          <tbody>
            {orders.length === 0 && (
              <tr><td colSpan={5} className="empty">受注はまだありません。</td></tr>
            )}
            {orders.map((o) => (
              <tr key={o.id}>
                <td><Link to={`/orders/${o.id}`} style={{ fontWeight: 600 }}>{o.item}</Link></td>
                <td>{o.client}</td>
                <td className="num">{o.qty.toLocaleString('ja-JP')}</td>
                <td className="mono">{fmtDate(o.due)}</td>
                <td className="muted">{o.note}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </main>
  )
}
