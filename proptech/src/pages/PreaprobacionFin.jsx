import Ilustracion3 from "../assets/Preaprobacion3.png";
import IllustrationContainer from "../components/IllustrationContainer";

import { Link } from "react-router-dom"; 

function Preaprobacion() {
    return (
        <div className="w-full h-full bg-white">
            <div className="flex flex-col md:flex-row h-[calc(100vh-72px)]">
                <div className="w-full md:w-1/2 flex justify-center items-center">
                    <IllustrationContainer src={Ilustracion3} alt="Ilustración 3" />
                </div>

                <div className="w-full md:w-1/2 py-8 pr-20">
                    <ul className="steps steps-vertical lg:steps-horizontal w-full">
                        <li className="step step-primary">Paso 1</li>
                        <li className="step step-primary">Paso 2</li>
                        <li className="step step-primary">Paso 3</li>
                        <li className="step step-primary">Paso 4</li>
                        <li className="step step-primary">Enviado</li>
                    </ul>

                    <div className="pt-14">
                        <h2 className="text-2xl font-bold text-gray-800 mb-4 text-center">
                            !Felicitaciones¡
                        </h2>
                        <h2 className="text-2xl font-bold text-gray-800 mb-4 text-center">
                            !Tu credito ha sido solicitado¡
                        </h2>

                        <p className="text-gray-700 text-justify mb-4">
                            Queremos agradecerte por confiar en nosotros. Hemos recibido tu
                            solicitud y estamos en proceso de analizar los datos que nos has
                            enviado. Nuestro equipo esta trabajando con dedicacion para
                            asegurarse de que todo este en orden. te mantendremos informado
                            sobre el progreso de tu solicitud a traves de tu correo
                            electronico.¡ Estamos para ayudarte en cada paso del camino!
                            Gracias por ser parte de nuestra comunidad. ¡ Estamos emocionados
                            de acompañarte en este viaje!
                        </p>

                        <div className="flex gap-4 mt-10">
                            <Link to="/" className="btn-tertiary flex-grow text-center">
                                
                                    Volver al inicio
                              
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Preaprobacion;
