import { setMessageError } from 'utils/alerts'

export const handleError = (responseInJson) => {
  const { message = '¡Error de conexión atrapado!', isError } =
    responseInJson

  if (isError) setMessageError({ message })

  return {
    isError
  }
}
