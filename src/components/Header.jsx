// src/components/Header.jsx
import React, { useState } from 'react';
import { motion, AnimatePresence, useScroll, useMotionValueEvent } from 'framer-motion';
import { Link, useLocation } from 'react-router-dom';
import { FaBars, FaTimes } from 'react-icons/fa';
import './Header.css';

export const Header = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();
  
  const { scrollY } = useScroll();

  // Detectar scroll para cambiar fondo del header
  useMotionValueEvent(scrollY, "change", (latest) => {
    if (latest > 100) {
      setIsScrolled(true);
    } else {
      setIsScrolled(false);
    }
  });

  // Cerrar menú móvil al hacer clic en un enlace
  const handleNavClick = () => {
    setIsMobileMenuOpen(false);
  };

  // Variantes para animaciones
  const headerVariants = {
    transparent: { backgroundColor: 'rgba(0, 0, 0, 0)' },
    solid: { backgroundColor: 'var(--color-bg)' },
  };

  const linkVariants = {
    hover: { color: 'var(--color-hover)', y: -2 },
    tap: { scale: 0.95 }
  };

  const mobileMenuVariants = {
    closed: {
      opacity: 0,
      x: '100%',
      transition: {
        duration: 0.3,
        ease: "easeInOut"
      }
    },
    open: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.4,
        ease: "easeOut"
      }
    }
  };

  const navItemVariants = {
    closed: { opacity: 0, x: 20 },
    open: { 
      opacity: 1, 
      x: 0,
      transition: {
        duration: 0.4,
        ease: "easeOut"
      }
    }
  };

  const navItems = [
    { path: '/', label: 'Inicio' },
    { path: '/proyectos', label: 'Proyectos' },
    { path: '/nosotros', label: 'Nosotros' },
    { path: '/servicios', label: 'Servicios' },
    { path: '/contacto', label: 'Contacto' }
  ];

  return (
    <motion.header
      className="header"
      animate={isScrolled ? "solid" : "transparent"}
      variants={headerVariants}
      transition={{ duration: 0.3, ease: "easeInOut" }}
    >
      <div className="header-content">
        {/* Logo */}
        <Link 
          to="/" 
          className="header-logo"
          onClick={handleNavClick}
        >
          Empresa Arqueología
        </Link>

        {/* Navegación Desktop - Solo visible en >= 768px */}
        <nav className="header-nav desktop-nav">
          {navItems.map((item) => (
            <motion.div 
              key={item.path}
              variants={linkVariants}
              whileHover="hover"
              whileTap="tap"
            >
              <Link 
                to={item.path}
                className={location.pathname === item.path ? 'nav-link active' : 'nav-link'}
              >
                {item.label}
              </Link>
            </motion.div>
          ))}
        </nav>

        {/* Botón Hamburguesa - Solo visible en < 768px */}
        <motion.button
          className="mobile-menu-button"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          aria-label={isMobileMenuOpen ? "Cerrar menú" : "Abrir menú"}
          aria-expanded={isMobileMenuOpen}
        >
          {isMobileMenuOpen ? (
            <FaTimes className="menu-icon" />
          ) : (
            <FaBars className="menu-icon" />
          )}
        </motion.button>

        {/* Overlay del Menú Móvil */}
        <AnimatePresence mode="wait">
          {isMobileMenuOpen && (
            <motion.div
              className="mobile-menu-overlay"
              variants={mobileMenuVariants}
              initial="closed"
              animate="open"
              exit="closed"
            >
              {/* Fondo del overlay */}
              <div 
                className="overlay-background"
                onClick={() => setIsMobileMenuOpen(false)}
              />
              
              {/* Contenido del menú móvil */}
              <motion.nav 
                className="mobile-nav"
                variants={mobileMenuVariants}
                initial="closed"
                animate="open"
                exit="closed"
              >
                {/* Encabezado del menú móvil */}
                <div className="mobile-nav-header">
                  <h2 className="mobile-nav-title">Navegación</h2>
                  <motion.button
                    className="mobile-close-button"
                    onClick={() => setIsMobileMenuOpen(false)}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    aria-label="Cerrar menú"
                  >
                    <FaTimes className="close-icon" />
                  </motion.button>
                </div>

                {/* Items de navegación móvil */}
                <ul className="mobile-nav-list">
                  {navItems.map((item, index) => (
                    <motion.li
                      key={item.path}
                      variants={navItemVariants}
                      initial="closed"
                      animate="open"
                      exit="closed"
                      transition={{ delay: index * 0.1 }}
                    >
                      <Link
                        to={item.path}
                        className={`mobile-nav-link ${
                          location.pathname === item.path ? 'mobile-nav-link-active' : ''
                        }`}
                        onClick={handleNavClick}
                      >
                        <span className="nav-link-text">{item.label}</span>
                        <motion.span
                          className="nav-link-arrow"
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: index * 0.1 + 0.2 }}
                        >
                          →
                        </motion.span>
                      </Link>
                    </motion.li>
                  ))}
                </ul>

                {/* Información de contacto en móvil */}
                <motion.div 
                  className="mobile-contact-info"
                  variants={navItemVariants}
                  initial="closed"
                  animate="open"
                  transition={{ delay: 0.5 }}
                >
                  <p>📧 info@empresa-arqueologia.com</p>
                  <p>📞 +52 961-129-0622</p>
                </motion.div>
              </motion.nav>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.header>
  );
};