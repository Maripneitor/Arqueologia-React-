// src/components/Hero.jsx
import React, { useRef, useState, useCallback } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Swiper, SwiperSlide } from 'swiper/react';
import { EffectFade, Autoplay, Navigation, Pagination } from 'swiper/modules';

// Importaciones CSS de Swiper - CORREGIDO
import 'swiper/css';
import 'swiper/css/effect-fade';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

import './Hero.css';

export const Hero = () => {
  const heroRef = useRef(null);
  const [loadedImages, setLoadedImages] = useState({});
  
  // Configuración mejorada del parallax - CORREGIDO
  const { scrollY } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"]
  });

  const y = useTransform(scrollY, [0, 1], ['0%', '20%']);

  // Manejo de carga de imágenes - MEJORA
  const handleImageLoad = useCallback((imageId) => {
    setLoadedImages(prev => ({ ...prev, [imageId]: true }));
  }, []);

  const slides = [
    {
      id: 1,
      title: "Descubre Civilizaciones Perdidas",
      subtitle: "Explorando los misterios del pasado",
      image: "https://images.unsplash.com/photo-1532996122724-e3c354a0b15b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
      description: "Sumérgete en la historia de antiguas civilizaciones y descubre tesoros arqueológicos únicos."
    },
    {
      id: 2,
      title: "Excavaciones Arqueológicas",
      subtitle: "Preservando nuestro patrimonio cultural",
      image: "https://images.unsplash.com/photo-1583324114697-6d44a77e7d13?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
      description: "Trabajamos meticulosamente para desenterrar y conservar los secretos del pasado."
    },
    {
      id: 3,
      title: "Tecnología y Arqueología",
      subtitle: "Innovación al servicio de la historia",
      image: "https://images.unsplash.com/photo-1611273426858-450d8e3c9fce?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
      description: "Combinamos técnicas tradicionales con tecnología de vanguardia para descubrir la verdad histórica."
    }
  ];

  // Variantes mejoradas para animaciones - CORREGIDO
  const textMaskVariants = {
    hidden: { 
      y: 100,
      opacity: 0
    },
    visible: { 
      y: 0,
      opacity: 1,
      transition: {
        duration: 1,
        ease: [0.25, 0.46, 0.45, 0.94]
      }
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3,
        delayChildren: 0.2
      }
    }
  };

  const imageVariants = {
    hidden: { scale: 1.1 },
    visible: {
      scale: 1,
      transition: {
        duration: 1.5,
        ease: "easeOut"
      }
    }
  };

  return (
    <section ref={heroRef} className="hero">
      <Swiper
        modules={[EffectFade, Autoplay, Navigation, Pagination]}
        effect={'fade'}
        speed={1200}
        autoplay={{
          delay: 6000,
          disableOnInteraction: false,
          pauseOnMouseEnter: true // MEJORA: pausar al interactuar
        }}
        loop={true}
        navigation={{
          nextEl: '.swiper-button-next',
          prevEl: '.swiper-button-prev',
        }}
        pagination={{ 
          clickable: true,
          dynamicBullets: true,
          renderBullet: function (index, className) {
            return `<span class="${className}"><i></i></span>`;
          }
        }}
        className="hero-swiper"
        onSlideChange={(swiper) => {
          // Reiniciar animaciones al cambiar slide
          const activeSlide = slides[swiper.realIndex];
          if (activeSlide && !loadedImages[activeSlide.id]) {
            handleImageLoad(activeSlide.id);
          }
        }}
      >
        {slides.map((slide) => (
          <SwiperSlide key={slide.id} className="hero-slide">
            <motion.div 
              className="hero-background"
              style={{ y }}
              variants={imageVariants}
              initial="hidden"
              animate="visible"
            >
              <img 
                src={slide.image} 
                alt={slide.title}
                className="hero-image"
                loading="eager" // MEJORA: carga prioritaria
                onLoad={() => handleImageLoad(slide.id)}
              />
              <div className="hero-overlay"></div>
              {/* Loading state - MEJORA */}
              {!loadedImages[slide.id] && (
                <div className="image-loading">
                  <div className="loading-spinner"></div>
                </div>
              )}
            </motion.div>

            <div className="hero-content">
              <motion.div
                className="text-container"
                variants={containerVariants}
                initial="hidden"
                animate={loadedImages[slide.id] ? "visible" : "hidden"}
                key={slide.id} // MEJORA: forzar re-render
              >
                <div className="title-mask">
                  <motion.h1
                    className="hero-title"
                    variants={textMaskVariants}
                  >
                    {slide.title}
                  </motion.h1>
                </div>

                <div className="subtitle-mask">
                  <motion.h2
                    className="hero-subtitle"
                    variants={textMaskVariants}
                  >
                    {slide.subtitle}
                  </motion.h2>
                </div>

                <div className="description-mask">
                  <motion.p
                    className="hero-description"
                    variants={textMaskVariants}
                  >
                    {slide.description}
                  </motion.p>
                </div>

                <motion.div
                  className="cta-mask"
                  variants={textMaskVariants}
                >
                  <button className="hero-cta">
                    Explorar Proyectos
                  </button>
                </motion.div>
              </motion.div>
            </div>
          </SwiperSlide>
        ))}
        
        {/* Controles de navegación personalizados - MEJORA */}
        <div className="swiper-button-next"></div>
        <div className="swiper-button-prev"></div>
      </Swiper>
    </section>
  );
};