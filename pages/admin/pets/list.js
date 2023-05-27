import React from 'react'
import Admin from 'layouts/Admin.js'
import ListOfPets from '@/components/pets/List'

export default function Tables () {
  return (
    <>
      <div className="flex flex-wrap mt-4">
        <div className="w-full mb-12 px-4">
          <ListOfPets />
        </div>
      </div>
    </>
  )
}

Tables.layout = Admin
