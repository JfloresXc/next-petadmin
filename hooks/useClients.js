import { API_URL_API_FRONTEND } from '@/settings'
import { handleError } from '@/utils/error'
import { useState } from 'react'
import { useRouter } from 'next/router'
import { useLoading } from './useLoading'

export function useClients () {
  const [clients, setClients] = useState([])
  const [clientsFiltered, setClientsFiltered] = useState([])
  const { showLoading, hideLoading } = useLoading()
  const router = useRouter()

  const getAllClients = async () => {
    showLoading()
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
    setClientsFiltered(data)
    hideLoading()
    return data
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
    showLoading()
    try {
      const response = await fetch(`${API_URL_API_FRONTEND}/clients/getClientForId`,
        {
          method: 'POST',
          body: JSON.stringify({ id }),
          headers: {
            'Content-Type': 'application/json'
          }
        })
      const data = await response.json()
      hideLoading()
      handleError(data)
      return data
    } catch (error) {
      handleError({ isError: true, message: error.message })
      hideLoading()
    }
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
    getAllClients,
    getClientForId,
    addClient,
    editClient,
    clientsFiltered,
    setClientsFiltered
  }
}
