import React from "react";
import ComoSolicitarImage from "../assets/ComoSolicitarTuCredito.png";
import Cuil from "./Cuil";

const ComoSolicitarTuCredito = () => {
    return (
        <div className="flex flex-col lg:flex-row ">
            {/* Left Side with Image */}
            <div className="w-full lg:w-1/2 relative">
                <img
                    src={ComoSolicitarImage}
                    alt="Cómo solicitar tu crédito"
                    className="object-cover w-full h-full"
                />
                <div className="absolute bottom-10 left-10 text-white text-4xl font-bold">
                    <h2>Tu sueño al alcance de tus manos</h2>
                </div>
            </div>

            {/* Right Side with Form */}
            <div className="w-full lg:w-1/2 flex flex-col  items-center p-6">
                <h2 className="text-text-primary text-2xl font-bold mb-4">¿Cómo solicitar tu crédito?</h2>
                <p className="p text-center">
                    Para solicitar tu pre aprobación y registro, primero debemos comprobar tu estado crediticio.
                </p>
                <p className="p text-center mt-2">
                    Si tu situación te lo permite y quieres continuar adelante con el proceso, te recomendamos
                    tener a mano la documentación necesaria.
                </p>
                <div className="w-full ">
                    <Cuil />
                </div>


            </div>
        </div>
    );
};

export default ComoSolicitarTuCredito;


// import React from "react";
// import { TextField, Button, MenuItem, Select, FormControl, InputLabel, Input } from "@mui/material";
// import ComoSolicitarImage from "../assets/ComoSolicitarTuCredito.png";

// const ComoSolicitarTuCredito = () => {
//   return (
//     <div className="flex flex-col lg:flex-row h-screen">
//       {/* Left Side with Image */}
//       <div className="w-full lg:w-1/2 relative">
//         <img
//           src={ComoSolicitarImage}
//           alt="Cómo solicitar tu crédito"
//           className="object-cover w-full h-full"
//         />
//         <div className="absolute bottom-10 left-10 text-white text-4xl font-bold">
//           Tu sueño al alcance de tus manos
//         </div>
//       </div>

//       {/* Right Side with Form */}
//       <div className="w-full lg:w-1/2 flex flex-col justify-center items-center p-6 bg-white">
//         <h2 className="text-primary text-2xl font-bold mb-4">¿Cómo solicitar tu crédito?</h2>
//         <p className="p text-center">
//           Para solicitar tu pre aprobación y registro, primero debemos comprobar tu estado crediticio.
//         </p>
//         <p className="p text-center mt-2">
//           Si tu situación te lo permite y quieres continuar adelante con el proceso, te recomendamos
//           tener a mano la documentación necesaria.
//         </p>

//         {/* DNI Input */}
//         <FormControl className="w-full max-w-md mt-6">
//           <InputLabel>DNI</InputLabel>
//           <Input
//             label="DNI"
//             placeholder="Ingresa tu dni"
//             variant="outlined"
//             helperText="Necesitamos tu DNI para tener acceso a la información."
//             inputProps={{ maxLength: 8 }}
//             className="input-field w-full"
//           />
//           <TextField
//             label="DNI"
//             placeholder="Ingresa tu dni"
//             variant="outlined"
//             helperText="Necesitamos tu DNI para tener acceso a la información."
//             inputProps={{ maxLength: 8 }}
//             className="input-field w-full"
//           />
//         </FormControl>

//         {/* Gender Select */}
//         <FormControl className="w-full max-w-md mt-4">
//           <InputLabel>Sexo</InputLabel>
//           <Select className="input-field">
//             <MenuItem value="Masculino">Masculino</MenuItem>
//             <MenuItem value="Femenino">Femenino</MenuItem>
//             <MenuItem value="Otro">Otro</MenuItem>
//           </Select>
//           <span className="text-sm text-gray-500 mt-1">
//             Selecciona el sexo que figura en tu DNI.
//           </span>
//         </FormControl>

//         {/* Submit Button */}
//         <Button
//           variant="contained"
//           color="primary"
//           className="btn-primary w-full max-w-md mt-6 bg-orange-500"
//         >
//           Consultar
//         </Button>
//       </div>
//     </div>
//   );
// };

// export default ComoSolicitarTuCredito;
