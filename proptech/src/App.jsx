import Button from '@mui/material/Button';
import Footer from "./components/Footer"
function App() {
  
  return (
    <>
      <h1 className="text-2xl">
        Hello world!
      </h1>
      <Button variant="contained" color="primary" className="text-lg p-4">
        ¡Hola, Material UI y Tailwind juntos!
      </Button>
      <Footer/>
    </>
  )
}

export default App
