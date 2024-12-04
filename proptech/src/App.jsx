// import { Routes, Route } from "react-router-dom"
import { BrowserRouter as Router, Navigate, Route, Routes } from "react-router-dom";

import Home from "./pages/Home"
import Contacto from "./pages/Contacto"
import ClientCalculator from "./components/ClientCalculator"
import EnhancedMortgageCalculator from "./components/EnhancedMortgageCalculator"
import PaymentAdminMortgageCalculator from "./components/PaymentAdminMortgageCalculator"
import Cuil from "./components/Cuil"
import Cuil2 from "./components/Cuil2"
import Login from "./pages/Login";
import Register from "./pages/Register";
import ErrorPage from "./pages/ErrorPage"
import DeudasTable from "./components/DeudasTable"
import InvestorReturnCalculator from "./components/InvestorReturnCalculator"
import ComoSolicitarTuCredito from "./components/ComoSolicitarTuCredito"
import TieneDeudas from "./components/TieneDeudas"
import ControlPanel from "./pages/ControlPanel"
import Preaprobacion from "./pages/Preaprobacion"
import PreaprobacionDatosPersonales from "./pages/PreaprobacionDatosPersonales"
import PreaprobacionDatosServicios from "./pages/PreaprobacionDatosServicios"
import PreaprobacionGarante from "./pages/PreaprobacionGarante"
import PreaprobacionGaranteDatos from "./pages/PreaprobacionGaranteDatos"
import PreaprobacionGaranteServicios from "./pages/PreaprobacionGaranteServicios"
import PreaprobacionFin from "./pages/PreaprobacionFin"
import Layout from "./shared/Layout"

function App() {
    return (
        <Routes>
            <Route element={<Layout />}>
                <Route path="/calculator" element={<ClientCalculator />} />
                <Route path="/contacto" element={<Contacto />} />
                <Route path="/adelantoCapital" element={<EnhancedMortgageCalculator />} />
                <Route path="/pagos" element={<PaymentAdminMortgageCalculator />} />
                <Route path="/inversion" element={<InvestorReturnCalculator />} />
                <Route path="/cuil" element={<Cuil />} />
                <Route path="/cuil2" element={<Cuil2 />} />
                <Route path="/deudas" element={<DeudasTable />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/solicitar" element={<ComoSolicitarTuCredito />} />
                <Route path="/tieneDeudas" element={<TieneDeudas />} />
                <Route path="/controlpanel" element={<ControlPanel />} />
                <Route path="/preaprobacion" element={<Preaprobacion />} />
                <Route path="/preaprobacionDatosPersonales" element={<PreaprobacionDatosPersonales />} />
                <Route path="/preaprobacionDatosServicios" element={<PreaprobacionDatosServicios />} />
                <Route path="/preaprobacionGarante" element={<PreaprobacionGarante />} />
                <Route path="/preaprobacionGaranteDatos" element={<PreaprobacionGaranteDatos />} />
                <Route path="/preaprobacionGaranteServicios" element={<PreaprobacionGaranteServicios />} />
                <Route path="/preaprobacionFin" element={<PreaprobacionFin />} />

            </Route>
            <Route path="/" element={<Home />} />
            <Route path="*" element={<ErrorPage />} />
        </Routes>
    );
}

export default App;
