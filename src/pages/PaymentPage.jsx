import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useCartStore } from '../store/cartStore.js'

const rupiah = (n) => 'Rp' + n.toLocaleString('id-ID')
const OTHER_FEE = 1000

const METHODS = [
  { id: 'online', label: 'Bayar Online' },
  { id: 'cashier', label: 'Bayar di Kasir' },
]

export default function PaymentPage() {
  const { tableNumber, total, clear } = useCartStore()
  const navigate = useNavigate()
  const [name, setName] = useState('')
  const [phone, setPhone] = useState('')
  const [method, setMethod] = useState('online')
  const grandTotal = total() + OTHER_FEE

  const handlePay = (e) => {
    e.preventDefault()
    if (!name.trim()) return
    clear()
    navigate('/order-success')
  }

  return (
    <div className="mx-auto max-w-md pb-28">
      <header className="sticky top-0 z-10 flex items-center gap-3 border-b border-bara-line bg-bara-black/95 px-4 py-3 backdrop-blur">
        <Link to="/view-order" aria-label="Kembali" className="text-xl">←</Link>
        <h1 className="text-base font-bold">Pembayaran</h1>
      </header>

      <form onSubmit={handlePay} className="px-4 pt-4">
        <div className="rounded-lg border border-bara-cyan/50 bg-bara-panel px-3 py-2 text-sm">
          Dine In · Meja {tableNumber ?? '-'}
        </div>

        <section className="pt-6">
          <h2 className="mb-3 text-sm font-bold text-bara-cyan">Data Pemesan</h2>
          <label className="mb-3 block text-sm">
            Nama Lengkap <span className="text-bara-chili">*</span>
            <input
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Nama Lengkap"
              className="mt-1 w-full rounded-lg border border-bara-line bg-bara-panel px-3 py-2 outline-none focus:border-bara-cyan"
            />
          </label>
          <label className="mb-3 block text-sm">
            No. HP (untuk info promo)
            <input
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="No. HP"
              className="mt-1 w-full rounded-lg border border-bara-line bg-bara-panel px-3 py-2 outline-none focus:border-bara-cyan"
            />
          </label>
        </section>

        <section className="pt-4">
          <h2 className="mb-3 text-sm font-bold text-bara-cyan">Metode Pembayaran</h2>
          <div className="grid grid-cols-2 gap-3">
            {METHODS.map((m) => (
              <button
                type="button"
                key={m.id}
                onClick={() => setMethod(m.id)}
                className={`rounded-lg border px-3 py-3 text-sm font-medium ${
                  method === m.id ? 'border-bara-cyan text-bara-cyan' : 'border-bara-line text-white/70'
                }`}
              >
                {m.label}
              </button>
            ))}
          </div>
        </section>

        {method === 'online' && (
          <section className="pt-4">
            <label className="flex items-center justify-between rounded-lg border border-bara-line bg-bara-panel px-3 py-3 text-sm">
              QRIS
              <input type="radio" name="qr" defaultChecked className="accent-bara-cyan" />
            </label>
          </section>
        )}

        <div className="fixed inset-x-0 bottom-0 mx-auto max-w-md border-t border-bara-line bg-bara-black p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs text-white/60">Total Pembayaran</p>
              <p className="text-lg font-bold">{rupiah(grandTotal)}</p>
            </div>
            <button type="submit" className="rounded-xl bg-bara-cyan px-6 py-3 font-bold text-black">
              Bayar
            </button>
          </div>
        </div>
      </form>
    </div>
  )
}
