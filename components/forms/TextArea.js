import React from 'react'

export default function Textarea({
  label,
  type = 'text',
  widthFlex = '6',
  defaultValue,
  name,
  placeholder,
  handleChange,
  disabled = false,
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
        <textarea
          type={type}
          className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
          defaultValue={defaultValue}
          name={name}
          placeholder={placeholder}
          onChange={handleChange}
          disabled={disabled}
        />
      </div>
    </div>
  )
}
