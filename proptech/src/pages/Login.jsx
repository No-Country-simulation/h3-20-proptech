import { Link } from "react-router-dom";
import LogoFinancia from "../assets/logo.png";
import { useEffect, useState } from "react";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [errors, setErrors] = useState({
    email: null,
    password: null,
  }); // null: no validation yet, true: invalid, false: valid
  const [focus, setFocus] = useState({
    email: false,
    password: false,
    term: false,
  });

  useEffect(
    () => {
      // console.log("Updated email:", email, "Updated password:", password);
    },
    [email],
    [password]
  );

  const validateField = (field, value) => {
    if (field === "email") return !/^\d+$/.test(value);
    if (field === "password") return !/^\d+(\.\d+)?$/.test(value);
    return false;
  };

  const handleInputChange = (field, value) => {
    // Update the state
    if (field === "email") setEmail(value);
    if (field === "password") setPassword(value);

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

  return (
    <>
      <div className="flex items-center justify-center h-screen bg-gray-100">
        <div className="card w-96 bg-white shadow-lg rounded-lg">
          <div className="card-body items-center text-center">
            <span className="card-title flex justify-center items-center">
              <img
                src={LogoFinancia}
                alt="Protech logo"
                className="lg:max-h-[20rem] text-[color:#042C31] lg:w-1/2"
              />
            </span>
            <p className="text-gray-500">
              Inicie sesión en su cuenta para aprovechar todas las
              funcionalidades de la plataforma.
            </p>

            <form onSubmit="" className="flex flex-col gap-9">
              <div className="flex flex-col gap-5 pb-3">
                <div>
                  <label className="font-bold text-text-primary mb-2">
                    Correo electrónico
                  </label>
                  <p
                    className={`text-sm mt-1 ${
                      errors.email === true
                        ? "text-text-messageError"
                        : errors.email === false && focus.email
                        ? "text-text-message"
                        : "hidden"
                    }`}
                  >
                    Capital a solicitar en pesos.
                  </p>
                  <input
                    type="text"
                    placeholder="Ingrese su email"
                    value={email}
                    onChange={(e) => handleInputChange("email", e.target.value)}
                    onBlur={() => handleBlur("email")}
                    onFocus={() => handleFocus("email")}
                    className="input-field "
                  />
                </div>
                <div>
                  <label className="font-bold text-text-primary mb-2">
                    Contraseña
                  </label>
                  <p
                    className={`text-sm mt-1 ${
                      errors.password === true
                        ? "text-text-messageError"
                        : errors.password === false && focus.password
                        ? "text-text-message"
                        : "hidden"
                    }`}
                  >
                    Capital a solicitar en pesos.
                  </p>
                  <input
                    type="text"
                    placeholder="Ingrese su password"
                    value={password}
                    onChange={(e) =>
                      handleInputChange("password", e.target.value)
                    }
                    onBlur={() => handleBlur("password")}
                    onFocus={() => handleFocus("password")}
                    className="input-field "
                  />
                </div>
              </div>
              <a
                className="text-sm text-l text-start -m-10 ml-3 mt-1 mb-1 text-info"
                href="#"
              >
                ¿Olvidó su contraseña?
              </a>
              <div className="flex flex-col gap-4 card-actions">
                <div className="flex justify-start gap-2 items-center">
                  <button type="submit" className="btn-primary w-full">
                    Iniciar sesión
                  </button>
                  <div className="text-sm text-center ml-4">
                    ¿Sin cuenta?{" "}
                    <Link className="text-sm mx-2 text-primary" to="/register">
                      Registrase
                    </Link>
                  </div>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
