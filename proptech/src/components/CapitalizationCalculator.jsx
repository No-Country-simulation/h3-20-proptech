import React, { useState, useEffect } from "react";
import { saveAs } from "file-saver";
import productCapitalizationData from "../shared/data/productCapitalizationData.json";
import usersData from "../shared/data/usersData.json";
import investmentData from "../shared/data/investmentData.json";
import CapitalizationCalculatorModal from './CapitalizationCalculatorModal';

function CapitalizationCalculator() {
    const [principal, setPrincipal] = useState('');
    const [calcRate, setCalcRate] = useState('');
    const [numberOfPayments, setNumberOfPayments] = useState('');
    const [term, setTerm] = useState('');
    const [termType, setTermType] = useState('years'); // Default is years
    const [monthlyReturn, setMonthlyReturn] = useState('');
    const [results, setResults] = useState([]);
    const [refuerzo, setRefuerzo] = useState(false);
    const [refuerzoMes, setRefuerzoMes] = useState(productCapitalizationData.index1[1]);
    const [refuerzoValue, setRefuerzoValue] = useState(productCapitalizationData.index2[1]);
    
    const [interestRate, setInterestRate] = useState('');
    const [annualRate, setAnnualRate] = useState('');
    const [depositedCuota, setDepositedCuota] = useState('');

    //select user for investment data
    const [showModal, setShowModal] = useState(false);
    const [selectedUser, setSelectedUser] = useState(null);
    const [newInvestmentData, setNewInvestmentData] = useState([]);
    const [investorData, setInvestorData]=useState(investmentData);

    const handleInputChange = (field, value) => {
        if (field === "principal") setPrincipal(value);
        if (field === "calcRate") setCalcRate(value);
        if (field === "term") setTerm(value);
        if (field === "monthlyReturn") setMonthlyReturn(value);
    };

    const calculateReturns = () => {
        const cuota = parseFloat(monthlyReturn);
        const calcRateValue = parseFloat(calcRate);
        const termValue = parseInt(term);
        const isYears = termType === 'years';

        if (!cuota || !calcRateValue || !termValue) {
            alert("Por favor ingrese valores válidos.");
            return;
        } 1.

        // Reverse calculation to get nominal rate from TEA
        const calculateNominalRate = (tea, npery) => {
            return npery * (Math.pow(1 + tea / 100, 1 / npery) - 1);
        };
        const nominalRate = calculateNominalRate(calcRate, 12);
        const monthlyInterestRate = nominalRate / 12;

        const monthlyRate = isYears
            ? monthlyInterestRate
            : calcRate / 100;

            const calculateTEA = (nominalMonthly) => {
                if (nominalMonthly < 0) {
                    throw new Error("The nominal monthly rate cannot be negative.");
                }
                return (Math.pow(1 + nominalMonthly / 100, 12) - 1) * 100;
            };

        setNumberOfPayments(isYears ? termValue * 12 : termValue);
        setInterestRate(monthlyRate);
        setAnnualRate(isYears ? calcRate : calculateTEA(calcRate) );

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
            const netoAPagar = (1 - percentInterest)*100;

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
            setPrincipal(capitalizacion);
        }

        setResults(details);
    };

    // generate json data
    const generateJSON = () => {
        const dateOfGeneration = new Date().toISOString();
        const data = {
            dateOfGeneration,
            principal,
            interestRate,
            numberOfPayments,
            monthlyReturn,
            term,
            termType,
            annualRate,
            depositedCuota,
            // results,
        };
        // const jsonData = JSON.stringify(data, null, 2);
        // const blob = new Blob([jsonData], { type: "application/json" });
        // saveAs(blob, `capitalization_details_${dateOfGeneration}.json`);

        
        //select user for investment data
        setNewInvestmentData(data); // Store data in state for use after user selection
        console.log("Generating JSON and opening modal..." + data);
        setShowModal(true); // Open the modal to select the user

    };

    // Save the finalized data to investmentData.json
    // const saveInvestmentData = () => {
    //     if (!selectedUser) {
    //         alert("Please select an investor.");
    //         return;
    //     }

    //     // Add new investment data
    //     const newId = investmentData.length > 0
    //         ? Math.max(...investmentData.map((item) => item.id)) + 1
    //         : 1;

    //     const newData = {
    //         id: newId,
    //         investor: selectedUser,
    //         ...newInvestmentData, // Include the generated JSON data
    //     };

    //     // Append to investmentData and save
    //     const updatedData = [...investmentData, newData];
    //     const blob = new Blob([JSON.stringify(updatedData, null, 2)], { type: "application/json" });
    //     saveAs(blob, "investmentData.json");

    //     setShowModal(false); // Close the modal
    //     alert("Investment data saved successfully!");
    // };





    const clearFields = () => {
        setPrincipal('');
        setCalcRate('');
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
                        value={calcRate}
                        onChange={(e) => handleInputChange("calcRate", e.target.value)}
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
                    <button onClick={generateJSON} className="btn-secondary w-full">Generar JSON</button>
            {/* <button onClick={generateJSON} className="btn-primary">Generar JSON</button> */}
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

            {showModal && (
                <CapitalizationCalculatorModal
                showModal={showModal}
                setShowModal={setShowModal}
                newInvestmentData={newInvestmentData}
                setNewInvestmentData={setNewInvestmentData}
                investorData={investorData}
                setInvestorData={setInvestorData}
                />

                // <div>
                //     <div className="fixed inset-0 bg-black bg-opacity-50 z-backdrop" onClick={() => setShowModal(false)}></div>
                //     {/* <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white p-modalPadding rounded-lg shadow-modal z-modal"> */}
                //     <div className="modal-custom">
                //         <h2 className="text-lg font-bold text-center">Select an Investor</h2>
                //         <ul>
                //             {usersData.map((user) => (
                //                 <li key={user.id}>
                //                     <button
                //                         className="btn-secondary"
                //                         onClick={() => setSelectedUser(user.username)}
                //                     >
                //                         {user.username} - {user.email}
                //                     </button>
                //                 </li>
                //             ))}
                //         </ul>
                //         <button onClick={saveInvestmentData} className="btn-primary">
                //             Save Investment
                //         </button>
                //         <button onClick={() => setShowModal(false)} className="btn-tertiary">
                //             Cancel
                //         </button>
                //     </div>
                    
                // </div>
            )}

        </div>
    );
}

export default CapitalizationCalculator;

// ******************  version con shared data ok ***************
// import React, { useState, useEffect } from "react";
// import { saveAs } from "file-saver";
// import productCapitalizationData from "../shared/data/productCapitalizationData.json";
// import usersData from "../shared/data/usersData.json";

// // const productCapitalizationData = {
// //     tea1: [20, 26.824179, 34.488882, 42.576089, 51.106866, 60.103222],
// //     plazoMin: 1,
// //     plazoMax: 360,
// //     index1: [0, 6, 12],
// //     index2: [0, 0.5, 1],
// // };

// function CapitalizationCalculator() {
//     const [principal, setPrincipal] = useState('');
//     const [calcRate, setCalcRate] = useState('');
//     const [numberOfPayments, setNumberOfPayments] = useState('');
//     const [term, setTerm] = useState('');
//     const [termType, setTermType] = useState('years'); // Default is years
//     const [monthlyReturn, setMonthlyReturn] = useState('');
//     const [results, setResults] = useState([]);
//     const [refuerzo, setRefuerzo] = useState(false);
//     const [refuerzoMes, setRefuerzoMes] = useState(productCapitalizationData.index1[1]);
//     const [refuerzoValue, setRefuerzoValue] = useState(productCapitalizationData.index2[1]);
    
//     const [interestRate, setInterestRate] = useState('');
//     const [annualRate, setAnnualRate] = useState('');
//     const [depositedCuota, setDepositedCuota] = useState('');


//     const handleInputChange = (field, value) => {
//         if (field === "principal") setPrincipal(value);
//         if (field === "calcRate") setCalcRate(value);
//         if (field === "term") setTerm(value);
//         if (field === "monthlyReturn") setMonthlyReturn(value);
//     };

//     const calculateReturns = () => {
//         const cuota = parseFloat(monthlyReturn);
//         const calcRateValue = parseFloat(calcRate);
//         const termValue = parseInt(term);
//         const isYears = termType === 'years';

//         if (!cuota || !calcRateValue || !termValue) {
//             alert("Por favor ingrese valores válidos.");
//             return;
//         } 1.

//         // Reverse calculation to get nominal rate from TEA
//         const calculateNominalRate = (tea, npery) => {
//             return npery * (Math.pow(1 + tea / 100, 1 / npery) - 1);
//         };
//         const nominalRate = calculateNominalRate(calcRate, 12);
//         const monthlyInterestRate = nominalRate / 12;

//         const monthlyRate = isYears
//             ? monthlyInterestRate
//             : calcRate / 100;

//             const calculateTEA = (nominalMonthly) => {
//                 if (nominalMonthly < 0) {
//                     throw new Error("The nominal monthly rate cannot be negative.");
//                 }
//                 return (Math.pow(1 + nominalMonthly / 100, 12) - 1) * 100;
//             };

//         setNumberOfPayments(isYears ? termValue * 12 : termValue);
//         setInterestRate(monthlyRate);
//         setAnnualRate(isYears ? calcRate : calculateTEA(calcRate) );

//         const details = [];
//         let capitalizacion = 0;

//         for (let i = 1; i <= numberOfPayments; i++) {
//             let currentCuota = cuota;
//             if (refuerzo && i % refuerzoMes === 0) {
//                 currentCuota = cuota * (1 + refuerzoValue);
//             } 
//             const capitalizacionMes = currentCuota * Math.pow(1 + monthlyRate, i);
//             const descuento = capitalizacionMes - currentCuota;
//             const percentInterest = descuento / currentCuota;
//             const netoAPagar = (1 - percentInterest)*100;

//             capitalizacion = (capitalizacion + currentCuota) * (1 + monthlyRate);

//             details.push({
//                 term: i,
//                 cuota: currentCuota.toFixed(2),
//                 capitalizacionMes: capitalizacionMes.toFixed(2),
//                 descuento: descuento.toFixed(2),
//                 percentInterest: (percentInterest * 100).toFixed(2),
//                 netoAPagar: netoAPagar.toFixed(2),
//                 capitalizacion: capitalizacion.toFixed(2),
//             });
//             // Reset cuota to its original value after the 6th month
//             if (refuerzo && i % 6 === 0) {
//                 currentCuota = cuota;
//             }
//             setPrincipal(capitalizacion);
//         }

//         setResults(details);
//     };

//     // generate json data
//     const generateJSON = () => {
//         const dateOfGeneration = new Date().toISOString();
//         const data = {
//             dateOfGeneration,
//             principal,
//             interestRate,
//             numberOfPayments,
//             monthlyReturn,
//             term,
//             termType,
//             annualRate,
//             depositedCuota,
//             results,
//         };
//         const jsonData = JSON.stringify(data, null, 2);
//         const blob = new Blob([jsonData], { type: "application/json" });
//         saveAs(blob, `capitalization_details_${dateOfGeneration}.json`);
//     };




//     const clearFields = () => {
//         setPrincipal('');
//         setCalcRate('');
//         setTerm('');
//         setMonthlyReturn('');
//         setResults([]);
//         setTermType('years'); // Reset to default
//     };

//     return (
//         <div className="min-w-[40vw] mx-auto p-6 bg-inherit border-2 border-secondary shadow-md rounded-xl focus-within:shadow-primary">
//             <h2 className="text-2xl font-bold mb-4 text-center text-text-primary w-full">Calculadora de Capitalización</h2>
//             <div className="space-y-4">
//                 <div>
//                     <label className="font-bold text-text-primary mb-1">Cuota (Retorno Mensual)</label>
//                     <input
//                         type="number"
//                         placeholder="Ingrese la cuota mensual"
//                         value={monthlyReturn}
//                         onChange={(e) => handleInputChange("monthlyReturn", e.target.value)}
//                         className="input-field"
//                     />
//                 </div>
//                 <div>
//                     <label className="font-bold text-text-primary mb-1">Tasa de Interés {termType === 'years' ? 'anual (TEA)' : 'nominal por mes'} (%)</label>
//                     <input
//                         type="number"
//                         placeholder={`Ingrese la tasa ${termType === 'years' ? 'anual (TEA)' : 'nominal por mes'}`}
//                         value={calcRate}
//                         onChange={(e) => handleInputChange("calcRate", e.target.value)}
//                         className="input-field"
//                     />
//                 </div>
//                 <div>
//                     <label className="font-bold text-text-primary mb-1">Plazo en {termType === 'years' ? 'años' : 'meses'}</label>
//                     <input
//                         type="number"
//                         placeholder={`Ingrese plazo en ${termType === 'years' ? 'años' : 'meses'}`}
//                         value={term}
//                         onChange={(e) => handleInputChange("term", e.target.value)}
//                         className="input-field"
//                     />
//                     <div className="justify-end items-center flex space-x-2 py-2">
//                         <label className="flex items-center">
//                             <input
//                                 type="checkbox"
//                                 name="termType"
//                                 value="years"
//                                 checked={termType === 'years'}
//                                 onChange={(e) => setTermType(e.target.value)}
//                                 className="mr-2 checkbox-custom "
//                             />
//                             Años
//                         </label>
//                         <label className="flex items-center">
//                             <input
//                                 type="checkbox"
//                                 name="termType"
//                                 value="months"
//                                 checked={termType === 'months'}
//                                 onChange={(e) => setTermType(e.target.value)}
//                                 className="mr-2 checkbox-custom"
//                             />
//                             Meses
//                         </label>
//                     </div>
//                 </div>
//                 <div className="flex items-center">
//                     <input
//                         type="checkbox"
//                         checked={refuerzo}
//                         onChange={(e) => setRefuerzo(e.target.checked)}
//                         className="mr-2 checkbox-custom"
//                     />
//                     <label>Refuerzo semestral</label>
//                 </div>
//                 <div className="flex space-x-4">
//                     <button onClick={clearFields} className="btn-tertiary w-full">Limpiar</button>
//                     <button onClick={calculateReturns} className="btn-primary w-full">Calcular</button>
//                 </div>
//             </div>
//             {results.length > 0 && (
//                 <div className="mt-6">
//                     <h3 className="text-xl font-semibold">Cuota Mensual: ${monthlyReturn}</h3>
//                     <h3 className="text-xl font-semibold">Detalles de Capitalización:</h3>
//                     <button onClick={generateJSON} className="btn-secondary w-full">Generar JSON</button>
//                     <table className=" w-full mt-2 border-collapse ">
//                         <thead>
//                             <tr>
//                                 <th className="border px-2 py-1">Mes</th>
//                                 <th className="border px-2 py-1">Capitalización Mes</th>
//                                 <th className="border px-2 py-1">Descuento</th>
//                                 <th className="border px-2 py-1">% Int</th>
//                                 <th className="border px-2 py-1">Neto a Pagar</th>
//                                 <th className="border px-2 py-1">Capitalización</th>
//                             </tr>
//                         </thead>
//                         <tbody>
//                             {results.map((detail, index) => (
//                                 <tr key={index}>
//                                     <td className="border px-2 py-1">{detail.term}</td>
//                                     <td className="border px-2 py-1">{detail.capitalizacionMes}</td>
//                                     <td className="border px-2 py-1">{detail.descuento}</td>
//                                     <td className="border px-2 py-1">{detail.percentInterest}%</td>
//                                     <td className="border px-2 py-1">{detail.netoAPagar}%</td>
//                                     <td className="border px-2 py-1">{detail.capitalizacion}</td>
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


//***************** CapitalizationCalculator OK ********** */
// import React, { useState, useEffect } from "react";

// const productCapitalizationData = {
//     tea1: [20, 26.824179, 34.488882, 42.576089, 51.106866, 60.103222],
//     plazoMin: 1,
//     plazoMax: 360,
//     index1: [0, 6, 12],
//     index2: [0, 0.5, 1],
// };

// function CapitalizationCalculator() {
//     const [principal, setPrincipal] = useState('');
//     const [annualRate, setAnnualRate] = useState('');
//     const [term, setTerm] = useState('');
//     const [termType, setTermType] = useState('years'); // Default is years
//     const [monthlyReturn, setMonthlyReturn] = useState('');
//     const [results, setResults] = useState([]);
//     const [refuerzo, setRefuerzo] = useState(false);
//     const [refuerzoMes, setRefuerzoMes] = useState(productCapitalizationData.index1[1]);
//     const [refuerzoValue, setRefuerzoValue] = useState(productCapitalizationData.index2[1]);


//     const handleInputChange = (field, value) => {
//         if (field === "principal") setPrincipal(value);
//         if (field === "annualRate") setAnnualRate(value);
//         if (field === "term") setTerm(value);
//         if (field === "monthlyReturn") setMonthlyReturn(value);
//     };

//     const calculateReturns = () => {
//         const cuota = parseFloat(monthlyReturn);
//         const annualRateValue = parseFloat(annualRate);
//         const termValue = parseInt(term);
//         const isYears = termType === 'years';

//         if (!cuota || !annualRateValue || !termValue) {
//             alert("Por favor ingrese valores válidos.");
//             return;
//         } 1.

//         // Reverse calculation to get nominal rate from TEA
//         const calculateNominalRate = (tea, npery) => {
//             return npery * (Math.pow(1 + tea / 100, 1 / npery) - 1);
//         };
//         const nominalRate = calculateNominalRate(annualRate, 12);
//         const monthlyInterestRate = nominalRate / 12;

//         const monthlyRate = isYears
//             ? monthlyInterestRate
//             : annualRate / 100;

//         const numberOfPayments = isYears ? termValue * 12 : termValue;

//         const details = [];
//         let capitalizacion = 0;

//         for (let i = 1; i <= numberOfPayments; i++) {
//             let currentCuota = cuota;
//             if (refuerzo && i % refuerzoMes === 0) {
//                 currentCuota = cuota * (1 + refuerzoValue);
//             } 
//             const capitalizacionMes = currentCuota * Math.pow(1 + monthlyRate, i);
//             const descuento = capitalizacionMes - currentCuota;
//             const percentInterest = descuento / currentCuota;
//             const netoAPagar = (1 - percentInterest)*100;

//             capitalizacion = (capitalizacion + currentCuota) * (1 + monthlyRate);

//             details.push({
//                 term: i,
//                 cuota: currentCuota.toFixed(2),
//                 capitalizacionMes: capitalizacionMes.toFixed(2),
//                 descuento: descuento.toFixed(2),
//                 percentInterest: (percentInterest * 100).toFixed(2),
//                 netoAPagar: netoAPagar.toFixed(2),
//                 capitalizacion: capitalizacion.toFixed(2),
//             });
//             // Reset cuota to its original value after the 6th month
//             if (refuerzo && i % 6 === 0) {
//                 currentCuota = cuota;
//             }
//         }

//         setResults(details);
//     };

//     const clearFields = () => {
//         setPrincipal('');
//         setAnnualRate('');
//         setTerm('');
//         setMonthlyReturn('');
//         setResults([]);
//         setTermType('years'); // Reset to default
//     };

//     return (
//         <div className="min-w-[40vw] mx-auto p-6 bg-inherit border-2 border-secondary shadow-md rounded-xl focus-within:shadow-primary">
//             <h2 className="text-2xl font-bold mb-4 text-center text-text-primary w-full">Calculadora de Capitalización</h2>
//             <div className="space-y-4">
//                 <div>
//                     <label className="font-bold text-text-primary mb-1">Cuota (Retorno Mensual)</label>
//                     <input
//                         type="number"
//                         placeholder="Ingrese la cuota mensual"
//                         value={monthlyReturn}
//                         onChange={(e) => handleInputChange("monthlyReturn", e.target.value)}
//                         className="input-field"
//                     />
//                 </div>
//                 <div>
//                     <label className="font-bold text-text-primary mb-1">Tasa de Interés {termType === 'years' ? 'anual (TEA)' : 'nominal por mes'} (%)</label>
//                     <input
//                         type="number"
//                         placeholder={`Ingrese la tasa ${termType === 'years' ? 'anual (TEA)' : 'nominal por mes'}`}
//                         value={annualRate}
//                         onChange={(e) => handleInputChange("annualRate", e.target.value)}
//                         className="input-field"
//                     />
//                 </div>
//                 <div>
//                     <label className="font-bold text-text-primary mb-1">Plazo en {termType === 'years' ? 'años' : 'meses'}</label>
//                     <input
//                         type="number"
//                         placeholder={`Ingrese plazo en ${termType === 'years' ? 'años' : 'meses'}`}
//                         value={term}
//                         onChange={(e) => handleInputChange("term", e.target.value)}
//                         className="input-field"
//                     />
//                     <div className="justify-end items-center flex space-x-2 py-2">
//                         <label className="flex items-center">
//                             <input
//                                 type="checkbox"
//                                 name="termType"
//                                 value="years"
//                                 checked={termType === 'years'}
//                                 onChange={(e) => setTermType(e.target.value)}
//                                 className="mr-2 checkbox-custom "
//                             />
//                             Años
//                         </label>
//                         <label className="flex items-center">
//                             <input
//                                 type="checkbox"
//                                 name="termType"
//                                 value="months"
//                                 checked={termType === 'months'}
//                                 onChange={(e) => setTermType(e.target.value)}
//                                 className="mr-2 checkbox-custom"
//                             />
//                             Meses
//                         </label>
//                     </div>
//                 </div>
//                 <div className="flex items-center">
//                     <input
//                         type="checkbox"
//                         checked={refuerzo}
//                         onChange={(e) => setRefuerzo(e.target.checked)}
//                         className="mr-2 checkbox-custom"
//                     />
//                     <label>Refuerzo semestral</label>
//                 </div>
//                 <div className="flex space-x-4">
//                     <button onClick={clearFields} className="btn-tertiary w-full">Limpiar</button>
//                     <button onClick={calculateReturns} className="btn-primary w-full">Calcular</button>
//                 </div>
//             </div>
//             {results.length > 0 && (
//                 <div className="mt-6">
//                     <h3 className="text-xl font-semibold">Cuota Mensual: ${monthlyReturn}</h3>
//                     <h3 className="text-xl font-semibold">Detalles de Capitalización:</h3>
//                     <table className=" w-full mt-2 border-collapse ">
//                         <thead>
//                             <tr>
//                                 <th className="border px-2 py-1">Mes</th>
//                                 <th className="border px-2 py-1">Capitalización Mes</th>
//                                 <th className="border px-2 py-1">Descuento</th>
//                                 <th className="border px-2 py-1">% Int</th>
//                                 <th className="border px-2 py-1">Neto a Pagar</th>
//                                 <th className="border px-2 py-1">Capitalización</th>
//                             </tr>
//                         </thead>
//                         <tbody>
//                             {results.map((detail, index) => (
//                                 <tr key={index}>
//                                     <td className="border px-2 py-1">{detail.term}</td>
//                                     <td className="border px-2 py-1">{detail.capitalizacionMes}</td>
//                                     <td className="border px-2 py-1">{detail.descuento}</td>
//                                     <td className="border px-2 py-1">{detail.percentInterest}%</td>
//                                     <td className="border px-2 py-1">{detail.netoAPagar}%</td>
//                                     <td className="border px-2 py-1">{detail.capitalizacion}</td>
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

