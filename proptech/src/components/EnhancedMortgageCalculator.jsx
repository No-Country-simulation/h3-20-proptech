import React, { useState } from 'react';

function EnhancedMortgageCalculator() {
    const [principal, setPrincipal] = useState('');
    const [annualRate, setAnnualRate] = useState('');
    const [term, setTerm] = useState('');
    const [partialPayment, setPartialPayment] = useState('');
    const [partialPaymentMonth, setPartialPaymentMonth] = useState('');
    const [monthlyPayment, setMonthlyPayment] = useState(null);
    const [loanDetails, setLoanDetails] = useState([]);

    const calculateMortgage = () => {
        const principalAmount = parseFloat(principal);
        const monthlyInterestRate = parseFloat(annualRate) / 100 / 12;
        const numberOfPayments = parseInt(term) * 12;

        if (!principalAmount || !monthlyInterestRate || !numberOfPayments) {
            alert('Ingrese un valor valido');
            return;
        }

        const monthlyPaymentCalc = (
            principalAmount *
            (monthlyInterestRate * Math.pow(1 + monthlyInterestRate, numberOfPayments))
        ) / (Math.pow(1 + monthlyInterestRate, numberOfPayments) - 1);

        setMonthlyPayment(monthlyPaymentCalc.toFixed(2));

        let balance = principalAmount;
        const details = [];
        for (let i = 0; i < numberOfPayments; i++) {
            if (i + 1 === parseInt(partialPaymentMonth)) {
                balance -= parseFloat(partialPayment);
            }

            const interestPayment = balance * monthlyInterestRate;
            const principalPayment = monthlyPaymentCalc - interestPayment;
            balance -= principalPayment;

            if (balance < 0) {
                balance = 0;
            }

            details.push({
                month: i + 1,
                interestPayment: interestPayment.toFixed(2),
                principalPayment: principalPayment.toFixed(2),
                remainingBalance: balance.toFixed(2),
            });

            if (balance <= 0) break;
        }
        setLoanDetails(details);
    };

    return (
        <div className="max-w-md mx-auto p-6 bg-inherit shadow-md rounded-lg">
            <h2 className="text-2xl font-bold mb-4">Calculadora adelanto de capital</h2>
            <div className="space-y-4">
                <input
                    type="number"
                    placeholder="Capital ($))"
                    value={principal}
                    onChange={(e) => setPrincipal(e.target.value)}
                    className="input-field"
                />
                <input
                    type="number"
                    placeholder="Tasa de Interes anual (%)"
                    value={annualRate}
                    onChange={(e) => setAnnualRate(e.target.value)}
                    className="input-field"
                />
                <input
                    type="number"
                    placeholder="Plazo en años"
                    value={term}
                    onChange={(e) => setTerm(e.target.value)}
                    className="input-field"
                />
                <input
                    type="number"
                    placeholder="Adelanto de Capital ($)"  //Partial Payment Amount ($)
                    value={partialPayment}
                    onChange={(e) => setPartialPayment(e.target.value)}
                    className="input-field"
                />
                <input
                    type="number"
                    placeholder="Mes de Adelnto de Capital"  //Month for Partial Payment
                    value={partialPaymentMonth}
                    onChange={(e) => setPartialPaymentMonth(e.target.value)}
                    className="input-field"
                />
                <div className='flex px-2 space-x-4'>
                    <button className="btn-tertiary w-full">Borrar campos</button>
                    <button
                        onClick={calculateMortgage}
                        className="btn-primary w-full"
                    >
                        Calcular
                    </button>
                </div>
            </div>

            {monthlyPayment && (
                <div className="mt-6">
                    <h3 className="text-xl font-semibold">Pago Mensual: ${monthlyPayment}</h3>
                    <h4 className="mt-4">Calendario de pagos (Adelanto de capital):</h4>
                    <table className="w-full mt-2 border-collapse">
                        <thead>
                            <tr>
                                <th className="border px-2 py-1">Mes</th>
                                <th className="border px-2 py-1">Interes</th>
                                <th className="border px-2 py-1">Capital</th>
                                <th className="border px-2 py-1">Saldo Restante</th>
                            </tr>
                        </thead>
                        <tbody>
                            {loanDetails.map((detail) => (
                                <tr key={detail.month}>
                                    <td className="border px-2 py-1">{detail.month}</td>
                                    <td className="border px-2 py-1">${detail.interestPayment}</td>
                                    <td className="border px-2 py-1">${detail.principalPayment}</td>
                                    <td className="border px-2 py-1">${detail.remainingBalance}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
}

export default EnhancedMortgageCalculator;
