import React, { useEffect, useState } from 'react'
import Link from 'next/link'
import { useCitations } from '@/hooks/useCitations'
import InputSearch from '../forms/InputSearch'
import { useRouter } from 'next/router'
import { usePets } from '@/hooks/usePets'
import DocumentHistorial from '../pdf/DocumentHistorial'
import { PDFDownloadLink, PDFViewer } from '@react-pdf/renderer'

const HEADS = ['', 'Veterinario', 'Fecha', 'Hora', 'Observación', 'Servicios']

export default function ListHistorial() {
  const color = 'light'
  const [show, setShow] = useState(false)
  const {
    citations: data,
    citationsFiltered: dataFiltered,
    getCitationsForPet,
    setCitationsFiltered,
    COLORS,
  } = useCitations()
  const { getPetForId } = usePets()
  const router = useRouter()
  const idRoute = router.query.id
  const [pet, setPet] = useState({})

  useEffect(() => {
    getCitationsForPet({ idPet: idRoute })
    getPetForId(idRoute).then((pet) => {
      setPet(pet)
    })
  }, [])

  return (
    <>
      <div
        className={
          'relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded py-5 ' +
          (color === 'light' ? 'bg-white' : 'bg-blueGray-700 text-white')
        }
      >
        <button className="hidden" onClick={() => setShow(true)}>
          Ver
        </button>
        {show && (
          <PDFViewer style={{ width: '100%', height: '90vh' }}>
            <DocumentHistorial />
          </PDFViewer>
        )}
        <div className="rounded-t mb-0 px-4 py-3 border-0">
          <span className="ml-2 pl-2.5 font-semibold text-xl text-blueGray-700">
            Historial de citas de <b>{pet?.name}</b>
          </span>
          <div className="flex flex-wrap items-center">
            <div className="relative w-full px-4 max-w-full flex-grow flex-1  mt-2">
              <h4 class="text-blueGray-500 my-1 mt-2">
                Raza: <b>{pet?.breed}</b>
              </h4>
              <h4 class="text-blueGray-500  my-1">
                Peso: <b>{pet?.weight} kg</b>
              </h4>
              <h4 class="text-blueGray-500  my-1">
                Información médica: <b>{pet?.medicalInformation}</b>
              </h4>
            </div>
            <div className="relative w-full px-4 max-w-full flex-grow flex-1  mt-2">
              <h4 class="text-blueGray-500 my-1 mt-2">
                Dueño:{' '}
                <b>
                  {pet?.client?.name} {pet?.client?.surname}
                </b>
              </h4>
              <h4 class="text-blueGray-500  my-1">
                Dni: <b>{pet?.client?.dni}</b>
              </h4>
              <h4 class="text-blueGray-500  my-1">
                Teléfono: <b>{pet?.client?.phone}</b>
              </h4>
            </div>
          </div>
        </div>
        <div className="rounded-t mb-0 px-4 py-3 border-0">
          <div className="flex flex-wrap items-center">
            <div className="relative w-full px-2 max-w-full flex-grow flex-1">
              <InputSearch
                items={data}
                setItemsFiltered={setCitationsFiltered}
              />
            </div>
          </div>
        </div>
        <div className="block w-full overflow-x-auto max-h-px">
          {/* Projects table */}
          <table className="items-center w-full bg-transparent border-collapse">
            <thead>
              <tr>
                {HEADS.map((headKey, index) => (
                  <th
                    key={index}
                    className={
                      'px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left ' +
                      (color === 'light'
                        ? 'bg-blueGray-50 text-blueGray-500 border-blueGray-100'
                        : 'bg-blueGray-600 text-blueGray-200 border-blueGray-500')
                    }
                  >
                    {headKey}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {dataFiltered.map &&
                dataFiltered?.map((citation, index) => {
                  const {
                    dateOfAttention,
                    description,
                    vet,
                    state,
                    id,
                    services,
                    hourOfAttention,
                  } = citation
                  return (
                    <tr key={index}>
                      <th className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 ">
                        <Link
                          href={`/admin/citations/${id}`}
                          className="text-blue-500 font-bold uppercase text-xs px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none mr-1 ease-linear transition-all duration-150"
                        >
                          <i className="fas fa-eye"></i>
                        </Link>
                        <PDFDownloadLink
                          document={
                            <DocumentHistorial
                              client={{
                                name: `${pet?.client?.name} ${pet?.client?.surname}`,
                                phone: pet?.client?.phone,
                                dni: pet?.client?.dni,
                              }}
                              pet={pet}
                              citation={{
                                dateOfAttention: dateOfAttention.substring(
                                  0,
                                  10
                                ),
                                hourOfAttention,
                                services: services
                                  ?.map((service) => service.name)
                                  .join(' - '),
                                nameVet: vet?.name,
                              }}
                              observation={description}
                            />
                          }
                          fileName={`historialcitas-${pet?.name}.pdf`}
                        >
                          <button className="text-blue-500 font-bold uppercase text-xs px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none mr-1 ease-linear transition-all duration-150">
                            <i className="fas fa-file-arrow-down"></i>
                          </button>
                        </PDFDownloadLink>
                      </th>
                      <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                        {vet?.name}
                      </td>
                      <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs  p-4">
                        <p style={{ maxWidth: '400px' }}>
                          {dateOfAttention.substring(0, 10)}
                        </p>
                      </td>
                      <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs  p-4">
                        <p style={{ maxWidth: '400px' }}>{hourOfAttention}</p>
                      </td>
                      <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs  p-4">
                        <p style={{ maxWidth: '400px' }}>{description}</p>
                      </td>
                      <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                        {services?.map((service, index) => (
                          <div className="flex items-center" key={index}>
                            <i
                              className={`fas fa-circle text-${COLORS[state]}-500 mr-2`}
                            ></i>
                            {service?.name}
                          </div>
                        ))}
                      </td>
                    </tr>
                  )
                })}
            </tbody>
          </table>
        </div>
      </div>
    </>
  )
}
