import React from 'react'
import Admin from 'layouts/Admin.js'
import FormService from '@/components/forms/FormService'

export default function Settings() {
  return (
    <>
      <div className="flex flex-wrap">
        <div className="w-full  px-4">
          <FormService />
        </div>
      </div>
    </>
  )
}

Settings.layout = Admin
