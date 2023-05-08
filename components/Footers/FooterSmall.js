import React from 'react'

export default function FooterSmall (props) {
  return (
    <>
      <footer
        className={
          (props.absolute
            ? 'absolute w-full bottom-0 bg-grey'
            : 'relative') + ' pb-6'
        }
      >
        <div className="container mx-auto px-4">
          <hr className="mb-6 border-b-1 border-white" />
          <div className="flex flex-wrap items-center md:justify-between justify-center">
            <div className="mx-auto w-full md:w-4/12 px-4">
              <div className="text-sm text-white font-semibold py-1 text-center">
              Copyright © {new Date().getFullYear()} Orejitas y colitas by{' '}
                <a
                  href="https://jfloresxc.github.io"
                  target='_blank'
                  className="text-white hover:text-blueGray-800" rel="noreferrer"
                >
                  Jfloresxc
                </a>
                .
              </div>
            </div>
          </div>
        </div>
      </footer>
    </>
  )
}
