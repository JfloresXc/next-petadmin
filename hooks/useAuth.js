import { useContext } from 'react'
import { useRouter } from 'next/router'

import { AuthContext } from '@/contexts/AuthContext'
import { API_URL_API_FRONTEND } from '@/settings/index'
import { handleError } from '@/utils/error'

const HEADERS = { 'Content-Type': 'application/json' }

export const useAuth = () => {
  const { jwt, setJwt } = useContext(AuthContext)
  const router = useRouter()

  const login = async ({ email, password }) => {
    try {
      const URL = `${API_URL_API_FRONTEND}/auth/login`
      const response = await fetch(URL, {
        method: 'POST',
        headers: HEADERS,
        body: JSON.stringify({ email, password })
      })
      const data = await response.json()
      const { isError } = handleError(data)

      if (isError) return

      const { token } = data
      setJwt(token)
      window.localStorage.setItem('jwt', token)
      router.push('admin/settings')
    } catch (error) {
      console.error(error)
    }
  }

  const logout = async () => {
    try {
      await fetch(`${API_URL_API_FRONTEND}/auth/logout`, {
        method: 'GET'
      })

      window.localStorage.removeItem('jwt')
      window.localStorage.removeItem('publications')
      window.localStorage.removeItem('collections')
      setJwt(null)
      router.push('login')
    } catch (error) {
      console.error(error)
    }
  }

  return {
    isLogged: Boolean(jwt),
    jwt,
    setJwt,
    login,
    logout,
    HEADERS: { ...HEADERS, Authorization: `Bearer ${jwt}` }
  }
}
