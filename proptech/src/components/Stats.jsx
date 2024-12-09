import PriceCheckIcon from "@mui/icons-material/PriceCheck";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";
import investmentDataFile from "../shared/data/investmentData.json";

function Stats() {
    const totalBalance = investmentDataFile.reduce((sum, investment) => sum + investment.principal, 0);

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
      value: `${totalBalance.toFixed(2)}`,
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
    <div className="bg-white py-14 sm:py-14">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <dl className="grid grid-cols-1 text-center lg:grid-cols-3">
          {stats.map((stat) => (
            <div
              key={stat.id}
              className="mx-auto flex max-w-2xl flex-col items-center gap-y-2 bg-base-200 px-8 py-2 rounded-lg"
            >
              <div>{stat.icon}</div>

              <dd className="text-3xl font-semibold tracking-tight sm:text-5xl">
                {stat.value}
              </dd>
              <dt className="text-base">{stat.name}</dt>
            </div>
          ))}
        </dl>
      </div>
    </div>
  );
}
export default Stats;
