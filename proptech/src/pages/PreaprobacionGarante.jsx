import { useState } from "react";
import Ilustracion2 from "../assets/Preaprobacion2.png";
import UserNavbar from "../components/UserNavbar";
import IllustrationContainer from "../components/IllustrationContainer";
import { useNavigate } from "react-router-dom"; 

function PreaprobacionGarante() {
  const [name, setName] = useState("");
  const [lastName, setLastName] = useState("");
  const [dni, setDni] = useState("");

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    // Lógica de envío de formulario
    console.log("Nombre:", name);
    console.log("Apellido:", lastName);
    console.log("DNI:", dni);

    navigate("/preaprobacionGaranteDatos");
  };

  return (
    <div className="w-full min-h-screen bg-white">
      <UserNavbar />
      <div className="flex flex-col md:flex-row h-[calc(100vh-72px)]">
        <div className="w-full md:w-1/2 flex justify-center items-center">
          <IllustrationContainer
            src={Ilustracion2}
            alt="Ilustración 2"
            maxWidth="80%"
            maxHeight="80%"
          />
        </div>

        <div className="w-full md:w-1/2 py-8 pr-20 overflow-y-auto">
          <ul className="steps steps-vertical lg:steps-horizontal w-full">
            <li className="step step-primary">Paso 1</li>
            <li className="step step-primary">Paso 2</li>
            <li className="step ">Paso 3</li>
            <li className="step">Paso 4</li>
            <li className="step">Enviado</li>
          </ul>

          <p className="mb-4">Pasos para completar la información</p>

          <div class="tab-container items-center mb-4">
            <button class="tab ">Personal</button>
            <button class="tab active">Garante uno</button>
            <button class="tab">Garante dos</button>
          </div>

          <h2 className="text-2xl font-bold mb-4">Datos personales</h2>
          <p className="mb-4">Se deben ingresar:</p>
          <ul className="list-disc pl-6 mb-8">
            <li>Nombre</li>
            <li>Apellido</li>
            <li>DNI</li>
          </ul>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="form-control">
              <label className="label">
                <span className="label-text">Nombre</span>
              </label>
              <input
                type="text"
                placeholder="Ingresa tu nombre"
                className="input input-bordered bg-white"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Apellido</span>
              </label>
              <input
                type="text"
                placeholder="Ingresa tu apellido"
                className="input input-bordered bg-white"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
              />
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">DNI</span>
              </label>
              <input
                type="text"
                placeholder="Ingresa tu DNI"
                className="input input-bordered bg-white"
                value={dni}
                onChange={(e) => setDni(e.target.value)}
              />
            </div>
            <div className="flex gap-4 mt-auto">
              <button type="submit" className="btn btn-primary flex-grow">
                Siguiente
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default PreaprobacionGarante;

