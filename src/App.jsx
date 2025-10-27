// src/App.jsx - OPTIMIZADO CON LAZY LOADING
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

// ✅ Carga diferida de páginas con React.lazy
const AboutUsPage = lazy(() => import('./pages/AboutUsPage'));
const ServicesPage = lazy(() => import('./pages/ServicesPage'));
const ProjectsPage = lazy(() => import('./pages/ProjectsPage'));
const ProjectDetailPage = lazy(() => import('./pages/ProjectDetailPage'));
const ContactPage = lazy(() => import('./pages/ContactPage'));

// ✅ Componente de carga para Suspense
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
          {/* ✅ Suspense para carga diferida de páginas */}
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
    <section style={{ padding: '4rem 0', background: 'var(--color-sand)' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 2rem', textAlign: 'center' }}>
        <h2>¿Listo para comenzar tu proyecto?</h2>
        <p>Contáctanos para más información sobre nuestros servicios arqueológicos</p>
      </div>
    </section>
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
            {/* ✅ Rutas con componentes cargados de forma diferida */}
            <Route path="proyectos" element={<ProjectsPage />} />
            <Route path="proyectos/:slug" element={<ProjectDetailPage />} />
            <Route path="nosotros" element={<AboutUsPage />} />
            <Route path="servicios" element={<ServicesPage />} />
            <Route path="contacto" element={<ContactPage />} />
          </Route>
        </Routes>
      </Router>
    </>
  );
}

export default App;