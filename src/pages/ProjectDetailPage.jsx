// src/pages/ProjectDetailPage.jsx
import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ReactCompareSlider } from 'react-compare-slider';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import { FaArrowLeft, FaCalendar, FaMapMarkerAlt, FaBuilding } from 'react-icons/fa';
import { localAPI } from '../services/localData';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import './ProjectDetailPage.css';

export const ProjectDetailPage = () => {
  const { slug } = useParams();
  const navigate = useNavigate();
  const [project, setProject] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeImageIndex, setActiveImageIndex] = useState(0);

  useEffect(() => {
    const fetchProject = async () => {
      try {
        setIsLoading(true);
        setError(null);
        
        const response = await localAPI.getProjectBySlug(slug);
        
        // Transformar datos al formato esperado
        const projectData = {
          id: response.data.id,
          ...response.data.attributes
        };

        setProject(projectData);
      } catch (err) {
        console.error('Error fetching project:', err);
        setError('Proyecto no encontrado');
      } finally {
        setIsLoading(false);
      }
    };

    if (slug) {
      fetchProject();
    }
  }, [slug]);

  // Función para navegar de regreso
  const handleBack = () => {
    navigate(-1);
  };

  // Variantes para animaciones
  const pageVariants = {
    initial: { opacity: 0, y: 20 },
    in: { opacity: 1, y: 0 },
    out: { opacity: 0, y: -20 }
  };

  const contentVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut"
      }
    }
  };

  if (error) {
    return (
      <div className="project-detail-page error-page">
        <div className="container">
          <div className="error-message">
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              Proyecto No Encontrado
            </motion.h1>
            <p>{error}</p>
            <div className="error-actions">
              <button onClick={handleBack} className="back-button">
                <FaArrowLeft /> Volver Atrás
              </button>
              <Link to="/proyectos" className="projects-link">
                Ver Todos los Proyectos
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="project-detail-page loading-page">
        <div className="container">
          <div className="loading-container">
            <div className="loading-spinner large"></div>
            <p>Cargando proyecto...</p>
          </div>
        </div>
      </div>
    );
  }

  if (!project) {
    return null;
  }

  const allImages = [
    project.imagen_antes,
    project.imagen_despues,
    ...(project.galeria || [])
  ].filter(img => img && img.url);

  return (
    <motion.div
      className="project-detail-page"
      initial="initial"
      animate="in"
      exit="out"
      variants={pageVariants}
      transition={{ duration: 0.5 }}
    >
      {/* Header con navegación */}
      <motion.div
        className="project-header"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="container">
          <button onClick={handleBack} className="back-button">
            <FaArrowLeft /> Volver a Proyectos
          </button>
        </div>
      </motion.div>

      <div className="container">
        {/* Sección del comparador */}
        <motion.section
          className="comparator-section"
          variants={contentVariants}
          initial="hidden"
          animate="visible"
        >
          <div className="comparator-container">
            <ReactCompareSlider
              itemOne={
                <div className="compare-image-container">
                  <img 
                    src={project.imagen_antes?.url} 
                    alt={`${project.titulo} - Antes`}
                    className="compare-image"
                  />
                  <div className="image-label before">Antes</div>
                </div>
              }
              itemTwo={
                <div className="compare-image-container">
                  <img 
                    src={project.imagen_despues?.url} 
                    alt={`${project.titulo} - Después`}
                    className="compare-image"
                  />
                  <div className="image-label after">Después</div>
                </div>
              }
              position={50}
              className="react-compare-slider"
              style={{
                height: '60vh',
                borderRadius: '12px',
                overflow: 'hidden'
              }}
              onlyHandleDraggable={true}
            />
          </div>
        </motion.section>

        {/* Información del proyecto */}
        <motion.section
          className="project-info-section"
          variants={contentVariants}
          initial="hidden"
          animate="visible"
          transition={{ delay: 0.2 }}
        >
          <div className="project-info-grid">
            <div className="project-main-info">
              <h1 className="project-title">{project.titulo}</h1>
              <p className="project-short-description">
                {project.descripcion_corta}
              </p>
              
              <div className="project-description">
                <h3>Descripción del Proyecto</h3>
                <p>{project.descripcion_completa}</p>
              </div>
            </div>

            <div className="project-sidebar">
              <div className="project-meta">
                <h3>Detalles del Proyecto</h3>
                <div className="meta-item">
                  <FaCalendar className="meta-icon" />
                  <div>
                    <span className="meta-label">Año</span>
                    <span className="meta-value">{project.fecha}</span>
                  </div>
                </div>
                
                {project.ubicacion && (
                  <div className="meta-item">
                    <FaMapMarkerAlt className="meta-icon" />
                    <div>
                      <span className="meta-label">Ubicación</span>
                      <span className="meta-value">{project.ubicacion}</span>
                    </div>
                  </div>
                )}
                
                <div className="meta-item">
                  <FaBuilding className="meta-icon" />
                  <div>
                    <span className="meta-label">Estado</span>
                    <span className="meta-value">
                      {project.es_destacado ? 'Destacado' : 'Completado'}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.section>

        {/* Galería adicional */}
        {project.galeria && project.galeria.length > 0 && (
          <motion.section
            className="gallery-section"
            variants={contentVariants}
            initial="hidden"
            animate="visible"
            transition={{ delay: 0.4 }}
          >
            <h2 className="gallery-title">Galería del Proyecto</h2>
            <Swiper
              modules={[Navigation, Pagination, Autoplay]}
              navigation={true}
              pagination={{ clickable: true }}
              autoplay={{ delay: 5000, disableOnInteraction: false }}
              loop={true}
              spaceBetween={20}
              slidesPerView={1}
              breakpoints={{
                640: {
                  slidesPerView: 2,
                },
                1024: {
                  slidesPerView: 3,
                },
              }}
              className="gallery-swiper"
            >
              {project.galeria.map((image, index) => (
                <SwiperSlide key={index}>
                  <div className="gallery-slide">
                    <img 
                      src={image.url} 
                      alt={image.alternativeText || `Galería ${index + 1}`}
                      className="gallery-image"
                    />
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          </motion.section>
        )}

        {/* Navegación entre proyectos */}
        <motion.section
          className="project-navigation"
          variants={contentVariants}
          initial="hidden"
          animate="visible"
          transition={{ delay: 0.6 }}
        >
          <div className="navigation-buttons">
            <button onClick={handleBack} className="nav-button back">
              <FaArrowLeft /> Volver a Proyectos
            </button>
            <Link to="/proyectos" className="nav-button all-projects">
              Ver Todos los Proyectos
            </Link>
          </div>
        </motion.section>
      </div>
    </motion.div>
  );
};