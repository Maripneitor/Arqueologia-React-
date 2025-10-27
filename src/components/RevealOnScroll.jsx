// src/components/RevealOnScroll.jsx
import React from 'react';
import { motion } from 'framer-motion';
import './RevealOnScroll.css';

export const RevealOnScroll = ({ 
  children, 
  delay = 0,
  duration = 0.8,
  yOffset = 75 
}) => {
  const variants = {
    hidden: { 
      opacity: 0, 
      y: yOffset,
      clipPath: 'polygon(0 0, 100% 0, 100% 0, 0 0)'
    },
    visible: { 
      opacity: 1, 
      y: 0,
      clipPath: 'polygon(0 0, 100% 0, 100% 100%, 0 100%)',
      transition: {
        duration: duration,
        ease: [0.25, 0.46, 0.45, 0.94],
        delay: delay
      }
    }
  };

  return (
    <motion.div
      className="reveal-on-scroll"
      variants={variants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-50px" }}
    >
      {children}
    </motion.div>
  );
};