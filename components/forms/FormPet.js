import { useState, useEffect } from 'react'
import InputGroup from './Input'
import Textarea from './TextArea'
import { useClients } from '@/hooks/useClients'
import { useRouter } from 'next/router'
import Select from './Select'
import { usePets } from '@/hooks/usePets'

export default function FormPet () {
  const { getAllClients, clients } = useClients()
  const { getPetForId, addPet, editPet } = usePets()
  const router = useRouter()
  const id = router.query.id
  const [pet, setPet] = useState({
    name: '',
    surname: '',
    birthdate: '',
    specie: '',
    breed: '',
    weight: '',
    medicalInformation: '',
    address: '',
    idClient: ''
  })

  useEffect(() => {
    getAllClients().then((clients) => {
      if (id) {
        getPetForId(id)
          .then((pet) => {
            pet.idClient = pet.client.id
            setPet(pet)
          })
      } else {
        setPet((petBefore) => ({ ...petBefore, idClient: clients[0]?.id }))
      }
    })
  }, [setPet])

  const handleSubmit = async (event) => {
    event.preventDefault()

    if (!id) await addPet(pet)
    else await editPet(id, pet)
  }

  const handleChange = (event) => {
    const { name, value } = event.target
    setPet({ ...pet, [name]: value })
  }

  return (
    <>
        <div className="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg bg-blueGray-100 border-0">
            <div className="rounded-t bg-white mb-0 px-6 py-6">
            <div className="text-center flex justify-between">
                <h6 className="text-blueGray-700 text-xl font-bold">
                    {id ? 'Editar mascota' : 'Agregar mascota'}
                </h6>
            </div>
            </div>
            <div className="flex-auto px-4 lg:px-10 py-10 pt-0">
            <form onSubmit={handleSubmit}>
                <h6 className="text-blueGray-400 text-sm mt-3 mb-6 font-bold uppercase">
                    Sus datos
                </h6>
                <div className="flex flex-wrap">
                <InputGroup
                    label='Nombre'
                    name={'name'}
                    placeholder={'Nombre'}
                    handleChange={handleChange}
                    defaultValue={pet.name}
                />
                <InputGroup
                    label='Apellidos'
                    name={'surname'}
                    placeholder={'Apellidos'}
                    handleChange={handleChange}
                    defaultValue={pet.surname}
                />
                <InputGroup
                    label='Fecha de cumpleaños'
                    name={'birthdate'}
                    placeholder={'Fecha de cumpleaños'}
                    handleChange={handleChange}
                    type='date'
                    defaultValue={pet.birthdate.substring(0, 10)}
                />
                <InputGroup
                    label='Especie'
                    name={'specie'}
                    placeholder={'Especie'}
                    handleChange={handleChange}
                    defaultValue={pet.specie}
                />
                <InputGroup
                    label='Raza'
                    name={'breed'}
                    placeholder={'Raza'}
                    handleChange={handleChange}
                    defaultValue={pet.breed}
                />
                <InputGroup
                    label='Peso kg.'
                    name={'weight'}
                    placeholder={'Peso'}
                    handleChange={handleChange}
                    defaultValue={pet.weight}
                    type='number'
                />

                <InputGroup
                    label='Dirección de contacto'
                    name={'address'}
                    placeholder={'Dirección de contacto'}
                    handleChange={handleChange}
                    defaultValue={pet.address}
                />

                <Select
                    label='Dueño'
                    name={'idClient'}
                    placeholder={'Dueño'}
                    handleChange={handleChange}
                    defaultValue={pet.client}
                    items={clients.map((clientKey) => ({ ...clientKey, name: clientKey.fullName }))}
                />

                <Textarea
                    label='Información médica'
                    name={'medicalInformation'}
                    placeholder={'Información médica'}
                    handleChange={handleChange}
                    defaultValue={pet.medicalInformation}
                />

                </div>
                <button
                className='block w-full mt-5 bg-blueGray-700 active:bg-blueGray-600 text-white font-bold uppercase text-xs px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none ease-linear transition-all duration-150'
                type='submit'
                >
                   {id ? 'Editar mascota' : 'Agregar mascota'}
                </button>
            </form>
            </div>
        </div>
    </>
  )
}
