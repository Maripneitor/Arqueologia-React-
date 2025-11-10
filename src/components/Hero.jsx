// src/components/Hero.jsx
import React, { useRef, useState, useCallback } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Swiper, SwiperSlide } from 'swiper/react';
import { EffectFade, Autoplay, Navigation, Pagination } from 'swiper/modules';
import { Link } from 'react-router-dom';
import { FaArrowDown } from 'react-icons/fa'; // <--- 1. IMPORTAR FLECHA

// Importaciones CSS de Swiper
import 'swiper/css';
import 'swiper/css/effect-fade';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

import './Hero.css';

export const Hero = () => {
  const heroRef = useRef(null);
  const [loadedImages, setLoadedImages] = useState({});
  
  const { scrollY } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"]
  });

  const y = useTransform(scrollY, [0, 1], ['0%', '20%']);

  const handleImageLoad = useCallback((imageId) => {
    setLoadedImages(prev => ({ ...prev, [imageId]: true }));
  }, []);

  const slides = [
    {
      id: 1,
      title: "Restauración Catedral de San Cristóbal",
      subtitle: "Preservando nuestro patrimonio cultural",
      image: "/images/Catedral/catedral-galeria-01.webp",
      description: "Intervención de elementos arquitectónicos y restauración pictórica de retablos."
    },
    {
      id: 2,
      title: "Hacienda Bajucú",
      subtitle: "Consolidación y restauración histórica",
      image: "/images/hacienda-bajucu/hacienda-bajucu-galeria-02.webp",
      description: "Estabilización de muros, techumbres y recuperación de acabados originales."
    },
    {
      id: 3,
      title: "UNICACH Escuela de Artes",
      subtitle: "Adaptación de espacios patrimoniales",
      image: "/images/unicach-carranza2/unicach-carranza2-galeria-01.webp",
      description: "Balanceando la conservación con las necesidades funcionales modernas."
    }
  ];

  const textMaskVariants = {
    hidden: { y: 100, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { duration: 1, ease: [0.25, 0.46, 0.45, 0.94] }}
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.3, delayChildren: 0.2 }}
  };

  const imageVariants = {
    hidden: { scale: 1.1 },
    visible: { scale: 1, transition: { duration: 1.5, ease: "easeOut" }}
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
          pauseOnMouseEnter: true
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
                loading="eager"
                onLoad={() => handleImageLoad(slide.id)}
              />
              <div className="hero-overlay"></div>
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
                key={slide.id}
              >
                <div className="title-mask">
                  <motion.h1
                    className="hero-title"
                    variants={textMaskVariants}
                  >
                    {slide.title}
                  </motion.h1>
                </div>
                {/* ... (resto del contenido de texto) ... */}
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
                  <Link to="/proyectos" className="hero-cta">
                    Explorar Proyectos
                  </Link>
                </motion.div>
              </motion.div>
            </div>
          </SwiperSlide>
        ))}
        
        <div className="swiper-button-next"></div>
        <div className="swiper-button-prev"></div>
      </Swiper>
      
      {/* ===== 2. AÑADIR INDICADOR DE SCROLL AQUÍ ===== */}
      <motion.div 
        className="scroll-indicator"
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 2.5, duration: 0.5, repeat: Infinity, repeatType: "reverse", ease: "easeInOut" }}
      >
        <FaArrowDown />
      </motion.div>
      {/* =========================================== */}
    </section>
  );
};