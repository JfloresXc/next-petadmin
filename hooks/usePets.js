import { API_URL_API_FRONTEND } from '@/settings'
import { handleError } from '@/utils/error'
import { useState } from 'react'
import { useRouter } from 'next/router'
import { useLoading } from './useLoading'
import { setMessageSuccess } from '@/utils/alerts'

export function usePets() {
  const [pets, setPets] = useState([])
  const [petsFiltered, setPetsFiltered] = useState([])
  const { showLoading, hideLoading } = useLoading()
  const router = useRouter()

  const getAllPets = async () => {
    showLoading()

    try {
      const response = await fetch(`${API_URL_API_FRONTEND}/pets/getAll`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      })
      const data = await response.json()
      handleError(data)
      setPets(data)
      setPetsFiltered(data)
      hideLoading()
      return data
    } catch (error) {
      handleError(error)
      hideLoading()
    }
  }

  const addPet = async (pet) => {
    showLoading()

    try {
      const response = await fetch(`${API_URL_API_FRONTEND}/pets/add`, {
        method: 'POST',
        body: JSON.stringify(pet),
        headers: {
          'Content-Type': 'application/json',
        },
      })
      const data = await response.json()
      handleError(data)
      hideLoading()

      if (!data.isError) {
        setMessageSuccess({ message: 'Successfully saved' })
        router.push('/admin/pets/list')
      }
    } catch (error) {
      handleError({ isError: true, message: error.message })
      hideLoading()
    }
  }

  const getPetForId = async (id) => {
    const response = await fetch(`${API_URL_API_FRONTEND}/pets/getForId`, {
      method: 'POST',
      body: JSON.stringify({ id }),
      headers: {
        'Content-Type': 'application/json',
      },
    })
    const data = await response.json()
    handleError(data)

    return data
  }

  const editPet = async (id, pet) => {
    const response = await fetch(`${API_URL_API_FRONTEND}/pets/edit`, {
      method: 'POST',
      body: JSON.stringify({ ...pet, id }),
      headers: {
        'Content-Type': 'application/json',
      },
    })
    const data = await response.json()
    handleError(data)
    if (!data.isError) {
      router.push('/admin/pets/list')
      setMessageSuccess({ message: 'Successfully saved' })
    }
  }

  return {
    pets,
    getAllPets,
    getPetForId,
    addPet,
    editPet,
    petsFiltered,
    setPetsFiltered,
  }
}
