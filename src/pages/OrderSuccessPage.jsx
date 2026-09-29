import { Link, useLocation } from 'react-router-dom'
import { useCartStore } from '../store/cartStore.js'

export default function OrderSuccessPage() {
  const { tableNumber } = useCartStore()
  const { state } = useLocation()
  const orderId = state?.orderId ?? `MB-${Date.now().toString().slice(-6)}`

  return (
    <div className="mx-auto flex min-h-screen max-w-md flex-col items-center justify-center px-6 text-center">
      <div className="flex h-16 w-16 items-center justify-center rounded-full border-2 border-bara-cyan text-3xl text-bara-cyan">
        ✓
      </div>
      <h1 className="mt-5 text-xl font-extrabold">Pesanan Diterima</h1>
      <p className="mt-2 text-sm text-white/70">
        Pesanan kamu untuk Meja {tableNumber ?? '-'} sedang diproses dapur. Kami akan kabari begitu makanan siap.
      </p>

      <div className="mt-6 w-full rounded-lg border border-bara-line bg-bara-panel px-4 py-3 text-sm">
        <div className="flex justify-between text-white/60">
          <span>No. Pesanan</span>
          <span className="font-mono text-white">{orderId}</span>
        </div>
        <div className="mt-1 flex justify-between text-white/60">
          <span>Status</span>
          <span className="font-semibold text-bara-cyan">Menunggu</span>
        </div>
      </div>

      <Link
        to="/order"
        className="mt-8 w-full rounded-xl border border-bara-cyan px-6 py-3 text-center font-bold text-bara-cyan"
      >
        Pesan Lagi
      </Link>
    </div>
  )
}
