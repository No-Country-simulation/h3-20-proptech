import React, { useState } from "react";
import { TextField, Button, MenuItem, Select, FormControl, InputLabel, Input } from "@mui/material";
import DeudasTable from "./DeudasTable";
import TieneDeudas from "./TieneDeudas";

import { useNavigate } from "react-router-dom"; // Import useNavigate

const Cuil = () => {
  const [dni, setDni] = useState("");
  const [xx, setXx] = useState(20); // Default to "M"
  const [result, setResult] = useState("");
  const [cuilNumber, setCuilNumber] = useState();
  const [showDeudas, setShowDeudas] = useState(false);

  const navigate = useNavigate(); // Initialize useNavigate

  const calculateValue = () => {
    if (dni.length !== 8 || isNaN(dni)) {
      alert("Please enter a valid 8-digit DNI.");
      return;
    }

    // Calculation logic
    const key = [5, 4, 3, 2, 7, 6, 5, 4, 3, 2];
    let sumx = 0;

    let xx1 = Array.from(String(xx), Number);
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

    const cuil = `${xy}${dni}${x}`;
    setResult(`${xy}-${dni}-${x}`);
    setCuilNumber(cuil);
  };

  const toggleDeudas = (calculatedCuil) => {
    navigate("/tieneDeudas", { state: { deudor: calculatedCuil  } });
  };

  return (
    <div className="flex flex-col items-center p-6 space-y-4">
          <div className="w-full max-w-md ">
              {/* DNI Input */}
              <div className="w-full max-w-md">
                  <label htmlFor="dni" className="block text-sm font-medium text-gray-700">
                      DNI
                  </label>
                  <p className=" p-message mt-1 block">
                      Necesitamos tu DNI para tener acceso a la información.
                  </p>
                  <input
                      type="text"
                      id="dni"
                      placeholder="Ingresa tu DNI"
                      value={dni}
                      onChange={(e) => setDni(e.target.value.replace(/\D/g, ""))} // Allow only numbers
                      maxLength="8"
                      className="input-field"
                  />
              </div>
              {/* XX Dropdown */}
              <div className="w-full max-w-md mt-4">
                  <label htmlFor="gender" className="block text-sm font-medium text-gray-700">
                      Sexo
                  </label>
                  <p className=" p-message mt-1 block">
                      Selecciona el sexo que figura en tu DNI.
                  </p>
                  <select
                      value={xx}
                      onChange={(e) => setXx(e.target.value)}
                      className="select"
                  >
                      <option value={20}>M (20)</option>
                      <option value={27}>F (27)</option>
                      <option value={30}>E (30)</option>
                  </select>
              </div>
                  <br/>
              <div>
                  {/* Calculate Button */}
                  <button
                      type="submit"
                      color="primary"
                      onClick={calculateValue}
                      className="btn-primary w-full"
                  >
                      Consultar CUIL
                  </button>
              </div>
          </div>  
          <div className="w-full max-w-md mt-6">
              {/* Result */}
              {result && (
                  <div className="mt-4 p-4 border rounded-lg bg-gray-100 text-lg">
                      <span className="font-bold ">CUIL: {result}</span>
                  </div>
              )}
          {/* Estado Deuda Button */}
          {cuilNumber && (
              <button
                  variant="contained"
                  color="secondary"
                  onClick={() => toggleDeudas(cuilNumber)}
                  className="btn-secondary w-full mt-4"
              >
                  Estado Deuda
              </button>
          )}
</div>
          {/* Display DeudasTable if showDeudas is true */}
          {showDeudas && cuilNumber && <TieneDeudas deudor={cuilNumber} />}

      </div>
  );
};

export default Cuil;

//******************** version 2 *********** */
// import React, { useState } from "react";
// import { TextField, Button, MenuItem, Select, FormControl, InputLabel, Input } from "@mui/material";
// import DeudasTable from "./DeudasTable";


// const Cuil = () => {
//    const [dni, setDni] = useState("");
//    const [xx, setXx] = useState(20); // Default to "M"
//    const [result, setResult] = useState("");
//    const [cuilNumber, setCuilNumber] = useState();
//    const [showDeudas, setShowDeudas] = useState(false);

//    const calculateValue = () => {
//       if (dni.length !== 8 || isNaN(dni)) {
//          alert("Please enter a valid 8-digit DNI.");
//          return;
//       }

//       // Calculation logic
//       const key = [5, 4, 3, 2, 7, 6, 5, 4, 3, 2];
//       let sumx = 0;

//       // Convert the number to a string, split it into individual characters, and then map them back to numbers
//       let xx1 = Array.from(String(xx), Number);
//       // Wrap the array of digits into an object
//       let result = { digits: xx1 };

//       for (let i = 0; i < 2; i++) {
//          sumx += xx1[i] * key[i];
//       }
//       let j = 0;
//       for (let i = 2; i <= 9; i++) {
//          sumx += dni[j] * key[i];
//          j++;
//       }

//       const modx = sumx % 11;
//       let x, xy;

//       if (modx === 0) {
//          x = 0;
//          xy = xx;
//       } else if (modx === 1) {
//          x = xx === 20 ? 9 : xx === 27 ? 4 : 11 - modx;
//          xy = 23;
//       } else {
//          x = 11 - modx;
//          xy = xx;
//       }

//       // Construct result
//       setResult(`${xy}-${dni}-${x}`);
//       setCuilNumber(`${xy}${dni}${x}`);

//    };
   
//    // Function to toggle the display of DeudasTable
//    const toggleDeudas = () => {
//       setShowDeudas(!showDeudas);
//    };

//    return (
//       <div className="flex flex-col items-center p-6 space-y-4">
//       {/* DNI Input */}
//       <Input
//          label="DNI"
//          variant="outlined"
//          value={dni}
//          onChange={(e) => setDni(e.target.value.replace(/\D/g, ""))} // Allow only numbers
//          inputProps={{ maxLength: 8 }}
//          className="input-field"
//       />

//       {/* XX Dropdown */}
//       <FormControl className="w-64">
//          <InputLabel>XX</InputLabel>
//          <Select value={xx} onChange={(e) => setXx(e.target.value)}>
//             <MenuItem value={20}>M (20)</MenuItem>
//             <MenuItem value={27}>F (27)</MenuItem>
//             <MenuItem value={30}>E (30)</MenuItem>
//          </Select>
//       </FormControl>

//       {/* Calculate Button */}
//       <Button
//          variant="contained"
//          color="primary"
//          onClick={calculateValue}
//          className="w-64"
//       >
//          Calcular
//       </Button>

//       {/* Result */}
//       {result && (
//          <div className="mt-4 p-4 border rounded-lg bg-gray-100 text-lg">
//             CUIL: <span className="font-bold">{result}</span>
//          </div>
//       )}

//       {/* Estado Deuda Button */}
//       {cuilNumber && (
//          <Button
//             variant="contained"
//             color="secondary"
//             onClick={toggleDeudas}
//             className="w-64 mt-4"
//          >
//             Estado Deuda
//          </Button>
//       )}

//       {/* Display DeudasTable if showDeudas is true */}
//       {showDeudas && cuilNumber && <DeudasTable deudor={cuilNumber} />}
//    </div>

//    );
// };

// export default Cuil;
