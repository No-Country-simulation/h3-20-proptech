import FacebookIcon from '@mui/icons-material/Facebook';
import InstagramIcon from '@mui/icons-material/Instagram';
import YouTubeIcon from '@mui/icons-material/YouTube';
import XIcon from '@mui/icons-material/X';

function Footer() {
    return (
    // <footer className="footer bg-base-200 text-base-content p-10">
<footer className="footer bg-background-footer text-center py-4">
    <aside className="ml-16">
        <p>Logo</p>
        <div className="flex">
            <InstagramIcon />
            <XIcon style={{ fontSize: '24px' }}/>
            <YouTubeIcon style={{ fontSize: '24px' }}/>
            <FacebookIcon style={{ fontSize: '24px' }}/>
        </div>
    </aside>
    <nav>
        <h6 className="footer-title">Nosotros</h6>
        <a className="link link-hover">Sobre nosotros</a>
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
