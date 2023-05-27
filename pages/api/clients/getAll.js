import { API_URL_SERVER_BACKEND } from 'settings'
import { getHeaders } from '@/utils/headers'

export default async function handler (req, res) {
  const { headers } = getHeaders(req)
  try {
    const url = `${API_URL_SERVER_BACKEND}/client`
    const response = await fetch(url, {
      method: 'GET',
      headers
    })

    const data = await response.json()
    res.json(data)
  } catch (error) {
    res.json({ isError: true, message: error.message })
  }
}
