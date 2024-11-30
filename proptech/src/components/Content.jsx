import MortgageCalculator from "./MortgageCalculator"
import EnhancedMortgageCalculator from "./EnhancedMortgageCalculator"
import InvestorReturnCalculator from "./InvestorReturnCalculator";
import Checkbox from '@mui/material/Checkbox';
import { Input } from "@mui/material";

function Content() {
    return (
        <div className=" p-4">
            <section className="hero bg-base-300 text-center py-10">
                <div className="max-w-md">
                    <h2 className="text-3xl font-bold text-text-primary">Invertí con nosotros</h2>
                    <p className="text-text-common py-6">
                        Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda excepturi exercitationem quasi.
                    </p>
                    <div className='flex px-2'>
                        <button className="py-2 btn-tertiary rounded">Calcula tu ganancia</button>
                        <button className=" btn-primary">Registrate</button>
                    </div>
                </div>
            </section>
            <section className="bg-base-200  text-center py-10">
                <div className="max-w-md">
                    <h2 className="text-3xl font-bold">SECCION: Impulsando el mercado</h2>
                    <p className="py-6">
                        Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda
                        excepturi exercitationem quasi. In deleniti eaque aut repudiandae et
                        a id nisi.
                    </p>
                    <button className=" btn-primary">Get Started</button>
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
                <h2 className="text-3xl font-bold">CSS test section</h2>
                <div class="tab-container items-center">
                    <button class="tab active">Personal</button>
                    <button class="tab">Garante uno</button>
                    <button class="tab">Garante dos</button>
                </div>
                <div>
                <label className="flex items-center space-x-2">
                        <input
                            type="checkbox"
                            className="checkbox"
                        />
                        <span>checkbox</span>
                        </label>
                    <label className="flex items-center space-x-2">
                        <input
                            type="checkbox"
                            className="checkbox-custom "
                        />
                        <span>checkbox-custom</span>
                    </label>
                </div>
                <div className="flex">
                <button className="btn-primary">Primary</button>
                <button className="btn-secondary">Secondary</button>
                <button className="btn-tertiary">Tertiary</button>
                </div>

            </section>



            <section>
                <div className=" p-6 rounded-lg shadow-lg">
                    <div >
                        <h2 className="text-3xl font-bold text-text-primary text-center">Calculá, financiá, financiate.</h2>
                    </div>
                    <div className="flex">
                        <MortgageCalculator />
                        <InvestorReturnCalculator />

                    </div>
                </div>
            </section>
            <section className="bg-base-200  text-center py-10">
                <div className="max-w-md text-center">
                    <h2 className="text-2xl font-bold">Si estás interesado, solicita una pre aprobación.</h2>
                    <button className="btn-primary w-full">Solicitar preaprobacion</button>
                </div>
            </section>

        </div>
    );
}

export default Content;