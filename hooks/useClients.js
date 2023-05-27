import { API_URL_API_FRONTEND } from '@/settings'
import { handleError } from '@/utils/error'
import { useState } from 'react'
import { useRouter } from 'next/router'

export function useClients () {
  const [clients, setClients] = useState([])
  const [loading, setLoading] = useState(true)
  const router = useRouter()

  const getAllClients = async () => {
    const response = await fetch(`${API_URL_API_FRONTEND}/clients/getAll`,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        }
      })
    const data = await response.json()
    handleError(data)
    setClients(data)
    setLoading(false)
  }

  const addClient = async (client) => {
    const response = await fetch(`${API_URL_API_FRONTEND}/clients/addClient`,
      {
        method: 'POST',
        body: JSON.stringify(client),
        headers: {
          'Content-Type': 'application/json'
        }
      })
    const data = await response.json()
    handleError(data)
    if (!data.isError) router.push('/admin/clients/list')
  }

  const getClientForId = async (id) => {
    const response = await fetch(`${API_URL_API_FRONTEND}/clients/getClientForId`,
      {
        method: 'POST',
        body: JSON.stringify({ id }),
        headers: {
          'Content-Type': 'application/json'
        }
      })
    const data = await response.json()
    handleError(data)

    return data
  }

  const editClient = async (id, client) => {
    const response = await fetch(`${API_URL_API_FRONTEND}/clients/editClient`,
      {
        method: 'POST',
        body: JSON.stringify({ ...client, id }),
        headers: {
          'Content-Type': 'application/json'
        }
      })
    const data = await response.json()
    handleError(data)
    if (!data.isError) router.push('/admin/clients/list')
  }

  return {
    clients,
    loading,
    getAllClients,
    getClientForId,
    addClient,
    editClient
  }
}
