import { Link } from "react-router-dom";
import logo from "../assets/logo-white.png";

function Navbar() {
  return (
    <div className="drawer">
      <input id="my-drawer-3" type="checkbox" className="drawer-toggle" />
      <div className="drawer-content flex flex-col">
        {/* Navbar */}
        <div className="navbar bg-base-700 w-full">
          <div className="flex-none lg:hidden">
            <label
              htmlFor="my-drawer-3"
              aria-label="open sidebar"
              className="btn btn-square btn-ghost"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                className="inline-block h-6 w-6 stroke-current"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16M4 18h16"
                ></path>
              </svg>
            </label>
          </div>
          <div className="mx-2 flex-1 px-2">
            <div className="flex-1">
              <Link to={"/"}>
                <img src={logo} alt="Logo" className="h-8 ml-9" />
              </Link>
            </div>
          </div>
          <nav className="p-4">
            <ul className="flex space-x-24">
              <li>
                <Link to="/" className="text-white hover:text-gray-300">
                  Inicio
                </Link>
              </li>
              <li>
                <Link
                  to="#servicios"
                  className="text-white hover:text-gray-300"
                >
                  Empresas
                </Link>
              </li>
              <li>
                <Link to="#nosotros" className="text-white hover:text-gray-300">
                  Quiénes somos
                </Link>
              </li>
              <li>
                <Link to="#contacto" className="text-white hover:text-gray-300">
                  Calculadora
                </Link>
              </li>
              <li>
                <Link to="/login" className="btn-primary">
                  Inicia sesión
                </Link>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </div>
  );
}

export default Navbar;
