import { API_URL_API_FRONTEND } from '@/settings'
import { useState } from 'react'
import { useRouter } from 'next/router'
import { useError } from './useError'

export function useVets () {
  const [vets, setVets] = useState([])
  const [vetsFiltered, setVetsFiltered] = useState([])
  const { tryCatchReturn, tryCatchAction } = useError()
  const router = useRouter()

  const getAllVets = async () => {
    return tryCatchAction(async () => {
      const response = await fetch(`${API_URL_API_FRONTEND}/vets/getAll`,
        {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json'
          }
        })
      const data = await response.json()
      return data
    }, async (data) => {
      setVets(data)
      setVetsFiltered(data)
    })
  }

  const getVetForId = async (id) => {
    return tryCatchReturn(async () => {
      const response = await fetch(`${API_URL_API_FRONTEND}/vets/getForId`,
        {
          method: 'POST',
          body: JSON.stringify({ id }),
          headers: {
            'Content-Type': 'application/json'
          }
        })
      const data = await response.json()
      return data
    })
  }

  const addVet = async (vet) => {
    tryCatchAction(async () => {
      const response = await fetch(`${API_URL_API_FRONTEND}/vets/add`,
        {
          method: 'POST',
          body: JSON.stringify(vet),
          headers: {
            'Content-Type': 'application/json'
          }
        })
      const data = await response.json()
      return data
    }, async () => {
      router.push('/admin/vets/list')
    })
  }

  const editVet = async (id, vet) => {
    tryCatchAction(async () => {
      const response = await fetch(`${API_URL_API_FRONTEND}/vets/edit`,
        {
          method: 'POST',
          body: JSON.stringify({ ...vet, id }),
          headers: {
            'Content-Type': 'application/json'
          }
        })
      const data = await response.json()
      return data
    }, async () => {
      router.push('/admin/vets/list')
    })
  }

  return {
    vets,
    getAllVets,
    getVetForId,
    addVet,
    editVet,
    vetsFiltered,
    setVetsFiltered
  }
}
