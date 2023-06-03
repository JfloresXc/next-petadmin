import { useAuth } from '@/hooks/useAuth'
import { useState } from 'react'
// import Button from '../button'
import Button from '../landing-pages/Button'

export default function FormLogin () {
  const [credentials, setCredentials] = useState({
    email: '',
    password: ''
  })
  const { email, password } = credentials
  const { login, isLoading } = useAuth()

  const handleSubmit = async (event) => {
    event.preventDefault()
    if (isLoading) return

    await login({ email, password })
  }

  const handleChange = (event) => {
    const { name, value } = event.target
    setCredentials({ ...credentials, [name]: value })
  }

  return (
    <>
      <form onSubmit={handleSubmit}>
          <div className="relative w-full mb-3">
          <label
              className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
              htmlFor="grid-password"
          >
              Correo electrónico
          </label>
          <input
              type="email"
              name='email'
              onChange={handleChange}
              className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
              placeholder="Email"
          />
          </div>

          <div className="relative w-full mb-3">
          <label
              className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
              htmlFor="grid-password"
          >
              Contraseña
          </label>
          <input
              type="password"
              name='password'
              onChange={handleChange}
              className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
              placeholder="Password"
          />
          </div>
          <div>
          <label className="inline-flex items-center cursor-pointer">
              <input
              id="customCheckLogin"
              type="checkbox"
              className="form-checkbox rounded text-blueGray-700 ml-1 w-5 h-5 ease-linear transition-all duration-150"
              />
              <span className="ml-2 text-sm font-semibold text-blueGray-600">
              Recuérdame
              </span>
          </label>
          </div>

          <div className="text-center mt-6">
              <Button
                label={isLoading ? 'Cargando...' : 'Iniciar sesión'}
                type='subtmit'
                full={true}
              />
          </div>
      </form>
      <style jsx>{`
          .form-checkbox{
            border: 2px solid rgba(71, 85, 105, var(--tw-bg-opacity));
          }
        `}
      </style>
    </>
  )
}
