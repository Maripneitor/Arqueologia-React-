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
            <p>📞 +34 912 345 678</p>
            <p>📍 Madrid, España</p>
          </div>
        </div>

      </div>

      {/* Sección de copyright */}
      <div className="footer-bottom">
        <div className="footer-bottom-content">
          <p className="copyright">
            © {currentYear} Empresa Arqueología. Todos los derechos reservados.
          </p>
          <div className="legal-links">
            <Link to="/privacidad" className="legal-link">Política de Privacidad</Link>
            <Link to="/terminos" className="legal-link">Términos de Servicio</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};