import { API_URL_API_FRONTEND } from '@/settings'
import { handleError } from '@/utils/error'
import { useState } from 'react'
import { useRouter } from 'next/router'
import { useError } from './useError'
import { compareDates } from '@/utils/dates'
import { setMessageSuccess } from '@/utils/alerts'

export function useCitations () {
  const STATES = ['', 'Pendiente', 'Atendido', 'Cancelado', 'Reprogramado']
  const COLORS = ['', 'orange', 'emerald', 'red', 'lightBlue']
  const [citations, setCitations] = useState([])
  const [citationsFiltered, setCitationsFiltered] = useState([])
  const { tryCatchReturn, tryCatchAction } = useError()
  const router = useRouter()

  const setFilterToData = (data) => {
    const dataFiltered = data.map((item) => {
      return {
        ...item,
        petName: item.pet.name + ' ' + item.pet.surname,
        vetName: item.vet.name + ' ' + item.vet.surname
      }
    })
    setCitationsFiltered(dataFiltered)
    setCitations(dataFiltered)
  }

  const getAllCitations = async () => {
    return tryCatchAction(async () => {
      const response = await fetch(`${API_URL_API_FRONTEND}/citations/getAll`,
        {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json'
          }
        })
      const data = await response.json()
      return data
    }, async (data) => {
      setFilterToData(data)
    })
  }

  const addCitation = async (citation) => {
    const response = await fetch(`${API_URL_API_FRONTEND}/citations/add`,
      {
        method: 'POST',
        body: JSON.stringify(citation),
        headers: {
          'Content-Type': 'application/json'
        }
      })
    const data = await response.json()
    handleError(data)
    if (!data.isError) {
      setMessageSuccess({ message: 'Successfully saved' })
      router.push('/admin/citations/list')
    }
  }

  const getCitationForId = async (id) => {
    return tryCatchReturn(async () => {
      const response = await fetch(`${API_URL_API_FRONTEND}/citations/getForId`,
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

  const validateDateOfAttention = async ({ id, dateOfAttention, hourOfAttention }) => {
    return tryCatchReturn(async () => {
      if (dateOfAttention === '') return { isError: true, message: 'The date of attention is obligatory' }
      if (hourOfAttention === '') return { isError: true, message: 'The hour of attention is obligatory ' }

      const bandDate = compareDates({ firstDate: new Date(), secondDate: new Date(dateOfAttention) })
      if (bandDate === 1) return { isError: true, message: 'The date of attention cannot be less than the real date' }

      const response = await fetch(`${API_URL_API_FRONTEND}/citations/validateDateOfAttention`,
        {
          method: 'POST',
          body: JSON.stringify({ id, dateOfAttention, hourOfAttention }),
          headers: {
            'Content-Type': 'application/json'
          }
        })
      const data = await response.json()
      return data
    })
  }

  const editCitation = async (id, citation) => {
    tryCatchAction(async () => {
      const response = await fetch(`${API_URL_API_FRONTEND}/citations/edit`,
        {
          method: 'POST',
          body: JSON.stringify({ ...citation, id }),
          headers: {
            'Content-Type': 'application/json'
          }
        })
      const data = await response.json()
      return data
    }, (data) => {
      setMessageSuccess({ message: 'Successfully saved' })
      router.push('/admin/citations/list')
    })
  }

  const editStateCitation = async ({ id, state }) => {
    tryCatchAction(async () => {
      const response = await fetch(`${API_URL_API_FRONTEND}/citations/editState`,
        {
          method: 'POST',
          body: JSON.stringify({ id, state }),
          headers: {
            'Content-Type': 'application/json'
          }
        })
      const data = await response.json()
      return data
    }, async () => {
      router.push('/admin/citations/list')
    })
  }

  const rescheduleCitation = async (id) => {
    tryCatchAction(async () => {
      const response = await fetch(`${API_URL_API_FRONTEND}/citations/reschedule`,
        {
          method: 'POST',
          body: JSON.stringify({ id }),
          headers: {
            'Content-Type': 'application/json'
          }
        })
      const data = await response.json()
      return data
    }, async (response) => {
      router.push('/admin/citations/edit/' + response.id)
    })
  }

  const cancelCitation = async (id) => {
    await editStateCitation({ id, state: '3' })
  }

  const attentCitation = async (id) => {
    await editStateCitation({ id, state: '2' })
  }

  return {
    citations,
    citationsFiltered,
    setCitationsFiltered,
    getAllCitations,
    getCitationForId,
    addCitation,
    editCitation,
    cancelCitation,
    attentCitation,
    rescheduleCitation,
    validateDateOfAttention,
    STATES,
    COLORS
  }
}
