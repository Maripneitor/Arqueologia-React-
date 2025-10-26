// src/components/BriefServices.jsx
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
  FaExclamationTriangle
} from 'react-icons/fa';
import { localAPI } from '../services/localData';
import './BriefServices.css';

export const BriefServices = () => {
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
      'FaShovel': FaTools, // Usar FaTools como fallback para FaShovel
      'FaExclamationTriangle': FaExclamationTriangle,
    };
    
    const IconComponent = iconMap[iconName] || FaTools; // Fallback a FaTools
    return <IconComponent className="service-icon" />;
  };

  useEffect(() => {
    const fetchServices = async () => {
      try {
        setIsLoading(true);
        setError(null);
        
        const response = await localAPI.getServices(3);

        // Transformar datos al formato esperado
        const servicesData = response.data.map(item => ({
          id: item.id,
          ...item.attributes
        }));

        setServices(servicesData);
      } catch (err) {
        console.error('Error fetching services:', err);
        setError('Error al cargar los servicios');
      } finally {
        setIsLoading(false);
      }
    };

    fetchServices();
  }, []);

  // Variantes para animaciones
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const cardVariants = {
    hidden: { 
      opacity: 0, 
      y: 30 
    },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut"
      }
    },
    hover: {
      y: -8,
      transition: {
        duration: 0.3,
        ease: "easeInOut"
      }
    }
  };

  if (error) {
    return (
      <section className="brief-services error-section">
        <div className="container">
          <div className="error-message">
            <h2>Error al cargar servicios</h2>
            <p>{error}</p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="brief-services">
      <div className="container">
        <motion.div
          className="section-header"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <h2 className="section-title">Nuestros Servicios</h2>
          <p className="section-subtitle">
            Soluciones especializadas en arqueología que combinan tradición e innovación
          </p>
        </motion.div>

        {isLoading ? (
          <div className="loading-container">
            <div className="services-loading">
              <div className="loading-spinner large"></div>
              <p>Cargando servicios...</p>
            </div>
          </div>
        ) : services.length > 0 ? (
          <motion.div
            className="services-grid"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {services.map((service) => (
              <motion.div
                key={service.id}
                className="service-card-wrapper"
                variants={cardVariants}
                whileHover="hover"
              >
                <Link 
                  to={`/servicios${service.slug ? `/${service.slug}` : ''}`} 
                  className="service-card"
                >
                  <div className="service-icon-container">
                    {service.icono ? getIconComponent(service.icono) : <FaTools className="service-icon" />}
                  </div>
                  
                  <div className="service-content">
                    <h3 className="service-title">{service.nombre}</h3>
                    <p className="service-description">
                      {service.descripcion_corta}
                    </p>
                  </div>

                  <div className="service-arrow">
                    <span>→</span>
                  </div>
                </Link>
              </motion.div>
            ))}
          </motion.div>
        ) : (
          <div className="no-services">
            <h3>No hay servicios disponibles</h3>
            <p>No se encontraron servicios para mostrar.</p>
          </div>
        )}

        {/* Enlace para ver todos los servicios */}
        <motion.div
          className="view-all-container"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.6 }}
          viewport={{ once: true }}
        >
          <Link to="/servicios" className="view-all-button">
            Ver Todos los Servicios
          </Link>
        </motion.div>
      </div>
    </section>
  );
};