// src/components/Navbar.jsx
import { useNavigate } from "react-router-dom";
import logo from "../assets/logo-white.png";
import { useEffect, useState } from "react";

function Navbar() {
  const [isAuth, setIsAuth] = useState(false);
  const rol = localStorage.getItem("rol");
  const navigate = useNavigate();

  useEffect(() => {
    const access = JSON.parse(localStorage.getItem("access"));
    if (access && typeof access === "string" && access.trim() !== "") {
      setIsAuth(true);
    } else {
      setIsAuth(false);
    }
  }, []);

  const handleNavigation = (path, hash) => {
    navigate(path); // Navigate to the desired route
    setTimeout(() => {
      const element = document.getElementById(hash);
      if (element) {
        element.scrollIntoView({ behavior: "smooth" }); // Smoothly scroll to the section
      }
    }, 100); // Delay to ensure the DOM is updated after navigation
  };

  const logoutUser = () => {
    localStorage.clear();
    window.location.href = "/";
  };

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
              <a href="/" className="text-white hover:text-gray-300">
                <img src={logo} alt="Logo" className="h-8 ml-9" />
              </a>
            </div>
          </div>
          <nav className="p-4">
            <ul className="flex space-x-24">
              <li>
                <button
                  onClick={() => handleNavigation("/", "startInfo")}
                  className="text-white hover:text-gray-300"
                >
                  Inicio
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNavigation("/", "company")}
                  className="text-white hover:text-gray-300"
                >
                  Empresas
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNavigation("/", "aboutUs")}
                  className="text-white hover:text-gray-300"
                >
                  Quiénes somos
                </button>
              </li>

              {isAuth && rol !== "U" && (
                <li className="dropdown">
                  <div tabIndex={0} className="dropdown-toggle cursor-pointer">
                    Calculadoras
                  </div>
                  <ul
                    tabIndex={0}
                    className="dropdown-content menu p-2 shadow bg-base-700 rounded-box w-52"
                  >
                    <li>
                      <button onClick={() => handleNavigation("/calculatorAdmin", "")}>ClientCalculator</button>
                    </li>
                    <li>
                      <button onClick={() => handleNavigation("/capitalizacionAdmin", "")}>CapitalizationCalculator</button>
                    </li>
                    <li>
                      <button onClick={() => handleNavigation("/dashboard", "")}>Panel de control</button>
                    </li>
                  </ul>
                </li>
              )}

              <li>
                {isAuth ? (
                  <button onClick={logoutUser} className="btn-primary">
                    Cerrar sesión
                  </button>
                ) : (
                  <button
                    onClick={() => handleNavigation("/login", "")}
                    className="btn-primary"
                  >
                    Inicia sesión
                  </button>
                )}
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </div>
  );
}

export default Navbar;



// import { Link } from "react-router-dom";
// import logo from "../assets/logo-white.png";
// import { useEffect, useState } from "react";

// function Navbar() {
//   const [isAuth, setIsAuth] = useState(false);
//   const rol = localStorage.getItem("rol");

//   useEffect(() => {
//     const access = JSON.parse(localStorage.getItem("access"));
//     if (access && typeof access === "string" && access.trim() !== "") {
//       setIsAuth(true);
//     } else {
//       setIsAuth(false);
//     }
//   }, []);

//   const logoutUser = () => {
//     localStorage.clear();
//     window.location.href = "/";
//   };
//   console.log(rol);
//   return (
//     <div className="drawer">
//       <input id="my-drawer-3" type="checkbox" className="drawer-toggle" />
//       <div className="drawer-content flex flex-col">
//         {/* Navbar */}
//         <div className="navbar bg-base-700 w-full">
//           <div className="flex-none lg:hidden">
//             <label
//               htmlFor="my-drawer-3"
//               aria-label="open sidebar"
//               className="btn btn-square btn-ghost"
//             >
//               <svg
//                 xmlns="http://www.w3.org/2000/svg"
//                 fill="none"
//                 viewBox="0 0 24 24"
//                 className="inline-block h-6 w-6 stroke-current"
//               >
//                 <path
//                   strokeLinecap="round"
//                   strokeLinejoin="round"
//                   strokeWidth="2"
//                   d="M4 6h16M4 12h16M4 18h16"
//                 ></path>
//               </svg>
//             </label>
//           </div>
//           <div className="mx-2 flex-1 px-2">
//             <div className="flex-1">
//               <a href="#home" className="text-white hover:text-gray-300">
//                 <img src={logo} alt="Logo" className="h-8 ml-9" />
//               </a>
//             </div>
//           </div>
//           <nav className="p-4">
//             <ul className="flex space-x-24">
//               {/* <li className="dropdown">
//                                 <div tabIndex={0} className="dropdown-toggle cursor-pointer">
//                                     pages
//                                 </div>
//                                 <ul
//                                     tabIndex={0}
//                                     className="dropdown-content menu p-2 shadow bg-base-700 rounded-box w-52"
//                                 >
//                                     <li>
//                                         <Link to="/contacto">Contacto</Link>
//                                     </li>
//                                     <li>
//                                         <Link to="/calculator">ClientCalculator</Link>
//                                     </li>
//                                     <li>
//                                         <Link to="/adelantoCapital">
//                                             EnhancedMortgageCalculator
//                                         </Link>
//                                     </li>
//                                     <li>
//                                         <Link to="/pagosCalculator">
//                                             PaymentAdminMortgageCalculator
//                                         </Link>
//                                     </li>
//                                     <li>
//                                         <Link to="/inversion">InvestorReturnCalculator</Link>
//                                     </li>
//                                     <li>
//                                         <Link to="/cuil">Cuil</Link>
//                                     </li>
//                                     <li>
//                                         <Link to="/cuil2">Cuil2</Link>
//                                     </li>
//                                     <li>
//                                         <Link to="/deudas">DeudasTable</Link>
//                                     </li>
//                                     <li>
//                                         <Link to="/login">Login</Link>
//                                     </li>
//                                     <li>
//                                         <Link to="/register">Register</Link>
//                                     </li>
//                                     <li>
//                                         <Link to="/solicitar">ComoSolicitarTuCredito</Link>
//                                     </li>
//                                     <li>
//                                         <Link to="/tieneDeudas">TieneDeudas</Link>
//                                     </li>
//                                     <li>
//                                         <Link to="/controlpanel">ControlPanel</Link>
//                                     </li>
//                                     <li>
//                                         <Link to="/preaprobacion">Preaprobacion</Link>
//                                     </li>
//                                     <li>
//                                         <Link to="/preaprobacionDatosPersonales">
//                                             PreaprobacionDatosPersonales
//                                         </Link>
//                                     </li>
//                                     <li>
//                                         <Link to="/preaprobacionDatosServicios">
//                                             PreaprobacionDatosServicios
//                                         </Link>
//                                     </li>
//                                     <li>
//                                         <Link to="/preaprobacionGarante">PreaprobacionGarante</Link>
//                                     </li>
//                                     <li>
//                                         <Link to="/preaprobacionGaranteDatos">
//                                             PreaprobacionGaranteDatos
//                                         </Link>
//                                     </li>
//                                     <li>
//                                         <Link to="/preaprobacionGaranteServicios">
//                                             PreaprobacionGaranteServicios
//                                         </Link>
//                                     </li>
//                                     <li>
//                                         <Link to="/preaprobacionFin">PreaprobacionFin</Link>
//                                     </li>
//                                     <li>
//                                         <Link to="/">home</Link>
//                                     </li>
//                                 </ul>
//                             </li> */}
//               <li id="home">
//                 <a href="#startInfo" className="text-white hover:text-gray-300">
//                   Inicio
//                 </a>
//               </li>

//               <li>
//                 <a href="#company" className="text-white hover:text-gray-300">
//                   Empresas
//                 </a>
//               </li>
//               <li>
//                 <a href="#aboutUs" className="text-white hover:text-gray-300">
//                   Quiénes somos
//                 </a>
//               </li>

//               {/* {rol === "A" && ( */}
//               {isAuth && (rol != "U") && (
//                 <li className="dropdown">
//                   <div tabIndex={0} className="dropdown-toggle cursor-pointer">
//                     Calculadoras
//                   </div>
//                   <ul
//                     tabIndex={0}
//                     className="dropdown-content menu p-2 shadow bg-base-700 rounded-box w-52"
//                   >
//                     <li>
//                       <Link to="/calculatorAdmin">ClientCalculator</Link>
//                     </li>
//                     <li>
//                       <Link to="/capitalizacionAdmin">
//                         CapitalizationCalculator
//                       </Link>
//                     </li>
//                     <li>
//                       <Link to="/dashboard">Panel de control</Link>
//                     </li>
//                   </ul>
//                 </li>
//               )}

//               <li>
//                 {isAuth ? (
//                   <button onClick={logoutUser} className="btn-primary">
//                     Cerrar sesión
//                   </button>
//                 ) : (
//                   <Link to="/login" className="btn-primary">
//                     Inicia sesión
//                   </Link>
//                 )}
//               </li>
//             </ul>
//           </nav>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default Navbar;
