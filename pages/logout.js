import { useAuth } from '@/hooks/useAuth'
import Admin from '@/layouts/Admin'
import { useEffect } from 'react'

function Error404 () {
  const { logout } = useAuth()

  useEffect(() => {
    logout()
  })

  return <div />
}

Error404.layout = Admin

export default Error404
