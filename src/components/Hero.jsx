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

  // ===== INICIO DE LA MODIFICACIÓN =====
  // Reemplazamos los datos de Unsplash con los de tus proyectos.
  const slides = [
    {
      id: 1,
      title: "Restauración Catedral de San Cristóbal",
      subtitle: "Preservando nuestro patrimonio cultural",
      // Esta es la nueva ruta a tu imagen en la carpeta 'public'
      image: "/images/Catedral/Sancris08.webp",
      description: "Intervención de elementos arquitectónicos y restauración pictórica de retablos."
    },
    {
      id: 2,
      title: "Hacienda Bajucú",
      subtitle: "Consolidación y restauración histórica",
      // Esta es la nueva ruta a tu imagen en la carpeta 'public'
      image: "/images/hacienda-bajucu/hacienda-bajucu-galeria-02.webp",
      description: "Estabilización de muros, techumbres y recuperación de acabados originales."
    },
    {
      id: 3,
      title: "UNICACH Escuela de Artes",
      subtitle: "Adaptación de espacios patrimoniales",
      // Esta es la nueva ruta a tu imagen en la carpeta 'public'
      image: "/images/unicach-carranza2/unicach-carranza2.webp",
      description: "Balanceando la conservación con las necesidades funcionales modernas."
    }
  ];
  // ===== FIN DE LA MODIFICACIÓN =====

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