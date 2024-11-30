import MortgageCalculator from "./MortgageCalculator";
import EnhancedMortgageCalculator from "./EnhancedMortgageCalculator";
import InvestorReturnCalculator from "./InvestorReturnCalculator";
import Stats from "./Stats";

function Content() {
  return (
    <div className=" p-4">
      <section className="hero bg-base-300 text-center py-4">
        <div className="max-w-md">
          <p className="text-text-common py-2">
            Invertí de forma segura
          </p>
          <h2 className="text-3xl font-bold text-text-primary">
            Invertí con nosotros
          </h2>
          <div className="flex px-2">
            <button className="py-2 btn-tertiary text-white rounded">
              Quiero Financiamiento
            </button>
            <button className="btn btn-primary">Quiero Invertir</button>
          </div>
        </div>
      </section>
      
      <section className="bg-base-200  text-center py-10 w-full">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold">SECCION: Impulsando el mercado</h2>
          <Stats />
        </div>
      </section>

      <section>
        <div className="max-w-md">
          <h2 className="text-3xl font-bold">SECCION: Quienes somos</h2>
          <p className="py-6">
            Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda
            excepturi exercitationem quasi. In deleniti eaque aut repudiandae et
            a id nisi.
          </p>
          <h2 className="text-3xl font-bold"> Nuestros aliados</h2>
          <p className="py-6">
            Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda
            excepturi exercitationem quasi. In deleniti eaque aut repudiandae et
            a id nisi.
          </p>
        </div>
      </section>

      <section>
        <div className=" p-6 rounded-lg shadow-lg">
          <div>
            <h2 className="text-3xl font-bold text-text-primary text-center">
              Calculá, financiá, financiate.
            </h2>
          </div>
          <div className="flex">
            <MortgageCalculator />
            <InvestorReturnCalculator />
          </div>
        </div>
      </section>

      <section className="bg-base-200 text-center my-14 py-8 mx-14 rounded-2xl flex items-center justify-center">
        <div className="max-w-xl text-center m-4">
          <h2 className="text-2xl font-bold my-2">
            Si estás interesado, solicita una pre aprobación.
          </h2>
          <button className="btn-primary w-full">
            Solicitar preaprobacion
          </button>
        </div>
      </section>

    </div>
  );
}

export default Content;
