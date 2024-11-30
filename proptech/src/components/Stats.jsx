import PriceCheckIcon from "@mui/icons-material/PriceCheck";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";

function Stats() {
  const stats = [
    {
      id: 1,
      name: "Propiedades Financieras",
      value: "3000",
      icon: <PriceCheckIcon />,
    },
    {
      id: 2,
      name: "Invertidos en el mercado",
      value: "$500k",
      icon: <AttachMoneyIcon />,
    },
    {
      id: 3,
      name: "Propiedades Financiadas",
      value: "4000",
      icon: <TrendingUpIcon />,
    },
  ];

  return (
    <div className="bg-white py-24 sm:py-32">
        <h2 className="text-center text-3xl text-black mb-8">Impulsando el mercado con cifras que inspiran</h2>
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <dl className="grid grid-cols-1 gap-x-8 gap-y-16 text-center lg:grid-cols-3">
          {stats.map((stat) => (
            <div
              key={stat.id}
              className="mx-auto flex max-w-xs flex-col items-center gap-y-4"
            >
              <div>{stat.icon}</div>

              <dd className="text-3xl font-semibold tracking-tight text-gray-900 sm:text-5xl">
                {stat.value}
              </dd>
              <dt className="text-base text-gray-600">{stat.name}</dt>
            </div>
          ))}
        </dl>
      </div>
    </div>
  );
}
export default Stats;
