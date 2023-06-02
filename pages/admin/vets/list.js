import React from 'react'
import Admin from 'layouts/Admin.js'
import ListOfVets from '@/components/vets/List'

export default function PageVets () {
  return (
    <>
      <div className="flex flex-wrap mt-4">
        <div className="w-full mb-12 px-4">
          <ListOfVets />
        </div>
      </div>
    </>
  )
}

PageVets.layout = Admin
