function setDateToOnlyDate (date = new Date()) {
  date.setHours(0, 0, 0, 0)
}

export function compareDates ({ firstDate = new Date(), secondDate = new Date() }) {
  setDateToOnlyDate(firstDate)
  setDateToOnlyDate(secondDate)

  const milisegundos = [
    firstDate.getTime(),
    secondDate.getTime()
  ]

  if (milisegundos[0] === milisegundos[1]) return 0
  else if (milisegundos[0] < milisegundos[1]) return -1
  else return 1
}
