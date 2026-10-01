import { useState, type FormEvent } from 'react'
import { useNavigate } from 'react-router-dom'
import { login } from '../store'

export default function Login() {
  const navigate = useNavigate()
  const [uid, setUid] = useState('')
  const [pw, setPw] = useState('')
  const [error, setError] = useState('')

  function onSubmit(e: FormEvent) {
    e.preventDefault()
    if (!uid.trim() || !pw) {
      setError('社員IDとパスワードを入力してください。')
      return
    }
    // TODO: 認証APIと接続する
    login(uid.trim())
    navigate('/', { replace: true })
  }

  return (
    <main className="login">
      <form className="card" onSubmit={onSubmit} noValidate>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 4, marginBottom: 8 }}>
          <h1>受注管理システム</h1>
          <p className="lead">社員IDとパスワードを入力してください。</p>
        </div>
        <div className="field">
          <label htmlFor="uid" className="label">社員ID</label>
          <input id="uid" className="input" type="text" autoComplete="username" placeholder="例：T0123"
            value={uid} onChange={(e) => setUid(e.target.value)} />
        </div>
        <div className="field">
          <label htmlFor="pw" className="label">パスワード</label>
          <input id="pw" className="input" type="password" autoComplete="current-password"
            value={pw} onChange={(e) => setPw(e.target.value)} />
        </div>
        {error && <p className="error" role="alert">{error}</p>}
        <button type="submit" className="btn btn-primary" style={{ marginTop: 8 }}>ログイン</button>
        <p className="hint">パスワードを忘れた場合は管理者に連絡してください。</p>
      </form>
    </main>
  )
}
