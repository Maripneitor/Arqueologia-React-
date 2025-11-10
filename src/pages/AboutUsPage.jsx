// src/pages/AboutUsPage.jsx - REVERTIDO PARA QUITAR EL ERROR
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { RevealOnScroll } from '../components/RevealOnScroll';
import {
  FaRocket, FaTools, FaMicroscope, FaAward,
  FaGlobeAmericas, FaUniversity, FaHandsHelping, FaUser
} from 'react-icons/fa';
// Quitamos la importación de 'react-vertical-timeline-component'
import { localAPI } from '../services/localData';
import './AboutUsPage.css';

export const AboutUsPage = () => {
  const [team, setTeam] = useState([]);
  const [timeline, setTimeline] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        setError(null);

        const [teamResponse, timelineResponse] = await Promise.all([
          localAPI.getTeam(),
          localAPI.getTimeline()
        ]);

        const teamData = teamResponse.data.map(item => ({
          id: item.id,
          ...item.attributes
        }));

        const timelineData = timelineResponse.data.map(item => ({
          id: item.id,
          ...item.attributes
        }));

        setTeam(teamData);
        setTimeline(timelineData);
      } catch (err) {
        console.error('Error fetching about us data:', err);
        setError('Error al cargar la información');
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  // Mapeo de iconos (se mantiene por si lo usamos luego)
  const getTimelineIcon = (iconName) => {
    const iconMap = {
      'FaRocket': <FaRocket />,
      'FaTools': <FaTools />,
      'FaMicroscope': <FaMicroscope />,
      'FaAward': <FaAward />,
      'FaGlobeAmericas': <FaGlobeAmericas />,
      'FaUniversity': <FaUniversity />,
      'FaHandsHelping': <FaHandsHelping />,
      'FaShovel': <FaTools />,
    };
    
    return iconMap[iconName] || <FaUser />;
  };

  if (error) {
    return (
      <motion.div
        className="about-us-page error-page"
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
              Error al cargar información
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
      className="about-us-page"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
    >
      <div className="container">
        {/* Header con RevealOnScroll */}
        <RevealOnScroll>
          <div className="page-header">
            <h1 className="page-title">Nuestra Historia</h1>
            <p className="page-subtitle">
              Más de una década combinando la tradición arqueológica con la innovación tecnológica
            </p>
          </div>
        </RevealOnScroll>

        {isLoading ? (
          <RevealOnScroll>
            <div className="loading-container">
              <div className="loading-spinner large"></div>
              <p>Cargando información...</p>
            </div>
          </RevealOnScroll>
        ) : (
          <>
            {/* Sección de introducción con RevealOnScroll */}
            <RevealOnScroll delay={0.2}>
              <section className="intro-section">
                <div className="intro-content">
                  <h2>Arqueología con Visión de Futuro</h2>
                  <p>
                    Fundada en 2010, Arqueología Moderna nació con la misión de revolucionar 
                    la práctica arqueológica mediante la integración de metodologías científicas 
                    tradicionales con tecnologías digitales de vanguardia.
                  </p>
                  <p>
                    Creemos que la arqueología del siglo XXI debe ser precisa, accesible 
                    y sostenible. Por eso desarrollamos técnicas innovadoras que no solo 
                    mejoran la documentación y análisis, sino que también facilitan la 
                    divulgación y educación del patrimonio cultural.
                  </p>
                </div>
              </section>
            </RevealOnScroll>

            {/* Sección del equipo con RevealOnScroll */}
            <section className="team-section">
              <RevealOnScroll>
                <h2 className="section-title">Nuestro Equipo</h2>
                <p className="section-subtitle">
                  Profesionales apasionados por descubrir y preservar nuestra historia
                </p>
              </RevealOnScroll>
              
              <div className="team-grid">
                {team.map((member, index) => (
                  <RevealOnScroll key={member.id} delay={0.1 * index}>
                    <div className="team-card">
                      <div className="member-photo">
                        <img 
                          src={member.foto?.url} 
                          alt={member.foto?.alternativeText || member.nombre}
                          className="photo-img"
                          loading="lazy"
                          decoding="async"
                        />
                      </div>
                      <div className="member-info">
                        <h3 className="member-name">{member.nombre}</h3>
                        <p className="member-position">{member.puesto}</p>
                        <p className="member-bio">{member.bio}</p>
                      </div>
                    </div>
                  </RevealOnScroll>
                ))}
              </div>
            </section>

            {/* ===== INICIO DE LA MODIFICACIÓN ===== */}
            {/* Sección de la línea de tiempo (revertida a una lista simple) */}
            <RevealOnScroll delay={0.4}>
              <section className="timeline-section">
                <h2 className="section-title">Nuestra Trayectoria</h2>
                <p className="section-subtitle">
                  Hitos importantes en nuestro camino de innovación arqueológica
                </p>
                
                <div className="simple-timeline-list">
                  {timeline.map((item) => (
                    <div key={item.id} className="simple-timeline-item">
                      <h3 className="simple-timeline-title">{item.año} - {item.titulo}</h3>
                      <p className="simple-timeline-desc">{item.descripcion}</p>
                    </div>
                  ))}
                </div>
              </section>
            </RevealOnScroll>
            {/* ===== FIN DE LA MODIFICACIÓN ===== */}
          </>
        )}
      </div>
    </motion.div>
  );
};