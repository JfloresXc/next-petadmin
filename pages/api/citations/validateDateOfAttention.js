import { API_URL_SERVER_BACKEND } from 'settings'
import { getHeaders } from '@/utils/headers'

export default async function handler (req, res) {
  const { headers } = getHeaders(req)
  const { body } = req
  const { id, dateOfAttention, hourOfAttention } = body

  try {
    const url = `${API_URL_SERVER_BACKEND}/citation/validateDateOfAttention/${id}/${dateOfAttention}/${hourOfAttention}`
    const response = await fetch(url, {
      method: 'GET',
      headers
    })

    const data = await response.json()
    res.json(data)
  } catch (error) {
    res.json({ isError: true, message: 'Error into api' })
  }
}
