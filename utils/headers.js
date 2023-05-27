export const getHeaders = (request) => {
  const { myToken: token } = request.cookies

  const headers = {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${token}`
  }

  return { headers }
}
