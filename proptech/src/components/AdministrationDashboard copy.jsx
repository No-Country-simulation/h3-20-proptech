import React, { useState, useEffect } from "react";
import CapitalizationCalculator from "./CapitalizationCalculator"; // Assuming it's already created



function AdministrationDashboard() {
    const [startDate, setStartDate] = useState(null);
    const [depositSchedule, setDepositSchedule] = useState([]);
    const [deposits, setDeposits] = useState({});
    const [capitalizationResults, setCapitalizationResults] = useState([]);

    // Example data: replace with real values from backend/API
    const expectedCuota = 237; // Example cuota
    const monthlyRate = 1.531;
    const terms = 6; // Example term (12 months)


    useEffect(() => {
        if (startDate) {
            generateDepositSchedule();
        }
    }, [startDate]);

    const generateDepositSchedule = () => {
        const schedule = [];
        const start = new Date(startDate);
        for (let i = 0; i <= terms; i++) {
            const dueDate = new Date(start);
            dueDate.setMonth(dueDate.getMonth() + i);
            dueDate.setDate(15); // 15th of each month
            schedule.push({
                term: i ,
                dueDate,
                expectedCuota,
            });
        }
        setDepositSchedule(schedule);
    };

    const handleDeposit = (term, amount) => {
        setDeposits({
            ...deposits,
            [term]: amount,
        });
    };

    const calculateCapitalization = () => {
        const results = [];
        let previousCapitalization = 0;

        depositSchedule.forEach((schedule) => {
            const { term, dueDate } = schedule;
            const deposit = parseFloat(deposits[term] || 0); // Ensure deposit is a number

            if (new Date() > dueDate && deposit === 0) {
                // Missed deposit: calculate capitalization
                const descuento = previousCapitalization * 0.1; // Example calculation
                previousCapitalization += descuento;
                console.log("date>" + descuento);

                results.push({
                    term,
                    missed: true,
                    capitalization: previousCapitalization.toFixed(2),
                });
            } else if (deposit >= 0) {
                // Apply deposit to next capitalization
                const descuento = previousCapitalization * 0.1;
                previousCapitalization += deposit + descuento;
                console.log("date>" + descuento);
                results.push({
                    term,
                    missed: false,
                    capitalization: previousCapitalization.toFixed(2),
                });
            }
        });

        setCapitalizationResults(results);
    };

    return (
        <div className="dashboard">
            <h1 className="text-2xl font-bold mb-4">Dashboard de Administración</h1>

            {/* Start Date */}
            <div>
                <label className="font-bold text-text-primary mb-1">Fecha de Inicio</label>
                <input
                    type="date"
                    value={startDate || ""}
                    onChange={(e) => setStartDate(e.target.value)}
                    className="input-field"
                />
            </div>

            {/* Deposit Schedule */}
            {depositSchedule.length > 0 && (
                <div className="mt-6">
                    <h3 className="text-xl font-semibold">Cronograma de Depósitos</h3>
                    <table className="w-full mt-2 border-collapse">
                        <thead>
                            <tr>
                                <th className="border px-2 py-1">Término</th>
                                <th className="border px-2 py-1">Fecha de Vencimiento</th>
                                <th className="border px-2 py-1">Cuota Esperada</th>
                                <th className="border px-2 py-1">Depósito Real</th>
                                <th className="border px-2 py-1">Capitalización</th>
                                <th className="border px-2 py-1">Estado</th>
                            </tr>
                        </thead>
                        <tbody>
                            {depositSchedule.map((schedule) => {
                                const { term, dueDate, expectedCuota } = schedule;
                                const deposit = deposits[term] || 0;
                                const isMissed = new Date() > new Date(dueDate) && deposit === 0;
                                return (
                                    <tr key={term}>
                                        <td className="border px-2 py-1">{term}</td>
                                        <td className="border px-2 py-1">{dueDate.toDateString()}</td>
                                        <td className="border px-2 py-1">{expectedCuota}</td>
                                        <td className="border px-2 py-1">
                                            <input
                                                type="number"
                                                placeholder="Ingrese depósito"
                                                value={deposit}
                                                onChange={(e) => handleDeposit(term, e.target.value)}
                                                className="input-field"
                                            />
                                        </td>
                                        <td className="border px-2 py-1">
                                            {capitalizationResults.find((r) => r.term === term)?.capitalization || "-"}
                                        </td>
                                        <td className="border px-2 py-1">
                                            {isMissed ? (
                                                <span className="text-red-500">Falta</span>
                                            ) : (
                                                <span className="text-green-500">Cumplido</span>
                                            )}
                                        </td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
                </div>
            )}

            {/* Calculate Button */}
            <button onClick={calculateCapitalization} className="btn-primary mt-4">
                Calcular Capitalización
            </button>

            {/* Capitalization Results */}
            {capitalizationResults.length > 0 && (
                <div className="mt-6">
                    <h3 className="text-xl font-semibold">Resultados de Capitalización</h3>
                    <ul>
                        {capitalizationResults.map((result) => (
                            <li key={result.term}>
                                Término {result.term}: Capitalización: ${result.capitalization} -{" "}
                                {result.missed ? "Depósito Perdido" : "Depósito Aplicado"}
                            </li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    );
}

export default AdministrationDashboard;
