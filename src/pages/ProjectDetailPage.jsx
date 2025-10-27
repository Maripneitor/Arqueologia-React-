// src/pages/ProjectDetailPage.jsx - Actualizado con RevealOnScroll y Optimizaciones
import React, { useState, useEffect, lazy } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ReactCompareSlider } from 'react-compare-slider';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import { FaArrowLeft, FaCalendar, FaMapMarkerAlt, FaBuilding } from 'react-icons/fa';
import { RevealOnScroll } from '../components/RevealOnScroll';
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

  if (error) {
    return (
      <div className="project-detail-page error-page">
        <div className="container">
          <RevealOnScroll>
            <div className="error-message">
              <h1>Proyecto No Encontrado</h1>
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
          </RevealOnScroll>
        </div>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="project-detail-page loading-page">
        <div className="container">
          <RevealOnScroll>
            <div className="loading-container">
              <div className="loading-spinner large"></div>
              <p>Cargando proyecto...</p>
            </div>
          </RevealOnScroll>
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
        {/* Sección del comparador con RevealOnScroll */}
        <RevealOnScroll>
          <section className="comparator-section">
            <div className="comparator-container">
              <ReactCompareSlider
                itemOne={
                  <div className="compare-image-container">
                    <img 
                      src={project.imagen_antes?.url} 
                      alt={`${project.titulo} - Antes`}
                      className="compare-image"
                      loading="eager" // ✅ Carga prioritaria para imagen above the fold
                      decoding="async"
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
                      loading="eager" // ✅ Carga prioritaria para imagen above the fold
                      decoding="async"
                    />
                    <div className="image-label after">Después</div>
                  </div>
                }
                position={50}
                className="react-compare-slider"
                style={{
                  borderRadius: '12px',
                  overflow: 'hidden'
                }}
                onlyHandleDraggable={true}
              />
            </div>
          </section>
        </RevealOnScroll>

        {/* Información del proyecto con RevealOnScroll */}
        <RevealOnScroll delay={0.2}>
          <section className="project-info-section">
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
          </section>
        </RevealOnScroll>

        {/* Galería adicional con RevealOnScroll y lazy loading */}
        {project.galeria && project.galeria.length > 0 && (
          <RevealOnScroll delay={0.4}>
            <section className="gallery-section">
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
                lazy={true} // ✅ Lazy loading nativo de Swiper
              >
                {project.galeria.map((image, index) => (
                  <SwiperSlide key={index}>
                    <div className="gallery-slide">
                      <img 
                        src={image.url} 
                        alt={image.alternativeText || `Galería ${index + 1} - ${project.titulo}`}
                        className="gallery-image"
                        loading="lazy" // ✅ Lazy loading para imágenes de galería
                        decoding="async"
                      />
                    </div>
                  </SwiperSlide>
                ))}
              </Swiper>
            </section>
          </RevealOnScroll>
        )}

        {/* Navegación entre proyectos con RevealOnScroll */}
        <RevealOnScroll delay={0.6}>
          <section className="project-navigation">
            <div className="navigation-buttons">
              <button onClick={handleBack} className="nav-button back">
                <FaArrowLeft /> Volver a Proyectos
              </button>
              <Link to="/proyectos" className="nav-button all-projects">
                Ver Todos los Proyectos
              </Link>
            </div>
          </section>
        </RevealOnScroll>
      </div>
    </motion.div>
  );
};