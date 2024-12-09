import { useState } from "react";
import Ilustracion2 from "../assets/Preaprobacion2.png";
import IllustrationContainer from "../components/IllustrationContainer";
import { useNavigate } from "react-router-dom"; 
import LinkPreaprobacion from "../components/LinkPreaprobacion";

function PreaprobacionGarante() {
  const [name, setName] = useState("");
  const [lastName, setLastName] = useState("");
  const [dni, setDni] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();

    // Solo se están enviando los tres campos requeridos
    formData.append("first_name", name); // Enviar el nombre como first_name
    formData.append("last_name", lastName); // Enviar el apellido como last_name
    formData.append("identification", dni); // Enviar el DNI como identification

    try {
      const response = await fetch("https://h3-20-proptech-production.up.railway.app/update-user-information/", {
        method: "POST",
        body: formData,
      });

      if (response.ok) {
        navigate("/preaprobacionGaranteDatos");
      } else {
        console.error("Error al enviar los datos al servidor");
      }
    } catch (error) {
      console.error("Error al enviar los datos:", error);
    }
  };

  return (
    <div className="w-full min-h-screen bg-white">
      <div className="flex flex-col md:flex-row h-[calc(100vh-72px)]">
        <div className="w-full md:w-1/2 flex justify-center items-center">
          <IllustrationContainer
            src={Ilustracion2}
            alt="Ilustración 2"
            maxWidth="80%"
            maxHeight="80%"
          />
        </div>

        <div className="w-full md:w-1/2 py-8 pr-16 overflow-y-auto">
          <ul className="steps steps-vertical lg:steps-horizontal w-full">
            <li className="step step-primary">Paso 1</li>
            <li className="step step-primary">Paso 2</li>
            <li className="step">Paso 3</li>
            <li className="step">Paso 4</li>
            <li className="step">Enviado</li>
          </ul>

          <p className="my-4">Pasos para completar la información</p>

          <LinkPreaprobacion />

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


