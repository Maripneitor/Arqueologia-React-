// src/pages/ProjectsPage.jsx
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { localAPI } from '../services/localData';
import { ProjectCard } from '../components/ProjectCard';
import { ProjectCardSkeleton } from '../components/ProjectCardSkeleton'; // <-- MODIFICACIÓN
import { pageSlideVariants, pageTransition } from '../utils/pageTransitions';
import './ProjectsPage.css';

// Simulamos algunas categorías. En un proyecto real, esto vendría de la API
// o se generaría desde los datos de 'projects'.
const categories = ['Todos', 'Restauración', 'Intervención', 'Documentación'];

export const ProjectsPage = () => {
  const [projects, setProjects] = useState([]); // Guarda *todos* los proyectos
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  // Estados para los filtros
  const [activeFilter, setActiveFilter] = useState('Todos');
  const [filteredProjects, setFilteredProjects] = useState([]); // Proyectos a mostrar

  useEffect(() => {
    const fetchAllProjects = async () => {
      try {
        setIsLoading(true);
        setError(null);
        
        const response = await localAPI.getProjects();
        
        const projectsData = response.data.map(item => ({
          id: item.id,
          ...item.attributes,
          // Simulamos una categoría basada en el título para el filtro
          // En un proyecto real, usarías un campo 'tipo' o 'categoria'
          category: item.attributes.titulo.includes('Catedral') || item.attributes.titulo.includes('Hacienda') ? 'Restauración' : 
                    item.attributes.titulo.includes('UNICACH') ? 'Intervención' : 'Documentación'
        }));

        setProjects(projectsData);
        setFilteredProjects(projectsData); // Al inicio, mostrar todos
      } catch (err) {
        console.error('Error fetching projects:', err);
        setError('Error al cargar los proyectos. Por favor, intenta nuevamente.');
      } finally {
        setIsLoading(false);
      }
    };

    fetchAllProjects();
  }, []);

  // Manejador para cambiar el filtro
  const handleFilter = (category) => {
    setActiveFilter(category);

    if (category === 'Todos') {
      setFilteredProjects(projects);
    } else {
      const filtered = projects.filter(project => project.category === category);
      setFilteredProjects(filtered);
    }
  };

  return (
    <motion.div
      className="projects-page"
      initial="initial"
      animate="in"
      exit="out"
      variants={pageSlideVariants}
      transition={pageTransition}
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
        </motion.div>

        {/* --- Botones de Filtro --- */}
        {!isLoading && !error && (
          <motion.div 
            className="filter-buttons"
            layout // Anima el contenedor si cambia de tamaño (ej. en móvil)
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            {categories.map((category) => (
              <button
                key={category}
                className={`filter-button ${activeFilter === category ? 'active' : ''}`}
                onClick={() => handleFilter(category)}
              >
                {category}
                {/* Animación de la línea de "activo" */}
                {activeFilter === category && (
                  <motion.div 
                    className="active-filter-underline" 
                    layoutId="activeFilterUnderline"
                  />
                )}
              </button>
            ))}
          </motion.div>
        )}
        {/* --------------------------- */}


        {/* Contenido principal */}
        {/* MODIFICACIÓN: Cambiado el spinner por Skeleton Loaders */}
        {isLoading ? (
          <motion.div className="projects-grid" layout>
            {[1, 2, 3, 4, 5, 6].map((n) => (
              <ProjectCardSkeleton key={n} />
            ))}
          </motion.div>
        ) : (
          // --- Grid Animado ---
          <motion.div 
            className="projects-grid"
            layout // Anima el grid cuando los hijos cambian
          >
            <AnimatePresence>
              {filteredProjects.length > 0 ? (
                filteredProjects.map((project, index) => (
                  <motion.div
                    key={project.id}
                    layout // Anima la posición del item
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.8 }}
                    transition={{ duration: 0.4, ease: 'easeInOut' }}
                  >
                    <ProjectCard 
                      project={project}
                    />
                  </motion.div>
                ))
              ) : (
                <motion.div
                  className="no-projects no-projects-filter"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                >
                  <h2>No se encontraron proyectos</h2>
                  <p>No hay proyectos que coincidan con el filtro "{activeFilter}".</p>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
          // --------------------
        )}
      </div>
    </motion.div>
  );
};