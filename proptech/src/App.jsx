// import { Routes, Route } from "react-router-dom"
import {
  BrowserRouter as Router,
  Navigate,
  Route,
  Routes,
} from "react-router-dom";

import Home from "./pages/Home";
import Contacto from "./pages/Contacto";
import ClientCalculator from "./components/ClientCalculator";
import ClientCalculatorAdmin from "./components/ClientCalculatorAdmin";
import EnhancedMortgageCalculator from "./components/EnhancedMortgageCalculator";
import PaymentAdminMortgageCalculator from "./components/PaymentAdminMortgageCalculator";
import Cuil from "./components/Cuil";
import Cuil2 from "./components/Cuil2";
import Login from "./pages/Login";
import Register from "./pages/Register";
import ErrorPage from "./pages/ErrorPage";
import DeudasTable from "./components/DeudasTable";
import InvestorReturnCalculator from "./components/InvestorReturnCalculator";
import ComoSolicitarTuCredito from "./components/ComoSolicitarTuCredito";
import TieneDeudas from "./components/TieneDeudas";
import ControlPanel from "./pages/ControlPanel";
import Preaprobacion from "./pages/Preaprobacion";
import PreaprobacionDatosPersonales from "./pages/PreaprobacionDatosPersonales";
import PreaprobacionDatosServicios from "./pages/PreaprobacionDatosServicios";
import PreaprobacionGarante from "./pages/PreaprobacionGarante";
import PreaprobacionGaranteDatos from "./pages/PreaprobacionGaranteDatos";
import PreaprobacionGaranteServicios from "./pages/PreaprobacionGaranteServicios";
import PreaprobacionFin from "./pages/PreaprobacionFin";
import Layout from "./shared/Layout";
import CapitalizationCalculator from "./components/CapitalizationCalculator";
import LoanForm from "./components/LoanForm";
import PaymentForm from "./components/PaymentForm";
import Payments from "./components/Payments";
import AdministratorDashboard from "./components/AdministratorDashboard";
import CapitalizationCalculatorAdmin from "./components/CapitalizationCalculatorAdmin";
import CapitalizationCalculatorEdit from "./components/CapitalizationCalculatorEdit";
import Dashboard from "./components/Dashboard";
import RegisterUserAdmin from "./components/RegisterUserAdmin";
import CapitalizationCalculatorViewer from "./components/CapitalizationCalculatorViewer";

function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/calculator" element={<ClientCalculator />} />
        <Route path="/calculatorAdmin" element={<ClientCalculatorAdmin />} />
        <Route path="/contacto" element={<Contacto />} />
        <Route
          path="/adelantoCapital"
          element={<EnhancedMortgageCalculator />}
        />
        <Route
          path="/pagosCalculator"
          element={<PaymentAdminMortgageCalculator />}
        />
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
        <Route
          path="/preaprobacionDatosPersonales"
          element={<PreaprobacionDatosPersonales />}
        />
        <Route
          path="/preaprobacionDatosServicios"
          element={<PreaprobacionDatosServicios />}
        />
        <Route
          path="/preaprobacionGarante"
          element={<PreaprobacionGarante />}
        />
        <Route
          path="/preaprobacionGaranteDatos"
          element={<PreaprobacionGaranteDatos />}
        />
        <Route
          path="/preaprobacionGaranteServicios"
          element={<PreaprobacionGaranteServicios />}
        />
        <Route path="/preaprobacionFin" element={<PreaprobacionFin />} />
        <Route path="/capitalizacion" element={<CapitalizationCalculator />} />
        <Route
          path="/capitalizacionAdmin"
          element={<CapitalizationCalculatorAdmin />}
        />
        <Route
          path="/capitalizacionEdit"
          element={<CapitalizationCalculatorEdit />}
        />
        <Route path="/pagos" element={<Payments />} />
        <Route path="/loan" element={<LoanForm />} />
        <Route path="/payment" element={<PaymentForm />} />
        <Route path="/adminDashboard" element={<AdministratorDashboard />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/registerUserAdmin" element={<RegisterUserAdmin />} />
        <Route path="/capitalizacionView" element={<CapitalizationCalculatorViewer />} />
      </Route>
      <Route path="/" element={<Home />} />
      <Route path="*" element={<ErrorPage />} />
    </Routes>
  );
}

export default App;
