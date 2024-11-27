import React, { useState } from 'react';

function MortgageCalculator() {
    const [principal, setPrincipal] = useState('');
    const [annualRate, setAnnualRate] = useState('');
    const [term, setTerm] = useState('');
    const [monthlyPayment, setMonthlyPayment] = useState(null);
    const [loanDetails, setLoanDetails] = useState([]);

    //   Explanation of the Calculation
    //   The French amortization system formula:
    //   M=(P⋅r⋅(1+r)^n)/((1+r)^n − 1)

    //   Where:
    //       MM = Monthly payment
    //       PP = Principal loan amount
    //       rr = Monthly interest rate (annual rate / 12 / 100)
    //       nn = Total number of payments (loan term in years * 12)

    // Function to calculate monthly payment using the French system
    const calculateMortgage = () => {
        const principalAmount = parseFloat(principal);
        const monthlyInterestRate = parseFloat(annualRate) / 100 / 12;
        const numberOfPayments = parseInt(term) * 12;

        if (!principalAmount || !monthlyInterestRate || !numberOfPayments) {
            alert('Ingrese un valor valido');
            return;
        }

        // Calculate the monthly payment using the formula:
        // M = P[r(1+r)^n] / [(1+r)^n - 1]
        const monthlyPaymentCalc = (
            principalAmount *
            (monthlyInterestRate * Math.pow(1 + monthlyInterestRate, numberOfPayments))
        ) / (Math.pow(1 + monthlyInterestRate, numberOfPayments) - 1);

        setMonthlyPayment(monthlyPaymentCalc.toFixed(2));

        // Create an amortization schedule
        let balance = principalAmount;
        const details = [];
        for (let i = 0; i < numberOfPayments; i++) {
            const interestPayment = balance * monthlyInterestRate;
            const principalPayment = monthlyPaymentCalc - interestPayment;
            balance -= principalPayment;
            details.push({
                month: i + 1,
                interestPayment: interestPayment.toFixed(2),
                principalPayment: principalPayment.toFixed(2),
                remainingBalance: Math.max(balance, 0).toFixed(2),
            });
        }
        setLoanDetails(details);
    };

    return (
        <div className="max-w-md mx-auto p-6 bg-inherit shadow-md rounded-lg">
            <h2 className="text-2xl font-bold mb-4">Calculadora de pagos</h2>
            <div className="space-y-4">

                <input
                    type="number"
                    placeholder="Ingresa el capital que necesitas"
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
                    placeholder="Ingresa plazo en años"
                    value={term}
                    onChange={(e) => setTerm(e.target.value)}
                    className="input-field"
                />
                <div className="flex px-2 space-x-4">
                    <button className="btn-tertiary w-full">Borrar campos</button>
                    <button onClick={calculateMortgage} className="btn-primary w-full">
                        Calcular
                    </button>
                </div>
            </div>

            {monthlyPayment && (
                <div className="mt-6">
                    <h3 className="text-xl font-semibold">Pago Mensual: ${monthlyPayment}</h3>
                    <h4 className="mt-4">Calendario de pagos:</h4>
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

export default MortgageCalculator;
