# Warkop Mie Bara — Frontend

React + Vite + Tailwind v4 + React Router + Zustand.

    npm install
    npm run dev

Buka `http://localhost:5173/order?mode=dinein&tableNumber=12` untuk simulasi scan QR meja 12.
Data menu ada di `src/data/menu.js` (item bertanda `check: true` = harga dari foto yang kurang jelas, cek ulang).

## Alur halaman
`/order?tableNumber=12` (menu, dari QR) → `/view-order` (keranjang) → `/payment` → `/status/:id`

Pesanan dikirim lewat `src/api/orders.js`. Selama `VITE_API_URL` belum diisi (file `.env`), pesanan hanya di-mock.
