import axios from 'axios'

const api = axios.create({ baseURL: import.meta.env.VITE_API_URL })

export async function submitOrder(payload) {
  if (!import.meta.env.VITE_API_URL) {
    return { id: 'MB-' + Date.now().toString().slice(-6), status: 'menunggu', ...payload }
  }
  return (await api.post('/orders', payload)).data
}
