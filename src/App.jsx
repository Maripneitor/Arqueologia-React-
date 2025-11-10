// src/App.jsx - CORREGIDO CON NUEVA RUTA DE SERVICIOS
import React, { useState, useEffect, lazy, Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route, Outlet, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { Hero } from './components/Hero';
import { motion } from 'framer-motion';
import { FeaturedProjects } from './components/FeaturedProjects';
import { BriefServices } from './components/BriefServices';
import { Loader } from './components/Loader';
import { RevealOnScroll } from './components/RevealOnScroll'; // Importar RevealOnScroll
import { Link } from 'react-router-dom'; // Importar Link

// Carga diferida de páginas
const AboutUsPage = lazy(() => 
  import('./pages/AboutUsPage').then(module => ({ default: module.AboutUsPage }))
);
const ServicesPage = lazy(() => 
  import('./pages/ServicesPage').then(module => ({ default: module.ServicesPage }))
);
const ProjectsPage = lazy(() => 
  import('./pages/ProjectsPage').then(module => ({ default: module.ProjectsPage }))
);
const ProjectDetailPage = lazy(() => 
  import('./pages/ProjectDetailPage').then(module => ({ default: module.ProjectDetailPage }))
);
const ContactPage = lazy(() => 
  import('./pages/ContactPage').then(module => ({ default: module.ContactPage }))
);

// ===== INICIO DE LA MODIFICACIÓN =====
// 1. AÑADIR NUEVA PÁGINA DE DETALLE DE SERVICIO
const ServiceDetailPage = lazy(() => 
  import('./pages/ServiceDetailPage').then(module => ({ default: module.ServiceDetailPage }))
);
// ===== FIN DE LA MODIFICACIÓN =====


// Componente de carga para Suspense
const PageLoader = () => (
  <div style={{ 
    display: 'flex', 
    alignItems: 'center', 
    justifyContent: 'center', 
    minHeight: '50vh',
    flexDirection: 'column',
    gap: '1rem'
  }}>
    <div className="loading-spinner" style={{
      width: '40px',
      height: '40px',
      border: '3px solid rgba(139, 90, 43, 0.2)',
      borderTop: '3px solid var(--color-bronze)',
      borderRadius: '50%',
      animation: 'spin 1s linear infinite'
    }}></div>
    <p style={{ 
      fontFamily: 'var(--font-secondary)', 
      color: 'var(--color-clay)',
      fontSize: '0.9rem'
    }}>Cargando...</p>
  </div>
);

// Layout Component con useLocation
const Layout = () => {
  const location = useLocation();
  
  return (
    <div className="app-layout">
      <Header />
      <main className="main-content">
        <AnimatePresence mode="wait" initial={false}>
          <Suspense fallback={<PageLoader />}>
            <Outlet key={location.pathname} />
          </Suspense>
        </AnimatePresence>
      </main>
      <Footer />
    </div>
  );
};

// HomePage Component con animaciones
const HomePage = () => (
  <motion.div
    className="home-page"
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    exit={{ opacity: 0 }}
    transition={{ duration: 0.3 }}
  >
    <Hero />
    <FeaturedProjects />
    <BriefServices />

    {/* ===== INICIO DE LA MODIFICACIÓN ===== */}
    {/* 2. MEJORAR EL CTA DEL HOME */}
    <RevealOnScroll>
      <section className="cta-section home-cta">
        <div className="cta-content">
          <h2>¿Listo para comenzar tu proyecto?</h2>
          <p>Contáctanos para más información sobre nuestros servicios arqueológicos</p>
          <div className="cta-buttons">
            <Link to="/contacto" className="cta-button large primary">
              Solicitar Cotización
            </Link>
            <Link to="/proyectos" className="cta-button large secondary">
              Ver Nuestros Proyectos
            </Link>
          </div>
        </div>
      </section>
    </RevealOnScroll>
    {/* ===== FIN DE LA MODIFICACIÓN ===== */}
  </motion.div>
);

function App() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simular tiempo de carga de recursos
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2500); // 2.5 segundos para permitir que las animaciones del loader se completen

    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      <AnimatePresence mode="wait">
        {isLoading && <Loader isLoading={isLoading} />}
      </AnimatePresence>
      
      <Router>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<HomePage />} />
            <Route path="proyectos" element={<ProjectsPage />} />
            <Route path="proyectos/:slug" element={<ProjectDetailPage />} />
            <Route path="nosotros" element={<AboutUsPage />} />
            <Route path="servicios" element={<ServicesPage />} />
            
            {/* ===== INICIO DE LA MODIFICACIÓN ===== */}
            {/* 3. AÑADIR NUEVA RUTA */}
            <Route path="servicios/:slug" element={<ServiceDetailPage />} />
            {/* ===== FIN DE LA MODIFICACIÓN ===== */}
            
            <Route path="contacto" element={<ContactPage />} />
          </Route>
        </Routes>
      </Router>
    </>
  );
}

export default App;