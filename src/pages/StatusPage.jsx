import { useParams, Link } from 'react-router-dom'
import { useCartStore } from '../store/cartStore.js'

const STEPS = ['Menunggu', 'Diproses', 'Siap']

export default function StatusPage() {
  const { id } = useParams()
  const tableNumber = useCartStore((s) => s.tableNumber)
  const active = 0

  return (
    <div className="mx-auto max-w-md px-4 py-10 text-center">
      <h1 className="text-xl font-extrabold text-bara-cyan">Pesanan diterima</h1>
      <p className="mt-2 text-sm text-white/70">Nomor pesanan {id} · Meja {tableNumber}</p>
      <ol className="mt-8 flex justify-between">
        {STEPS.map((s, i) => (
          <li key={s} className={`flex-1 border-t-4 pt-2 text-sm ${i <= active ? 'border-bara-cyan font-semibold text-bara-cyan' : 'border-bara-line text-white/50'}`}>
            {s}
          </li>
        ))}
      </ol>
      <Link to="/" className="mt-10 inline-block rounded-xl border border-bara-cyan px-5 py-3 font-semibold text-bara-cyan">Pesan lagi</Link>
    </div>
  )
}
