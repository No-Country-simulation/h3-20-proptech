import React, { useState, useEffect } from "react";

const productCapitalizationData = {
    tea1: [20, 26.824179, 34.488882, 42.576089, 51.106866, 60.103222],
    plazoMin: 1,
    plazoMax: 360,
    index1: [0, 6, 12],
    index2: [0, 0.5, 1],
};

function CapitalizationCalculator() {
    const [principal, setPrincipal] = useState('');
    const [annualRate, setAnnualRate] = useState('');
    const [term, setTerm] = useState('');
    const [termType, setTermType] = useState('years'); // Default is years
    const [monthlyReturn, setMonthlyReturn] = useState('');
    const [results, setResults] = useState([]);
    const [refuerzo, setRefuerzo] = useState(false);
    const [refuerzoMes, setRefuerzoMes] = useState(productCapitalizationData.index1[1]);
    const [refuerzoValue, setRefuerzoValue] = useState(productCapitalizationData.index2[1]);


    const handleInputChange = (field, value) => {
        if (field === "principal") setPrincipal(value);
        if (field === "annualRate") setAnnualRate(value);
        if (field === "term") setTerm(value);
        if (field === "monthlyReturn") setMonthlyReturn(value);
    };

    const calculateReturns = () => {
        const cuota = parseFloat(monthlyReturn);
        const annualRateValue = parseFloat(annualRate);
        const termValue = parseInt(term);
        const isYears = termType === 'years';

        if (!cuota || !annualRateValue || !termValue) {
            alert("Por favor ingrese valores válidos.");
            return;
        } 1.

        // Reverse calculation to get nominal rate from TEA
        const calculateNominalRate = (tea, npery) => {
            return npery * (Math.pow(1 + tea / 100, 1 / npery) - 1);
        };
        const nominalRate = calculateNominalRate(annualRate, 12);
        const monthlyInterestRate = nominalRate / 12;

        const monthlyRate = isYears
            ? monthlyInterestRate
            : annualRate / 100;

        const numberOfPayments = isYears ? termValue * 12 : termValue;

        const details = [];
        let capitalizacion = 0;

        for (let i = 1; i <= numberOfPayments; i++) {
            let currentCuota = cuota;
            if (refuerzo && i % refuerzoMes === 0) {
                currentCuota = cuota * (1 + refuerzoValue);
            } 
            const capitalizacionMes = currentCuota * Math.pow(1 + monthlyRate, i);
            const descuento = capitalizacionMes - currentCuota;
            const percentInterest = descuento / currentCuota;
            const netoAPagar = 1 - percentInterest;

            capitalizacion = (capitalizacion + currentCuota) * (1 + monthlyRate);

            details.push({
                term: i,
                cuota: currentCuota.toFixed(2),
                capitalizacionMes: capitalizacionMes.toFixed(2),
                descuento: descuento.toFixed(2),
                percentInterest: (percentInterest * 100).toFixed(2),
                netoAPagar: netoAPagar.toFixed(2),
                capitalizacion: capitalizacion.toFixed(2),
            });
            // Reset cuota to its original value after the 6th month
            if (refuerzo && i % 6 === 0) {
                currentCuota = cuota;
            }
        }

        setResults(details);
    };

    const clearFields = () => {
        setPrincipal('');
        setAnnualRate('');
        setTerm('');
        setMonthlyReturn('');
        setResults([]);
        setTermType('years'); // Reset to default
    };

    return (
        <div className="min-w-[40vw] mx-auto p-6 bg-inherit border-2 border-secondary shadow-md rounded-xl focus-within:shadow-primary">
            <h2 className="text-2xl font-bold mb-4 text-center text-text-primary w-full">Calculadora de Capitalización</h2>
            <div className="space-y-4">
                <div>
                    <label className="font-bold text-text-primary mb-1">Cuota (Retorno Mensual)</label>
                    <input
                        type="number"
                        placeholder="Ingrese la cuota mensual"
                        value={monthlyReturn}
                        onChange={(e) => handleInputChange("monthlyReturn", e.target.value)}
                        className="input-field"
                    />
                </div>
                <div>
                    <label className="font-bold text-text-primary mb-1">Tasa de Interés {termType === 'years' ? 'anual (TEA)' : 'nominal por mes'} (%)</label>
                    <input
                        type="number"
                        placeholder={`Ingrese la tasa ${termType === 'years' ? 'anual (TEA)' : 'nominal por mes'}`}
                        value={annualRate}
                        onChange={(e) => handleInputChange("annualRate", e.target.value)}
                        className="input-field"
                    />
                </div>
                <div>
                    <label className="font-bold text-text-primary mb-1">Plazo en {termType === 'years' ? 'años' : 'meses'}</label>
                    <input
                        type="number"
                        placeholder={`Ingrese plazo en ${termType === 'years' ? 'años' : 'meses'}`}
                        value={term}
                        onChange={(e) => handleInputChange("term", e.target.value)}
                        className="input-field"
                    />
                    <div className="justify-end items-center flex space-x-2 py-2">
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
                        checked={refuerzo}
                        onChange={(e) => setRefuerzo(e.target.checked)}
                        className="mr-2 checkbox-custom"
                    />
                    <label>Refuerzo semestral</label>
                </div>
                <div className="flex space-x-4">
                    <button onClick={clearFields} className="btn-tertiary w-full">Limpiar</button>
                    <button onClick={calculateReturns} className="btn-primary w-full">Calcular</button>
                </div>
            </div>
            {results.length > 0 && (
                <div className="mt-6">
                    <h3 className="text-xl font-semibold">Cuota Mensual: ${monthlyReturn}</h3>
                    <h3 className="text-xl font-semibold">Detalles de Capitalización:</h3>
                    <table className=" w-full mt-2 border-collapse ">
                        <thead>
                            <tr>
                                <th className="border px-2 py-1">Mes</th>
                                <th className="border px-2 py-1">Capitalización Mes</th>
                                <th className="border px-2 py-1">Descuento</th>
                                <th className="border px-2 py-1">% Int</th>
                                <th className="border px-2 py-1">Neto a Pagar</th>
                                <th className="border px-2 py-1">Capitalización</th>
                            </tr>
                        </thead>
                        <tbody>
                            {results.map((detail, index) => (
                                <tr key={index}>
                                    <td className="border px-2 py-1">{detail.term}</td>
                                    <td className="border px-2 py-1">{detail.capitalizacionMes}</td>
                                    <td className="border px-2 py-1">{detail.descuento}</td>
                                    <td className="border px-2 py-1">{detail.percentInterest}%</td>
                                    <td className="border px-2 py-1">{detail.netoAPagar}%</td>
                                    <td className="border px-2 py-1">{detail.capitalizacion}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
}

export default CapitalizationCalculator;



// import React, { useState } from 'react';
// import { useEffect } from "react";

// function CapitalizationCalculator() {
//     const [principal, setPrincipal] = useState('');
//     const [annualRate, setAnnualRate] = useState('');
//     const [term, setTerm] = useState('');
//     const [termType, setTermType] = useState('years'); // Default term type is years
//     const [reinvestReturns, setReinvestReturns] = useState(false);
//     const [results, setResults] = useState([]);
//     const [monthlyReturn, setMonthlyReturn] = useState(0); // To display in h3

//     const [errors, setErrors] = useState({ principal: null, annualRate: null, term: null }); // null: no validation yet, true: invalid, false: valid
//     const [focus, setFocus] = useState({ principal: false, annualRate: false, term: false });

//     useEffect(() => {
//         // console.log("Updated principal:", principal, "Updated annualRate:", annualRate, "Updated term:", term);
//     }, [principal], [annualRate], [term]);

//     const validateField = (field, value) => {
//         if (field === "principal") return !/^\d+$/.test(value);
//         if (field === "annualRate") return !/^\d+(\.\d+)?$/.test(value);
//         if (field === "term") return !/^\d+$/.test(value);
//         return false;
//     };
//     const handleInputChange = (field, value) => {
//         // Update the state
//         if (field === "principal") setPrincipal(value);
//         if (field === "annualRate") setAnnualRate(value);
//         if (field === "term") setTerm(value);

//         // Validate the field
//         const isValid = !validateField(field, value);
//         setErrors((prevErrors) => ({ ...prevErrors, [field]: !value ? true : !isValid }));

//     };

//     const handleFocus = (field) => {
//         setFocus((prevFocus) => ({ ...prevFocus, [field]: true }));
//     };

//     const handleBlur = (field) => {
//         setFocus((prevFocus) => ({ ...prevFocus, [field]: false }));
//     };

//     const calculateReturns = () => {
//         const allValid = !Object.values(errors).some((error) => error === true || error === null);

//         if (!allValid) {
//             alert("Por favor corrija los campos inválidos.");
//             return;
//         }
//         const principalAmount = parseFloat(principal);
//         const monthlyInterestRate = parseFloat(annualRate) / 100 / 12;
//         const numberOfPayments =
//             termType === 'years' ? parseInt(term) * 12 : parseInt(term);

//         if (!principalAmount || !monthlyInterestRate || !numberOfPayments) {
//             alert('Ingrese valores válidos');
//             return;
//         }

//         let balance = principalAmount;
//         const details = [];

//         for (let i = 0; i < numberOfPayments; i++) {
//             const monthlyReturnValue = balance * monthlyInterestRate;

//             if (reinvestReturns) {
//                 // Reinvest monthly returns
//                 balance += monthlyReturnValue;
//             }

//             details.push({
//                 month: i + 1,
//                 monthlyReturn: monthlyReturnValue.toFixed(2),
//                 balance: balance.toFixed(2),
//             });

//             // Only calculate the first month's return for display if reinvestment is OFF
//             if (i === 0 && !reinvestReturns) {
//                 setMonthlyReturn(monthlyReturnValue.toFixed(2));
//             }
//         }

//         // If reinvestment is ON, set monthly return display to 0
//         if (reinvestReturns) {
//             setMonthlyReturn(0);
//         }

//         setResults(details);
//     };

//     const clearFields = () => {
//         setPrincipal('');
//         setAnnualRate('');
//         setTerm('');
//         setReinvestReturns(false);
//         setResults([]);
//         setMonthlyReturn(0); // Reset displayed return
//         setTermType('years'); // Reset term type to default
//         setErrors({ principal: false, annualRate: false, term: false });
//     };

//     return (
//         <div className="min-w-[40vw] mx-auto p-6 bg-inherit border-2 border-secondary shadow-md rounded-xl focus-within:shadow-primary">
//             <h2 className="text-2xl font-bold mb-4 text-center text-text-primary w-full">Calculá tu ganancia</h2>
//             <div className="space-y-4">
//                 <div >
//                     <label className="font-bold text-text-primary mb-1">Capital</label>
//                     <p
//                         className={`text-sm mt-1 ${errors.principal === true
//                             ? "p-messageError"
//                             : errors.principal === false && focus.principal
//                                 ? "p-messageOk"
//                                 : "p-message"
//                             }`}
//                     >
//                         Capital a solicitar en pesos.
//                     </p>
//                     <input
//                         type="number"
//                         placeholder="Ingresa el capital que necesitas"
//                         value={principal}
//                         onChange={(e) => handleInputChange("principal", e.target.value)}
//                         onBlur={() => handleBlur("principal")}
//                         onFocus={() => handleFocus("principal")}
//                         className="input-field "
//                     />
//                 </div>
//                 <div>
//                     <label className='font-bold text-text-primary mb-1'>Tasa de Interes anual</label>
//                     <p
//                         className={`text-sm mt-1 ${errors.annualRate === true
//                             ? "p-messageError"
//                             : focus.annualRate && errors.annualRate === false
//                                 ? "p-messageOk"
//                                 : "p-message"
//                             }`}
//                     >
//                         Tasa de interes expresada en (%)
//                     </p>
//                     <input
//                         type="number"
//                         placeholder="Tasa de Interés Anual (%)"
//                         value={annualRate}
//                         onChange={(e) => handleInputChange("annualRate", e.target.value)}
//                         onBlur={() => handleBlur("annualRate")}
//                         onFocus={() => handleFocus("annualRate")}
//                         className="input-field"
//                     />
//                 </div>
//                 <div>
//                     <label className='font-bold text-text-primary mb-1'>Plazo en {termType === 'years' ? "años" : "meses"}</label>
//                             <p
//                                 className={`text-sm mt-1 ${errors.term === true
//                                     ? "p-messageError"
//                                     : focus.term && errors.term === false
//                                         ? "p-messageOk"
//                                         : "p-message"
//                                     }`}
//                             > Elija plazo en años o meses
//                             </p>
//                     <div className='space-y-2'>
//                         <div>
//                             <input
//                                 type="number"
//                                 placeholder={termType === 'years' ? "Plazo en años" : "Plazo en meses"}
//                                 value={term}
//                                 onChange={(e) => handleInputChange("term", e.target.value)}
//                                 onBlur={() => handleBlur("term")}
//                                 onFocus={() => handleFocus("term")}
//                                 className="input-field"
//                             />
//                         </div>

//                         <div className="justify-end items-center flex space-x-2">
//                             <label className="flex items-center">
//                                 <input
//                                     type="checkbox"
//                                     name="termType"
//                                     value="years"
//                                     checked={termType === 'years'}
//                                     onChange={(e) => setTermType(e.target.value)}
//                                     className="mr-2 checkbox-custom "
//                                 />
//                                 Años
//                             </label>
//                             <label className="flex items-center">
//                                 <input
//                                     type="checkbox"
//                                     name="termType"
//                                     value="months"
//                                     checked={termType === 'months'}
//                                     onChange={(e) => setTermType(e.target.value)}
//                                     className="mr-2 checkbox-custom"
//                                 />
//                                 Meses
//                             </label>
//                         </div>
//                     </div>

//                 </div>

//                 <div className="flex items-center">
//                     <input
//                         type="checkbox"
//                         checked={reinvestReturns}
//                         onChange={(e) => setReinvestReturns(e.target.checked)}
//                         className="mr-2 checkbox-custom"
//                     />
//                     <label>Reinvertir retornos mensuales</label>
//                 </div>
//                 <div className="flex space-x-4">
//                     <button
//                         className="btn-tertiary w-full"
//                         onClick={clearFields}
//                     >
//                         Borrar campos
//                     </button>
//                     <button
//                         className="btn-primary w-full"
//                         onClick={calculateReturns}
//                     >
//                         Calcular
//                     </button>
//                 </div>
//             </div>

//             {results.length > 0 && (
//                 <div className="mt-6">
//                     <h3 className="text-xl font-semibold">Retiro Mensual: ${monthlyReturn}</h3>
//                     <h3 className="text-xl font-semibold">Detalles de Retornos:</h3>
//                     <table className="w-full mt-2 border-collapse">
//                         <thead>
//                             <tr>
//                                 <th className="border px-2 py-1">Mes</th>
//                                 <th className="border px-2 py-1">Retorno Mensual</th>
//                                 <th className="border px-2 py-1">Balance</th>
//                             </tr>
//                         </thead>
//                         <tbody>
//                             {results.map((detail) => (
//                                 <tr key={detail.month}>
//                                     <td className="border px-2 py-1">{detail.month}</td>
//                                     <td className="border px-2 py-1">${detail.monthlyReturn}</td>
//                                     <td className="border px-2 py-1">${detail.balance}</td>
//                                 </tr>
//                             ))}
//                         </tbody>
//                     </table>
//                 </div>
//             )}

//         </div>
//     );
// }

// export default CapitalizationCalculator;
