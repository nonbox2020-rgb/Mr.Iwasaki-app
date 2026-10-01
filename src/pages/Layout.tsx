import { Outlet, useNavigate } from 'react-router-dom'
import { getUser, logout } from '../store'

export default function Layout() {
  const navigate = useNavigate()
  return (
    <div style={{ minHeight: '100vh' }}>
      <header className="header">
        <div className="header-inner">
          <div className="brand">受注管理システム</div>
          <div className="user">
            <span>{getUser()}</span>
            <button type="button" className="linkbtn" onClick={() => { logout(); navigate('/login') }}>
              ログアウト
            </button>
          </div>
        </div>
      </header>
      <Outlet />
    </div>
  )
}
