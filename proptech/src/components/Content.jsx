
import MortgageCalculator from "./MortgageCalculator"
import Cuil from "./Cuil"

function Content() {
    return (
        <div>

            <div className="hero bg-base-200 ">
                <div className="hero-content text-center">
                    <div className="max-w-md">
                        <h2 className="text-5xl font-bold">HERO: Inverti con nosotros</h2>
                        <p className="py-6">
                            Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda
                            excepturi exercitationem quasi. In deleniti eaque aut repudiandae et
                            a id nisi.
                        </p>
                        <button className="btn btn-primary">Get Started</button>
                    </div>
                </div>
            </div>
            <div className="max-w-md">
                <h2 className="text-5xl font-bold">SECCION: Impulsando el mercado</h2>
                <p className="py-6">
                    Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda
                    excepturi exercitationem quasi. In deleniti eaque aut repudiandae et
                    a id nisi.
                </p>
                <button className="btn btn-primary">Get Started</button>
            </div>
            <div className="max-w-md">
                <h2 className="text-5xl font-bold">SECCION: Quienes somos</h2>
                <p className="py-6">
                    Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda
                    excepturi exercitationem quasi. In deleniti eaque aut repudiandae et
                    a id nisi.
                </p>
                <h2 className="text-5xl font-bold"> Nuestros aliados</h2>
                <p className="py-6">
                    Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda
                    excepturi exercitationem quasi. In deleniti eaque aut repudiandae et
                    a id nisi.
                </p>
            </div>
            <div className="flex">
            <div className="max-w-md">
                <p className="py-6">
                    Calcula tu ganancia
                </p>
                <MortgageCalculator/>
                <button className="btn btn-primary">Get Started</button>
            </div>
            <div className="max-w-md">
                <p className="py-6">
                    Calcula tu ganancia
                </p>
                <Cuil/>
                <button className="btn btn-primary">Get Started</button>
            </div>

            </div>



        </div>
    );
}

export default Content;
