import Admin from 'layouts/Admin.js'
import FormCitation from '@/components/forms/FormCitation'

export default function Settings () {
  return (
    <>
      <div className="flex flex-wrap">
        <div className="w-full  px-4">
          <FormCitation />
        </div>
      </div>
    </>
  )
}

Settings.layout = Admin
