import React from 'react'
import Admin from 'layouts/Admin.js'
import ListOfServices from '@/components/services/List'

export default function Tables() {
  return (
    <>
      <div className="flex flex-wrap mt-4">
        <div className="w-full mb-12 px-4">
          <ListOfServices />
        </div>
      </div>
    </>
  )
}

Tables.layout = Admin
