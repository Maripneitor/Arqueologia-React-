// src/components/FeaturedProjects.jsx
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { localAPI } from '../services/localData';
import { ProjectCard } from './ProjectCard';
import './FeaturedProjects.css';

export const FeaturedProjects = () => {
  const [projects, setProjects] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchFeaturedProjects = async () => {
      try {
        setIsLoading(true);
        setError(null);
        
        const response = await localAPI.getFeaturedProjects();

        // Transformar datos al formato esperado
        const projectsData = response.data.map(item => ({
          id: item.id,
          ...item.attributes
        }));

        setProjects(projectsData);
      } catch (err) {
        console.error('Error fetching featured projects:', err);
        setError('Error al cargar los proyectos destacados');
      } finally {
        setIsLoading(false);
      }
    };

    fetchFeaturedProjects();
  }, []);

  // Variantes para animación de la sección
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  if (error) {
    return (
      <section className="featured-projects error-section">
        <div className="container">
          <div className="error-message">
            <h2>Error al cargar proyectos</h2>
            <p>{error}</p>
            <button 
              onClick={() => window.location.reload()}
              className="retry-button"
            >
              Reintentar
            </button>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="featured-projects">
      <div className="container">
        <motion.div
          className="section-header"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <h2 className="section-title">Proyectos Destacados</h2>
          <p className="section-subtitle">
            Descubre las transformaciones más impactantes de nuestros trabajos arqueológicos
          </p>
        </motion.div>

        {isLoading ? (
          <div className="loading-container">
            <div className="loading-spinner large"></div>
            <p>Cargando proyectos destacados...</p>
          </div>
        ) : projects.length > 0 ? (
          <motion.div
            className="projects-grid"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {projects.map((project) => (
              <ProjectCard 
                key={project.id} 
                project={project}
              />
            ))}
          </motion.div>
        ) : (
          <div className="no-projects">
            <h3>No hay proyectos destacados</h3>
            <p>No se encontraron proyectos marcados como destacados.</p>
          </div>
        )}
      </div>
    </section>
  );
};