// src/pages/ServicesPage.jsx
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { 
  FaTools, 
  FaSearch, 
  FaBook, 
  FaMonument, 
  FaMapMarkedAlt,
  FaHistory,
  FaMicroscope,
  FaArrowLeft
} from 'react-icons/fa';
import { localAPI } from '../services/localData';
import './ServicesPage.css';

export const ServicesPage = () => {
  const [services, setServices] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  // Mapeo de nombres de iconos a componentes de React Icons
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
    return <IconComponent className="service-detail-icon" />;
  };

  useEffect(() => {
    const fetchServices = async () => {
      try {
        setIsLoading(true);
        setError(null);
        
        // Llamar sin límite para obtener todos los servicios
        const response = await localAPI.getServices();

        // Transformar datos al formato esperado
        const servicesData = response.data.map(item => ({
          id: item.id,
          ...item.attributes
        }));

        setServices(servicesData);
      } catch (err) {
        console.error('Error fetching services:', err);
        setError('Error al cargar los servicios. Por favor, intenta nuevamente.');
      } finally {
        setIsLoading(false);
      }
    };

    fetchServices();
  }, []);

  if (error) {
    return (
      <motion.div
        className="services-page error-page"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.3 }}
      >
        <div className="container">
          <div className="error-message">
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              Error al cargar servicios
            </motion.h1>
            <p>{error}</p>
            <button 
              onClick={() => window.location.reload()}
              className="retry-button"
            >
              Reintentar
            </button>
          </div>
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div
      className="services-page"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
    >
      <div className="container">
        {/* Header de la página */}
        <motion.div
          className="page-header"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          <div className="header-content">
            <Link to="/" className="back-button">
              <FaArrowLeft /> Volver al Inicio
            </Link>
            <h1 className="page-title">Nuestros Servicios</h1>
            <p className="page-subtitle">
              Soluciones especializadas que combinan metodología científica tradicional 
              con tecnología de vanguardia para la investigación y conservación del patrimonio
            </p>
            <div className="services-count">
              {!isLoading && (
                <span>{services.length} servicio{services.length !== 1 ? 's' : ''} disponible{services.length !== 1 ? 's' : ''}</span>
              )}
            </div>
          </div>
        </motion.div>

        {/* Contenido principal */}
        {isLoading ? (
          <div className="loading-container">
            <div className="loading-spinner large"></div>
            <p>Cargando servicios...</p>
          </div>
        ) : services.length > 0 ? (
          <div className="services-container">
            <div className="services-grid">
              {services.map((service) => (
                <motion.div
                  key={service.id}
                  className="service-detail-card"
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                >
                  <div className="service-header">
                    <div className="service-icon-container">
                      {service.icono ? getIconComponent(service.icono) : <FaTools className="service-detail-icon" />}
                    </div>
                    <div className="service-title-container">
                      <h2 className="service-title">{service.nombre}</h2>
                      <Link 
                        to={`/servicios/${service.slug}`} 
                        className="service-link"
                      >
                        Ver detalles completos →
                      </Link>
                    </div>
                  </div>

                  <div className="service-content">
                    <div className="service-description">
                      <p>{service.descripcion_completa}</p>
                    </div>

                    <div className="service-features">
                      <h4>Características principales:</h4>
                      <ul className="features-list">
                        <li>Metodología científica validada</li>
                        <li>Documentación exhaustiva</li>
                        <li>Tecnología de última generación</li>
                        <li>Informes detallados</li>
                      </ul>
                    </div>

                    <div className="service-actions">
                      <Link 
                        to="/contacto" 
                        className="cta-button primary"
                      >
                        Solicitar Información
                      </Link>
                      <Link 
                        to={`/servicios/${service.slug}`} 
                        className="cta-button secondary"
                      >
                        Más Información
                      </Link>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        ) : (
          <motion.div
            className="no-services"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h2>No hay servicios disponibles</h2>
            <p>No se encontraron servicios en nuestro catálogo.</p>
            <Link to="/contacto" className="cta-button primary">
              Contáctanos para más información
            </Link>
          </motion.div>
        )}

        {/* Sección de CTA final */}
        <motion.section
          className="cta-section"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
        >
          <div className="cta-content">
            <h2>¿Necesitas un servicio personalizado?</h2>
            <p>
              Contamos con la flexibilidad para adaptar nuestros servicios a las necesidades 
              específicas de tu proyecto. Desarrollamos soluciones a medida para cada caso.
            </p>
            <div className="cta-buttons">
              <Link to="/contacto" className="cta-button large primary">
                Solicitar Cotización
              </Link>
              <Link to="/proyectos" className="cta-button large secondary">
                Ver Nuestros Proyectos
              </Link>
            </div>
          </div>
        </motion.section>
      </div>
    </motion.div>
  );
};