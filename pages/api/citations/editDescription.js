import { API_URL_SERVER_BACKEND } from 'settings'
import { getHeaders } from '@/utils/headers'

export default async function handler(req, res) {
  const { body } = req
  const { headers } = getHeaders(req)
  const { id } = body

  try {
    const url = `${API_URL_SERVER_BACKEND}/citation/description/${id}`
    const response = await fetch(url, {
      method: 'PUT',
      headers,
      body: JSON.stringify(body),
    })

    const data = await response.json()
    res.json(data)
  } catch (error) {
    res.json({ isError: true, message: error.message })
  }
}
