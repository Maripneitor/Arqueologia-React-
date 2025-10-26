// src/components/ProjectCard.jsx
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import './ProjectCard.css';

export const ProjectCard = ({ project }) => {
  const [isRevealed, setIsRevealed] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);

  const {
    titulo,
    imagen_antes,
    imagen_despues,
    descripcion_corta,
    fecha,
    slug
  } = project;

  // Manejar interacción por hover/tap
  const handleReveal = () => {
    setIsRevealed(true);
  };

  const handleHide = () => {
    setIsRevealed(false);
  };

  // Manejar carga de imagen
  const handleImageLoad = () => {
    setImageLoaded(true);
  };

  // Variantes para animaciones
  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut"
      }
    },
    hover: {
      y: -5,
      transition: {
        duration: 0.3,
        ease: "easeInOut"
      }
    }
  };

  const imageVariants = {
    before: { opacity: 1 },
    after: { opacity: 0 }
  };

  return (
    <motion.div
      className="project-card"
      variants={cardVariants}
      initial="hidden"
      animate="visible"
      whileHover="hover"
    >
      <Link 
        to={`/proyectos/${slug}`} 
        className="card-link"
        onMouseEnter={handleReveal}
        onMouseLeave={handleHide}
        onTouchStart={handleReveal}
        onTouchEnd={handleHide}
      >
        <div className="card-image-container">
          {/* Imagen "antes" - siempre presente pero oculta inicialmente */}
          <div className="image-before">
            <img 
              src={imagen_antes?.url} 
              alt={`${titulo} - Antes`}
              onLoad={handleImageLoad}
            />
          </div>

          {/* Imagen "después" - visible por defecto */}
          <motion.div 
            className="image-after"
            animate={isRevealed ? "after" : "before"}
            variants={imageVariants}
            transition={{ duration: 0.5, ease: "easeInOut" }}
          >
            <img 
              src={imagen_despues?.url} 
              alt={`${titulo} - Después`}
              onLoad={handleImageLoad}
            />
          </motion.div>

          {/* Overlay de información */}
          <div className="card-overlay">
            <div className="overlay-content">
              <h3 className="project-title">{titulo}</h3>
              {descripcion_corta && (
                <p className="project-description">{descripcion_corta}</p>
              )}
              {fecha && (
                <span className="project-date">{fecha}</span>
              )}
            </div>
            
            {/* Indicador de interacción */}
            <div className="interaction-hint">
              <span className="hint-text">
                {isRevealed ? 'Antes' : 'Después'}
              </span>
            </div>
          </div>

          {/* Estado de carga */}
          {!imageLoaded && (
            <div className="image-loading">
              <div className="loading-spinner"></div>
            </div>
          )}
        </div>
      </Link>
    </motion.div>
  );
};