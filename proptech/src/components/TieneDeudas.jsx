import React, { useState, useEffect } from "react";
import axios from "axios";
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Typography } from "@mui/material";
import { NotificationService } from "../shared/notistack.service";
import TieneDeudasImage from "../assets/TieneDeudas.png";
import { useLocation } from "react-router-dom";
import { useNavigate } from 'react-router-dom';

const deudasData = [
    {
        "status": 200,
        "results": {
            "identificacion": 20395112881,
            "denominacion": "RANALLO LUCAS NAHUEL",
            "periodos": [
                {
                    "periodo": "202409",
                    "entidades": [
                        {
                            "entidad": "BANCO BBVA ARGENTINA S.A.",
                            "situacion": 1,
                            "fechaSit1": "2017-12-30",
                            "monto": 1072.0,
                            "diasAtrasoPago": 0,
                            "refinanciaciones": false,
                            "recategorizacionOblig": false,
                            "situacionJuridica": false,
                            "irrecDisposicionTecnica": false,
                            "enRevision": false,
                            "procesoJud": false
                        },
                        {
                            "entidad": "BANCO DE GALICIA Y BUENOS AIRES S.A.U.",
                            "situacion": 1,
                            "fechaSit1": "2017-12-30",
                            "monto": 725.0,
                            "diasAtrasoPago": 0,
                            "refinanciaciones": false,
                            "recategorizacionOblig": false,
                            "situacionJuridica": false,
                            "irrecDisposicionTecnica": false,
                            "enRevision": false,
                            "procesoJud": false
                        }
                    ]
                }
            ]
        }
    }
]


const TieneDeudas = () => {
    const location = useLocation();
    const { deudor } = location.state || {}; // Retrieve cuilNumber
    const deudas = deudasData[0].results.periodos[0].entidades;
    const navigate = useNavigate();
    const [data, setData] = useState(null);
    const [errorMessage, setErrorMessage] = useState("");
    const bcraapi = "https://api.bcra.gob.ar/centraldedeudores/v1.0";

    if (!deudor) {
        return <p>No CUIL provided</p>;
    }

    //   return <div>Cuil: {deudor}</div>; // Replace with actual data logic
    // };    

    useEffect(() => {
        const fetchData = async () => {
            if (!deudor) return;

            try {
                const response = await axios.get(`${bcraapi}/Deudas/${deudor}`);
                if (response.status === 200) {
                    // Successful response
                    setData(response.data.results);
                    setErrorMessage("");
                    NotificationService.success("Datos mostrados exitosamente");
                }
            } catch (error) {
                // Handle 404 or other errors
                if (error.response && error.response.status === 404) {
                    setData(null);
                    setErrorMessage(
                        error.response.data.errorMessages?.join(", ") || "No se encontraron datos para la identificación ingresada."
                    );
                } else {
                    setData(null);
                    setErrorMessage("Ocurrió un error al consultar los datos.");
                }
                NotificationService.error("Error al consultar datos.");
            }
        };

        fetchData();
    }, [deudor]);

    if (errorMessage) {
        return (
            <div className="flex flex-col items-center p-6">
                <Typography variant="h6" className="text-red-500">
                    {errorMessage}
                </Typography>
            </div>
        );
    }

    if (!data) {
        console.log(data);
        return (
            <div className="flex flex-col items-center p-6">

                <Typography variant="h6" className="text-gray-500">
                    Loading...
                </Typography>
            </div>
        );
    }

    const { periodos, denominacion, identificacion } = data;
    const handleClick = () => {
        navigate('/solicitar'); // Navigates to the /solicitar path
    };
    // Extract the `entidades` array
    const entidades = periodos.flatMap((periodo) => periodo.entidades);
    // Find the max `situacion` value and its corresponding `entidad`
    const { maxSituacion, maxEntity } = entidades.reduce(
        (acc, entidad) => {
            if (entidad.situacion > acc.maxSituacion) {
                return {
                    maxSituacion: entidad.situacion,
                    maxEntity: entidad.entidad,
                };
            }
            return acc;
        },
        { maxSituacion: 0, maxEntity: "" } // Initial accumulator
    );
    console.log("Max Situacion:", maxSituacion); // Output: 5
    console.log("Max Entity:", maxEntity);


    return (
        <div className="flex flex-col lg:flex-row bg-white">
            {/* Left Side with Image */}
            <div className="w-full lg:w-1/2 relative">
                <img
                    src={TieneDeudasImage}
                    alt="Tiene Deudas"
                    className="object-cover w-full h-full"
                />
            </div>

            {/* Right Side with Content */}
            <div className="w-full lg:w-1/2 flex flex-col p-6">
                <h2 className="text-text-primary text-2xl font-bold mb-4">
                    Informe de deudas
                </h2>
                <p className="mb-0 text-text-secondary">
                    Deudas para:
                </p>
                <h2 className="mb-2 font-bold">
                    {denominacion} <br />CUIL: ({identificacion})
                </h2>
                <p className="p mb-2 text-text-secondary tooltip-container">
                    ¿Qué significa cada situación?
                    <p className="tooltip-text ">
                        1. Normal - Atraso en el pago que no supere los 31 días.
                        <br />
                        2. Riesgo bajo - Atraso en el pago de más de 31 y hasta 90 días desde el vencimiento.
                        <br />
                        3. Riesgo medio - Atraso en el pago de más de 90 y hasta 180 días.
                        <br />
                        4. Riesgo alto - Atraso en el pago de más de 180 días hasta un año.
                        <br />
                        5. Irrecuperable - Atrasos superiores a un año.
                    </p>
                </p>
                <div>
                    {/* Render this data where needed */}
                    <p>Max Situación: {maxSituacion}</p>
                    <p>Entidad Correspondiente: {maxEntity}</p>
                    {maxSituacion === 5 && (
                        <p className="text-red-500">
                            Resuelva su situación {maxSituacion} con {maxEntity} y vuelva a enviar la solicitud.
                        </p>
                    )}
                </div>
                {/* <div className="w-full my-4">
                    <button className="btn-tertiary w-full " onClick={handleClick} >Volver al inicio</button>
                </div> */}
<div className="w-full my-4 flex gap-4">
    <button className="btn-tertiary w-full" onClick={handleClick}>
        Volver al inicio
    </button>
    <div className="relative w-full">
        <button
            className={`btn-primary w-full ${maxSituacion === 5 ? 'cursor-not-allowed opacity-50' : ''}`}
            onClick={() => navigate('/preaprobacion')}
            disabled={maxSituacion === 5}
        >
            Enviar Solicitud
        </button>
        {maxSituacion === 5 && (
            <div className="absolute left-0 right-0 top-full mt-2 bg-red-500 text-white text-sm rounded p-2 shadow-lg z-10 opacity-0 group-hover:opacity-100 transition-opacity">
                Resuelva su situación {maxSituacion} con {maxEntity} y vuelva a enviar la solicitud.
            </div>
        )}
    </div>
</div>

                {periodos.map((periodo) => (
                    <div key={periodo.periodo} className="w-full mb-8">
                        {/* Subtitle for the Period */}
                        <h6 className="mb-4 text-lg font-semibold">
                            Periodo: {periodo.periodo}
                        </h6>

                        {/* Table */}
                        <div className="shadow-md overflow-x-auto rounded-xl">
                            <table style={{ width: "100%", backgroundColor: "#F8D6D3" }}>
                                {/* <thead>
                                    <tr style={{ color: "#430E12", fontWeight: "bold" }}>
                                        <th style={{ padding: "8px", textAlign: "left" }}>Entidad</th>
                                        <th style={{ padding: "8px", textAlign: "left" }}>Situación</th>
                                        <th style={{ padding: "8px", textAlign: "left" }}>Fecha Situación</th>
                                        <th style={{ padding: "8px", textAlign: "left" }}>Monto</th>
                                        <th style={{ padding: "8px", textAlign: "left" }}>Días Atraso</th>
                                    </tr>
                                </thead> */}
                                <tbody>
                                    {periodo.entidades.map((entidad, index) => (
                                        <tr key={index}>
                                            <tr><td colSpan="3" style={{ color: "#430E12", paddingTop: "10px", paddingLeft: "10px", fontWeight: "bold" }}>Entidad</td></tr>
                                            <tr><td colSpan="3" style={{ color: "#CE494B", paddingLeft: "10px" }}>{entidad.entidad}</td></tr>
                                            <tr><td colSpan="3" style={{ color: "#430E12", paddingLeft: "10px", fontWeight: "bold" }}>Fecha Situación</td></tr>
                                            <tr><td colSpan="3" style={{ color: "#CE494B", paddingLeft: "10px" }}>{entidad.fechaSit1}</td></tr>
                                            <tr>
                                                <td style={{ color: "#430E12", paddingLeft: "10px", fontWeight: "bold", width: "33.33%" }}>Situación</td>
                                                <td style={{ color: "#430E12", paddingLeft: "10px", fontWeight: "bold", width: "33.33%" }}>Días Atraso</td>
                                                <td style={{ color: "#430E12", paddingLeft: "10px", fontWeight: "bold", width: "33.33%" }}>Monto</td>
                                            </tr>
                                            <tr>
                                                <td style={{ padding: "8px", color: "#CE494B", width: "33.33%" }}>{entidad.situacion}</td>
                                                <td style={{ padding: "8px", color: "#CE494B", width: "33.33%" }}>{entidad.diasAtrasoPago}</td>
                                                <td style={{ padding: "8px", color: "#CE494B", width: "33.33%" }}>${entidad.monto.toFixed(2)}</td>
                                            </tr>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                ))}

            </div>
        </div>
    );
};

export default TieneDeudas;


// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Typography } from "@mui/material";
// import { NotificationService } from "../shared/notistack.service";
// import TieneDeudasImage from "../assets/TieneDeudas.png";
// import { useLocation } from "react-router-dom";
// import { useNavigate } from 'react-router-dom';

// const deudasData = [
//     {
//         "status": 200,
//         "results": {
//             "identificacion": 20395112881,
//             "denominacion": "RANALLO LUCAS NAHUEL",
//             "periodos": [
//                 {
//                     "periodo": "202409",
//                     "entidades": [
//                         {
//                             "entidad": "BANCO BBVA ARGENTINA S.A.",
//                             "situacion": 1,
//                             "fechaSit1": "2017-12-30",
//                             "monto": 1072.0,
//                             "diasAtrasoPago": 0,
//                             "refinanciaciones": false,
//                             "recategorizacionOblig": false,
//                             "situacionJuridica": false,
//                             "irrecDisposicionTecnica": false,
//                             "enRevision": false,
//                             "procesoJud": false
//                         },
//                         {
//                             "entidad": "BANCO DE GALICIA Y BUENOS AIRES S.A.U.",
//                             "situacion": 1,
//                             "fechaSit1": "2017-12-30",
//                             "monto": 725.0,
//                             "diasAtrasoPago": 0,
//                             "refinanciaciones": false,
//                             "recategorizacionOblig": false,
//                             "situacionJuridica": false,
//                             "irrecDisposicionTecnica": false,
//                             "enRevision": false,
//                             "procesoJud": false
//                         }
//                     ]
//                 }
//             ]
//         }
//     }
// ]


// const TieneDeudas = () => {
//     const location = useLocation();
//     const { deudor } = location.state || {}; // Retrieve cuilNumber
//     const deudas = deudasData[0].results.periodos[0].entidades;
//     const navigate = useNavigate();
//     const [data, setData] = useState(null);
//     const [errorMessage, setErrorMessage] = useState("");
//     const bcraapi = "https://api.bcra.gob.ar/centraldedeudores/v1.0";

//     if (!deudor) {
//         return <p>No CUIL provided</p>;
//     }

//     //   return <div>Cuil: {deudor}</div>; // Replace with actual data logic
//     // };

//     useEffect(() => {
//         const fetchData = async () => {
//             if (!deudor) return;

//             try {
//                 const response = await axios.get(`${bcraapi}/Deudas/${deudor}`);
//                 if (response.status === 200) {
//                     // Successful response
//                     setData(response.data.results);
//                     setErrorMessage("");
//                     NotificationService.success("Datos mostrados exitosamente");
//                 }
//             } catch (error) {
//                 // Handle 404 or other errors
//                 if (error.response && error.response.status === 404) {
//                     setData(null);
//                     setErrorMessage(
//                         error.response.data.errorMessages?.join(", ") || "No se encontraron datos para la identificación ingresada."
//                     );
//                 } else {
//                     setData(null);
//                     setErrorMessage("Ocurrió un error al consultar los datos.");
//                 }
//                 NotificationService.error("Error al consultar datos.");
//             }
//         };

//         fetchData();
//     }, [deudor]);

//     if (errorMessage) {
//         return (
//             <div className="flex flex-col items-center p-6">
//                 <Typography variant="h6" className="text-red-500">
//                     {errorMessage}
//                 </Typography>
//             </div>
//         );
//     }

//     if (!data) {
//         console.log(data);
//         return (
//             <div className="flex flex-col items-center p-6">

//                 <Typography variant="h6" className="text-gray-500">
//                     Loading...
//                 </Typography>
//             </div>
//         );
//     }

//     const { periodos, denominacion, identificacion } = data;
//     const handleClick = () => {
//         navigate('/solicitar'); // Navigates to the /solicitar path
//     };

//     return (
//         <div className="flex flex-col lg:flex-row bg-white">
//             {/* Left Side with Image */}
//             <div className="w-full lg:w-1/2 relative">
//                 <img
//                     src={TieneDeudasImage}
//                     alt="Tiene Deudas"
//                     className="object-cover w-full h-full"
//                 />
//             </div>

//             {/* Right Side with Content */}
//             <div className="w-full lg:w-1/2 flex flex-col p-6">
//                 <h2 className="text-text-primary text-2xl font-bold mb-4">
//                     Informe de deudas
//                 </h2>
//                 <p className="mb-0 text-text-secondary">
//                     Deudas para:
//                 </p>
//                 <h2 className="mb-2 font-bold">
//                     {denominacion} <br />CUIL: ({identificacion})
//                 </h2>
//                 <p className="p mb-2 text-text-secondary tooltip-container">
//                     ¿Qué significa cada situación?
//                     <p className="tooltip-text ">
//                         1. Normal - Atraso en el pago que no supere los 31 días.
//                         <br />
//                         2. Riesgo bajo - Atraso en el pago de más de 31 y hasta 90 días desde el vencimiento.
//                         <br />
//                         3. Riesgo medio - Atraso en el pago de más de 90 y hasta 180 días.
//                         <br />
//                         4. Riesgo alto - Atraso en el pago de más de 180 días hasta un año.
//                         <br />
//                         5. Irrecuperable - Atrasos superiores a un año.
//                     </p>
//                 </p>
//                 <div className="w-full mb-4">
//                     <button className="btn-tertiary w-full " onClick={handleClick} >Volver al inicio</button>
//                 </div>
//                 {periodos.map((periodo) => (
//                     <div key={periodo.periodo} className="w-full mb-8">
//                         {/* Subtitle for the Period */}
//                         <h6 className="mb-4 text-lg font-semibold">
//                             Periodo: {periodo.periodo}
//                         </h6>

//                         {/* Table */}
//                         <div className="shadow-md overflow-x-auto rounded-xl">
//                             <table style={{ width: "100%", backgroundColor: "#F8D6D3" }}>
//                                 {/* <thead>
//                                     <tr style={{ color: "#430E12", fontWeight: "bold" }}>
//                                         <th style={{ padding: "8px", textAlign: "left" }}>Entidad</th>
//                                         <th style={{ padding: "8px", textAlign: "left" }}>Situación</th>
//                                         <th style={{ padding: "8px", textAlign: "left" }}>Fecha Situación</th>
//                                         <th style={{ padding: "8px", textAlign: "left" }}>Monto</th>
//                                         <th style={{ padding: "8px", textAlign: "left" }}>Días Atraso</th>
//                                     </tr>
//                                 </thead> */}
//                                 <tbody>
//                                     {periodo.entidades.map((entidad, index) => (
//                                         <tr key={index}>
//                                             <tr><td colSpan="3" style={{ color: "#430E12", paddingTop: "10px", paddingLeft: "10px", fontWeight: "bold" }}>Entidad</td></tr>
//                                             <tr><td colSpan="3" style={{ color: "#CE494B", paddingLeft: "10px" }}>{entidad.entidad}</td></tr>
//                                             <tr><td colSpan="3" style={{ color: "#430E12", paddingLeft: "10px", fontWeight: "bold" }}>Fecha Situación</td></tr>
//                                             <tr><td colSpan="3" style={{ color: "#CE494B", paddingLeft: "10px" }}>{entidad.fechaSit1}</td></tr>
//                                             <tr>
//                                                 <td style={{ color: "#430E12", paddingLeft: "10px", fontWeight: "bold", width: "33.33%" }}>Situación</td>
//                                                 <td style={{ color: "#430E12", paddingLeft: "10px", fontWeight: "bold", width: "33.33%" }}>Días Atraso</td>
//                                                 <td style={{ color: "#430E12", paddingLeft: "10px", fontWeight: "bold", width: "33.33%" }}>Monto</td>
//                                             </tr>
//                                             <tr>
//                                                 <td style={{ padding: "8px", color: "#CE494B", width: "33.33%" }}>{entidad.situacion}</td>
//                                                 <td style={{ padding: "8px", color: "#CE494B", width: "33.33%" }}>{entidad.diasAtrasoPago}</td>
//                                                 <td style={{ padding: "8px", color: "#CE494B", width: "33.33%" }}>${entidad.monto.toFixed(2)}</td>
//                                             </tr>
//                                         </tr>
//                                     ))}
//                                 </tbody>
//                             </table>
//                         </div>
//                     </div>
//                 ))}

//             </div>
//         </div>
//     );
// };

// export default TieneDeudas;
