import Button from './Button'

export default function Hero () {
  return (
    <>
    <section className="hero family-kufam bg-light">
        <div className="container mx-auto items-center flex flex-wrap">
          <div className="w-full">
            <div className="">
              <h1 className="hero__title h1 fonts-bold">
                Orejitas y Colitas, <b className="colors-primary">tu mascota</b> es prioridad
              </h1>
              <p className="mt-4 text-sm leading-relaxed text-blueGray-500">
                Orejitas y colitas is Free and Open Source. It does not change any of
                the CSS from{' '}
                <a
                  href="https://tailwindcss.com/?ref=creativetim"
                  className="text-blueGray-600"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Tailwind CSS
                </a>
                . It features multiple HTML elements and it comes with dynamic
                components for ReactJS, Vue and Angular.
              </p>
              <div className="mt-12">
                <Button label={'Sobre nosotros'} classes='get-started text-white font-bold px-6 py-4 rounded outline-none focus:outline-none mr-1 mb-1 text-sm shadow hover:shadow-lg ease-linear transition-all duration-150 bg-primary'/>
              </div>
            </div>
          </div>
        </div>
        <img
          className="right-0 pt-16 sm:w-6/12 sm:mt-0 w-10/12 "
          src="/storage/pet2.jpg"
          alt="..."
        />
      </section>
      <style jsx>{`
        .hero{
          display: flex;
          gap: 3em;
          padding: 0 var(--width-size);
          margin-top: -1em;
          margin-right: calc(-1 * var(--width-size));
        }
        .hero__title{
          padding-right: 3em;
        }

        @media (max-width: 900px){
          .hero{
            flex-direction: column;
            margin: 0;
            align-items: center;
            padding-top: var(--height-navbar); 
            text-align: center;
            gap: 0;
            padding-bottom: 2em;
          }
          .hero__title{
            padding-right: 0;
          }
        }
      `}</style>
    </>
  )
}
