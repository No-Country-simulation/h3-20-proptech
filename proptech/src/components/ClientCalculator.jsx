import React, { useState } from 'react';
import { useEffect } from "react";

const productData = {
    tea1: [20, 26.824179, 34.488882, 42.576089, 51.106866, 60.103222],
    plazoMin: 3,
    plazoMax: 360,
    index1: [1.05, 1.075, 1.15],
    discount1: [15, 10],
};

function ClientCalculator() {
    const [principal, setPrincipal] = useState('');
    const [annualRate, setAnnualRate] = useState(productData.tea1[0]);
    const [term, setTerm] = useState(productData.plazoMin);
    const [monthlyPayment, setMonthlyPayment] = useState(null);
    const [loanDetails, setLoanDetails] = useState([]);
    const [calculationType, setCalculationType] = useState('ORO');

    // Inputs for quick calculation
    const [price, setPrice] = useState(26600);
    const [advancePayment, setAdvancePayment] = useState(7000);
    const [postPayment, setPostPayment] = useState(0);
    const [autoValue, setAutoValue] = useState(10000);
    const [autoRepair, setAutoRepair] = useState(400);

    const [errors, setErrors] = useState({ price: null, advancePayment: null, postPayment: null,autoValue: null,autoRepair:null, principal: null, annualRate: null, term: null }); // null: no validation yet, true: invalid, false: valid
    const [focus, setFocus] = useState({price: null, advancePayment: null, postPayment: null,autoValue: null,autoRepair:null,  principal: false, annualRate: false, term: false });

    useEffect(() => {
        // console.log("Updated principal:", principal, "Updated annualRate:", annualRate, "Updated term:", term);
    },[price, advancePayment, postPayment, autoValue, autoRepair, principal, annualRate, term]);    

    const validateField = (field, value) => {
        if (value === "") return false;
        if (field === "price") return !/^\d+$/.test(value);
        if (field === "advancePayment") return !/^\d+$/.test(value);
        if (field === "postPayment") return !/^\d*$/.test(value);
        if (field === "autoValue") return !/^\d+$/.test(value);
        if (field === "autoRepair") return !/^\d+$/.test(value);
        if (field === "principal") return !/^\d+$/.test(value);
        if (field === "annualRate") return !/^\d+(\.\d+)?$/.test(value);
        if (field === "term") return !/^\d+$/.test(value);
        return false;
    };
    
    const handleInputChange = (field, value) => {
        // Update the state
        if (field === "price") setPrice(value);
        if (field === "advancePayment") setAdvancePayment(value);
        if (field === "postPayment") setPostPayment(value);
        if (field === "autoValue") setAutoValue(value);
        if (field === "autoRepair") setAutoRepair(value);
        if (field === "principal") setPrincipal(value);
        if (field === "annualRate") setAnnualRate(value);
        if (field === "term") setTerm(value);

        // Validate the field
        const isValid = !validateField(field, value);
        setErrors((prevErrors) => ({ ...prevErrors, [field]: !value ? true : !isValid }));

    };
    const handleFocus = (field) => {
        setFocus((prevFocus) => ({ ...prevFocus, [field]: true }));
    };        
    const handleBlur = (field) => {
        setFocus((prevFocus) => ({ ...prevFocus, [field]: false }));
    };


    // Reverse calculation to get nominal rate from TEA
    const calculateNominalRate = (tea, npery) => {
        return npery * (Math.pow(1 + tea / 100, 1 / npery) - 1);
    };

    // Determine calculation type
    const determineCalculationType = () => {
        const valueRate = (advancePayment + postPayment + autoValue * (1 - productData.discount1[0] / 100) - autoRepair) / price;

        if (valueRate < 0.3) {
            setCalculationType('PLATA');
        } else {
            setCalculationType('ORO');
        }

        const suggestedPrincipal = price - (advancePayment + postPayment + autoValue * (1 - productData.discount1[0] / 100) - autoRepair);
        setPrincipal(suggestedPrincipal.toFixed(2));
    };

    // Calculate monthly payment and schedule
    const calculateMortgage = () => {
        const principalAmount = parseFloat(principal);
        const nominalRate = calculateNominalRate(annualRate, 12);
        const monthlyInterestRate = nominalRate / 12 ;
        const numberOfPayments = parseInt(term);

        if (!principalAmount || !monthlyInterestRate || !numberOfPayments) {
            alert('Ingrese un valor válido');
            return;
        }

        const monthlyPaymentCalc = (
            principalAmount *
            (monthlyInterestRate * Math.pow(1 + monthlyInterestRate, numberOfPayments))
        ) / (Math.pow(1 + monthlyInterestRate, numberOfPayments) - 1);

        let additionalCostRate;
        if (calculationType === 'ORO') {
            additionalCostRate = productData.index1[0];
        } else {
            additionalCostRate =
                numberOfPayments <= 30
                    ? productData.index1[0] * productData.index1[1]
                    : productData.index1[0] * productData.index1[2];
        }

        setMonthlyPayment((monthlyPaymentCalc * additionalCostRate).toFixed(2));

        // Create amortization schedule
        let balance = principalAmount;
        const details = [];
        for (let i = 0; i < numberOfPayments; i++) {
            const interestPayment = balance * monthlyInterestRate;
            const principalPayment = monthlyPaymentCalc - interestPayment;
            balance -= principalPayment;

            const rate =
                calculationType === 'ORO'
                    ? productData.index1[0]
                    : numberOfPayments <= 30  //  for split calculation   : i <= 30
                        ? productData.index1[0] * productData.index1[1]
                        : productData.index1[0] * productData.index1[2];

            const additionalCost = monthlyPaymentCalc * rate;

            details.push({
                month: i + 1,
                interestPayment: interestPayment.toFixed(2),
                principalPayment: principalPayment.toFixed(2),
                remainingBalance: Math.max(balance, 0).toFixed(2),
                additionalCost: additionalCost.toFixed(2),
            });
        }
        setLoanDetails(details);
    };

    const clearFields = () => {
        setPrincipal('');
        setAnnualRate(productData.tea1[0]);
        setTerm(productData.plazoMin);
        setMonthlyPayment(null);
        setLoanDetails([]);
        setCalculationType('');
    };

    return (
        <div className="min-w-[40vw] mx-auto p-6 bg-inherit border-2 border-secondary shadow-md rounded-xl focus-within:shadow-primary">
            <h2 className="text-2xl font-bold mb-4 text-center text-text-primary w-full">Calculadora de pagos</h2>
            <div className="space-y-4">
            <div >
                <label className="font-bold text-text-primary mb-1">Precio del terreno</label>
                    <p
                        className={`text-sm mt-1 ${errors.price === true
                            ? "p-messageError"
                            : focus.price && errors.price === false
                                ? "p-messageOk"
                                : "p-message"
                            }`}
                    >
                        Precio del terreno.
                    </p>
                <input
                    type="number"
                    placeholder="Precio Contado"
                    value={price}
                    onChange={(e) => handleInputChange("price", parseFloat(e.target.value))}
                    onBlur={() => handleBlur("price")}
                    onFocus={() => handleFocus("price")}                    
                    className="input-field"
                />
                </div>
                <div>
                <label className="font-bold text-text-primary mb-1">Seña o Contado</label>
                    <p
                        className={`text-sm mt-1 ${errors.advancePayment === true
                            ? "p-messageError"
                            : errors.advancePayment === false && focus.advancePayment
                                ? "p-messageOk"
                                : "p-message"
                            }`}
                    >
                        Seña o pago adelantado de contado.
                    </p>

                <input
                    type="number"
                    placeholder="Seña o Contado"
                    value={advancePayment}
                    onChange={(e) => handleInputChange("advancePayment", parseFloat(e.target.value))}
                    onBlur={() => handleBlur("advancePayment")}
                    onFocus={() => handleFocus("advancePayment")}     
                    className="input-field"
                />
                </div>
                <div>                
                <label className="font-bold text-text-primary mb-1">Entrega posterior</label>
                    <p
                        className={`text-sm mt-1 ${errors.postPayment === true
                            ? "p-messageError"
                            : errors.postPayment === false && focus.postPayment
                                ? "p-messageOk"
                                : "p-message"
                            }`}
                    >
                        Entrega de contado posterior
                    </p>
                <input
                    type="number"
                    placeholder="Entrega Posterior"
                    value={postPayment}
                    onChange={(e) => handleInputChange("postPayment", parseFloat(e.target.value))}
                    onBlur={() => handleBlur("postPayment")}
                    onFocus={() => handleFocus("postPayment")}  
                    className="input-field"
                />
                </div>
                <div>                
                <label className="font-bold text-text-primary mb-1">Infoauto</label>
                    <p
                        className={`text-sm mt-1 ${errors.autoValue === true
                            ? "p-messageError"
                            : errors.autoValue === false && focus.autoValue
                                ? "p-messageOk"
                                : "p-message"
                            }`}
                    >
                        Precio del auto.
                    </p>
                <input
                    type="number"
                    placeholder="Infoauto"
                    value={autoValue}
                    onChange={(e) => handleInputChange("autoValue", parseFloat(e.target.value))}
                    onBlur={() => handleBlur("autoValue")}
                    onFocus={() => handleFocus("autoValue")}  
                    className="input-field"
                />
                </div>
                <div>                
                <label className="font-bold text-text-primary mb-1">Reparaciones</label>
                    <p
                        className={`text-sm mt-1 ${errors.autoRepair === true
                            ? "p-messageError"
                            : errors.autoRepair === false && focus.autoRepair
                                ? "p-messageOk"
                                : "p-message"
                            }`}
                    >
                        Reparaciones del auto.
                    </p>
                <input
                    type="number"
                    placeholder="Reparaciones"
                    value={autoRepair}
                    onChange={(e) => handleInputChange("autoRepair", parseFloat(e.target.value))}
                    onBlur={() => handleBlur("autoRepair")}
                    onFocus={() => handleFocus("autoRepair")}  
                    className="input-field"
                />
                </div>
                <button className="btn-primary w-full" onClick={determineCalculationType}>
                    Ver tipo de cuota y capital a solicitar
                </button>
                <h3 className="text-xl font-semibold">
                        Cuota Mensual ({calculationType}): ${monthlyPayment}
                    </h3>
                <div className="space-y-4">
                <div >                
                <label className="font-bold text-text-primary mb-1">Capital a solicitar en pesos</label>
                    <p
                        className={`text-sm mt-1 ${errors.principal === true
                            ? "p-messageError"
                            : errors.principal === false && focus.principal
                                ? "p-messageOk"
                                : "p-message"
                            }`}
                    >
                        Ingresa el capital que necesitas.
                    </p>
                <input
                    type="number"
                    placeholder={`Capital sugerido: ${principal}`}
                    value={principal}
                    onChange={(e) => setPrincipal(e.target.value)}
                    className="input-field"
                    />
                    </div>
                        <div>
                    <label className='font-bold text-text-primary mb-1'>Tasa de Interes anual</label>
                    <p
                        className={`text-sm mt-1 ${errors.annualRate === true
                            ? "p-messageError"
                            : focus.annualRate && errors.annualRate === false
                                ? "p-messageOk"
                                : "p-message"
                            }`}
                    >
                        Tasa de interes expresada en (%)
                    </p>
                <select
                    value={annualRate}
                    onChange={(e) => setAnnualRate(parseFloat(e.target.value))}
                    className="input-field"
                >
                    {productData.tea1.map((rate, idx) => (
                        <option key={idx} value={rate}>
                            {rate.toFixed(2)}%
                        </option>
                    ))}
                </select>
                </div>
                <div>  
                <label className="font-bold text-text-primary mb-1">Plazo en meses</label>
                    <p
                        className={`text-sm mt-1 ${errors.term === true
                            ? "p-messageError"
                            : errors.term === false && focus.term
                                ? "p-messageOk"
                                : "p-message"
                            }`}
                    >
                        Plazo hasta 360 meses.
                    </p>
                <input
                    type="number"
                    placeholder={`Plazo (meses) entre ${productData.plazoMin} y ${productData.plazoMax}`}
                    value={term}
                    onChange={(e) => setTerm(e.target.value)}
                    min={productData.plazoMin}
                    max={productData.plazoMax}
                    className="input-field"
                />
                 </div>
                <div className="flex px-2 space-x-4">
                    <button className="btn-tertiary w-full" onClick={clearFields}>
                        Borrar campos
                    </button>
                    <button onClick={calculateMortgage} className="btn-primary w-full">
                        Calcular
                    </button>
                </div>
                </div>
            </div>

            {monthlyPayment && (
                <div className="mt-6">
                    <h3 className="text-xl font-semibold">
                        Cuota Mensual ({calculationType}): ${monthlyPayment}
                    </h3>
                    <h4 className="mt-4">Calendario de pagos:</h4>
                    <table className="w-full mt-2 border-collapse">
                        <thead>
                            <tr>
                                <th className="border px-2 py-1">Mes</th>
                                <th className="border px-2 py-1">Interes</th>
                                <th className="border px-2 py-1">Capital</th>
                                <th className="border px-2 py-1">Saldo Restante</th>
                                <th className="border px-2 py-1">Cuota mensual</th>
                            </tr>
                        </thead>
                        <tbody>
                            {loanDetails.map((detail) => (
                                <tr key={detail.month}>
                                    <td className="border px-2 py-1">{detail.month}</td>
                                    <td className="border px-2 py-1">${detail.interestPayment}</td>
                                    <td className="border px-2 py-1">${detail.principalPayment}</td>
                                    <td className="border px-2 py-1">${detail.remainingBalance}</td>
                                    <td className="border px-2 py-1">${detail.additionalCost}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
}

export default ClientCalculator;

//*************** calculator basic with cost index[0] OK. ****************//
// import React, { useState } from 'react';

// const productData = {
//     tea1: [20, 26.824179, 34.488882, 42.576089,	51.106866, 60.103222],
//     plazoMin: 3,
//     plazoMax: 360,
//     index1: [1.05, 1.075, 1.15],
// };

// function ClientCalculator() {
//     const [principal, setPrincipal] = useState('');
//     const [annualRate, setAnnualRate] = useState(productData.tea1[0]);
//     const [term, setTerm] = useState(productData.plazoMin);
//     const [monthlyPayment, setMonthlyPayment] = useState(null);
//     const [loanDetails, setLoanDetails] = useState([]);

//     // Reverse calculation to get nominal rate from TEA
//     const calculateNominalRate = (tea, npery) => {
//         console.log(npery);
//         let tna = npery * (Math.pow(1 + tea / 100, 1 / npery) - 1);
//         console.log(tna);

//         return npery * (Math.pow(1 + tea / 100, 1 / npery) - 1);
//     };

//     // Function to calculate monthly payment and schedule
//     const calculateMortgage = () => {
//         const principalAmount = parseFloat(principal);
//         const nominalRate = calculateNominalRate(annualRate, 12);
//         const monthlyInterestRate = nominalRate / 12 ;
//         const numberOfPayments = parseInt(term);

//         if (!principalAmount || !monthlyInterestRate || !numberOfPayments) {
//             alert('Ingrese un valor válido');
//             return;
//         }

//         const monthlyPaymentCalc = (
//             principalAmount *
//             (monthlyInterestRate * Math.pow(1 + monthlyInterestRate, numberOfPayments))
//         ) / (Math.pow(1 + monthlyInterestRate, numberOfPayments) - 1);

//         const additionalCostRate = productData.index1[0];
//         setMonthlyPayment(monthlyPaymentCalc.toFixed(2)*additionalCostRate);

//         // Create an amortization schedule with additional cost
//         let balance = principalAmount;
//         const details = [];
//         for (let i = 0; i < numberOfPayments; i++) {
//             const interestPayment = balance * monthlyInterestRate;
//             const principalPayment = monthlyPaymentCalc - interestPayment;
//             balance -= principalPayment;
//             const additionalCost = monthlyPaymentCalc * additionalCostRate;

//             details.push({
//                 month: i + 1,
//                 interestPayment: interestPayment.toFixed(2),
//                 principalPayment: principalPayment.toFixed(2),
//                 remainingBalance: Math.max(balance, 0).toFixed(2),
//                 additionalCost: additionalCost.toFixed(2),
//             });
//         }
//         setLoanDetails(details);
//     };

//     const clearFields = () => {
//         setPrincipal('');
//         setAnnualRate(productData.tea1[0]);
//         setTerm(productData.plazoMin);
//         setMonthlyPayment(null);
//         setLoanDetails([]);
//     };

//     return (
//         <div className="max-w-md mx-auto p-6 bg-inherit shadow-md rounded-lg">
//             <h2 className="text-2xl font-bold mb-4">Calculadora de pagos</h2>
//             <div className="space-y-4">
//                 <input
//                     type="number"
//                     placeholder="Ingresa el capital que necesitas"
//                     value={principal}
//                     onChange={(e) => setPrincipal(e.target.value)}
//                     className="input-field"
//                 />
//                 <select
//                     value={annualRate}
//                     onChange={(e) => setAnnualRate(parseFloat(e.target.value))}
//                     className="input-field"
//                 >
//                     {productData.tea1.map((rate, idx) => (
//                         <option key={idx} value={rate}>
//                             {rate.toFixed(2)}%
//                         </option>
//                     ))}
//                 </select>
//                 <input
//                     type="number"
//                     placeholder={`Plazo (meses) entre ${productData.plazoMin} y ${productData.plazoMax}`}
//                     value={term}
//                     onChange={(e) => setTerm(e.target.value)}
//                     min={productData.plazoMin}
//                     max={productData.plazoMax}
//                     className="input-field"
//                 />
//                 <div className="flex px-2 space-x-4">
//                     <button className="btn-tertiary w-full" onClick={clearFields}>Borrar campos</button>
//                     <button onClick={calculateMortgage} className="btn-primary w-full">
//                         Calcular
//                     </button>
//                 </div>
//             </div>

//             {monthlyPayment && (
//                 <div className="mt-6">
//                     <h3 className="text-xl font-semibold">Cuota Mensual: ${monthlyPayment}</h3>
//                     <h4 className="mt-4">Calendario de pagos:</h4>
//                     <table className="w-full mt-2 border-collapse">
//                         <thead>
//                             <tr>
//                                 <th className="border px-2 py-1">Mes</th>
//                                 <th className="border px-2 py-1">Interes</th>
//                                 <th className="border px-2 py-1">Capital</th>
//                                 <th className="border px-2 py-1">Saldo Restante</th>
//                                 <th className="border px-2 py-1">Cuota Mensual</th>
//                             </tr>
//                         </thead>
//                         <tbody>
//                             {loanDetails.map((detail) => (
//                                 <tr key={detail.month}>
//                                     <td className="border px-2 py-1">{detail.month}</td>
//                                     <td className="border px-2 py-1">${detail.interestPayment}</td>
//                                     <td className="border px-2 py-1">${detail.principalPayment}</td>
//                                     <td className="border px-2 py-1">${detail.remainingBalance}</td>
//                                     <td className="border px-2 py-1">${detail.additionalCost}</td>
//                                 </tr>
//                             ))}
//                         </tbody>
//                     </table>
//                 </div>
//             )}
//         </div>
//     );
// }

// export default ClientCalculator;




// const productData = [
//     {
//         "status": 200,
//         "results": {
//             "tnm1": [1.531, 2.00, 2.50, 3, 3.50, 4],
//             "tnm2": [, , , , , ],
//             "tea1": [20, , , , , ],
//             "tea2": [, , , , , ],
//             "plazoMin": [3, 3, 31, , , ],
//             "plazoMax": [360, 30, 360, , , ],
//             "index1": [1.05, 1.075, 1.15, , , ],
//             "index2": [, , , , , ],
//             "costo1": [, , , , , ],
//             "costo2": [, , , , , ],
//             "sello1": [, , , , , ],
//             "sello2": [, , , , , ],
//         }
//     }
// ]


// import React, { useState } from 'react';

// function ClientCalculator() {
//     const [principal, setPrincipal] = useState('');
//     const [annualRate, setAnnualRate] = useState('');
//     const [term, setTerm] = useState('');
//     const [monthlyPayment, setMonthlyPayment] = useState(null);
//     const [loanDetails, setLoanDetails] = useState([]);

//     //   Explanation of the Calculation
//     //   The French amortization system formula:
//     //   M=(P⋅r⋅(1+r)^n)/((1+r)^n − 1)

//     //   Where:
//     //       MM = Monthly payment
//     //       PP = Principal loan amount
//     //       rr = Monthly interest rate (annual rate / 12 / 100)
//     //       nn = Total number of payments (loan term in years * 12)

//     // Function to calculate monthly payment using the French system
//     const calculateMortgage = () => {
//         const principalAmount = parseFloat(principal);
//         const monthlyInterestRate = parseFloat(annualRate) / 100 / 12;
//         const numberOfPayments = parseInt(term) * 12;

//         if (!principalAmount || !monthlyInterestRate || !numberOfPayments) {
//             alert('Ingrese un valor valido');
//             return;
//         }

//         // Calculate the monthly payment using the formula:
//         // M = P[r(1+r)^n] / [(1+r)^n - 1]
//         const monthlyPaymentCalc = (
//             principalAmount *
//             (monthlyInterestRate * Math.pow(1 + monthlyInterestRate, numberOfPayments))
//         ) / (Math.pow(1 + monthlyInterestRate, numberOfPayments) - 1);

//         setMonthlyPayment(monthlyPaymentCalc.toFixed(2));

//         // Create an amortization schedule
//         let balance = principalAmount;
//         const details = [];
//         for (let i = 0; i < numberOfPayments; i++) {
//             const interestPayment = balance * monthlyInterestRate;
//             const principalPayment = monthlyPaymentCalc - interestPayment;
//             balance -= principalPayment;
//             details.push({
//                 month: i + 1,
//                 interestPayment: interestPayment.toFixed(2),
//                 principalPayment: principalPayment.toFixed(2),
//                 remainingBalance: Math.max(balance, 0).toFixed(2),
//             });
//         }
//         setLoanDetails(details);
//     };

//     const clearFields = () => {
//         setPrincipal('');
//         setAnnualRate('');
//         setTerm('');
//         setMonthlyPayment(''); 
//         setLoanDetails('');
//     };

//     return (
//         <div className="max-w-md mx-auto p-6 bg-inherit shadow-md rounded-lg">
//             <h2 className="text-2xl font-bold mb-4">Calculadora de pagos</h2>
//             <div className="space-y-4">

//                 <input
//                     type="number"
//                     placeholder="Ingresa el capital que necesitas"
//                     value={principal}
//                     onChange={(e) => setPrincipal(e.target.value)}
//                     className="input-field"
//                 />
//                 <input
//                     type="number"
//                     placeholder="Tasa de Interes anual (%)"
//                     value={annualRate}
//                     onChange={(e) => setAnnualRate(e.target.value)}
//                     className="input-field"
//                 />
//                 <input
//                     type="number"
//                     placeholder="Ingresa plazo en años"
//                     value={term}
//                     onChange={(e) => setTerm(e.target.value)}
//                     className="input-field"
//                 />
//                 <div className="flex px-2 space-x-4">
//                     <button className="btn-tertiary w-full" onClick={clearFields}>Borrar campos</button>
//                     <button onClick={calculateMortgage} className="btn-primary w-full">
//                         Calcular
//                     </button>
//                 </div>
//             </div>

//             {monthlyPayment && (
//                 <div className="mt-6">
//                     <h3 className="text-xl font-semibold">Pago Mensual: ${monthlyPayment}</h3>
//                     <h4 className="mt-4">Calendario de pagos:</h4>
//                     <table className="w-full mt-2 border-collapse">
//                         <thead>
//                             <tr>
//                                 <th className="border px-2 py-1">Mes</th>
//                                 <th className="border px-2 py-1">Interes</th>
//                                 <th className="border px-2 py-1">Capital</th>
//                                 <th className="border px-2 py-1">Saldo Restante</th>
//                             </tr>
//                         </thead>
//                         <tbody>
//                             {loanDetails.map((detail) => (
//                                 <tr key={detail.month}>
//                                     <td className="border px-2 py-1">{detail.month}</td>
//                                     <td className="border px-2 py-1">${detail.interestPayment}</td>
//                                     <td className="border px-2 py-1">${detail.principalPayment}</td>
//                                     <td className="border px-2 py-1">${detail.remainingBalance}</td>
//                                 </tr>
//                             ))}
//                         </tbody>
//                     </table>
//                 </div>
//             )}
//         </div>
//     );
// }

// export default ClientCalculator;


//*********** clientCalculator draft ************* */
// import React, { useState } from 'react';

// function ClientCalculator() {
//     const [principal, setPrincipal] = useState('');
//     const [annualRate, setAnnualRate] = useState('');
//     const [term, setTerm] = useState('');
//     const [monthlyPayment, setMonthlyPayment] = useState(null);
//     const [loanDetails, setLoanDetails] = useState([]);

//     //   Explanation of the Calculation
//     //   The French amortization system formula:
//     //   M=(P⋅r⋅(1+r)^n)/((1+r)^n − 1)

//     //   Where:
//     //       MM = Monthly payment
//     //       PP = Principal loan amount
//     //       rr = Monthly interest rate (annual rate / 12 / 100)
//     //       nn = Total number of payments (loan term in years * 12)

//     // Function to calculate monthly payment using the French system
//     const calculateMortgage = () => {
//         const principalAmount = parseFloat(principal);
//         const monthlyInterestRate = parseFloat(annualRate) / 100 / 12;
//         const numberOfPayments = parseInt(term) * 12;

//         if (!principalAmount || !monthlyInterestRate || !numberOfPayments) {
//             alert('Ingrese un valor valido');
//             return;
//         }

//         // Calculate the monthly payment using the formula:
//         // M = P[r(1+r)^n] / [(1+r)^n - 1]
//         const monthlyPaymentCalc = (
//             principalAmount *
//             (monthlyInterestRate * Math.pow(1 + monthlyInterestRate, numberOfPayments))
//         ) / (Math.pow(1 + monthlyInterestRate, numberOfPayments) - 1);

//         setMonthlyPayment(monthlyPaymentCalc.toFixed(2));

//         // Create an amortization schedule
//         let balance = principalAmount;
//         const details = [];
//         for (let i = 0; i < numberOfPayments; i++) {
//             const interestPayment = balance * monthlyInterestRate;
//             const principalPayment = monthlyPaymentCalc - interestPayment;
//             balance -= principalPayment;
//             details.push({
//                 month: i + 1,
//                 interestPayment: interestPayment.toFixed(2),
//                 principalPayment: principalPayment.toFixed(2),
//                 remainingBalance: Math.max(balance, 0).toFixed(2),
//             });
//         }
//         setLoanDetails(details);
//     };

//     const clearFields = () => {
//         setPrincipal('');
//         setAnnualRate('');
//         setTerm('');
//         setMonthlyPayment(''); 
//         setLoanDetails('');
//     };

//     return (
//         <div className="max-w-md mx-auto p-6 bg-inherit shadow-md rounded-lg">
//             <h2 className="text-2xl font-bold mb-4">Calculadora de pagos</h2>
//             <div className="space-y-4">

//                 <input
//                     type="number"
//                     placeholder="Ingresa el capital que necesitas"
//                     value={principal}
//                     onChange={(e) => setPrincipal(e.target.value)}
//                     className="input-field"
//                 />
//                 <input
//                     type="number"
//                     placeholder="Tasa de Interes anual (%)"
//                     value={annualRate}
//                     onChange={(e) => setAnnualRate(e.target.value)}
//                     className="input-field"
//                 />
//                 <input
//                     type="number"
//                     placeholder="Ingresa plazo en años"
//                     value={term}
//                     onChange={(e) => setTerm(e.target.value)}
//                     className="input-field"
//                 />
//                 <div className="flex px-2 space-x-4">
//                     <button className="btn-tertiary w-full" onClick={clearFields}>Borrar campos</button>
//                     <button onClick={calculateMortgage} className="btn-primary w-full">
//                         Calcular
//                     </button>
//                 </div>
//             </div>

//             {monthlyPayment && (
//                 <div className="mt-6">
//                     <h3 className="text-xl font-semibold">Pago Mensual: ${monthlyPayment}</h3>
//                     <h4 className="mt-4">Calendario de pagos:</h4>
//                     <table className="w-full mt-2 border-collapse">
//                         <thead>
//                             <tr>
//                                 <th className="border px-2 py-1">Mes</th>
//                                 <th className="border px-2 py-1">Interes</th>
//                                 <th className="border px-2 py-1">Capital</th>
//                                 <th className="border px-2 py-1">Saldo Restante</th>
//                             </tr>
//                         </thead>
//                         <tbody>
//                             {loanDetails.map((detail) => (
//                                 <tr key={detail.month}>
//                                     <td className="border px-2 py-1">{detail.month}</td>
//                                     <td className="border px-2 py-1">${detail.interestPayment}</td>
//                                     <td className="border px-2 py-1">${detail.principalPayment}</td>
//                                     <td className="border px-2 py-1">${detail.remainingBalance}</td>
//                                 </tr>
//                             ))}
//                         </tbody>
//                     </table>
//                 </div>
//             )}
//         </div>
//     );
// }

// export default ClientCalculator;
