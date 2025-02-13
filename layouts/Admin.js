import React from 'react'
import AdminNavbar from 'components/Navbars/AdminNavbar.js'
import Sidebar from 'components/Sidebar/Sidebar.js'
import HeaderStats from 'components/Headers/HeaderStats.js'
import FooterAdmin from 'components/Footers/FooterAdmin.js'
import AuthContext from '@/contexts/AuthContext'
import { Portal } from '@/components/modal/Portal'
import Spinner from '@/components/spinner'

export default function Admin ({ children }) {
  return (
    <>
    <AuthContext>
      <Sidebar />
      <div className="relative md:ml-64 bg-blueGray-100">
        <AdminNavbar />
        <HeaderStats />
        <div className="px-4 md:px-10 mx-auto w-full -m-24 mt-10">
          <div className='max-h-px'>
            {children}
          </div>
          <FooterAdmin />
          <Portal>
            <div id='modal-root'>
              <Spinner />
            </div>
          </Portal>
        </div>
      </div>
    </AuthContext>
    </>
  )
}
