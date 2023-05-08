import React from 'react'
import Navbar from '@/components/Navbars/IndexNavbar'
import AuthContext from '@/contexts/AuthContext'
import Footer from 'components/Footers/Footer.js'

export default function Auth ({ children }) {
  return (
    <>
    <AuthContext>
      <Navbar />
      <main>
        <section className="w-full bg-light">
          <div
            className="w-full "
          ></div>
          {children}
          <Footer/>
        </section>
      </main>
    </AuthContext>
    </>
  )
}
