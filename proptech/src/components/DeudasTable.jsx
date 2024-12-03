// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Typography } from "@mui/material";
// import { NotificationService } from "../shared/notistack.service";
// import Cuil from "./Cuil";

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
// const DeudasTable = ({ deudor }) => {
//     const [data, setData] = useState(null);
//     const [error, setError] = useState("");
//     const bcraapi = "https://api.bcra.gob.ar/centraldedeudores/v1.0";

//     // useEffect(() => {
//     //     const fetchData = async () => {
//     //         try {
//     //             if (deudor) {
//     //                 // fetch URL with the real endpoint 
//     //                 const response = await axios.get(`${bcraapi}/Deudas/${deudor}`);
//     //                 if (response.status === 404) {
//     //                     setError(response.data.errorMessages[0]); // Set error message
//     //                     setData(null); // Clear any previous data
//     //                   } else {
//     //                     setData(response.data);
//     //                     NotificationService.success("Datos mostrados exitosamente");
//     //                   }
//     //             } else {
//     //                 // Fallback to mock data if no deudor is provided
//     //                 setData(deudasData[0]);
//     //                 NotificationService.info("Mostrando datos de prueba (mock)");
//     //             }
//     //         } catch (err) {
//     //             setError("Error al consultar datos");
//     //             NotificationService.error("Error al consultar datos");
//     //         }
//     //     };

//     //     fetchData();
//     // }, [deudor]);

//     useEffect(() => {
//         const fetchData = async () => {
//           try {
//             const response = await axios.get(`${bcraapi}/Deudas/${deudor}`);
//             if (response.data.status === 200) {
//               setData(response.data);
//               setError("");
//               NotificationService.success("Datos mostrados exitosamente");
//             } else if (response.data.status === 404) {
//               setData(null);
//               setError(response.data.errorMessages.join(", "));
//             }
//           } catch (err) {
//             setError(err.errorMessages);
//             NotificationService.error("Error al consultar datos");
//           }
//         };
    
//         if (deudor) {
//           fetchData();
//         }
//       }, [deudor]);    

//     // Handle loading and error states
//     if (error) return <div className="text-red-500">{error}</div>;
//     if (!data) return <div className="text-gray-500">Loading...</div>;

//     const { periodos, denominacion, identificacion } = data.results;

//     return (
//         <div className="flex flex-col items-center p-6">
//         <Typography variant="h5" className="mb-4 text-center">
//           Deudas for {denominacion} ({identificacion})
//         </Typography>
  
//         {periodos.map((periodo) => (
//           <div key={periodo.periodo} className="w-full mb-8">
//             {/* Subtitle for the Period */}
//             <Typography variant="h6" className="mb-4">
//               Periodo: {periodo.periodo}
//             </Typography>
  
//             {/* Table */}
//             <TableContainer component={Paper} className="shadow-md">
//               <Table>
//                 <TableHead className="bg-gray-200">
//                   <TableRow>
//                     <TableCell>Entidad</TableCell>
//                     <TableCell>Situación</TableCell>
//                     <TableCell>Fecha Situación</TableCell>
//                     <TableCell>Monto</TableCell>
//                     <TableCell>Días Atraso</TableCell>
//                   </TableRow>
//                 </TableHead>
//                 <TableBody>
//                   {periodo.entidades.map((entidad, index) => (
//                     <TableRow key={index}>
//                       <TableCell>{entidad.entidad}</TableCell>
//                       <TableCell>{entidad.situacion}</TableCell>
//                       <TableCell>{entidad.fechaSit1}</TableCell>
//                       <TableCell>${entidad.monto.toFixed(2)}</TableCell>
//                       <TableCell>{entidad.diasAtrasoPago}</TableCell>
//                     </TableRow>
//                   ))}
//                 </TableBody>
//               </Table>
//             </TableContainer>
//           </div>
//         ))}
//       </div>
//     );
// };

// export default DeudasTable;


import React, { useState, useEffect } from "react";
import axios from "axios";
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Typography } from "@mui/material";
import { NotificationService } from "../shared/notistack.service";

const DeudasTable = ({ deudor }) => {
  const [data, setData] = useState(null);
  const [errorMessage, setErrorMessage] = useState("");
  const bcraapi = "https://api.bcra.gob.ar/centraldedeudores/v1.0";

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
    return (
      <div className="flex flex-col items-center p-6">
        <Typography variant="h6" className="text-gray-500">
          Loading...
        </Typography>
      </div>
    );
  }

  const { periodos, denominacion, identificacion } = data;

  return (
    <div className="flex flex-col items-center p-6">
      <Typography variant="h5" className="mb-4 text-center">
        Deudas: {denominacion} ({identificacion})
      </Typography>

      {periodos.map((periodo) => (
        <div key={periodo.periodo} className="w-full mb-8">
          {/* Subtitle for the Period */}
          <Typography variant="h6" className="mb-4">
            Periodo: {periodo.periodo}
          </Typography>

          {/* Table */}
          <TableContainer component={Paper} className="shadow-md">
            <Table>
              <TableHead className="bg-gray-200">
                <TableRow>
                  <TableCell>Entidad</TableCell>
                  <TableCell>Situación</TableCell>
                  <TableCell>Fecha Situación</TableCell>
                  <TableCell>Monto</TableCell>
                  <TableCell>Días Atraso</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {periodo.entidades.map((entidad, index) => (
                  <TableRow key={index}>
                    <TableCell>{entidad.entidad}</TableCell>
                    <TableCell>{entidad.situacion}</TableCell>
                    <TableCell>{entidad.fechaSit1}</TableCell>
                    <TableCell>${entidad.monto.toFixed(2)}</TableCell>
                    <TableCell>{entidad.diasAtrasoPago}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </div>
      ))}
    </div>
  );
};

export default DeudasTable;

