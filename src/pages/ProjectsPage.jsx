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

  return (
    <motion.div
      className="projects-page"
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
          <div className="projects-grid">
            {projects.map((project, index) => (
              <ProjectCard 
                key={project.id} 
                project={project}
              />
            ))}
          </div>
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