import FacebookIcon from "@mui/icons-material/Facebook";
import InstagramIcon from "@mui/icons-material/Instagram";
import YouTubeIcon from "@mui/icons-material/YouTube";
import XIcon from "@mui/icons-material/X";
import logo from "../assets/logo-white.png";

function Footer() {
  return (
    <footer className="footer bg-background-footer text-center py-4">
      <aside className="ml-16">
        <a href="#home">
          <img src={logo} alt="Logo" className="h-8 ml-3" />
        </a>
        <div className="flex ml-3 mt-2">
          <InstagramIcon fontSize="large" />
          <XIcon fontSize="large" className="mr-2" />
          <YouTubeIcon fontSize="large" className="mr-2" />
          <FacebookIcon fontSize="large" className="mr-2" />
        </div>
      </aside>
      <nav>
        <h6 className="footer-title">Nosotros</h6>
        <a className="link link-hover" href="#nosotros">
          Sobre nosotros
        </a>
        <a className="link link-hover">Blog</a>
        <a className="link link-hover">Contactenos</a>
      </nav>
      <nav>
        <h6 className="footer-title">Soporte</h6>
        <a className="link link-hover">Centro de contacto</a>
        <a className="link link-hover">Terminos y condiciones</a>
        <a className="link link-hover">Legales</a>
      </nav>
      <nav>
        <h6 className="footer-title">Estate informado</h6>
        <a className="link link-hover">Input para enviar correo</a>
      </nav>
    </footer>
  );
}

export default Footer;
