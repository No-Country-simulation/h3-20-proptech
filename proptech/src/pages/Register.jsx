import { Link } from "react-router-dom";
import LogoFinancia from "../assets/logo.png";
import { useEffect, useState } from "react";

const Register = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [re_password, setRe_Password] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phone, setPhone] = useState("");

  const [errors, setErrors] = useState({
    email: null,
    password: null,
    re_password: null,
    firstName: null,
    lastName: null,
    phone: null,
  }); // null: no validation yet, true: invalid, false: valid
  const [focus, setFocus] = useState({
    email: false,
    password: false,
    re_password: false,
    firstName: false,
    lastName: false,
    phone: false,
  });

  useEffect(
    () => {
      // console.log("Updated email:", email, "Updated password:", password);
    },
    [email],
    [password],
    [re_password],
    [firstName],
    [lastName],
    [phone]
  );

  const validateField = (field, value) => {
    if (field === "email") return !/^\d+$/.test(value);
    if (field === "password") return !/^\d+(\.\d+)?$/.test(value);
    if (field === "re_password") return !/^\d+(\.\d+)?$/.test(value);
    if (field === "firstName") return !/^\d+(\.\d+)?$/.test(value);
    if (field === "lastName") return !/^\d+(\.\d+)?$/.test(value);
    if (field === "phone") return !/^\d+(\.\d+)?$/.test(value);
    return false;
  };

  const handleInputChange = (field, value) => {
    // Update the state
    if (field === "email") setEmail(value);
    if (field === "password") setPassword(value);
    if (field === "re_password") setRe_Password(value);
    if (field === "firstName") setFirstName(value);
    if (field === "lastName") setLastName(value);
    if (field === "phone") setPhone(value);

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
        <div className="card w-120 bg-white shadow-lg rounded-lg">
          <div className="card-body items-center text-center">
            <span className="card-title flex justify-center items-center">
              <img
                src={LogoFinancia}
                alt="Protech logo"
                className="lg:max-h-[40rem] lg:w-1/2"
              />
            </span>
            <p className="text-gray-500">
              Registrese en nuestra plataforma y aprovecha todas las
              funcionalidades de la plataforma.
            </p>

            <form onSubmit="" className="flex flex-col gap-9 mt-6">
              <div className="grid grid-cols-2 gap-6 items-center">
                {/* Column 1 */}
                <div className="flex flex-col items-center text-center">
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
                      onChange={(e) =>
                        handleInputChange("email", e.target.value)
                      }
                      onBlur={() => handleBlur("email")}
                      onFocus={() => handleFocus("email")}
                      className="input-field "
                    />
                  </div>

                  <div>
                    <label className="font-bold text-text-primary mb-2">
                      Primer nombre
                    </label>
                    <p
                      className={`text-sm mt-1 ${
                        errors.firstName === true
                          ? "text-text-messageError"
                          : errors.firstName === false && focus.firstName
                          ? "text-text-message"
                          : "hidden"
                      }`}
                    >
                      Capital a solicitar en pesos.
                    </p>
                    <input
                      type="text"
                      placeholder="Ingrese su nombre"
                      value={firstName}
                      onChange={(e) =>
                        handleInputChange("firstName", e.target.value)
                      }
                      onBlur={() => handleBlur("firstName")}
                      onFocus={() => handleFocus("firstName")}
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
                          : errors.password === false && focus.email
                          ? "text-text-message"
                          : "hidden"
                      }`}
                    >
                      Capital a solicitar en pesos.
                    </p>
                    <input
                      type="password"
                      placeholder="Ingrese su contraseña"
                      value={email}
                      onChange={(e) =>
                        handleInputChange("password", e.target.value)
                      }
                      onBlur={() => handleBlur("password")}
                      onFocus={() => handleFocus("password")}
                      className="input-field "
                    />
                  </div>
                </div>
                {/* End column 1 */}

                {/* Column 2 */}
                <div className="flex flex-col items-center text-center">
                  <div>
                    <label className="font-bold text-text-primary mb-2">
                      Contacto{" "}
                    </label>
                    <p
                      className={`text-sm mt-1 ${
                        errors.phone === true
                          ? "text-text-messageError"
                          : errors.phone === false && focus.phone
                          ? "text-text-message"
                          : "hidden"
                      }`}
                    >
                      Capital a solicitar en pesos.
                    </p>
                    <input
                      type="tel"
                      placeholder="Ingrese su contacto"
                      value={phone}
                      onChange={(e) =>
                        handleInputChange("phone", e.target.value)
                      }
                      onBlur={() => handleBlur("phone")}
                      onFocus={() => handleFocus("phone")}
                      className="input-field "
                    />
                  </div>
                  <div>
                    <label className="font-bold text-text-primary mb-2">
                      Apellidos
                    </label>
                    <p
                      className={`text-sm mt-1 ${
                        errors.lastName === true
                          ? "text-text-messageError"
                          : errors.lastName === false && focus.lastName
                          ? "text-text-message"
                          : "hidden"
                      }`}
                    >
                      Capital a solicitar en pesos.
                    </p>
                    <input
                      type="text"
                      placeholder="Ingrese sus apellidos"
                      value={lastName}
                      onChange={(e) =>
                        handleInputChange("lastName", e.target.value)
                      }
                      onBlur={() => handleBlur("lastName")}
                      onFocus={() => handleFocus("lastName")}
                      className="input-field "
                    />
                  </div>
                  <div>
                    <label className="font-bold text-text-primary mb-2">
                      Repetir contraseña
                    </label>
                    <p
                      className={`text-sm mt-1 ${
                        errors.re_password === true
                          ? "text-text-messageError"
                          : errors.re_password === false && focus.re_password
                          ? "text-text-message"
                          : "hidden"
                      }`}
                    >
                      Capital a solicitar en pesos.
                    </p>
                    <input
                      type="password"
                      placeholder="Vuelva a ingresar su contraseña"
                      value={re_password}
                      onChange={(e) =>
                        handleInputChange("re_password", e.target.value)
                      }
                      onBlur={() => handleBlur("re_password")}
                      onFocus={() => handleFocus("re_password")}
                      className="input-field "
                    />
                  </div>
                </div>
                {/* End column 2 */}
              </div>

              <div className="flex flex-col gap-4 card-actions">
                <div className="form-control">
                  <label className="label cursor-pointer">
                    <span className="label-text">Estoy de acuerdo</span>
                    <input
                      type="checkbox"
                      defaultChecked
                      className="checkbox checkbox-primary ml-4"
                    />
                  </label>
                </div>
                <div className="flex justify-start gap-2 items-center">
                  <button type="submit" className="btn-primary w-full">
                    Registrar
                  </button>
                  <div className="text-sm text-center mt-1 ml-4">
                    ¿Ya tienes una cuenta?{" "}
                    <Link className="text-sm mx-2 text-primary" to="/login">
                      Login
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

export default Register;
