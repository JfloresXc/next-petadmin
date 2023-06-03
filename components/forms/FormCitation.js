import { useEffect, useState } from 'react'
import InputGroup from './Input'
import Select from './Select'
import Textarea from './TextArea'
import { usePets } from '@/hooks/usePets'
import { useVets } from '@/hooks/useVets'
import { useRouter } from 'next/router'
import { useCitations } from '@/hooks/useCitations'

export default function FormCitation () {
  const { pets, getAllPets } = usePets()
  const { vets, getAllVets } = useVets()
  const {
    addCitation,
    getCitationForId,
    editCitation,
    validateDateOfAttention
  } = useCitations()
  const [citation, setCitation] = useState({
    speciality: '',
    description: '',
    reasonOfCitation: '',
    dateOfAttention: '',
    hourOfAttention: '',
    id: '',
    idPet: '',
    idVet: ''
  })
  const [isReprogrammed, setReprogrammed] = useState(false)
  const router = useRouter()
  const idRoute = router.query.id
  const {
    speciality = '',
    description = '',
    reasonOfCitation = '',
    dateOfAttention = '',
    hourOfAttention = '',
    id = '-1',
    idPet = '',
    idVet = ''
  } = citation

  useEffect(() => {
    getAllPets().then((pets) => {
      getAllVets().then((vets) => {
        if (idRoute) {
          getCitationForId(idRoute)
            .then((citation) => {
              citation.idPet = citation.pet.id
              citation.idVet = citation.vet.id
              if (citation) setCitation(citation)
              if (citation.reprogrammedCitationFather !== '-1') setReprogrammed(true)
            })
        } else {
          setCitation((citationBefore) => ({
            ...citationBefore,
            idPet: pets[0]?.id,
            idVet: vets[0]?.id
          }))
        }
      })
    })
  }, [])

  const handleSubmit = async (event) => {
    event.preventDefault()

    const response = await validateDateOfAttention({
      id,
      dateOfAttention,
      hourOfAttention
    })

    if (response.isError) return

    if (id === -1) addCitation(citation)
    else editCitation(id, citation)
  }

  const handleChange = (event) => {
    const { name, value } = event.target
    setCitation({ ...citation, [name]: value })
  }

  return (
    <>
        <div className="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg bg-blueGray-100 border-0">
            <div className="rounded-t bg-white mb-0 px-6 py-6">
            <div className="text-center flex justify-between">
                <h6 className="text-blueGray-700 text-xl font-bold">
                    {id
                      ? (isReprogrammed ? 'Reprogramar' : 'Editar')
                      : 'Agregar'} cita
                </h6>
            </div>
            </div>
            <div className="flex-auto px-4 lg:px-10 py-10 pt-0">
            <form onSubmit={handleSubmit}>
                <h6 className="text-blueGray-400 text-sm mt-3 mb-6 font-bold uppercase">
                    Datos de la mascota
                </h6>
                <div className="flex flex-wrap">
                    <Select
                        label='Mascota'
                        name={'idPet'}
                        handleChange={handleChange}
                        defaultValue={idPet}
                        items={pets}
                        disabled={isReprogrammed}
                    />
                    <Textarea
                        label='Motivo'
                        name={'reasonOfCitation'}
                        placeholder={'Motivo'}
                        handleChange={handleChange}
                        defaultValue={reasonOfCitation}
                        disabled={isReprogrammed}
                    />
                </div>

                <hr className="mt-6 border-b-1 border-blueGray-300" />

                <h6 className="text-blueGray-400 text-sm mt-3 mb-6 mt-2 font-bold uppercase">
                    Datos de atención
                </h6>
                <div className="flex flex-wrap">
                    <InputGroup
                        label='Fecha de atención'
                        name={'dateOfAttention'}
                        placeholder={'Fecha de atención'}
                        handleChange={handleChange}
                        defaultValue={dateOfAttention.substring(0, 10)}
                        type='date'
                    />
                    <InputGroup
                        label='Hora de atención'
                        name={'hourOfAttention'}
                        placeholder={'Hora de atención'}
                        handleChange={handleChange}
                        defaultValue={hourOfAttention}
                        type='time'
                    />
                    <Select
                        label='Veterinario'
                        name={'idVet'}
                        handleChange={handleChange}
                        defaultValue={idVet}
                        items={vets}
                    />
                    <InputGroup
                        label='Especialidad'
                        name={'speciality'}
                        placeholder={'Especialidad'}
                        handleChange={handleChange}
                        defaultValue={speciality}
                        disabled={isReprogrammed}
                    />
                </div>

                <hr className="mt-6 border-b-1 border-blueGray-300" />

                <h6 className="text-blueGray-400 text-sm mt-3 mb-6 font-bold uppercase">
                    Datos adicionales
                </h6>
                <div className="flex flex-wrap">
                    <Textarea
                        name={'description'}
                        placeholder={'Datos adicionales'}
                        handleChange={handleChange}
                        defaultValue={description}
                        widthFlex='100'
                    />
                </div>
                <button
                    className='block w-full mt-5 bg-blueGray-700 active:bg-blueGray-600 text-white font-bold uppercase text-xs px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none ease-linear transition-all duration-150'
                    type='submit'
                >
                  {id
                    ? (isReprogrammed ? 'Reprogramar' : 'Editar')
                    : 'Agregar'} cita
                </button>
            </form>
            </div>
        </div>
    </>
  )
}
