import { Link } from "react-router-dom"
import logo from "../assets/LogoFinancia.png";

function UserNavbar(){
    return (
        <div className="drawer">
            <input id="my-drawer-3" type="checkbox" className="drawer-toggle" />
            <div className="drawer-content flex flex-col">
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
                            <img src={logo} alt="Logo" className="h-8" />
                        </div>
                    </div>
                    <div className="hidden flex-none lg:block">
                        <ul className="menu menu-horizontal">
                            
                            <li className="dropdown">
                                <Link>Inicio</Link>
                            </li>

                            <li className="dropdown">
                                <Link>Panel de control</Link>
                            </li>

                            <li className="dropdown">
                                <Link>Perfil</Link>
                            </li>

                            <li>
                                <button className="btn-primary">
                                <Link to="/login" className="mr-2">Cerrar sesión</Link>
                                </button>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>


            
            <div className="drawer-side text-text-white">
                <label
                    htmlFor="my-drawer-3"
                    aria-label="close sidebar"
                    className="drawer-overlay"
                ></label>
                <ul className="menu bg-base-700 min-h-full w-80 p-4">
                    {/* Sidebar content here */}
                    <li>
                        <Link to="/login" className="mr-2">
                            Login
                        </Link>
                    </li>

                    <li>
                        <Link to="/register">Register</Link>
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
                </ul>
            </div>
        </div>
    )
}
export default UserNavbar