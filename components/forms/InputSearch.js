export default function InputSearch ({ items = [], setItemsFiltered }) {
  const handleChange = (event) => {
    let { value } = event.target
    value = value.toLowerCase()

    if (items.length > 0) {
      const columns = Object.keys(items[0])

      if (!columns.length) return

      const rows = items.filter((itemKey) => {
        let band = false
        columns.forEach((column) => {
          if (itemKey[column] && itemKey[column].toString().toLowerCase().indexOf(value) > -1) {
            band = true
          }
        })
        return band
      })
      setItemsFiltered(rows)
    }
  }

  return (
    <>
        <form>
            <label htmlFor="default-search" className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white">Search</label>
            <div className="relative">
                <span className="z-10 h-full leading-snug font-normal absolute text-center text-blueGray-300 absolute bg-transparent rounded text-base items-center justify-center w-8 pl-3 py-4">
                    <i className="fas fa-search"></i>
                </span>
                <input type="search" id="default-search" className="block w-full p-4 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Busca aquí 🐶"
                onChange={handleChange}
                required />
            </div>
        </form>
    </>
  )
}
