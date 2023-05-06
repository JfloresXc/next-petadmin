import { useAuth } from '@/hooks/useAuth'
import { useState } from 'react'
import Button from '../button'

export default function FormLogin () {
  const [credentials, setCredentials] = useState({
    email: '',
    password: ''
  })
  const { email, password } = credentials
  const { login } = useAuth()

  const handleSubmit = async (event) => {
    event.preventDefault()
    await login({ email, password })
  }

  const handleChange = (event) => {
    const { name, value } = event.target
    setCredentials({ ...credentials, [name]: value })
  }

  return (
    <form onSubmit={handleSubmit}>
        <div className="relative w-full mb-3">
        <label
            className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
            htmlFor="grid-password"
        >
            Email
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
            Password
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
            className="form-checkbox border-0 rounded text-blueGray-700 ml-1 w-5 h-5 ease-linear transition-all duration-150"
            />
            <span className="ml-2 text-sm font-semibold text-blueGray-600">
            Remember me
            </span>
        </label>
        </div>

        <div className="text-center mt-6">
            <Button label="Iniciar sesión" type='subtmit' design='bluegray-800' full={true}/>
        </div>
    </form>
  )
}
