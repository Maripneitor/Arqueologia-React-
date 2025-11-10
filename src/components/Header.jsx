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

  useMotionValueEvent(scrollY, "change", (latest) => {
    if (latest > 100) {
      setIsScrolled(true);
    } else {
      setIsScrolled(false);
    }
  });

  const handleNavClick = () => {
    setIsMobileMenuOpen(false);
  };

  const headerVariants = {
    transparent: { 
      backgroundColor: 'rgba(245, 240, 230, 0)', 
      paddingTop: '1.5rem', 
      paddingBottom: '1.5rem' 
    },
    solid: { 
      backgroundColor: 'var(--color-bg)', 
      paddingTop: '1rem', 
      paddingBottom: '1rem' 
    },
  };
  
  const logoVariants = {
    transparent: { scale: 1 },
    solid: { scale: 0.9 },
  }

  // ===== INICIO DE LA MODIFICACIÓN =====
  // 1. Quitar variantes de link que no usaremos
  // const linkVariants = { ... };
  // ===== FIN DE LA MODIFICACIÓN =====

  const mobileMenuVariants = {
    closed: { opacity: 0, x: '100%', transition: { duration: 0.3, ease: "easeInOut" }},
    open: { opacity: 1, x: 0, transition: { duration: 0.4, ease: "easeOut" }}
  };

  const navItemVariants = {
    closed: { opacity: 0, x: 20 },
    open: { opacity: 1, x: 0, transition: { duration: 0.4, ease: "easeOut" }}
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
        <motion.div
          variants={logoVariants}
          animate={isScrolled ? "solid" : "transparent"}
          transition={{ duration: 0.3, ease: "easeInOut" }}
          className="header-logo-wrapper"
        >
          <Link 
            to="/" 
            className="header-logo"
            onClick={handleNavClick}
          >
            Empresa Arqueología
          </Link>
        </motion.div>

        <nav className="header-nav desktop-nav">
          {navItems.map((item) => {
            const isActive = location.pathname === item.path;
            return (
              // ===== INICIO DE LA MODIFICACIÓN =====
              // 2. Añadir whileHover y position: relative al div
              <motion.div 
                key={item.path}
                className="nav-item-wrapper"
                whileHover="hover"
                animate={isActive ? "active" : "inactive"}
              >
                <Link 
                  to={item.path}
                  className={isActive ? 'nav-link active' : 'nav-link'}
                >
                  {item.label}
                </Link>
                
                {/* 3. Añadir la línea animada */}
                <motion.span
                  className="nav-link-underline"
                  variants={{
                    inactive: { scaleX: 0 },
                    active: { scaleX: 1 },
                    hover: { scaleX: 1 }
                  }}
                  transition={{ duration: 0.3, ease: 'easeOut' }}
                />
              </motion.div>
              // ===== FIN DE LA MODIFICACIÓN =====
            )
          })}
        </nav>

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

        <AnimatePresence mode="wait">
          {isMobileMenuOpen && (
            <motion.div
              className="mobile-menu-overlay"
              variants={mobileMenuVariants}
              initial="closed"
              animate="open"
              exit="closed"
            >
              <div 
                className="overlay-background"
                onClick={() => setIsMobileMenuOpen(false)}
              />
              <motion.nav 
                className="mobile-nav"
                variants={mobileMenuVariants}
                initial="closed"
                animate="open"
                exit="closed"
              >
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

                <motion.div 
                  className="mobile-contact-info"
                  variants={navItemVariants}
                  initial="closed"
                  animate="open"
                  transition={{ delay: 0.5 }}
                >
                  <p>📧 info@empresa-arqueologia.com</p>
                  <p>📞 +34 912 345 678</p>
                </motion.div>
              </motion.nav>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.header>
  );
};