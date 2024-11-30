import Grafica from "../components/Grafica";

function ControlPanel() {
  return (  
    <>
  <section className="p-6">
    <div className="flex gap-6">
      {/* Sección izquierda (Descripción y Balance Total) */}
      <div className="flex flex-col gap-6 w-1/2">
        {/* Saludo y mensaje introductorio */}
        <div className="bg-base-200 p-6 rounded-lg shadow-lg">
          <div className="flex items-center gap-4 mb-6">
            <div className="flex-1">
              <p className="text-lg">
                ¡Hola <strong>Pepe</strong>! Bienvenido a tu <strong>panel de control</strong>. 
                Estamos encantados de tenerte aquí. Desde este espacio, podrás explorar todas tus inversiones, 
                revisar tus rendimientos y mucho más. ¡Todo lo que necesitas al alcance de un clic!
                Si tienes alguna pregunta o necesitas ayuda, no dudes en consultarnos. 
                Disfruta navegando.
              </p>
            </div>
            <img
              src="ruta-imagen.jpg"
              alt="persona"
              className="w-16 h-16 rounded-full object-cover"
            />
          </div>
        </div>

        {/* Balance Total debajo de la descripción */}
        <div className="bg-base-200 p-6 rounded-lg shadow-lg">
          <h3 className="text-xl font-semibold">Balance Total</h3>
          <p className="text-lg">US$ 100,000</p>
          <button className="btn btn-primary mt-4">Calcular nueva Inversión</button>
        </div>
      </div>

      {/* Sección derecha (Gráfica) */}
      <div className="w-1/2">
        <div className="bg-base-200 p-6 rounded-lg shadow-lg h-full">
          <Grafica />
        </div>
      </div>
    </div>
  </section>
</>

  );
}

export default ControlPanel;
