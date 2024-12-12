import { Link } from "react-router-dom";
import happyFamily from "../assets/familia-feliz.png";
import { useContext, useEffect, useState } from "react";
import Context from "../context/Context";
import { PiEye, PiEyeSlash } from "react-icons/pi";
import { NotificationService } from "../shared/notistack.service";

const RegisterUserAdmin = () => {
    const { registerUserAdmin } = useContext(Context);

    const [email, setEmail] = useState("");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    //const [validated, setValidated] = useState(false);
    //const [isActive, setIsActive] = useState(false);
    const [showPassword, setShowPassword] = useState(false); // State for toggling password visibility


    const [errors, setErrors] = useState({
        email: null,
        password: null,
        username: null,
        //validated: null,
        //isActive: null,
    }); // null: no validation yet, true: invalid, false: valid
    const [focus, setFocus] = useState({
        email: false,
        password: false,
        username: false,
        //validated: false,
        //isActive: false,
    });

    useEffect(
        () => {
            // console.log("Updated email:", email, "Updated password:", password);
        },
        [email],
        [password],
        [username]
        //[validated],
        //[isActive]
    );

    const validateField = (field, value) => {
        if (field === "email") return !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
        if (field === "password")
            return !/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[A-Za-z\d@$!%*?&]{8,}$/.test(
                value
            );
        if (field === "username")
            return !/^[a-zA-Z][a-zA-Z0-9 ._]{2,19}(?<![.\s])$/.test(value);
            // return !/^[a-zA-Z][a-zA-Z0-9._]{2,19}(?<!\.)$/.test(value);
        //if (field === "validated") return !/^\d+(\.\d+)?$/.test(value);
        //if (field === "isActive") return !/^\d+(\.\d+)?$/.test(value);
        return false;
    };

    const handleInputChange = (field, value) => {
        // Update the state
        if (field === "email") setEmail(value);
        if (field === "password") setPassword(value);
        if (field === "username") setUsername(value);
        // if (field === "validated") setPassword(value);
        // if (field === "isActive") setPassword(value);

        // Validate the field
        const isValid = !validateField(field, value);
        setErrors((prevErrors) => ({
            ...prevErrors,
            [field]: !value ? true : !isValid,
        }));
    };

    const handleFocus = (field) => {
        setFocus((prevFocus) => ({ ...prevFocus, [field]: true }));
    };

    const handleBlur = (field) => {
        setFocus((prevFocus) => ({ ...prevFocus, [field]: false }));
    };

    //password visibility
    const togglePasswordVisibility = () => {
        setShowPassword((prev) => !prev);
    };

    const onSubmit = async (e) => {
        e.preventDefault();
        const data = {
            username: username,
            email: email,
            password: password,
        };
        try {
            const result = await registerUserAdmin(data);
            NotificationService.success("Datos cargados exitosamente",3000);
        } catch (error) {
            NotificationService.error("Error en la carga de datos.",3000);
        }
    };

    return (
        <div className="grid grid-cols-2 h-screen">
            {/* <div className="col-span-5 content-center"> */}

            {/* Form */}
            <div className="w-[70%] mx-auto mt-2">
                <form onSubmit={onSubmit} className="flex flex-col gap-2">
                    <div className="flex flex-col gap-5 pb-3">
                        <div>
                            <label className="font-bold text-text-primary mb-2">
                                Email
                            </label>
                            <p
                                className={`text-sm mt-1 ${errors.email === true
                                        ? "text-text-messageError"
                                        : errors.email === false && focus.email
                                            ? "text-text-message"
                                            : "hidden"
                                    }`}
                            >
                                El email es {errors.email === true? "incorrecto." : "correcto."}
                            </p>
                            <input
                                type="text"
                                placeholder="jonathan@gmail.com"
                                value={email}
                                onChange={(e) => handleInputChange("email", e.target.value)}
                                onBlur={() => handleBlur("email")}
                                onFocus={() => handleFocus("email")}
                                className="input-field "
                            />
                        </div>

                        <div>
                            <label className="font-bold text-text-primary mb-2">
                                Nombre de usuario
                            </label>
                            <p
                                className={`text-sm mt-1 ${errors.username === true
                                        ? "text-text-messageError"
                                        : errors.username === false && focus.username
                                            ? "text-text-message"
                                            : "hidden"
                                    }`}
                            >
                                El nombre del usuario es {errors.username === true? "incorrecto." : "correcto."}
                            </p>
                            <input
                                type="text"
                                placeholder="jonathan"
                                value={username}
                                onChange={(e) =>
                                    handleInputChange("username", e.target.value)
                                }
                                onBlur={() => handleBlur("username")}
                                onFocus={() => handleFocus("username")}
                                className="input-field "
                            />
                        </div>

                        <div>
                            <label className="font-bold text-text-primary mb-2">
                                Password
                            </label>
                            <p
                                className={`text-sm mt-1 ${errors.password === true
                                        ? "text-text-messageError"
                                        : errors.password === false && focus.password
                                            ? "text-text-message"
                                            : "hidden"
                                    }`}
                            >
                                La contraseña es {errors.password === true? "incorrecta." : "correcta."}
                            </p>
                            <div className="relative">
                                <input
                                    type={showPassword ? "text" : "password"}
                                    placeholder="********"
                                    value={password}
                                    onChange={(e) =>
                                        handleInputChange("password", e.target.value)
                                    }
                                    onBlur={() => handleBlur("password")}
                                    onFocus={() => handleFocus("password")}
                                    className="input-field "
                                />
                                <span
                                    onClick={togglePasswordVisibility}
                                    className="absolute right-3 top-3 cursor-pointer"
                                >
                                    {showPassword ? <PiEyeSlash size={24}/> : <PiEye size={24}/>}
                                </span>
                            </div>
                        </div>

                    </div>

                    <div className="gap-4 items-center">

                        <div className="col-span-6">
                            <button type="submit" className="btn-primary w-full ">
                                Registrar nuevo Usuario
                            </button>
                        </div>

                    </div>
                </form>
            </div>
            {/* End Form */}
        </div>

    );
};

export default RegisterUserAdmin;

// ************* version 1 ok no eye ********//
// import { Link } from "react-router-dom";
// import happyFamily from "../assets/familia-feliz.png";
// import { useContext, useEffect, useState } from "react";
// import Context from "../context/Context";

// const RegisterUser = () => {
//   const { registerUser } = useContext(Context);

//   const [email, setEmail] = useState("");
//   const [username, setUsername] = useState("");
//   const [password, setPassword] = useState("");
//   //const [validated, setValidated] = useState(false);
//   //const [isActive, setIsActive] = useState(false);

//   const [errors, setErrors] = useState({
//     email: null,
//     password: null,
//     username: null,
//     //validated: null,
//     //isActive: null,
//   }); // null: no validation yet, true: invalid, false: valid
//   const [focus, setFocus] = useState({
//     email: false,
//     password: false,
//     username: false,
//     //validated: false,
//     //isActive: false,
//   });

//   useEffect(
//     () => {
//       // console.log("Updated email:", email, "Updated password:", password);
//     },
//     [email],
//     [password],
//     [username]
//     //[validated],
//     //[isActive]
//   );

//   const validateField = (field, value) => {
//     if (field === "email") return !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
//     if (field === "password")
//       return !/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[A-Za-z\d@$!%*?&]{8,}$/.test(
//         value
//       );
//     if (field === "username")
//       return !/^[a-zA-Z][a-zA-Z0-9._]{2,19}(?<!\.)$/.test(value);
//     //if (field === "validated") return !/^\d+(\.\d+)?$/.test(value);
//     //if (field === "isActive") return !/^\d+(\.\d+)?$/.test(value);
//     return false;
//   };

//   const handleInputChange = (field, value) => {
//     // Update the state
//     if (field === "email") setEmail(value);
//     if (field === "password") setPassword(value);
//     if (field === "username") setUsername(value);
//     // if (field === "validated") setPassword(value);
//     // if (field === "isActive") setPassword(value);

//     // Validate the field
//     const isValid = !validateField(field, value);
//     setErrors((prevErrors) => ({
//       ...prevErrors,
//       [field]: !value ? true : !isValid,
//     }));
//   };

//   const handleFocus = (field) => {
//     setFocus((prevFocus) => ({ ...prevFocus, [field]: true }));
//   };

//   const handleBlur = (field) => {
//     setFocus((prevFocus) => ({ ...prevFocus, [field]: false }));
//   };

//   const onSubmit = async (e) => {
//     e.preventDefault();
//     const data = {
//       username: username,
//       email: email,
//       password: password,
//     };
//     console.log("DATA:::", data);
//     try {
//       const result = await registerUser(data);
//       console.log("Del envio:: ", result);
//     } catch (error) {
//       console.log("error", error);
//     }
//   };

//   return (
//       <div className="grid grid-cols-2 h-screen">
//         {/* <div className="col-span-5 content-center"> */}

//           {/* Form */}
//           <div className="w-[70%] mx-auto mt-2">
//             <form onSubmit={onSubmit} className="flex flex-col gap-2">
//               <div className="flex flex-col gap-5 pb-3">
//                 <div>
//                   <label className="font-bold text-text-primary mb-2">
//                     Email
//                   </label>
//                   <p
//                     className={`text-sm mt-1 ${
//                       errors.email === true
//                         ? "text-text-messageError"
//                         : errors.email === false && focus.email
//                         ? "text-text-message"
//                         : "hidden"
//                     }`}
//                   >
//                     El email es incorrecto.
//                   </p>
//                   <input
//                     type="text"
//                     placeholder="jonathan@gmail.com"
//                     value={email}
//                     onChange={(e) => handleInputChange("email", e.target.value)}
//                     onBlur={() => handleBlur("email")}
//                     onFocus={() => handleFocus("email")}
//                     className="input-field "
//                   />
//                 </div>

//                 <div>
//                   <label className="font-bold text-text-primary mb-2">
//                     Nombre de usuario
//                   </label>
//                   <p
//                     className={`text-sm mt-1 ${
//                       errors.username === true
//                         ? "text-text-messageError"
//                         : errors.username === false && focus.username
//                         ? "text-text-message"
//                         : "hidden"
//                     }`}
//                   >
//                     El nombre del usuario es incorrecto.
//                   </p>
//                   <input
//                     type="text"
//                     placeholder="jonathan"
//                     value={username}
//                     onChange={(e) =>
//                       handleInputChange("username", e.target.value)
//                     }
//                     onBlur={() => handleBlur("username")}
//                     onFocus={() => handleFocus("username")}
//                     className="input-field "
//                   />
//                 </div>

//                 <div>
//                   <label className="font-bold text-text-primary mb-2">
//                     Password
//                   </label>
//                   <p
//                     className={`text-sm mt-1 ${
//                       errors.password === true
//                         ? "text-text-messageError"
//                         : errors.password === false && focus.password
//                         ? "text-text-message"
//                         : "hidden"
//                     }`}
//                   >
//                     La contraseña es incorrecta.
//                   </p>
//                   <input
//                     type="password"
//                     placeholder="********"
//                     value={password}
//                     onChange={(e) =>
//                       handleInputChange("password", e.target.value)
//                     }
//                     onBlur={() => handleBlur("password")}
//                     onFocus={() => handleFocus("password")}
//                     className="input-field "
//                   />
//                 </div>

//               </div>

//               <div className="gap-4 items-center">

//                   <div className="col-span-6">
//                     <button type="submit" className="btn-primary w-full ">
//                       Registrar
//                     </button>
//                   </div>

//               </div>
//             </form>
//           </div>
//           {/* End Form */}
//         </div>

//   );
// };

// export default RegisterUser;