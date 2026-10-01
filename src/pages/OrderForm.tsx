import { useState, type FormEvent, type ReactNode } from 'react'
import { Link, Navigate, useNavigate, useParams } from 'react-router-dom'
import { CLIENTS, deleteOrder, getOrder, saveOrder } from '../store'

type Errors = Partial<Record<'item' | 'client' | 'qty' | 'due', string>>

function Field({ id, label, required, error, className, children }: {
  id: string; label: string; required?: boolean; error?: string; className?: string; children: ReactNode
}) {
  return (
    <div className={`field ${className ?? ''}`}>
      <label htmlFor={id} className="label">
        {label}{required && <span className="req">必須</span>}
      </label>
      {children}
      {error && <p className="error" id={`${id}-err`}>{error}</p>}
    </div>
  )
}

export default function OrderForm() {
  const { id } = useParams()
  const navigate = useNavigate()
  const existing = id ? getOrder(id) : undefined

  const [item, setItem] = useState(existing?.item ?? '')
  const [client, setClient] = useState(existing?.client ?? '')
  const [qty, setQty] = useState(existing ? String(existing.qty) : '')
  const [due, setDue] = useState(existing?.due ?? '')
  const [note, setNote] = useState(existing?.note ?? '')
  const [errors, setErrors] = useState<Errors>({})

  if (id && !existing) return <Navigate to="/" replace />

  function onSubmit(e: FormEvent) {
    e.preventDefault()
    const next: Errors = {}
    if (!item.trim()) next.item = '品名を入力してください。'
    if (!client) next.client = '得意先を選択してください。'
    const n = Number(qty)
    if (!qty || !Number.isInteger(n) || n < 1) next.qty = '1以上の整数を入力してください。'
    if (!due) next.due = '納期を入力してください。'
    setErrors(next)
    if (Object.keys(next).length) return
    saveOrder({ id, item: item.trim(), client, qty: n, due, note: note.trim() })
    navigate('/')
  }

  function onDelete() {
    if (id && confirm('この受注を削除しますか？')) {
      deleteOrder(id)
      navigate('/')
    }
  }

  const inv = (k: keyof Errors) => ({ 'aria-invalid': !!errors[k], 'aria-describedby': errors[k] ? `${k}-err` : undefined })

  return (
    <main className="page" style={{ maxWidth: 880 }}>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
        <Link to="/" style={{ fontSize: 13 }}>← 受注一覧へ戻る</Link>
        <h1>{existing ? '受注 編集' : '受注 新規作成'}</h1>
      </div>
      <form className="card form" onSubmit={onSubmit} noValidate>
        <div className="grid">
          <Field id="item" label="品名" required error={errors.item} className="span2">
            <input id="item" className="input" type="text" placeholder="例：A4チラシ 両面カラー"
              value={item} onChange={(e) => setItem(e.target.value)} {...inv('item')} />
          </Field>
          <Field id="client" label="得意先" required error={errors.client}>
            <select id="client" className="input" value={client} onChange={(e) => setClient(e.target.value)} {...inv('client')}>
              <option value="">選択してください</option>
              {CLIENTS.map((c) => <option key={c}>{c}</option>)}
            </select>
          </Field>
          <Field id="qty" label="数量" required error={errors.qty}>
            <input id="qty" className="input" type="number" min={1} placeholder="5000" style={{ textAlign: 'right' }}
              value={qty} onChange={(e) => setQty(e.target.value)} {...inv('qty')} />
          </Field>
          <Field id="due" label="納期" required error={errors.due}>
            <input id="due" className="input" type="date" value={due} onChange={(e) => setDue(e.target.value)} {...inv('due')} />
          </Field>
          <div />
          <Field id="note" label="備考" className="span2">
            <textarea id="note" className="input" rows={4} placeholder="特記事項があれば入力"
              value={note} onChange={(e) => setNote(e.target.value)} />
          </Field>
        </div>
        <div className="actions">
          {existing && <button type="button" className="btn btn-secondary danger" onClick={onDelete}>削除</button>}
          <Link to="/" className="btn btn-secondary">キャンセル</Link>
          <button type="submit" className="btn btn-primary" style={{ padding: '0 28px' }}>保存</button>
        </div>
      </form>
    </main>
  )
}
