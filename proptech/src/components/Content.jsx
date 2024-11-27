import MortgageCalculator from "./MortgageCalculator"
import EnhancedMortgageCalculator from "./EnhancedMortgageCalculator"

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
                        <button className="py-2 btn-tertiary text-white rounded">Calcula tu ganancia</button>
                        <button className="btn btn-primary">Registrate</button>
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
                    <button className="btn btn-primary">Get Started</button>
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
                    <div >
                        <h2 className="text-3xl font-bold text-text-primary text-center">Calculá, financiá, financiate.</h2>
                    </div>
                    <div className="flex">
                        <MortgageCalculator />
                        <EnhancedMortgageCalculator />

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



// import MortgageCalculator from "./MortgageCalculator"
// import Cuil from "./Cuil"

// function Content() {
//     return (
//         <div>

//             <div className="hero bg-base-200 ">
//                 <div className="hero-content text-center">
//                     <div className="max-w-md">
//                         <h2 className="text-5xl font-bold">HERO: Inverti con nosotros</h2>
//                         <p className="py-6">
//                             Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda
//                             excepturi exercitationem quasi. In deleniti eaque aut repudiandae et
//                             a id nisi.
//                         </p>
//                         <button className="btn btn-primary">Get Started</button>
//                     </div>
//                 </div>
//             </div>
//             <div className="max-w-md">
//                 <h2 className="text-5xl font-bold">SECCION: Impulsando el mercado</h2>
//                 <p className="py-6">
//                     Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda
//                     excepturi exercitationem quasi. In deleniti eaque aut repudiandae et
//                     a id nisi.
//                 </p>
//                 <button className="btn btn-primary">Get Started</button>
//             </div>
//             <div className="max-w-md">
//                 <h2 className="text-5xl font-bold">SECCION: Quienes somos</h2>
//                 <p className="py-6">
//                     Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda
//                     excepturi exercitationem quasi. In deleniti eaque aut repudiandae et
//                     a id nisi.
//                 </p>
//                 <h2 className="text-5xl font-bold"> Nuestros aliados</h2>
//                 <p className="py-6">
//                     Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda
//                     excepturi exercitationem quasi. In deleniti eaque aut repudiandae et
//                     a id nisi.
//                 </p>
//             </div>
//             <div className="flex">
//             <div className="max-w-md">
//                 <p className="py-6">
//                     Calcula tu ganancia
//                 </p>
//                 <MortgageCalculator/>
//                 <button className="btn btn-primary">Get Started</button>
//             </div>
//             <div className="max-w-md">
//                 <p className="py-6">
//                     Calcula tu ganancia
//                 </p>
//                 <Cuil/>
//                 <button className="btn btn-primary">Get Started</button>
//             </div>

//             </div>



//         </div>
//     );
// }

// export default Content;
