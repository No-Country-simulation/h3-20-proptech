import React, { useState, useEffect } from "react";
import axios from "axios";
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Typography } from "@mui/material";


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
const DeudasTable = () => {
  const [data, setData] = useState(null);
  const [error, setError] = useState("");
const bcraapi="https://api.bcra.gob.ar/centraldedeudores/v1.0";
const [deudor,setDeudor] = useState("20395112881");

  useEffect(() => {
    // Mock fetching the data
    const fetchData = async () => {
      try {
        // Replace the fetch URL with the real endpoint if needed
        const response = await axios.get(`${bcraapi}/Deudas/${deudor}`); // Mock endpoint
        setData(response.data);
      //   setData(deudasData[0]); //set to use mockdata
      } catch (err) {
        setError("Failed to fetch data. Please try again.");
        console.error(err);
      }
    };

    fetchData();
  }, []);

  // Handle loading and error states
  if (error) return <div className="text-red-500">{error}</div>;
  if (!data) return <div className="text-gray-500">Loading...</div>;

  const { periodos } = data.results;

  return (
    <div className="flex flex-col items-center p-6">
      <Typography variant="h5" className="mb-4 text-center">
        Deudas for {data.results.denominacion} ({data.results.identificacion})
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
