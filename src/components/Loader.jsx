// src/components/Loader.jsx
import React from 'react';
import { motion } from 'framer-motion';
import './Loader.css';

export const Loader = ({ isLoading }) => {
  return (
    <motion.div
      className="loader"
      initial={{ opacity: 1 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5, ease: "easeInOut" }}
    >
      <div className="loader-content">
        <div className="logo-container">
          <motion.h1 
            className="loader-logo"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ 
              duration: 0.8, 
              ease: "easeOut",
              delay: 0.2 
            }}
          >
            Empresa Arqueología
          </motion.h1>
          <motion.div 
            className="loader-spinner"
            initial={{ scale: 0, rotate: -180 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ 
              duration: 1, 
              ease: "easeOut",
              delay: 0.5 
            }}
          />
        </div>
        
        <motion.p 
          className="loader-text"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ 
            duration: 0.6, 
            ease: "easeOut",
            delay: 0.8 
          }}
        >
          Descubriendo el pasado, construyendo el futuro
        </motion.p>
      </div>
    </motion.div>
  );
};