import { Routes, Route } from 'react-router-dom'
import MenuPage from './pages/MenuPage.jsx'
import OrderReviewPage from './pages/OrderReviewPage.jsx'
import PaymentPage from './pages/PaymentPage.jsx'
import OrderSuccessPage from './pages/OrderSuccessPage.jsx'
import ProfilePage from './pages/ProfilePage.jsx'
import HistoryPage from './pages/HistoryPage.jsx'

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<MenuPage />} />
      <Route path="/order" element={<MenuPage />} />
      <Route path="/view-order" element={<OrderReviewPage />} />
      <Route path="/payment" element={<PaymentPage />} />
      <Route path="/order-success" element={<OrderSuccessPage />} />
      <Route path="/profile" element={<ProfilePage />} />
      <Route path="/history" element={<HistoryPage />} />

    </Routes>
  )
}
