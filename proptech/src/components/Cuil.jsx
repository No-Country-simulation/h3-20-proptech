import React, { useState } from "react";
import { TextField, Button, MenuItem, Select, FormControl, InputLabel } from "@mui/material";
import DeudasTable from "./DeudasTable";


const Cuil = () => {
   const [dni, setDni] = useState("");
   const [xx, setXx] = useState(20); // Default to "M"
   const [result, setResult] = useState("");
   const [cuil, setCuil] = useState();
   const [showDeudas, setShowDeudas] = useState(false);

   const calculateValue = () => {
      if (dni.length !== 8 || isNaN(dni)) {
         alert("Please enter a valid 8-digit DNI.");
         return;
      }

      // Calculation logic
      const key = [5, 4, 3, 2, 7, 6, 5, 4, 3, 2];
      let sumx = 0;

      // Convert the number to a string, split it into individual characters, and then map them back to numbers
      let xx1 = Array.from(String(xx), Number);
      // Wrap the array of digits into an object
      let result = { digits: xx1 };

      for (let i = 0; i < 2; i++) {
         sumx += xx1[i] * key[i];
      }
      let j = 0;
      for (let i = 2; i <= 9; i++) {
         sumx += dni[j] * key[i];
         j++;
      }

      const modx = sumx % 11;
      let x, xy;

      if (modx === 0) {
         x = 0;
         xy = xx;
      } else if (modx === 1) {
         x = xx === 20 ? 9 : xx === 27 ? 4 : 11 - modx;
         xy = 23;
      } else {
         x = 11 - modx;
         xy = xx;
      }

      // Construct result
      setResult(`${xy}-${dni}-${x}`);
      setCuil(`${xy}${dni}${x}`);

   };
   
   // Function to toggle the display of DeudasTable
   const toggleDeudas = () => {
      setShowDeudas(!showDeudas);
   };

   return (
      <div className="flex flex-col items-center p-6 space-y-4">
      {/* DNI Input */}
      <TextField
         label="DNI"
         variant="outlined"
         value={dni}
         onChange={(e) => setDni(e.target.value.replace(/\D/g, ""))} // Allow only numbers
         inputProps={{ maxLength: 8 }}
         className="w-64"
      />

      {/* XX Dropdown */}
      <FormControl className="w-64">
         <InputLabel>XX</InputLabel>
         <Select value={xx} onChange={(e) => setXx(e.target.value)}>
            <MenuItem value={20}>M (20)</MenuItem>
            <MenuItem value={27}>F (27)</MenuItem>
            <MenuItem value={30}>E (30)</MenuItem>
         </Select>
      </FormControl>

      {/* Calculate Button */}
      <Button
         variant="contained"
         color="primary"
         onClick={calculateValue}
         className="w-64"
      >
         Calcular
      </Button>

      {/* Result */}
      {result && (
         <div className="mt-4 p-4 border rounded-lg bg-gray-100 text-lg">
            CUIL: <span className="font-bold">{result}</span>
         </div>
      )}

      {/* Estado Deuda Button */}
      {cuil && (
         <Button
            variant="contained"
            color="secondary"
            onClick={toggleDeudas}
            className="w-64 mt-4"
         >
            Estado Deuda
         </Button>
      )}

      {/* Display DeudasTable if showDeudas is true */}
      {showDeudas && cuil && <DeudasTable cuil={cuil} />}
   </div>

   );
};

export default Cuil;



// import React, { useState } from "react";
// import { TextField, Button, MenuItem, Select, FormControl, InputLabel } from "@mui/material";
// import axios from "axios";

// const Cuil = () => {
//   const [dni, setDni] = useState("");
//   const [xx, setXx] = useState(20); // Default to "M"
//   const [result, setResult] = useState("");

//   const handleCalculate = async () => {
//     if (dni.length !== 8 || isNaN(dni)) {
//       alert("Please enter a valid 8-digit DNI.");
//       return;
//     }

//     try {
//       const response = await axios.post("http://localhost:5000/calculate", {
//         dni,
//         xx,
//       });
//       setResult(response.data.result); // Assuming backend returns { result: "xy - dni - x" }
//     } catch (error) {
//       console.error("Error calculating value:", error);
//       alert("An error occurred while calculating.");
//     }
//   };

//   return (
//     <div className="flex flex-col items-center p-6 space-y-4">
//       {/* DNI Input */}
//       <TextField
//         label="DNI"
//         variant="outlined"
//         value={dni}
//         onChange={(e) => setDni(e.target.value.replace(/\D/g, ""))} // Allow only numbers
//         inputProps={{ maxLength: 8 }}
//         className="w-64"
//       />

//       {/* XX Dropdown */}
//       <FormControl className="w-64">
//         <InputLabel>XX</InputLabel>
//         <Select value={xx} onChange={(e) => setXx(e.target.value)}>
//           <MenuItem value={20}>M (20)</MenuItem>
//           <MenuItem value={27}>F (27)</MenuItem>
//           <MenuItem value={30}>E (30)</MenuItem>
//         </Select>
//       </FormControl>

//       {/* Calculate Button */}
//       <Button
//         variant="contained"
//         color="primary"
//         onClick={handleCalculate}
//         className="w-64"
//       >
//         Calculate
//       </Button>

//       {/* Result */}
//       {result && (
//         <div className="mt-4 p-4 border rounded-lg bg-gray-100 text-lg">
//           Result: <span className="font-bold">{result}</span>
//         </div>
//       )}
//     </div>
//   );
// };

// export default Cuil;

// //**** requires python backend calculation endpoint **** */
// // from fastapi import FastAPI
// // from pydantic import BaseModel

// // app = FastAPI()

// // class CalculationInput(BaseModel):
// //     dni: str
// //     xx: int

// // @app.post("/calculate")
// // async def calculate(data: CalculationInput):
// //     dni = data.dni
// //     xx = data.xx
// //     key = [5, 4, 3, 2, 7, 6, 5, 4, 3, 2]
// //     sumx = 0

// //     for j in range(10):
// //         for i in range(2):
// //             sumx += xx * key[j]
// //         for i in range(8):
// //             sumx += int(dni[i]) * key[j]

// //     modx = sumx % 11
// //     if modx == 0:
// //         x = 0
// //     elif modx == 1:
// //         x = 9 if xx == 20 else 4 if xx == 27 else (11 - modx)
// //     else:
// //         x = 11 - modx

// //     xy = xx if modx == 0 else 23 if modx == 1 else None

// //     result = f"{xy}-{dni}-{x}"
// //     return {"result": result}

