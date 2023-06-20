import { useState, useEffect } from 'react'
import InputGroup from './Input'
import { useRouter } from 'next/router'
import { useServices } from '@/hooks/useServices'

export default function FormService() {
  const { getServiceForId, addService, editService } = useServices()
  const router = useRouter()
  const id = router.query.id
  const [service, setService] = useState({
    name: '',
    description: '',
    duration: '',
    price: '',
  })

  useEffect(() => {
    if (id) {
      getServiceForId(id).then((service) => {
        setService(service)
      })
    }
  }, [setService])

  const handleSubmit = async (event) => {
    event.preventDefault()

    if (!id) await addService(service)
    else await editService(id, service)
  }

  const handleChange = (event) => {
    const { name, value } = event.target
    setService({ ...service, [name]: value })
  }

  return (
    <>
      <div className="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg bg-blueGray-100 border-0">
        <div className="rounded-t bg-white mb-0 px-6 py-6">
          <div className="text-center flex justify-between">
            <h6 className="text-blueGray-700 text-xl font-bold">
              {id ? 'Editar servicio' : 'Agregar servicio'}
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
                label="Nombre"
                name={'name'}
                placeholder={'Nombre'}
                handleChange={handleChange}
                defaultValue={service.name}
              />
              <InputGroup
                label="Descripción"
                name={'description'}
                placeholder={'Descripción'}
                handleChange={handleChange}
                defaultValue={service.description}
              />
              <InputGroup
                label="Duración"
                name={'duration'}
                placeholder={'Duración'}
                handleChange={handleChange}
                defaultValue={service.duration}
              />
              <InputGroup
                label="Precio"
                name={'price'}
                placeholder={'Precio'}
                handleChange={handleChange}
                type="number"
                defaultValue={service.price}
              />
            </div>
            <button
              className="block w-full mt-5 bg-blueGray-700 active:bg-blueGray-600 text-white font-bold uppercase text-xs px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none ease-linear transition-all duration-150"
              type="submit"
            >
              {id ? 'Editar servicio' : 'Agregar servicio'}
            </button>
          </form>
        </div>
      </div>
    </>
  )
}
