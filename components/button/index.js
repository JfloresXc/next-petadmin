import Link from 'next/link'
import React from 'react'

const DESIGNS = {
  'bluegray-700': 'bg-blueGray-700 text-white active:bg-blueGray-600 text-xs font-bold uppercase px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none lg:mr-1 lg:mb-0 ml-3 mb-3 ease-linear transition-all duration-150',
  'bluegray-800': 'bg-blueGray-800 text-white active:bg-blueGray-600 text-sm font-bold uppercase px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 w-full ease-linear transition-all duration-150'
}

function Button ({
  label,
  nameIcon,
  type = 'text',
  location = '',
  design = 'bluegray-800',
  full = false,
  handleClick = () => {}
}) {
  console.log(design)
  const styles = `${DESIGNS[design]} ${full && 'w-full'}`

  if (location) {
    return <Link className={styles + `fas ${nameIcon}`} href={location}>
      <i className={`fas ${nameIcon}`}></i>
      {' '} {label}
    </Link>
  }

  return <button
    className={styles}
    type={type}
    onClick={handleClick}
  >
    <i className={`fas ${nameIcon}`}></i>
    {' '} {label}
  </button>
}

export default React.memo(Button)
