import React from 'react'
import Admin from 'layouts/Admin.js'
import FormVet from '@/components/forms/FormVet'

export default function Settings () {
  return (
    <>
      <div className="flex flex-wrap">
        <div className="w-full  px-4">
          <FormVet/>
        </div>
      </div>
    </>
  )
}

Settings.layout = Admin
