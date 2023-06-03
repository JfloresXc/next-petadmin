import Link from 'next/link'
import React from 'react'

const DESIGNS = {
  regular: 'bg-indigo-500 text-white active:bg-indigo-600 text-xs font-bold uppercase px-3 py-1 rounded outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150'
}

function Button ({
  label,
  nameIcon,
  type = 'text',
  href = '',
  design = 'regular',
  full = false,
  handleClick = () => {}
}) {
  const styles = `${DESIGNS[design]} ${full && 'w-full'}`

  if (href) {
    return <Link className={styles + `fas ${nameIcon}`} href={href}>
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
