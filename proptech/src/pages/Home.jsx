import { Link } from "react-router-dom";
import Footer from "../components/Footer";
import Button from "@mui/material/Button";

function Home() {
  return (
    <>
      <h1 className="text-2xl">Home</h1>
      <Button variant="contained" color="primary" className="text-lg p-4">
        ¡Hola, Material UI y Tailwind juntos!
      </Button>

      <Link to="/login" className="mr-2">
        Login
      </Link>
      <Link to="/register">Register</Link>
      <Footer />
    </>
  );
}

export default Home;
