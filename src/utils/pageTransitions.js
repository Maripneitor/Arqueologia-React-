// src/utils/pageTransitions.js
// Este archivo define las animaciones de deslizamiento
// que usaremos en todas las páginas.

export const pageSlideVariants = {
  initial: { 
    opacity: 0, 
    x: "50vw", // Inicia desde la derecha
    scale: 0.98 
  },
  in: { 
    opacity: 1, 
    x: 0,
    scale: 1,
  },
  out: { 
    opacity: 0, 
    x: "-50vw", // Sale hacia la izquierda
    scale: 0.98
  }
};

export const pageTransition = {
  type: "tween",
  ease: "anticipate", // Un 'ease' que da un efecto suave
  duration: 0.6
};