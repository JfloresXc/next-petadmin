import React from 'react'

import Footer from 'components/Footers/Footer.js'
import Hero from '@/components/landing-pages/Hero'
import Navbar from '@/components/Navbars/IndexNavbar'
import AuthContext from '@/contexts/AuthContext'

export default function Index () {
  return (
    <>
      <AuthContext>
        <Navbar />
        <Hero />

        {/* <Features /> */}
        <Footer />
      </AuthContext>
    </>
  )
}
