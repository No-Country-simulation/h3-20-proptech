import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";

function CapitalizationCalculatorViewer({ rowData, onUpdatePivot, onResultsUpdate }) {
    const [principal, setPrincipal] = useState(rowData?.principal || "");
    const [calcRate, setCalcRate] = useState(rowData?.calcRate || "");
    const [term, setTerm] = useState(rowData?.term || "");
    const [termType, setTermType] = useState(rowData?.termType || "Y");
    const [monthlyReturn, setMonthlyReturn] = useState(rowData?.monthlyReturn || "");
    const [results, setResults] = useState([]);
    const location = useLocation();
   

    
    const calculateReturns = () => {
        const cuota = parseFloat(monthlyReturn);
        const calcRateValue = parseFloat(calcRate);
        const termValue = parseInt(term);
        const isYears = termType === "Y";

        if (!cuota || !calcRateValue || !termValue) {
            alert("Por favor ingrese valores válidos.");
            return;
        }

        const nominalRate = calcRate / 100;
        const monthlyRate = isYears ? nominalRate / 12 : nominalRate;

        const details = [];
        let capitalizacion = 0;

        for (let i = 1; i <= (isYears ? termValue * 12 : termValue); i++) {
            const capitalizacionMes = cuota * Math.pow(1 + monthlyRate, i);
            capitalizacion = (capitalizacion + cuota) * (1 + monthlyRate);
            
            details.push({
                term: i,
                cuota: cuota.toFixed(2),
                capitalizacionMes: capitalizacionMes.toFixed(2),
                capitalizacion: capitalizacion.toFixed(2),
            });
        }

        setResults(details);
        onUpdatePivot(details); // Update the pivot in the parent component
        onResultsUpdate(details); // Send the results to Dashboard.jsx
        console.log("onupdatepivos: ",results);
    };

    const handleUpdate = () => {
        const updatedPivotData = {
            ...rowData,
            results: rowData.results.map((res) => ({
                ...res,
                capitalizacionMes: res.capitalizacionMes + 100, // Example modification
                capitalizacion: res.capitalizacion + 500,
            })),
        };
        onUpdatePivot(updatedPivotData);
    };
    
    useEffect(() => {
        if (rowData) {
            calculateReturns();
        }
    }, [rowData]);

    useEffect(() => {
        if (results.length > 0) {
            onResultsUpdate(results);
        }
    }, [results, onResultsUpdate]);
    
    
    return (
        <div className="p-4 bg-white shadow rounded">
            <h2 className="text-xl font-bold mb-4">Capitalization Viewer</h2>
            <table className="table-auto w-full">
                <thead>
                    <tr>
                        <th>Mes</th>
                        <th>Cuota</th>
                        <th>Capitalización Mes</th>
                        <th>Capitalización</th>
                    </tr>
                </thead>
                <tbody>
                    {results.map((item, index) => (
                        <tr key={index}>
                            <td>{item.term}</td>
                            <td>{item.cuota}</td>
                            <td>{item.capitalizacionMes}</td>
                            <td>{item.capitalizacion}</td>
                        </tr>
                    ))}
                </tbody>
            </table>

        </div>
    );
}

export default CapitalizationCalculatorViewer;
