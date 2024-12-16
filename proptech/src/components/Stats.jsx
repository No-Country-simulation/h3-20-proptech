import React, {  useContext, useState, useEffect } from "react";
import PriceCheckIcon from "@mui/icons-material/PriceCheck";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";
import Context from "../context/Context";
// import investmentDataFile from "../shared/data/investmentData.json";
import { NotificationService } from "../shared/notistack.service";

const keyMap = {
    id: "id",
    investor: "investor",
    date: "dateOfGeneration",
    amount: "principal",
    calc_rate: "calcRate",
    interest_rate: "interestRate",
    number_of_payments: "numberOfPayments",
    monthly_return: "monthlyReturn",
    term: "term",
    term_type: "termType",
    anual_rate: "annualRate",
    enforcement: "refuerzo",
    monthly_enforcement: "refuerzoMes",
    value_enforcement: "refuerzoValue",
    deposited_cuota: "depositedCuota",
    validated: "validated",
    state: "estado",
    is_active: "isActive",
    results: "results",
};

const transformResponseWithMap = (payload, keyMap) => {
    return payload.map((item) => {
        const transformed = {};
        for (const [key, value] of Object.entries(keyMap)) {
            transformed[value] = item[key];
        }
        return transformed;
    });
};


function Stats() {
    const { getInvestments} = useContext(Context);
    const [investmentData, setInvestmentData] = useState([]);
    const fetchInvestments = async () => {
        try {
            const response = await getInvestments();
            const transformed = transformResponseWithMap(response.data, keyMap);
            setInvestmentData(transformed);
            // console.log(investmentData);
            // Pass data to Dashboard via onDataLoad
            if (onDataLoad) {
                onDataLoad(transformed);
            }
            // NotificationService.success("Success loading investments.", 3000);
            // console.log(usersData);
            
        } catch (error) {
            // NotificationService.error("Error loading investments.", 2000);
        }
    };
    useEffect(() => {
        fetchInvestments();
    }, []);
    const totalBalance = investmentData.reduce(
        (sum, investment) => sum + (parseFloat(investment.principal) || 100),
        0
    );
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
      value: `$${totalBalance}`,
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
