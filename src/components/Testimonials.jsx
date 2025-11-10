// src/components/Testimonials.jsx
import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Autoplay } from 'swiper/modules';
import { FaQuoteLeft, FaQuoteRight } from 'react-icons/fa';
import { RevealOnScroll } from './RevealOnScroll';

// Importar CSS de Swiper
import 'swiper/css';
import 'swiper/css/pagination';

// Importar CSS local
import './Testimonials.css';

// Datos de ejemplo
const testimonialsData = [
  {
    id: 1,
    quote: "El nivel de detalle y profesionalismo en la restauración de nuestro archivo fotográfico fue excepcional. Superaron nuestras expectativas.",
    author: "Dra. Ana Pérez",
    organization: "Directora, Archivo Histórico"
  },
  {
    id: 2,
    quote: "Su trabajo en la excavación de la Hacienda Bajucú nos proporcionó información invaluable. Un equipo altamente calificado y comprometido.",
    author: "Lic. Marcos Gutiérrez",
    organization: "Coordinador de Patrimonio, UNICACH"
  },
  {
    id: 3,
    quote: "La documentación digital 3D que realizaron es de vanguardia. Nos permite estudiar las piezas sin manipularlas. ¡Increíble!",
    author: "Mtro. Javier López",
    organization: "Curador, Museo Regional"
  }
];

export const Testimonials = () => {
  return (
    <section className="testimonials-section">
      <div className="container">
        <RevealOnScroll>
          <div className="section-header">
            <h2 className="section-title">Lo que dicen nuestros clientes</h2>
          </div>
          <Swiper
            modules={[Pagination, Autoplay]}
            spaceBetween={30}
            slidesPerView={1}
            pagination={{ clickable: true }}
            autoplay={{ delay: 7000, disableOnInteraction: false }}
            loop={true}
            className="testimonials-swiper"
          >
            {testimonialsData.map((testimonial) => (
              <SwiperSlide key={testimonial.id}>
                <div className="testimonial-card">
                  <FaQuoteLeft className="quote-icon quote-left" />
                  <p className="testimonial-quote">{testimonial.quote}</p>
                  <FaQuoteRight className="quote-icon quote-right" />
                  <div className="testimonial-author">
                    <span className="author-name">{testimonial.author}</span>
                    <span className="author-org">{testimonial.organization}</span>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </RevealOnScroll>
      </div>
    </section>
  );
};