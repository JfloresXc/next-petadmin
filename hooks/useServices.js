import { API_URL_API_FRONTEND } from '@/settings'
import { useState } from 'react'
import { useRouter } from 'next/router'
import { useError } from './useError'
import { setMessageSuccess } from '@/utils/alerts'

export function useServices() {
  const [services, setServices] = useState([])
  const [servicesFiltered, setServicesFiltered] = useState([])
  const { tryCatchReturn, tryCatchAction } = useError()
  const router = useRouter()

  const getAllServices = async () => {
    return tryCatchAction(
      async () => {
        const response = await fetch(
          `${API_URL_API_FRONTEND}/services/getAll`,
          {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
            },
          }
        )
        const data = await response.json()
        return data
      },
      async (data) => {
        setServices(data)
        setServicesFiltered(data)
      }
    )
  }

  const getServiceForId = async (id) => {
    return tryCatchReturn(async () => {
      const response = await fetch(
        `${API_URL_API_FRONTEND}/services/getForId`,
        {
          method: 'POST',
          body: JSON.stringify({ id }),
          headers: {
            'Content-Type': 'application/json',
          },
        }
      )
      const data = await response.json()
      return data
    })
  }

  const addService = async (service) => {
    tryCatchAction(
      async () => {
        const response = await fetch(`${API_URL_API_FRONTEND}/services/add`, {
          method: 'POST',
          body: JSON.stringify(service),
          headers: {
            'Content-Type': 'application/json',
          },
        })
        const data = await response.json()
        return data
      },
      async () => {
        setMessageSuccess({ message: 'Successfully saved' })
        router.push('/admin/services/list')
      }
    )
  }

  const editService = async (id, service) => {
    tryCatchAction(
      async () => {
        const response = await fetch(`${API_URL_API_FRONTEND}/services/edit`, {
          method: 'POST',
          body: JSON.stringify({ ...service, id }),
          headers: {
            'Content-Type': 'application/json',
          },
        })
        const data = await response.json()
        return data
      },
      async () => {
        setMessageSuccess({ message: 'Successfully saved' })
        router.push('/admin/services/list')
      }
    )
  }

  return {
    services,
    getAllServices,
    getServiceForId,
    addService,
    editService,
    servicesFiltered,
    setServicesFiltered,
    setServices,
  }
}
