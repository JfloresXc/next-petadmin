import React from 'react'
import Admin from 'layouts/Admin.js'
import FormClient from '@/components/forms/FormClient'

export default function Settings () {
  return (
    <>
      <div className="flex flex-wrap">
        <div className="w-full  px-4">
          <FormClient/>
        </div>
      </div>
    </>
  )
}

Settings.layout = Admin
