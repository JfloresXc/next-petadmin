import React, { useEffect, useState } from 'react'

const Context = React.createContext({})

export default function AuthContext ({ children }) {
  const [jwt, setJwt] = useState('')
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const token = window.localStorage.getItem('jwt')
    setJwt(token)
  }, [])

  return (
    <Context.Provider value={{ jwt, setJwt, loading, setLoading }}>
      {children}
    </Context.Provider>
  )
}

export { Context as AuthContext }
