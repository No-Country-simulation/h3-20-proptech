import { Link } from "react-router-dom";
import happyFamily from "../assets/familia-feliz.png";
import { useContext, useEffect, useState } from "react";
import Context from "../context/Context";

const Login = () => {
  const { loginUser } = useContext(Context);

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
    if (field === "email") return !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
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

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      const result = await loginUser(email, password);
      console.log("Del envio:: ", result);
    } catch (error) {
      console.log("error", error);
    }
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
              Por favor, ingresá los datos que recibiste en el correo
              electrónico para que podamos iniciar el trámite de tu crédito. Si
              necesitas ayuda durante el proceso, no dudes en contactarnos.
            </p>
          </div>

          {/* Form */}
          <div className="w-[70%] mx-auto mt-7">
            <form onSubmit={onSubmit} className="flex flex-col gap-9">
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
                    Inserta un email válido
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
                    Inserte una contraseña válida.
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
              </div>
              <a
                className="text-sm text-l text-start -m-10 ml-3 mt-1 mb-1 text-info"
                href="#"
              >
                ¿Olvidó su contraseña?
              </a>
              <div className="flex flex-col gap-4 card-actions">
                <div className="flex justify-start gap-4 items-center">
                  <button type="submit" className="btn-primary w-full ">
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

          {/* End Form */}
        </div>
      </div>
    </>
  );
};

export default Login;
