import React from 'react'
import Auth from '@/layouts/Auth.js'
import FormLogin from '@/components/forms/FormLogin'

export default function Login () {
  return (
    <>
      <div className="family-kufam container mx-auto px-4 h-full login">
        <div className="flex content-center items-center justify-center h-full">
          <div className="w-full lg:w-4/12 px-4">
            <div className="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg bg-white border-0">
              <div className="rounded-t mb-0 px-6 py-6">
                <div className="text-center mb-3">
                  <h2 className="mt-3 text-blueGray-500 text-md font-bold">
                    Inicia sesión con credenciales
                  </h2>
                </div>
                {/* <div className="btn-wrapper text-center">
                  <button
                    className="bg-white active:bg-blueGray-50 text-blueGray-700 font-normal px-4 py-2 rounded outline-none focus:outline-none mr-2 mb-1 uppercase shadow hover:shadow-md inline-flex items-center font-bold text-xs ease-linear transition-all duration-150"
                    type="button"
                  >
                    <img alt="..." className="w-5 mr-1" src="/img/github.svg" />
                    Github
                  </button>
                  <button
                    className="bg-white active:bg-blueGray-50 text-blueGray-700 font-normal px-4 py-2 rounded outline-none focus:outline-none mr-1 mb-1 uppercase shadow hover:shadow-md inline-flex items-center font-bold text-xs ease-linear transition-all duration-150"
                    type="button"
                  >
                    <img alt="..." className="w-5 mr-1" src="/img/google.svg" />
                    Google
                  </button>
                </div> */}
                {/* <hr className="mt-6 border-b-1 border-blueGray-300" /> */}
              </div>
              <div className="flex-auto px-4 lg:px-10 py-10 pt-0">
                <div className="text-blueGray-400 text-center mb-3 font-bold">
                  {/* <small>O con credenciales</small> */}
                </div>
                <FormLogin />
              </div>
            </div>
            {/* <div className="flex flex-wrap mt-6 relative">
              <div className="w-1/2">
                <a
                  href="#pablo"
                  onClick={(e) => e.preventDefault()}
                  className="text-blueGray-500"
                >
                  <small>¿Olvidaste la contraseña?</small>
                </a>
              </div>
              <div className="w-1/2 text-right">
                <Link href="/auth/register" className="text-blueGray-500">
                    <small>Crear nueva cuenta</small>
                </Link>
              </div>
            </div> */}
          </div>
        </div>
      </div>
      <style jsx>{`
          .login{
            margin-bottom: 3em;
            padding-top: calc(var(--height-navbar) + 2em);
          }
        `}
      </style>
    </>
  )
}

Login.layout = Auth
