import React from 'react'
import SettingDropdown from '../Dropdowns/SettingDropdown'

export default function Navbar() {
  return (
    <>
      {/* Navbar */}
      <nav className="absolute top-0 left-0 w-full z-10 bg-transparent md:flex-row md:flex-nowrap md:justify-start flex items-center p-4 navbar">
        <div className="w-full mx-autp items-center flex justify-between md:flex-nowrap flex-wrap md:px-10 px-4">
          {/* Brand */}
          <a
            className="text-white text-sm uppercase hidden lg:inline-block font-semibold text-blueGray-700"
            href="#pablo"
            onClick={(e) => e.preventDefault()}
          >
            <i className="fas fa-shield-dog"></i> <b>OREJOTAS Y COLITAS</b>
          </a>
          <ul className="flex-col md:flex-row list-none items-center hidden md:flex">
            <SettingDropdown />
          </ul>
        </div>
      </nav>
      {/* End Navbar */}
    </>
  )
}
