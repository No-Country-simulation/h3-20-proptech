import MissionIcon from "@mui/icons-material/EmojiObjects";
import VisionIcon from "@mui/icons-material/Visibility";
import ValuesIcon from "@mui/icons-material/Star";

function InfoCards() {
  const cards = [
    {
      id: 1,
      title: "Misión",
      description: "Convertirnos en el lider global en soluciones financieras innovadoras, accesibles y sostenibles, mejorando la inclusion financiera y transformando la forma en que las personas y las empresas gestionan su dinero a traves de la tecnologia.",
      icon: <MissionIcon style={{ fontSize: "48px" }} />,
    },
    {
      id: 2,
      title: "Filosofia",
      description: "Nuestra filosofia esta centrada en la innovación la accesibilidad y la transparencia, con el objetivo de transformar la manera en que las personas y las empresas gestionan sus finanzas. Creemos que la tecnologia tiene el poder de democratizar los servicios financieros, eliminando las barreras",
      icon: <ValuesIcon style={{ fontSize: "48px"}} />,
    },
    {
      id: 3,
      title: "Visión",
      description: "Proveer soluciones financieras innovadoras y accesibles mediante el uso de tecnologia avanzada, con el objetivo de facilitar la gestion de recursos, mejorar la inclusión financiera y ofrecer productos y servicios de alta calidad que empoderen a nuestros clientes para tomar decisiones financieras informadas",
      icon: <VisionIcon style={{ fontSize: "48px"}} />,
    },
  ];

  return (
    <div className="py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-x-8 gap-y-16 lg:grid-cols-3">
          {cards.map((card) => (
            <div
              key={card.id}
              className="bg-white flex flex-col items-center text-center bg-base-200 px-6 py-8 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300"
            >
              <div className="mb-4">{card.icon}</div>
              <h3 className="text-xl font-bold mb-2">{card.title}</h3>
              <p className="text-base text-gray-700 text-justify">{card.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default InfoCards;
