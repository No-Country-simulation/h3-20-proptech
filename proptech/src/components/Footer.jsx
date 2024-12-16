import FacebookIcon from "@mui/icons-material/Facebook";
import InstagramIcon from "@mui/icons-material/Instagram";
import YouTubeIcon from "@mui/icons-material/YouTube";
import XIcon from "@mui/icons-material/X";
import logo from "../assets/logo-white.png";
import { useState, useEffect } from "react";

const Footer = () => {
  const [email, setEmail] = useState("");
  const [topic, setTopic] = useState("");
  const [message, setMessage] = useState("");

  const [errors, setErrors] = useState({
    email: null,
    topic: null,
    message: null,
  });

  const [focus, setFocus] = useState({
    email: false,
    topic: null,
    message: null,
  });

  useEffect(() => {}, [email], [topic], [message]);

  const validateField = (field, value) => {
    if (field === "email") return !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
    if (field === "topic")
      return !/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[A-Za-z\d@$!%*?&]{8,}$/.test(
        value
      );
    if (field === "message") return value.trim().length < 10;
    return false;
  };

  const handleInputChange = (field, value) => {
    // Update the state
    if (field === "email") setEmail(value);
    if (field === "topic") setTopic(value);
    if (field === "message") setMessage(value);

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

  const onSubmit = (e) => {
    e.preventDefault();
    const data = {
      username: email,
      topic: topic,
      message: message,
    };
    try {
      console.log("DATA::::", data);
    } catch (error) {
      console.log("error", error);
    }
  };

  return (
    <footer className="footer bg-background-footer text-center py-4">
      <aside className="ml-16">
        <a href="#home">
          <img src={logo} alt="Logo" className="h-8 ml-3" />
        </a>
        <div className="flex ml-3 mt-2">
          <InstagramIcon fontSize="large" />
          <XIcon fontSize="large" className="mr-2" />
          <YouTubeIcon fontSize="large" className="mr-2" />
          <FacebookIcon fontSize="large" className="mr-2" />
        </div>
      </aside>
      <nav>
        <h6 className="footer-title">Nosotros</h6>
        <a className="link link-hover" href="#nosotros">
          Sobre nosotros
        </a>
        <a className="link link-hover">Blog</a>
        <a
          className="link link-hover"
          onClick={() => document.getElementById("my_modal_3").showModal()}
        >
          Contactenos
        </a>
      </nav>
      <nav>
        <h6 className="footer-title">Soporte</h6>
        <a className="link link-hover">Centro de contacto</a>
        <a className="link link-hover">Terminos y condiciones</a>
        <a className="link link-hover">Legales</a>
      </nav>
      <nav>
        <h6 className="footer-title">Estate informado</h6>
        <a className="link link-hover">Input para enviar correo</a>
      </nav>

      {/* Modal Contact */}
      <dialog id="my_modal_3" className="modal modal-bottom sm:modal-middle">
        <div className="modal-custom-auto text-text-primary">
          <form method="dialog">
            {/* if there is a button in form, it will close the modal */}
            <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
              ✕
            </button>
          </form>
          <h3 className="font-bold text-lg">Contactar</h3>
          <div className="py-4">
            <div className="w-[70%] mx-auto mt-2">
              <form onSubmit={onSubmit} className="flex flex-col gap-9">
                <div className="flex flex-col gap-5">
                  <div>
                    <div className="">
                      <label className="label">Email</label>
                    </div>
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
                      onChange={(e) =>
                        handleInputChange("email", e.target.value)
                      }
                      onBlur={() => handleBlur("email")}
                      onFocus={() => handleFocus("email")}
                      className="input-field"
                    />
                  </div>

                  <div>
                    <div className="">
                      <label className="label">Tema</label>
                    </div>

                    <p
                      className={`text-sm mt-1 ${
                        errors.topic === true
                          ? "text-text-messageError"
                          : errors.topic === false && focus.topic
                          ? "text-text-message"
                          : "hidden"
                      }`}
                    >
                      Inserta un tema válido
                    </p>
                    <input
                      type="text"
                      placeholder="Quiero contratar vuestros servicios"
                      value={topic}
                      onChange={(e) =>
                        handleInputChange("topic", e.target.value)
                      }
                      onBlur={() => handleBlur("topic")}
                      onFocus={() => handleFocus("topic")}
                      className="input-field"
                    />
                  </div>
                  <div>
                    <label className="form-control">
                      <div className="">
                        <label className="label">
                          Message
                        </label>
                      </div>
                      <textarea
                        rows="4"
                        cols="50"
                        maxLength="500"
                        onChange={(e) =>
                          handleInputChange("topic", e.target.value)
                        }
                        className="textarea textarea-bordered h-24 input-field text-white"
                        placeholder="Escriba aqui su mensage..."
                      ></textarea>
                    </label>
                  </div>
                </div>
                <div className="flex flex-col gap-4 card-actions">
                  <button type="submit" className="btn-primary w-full ">
                    Enviar
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </dialog>
      {/* End Modal Contact */}
    </footer>
  );
};

export default Footer;
