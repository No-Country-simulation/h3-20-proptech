import React, { useState } from 'react';
import Checkbox from '@mui/material/Checkbox';

function InvestorReturnCalculator() {
    const [principal, setPrincipal] = useState('');
    const [annualRate, setAnnualRate] = useState('');
    const [term, setTerm] = useState('');
    const [termType, setTermType] = useState('years'); // Default term type is years
    const [reinvestReturns, setReinvestReturns] = useState(false);
    const [results, setResults] = useState([]);
    const [monthlyReturn, setMonthlyReturn] = useState(0); // To display in h3

    const [errors, setErrors] = useState({ principal: false, annualRate: false, term: false });
    const validateInput = () => {
        const newErrors = {
            principal: !/^\d+$/.test(principal),
            annualRate: !/^\d+(\.\d+)?$/.test(annualRate),
            term: !/^\d+$/.test(term),
        };
        setErrors(newErrors);
        return !Object.values(newErrors).some((error) => error);
    };

    const calculateReturns = () => {
        const principalAmount = parseFloat(principal);
        const monthlyInterestRate = parseFloat(annualRate) / 100 / 12;
        const numberOfPayments =
            termType === 'years' ? parseInt(term) * 12 : parseInt(term);

        if (!principalAmount || !monthlyInterestRate || !numberOfPayments) {
            alert('Ingrese valores válidos');
            return;
        }

        let balance = principalAmount;
        const details = [];

        for (let i = 0; i < numberOfPayments; i++) {
            const monthlyReturnValue = balance * monthlyInterestRate;

            if (reinvestReturns) {
                // Reinvest monthly returns
                balance += monthlyReturnValue;
            }

            details.push({
                month: i + 1,
                monthlyReturn: monthlyReturnValue.toFixed(2),
                balance: balance.toFixed(2),
            });

            // Only calculate the first month's return for display if reinvestment is OFF
            if (i === 0 && !reinvestReturns) {
                setMonthlyReturn(monthlyReturnValue.toFixed(2));
            }
        }

        // If reinvestment is ON, set monthly return display to 0
        if (reinvestReturns) {
            setMonthlyReturn(0);
        }

        setResults(details);
    };

    const clearFields = () => {
        setPrincipal('');
        setAnnualRate('');
        setTerm('');
        setReinvestReturns(false);
        setResults([]);
        setMonthlyReturn(0); // Reset displayed return
        setTermType('years'); // Reset term type to default
    };

    return (
        <div className="max-w-md mx-auto p-6 bg-inherit border-2 border-secondary shadow-md rounded-xl focus-within:shadow-primary">
            <h2 className="text-2xl font-bold mb-4 text-center text-text-primary">Calculá tu ganancia</h2>
            <div className="space-y-4 ">
                <label className="font-bold text-text-primary mb-1">Capital</label>
                <input
                    type="number"
                    placeholder="Ingresa el capital que necesitas"
                    value={principal}
                    onChange={(e) => setPrincipal(e.target.value)}
                    className="input-field "
                />
                <label className='font-bold text-text-primary mb-1'>Tasa de Interes anual</label>
                <input
                    type="number"
                    placeholder="Tasa de Interés Anual (%)"
                    value={annualRate}
                    onChange={(e) => setAnnualRate(e.target.value)}
                    className="input-field"
                />
                <label className='font-bold text-text-primary mb-1'>Plazo en {termType === 'years' ? "años" : "meses"}</label>
                <div className='flex space-x-4'>
                    <div>
                        <input
                            type="number"
                            placeholder={termType === 'years' ? "Plazo en años" : "Plazo en meses"}
                            value={term}
                            onChange={(e) => setTerm(e.target.value)}
                            className="input-field"
                        />
                    </div>
                    <div className="items-center ">
                        <label className="flex items-center">
                            <input
                                type="checkbox"
                                name="termType"
                                value="years"
                                checked={termType === 'years'}
                                onChange={(e) => setTermType(e.target.value)}
                                className="mr-2 checkbox-custom "
                            />
                            Años
                        </label>
                        <label className="flex items-center">
                            <input
                                type="checkbox"
                                name="termType"
                                value="months"
                                checked={termType === 'months'}
                                onChange={(e) => setTermType(e.target.value)}
                                className="mr-2 checkbox-custom"
                            />
                            Meses
                        </label>
                    </div>
                </div>

                <div className="flex items-center">
                    <input
                        type="checkbox"
                        checked={reinvestReturns}
                        onChange={(e) => setReinvestReturns(e.target.checked)}
                        className="mr-2 checkbox-custom"
                    // className="rounded-checkbox border-2 border-[#042C31] bg-[#DD5E30] text-[#042C31]"
                    />
                    <label>Reinvertir retornos mensuales</label>
                </div>
                <div className="flex space-x-4">
                    <button
                        className="btn-tertiary w-full"
                        onClick={clearFields}
                    >
                        Borrar campos
                    </button>
                    <button
                        className="btn-primary w-full"
                        onClick={calculateReturns}
                    >
                        Calcular
                    </button>
                </div>
            </div>

            {results.length > 0 && (
                <div className="mt-6">
                    <h3 className="text-xl font-semibold">Retiro Mensual: ${monthlyReturn}</h3>
                    <h3 className="text-xl font-semibold">Detalles de Retornos:</h3>
                    <table className="w-full mt-2 border-collapse">
                        <thead>
                            <tr>
                                <th className="border px-2 py-1">Mes</th>
                                <th className="border px-2 py-1">Retorno Mensual</th>
                                <th className="border px-2 py-1">Balance</th>
                            </tr>
                        </thead>
                        <tbody>
                            {results.map((detail) => (
                                <tr key={detail.month}>
                                    <td className="border px-2 py-1">{detail.month}</td>
                                    <td className="border px-2 py-1">${detail.monthlyReturn}</td>
                                    <td className="border px-2 py-1">${detail.balance}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
}

export default InvestorReturnCalculator;
