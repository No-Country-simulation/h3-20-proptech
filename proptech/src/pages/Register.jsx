import { Link } from "react-router-dom";
import happyFamily from "../assets/familia-feliz.png";
import { useEffect, useState } from "react";

const Register = () => {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [validated, setValidated] = useState(false);
  const [isActive, setIsActive] = useState(false);

  const [errors, setErrors] = useState({
    email: null,
    password: null,
    name: null,
    validated: null,
    isActive: null,
  }); // null: no validation yet, true: invalid, false: valid
  const [focus, setFocus] = useState({
    email: false,
    password: false,
    name: false,
    validated: false,
    isActive: false,
  });

  useEffect(
    () => {
      // console.log("Updated email:", email, "Updated password:", password);
    },
    [email],
    [password],
    [name],
    [validated],
    [isActive]
  );

  const validateField = (field, value) => {
    if (field === "email") return !/^\d+$/.test(value);
    if (field === "password") return !/^\d+(\.\d+)?$/.test(value);
    if (field === "name") return !/^\d+(\.\d+)?$/.test(value);
    if (field === "validated") return !/^\d+(\.\d+)?$/.test(value);
    if (field === "isActive") return !/^\d+(\.\d+)?$/.test(value);
    return false;
  };

  const handleInputChange = (field, value) => {
    // Update the state
    if (field === "email") setEmail(value);
    if (field === "password") setPassword(value);
    if (field === "name") setPassword(value);
    if (field === "validated") setPassword(value);
    if (field === "isActive") setPassword(value);

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
      <div className="grid grid-cols-12 h-screen">
        <div className="col-span-7 relative">
          <img
            src={happyFamily}
            alt="Descripción de la imagen"
            className="w-screen h-screen object-cover rounded-br-[50px]"
          />
          <div className="absolute bottom-16 ml-[15%] ">
            <p className="text-white text-5xl font-bold">
              El futuro que
              <br /> deseas está a tu <br />
              alcance.
            </p>
          </div>
        </div>
        <div className="col-span-5 content-center">
          <p className="text-2xl font-bold text-center">
            Tu futuro comienza ahora{" "}
          </p>
          <div className="w-[60%] mt-5 mx-auto">
            <p className="text-center">
              Por favor, completá tus datos para crear tu cuenta. Si necesitas
              ayuda durante el proceso, no dudes en contactarnos.
            </p>
          </div>

          {/* Form */}
          <div className="w-[70%] mx-auto mt-7">
            <form onSubmit="" className="flex flex-col gap-9">
              <div className="flex flex-col gap-5 pb-3">
                <div>
                  <label className="font-bold text-text-primary mb-2">
                    Email
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
                    Nombre
                  </label>
                  <p
                    className={`text-sm mt-1 ${
                      errors.name === true
                        ? "text-text-messageError"
                        : errors.name === false && focus.name
                        ? "text-text-message"
                        : "hidden"
                    }`}
                  >
                    Capital a solicitar en pesos.
                  </p>
                  <input
                    type="text"
                    placeholder="jonathan"
                    value={name}
                    onChange={(e) => handleInputChange("name", e.target.value)}
                    onBlur={() => handleBlur("name")}
                    onFocus={() => handleFocus("name")}
                    className="input-field "
                  />
                </div>

                <div>
                  <label className="font-bold text-text-primary mb-2">
                    Password
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
                    type="password"
                    placeholder="********"
                    value={password}
                    onChange={(e) =>
                      handleInputChange("password", e.target.value)
                    }
                    onBlur={() => handleBlur("password")}
                    onFocus={() => handleFocus("password")}
                    className="input-field "
                  />
                </div>
                <div className="grid grid-cols-12">
                  <div className="col-span-6">
                    <label className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        className="checkbox-custom"
                        value={isActive}
                        checked={isActive}
                        onChange={(e) => setIsActive(e.target.value)}
                      />
                      <span>Activo</span>
                    </label>
                  </div>
                  <div className="col-span-6">
                    <label className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        className="checkbox-custom"
                        value={validated}
                        checked={validated}
                        onChange={(e) => setValidated(e.target.value)}
                      />
                      <span>Validado</span>
                    </label>
                  </div>
                </div>
              </div>

              <div className="gap-4 items-center">
                <div className="grid grid-cols-12">
                  <div className="col-span-6">
                    <button type="submit" className="btn-primary w-full ">
                      Registrar
                    </button>
                  </div>
                  <div className="col-span-6">
                    <div className="text-sm text-center ml-4 mx-auto">
                      <Link className="text-sm mx-2 text-primary" to="/login">
                        Login
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </form>
          </div>
          {/* End Form */}
        </div>
      </div>
    </>
  );
};

export default Register;
