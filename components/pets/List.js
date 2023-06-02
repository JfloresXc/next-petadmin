import React, { useEffect } from 'react'
import RowDropdown from '../Dropdowns/RowDropdown'
import Link from 'next/link'
import { usePets } from '@/hooks/usePets'
import InputSearch from '../forms/InputSearch'

const HEADS = ['Nombre', 'Información médica', 'Fecha de Cumpleaños', 'Nombre de cliente', 'Raza', 'Peso']

export default function ListOfPets () {
  const color = 'light'
  const {
    pets: data,
    petsFiltered: dataFiltered,
    getAllPets,
    setPetsFiltered
  } = usePets()

  useEffect(() => {
    getAllPets()
  }, [])

  return (
    <>
      <div
        className={
          'relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded ' +
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
                Lista de mascotas
              </h3>
            </div>
            <div>
              <Link
                href="/admin/pets/add"
                className="bg-blueGray-700 active:bg-blueGray-600 text-white font-bold uppercase text-xs px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none mr-1 ease-linear transition-all duration-150"
                type="button"
                >
                Agregar mascota
                </Link>
            </div>
          </div>
        </div>
        <div className="rounded-t mb-0 px-4 py-3 border-0">
          <div className="flex flex-wrap items-center">
            <div className="relative w-full px-4 max-w-full flex-grow flex-1">
                <InputSearch items={data} setItemsFiltered={setPetsFiltered}/>
            </div>
          </div>
        </div>
        <div className="block w-full overflow-x-auto max-h-px">
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
              {dataFiltered.map && dataFiltered?.map((pet, index) => {
                const {
                  name,
                  medicalInformation,
                  birthdate,
                  client,
                  breed,
                  weight,
                  id
                } = pet
                return <tr key={index}>
                <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 ">
                    {name}
                </td>
                <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                    {medicalInformation}
                </td>
                <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                  {birthdate.substring(0, 10)}
                </td>
                <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                  <div className="flex">
                    {client.name}
                  </div>
                </td>
                <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                  <div className="flex items-center">
                    {breed}
                  </div>
                </td>
                <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                  <div className="flex items-center">
                    {weight}
                  </div>
                </td>
                <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-right">
                  <RowDropdown linkEdit={`/admin/pets/${id}`} />
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
