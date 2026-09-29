import { useEffect, useMemo, useRef, useState } from 'react'
import { useSearchParams, useNavigate } from 'react-router-dom'
import { CATEGORIES } from '../data/menu.js'
import { useCartStore } from '../store/cartStore.js'
import logo from '../logo.png'

const rupiah = (n) => 'Rp' + n.toLocaleString('id-ID')

function MenuCard({ item, onAdd }) {
  return (
    <div className="w-36 shrink-0">
      <div className="flex h-28 w-36 items-center justify-center rounded-lg bg-bara-panel text-3xl">🍜</div>
      <p className="mt-2 text-sm font-semibold leading-tight">{item.name}</p>
      <p className="mt-1 text-sm text-white/70">{rupiah(item.price)}</p>
      <button
        onClick={() => onAdd(item)}
        className="mt-2 w-full rounded-lg border border-bara-cyan py-1.5 text-sm font-semibold text-bara-cyan active:bg-bara-cyan active:text-black"
      >
        Tambah
      </button>
    </div>
  )
}

export default function MenuPage() {
  const [params] = useSearchParams()
  const navigate = useNavigate()
  const { tableNumber, setTable, add, count, total } = useCartStore()
  const [query, setQuery] = useState('')
  const [showSearch, setShowSearch] = useState(false)
  const [activeTab, setActiveTab] = useState(CATEGORIES[0].id)
  const sectionRefs = useRef({})
  const tabRefs = useRef({})

  useEffect(() => {
    const t = params.get('tableNumber')
    if (t) setTable(t)
  }, [params, setTable])

  const categories = useMemo(() => {
    const q = query.trim().toLowerCase()
    if (!q) return CATEGORIES
    return CATEGORIES.map((c) => ({ ...c, items: c.items.filter((i) => i.name.toLowerCase().includes(q)) })).filter((c) => c.items.length)
  }, [query])

  const scrollToSection = (id) => {
    setActiveTab(id)
    sectionRefs.current[id]?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries.filter((e) => e.isIntersecting)
        if (visible.length > 0) {
          const topMost = visible.reduce((a, b) =>
            a.boundingClientRect.top < b.boundingClientRect.top ? a : b
          )
          setActiveTab(topMost.target.dataset.categoryId)
        }
      },
      { rootMargin: '-120px 0px -70% 0px', threshold: 0 }
    )

    const refs = Object.values(sectionRefs.current).filter(Boolean)
    refs.forEach((el) => observer.observe(el))
    return () => observer.disconnect()
  }, [categories])

  useEffect(() => {
    tabRefs.current[activeTab]?.scrollIntoView({
      behavior: 'smooth',
      inline: 'center',
      block: 'nearest',
    })
  }, [activeTab])

  return (
    <div className="mx-auto max-w-md pb-24">
      {/* Hero */}
      <div className="relative flex h-44 items-center justify-center bg-gradient-to-b from-bara-panel to-bara-black">
        <img src={logo} alt="Warkop Mie Bara" className="h-32 w-32 object-contain" />
        <div className="absolute right-3 top-3 flex gap-2">
          <button
            onClick={() => setShowSearch((s) => !s)}
            aria-label="Cari menu"
            className="flex h-9 w-9 items-center justify-center rounded-full bg-white/10 text-white"
          >
            🔍
          </button>
          <button
            onClick={() => navigate('/profile')}
            aria-label="Buka menu profil"
            className="flex h-9 w-9 items-center justify-center rounded-full bg-white/10 text-white"
          >
            ☰
          </button>
        </div>
      </div>

      {/* Info toko */}
      <div className="px-4 pt-4">
        <div className="flex items-center justify-between rounded-xl border border-bara-line bg-bara-panel px-4 py-3">
          <div>
            <p className="font-bold">Warkop Mie Bara</p>
            <p className="text-xs text-white/60">Buka hari ini, 10:00–23:00</p>
          </div>
          <span className="text-white/40">›</span>
        </div>

        <div className="mt-3 rounded-lg bg-bara-cyan/10 px-4 py-2 text-center text-sm font-medium text-bara-cyan">
          {tableNumber ? `Nomor Meja: ${tableNumber}` : 'Pilih meja lewat scan QR'}
        </div>

        {showSearch && (
          <input
            autoFocus
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Mau makan atau minum apa?"
            className="mt-3 w-full rounded-lg border border-bara-line bg-bara-panel px-3 py-2 text-sm outline-none focus:border-bara-cyan"
          />
        )}
      </div>

      {/* Tab kategori */}
      <div className="sticky top-0 z-10 mt-4 overflow-x-auto no-scrollbar border-b border-bara-line bg-bara-black/95 px-4 backdrop-blur">
        <div className="flex gap-5 whitespace-nowrap py-3 text-sm">
          {CATEGORIES.map((c) => (
            <button
              key={c.id}
              ref={(el) => (tabRefs.current[c.id] = el)}
              onClick={() => scrollToSection(c.id)}
              className={`pb-1 font-medium ${
                activeTab === c.id ? 'border-b-2 border-bara-cyan text-bara-cyan' : 'text-white/60'
              }`}
            >
              {c.name}
            </button>
          ))}
        </div>
      </div>

      {/* Section per kategori */}
      {categories.map((c) => (
        <section
          key={c.id}
          ref={(el) => (sectionRefs.current[c.id] = el)}
          data-category-id={c.id}
          className="px-4 pt-6"
        >
          <h2 className="mb-3 text-base font-bold">{c.name}</h2>
          <div className="flex gap-3 overflow-x-auto no-scrollbar pb-1">
            {c.items.map((i) => (
              <MenuCard key={i.id} item={i} onAdd={add} />
            ))}
          </div>
        </section>
      ))}

      {count() > 0 && (
        <div className="fixed inset-x-0 bottom-0 mx-auto max-w-md p-4">
          <button
            onClick={() => navigate('/view-order')}
            className="flex w-full items-center justify-between rounded-xl bg-bara-cyan px-4 py-3 font-bold text-black"
          >
            <span>{count()} item</span>
            <span>Lihat Keranjang · {rupiah(total())}</span>
          </button>
        </div>
      )}
    </div>
  )
}