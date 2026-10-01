import { HashRouter, Navigate, Outlet, Route, Routes } from 'react-router-dom'
import { getUser } from './store'
import Login from './pages/Login'
import Layout from './pages/Layout'
import OrderList from './pages/OrderList'
import OrderForm from './pages/OrderForm'

function RequireAuth() {
  return getUser() ? <Outlet /> : <Navigate to="/login" replace />
}

export default function App() {
  return (
    <HashRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route element={<RequireAuth />}>
          <Route element={<Layout />}>
            <Route path="/" element={<OrderList />} />
            <Route path="/orders/new" element={<OrderForm />} />
            <Route path="/orders/:id" element={<OrderForm />} />
          </Route>
        </Route>
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </HashRouter>
  )
}
