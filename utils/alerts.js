import Swal from 'sweetalert2'

export const setMessageError = ({ message }) => {
  Swal.fire({
    icon: 'error',
    html: `<h4>${message}</h4>`,
    timer: 3000,
    showConfirmButton: false,
    width: 400,
    padding: '2em 3em',
    backdrop: `
      rgba(123, 0, 0, 0.4)
      left top
      no-repeat
    `
  })
}

export const setMessageSuccess = ({ message }) => {
  Swal.fire({
    icon: 'success',
    html: `<h4>${message}</h4>`,
    timer: 3000,
    showConfirmButton: false,
    width: 400,
    padding: '2em 3em',
    backdrop: `
      rgba(0, 123, 0, 0.4)
      left top
      no-repeat
    `
  })
}
