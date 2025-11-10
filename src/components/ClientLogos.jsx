// src/components/ClientLogos.jsx
import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay } from 'swiper/modules';
import { RevealOnScroll } from './RevealOnScroll';
import 'swiper/css';
import './ClientLogos.css';

// NOTA: He usado marcadores de posición.
// Debes crear la carpeta "public/images/client-logos/"
// y añadir imágenes PNG (preferiblemente) con estos nombres,
// o reemplazar estas URLs por las correctas.
const logos = [
  { id: 1, src: "https://placehold.co/150x60/transparent/8B5A2B?text=UNICACH&font=playfairdisplay", alt: "UNICACH" },
  { id: 2, src: "https://placehold.co/150x60/transparent/8B5A2B?text=INAH&font=playfairdisplay", alt: "INAH" },
  { id: 3, src: "https://placehold.co/150x60/transparent/8B5A2B?text=CONECULTA&font=playfairdisplay", alt: "CONECULTA" },
  { id: 4, src: "https://placehold.co/150x60/transparent/8B5A2B?text=Fundacion+XYZ&font=playfairdisplay", alt: "Fundación XYZ" },
  { id: 5, src: "https://placehold.co/150x60/transparent/8B5A2B?text=UNESCO&font=playfairdisplay", alt: "UNESCO" },
  // Duplicamos para un efecto ticker continuo
  { id: 6, src: "https://placehold.co/150x60/transparent/8B5A2B?text=UNICACH&font=playfairdisplay", alt: "UNICACH" },
  { id: 7, src: "https://placehold.co/150x60/transparent/8B5A2B?text=INAH&font=playfairdisplay", alt: "INAH" },
  { id: 8, src: "https://placehold.co/150x60/transparent/8B5A2B?text=CONECULTA&font=playfairdisplay", alt: "CONECULTA" },
  { id: 9, src: "https://placehold.co/150x60/transparent/8B5A2B?text=Fundacion+XYZ&font=playfairdisplay", alt: "Fundación XYZ" },
  { id: 10, src: "https://placehold.co/150x60/transparent/8B5A2B?text=UNESCO&font=playfairdisplay", alt: "UNESCO" },
];

export const ClientLogos = () => {
  return (
    <section className="client-logos-section">
      <RevealOnScroll>
        <h3 className="client-logos-title">Han confiado en nosotros</h3>
      </RevealOnScroll>
      <div className="client-logos-ticker">
        <Swiper
          modules={[Autoplay]}
          spaceBetween={60}
          slidesPerView={'auto'} // 'auto' es mejor para logos de anchos variables
          loop={true}
          speed={5000} // Velocidad de la transición
          autoplay={{
            delay: 1, // Usar 1ms (o un valor muy bajo) para movimiento continuo
            disableOnInteraction: false,
            pauseOnMouseEnter: true,
          }}
          allowTouchMove={false} // Desactiva el swipe manual
          className="logos-swiper"
        >
          {logos.map((logo) => (
            <SwiperSlide key={logo.id} className="logo-slide">
              <img src={logo.src} alt={logo.alt} className="client-logo" />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
};