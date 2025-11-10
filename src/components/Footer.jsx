// src/components/Footer.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import { FaFacebook, FaInstagram, FaTwitter, FaLinkedin, FaYoutube } from 'react-icons/fa';
import './Footer.css';

export const Footer = () => {
  // Obtener el año actual dinámicamente
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="footer-content">
        
        {/* Sección de navegación */}
        <div className="footer-section">
          <h3 className="footer-title">Navegación</h3>
          <nav className="footer-nav">
            <Link to="/" className="footer-link">Inicio</Link>
            <Link to="/proyectos" className="footer-link">Proyectos</Link>
            <Link to="/nosotros" className="footer-link">Nosotros</Link>
            <Link to="/servicios" className="footer-link">Servicios</Link>
            <Link to="/contacto" className="footer-link">Contacto</Link>
          </nav>
        </div>

        {/* Sección de redes sociales */}
        <div className="footer-section">
          <h3 className="footer-title">Síguenos</h3>
          <div className="social-icons">
            <a 
              href="https://facebook.com" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="social-link"
              aria-label="Facebook"
            >
              <FaFacebook className="social-icon" />
            </a>
            <a 
              href="https://instagram.com" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="social-link"
              aria-label="Instagram"
            >
              <FaInstagram className="social-icon" />
            </a>
            <a 
              href="https://twitter.com" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="social-link"
              aria-label="Twitter"
            >
              <FaTwitter className="social-icon" />
            </a>
            <a 
              href="https://linkedin.com" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="social-link"
              aria-label="LinkedIn"
            >
              <FaLinkedin className="social-icon" />
            </a>
            <a 
              href="https://youtube.com" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="social-link"
              aria-label="YouTube"
            >
              <FaYoutube className="social-icon" />
            </a>
          </div>
        </div>

        {/* Sección de información de contacto */}
        <div className="footer-section">
          <h3 className="footer-title">Contacto</h3>
          <div className="contact-info">
            <p>📧 info@empresa-arqueologia.com</p>
            <p>📞 +52 961-129-0622</p>
            <p>📍 Chiapa de Corzo, Chiapas 
</p>
          </div>
        </div>

        {/* ===== INICIO DE LA MODIFICACIÓN ===== */}
        {/* Nueva sección para el mapa */}
        <div className="footer-section">
          <h3 className="footer-title">Nuestra Ubicación</h3>
          <div className="footer-map-wrapper">
            <iframe 
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3457.9775664214567!2d-93.01058826074785!3d16.71738903473528!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x85ed25e5c8fe81e9%3A0xd130c8978e0310f1!2sBlvrd%20Montebello%2C%2029160%20Chiapa%20de%20Corzo%2C%20Chis.!5e1!3m2!1ses-419!2smx!4v1762740637576!5m2!1ses-419!2smx" 
              className="footer-map"
              allowFullScreen="" 
              loading="lazy" 
              referrerPolicy="no-referrer-when-downgrade"
              title="Ubicación de la Empresa"
            ></iframe>
          </div>
        </div>
        {/* ===== FIN DE LA MODIFICACIÓN ===== */}

      </div>

      {/* Sección de copyright */}
      <div className="footer-bottom">
        <div className="footer-bottom-content">
          <p className="copyright">
            © {currentYear} Empresa Arqueología. Todos los derechos reservados.
          </p>
          <div className="legal-links">
            <Link to="/" className="legal-link">Política de Privacidad</Link>
            <Link to="/" className="legal-link">Términos de Servicio</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};