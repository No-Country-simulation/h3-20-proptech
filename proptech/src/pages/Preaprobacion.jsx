import UserNavbar from "../components/UserNavbar";
import Ilustracion1 from "../assets/Preaprobacion1.png";
import ImagenDocumento from "../assets/ImagenDocumento.png";
import IllustrationContainer from "../components/IllustrationContainer";
import { Link } from "react-router-dom"; 

function Preaprobacion() {
  return (
    <div className="w-full h-full bg-white">
      {/* <UserNavbar /> */}
      <div className="flex flex-col md:flex-row h-[calc(100vh-72px)]">
        <div className="w-full md:w-1/2 flex justify-center items-center">
          <IllustrationContainer src={Ilustracion1} alt="Ilustración 1" />
        </div>

        <div className="w-full md:w-1/2 py-8 pr-20">
          <button className="btn-tertiary mb-4 self-start">Volver</button>
          <h2 className="text-2xl font-bold text-gray-800 mb-4">
            Pasos a seguir
          </h2>
          <p className="text-gray-700 text-justify mb-4">
            Debes tener al menos dos garantes con documentación al día, para dar
            fe del crédito. Te recordamos que para seguir adelante con el
            proceso, te recomendamos tener a mano la documentación personal y de
            terceros (garantes) como:
          </p>
          <ul className="list-disc ml-6 mb-4 text-gray-700">
            <li>Últimos tres recibos del sueldo</li>
            <li>
              Servicios a nombre del titular que acredite el domicilio.
            </li>
            <li>Recibos de sueldos de los garantes (al menos 3)</li>
          </ul>

          <div className="flex items-center justify-center">
            <img
              src={ImagenDocumento}
              alt="Documento"
              className="object-contain max-h-80"
            />
          </div>

          <div className="flex gap-4 mt-10">
            <button className="btn-primary flex-grow">Volver más tarde</button>
            <Link to="/preaprobacionDatosPersonales" className="btn-tertiary flex-grow text-center">
                Siguiente
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Preaprobacion;
