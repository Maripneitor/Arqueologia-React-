// src/pages/ServiceDetailPage.jsx
import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { RevealOnScroll } from '../components/RevealOnScroll';
import { localAPI } from '../services/localData';
import { 
  FaTools, FaSearch, FaBook, FaMonument, FaMapMarkedAlt,
  FaHistory, FaMicroscope, FaArrowLeft
} from 'react-icons/fa';
import { pageSlideVariants, pageTransition } from '../utils/pageTransitions';
import './ServiceDetailPage.css';

// Mapeo de iconos
const getIconComponent = (iconName) => {
  const iconMap = {
    'FaTools': FaTools,
    'FaSearch': FaSearch,
    'FaBook': FaBook,
    'FaMonument': FaMonument,
    'FaMapMarkedAlt': FaMapMarkedAlt,
    'FaHistory': FaHistory,
    'FaMicroscope': FaMicroscope,
  };
  const IconComponent = iconMap[iconName] || FaTools;
  return <IconComponent />;
};

export const ServiceDetailPage = () => {
  const { slug } = useParams();
  const navigate = useNavigate();
  const [service, setService] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchService = async () => {
      try {
        setIsLoading(true);
        setError(null);
        // Usamos la función que ya existe en tu API local
        const response = await localAPI.getServiceBySlug(slug);
        setService({ id: response.data.id, ...response.data.attributes });
      } catch (err) {
        console.error('Error fetching service:', err);
        setError('Servicio no encontrado');
      } finally {
        setIsLoading(false);
      }
    };

    if (slug) {
      fetchService();
    }
  }, [slug]);

  const handleBack = () => navigate(-1);

  if (error) {
    return (
      <motion.div 
        className="service-detail-page error-page"
        initial="initial"
        animate="in"
        exit="out"
        variants={pageSlideVariants}
        transition={pageTransition}
      >
        <div className="container">
          <h1>Servicio No Encontrado</h1>
          <p>{error}</p>
          <Link to="/servicios" className="cta-button primary">Ver todos los servicios</Link>
        </div>
      </motion.div>
    );
  }

  if (isLoading) {
    return (
      <motion.div 
        className="service-detail-page loading-page"
        initial="initial"
        animate="in"
        exit="out"
        variants={pageSlideVariants}
        transition={pageTransition}
      >
        <div className="container">
          <div className="loading-spinner large"></div>
          <p>Cargando servicio...</p>
        </div>
      </motion.div>
    );
  }

  if (!service) return null;

  return (
    <motion.div
      className="service-detail-page"
      initial="initial"
      animate="in"
      exit="out"
      variants={pageSlideVariants}
      transition={pageTransition}
    >
      <div className="container">
        <RevealOnScroll>
          <div className="service-detail-header">
            <button onClick={handleBack} className="back-button">
              <FaArrowLeft /> Volver a Servicios
            </button>
            <div className="service-icon-wrapper">
              {getIconComponent(service.icono)}
            </div>
            <h1 className="service-title">{service.nombre}</h1>
            <p className="service-short-desc">{service.descripcion_corta}</p>
          </div>
        </RevealOnScroll>

        <RevealOnScroll delay={0.2}>
          <div className="service-detail-content">
            <div className="service-main-content">
              <h3>Descripción Completa</h3>
              <p>{service.descripcion_completa}</p>
              
              <div className="service-features">
                <h4>Este servicio incluye:</h4>
                <ul className="features-list">
                  <li>Metodología científica validada</li>
                  <li>Documentación exhaustiva</li>
                  <li>Tecnología de última generación</li>
                  <li>Informes detallados y análisis</li>
                  <li>Conservación preventiva in-situ</li>
                </ul>
              </div>
            </div>
            
            <div className="service-sidebar-cta">
              <div className="cta-box">
                <h4>¿Interesado en este servicio?</h4>
                <p>Permítenos ayudarte a planificar tu próximo proyecto.</p>
                <Link to="/contacto" className="cta-button primary large">
                  Solicitar Cotización
                </Link>
                <Link to="/proyectos" className="cta-button secondary large">
                  Ver Proyectos Relacionados
                </Link>
              </div>
            </div>
          </div>
        </RevealOnScroll>
      </div>
    </motion.div>
  );
};