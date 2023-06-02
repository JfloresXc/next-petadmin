import { useContext } from 'react'
import { AuthContext } from '@/contexts/AuthContext'

export const useLoading = () => {
  const { loading, setLoading } = useContext(AuthContext)

  const showLoading = () => setLoading(true)

  const hideLoading = () => setLoading(false)

  return {
    isLoading: Boolean(loading),
    showLoading,
    hideLoading
  }
}
