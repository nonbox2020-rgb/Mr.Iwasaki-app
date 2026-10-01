export type Order = {
  id: string
  item: string
  client: string
  qty: number
  due: string // YYYY-MM-DD
  note: string
}

export const CLIENTS = ['株式会社サンプル商事', '有限会社テスト印刷', '株式会社デモ企画']

const ORDERS_KEY = 'orders'
const USER_KEY = 'user'

const seed: Order[] = [
  { id: '1', item: 'A4チラシ 両面カラー', client: '株式会社サンプル商事', qty: 5000, due: '2026-10-15', note: '特色指定あり' },
  { id: '2', item: '会社案内パンフレット', client: '有限会社テスト印刷', qty: 1200, due: '2026-10-22', note: '' },
  { id: '3', item: '封筒 長3', client: '株式会社デモ企画', qty: 10000, due: '2026-11-05', note: '再版' },
]

function read<T>(key: string, fallback: T): T {
  try {
    const raw = localStorage.getItem(key)
    return raw ? (JSON.parse(raw) as T) : fallback
  } catch {
    return fallback
  }
}

function write(key: string, value: unknown) {
  try {
    localStorage.setItem(key, JSON.stringify(value))
  } catch {
    /* ignore */
  }
}

export function getOrders(): Order[] {
  return read(ORDERS_KEY, seed)
}

export function getOrder(id: string): Order | undefined {
  return getOrders().find((o) => o.id === id)
}

export function saveOrder(order: Omit<Order, 'id'> & { id?: string }) {
  const orders = getOrders()
  if (order.id) {
    write(ORDERS_KEY, orders.map((o) => (o.id === order.id ? (order as Order) : o)))
  } else {
    write(ORDERS_KEY, [...orders, { ...order, id: crypto.randomUUID() }])
  }
}

export function deleteOrder(id: string) {
  write(ORDERS_KEY, getOrders().filter((o) => o.id !== id))
}

export function getUser(): string | null {
  return read<string | null>(USER_KEY, null)
}

export function login(userId: string) {
  write(USER_KEY, userId)
}

export function logout() {
  try {
    localStorage.removeItem(USER_KEY)
  } catch {
    /* ignore */
  }
}
