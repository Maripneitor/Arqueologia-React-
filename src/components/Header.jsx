// src/components/Header.jsx
import React from 'react';
import { motion, useScroll, useMotionValueEvent } from 'framer-motion';
import { Link } from 'react-router-dom';
import './Header.css'; // Crearemos este archivo a continuación

export const Header = () => {
  const [isScrolled, setIsScrolled] = React.useState(false);
  const { scrollY } = useScroll();

  // Esto detecta el evento de scroll y actualiza el estado
  useMotionValueEvent(scrollY, "change", (latest) => {
    if (latest > 100) {
      setIsScrolled(true);
    } else {
      setIsScrolled(false);
    }
  });

  // Variantes para la animación del fondo
  const headerVariants = {
    transparent: { backgroundColor: 'rgba(0, 0, 0, 0)' },
    solid: { backgroundColor: 'var(--color-bg)' },
  };

  // Variantes para la animación de los links
  const linkVariants = {
    hover: { color: 'var(--color-hover)', y: -2 },
    tap: { scale: 0.95 }
  };

  return (
    <motion.header
      className="header"
      // Anima entre 'transparent' y 'solid' basado en el estado
      animate={isScrolled ? "solid" : "transparent"}
      variants={headerVariants}
      transition={{ duration: 0.3, ease: "easeInOut" }}
    >
      <div className="header-content">
        <Link to="/" className="header-logo">
          Empresa Arqueología
        </Link>
        <nav className="header-nav">
          <motion.div variants={linkVariants} whileHover="hover" whileTap="tap">
            <Link to="/">Inicio</Link>
          </motion.div>
          <motion.div variants={linkVariants} whileHover="hover" whileTap="tap">
            <Link to="/proyectos">Proyectos</Link>
          </motion.div>
          <motion.div variants={linkVariants} whileHover="hover" whileTap="tap">
            <Link to="/nosotros">Nosotros</Link>
          </motion.div>
          <motion.div variants={linkVariants} whileHover="hover" whileTap="tap">
            <Link to="/servicios">Servicios</Link>
          </motion.div>
          <motion.div variants={linkVariants} whileHover="hover" whileTap="tap">
            <Link to="/contacto">Contacto</Link>
          </motion.div>
        </nav>
      </div>
    </motion.header>
  );
};