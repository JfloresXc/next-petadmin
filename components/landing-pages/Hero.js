export default function Hero () {
  return (
    <>
    <section className="hero family-kufam bg-light">
        <div className="container mx-auto items-center flex flex-wrap">
          <div className="w-full">
            <div className="">
              <h1 className="hero__title h1 fonts-bold lg:text-sm">
                Orejotas y Colitas, <b className="colors-primary">tu mascota</b> es prioridad
              </h1>
              <p className="mt-4 text-sm leading-relaxed text-blueGray-500 hero__description">
                Orejotas y Colitas es una veterinaria dedicada al cuidado y bienestar de las mascotas. Es un lugar acogedor y amigable, donde los animales y sus dueños se sienten cómodos y bien atendidos. El nombre Orejotas y Colitas refleja el enfoque cariñoso y divertido que se tiene hacia los animales, destacando sus características especiales.
              </p>
              {/* <div className="mt-12">
                <Button label={'Sobre nosotros'} classes='get-started text-white font-bold px-6 py-4 rounded outline-none focus:outline-none mr-1 mb-1 text-sm shadow hover:shadow-lg ease-linear transition-all duration-150 bg-primary'/>
              </div> */}
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
        .hero__description{
          padding-right: 3em;
        }

        @media (max-width: 900px){
          .hero{
            flex-direction: column;
            margin: 0;
            align-items: center;
            padding-top: var(--height-navbar); 
            padding-bottom: 2em;
            text-align: center;
            gap: 0;
            margin-top: 4em;

          }
          .hero__title{
            padding-right: 0;
            font-size: 2.2em;
          }
          .hero__description{
            padding-right: 0;
          }
        }
      `}</style>
    </>
  )
}
