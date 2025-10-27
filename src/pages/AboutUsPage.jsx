// src/pages/AboutUsPage.jsx - Versión con iconos válidos
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import {
  FaRocket,
  FaTools,
  FaMicroscope,
  FaAward,
  FaGlobeAmericas,
  FaUniversity,
  FaHandsHelping,
  FaUser
} from 'react-icons/fa';
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

  // Mapeo de iconos para la línea de tiempo
  const getTimelineIcon = (iconName) => {
    const iconMap = {
      'FaRocket': FaRocket,
      'FaTools': FaTools,
      'FaMicroscope': FaMicroscope,
      'FaAward': FaAward,
      'FaGlobeAmericas': FaGlobeAmericas,
      'FaUniversity': FaUniversity,
      'FaHandsHelping': FaHandsHelping,
      'FaShovel': FaTools, // Usar FaTools como fallback para FaShovel
    };
    
    const IconComponent = iconMap[iconName] || FaUser;
    return <IconComponent className="timeline-icon" />;
  };

  const pageVariants = {
    initial: { opacity: 0, y: 20 },
    in: { opacity: 1, y: 0 },
    out: { opacity: 0, y: -20 }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: "easeOut"
      }
    }
  };

  if (error) {
    return (
      <div className="about-us-page error-page">
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
      </div>
    );
  }

  return (
    <motion.div
      className="about-us-page"
      initial="initial"
      animate="in"
      exit="out"
      variants={pageVariants}
      transition={{ duration: 0.5 }}
    >
      <div className="container">
        <motion.div
          className="page-header"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="page-title">Nuestra Historia</h1>
          <p className="page-subtitle">
            Más de una década combinando la tradición arqueológica con la innovación tecnológica
          </p>
        </motion.div>

        {isLoading ? (
          <div className="loading-container">
            <div className="loading-spinner large"></div>
            <p>Cargando información...</p>
          </div>
        ) : (
          <>
            {/* Sección de introducción */}
            <motion.section
              className="intro-section"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
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
            </motion.section>

            {/* Sección del equipo */}
            <motion.section
              className="team-section"
              variants={containerVariants}
              initial="hidden"
              animate="visible"
            >
              <h2 className="section-title">Nuestro Equipo</h2>
              <p className="section-subtitle">
                Profesionales apasionados por descubrir y preservar nuestra historia
              </p>
              
              <div className="team-grid">
                {team.map((member) => (
                  <motion.div
                    key={member.id}
                    className="team-card"
                    variants={itemVariants}
                    whileHover={{ y: -5 }}
                  >
                    <div className="member-photo">
                      <img 
                        src={member.foto?.url} 
                        alt={member.foto?.alternativeText || member.nombre}
                        className="photo-img"
                      />
                    </div>
                    <div className="member-info">
                      <h3 className="member-name">{member.nombre}</h3>
                      <p className="member-position">{member.puesto}</p>
                      <p className="member-bio">{member.bio}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.section>

            {/* Sección de la línea de tiempo personalizada */}
            <motion.section
              className="timeline-section"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              <h2 className="section-title">Nuestra Trayectoria</h2>
              <p className="section-subtitle">
                Hitos importantes en nuestro camino de innovación arqueológica
              </p>
              
              <div className="custom-timeline">
                {timeline.map((item, index) => (
                  <motion.div
                    key={item.id}
                    className={`timeline-item ${index % 2 === 0 ? 'left' : 'right'}`}
                    initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                  >
                    <div className="timeline-content">
                      <div className="timeline-icon">
                        {getTimelineIcon(item.icono)}
                      </div>
                      <div className="timeline-year">{item.año}</div>
                      <h3 className="timeline-title">{item.titulo}</h3>
                      <p className="timeline-description">{item.descripcion}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.section>
          </>
        )}
      </div>
    </motion.div>
  );
};