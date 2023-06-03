import { useState, useEffect } from 'react'
import InputGroup from './Input'
import { useVets } from '@/hooks/useVets'
import { useRouter } from 'next/router'
import { setMessageSuccess } from '@/utils/alerts'

export default function FormVet () {
  const { addVet, getVetForId, editVet } = useVets()
  const router = useRouter()
  const id = router.query.id
  const [vet, setVet] = useState({
    name: '',
    surname: '',
    birthdate: '',
    dni: '',
    email: '',
    phone: ''
  })

  useEffect(() => {
    if (id) {
      getVetForId(id)
        .then((vet) => {
          if (vet) setVet(vet)
        })
    }
  }, [setVet])

  const handleSubmit = async (event) => {
    event.preventDefault()

    if (!id) await addVet(vet)
    else await editVet(id, vet)

    setMessageSuccess({ message: 'Successfully saved' })
  }

  const handleChange = (event) => {
    const { name, value } = event.target
    setVet({ ...vet, [name]: value })
  }

  return (
    <>
        <div className="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg bg-blueGray-100 border-0">
            <div className="rounded-t bg-white mb-0 px-6 py-6">
            <div className="text-center flex justify-between">
                <h6 className="text-blueGray-700 text-xl font-bold">
                    {id ? 'Editar veterinario' : 'Agregar veterinario'}
                </h6>
            </div>
            </div>
            <div className="flex-auto px-4 lg:px-10 py-10 pt-0">
            <form onSubmit={handleSubmit}>
                <h6 className="text-blueGray-400 text-sm mt-3 mb-6 font-bold uppercase">
                Datos personales
                </h6>
                <div className="flex flex-wrap">
                <InputGroup
                    label='Nombre'
                    name={'name'}
                    placeholder={'Nombre'}
                    handleChange={handleChange}
                    defaultValue={vet.name}
                />
                <InputGroup
                    label='Apellidos'
                    name={'surname'}
                    placeholder={'Apellidos'}
                    handleChange={handleChange}
                    defaultValue={vet.surname}
                />
                <InputGroup
                    label='Fecha de cumpleaños'
                    name={'birthdate'}
                    placeholder={'Fecha de cumpleaños'}
                    handleChange={handleChange}
                    type='date'
                    defaultValue={vet.birthdate.substring(0, 10)}
                />
                <InputGroup
                    label='Dni'
                    name={'dni'}
                    placeholder={'Dni'}
                    handleChange={handleChange}
                    defaultValue={vet.dni}
                />
                <InputGroup
                    label='Correo electrónico'
                    name={'email'}
                    placeholder={'Correo electrónico'}
                    handleChange={handleChange}
                    defaultValue={vet.email}
                />
                <InputGroup
                    label='Telefono'
                    name={'phone'}
                    placeholder={'Telefono'}
                    handleChange={handleChange}
                    defaultValue={vet.phone}
                />

                </div>
                <button
                    className='block w-full mt-5 bg-blueGray-700 active:bg-blueGray-600 text-white font-bold uppercase text-xs px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none ease-linear transition-all duration-150'
                    type='submit'
                >
                   {id ? 'Editar veterinario' : 'Agregar veterinario'}
                </button>
            </form>
            </div>
        </div>
    </>
  )
}
