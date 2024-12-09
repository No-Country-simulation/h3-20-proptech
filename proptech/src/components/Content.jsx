import InvestorReturnCalculator from "./InvestorReturnCalculator";
import { Link } from "react-router-dom";

import Stats from "./Stats";
import InfoCards from "./InfoCards";
import ClientCalculator from "./ClientCalculator";
import headerPhoto from "../assets/edificios-en-perspectiva.png";
import corpPhoto from "../assets/corporationBuilding.png";
import remaxPhoto from "../assets/remax.png";
import grupoPhoto from "../assets/grupo.png";
import p4Photo from "../assets/p4.png";
import proacoPhoto from "../assets/proaco.png";
import CapitalizationCalculator from "./CapitalizationCalculator";


function Content() {
  return (
    <>
      <div className="h-screen m-0 relative">
        <img
          src={headerPhoto}
          alt="Edificios"
          className="w-full h-[90%] object-cover mt-0 rounded-br-[50px] rounded-bl-[50px]"
        />

        <div className="absolute bottom-36 ml-[15%]">
          <p className="text-white text-2xl font-normal">
            Invertí de forma segura
          </p>
          <p className="text-white text-5xl font-bold mt-10">
            Invertí con
            <br /> nosotros
          </p>
          <div className="flex px-2 mt-10">
            <button className="py-2 btn-tertiary text-white rounded mr-5">
              Quiero Financiamiento
            </button>
            <button className="btn-primary">Quiero Invertir</button>
          </div>
        </div>
      </div>

      <section className="text-center w-full">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold">
            Impulsando el mercado con
            <br /> cifras que inspiran
          </h2>
          <Stats />
        </div>
      </section>

      <section>
        <div className="bg-gray-200 w-full p-16 rounded-[50px]">
          <h2 className="text-3xl font-bold text-center">¿Quiénes somos?</h2>
          <div className="grid grid-cols-12 gap-4 mt-6">
            <div className="col-span-5 p-4 ">
              <p>
                Es un placer para nosotros presentarnos. Financia es una empresa
                líder en el sector de las finetech, especializada en préstamos e
                inversiones. Nuestro objetivo es ofrecer soluciones innovadoras
                y accesibles para mejorar la experiencia financiera de nuestros
                clientes a través de la tecnología.{" "}
              </p>
              <p className="mt-2">
                En nuestros 20 años de trayectoria, hemos logrado desarrollar
                una plataforma segura, eficiente y fácil de usar que permite a
                individuos y empresas gestionar sus finanzas de manera más ágil,
                transparente y con un alto grado de personalización.
              </p>
              <strong>Empecemos a trabajar juntos.</strong>
            </div>

            <div className="col-span-7">
              <img
                src={corpPhoto}
                alt="Image corporativa"
                className="h-full rounded-[30px]"
              />
            </div>
          </div>

          <InfoCards />
          <h2 className="text-3xl font-bold text-center"> Nuestros aliados</h2>

          <div className="grid grid-cols-12 gap-4 mt-6">
            <div className="col-span-3 p-4 ">
              <img
                src={remaxPhoto}
                alt="Edificios"
                className="w-full object-cover mt-0"
              />
            </div>
            <div className="col-span-3 p-4 ">
              <img
                src={proacoPhoto}
                alt="Edificios"
                className="w-full object-cover mt-0"
              />
            </div>
            <div className="col-span-3 p-4 ">
              <img
                src={proacoPhoto}
                alt="Edificios"
                className="w-full object-cover"
              />
            </div>
            <div className="col-span-3 p-4 ">
              <img
                src={grupoPhoto}
                alt="Edificios"
                className="w-full object-cover mt-0"
              />
            </div>
          </div>
        </div>
      </section>

      <section>
        <div className=" p-6 rounded-lg shadow-lg">
          <div>
            <h2 className="text-3xl font-bold text-text-primary text-center p-6">
              Calculá, financiá, financiate.
            </h2>
          </div>
          <div className="flex">
            <ClientCalculator />
            <CapitalizationCalculator />
          </div>
        </div>
      </section>

      <section className="bg-base-200 text-center my-14 py-8 mx-14 rounded-2xl flex items-center justify-center">
        <div className="max-w-xl text-center m-4">
          <h2 className="text-xl font-bold my-2">
            Si estás interesado, solicita una pre aprobación.
          </h2>
          <Link to="/solicitar">
            <button className="btn-primary w-full">
              Solicitar preaprobacion
            </button>
          </Link>
        </div>
      </section>
    </>
  );
}

export default Content;
