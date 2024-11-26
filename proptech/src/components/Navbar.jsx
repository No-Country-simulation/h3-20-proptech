import { Link } from "react-router-dom";
import logo from "../assets/LogoFinancia.png"; // Ensure correct logo path
import "./Navbar.css"; // Add a CSS file for custom styles

function Navbar() {
    return (
        <div className="drawer">
            <input id="my-drawer-3" type="checkbox" className="drawer-toggle" />
            <div className="drawer-content">
                {/* Navbar */}
                <div className="navbar bg-[#042C31] text-white">
                    {/* Logo */}
                    <div className="flex-1">
                        <img src={logo} alt="Logo" className="h-8" />
                    </div>

                    {/* Horizontal Menu */}
                    <div className="hidden lg:flex">
                        <ul className="nav-menu">
                            <li>
                                <Link to="/">Inicio</Link>
                            </li>
                            <li>
                                <Link to="/empresas">Empresas</Link>
                            </li>
                            <li>
                                <Link to="/quienes-somos">Quiénes Somos</Link>
                            </li>
                            <li className="dropdown">
                                <span className="dropdown-title">Calculadora</span>
                                <ul className="dropdown-menu">
                                    <li>
                                        <Link to="/calculator">Calculadora</Link>
                                    </li>
                                    <li>
                                        <Link to="/adelantoCapital">Calculadora 2</Link>
                                    </li>
                                    <li>
                                        <Link to="/cuil">CUIL</Link>
                                    </li>
                                    <li>
                                        <Link to="/deudas">Deudas</Link>
                                    </li>
                                </ul>
                            </li>
                        </ul>
                    </div>

                    {/* Buttons */}
                    <div className="flex space-x-2">
                        <Link
                            to="/login"
                            className="btn-primary"
                        >
                            Inicia sesión
                        </Link>
                        <Link
                            to="/register"
                            className="btn-secondary"
                        >
                            Register
                        </Link>
                    </div>

                    {/* Mobile menu button */}
                    <div className="lg:hidden">
                        <label
                            htmlFor="my-drawer-3"
                            className="btn-menu-toggle"
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                className="w-6 h-6"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M4 6h16M4 12h16M4 18h16"
                                />
                            </svg>
                        </label>
                    </div>
                </div>
            </div>

            {/* Drawer */}
            <div className="drawer-side">
                <label htmlFor="my-drawer-3" className="drawer-overlay"></label>
                <ul className="drawer-menu">
                    <li>
                        <Link to="/">Inicio</Link>
                    </li>
                    <li>
                        <Link to="/empresas">Empresas</Link>
                    </li>
                    <li>
                        <Link to="/quienes-somos">Quiénes Somos</Link>
                    </li>
                    <li>
                        <Link to="/calculator">Calculadora</Link>
                    </li>
                    <li>
                        <Link to="/adelantoCapital">Calculadora 2</Link>
                    </li>
                    <li>
                        <Link to="/cuil">CUIL</Link>
                    </li>
                    <li>
                        <Link to="/deudas">Deudas</Link>
                    </li>
                    <li>
                        <Link to="/login">Inicia sesión</Link>
                    </li>
                    <li>
                        <Link to="/register">Register</Link>
                    </li>
                </ul>
            </div>
        </div>
    );
}

export default Navbar;




//*************** Navbar version original ***************** */
// import { Link } from "react-router-dom";
// function Navbar() {
//     return (
//         <div className="drawer">
//             <input id="my-drawer-3" type="checkbox" className="drawer-toggle" />
//             <div className="drawer-content flex flex-col">
//                 {/* Navbar */}
//                 <div className="navbar bg-base-300 w-full">
//                     <div className="flex-none lg:hidden">
//                         <label
//                             htmlFor="my-drawer-3"
//                             aria-label="open sidebar"
//                             className="btn btn-square btn-ghost"
//                         >
//                             <svg
//                                 xmlns="http://www.w3.org/2000/svg"
//                                 fill="none"
//                                 viewBox="0 0 24 24"
//                                 className="inline-block h-6 w-6 stroke-current"
//                             >
//                                 <path
//                                     strokeLinecap="round"
//                                     strokeLinejoin="round"
//                                     strokeWidth="2"
//                                     d="M4 6h16M4 12h16M4 18h16"
//                                 ></path>
//                             </svg>
//                         </label>
//                     </div>
//                     <div className="mx-2 flex-1 px-2">Logo</div>
//                     <div className="hidden flex-none lg:block">
//                         <ul className="menu menu-horizontal">
//                             {/* Navbar menu content here */}
//                             {/* <li>
//                                     <Link to="/calculator">Calculadora</Link>
//                                 </li>
//                                 <li>
//                                     <Link to="/adelantoCapital">Calculadora 2</Link>
//                                 </li> */}

//                             {/* Dropdown for Calculadoras */}
//                             <li className="dropdown">
//                                 <div tabIndex={0} className="dropdown-toggle cursor-pointer">
//                                     Calculadoras
//                                 </div>
//                                 <ul tabIndex={0} className="dropdown-content menu p-2 shadow bg-base-100 rounded-box w-52">
//                                     <li>
//                                         <Link to="/calculator">Calculadora</Link>
//                                     </li>
//                                     <li>
//                                         <Link to="/adelantoCapital">Calculadora 2</Link>
//                                     </li>
//                                 </ul>
//                             </li>

//                             {/* Dropdown for Información */}
//                             <li className="dropdown">
//                                 <div tabIndex={0} className="dropdown-toggle cursor-pointer">
//                                     Información
//                                 </div>
//                                 <ul tabIndex={0} className="dropdown-content menu p-2 shadow bg-base-100 rounded-box w-52">
//                                     <li>
//                                         <Link to="/cuil">CUIL</Link>
//                                     </li>
//                                     <li>
//                                         <Link to="/deudas">Deudas</Link>
//                                     </li>
//                                 </ul>
//                             </li>

//                             <li>
//                                 <Link to="/login" className="mr-2">Login</Link>
//                             </li>

//                             <li>
//                                 <Link to="/register">Register</Link>
//                             </li>
//                         </ul>
//                     </div>
//                 </div>
//             </div>
//             <div className="drawer-side">
//                 <label
//                     htmlFor="my-drawer-3"
//                     aria-label="close sidebar"
//                     className="drawer-overlay"
//                 ></label>
//                 <ul className="menu bg-base-200 min-h-full w-80 p-4">
//                     {/* Sidebar content here */}
//                     <li>
//                         <Link to="/login" className="mr-2">
//                             Login
//                         </Link>
//                     </li>

//                     <li>
//                         <Link to="/register">Register</Link>
//                     </li>
//                 </ul>
//             </div>
//         </div>
//     );
// }

// export default Navbar;
