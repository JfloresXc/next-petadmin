import React, { useEffect } from 'react'
import Link from 'next/link'
import { useCitations } from '@/hooks/useCitations'
import InputSearch from '../forms/InputSearch'

const HEADS = ['', 'Mascota', 'Veterinario', 'Día de atención', 'Hora de atención', 'Estado']

export default function ListOfCitations () {
  const color = 'light'
  const {
    citations: data,
    citationsFiltered: dataFiltered,
    getAllCitations,
    setCitationsFiltered,
    COLORS,
    STATES
  } = useCitations()

  useEffect(() => {
    getAllCitations()
  }, [])

  return (
    <>
      <div
        className={
          'relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded py-5 ' +
          (color === 'light' ? 'bg-white' : 'bg-blueGray-700 text-white')
        }
      >
        <div className="rounded-t mb-0 px-4 py-3 border-0">
          <div className="flex flex-wrap items-center">
            <div className="relative w-full px-4 max-w-full flex-grow flex-1">
              <h3
                className={
                  'font-semibold text-lg ' +
                  (color === 'light' ? 'text-blueGray-700' : 'text-white')
                }
              >
                Lista de citas
              </h3>
            </div>
            <div>
              <Link
                href="/admin/citations/add"
                className="bg-indigo-500 text-white active:bg-indigo-600 text-xs font-bold uppercase px-3 py-1 rounded outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
              >
                Agregar cita
              </Link>
            </div>
          </div>
        </div>
        <div className="rounded-t mb-0 px-4 py-3 border-0">
          <div className="flex flex-wrap items-center">
            <div className="relative w-full px-2 max-w-full flex-grow flex-1">
                <InputSearch items={data} setItemsFiltered={setCitationsFiltered}/>
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
              {dataFiltered.map && dataFiltered?.map((citation, index) => {
                const {
                  dateOfAttention,
                  hourOfAttention,
                  pet,
                  vet,
                  state,
                  id
                } = citation
                return <tr key={index}>
                <th className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 ">
                  <Link
                    href={`/admin/citations/${id}`}
                    className="text-blue-500 font-bold uppercase text-xs px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none mr-1 ease-linear transition-all duration-150"
                  >
                    <i className="fas fa-eye"></i>
                  </Link>
                </th>
                <th className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 ">
                    {pet?.name}
                </th>
                <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                    {vet?.name}
                </td>
                <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                  {dateOfAttention.substring(0, 10)}
                </td>
                <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                  <div className="flex">
                    {hourOfAttention}
                  </div>
                </td>
                <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                  <div className="flex items-center">
                    <i className={`fas fa-circle text-${COLORS[state]}-500 mr-2`}></i>
                    {STATES[state]}
                  </div>
                </td>
              </tr>
              })}
            </tbody>
          </table>
        </div>
      </div>
    </>
  )
}
