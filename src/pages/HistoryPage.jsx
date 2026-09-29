import { useState } from 'react'
import { Link } from 'react-router-dom'

const TABS = [
  { id: 'order', label: 'Pesanan' },
  { id: 'reservation', label: 'Reservasi' },
]

export default function HistoryPage() {
  const [tab, setTab] = useState('order')

  return (
    <div className="mx-auto flex min-h-screen max-w-md flex-col">
      <header className="flex items-center gap-3 border-b border-bara-line px-4 py-4">
        <Link to="/profile" aria-label="Kembali" className="text-xl">←</Link>
        <h1 className="flex-1 text-center text-base font-bold">Riwayat</h1>
        <span className="w-5" />
      </header>

      <div className="flex border-b border-bara-line px-4">
        {TABS.map((t) => (
          <button
            key={t.id}
            onClick={() => setTab(t.id)}
            className={`flex-1 pb-3 pt-4 text-sm font-semibold ${
              tab === t.id ? 'border-b-2 border-bara-cyan text-bara-cyan' : 'text-white/50'
            }`}
          >
            {t.label}
          </button>
        ))}
      </div>

      <div className="flex flex-1 flex-col items-center justify-center px-6 text-center">
        <div className="flex h-20 w-20 items-center justify-center rounded-full bg-bara-panel text-3xl">
          📝
        </div>
        <p className="mt-4 text-sm text-white/60">
          {tab === 'order' ? 'Belum ada pesanan' : 'Belum ada reservasi'}
        </p>
      </div>
    </div>
  )
}