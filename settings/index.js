const NODE_ENV = process.env.NODE_ENV
const API_URL_SERVER_BACKEND = NODE_ENV === 'production'
  ? `${process.env.BACKEND_HOST}/api`
  : `${process.env.BACKEND_HOST_LOCAL}/api`

// const API_URL_SERVER_BACKEND = `${process.env.BACKEND_HOST}/api`
// const API_URL_SERVER_BACKEND = `${process.env.BACKEND_HOST_LOCAL}/api`
const API_URL_API_FRONTEND = '/api'

export { API_URL_SERVER_BACKEND, API_URL_API_FRONTEND }
