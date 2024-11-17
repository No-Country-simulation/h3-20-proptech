import { Routes,Route } from "react-router-dom"
import Home from "./pages/Home"
import Contacto from "./pages/Contacto"
import MortgageCalculator from "./components/MortgageCalculator"
import EnhancedMortgageCalculator from "./components/EnhancedMortgageCalculator"

function App() {
  
  return (
    
    <Routes>
      <Route path="/" element={<Home/>}/>
      <Route path="/contacto" element={<Contacto/>}/>
      <Route path="/calculator" element={<MortgageCalculator/>}/>
      <Route path="/adelantoCapital" element={<EnhancedMortgageCalculator/>}/>
    </Routes>
    
  )
}

export default App
