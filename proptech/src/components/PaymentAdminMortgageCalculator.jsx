import React, { useState, useEffect } from 'react';

// Sample mock data including original loan terms and payment history
const paymentData = [
  {
    id: 1,
    month: 1,
    timestamp: '2024-01-15 10:00:00', // On-time payment
    interestPayment: 8.33,
    principalPayment: 79.58,
    punitiveInterest: 0.0,
    punitivePayment: 0.0,
    remainingBalance: 920.42,
  },
  {
    id: 2,
    month: 2,
    timestamp: '2024-02-20 10:00:00', // Late payment
    interestPayment: 7.67,
    principalPayment: 80.25,
    punitiveInterest: 1.5,
    punitivePayment: 1.5,
    remainingBalance: 840.17,
  },
  {
    id: 3,
    month: 3,
    timestamp: '2024-03-05 10:00:00', // On-time payment
    interestPayment: 7.00,
    principalPayment: 80.91,
    punitiveInterest: 0.0,
    punitivePayment: 0.0,
    remainingBalance: 759.36,
  },
  // Add more records as needed for testing
];

// Original loan terms
const originalLoanTerms = {
  principal: 10000, // Initial loan amount
  annualRate: 10, // Annual interest rate as a percentage
  term: 1, // Loan term in years
};

function PaymentAdminMortgageCalculator() {
  const [payments, setPayments] = useState([]);

  useEffect(() => {
    // Simulate fetching data from a JSON source
    setPayments(paymentData);
  }, []);

  // Function to determine if payment is late and apply punitive interest
  const calculatePunitiveInterest = (timestamp) => {
    const dueDate = new Date('2024-01-15T00:00:00'); // Assume payment is due on the 15th of each month
    const paymentDate = new Date(timestamp);
    const isLate = paymentDate > dueDate;

    if (isLate) {
      const daysLate = Math.ceil((paymentDate - dueDate) / (1000 * 60 * 60 * 24));
      const dailyPunitiveRate = 0.05; // Example 5% daily punitive interest on the overdue amount
      const punitiveAmount = daysLate * dailyPunitiveRate;
      return punitiveAmount.toFixed(2);
    }
    return 0.0;
  };

  // Function to get the next payment due (for highlighting)
  const getNextPaymentDue = () => {
    const today = new Date();
    return payments.find((record) => new Date(record.timestamp) > today);
  };

  const nextPaymentDue = getNextPaymentDue();

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white shadow-md rounded-lg">
       <h2 className="text-2xl font-bold mb-4">Resumen de pagos realizados</h2> {/*Payment Administration and Status */}

      <div className="mb-4">
         <h4 className="text-lg font-semibold">Condiciones del credito</h4>  {/*Original Loan Terms */}
        <p>Capital: ${originalLoanTerms.principal.toFixed(2)}</p>
        <p>Tasa de Interes anual: {originalLoanTerms.annualRate}%</p>
        <p>Pazo en años: {originalLoanTerms.term} year(s)</p>
      </div>

      <div className="mt-6">
        <h4 className="text-xl font-semibold mb-2">Tabla de pagos</h4>
        <table className="w-full mt-2 border-collapse">
          <thead>
            <tr>
              <th className="border px-2 py-1">Mes</th>
              <th className="border px-2 py-1">Fecha/Hora</th>
              <th className="border px-2 py-1">Pago Interes ($)</th>
              <th className="border px-2 py-1">Pago Capital ($)</th>
              <th className="border px-2 py-1">Interes Punitorio ($)</th>
              <th className="border px-2 py-1">Pago punitorios($)</th>
              <th className="border px-2 py-1">Saldo de Capital ($)</th>
            </tr>
          </thead>
          <tbody>
            {payments.map((record) => {
              const punitiveInterest = calculatePunitiveInterest(record.timestamp);
              const totalPunitivePayment = parseFloat(punitiveInterest) + record.punitivePayment;
              const isNextDue = nextPaymentDue && record.id === nextPaymentDue.id;

              return (
                <tr
                  key={record.id}
                  className={isNextDue ? 'bg-yellow-100' : ''}
                >
                  <td className="border px-2 py-1">{record.month}</td>
                  <td className="border px-2 py-1">{record.timestamp}</td>
                  <td className="border px-2 py-1">${record.interestPayment.toFixed(2)}</td>
                  <td className="border px-2 py-1">${record.principalPayment.toFixed(2)}</td>
                  <td className="border px-2 py-1">${punitiveInterest}</td>
                  <td className="border px-2 py-1">${totalPunitivePayment.toFixed(2)}</td>
                  <td className="border px-2 py-1">${record.remainingBalance.toFixed(2)}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default PaymentAdminMortgageCalculator;



/*************** version sin punitorios ********* */
// import React, { useState } from 'react';

// function PaymentAdminMortgageCalculator() {
//   const [principal, setPrincipal] = useState('');
//   const [annualRate, setAnnualRate] = useState('');
//   const [term, setTerm] = useState('');
//   const [monthlyPayment, setMonthlyPayment] = useState(null);
//   const [loanDetails, setLoanDetails] = useState([]);
//   const [paymentHistory, setPaymentHistory] = useState([]);
//   const [paymentAmount, setPaymentAmount] = useState('');

//   const calculateMortgage = () => {
//     const principalAmount = parseFloat(principal);
//     const monthlyInterestRate = parseFloat(annualRate) / 100 / 12;
//     const numberOfPayments = parseInt(term) * 12;

//     if (!principalAmount || !monthlyInterestRate || !numberOfPayments) {
//       alert('Please enter valid input');
//       return;
//     }

//     const monthlyPaymentCalc = (
//       principalAmount *
//       (monthlyInterestRate * Math.pow(1 + monthlyInterestRate, numberOfPayments))
//     ) / (Math.pow(1 + monthlyInterestRate, numberOfPayments) - 1);

//     setMonthlyPayment(monthlyPaymentCalc.toFixed(2));

//     let balance = principalAmount;
//     const details = [];
//     for (let i = 0; i < numberOfPayments; i++) {
//       const interestPayment = balance * monthlyInterestRate;
//       const principalPayment = monthlyPaymentCalc - interestPayment;
//       balance -= principalPayment;

//       if (balance < 0) {
//         balance = 0;
//       }

//       const paymentRecord = {
//         month: i + 1,
//         timestamp: new Date().toLocaleString(),
//         interestPayment: interestPayment.toFixed(2),
//         principalPayment: principalPayment.toFixed(2),
//         remainingBalance: balance.toFixed(2),
//       };
//       details.push(paymentRecord);

//       if (balance <= 0) break;
//     }
//     setLoanDetails(details);
//     setPaymentHistory([]);
//   };

//   const registerPayment = () => {
//     if (!paymentAmount || !loanDetails.length) {
//       alert('Please calculate the mortgage and enter a valid payment amount.');
//       return;
//     }

//     const currentBalance = parseFloat(loanDetails[loanDetails.length - 1].remainingBalance);
//     let payment = parseFloat(paymentAmount);

//     if (payment > currentBalance) {
//       payment = currentBalance;
//     }

//     const newInterestPayment = currentBalance * (parseFloat(annualRate) / 100 / 12);
//     const newPrincipalPayment = payment - newInterestPayment;
//     const newBalance = currentBalance - newPrincipalPayment;

//     const newPaymentRecord = {
//       month: paymentHistory.length + 1,
//       timestamp: new Date().toLocaleString(),
//       paymentAmount: payment.toFixed(2),
//       interestPayment: newInterestPayment.toFixed(2),
//       principalPayment: newPrincipalPayment.toFixed(2),
//       remainingBalance: Math.max(newBalance, 0).toFixed(2),
//     };

//     setPaymentHistory([...paymentHistory, newPaymentRecord]);
//     if (newBalance <= 0) {
//       alert('Congratulations! The loan has been paid off.');
//     }
//   };

//   return (
//     <div className="max-w-md mx-auto p-6 bg-white shadow-md rounded-lg">
//       <h2 className="text-2xl font-bold mb-4">Payment Administration Mortgage Calculator</h2>
//       <div className="space-y-4">
//         <input
//           type="number"
//           placeholder="Principal Amount ($)"
//           value={principal}
//           onChange={(e) => setPrincipal(e.target.value)}
//           className="w-full px-4 py-2 border rounded"
//         />
//         <input
//           type="number"
//           placeholder="Annual Interest Rate (%)"
//           value={annualRate}
//           onChange={(e) => setAnnualRate(e.target.value)}
//           className="w-full px-4 py-2 border rounded"
//         />
//         <input
//           type="number"
//           placeholder="Loan Term (Years)"
//           value={term}
//           onChange={(e) => setTerm(e.target.value)}
//           className="w-full px-4 py-2 border rounded"
//         />
//         <button
//           onClick={calculateMortgage}
//           className="w-full py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
//         >
//           Calculate Mortgage
//         </button>
//       </div>

//       {monthlyPayment && (
//         <div className="mt-6">
//           <h3 className="text-xl font-semibold">Original Monthly Payment: ${monthlyPayment}</h3>
//         </div>
//       )}

//       {loanDetails.length > 0 && (
//         <div className="mt-6">
//           <h4 className="text-xl font-semibold mb-2">Register a Payment</h4>
//           <input
//             type="number"
//             placeholder="Payment Amount ($)"
//             value={paymentAmount}
//             onChange={(e) => setPaymentAmount(e.target.value)}
//             className="w-full px-4 py-2 border rounded mb-2"
//           />
//           <button
//             onClick={registerPayment}
//             className="w-full py-2 bg-green-500 text-white rounded hover:bg-green-600"
//           >
//             Register Payment
//           </button>
//         </div>
//       )}

//       {paymentHistory.length > 0 && (
//         <div className="mt-6">
//           <h4 className="text-xl font-semibold mb-2">Payment History</h4>
//           <table className="w-full mt-2 border-collapse">
//             <thead>
//               <tr>
//                 <th className="border px-2 py-1">Month</th>
//                 <th className="border px-2 py-1">Date/Time</th>
//                 <th className="border px-2 py-1">Payment Amount</th>
//                 <th className="border px-2 py-1">Interest</th>
//                 <th className="border px-2 py-1">Principal</th>
//                 <th className="border px-2 py-1">Remaining Balance</th>
//               </tr>
//             </thead>
//             <tbody>
//               {paymentHistory.map((record) => (
//                 <tr key={record.month}>
//                   <td className="border px-2 py-1">{record.month}</td>
//                   <td className="border px-2 py-1">{record.timestamp}</td>
//                   <td className="border px-2 py-1">${record.paymentAmount}</td>
//                   <td className="border px-2 py-1">${record.interestPayment}</td>
//                   <td className="border px-2 py-1">${record.principalPayment}</td>
//                   <td className="border px-2 py-1">${record.remainingBalance}</td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         </div>
//       )}
//     </div>
//   );
// }

// export default PaymentAdminMortgageCalculator;
