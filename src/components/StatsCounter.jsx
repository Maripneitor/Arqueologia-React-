// src/components/StatsCounter.jsx
import React, { useEffect, useRef } from 'react';
import { motion, useInView, animate } from 'framer-motion';
import { RevealOnScroll } from './RevealOnScroll';
import { FaTools, FaHistory, FaPaintBrush } from 'react-icons/fa';
import './StatsCounter.css';

// Componente reutilizable para un número animado
function AnimatedNumber({ value, suffix = '' }) {
  const ref = useRef(null);
  // Se activa 150px antes de entrar en vista
  const isInView = useInView(ref, { once: true, margin: "-150px" }); 

  useEffect(() => {
    if (isInView && ref.current) {
      const node = ref.current;
      
      // Inicia la animación desde 0 hasta el valor objetivo
      const controls = animate(0, value, {
        duration: 2,
        ease: "easeOut",
        onUpdate(latest) {
          node.textContent = Math.round(latest).toString();
        },
        onComplete() {
          // Asegura que el valor final sea exacto y añade el sufijo
          node.textContent = `${value}${suffix}`;
        }
      });
      
      return () => controls.stop();
    }
  }, [isInView, value, suffix]);

  // Inicia mostrando 0
  return <span ref={ref}>0</span>;
}

export const StatsCounter = () => {
  const stats = [
    { id: 1, value: 15, label: 'Proyectos Completados', icon: <FaTools /> },
    { id: 2, value: 500, suffix: '+', label: 'Artefactos Restaurados', icon: <FaPaintBrush /> },
    { id: 3, value: 10, suffix: '+', label: 'Años de Experiencia', icon: <FaHistory /> },
  ];

  return (
    <section className="stats-counter-section">
      <div className="container">
        <RevealOnScroll>
          <div className="stats-grid">
            {stats.map((stat) => (
              <div className="stat-item" key={stat.id}>
                <div className="stat-icon">{stat.icon}</div>
                <div className="stat-number">
                  <AnimatedNumber value={stat.value} suffix={stat.suffix} />
                </div>
                <h3 className="stat-label">{stat.label}</h3>
              </div>
            ))}
          </div>
        </RevealOnScroll>
      </div>
    </section>
  );
};