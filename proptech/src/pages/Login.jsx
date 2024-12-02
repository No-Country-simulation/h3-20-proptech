import { Link } from "react-router-dom";
import LogoFinancia from "../assets/logo.png";
import { useEffect, useState } from "react";

const Login = () => {
  const [principal, setPrincipal] = useState("");
  const [annualRate, setAnnualRate] = useState("");
  const [term, setTerm] = useState("");

  const [errors, setErrors] = useState({
    principal: null,
    annualRate: null,
    term: null,
  }); // null: no validation yet, true: invalid, false: valid
  const [focus, setFocus] = useState({
    principal: false,
    annualRate: false,
    term: false,
  });

  useEffect(
    () => {
      // console.log("Updated principal:", principal, "Updated annualRate:", annualRate, "Updated term:", term);
    },
    [principal],
    [annualRate],
    [term]
  );

  const validateField = (field, value) => {
    if (field === "principal") return !/^\d+$/.test(value);
    if (field === "annualRate") return !/^\d+(\.\d+)?$/.test(value);
    if (field === "term") return !/^\d+$/.test(value);
    return false;
  };

  const handleInputChange = (field, value) => {
    // Update the state
    if (field === "principal") setPrincipal(value);
    if (field === "annualRate") setAnnualRate(value);
    if (field === "term") setTerm(value);

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
                      errors.principal === true
                        ? "text-text-messageError"
                        : errors.principal === false && focus.principal
                        ? "text-text-message"
                        : "hidden"
                    }`}
                  >
                    Capital a solicitar en pesos.
                  </p>
                  <input
                    type="text"
                    placeholder="Ingrese su email"
                    value={principal}
                    onChange={(e) =>
                      handleInputChange("principal", e.target.value)
                    }
                    onBlur={() => handleBlur("principal")}
                    onFocus={() => handleFocus("principal")}
                    className="input-field "
                  />
                </div>
                <div>
                  <label className="font-bold text-text-primary mb-2">
                    Contraseña
                  </label>
                  <p
                    className={`text-sm mt-1 ${
                      errors.principal === true
                        ? "text-text-messageError"
                        : errors.principal === false && focus.principal
                        ? "text-text-message"
                        : "hidden"
                    }`}
                  >
                    Capital a solicitar en pesos.
                  </p>
                  <input
                    type="text"
                    placeholder="Ingrese su password"
                    value={principal}
                    onChange={(e) =>
                      handleInputChange("principal", e.target.value)
                    }
                    onBlur={() => handleBlur("principal")}
                    onFocus={() => handleFocus("principal")}
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
