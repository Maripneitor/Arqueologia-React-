// src/components/Accordion.jsx
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaPlus } from 'react-icons/fa';
import './Accordion.css';

const AccordionItem = ({ item, isExpanded, onToggle }) => {
  const { question, answer } = item;

  const answerVariants = {
    collapsed: { opacity: 0, height: 0, marginTop: 0 },
    expanded: { 
      opacity: 1, 
      height: 'auto', 
      marginTop: 0,
      transition: { duration: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }
    }
  };

  return (
    <div className="accordion-item">
      <button
        className="accordion-question"
        onClick={onToggle}
        aria-expanded={isExpanded}
      >
        <span className="accordion-question-text">{question}</span>
        <motion.span 
          className="accordion-icon"
          animate={{ rotate: isExpanded ? 45 : 0 }}
          transition={{ duration: 0.3 }}
        >
          <FaPlus />
        </motion.span>
      </button>
      <AnimatePresence initial={false}>
        {isExpanded && (
          <motion.section
            className="accordion-answer"
            variants={answerVariants}
            initial="collapsed"
            animate="expanded"
            exit="collapsed"
          >
            <div className="accordion-answer-content">
              <p>{answer}</p>
            </div>
          </motion.section>
        )}
      </AnimatePresence>
    </div>
  );
};

export const Accordion = ({ items }) => {
  const [expandedIndex, setExpandedIndex] = useState(null);

  const handleToggle = (index) => {
    if (expandedIndex === index) {
      setExpandedIndex(null); // Colapsar
    } else {
      setExpandedIndex(index); // Expandir
    }
  };

  return (
    <div className="accordion-container">
      {items.map((item, index) => (
        <AccordionItem
          key={item.question} // Usar la pregunta como key si no hay ID
          item={item}
          isExpanded={expandedIndex === index}
          onToggle={() => handleToggle(index)}
        />
      ))}
    </div>
  );
};