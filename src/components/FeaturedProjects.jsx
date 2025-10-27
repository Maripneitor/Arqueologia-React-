// src/components/FeaturedProjects.jsx - Actualizado y Corregido
import React, { useState, useEffect } from 'react';
import { RevealOnScroll } from './RevealOnScroll';
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

  if (error) {
    return (
      <section className="featured-projects error-section">
        <div className="container">
          <RevealOnScroll>
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
          </RevealOnScroll>
        </div>
      </section>
    );
  }

  return (
    <section className="featured-projects">
      <div className="container">
        {/* Encabezado con RevealOnScroll */}
        <RevealOnScroll>
          <div className="section-header">
            <h2 className="section-title">Proyectos Destacados</h2>
            <p className="section-subtitle">
              Descubre las transformaciones más impactantes de nuestros trabajos arqueológicos
            </p>
          </div>
        </RevealOnScroll>

        {isLoading ? (
          <RevealOnScroll>
            <div className="loading-container">
              <div className="loading-spinner large"></div>
              <p>Cargando proyectos destacados...</p>
            </div>
          </RevealOnScroll>
        ) : projects.length > 0 ? (
          <div className="projects-grid">
            {projects.map((project, index) => (
              <RevealOnScroll key={project.id} delay={0.1 * index}>
                <ProjectCard project={project} />
              </RevealOnScroll>
            ))}
          </div>
        ) : (
          <RevealOnScroll>
            <div className="no-projects">
              <h3>No hay proyectos destacados</h3>
              <p>No se encontraron proyectos marcados como destacados.</p>
            </div>
          </RevealOnScroll>
        )}
      </div>
    </section>
  );
};