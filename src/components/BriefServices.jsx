// src/components/BriefServices.jsx - Actualizado y Corregido
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { RevealOnScroll } from './RevealOnScroll';
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

  const getIconComponent = (iconName) => {
    const iconMap = {
      'FaTools': FaTools,
      'FaSearch': FaSearch,
      'FaBook': FaBook,
      'FaMonument': FaMonument,
      'FaMapMarkedAlt': FaMapMarkedAlt,
      'FaHistory': FaHistory,
      'FaMicroscope': FaMicroscope,
      'FaShovel': FaTools,
      'FaExclamationTriangle': FaExclamationTriangle,
    };
    
    const IconComponent = iconMap[iconName] || FaTools;
    return <IconComponent className="service-icon" />;
  };

  useEffect(() => {
    const fetchServices = async () => {
      try {
        setIsLoading(true);
        setError(null);
        const response = await localAPI.getServices(3);
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

  if (error) {
    return (
      <section className="brief-services error-section">
        <div className="container">
          <RevealOnScroll>
            <div className="error-message">
              <h2>Error al cargar servicios</h2>
              <p>{error}</p>
            </div>
          </RevealOnScroll>
        </div>
      </section>
    );
  }

  return (
    <section className="brief-services">
      <div className="container">
        {/* Encabezado con RevealOnScroll */}
        <RevealOnScroll>
          <div className="section-header">
            <h2 className="section-title">Nuestros Servicios</h2>
            <p className="section-subtitle">
              Soluciones especializadas en arqueología que combinan tradición e innovación
            </p>
          </div>
        </RevealOnScroll>

        {isLoading ? (
          <RevealOnScroll>
            <div className="loading-container">
              <div className="services-loading">
                <div className="loading-spinner large"></div>
                <p>Cargando servicios...</p>
              </div>
            </div>
          </RevealOnScroll>
        ) : services.length > 0 ? (
          <div className="services-grid">
            {services.map((service, index) => (
              <RevealOnScroll key={service.id} delay={0.1 * index}>
                <div className="service-card-wrapper">
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
                </div>
              </RevealOnScroll>
            ))}
          </div>
        ) : (
          <RevealOnScroll>
            <div className="no-services">
              <h3>No hay servicios disponibles</h3>
              <p>No se encontraron servicios para mostrar.</p>
            </div>
          </RevealOnScroll>
        )}

        {/* Botón ver todos con RevealOnScroll */}
        <RevealOnScroll delay={0.4}>
          <div className="view-all-container">
            <Link to="/servicios" className="view-all-button">
              Ver Todos los Servicios
            </Link>
          </div>
        </RevealOnScroll>
      </div>
    </section>
  );
};