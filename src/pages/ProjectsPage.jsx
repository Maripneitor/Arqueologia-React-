// src/pages/ProjectsPage.jsx
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { localAPI } from '../services/localData';
import { ProjectCard } from '../components/ProjectCard';
import './ProjectsPage.css';

export const ProjectsPage = () => {
  const [projects, setProjects] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchAllProjects = async () => {
      try {
        setIsLoading(true);
        setError(null);
        
        const response = await localAPI.getProjects();
        
        // Transformar datos al formato esperado
        const projectsData = response.data.map(item => ({
          id: item.id,
          ...item.attributes
        }));

        setProjects(projectsData);
      } catch (err) {
        console.error('Error fetching projects:', err);
        setError('Error al cargar los proyectos. Por favor, intenta nuevamente.');
      } finally {
        setIsLoading(false);
      }
    };

    fetchAllProjects();
  }, []);

  // Variantes para animaciones
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const pageVariants = {
    initial: { opacity: 0, y: 20 },
    in: { opacity: 1, y: 0 },
    out: { opacity: 0, y: -20 }
  };

  if (error) {
    return (
      <div className="projects-page error-page">
        <div className="container">
          <div className="error-message">
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              Error al cargar proyectos
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
      className="projects-page"
      initial="initial"
      animate="in"
      exit="out"
      variants={pageVariants}
      transition={{ duration: 0.5 }}
    >
      <div className="container">
        {/* Header de la página */}
        <motion.div
          className="page-header"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          <h1 className="page-title">Nuestro Portafolio</h1>
          <p className="page-subtitle">
            Descubre todos nuestros proyectos arqueológicos y las transformaciones que hemos logrado
          </p>
          <div className="projects-count">
            {!isLoading && (
              <span>{projects.length} proyecto{projects.length !== 1 ? 's' : ''} encontrado{projects.length !== 1 ? 's' : ''}</span>
            )}
          </div>
        </motion.div>

        {/* Contenido principal */}
        {isLoading ? (
          <div className="loading-container">
            <div className="loading-spinner large"></div>
            <p>Cargando proyectos...</p>
          </div>
        ) : projects.length > 0 ? (
          <motion.div
            className="projects-grid-container"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            <div className="projects-grid">
              {projects.map((project) => (
                <ProjectCard 
                  key={project.id} 
                  project={project}
                />
              ))}
            </div>
          </motion.div>
        ) : (
          <motion.div
            className="no-projects"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h2>No hay proyectos disponibles</h2>
            <p>No se encontraron proyectos en nuestro portafolio.</p>
          </motion.div>
        )}
      </div>
    </motion.div>
  );
};