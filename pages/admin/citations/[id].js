import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import Admin from '@/layouts/Admin'
import { useCitations } from '@/hooks/useCitations'
import Link from 'next/link'
import Textarea from '@/components/forms/TextArea'

function CitationDetail() {
  const {
    getCitationForId,
    cancelCitation,
    attentCitation,
    rescheduleCitation,
    editDescription,
    STATES,
  } = useCitations()
  const HEADERS_SERVICES = ['Nombre', 'Precio', 'Duración']
  const router = useRouter()
  const id = router.query.id
  const [citation, setCitation] = useState({})
  const [description, setDescription] = useState('')
  const { state } = citation

  useEffect(() => {
    if (id) {
      getCitation({ id })
    }
  }, [setCitation])

  const handleChangeDescription = (e) => {
    setDescription(e.target.value)
  }

  const getCitation = async ({ id }) => {
    getCitationForId(id).then((citation) => {
      if (citation) {
        setCitation(citation)
        setDescription(citation?.description)
      }
    })
  }

  const updateDescription = async (event) => {
    event.preventDefault()
    await editDescription(id, description)
  }

  const attent = async () => {
    await attentCitation(id)
    await getCitation({ id })
  }

  const cancel = async () => {
    await cancelCitation(id)
    await getCitation({ id })
  }

  return (
    <>
      <div className="block w-full overflow-x-auto max-h-px">
        <div className="relative flex flex-col min-w-0 break-words bg-white rounded mb-6 xl:mb-0 shadow-lg">
          <div className="flex-auto p-4">
            <div className="flex flex-wrap">
              <div className="relative w-full pr-4 max-w-full flex-grow flex-1">
                <h5 className="text-blueGray-400 uppercase font-bold text-xs mb-3">
                  Detalle de cita
                </h5>
                <span className="font-semibold text-xl text-blueGray-700">
                  Cita de {citation?.pet?.name}
                </span>
                <span className="ml-3 font-semibold text-sm text-white p-1 px-2 bg-indigo-500 rounded">
                  {STATES[citation.state]}
                </span>
              </div>
            </div>
            <div className="text-sm text-blueGray-400 mt-4">
              <ul class="list-none mt-6">
                <li class="py-2">
                  <div class="flex items-center">
                    <div>
                      <span class="text-xs font-semibold inline-block py-1 px-2 uppercase rounded-full text-blueGray-500 bg-blueGray-100 mr-3">
                        <i class="fas fa-fingerprint"></i>
                      </span>
                    </div>
                    <div>
                      <h4 class="text-blueGray-500">
                        <b>Veterinario asignado: </b>
                        {citation?.vet?.name} {citation?.vet?.surname}
                      </h4>
                    </div>
                  </div>
                </li>
                <li class="py-2">
                  <div class="flex items-center">
                    <div>
                      <span class="text-xs font-semibold inline-block py-1 px-2 uppercase rounded-full text-blueGray-500 bg-blueGray-100 mr-3">
                        <i class="fas fa-fingerprint"></i>
                      </span>
                    </div>
                    <div>
                      <h4 class="text-blueGray-500">
                        <b>Fecha de atención: </b>
                        {citation?.dateOfAttention?.substring(0, 10)}
                      </h4>
                    </div>
                  </div>
                </li>
                <li class="py-2">
                  <div class="flex items-center">
                    <div>
                      <span class="text-xs font-semibold inline-block py-1 px-2 uppercase rounded-full text-blueGray-500 bg-blueGray-100 mr-3">
                        <i class="fab fa-html5"></i>
                      </span>
                    </div>
                    <div>
                      <h4 class="text-blueGray-500">
                        <b>Hora de atención: </b>
                        {citation.hourOfAttention}
                      </h4>
                    </div>
                  </div>
                </li>
                <li class="py-2">
                  <div class="flex items-center">
                    <div>
                      <span class="text-xs font-semibold inline-block py-1 px-2 uppercase rounded-full text-blueGray-500 bg-blueGray-100 mr-3">
                        <i class="far fa-paper-plane"></i>
                      </span>
                    </div>
                    <div>
                      <h4 class="text-blueGray-500">
                        <b>Motivo: </b>
                        {citation.reasonOfCitation}
                      </h4>
                    </div>
                  </div>
                </li>
                <li class="py-4">
                  <h4 class="text-blueGray-500 mr-4 mb-4">
                    <b>Lista de servicios: </b>{' '}
                  </h4>
                  <div class="flex items-center">
                    <table className="w-full">
                      <thead>
                        <tr>
                          {HEADERS_SERVICES.map((headKey, index) => (
                            <th
                              key={index}
                              className={
                                'px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left '
                              }
                            >
                              {headKey}
                            </th>
                          ))}
                        </tr>
                      </thead>
                      <tbody>
                        {citation?.services?.map &&
                          citation?.services?.map((service, index) => {
                            const { name, price, duration } = service
                            return (
                              <tr key={index} className="service-row w-full">
                                <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 ">
                                  {name}
                                </td>
                                <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                                  {price}
                                </td>
                                <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                                  {duration}
                                </td>
                              </tr>
                            )
                          })}
                      </tbody>
                    </table>
                  </div>
                </li>
              </ul>
            </div>
            <p className="text-sm text-blueGray-400 mt-4">
              <span className={'text-emerald-500 mr-2'}>
                <i className="fas fa-arrow-up"></i> La especilidad es{' '}
                {citation.speciality}
              </span>
            </p>
          </div>
          <div className={state !== 1 && 'hidden'}>
            <div className="relative w-auto pl-4 flex-initial mt-3 mb-5">
              <button onClick={attent}>
                <div
                  className={
                    'text-white p-3 text-center inline-flex items-center justify-center h-12 shadow-lg bg-emerald-500 mr-3 rounded mt-3'
                  }
                >
                  Atender
                </div>
              </button>
              <button onClick={cancel}>
                <div
                  className={
                    'text-white p-3 text-center inline-flex items-center justify-center h-12 shadow-lg bg-red-500 mr-3 rounded'
                  }
                >
                  Cancelar
                </div>
              </button>
              <button onClick={async () => await rescheduleCitation(id)}>
                <div
                  className={
                    'text-white p-3 text-center inline-flex items-center justify-center h-12 shadow-lg bg-teal-500 mr-3 rounded'
                  }
                >
                  Reprogramar
                </div>
              </button>
              <button>
                <Link
                  href={`/admin/citations/edit/${id}`}
                  className={
                    'text-white p-3 text-center inline-flex items-center justify-center h-12 shadow-lg bg-blueGray-400 mr-3 rounded mt-3'
                  }
                >
                  Editar
                </Link>
              </button>
            </div>
          </div>

          <div className={state !== 2 && 'hidden'}>
            <form onSubmit={updateDescription}>
              <div className="flex flex-wrap mt-3 p-3">
                <Textarea
                  label="Observación"
                  name={'reasonOfCitation'}
                  placeholder={'Motivo'}
                  handleChange={handleChangeDescription}
                  defaultValue={citation?.description}
                  widthFlex="100"
                />
                <button
                  className="block ml-3 bg-blueGray-700 active:bg-blueGray-600 text-white font-bold uppercase text-xs px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none ease-linear transition-all duration-150"
                  type="submit"
                >
                  Actualizar observación
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  )
}

export default function PageCitationDetail() {
  return (
    <>
      <div className="flex flex-wrap">
        <div className="w-full  px-4">
          <CitationDetail />
        </div>
      </div>
    </>
  )
}

PageCitationDetail.layout = Admin
