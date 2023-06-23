import React from 'react'
import Admin from 'layouts/Admin.js'
import ListHistorial from '@/components/pets/ListHistorial'

export default function Tables() {
  return (
    <>
      <div className="flex flex-wrap mt-4">
        <ListHistorial />
      </div>
    </>
  )
}

Tables.layout = Admin
