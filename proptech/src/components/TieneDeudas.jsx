import React, { useState, useEffect } from "react";
import axios from "axios";
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Typography } from "@mui/material";
import { NotificationService } from "../shared/notistack.service";
import TieneDeudasImage from "../assets/TieneDeudas.png";
import { useLocation } from "react-router-dom";

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


  return (
    <div className="flex flex-col lg:flex-row h-screen bg-white">
      {/* Left Side with Image */}
      <div className="w-full lg:w-1/2 relative">
        <img
          src={TieneDeudasImage}
          alt="Tiene Deudas"
          className="object-cover w-full h-full"
        />
        <div className="absolute bottom-10 left-10 text-white text-4xl font-bold">
          Conoce tu situación financiera
        </div>
      </div>

      {/* Right Side with Content */}
      <div className="w-full lg:w-1/2 flex flex-col p-6">
        <h2 className="text-primary text-2xl font-bold mb-4">
          ¿Tienes Deudas?
        </h2>
        <p className="p mb-4">
          Consulta el estado de tus deudas para mantener un control financiero
          claro y eficiente. A continuación, se detalla la información sobre
          tus entidades financieras y sus situaciones.
        </p>

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


        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full border border-gray-300">
            <thead className="bg-gray-200">
              <tr>
                <th className="text-left px-4 py-2 border-b">Entidad</th>
                <th className="text-left px-4 py-2 border-b">Situación</th>
                <th className="text-left px-4 py-2 border-b">Fecha Situación</th>
                <th className="text-left px-4 py-2 border-b">Monto</th>
                <th className="text-left px-4 py-2 border-b">Días Atraso</th>
              </tr>
            </thead>
            <tbody>
              {deudas.map((entidad, index) => (
                <tr key={index} className="even:bg-gray-50">
                  <td className="px-4 py-2 border-b">{entidad.entidad}</td>
                  <td className="px-4 py-2 border-b">{entidad.situacion}</td>
                  <td className="px-4 py-2 border-b">{entidad.fechaSit1}</td>
                  <td className="px-4 py-2 border-b">${entidad.monto.toFixed(2)}</td>
                  <td className="px-4 py-2 border-b">{entidad.diasAtrasoPago}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Button */}
        <div className="mt-6">
          <button className="btn-secondary px-6 py-2 text-white rounded-md bg-blue-500 hover:bg-blue-600 focus:outline-none">
            Más información
          </button>
        </div>
      </div>
    </div>
  );
};

export default TieneDeudas;
