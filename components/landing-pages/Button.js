import Link from 'next/link'
import React from 'react'

const GENERAL_STYLE = 'get-started text-white font-semibold rounded outline-none focus:outline-none shadow hover:shadow-lg ease-linear transition-all duration-150 text-sm '

const DESIGNS = {
  default: `${GENERAL_STYLE} px-6 py-4  mr-1 mb-1 shadow hover:shadow-lg ease-linear transition-all duration-150 bg-primary`,
  mini: `${GENERAL_STYLE} px-4 py-3 my-2 bg-primary`
}

function Button ({
  label,
  nameIcon,
  type = 'button',
  location = '',
  design = 'default',
  full = false,
  handleClick = () => {}
}) {
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
