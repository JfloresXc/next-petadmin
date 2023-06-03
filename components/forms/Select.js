import React from 'react'

export default function Select ({
  label,
  widthFlex = '6',
  defaultValue,
  name,
  handleChange,
  items,
  disabled = false
}) {
  return (
    <div className={`w-full lg:w-${widthFlex}/12 px-4`}>
        <div className="relative w-full mb-3">
            <label
                className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                htmlFor="grid-password"
            >
                {label}
            </label>
            <select
                className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                name={name}
                onChange={handleChange}
                disabled={disabled}
            >
                {items.map((item, index) => {
                  return (
                        <option
                            key={index}
                            value={item.id}
                            selected={item.id === defaultValue}
                        >{item.name}</option>
                  )
                })}
            </select>
        </div>
    </div>
  )
}
