// src/pages/ProjectDetailPage.jsx - Actualizado con Lightbox y Transición
import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
// MODIFICACIÓN: Eliminado 'ReactCompareSlider'
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import { 
  FaArrowLeft, 
  FaCalendar, 
  FaMapMarkerAlt, 
  FaBuilding,
  FaTimes,
  FaArrowRight,
  FaArrowLeft as FaArrowLeftLightbox,
  FaSyncAlt // Icono para el botón de toggle
} from 'react-icons/fa';
import { RevealOnScroll } from '../components/RevealOnScroll';
import { localAPI } from '../services/localData';
import { pageSlideVariants, pageTransition } from '../utils/pageTransitions';
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

  // Estado para el lightbox (null = cerrado, 0...N = índice de la imagen)
  const [selectedImage, setSelectedImage] = useState(null);
  
  // MODIFICACIÓN: Estado para el nuevo comparador
  const [showBefore, setShowBefore] = useState(false);

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
  
  // --- Manejadores del Lightbox ---
  const handleOpenLightbox = (index) => {
    setSelectedImage(index);
  };

  const handleCloseLightbox = () => {
    setSelectedImage(null);
  };

  const handleLightboxNav = (direction) => {
    if (selectedImage === null) return;
    
    let newIndex = selectedImage + direction;
    const totalImages = project.galeria.length;

    if (newIndex < 0) {
      newIndex = totalImages - 1; // Loop al final
    } else if (newIndex >= totalImages) {
      newIndex = 0; // Loop al inicio
    }
    
    setSelectedImage(newIndex);
  };
  // ---------------------------------

  // Función para navegar de regreso
  const handleBack = () => {
    navigate(-1);
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

  // MODIFICACIÓN: Variantes para el nuevo comparador
  const imageFadeVariants = {
    hidden: { opacity: 0, scale: 1.05 },
    visible: { opacity: 1, scale: 1 },
  };

  return (
    <motion.div
      className="project-detail-page"
      initial="initial"
      animate="in"
      exit="out"
      variants={pageSlideVariants}
      transition={pageTransition}
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
        {/* MODIFICACIÓN: Sección del comparador reemplazada */}
        <RevealOnScroll>
          <section className="comparator-section">
            <div className="comparator-container">
              <AnimatePresence initial={false} mode="wait">
                <motion.img
                  key={showBefore ? 'before' : 'after'}
                  src={showBefore ? project.imagen_antes?.url : project.imagen_despues?.url}
                  alt={showBefore ? `${project.titulo} - Antes` : `${project.titulo} - Después`}
                  className="compare-image"
                  variants={imageFadeVariants}
                  initial="hidden"
                  animate="visible"
                  exit="hidden"
                  transition={{ duration: 0.5, ease: 'easeInOut' }}
                  loading="eager"
                  decoding="async"
                />
              </AnimatePresence>
              <div className="image-label before">Antes</div>
              <div className="image-label after">Después</div>
              <button 
                className="compare-toggle" 
                onClick={() => setShowBefore(!showBefore)}
                aria-label={showBefore ? "Mostrar imagen después" : "Mostrar imagen antes"}
              >
                <FaSyncAlt />
                <span>{showBefore ? 'Ver Después' : 'Ver Antes'}</span>
              </button>
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
                loop={project.galeria.length > 2} // Loop solo si hay suficientes imágenes
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
                  <SwiperSlide 
                    key={index}
                    onClick={() => handleOpenLightbox(index)} // <-- Añadir onClick
                    className="gallery-slide-clickable" // <-- Añadir clase para cursor
                  >
                    <div className="gallery-slide">
                      <img 
                        src={image.url} 
                        alt={image.alternativeText || `Galería ${index + 1} - ${project.titulo}`}
                        className="gallery-image"
                        loading="lazy"
                        decoding="async"
                      />
                      <div className="gallery-slide-overlay">
                        <span>Ver</span>
                      </div>
                    </div>
                  </SwiperSlide>
                ))}
              </Swiper>
            </section>
          </RevealOnScroll>
        )}

        {/* Sección de Mapa */}
        {project.mapa_url && (
          <RevealOnScroll delay={0.5}>
            <section className="map-section">
              <h2 className="map-title">Ubicación del Proyecto</h2>
              <div className="map-wrapper">
                <iframe
                  src={project.mapa_url}
                  width="100%"
                  height="450"
                  style={{ border: 0 }}
                  allowFullScreen=""
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title={`Ubicación de ${project.titulo}`}
                  className="project-map"
                ></iframe>
              </div>
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

      {/* --- INICIO: JSX DEL LIGHTBOX --- */}
      <AnimatePresence>
        {selectedImage !== null && project.galeria[selectedImage] && (
          <motion.div
            className="lightbox-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={handleCloseLightbox} // Cierra al hacer clic en el fondo
          >
            <motion.div 
              className="lightbox-content"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              transition={{ type: 'spring', stiffness: 300, damping: 25 }}
              onClick={(e) => e.stopPropagation()} // Evita que se cierre al hacer clic en la imagen
            >
              <img 
                src={project.galeria[selectedImage].url} 
                alt={project.galeria[selectedImage].alternativeText || `Galería ${selectedImage + 1}`} 
              />
            </motion.div>

            {/* Botón de Cierre */}
            <button 
              className="lightbox-close" 
              onClick={handleCloseLightbox} 
              aria-label="Cerrar"
            >
              <FaTimes />
            </button>
            
            {/* Navegación */}
            <button 
              className="lightbox-nav prev" 
              onClick={(e) => { e.stopPropagation(); handleLightboxNav(-1); }} 
              aria-label="Anterior"
            >
              <FaArrowLeftLightbox />
            </button>
            <button 
              className="lightbox-nav next" 
              onClick={(e) => { e.stopPropagation(); handleLightboxNav(1); }} 
              aria-label="Siguiente"
            >
              <FaArrowRight />
            </button>
          </motion.div>
        )}
      </AnimatePresence>
      {/* --- FIN: JSX DEL LIGHTBOX --- */}

    </motion.div>
  );
};