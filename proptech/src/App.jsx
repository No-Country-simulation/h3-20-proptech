import { Routes,Route } from "react-router-dom"
import Home from "./pages/Home"
import Contacto from "./pages/Contacto"
import MortgageCalculator from "./components/MortgageCalculator"
import EnhancedMortgageCalculator from "./components/EnhancedMortgageCalculator"
import PaymentAdminMortgageCalculator from "./components/PaymentAdminMortgageCalculator"

function App() {
  
  return (
    
    <Routes>
      <Route path="/" element={<Home/>}/>
      <Route path="/contacto" element={<Contacto/>}/>
      <Route path="/calculator" element={<MortgageCalculator/>}/>
      <Route path="/adelantoCapital" element={<EnhancedMortgageCalculator/>}/>
      <Route path="/pagos" element={<PaymentAdminMortgageCalculator/>}/>
    </Routes>
    
  )
}

export default App
