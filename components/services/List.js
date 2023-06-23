import React, { useEffect } from 'react'
import RowDropdown from '../Dropdowns/RowDropdown'
import { useServices } from '@/hooks/useServices'
import InputSearch from '../forms/InputSearch'
import ButtonAdmin from '../button/ButtonAdmin'

const HEADS = ['Nombre', 'Descripción', 'Duración', 'Precio']

export default function ListOfServices() {
  const color = 'light'
  const {
    services: data,
    servicesFiltered: dataFiltered,
    getAllServices,
    setServicesFiltered,
  } = useServices()

  useEffect(() => {
    getAllServices()
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
                Lista de servicios
              </h3>
            </div>
            <div>
              <ButtonAdmin
                href="/admin/services/add"
                label="Agregar servicio"
              />
            </div>
          </div>
        </div>
        <div className="rounded-t mb-0 px-4 py-3 border-0">
          <div className="flex flex-wrap items-center">
            <div className="relative w-full px-2 max-w-full flex-grow flex-1">
              <InputSearch
                items={data}
                setItemsFiltered={setServicesFiltered}
              />
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
              {dataFiltered.map &&
                dataFiltered?.map((service, index) => {
                  const { id, name, description, duration, price } = service
                  return (
                    <tr key={index}>
                      <th className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 ">
                        {name}
                      </th>
                      <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                        {description}
                      </td>
                      <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                        <div className="flex">{duration}</div>
                      </td>
                      <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                        <div className="flex items-center">{price}</div>
                      </td>
                      <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-right">
                        <RowDropdown linkEdit={`/admin/services/${id}`} />
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