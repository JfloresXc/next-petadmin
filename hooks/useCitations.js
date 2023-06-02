import { API_URL_API_FRONTEND } from '@/settings'
import { handleError } from '@/utils/error'
import { useState } from 'react'
import { useRouter } from 'next/router'
import { useError } from './useError'

export function useCitations () {
  const STATES = ['', 'Pendiente', 'Atendido', 'Cancelado', 'Reprogramado']
  const COLORS = ['', 'orange', 'emerald', 'red', 'lightBlue']
  const [citations, setCitations] = useState([])
  const [citationsFiltered, setCitationsFiltered] = useState([])
  const { tryCatchReturn, tryCatchAction } = useError()
  const router = useRouter()

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
      setCitations(data)
      setCitationsFiltered(data)
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
    if (!data.isError) router.push('/admin/citations/list')
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
      router.push('/admin/citations/')
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
    STATES,
    COLORS
  }
}
