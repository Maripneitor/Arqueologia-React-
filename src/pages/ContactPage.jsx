// src/pages/ContactPage.jsx
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  FaWhatsapp, 
  FaEnvelope, 
  FaPhone, 
  FaMapMarkerAlt,
  FaClock,
  FaPaperPlane
} from 'react-icons/fa';
import './ContactPage.css';

export const ContactPage = () => {
  const [formData, setFormData] = useState({
    nombre: '',
    email: '',
    telefono: '',
    asunto: '',
    mensaje: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simular envío del formulario
    setTimeout(() => {
      alert('¡Mensaje enviado! Te contactaremos pronto.');
      setFormData({
        nombre: '',
        email: '',
        telefono: '',
        asunto: '',
        mensaje: ''
      });
      setIsSubmitting(false);
    }, 2000);
  };

  return (
    <motion.div
      className="contact-page"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
    >
      <div className="container">
        {/* Header de la página */}
        <motion.div
          className="page-header"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="page-title">Contáctanos</h1>
          <p className="page-subtitle">
            Estamos aquí para ayudarte con tus proyectos arqueológicos. 
            No dudes en ponerte en contacto con nosotros.
          </p>
        </motion.div>

        <div className="contact-content">
          {/* Información de contacto y mapa */}
          <motion.div
            className="contact-info-section"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            {/* Mapa */}
            <div className="map-container">
              <h2 className="section-title">Nuestra Ubicación</h2>
              <div className="map-wrapper">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3037.454276299855!2d-3.688345024048059!3d40.41999605537628!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xd4228996f1d5a3b%3A0x1d7a2571e565a9e1!2sMuseo%20Arqueol%C3%B3gico%20Nacional!5e0!3m2!1ses!2ses!4v1700000000000!5m2!1ses!2ses"
                  width="100%"
                  height="450"
                  style={{ border: 0 }}
                  allowFullScreen=""
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Ubicación de Arqueología Moderna"
                  className="contact-map"
                ></iframe>
              </div>
            </div>

            {/* Información de contacto */}
            <div className="contact-details">
              <h2 className="section-title">Información de Contacto</h2>
              
              <div className="contact-items">
                <div className="contact-item">
                  <div className="contact-icon">
                    <FaMapMarkerAlt />
                  </div>
                  <div className="contact-text">
                    <h3>Dirección</h3>
                    <p>Calle Serrano, 13<br />28001 Madrid, España</p>
                  </div>
                </div>

                <div className="contact-item">
                  <div className="contact-icon">
                    <FaPhone />
                  </div>
                  <div className="contact-text">
                    <h3>Teléfono</h3>
                    <p>+52 961-129-0622</p>
                  </div>
                </div>

                <div className="contact-item">
                  <div className="contact-icon">
                    <FaEnvelope />
                  </div>
                  <div className="contact-text">
                    <h3>Email</h3>
                    <p>info@empresa-arqueologia.com</p>
                  </div>
                </div>

                <div className="contact-item">
                  <div className="contact-icon">
                    <FaClock />
                  </div>
                  <div className="contact-text">
                    <h3>Horario de Atención</h3>
                    <p>Lunes - Viernes: 9:00 - 18:00<br />Sábados: 10:00 - 14:00</p>
                  </div>
                </div>
              </div>

              {/* Botón de WhatsApp */}
              <motion.div
                className="whatsapp-section"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <a
                  href="https://wa.me/34123456789"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="whatsapp-button"
                >
                  <FaWhatsapp className="whatsapp-icon" />
                  <span>Chatear por WhatsApp</span>
                </a>
                <p className="whatsapp-description">
                  Respuesta inmediata en horario laboral
                </p>
              </motion.div>
            </div>
          </motion.div>

          {/* Formulario de contacto */}
          <motion.div
            className="contact-form-section"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <h2 className="section-title">Envíanos un Mensaje</h2>
            <form className="contact-form" onSubmit={handleSubmit}>
              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="nombre">Nombre Completo *</label>
                  <input
                    type="text"
                    id="nombre"
                    name="nombre"
                    value={formData.nombre}
                    onChange={handleInputChange}
                    required
                    placeholder="Tu nombre completo"
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="email">Email *</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                    placeholder="tu.email@ejemplo.com"
                  />
                </div>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="telefono">Teléfono</label>
                  <input
                    type="tel"
                    id="telefono"
                    name="telefono"
                    value={formData.telefono}
                    onChange={handleInputChange}
                    placeholder="+34 123 456 789"
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="asunto">Asunto *</label>
                  <select
                    id="asunto"
                    name="asunto"
                    value={formData.asunto}
                    onChange={handleInputChange}
                    required
                  >
                    <option value="">Selecciona un asunto</option>
                    <option value="excavacion">Excavación Arqueológica</option>
                    <option value="analisis">Análisis de Materiales</option>
                    <option value="restauracion">Restauración</option>
                    <option value="consultoria">Consultoría</option>
                    <option value="otros">Otros</option>
                  </select>
                </div>
              </div>

              <div className="form-group">
                <label htmlFor="mensaje">Mensaje *</label>
                <textarea
                  id="mensaje"
                  name="mensaje"
                  value={formData.mensaje}
                  onChange={handleInputChange}
                  required
                  rows="6"
                  placeholder="Describe tu proyecto o consulta..."
                ></textarea>
              </div>

              <motion.button
                type="submit"
                className="submit-button"
                disabled={isSubmitting}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {isSubmitting ? (
                  <>
                    <div className="loading-spinner"></div>
                    Enviando...
                  </>
                ) : (
                  <>
                    <FaPaperPlane />
                    Enviar Mensaje
                  </>
                )}
              </motion.button>
            </form>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
};