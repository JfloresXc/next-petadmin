import React from 'react'
import Admin from 'layouts/Admin.js'
import FormPet from '@/components/forms/FormPet'

export default function Settings () {
  return (
    <>
      <div className="flex flex-wrap">
        <div className="w-full  px-4">
          <FormPet/>
        </div>
      </div>
    </>
  )
}

Settings.layout = Admin
