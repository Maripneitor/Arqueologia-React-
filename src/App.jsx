// src/App.jsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Outlet } from 'react-router-dom';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { Hero } from './components/Hero';
import { FeaturedProjects } from './components/FeaturedProjects';
import { BriefServices } from './components/BriefServices';
import { ProjectsPage } from './pages/ProjectsPage';
import { ProjectDetailPage } from './pages/ProjectDetailPage'; // Nueva página

// Layout
const Layout = () => {
  return (
    <div className="app-layout">
      <Header />
      <main className="main-content">
        <Outlet /> 
      </main>
      <Footer />
    </div>
  );
};

// HomePage
const HomePage = () => (
  <div className="home-page">
    <Hero />
    <FeaturedProjects />
    <BriefServices />
    <section style={{ padding: '4rem 0', background: 'var(--color-sand)' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 2rem', textAlign: 'center' }}>
        <h2>¿Listo para comenzar tu proyecto?</h2>
        <p>Contáctanos para más información sobre nuestros servicios arqueológicos</p>
      </div>
    </section>
  </div>
);

// Páginas restantes...
const AboutPage = () => <div style={{ padding: '10rem' }}>Página de Nosotros</div>;
const ServicesPage = () => <div style={{ padding: '10rem' }}>Página de Servicios</div>;
const ContactPage = () => <div style={{ padding: '10rem' }}>Página de Contacto</div>;

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<HomePage />} />
          <Route path="proyectos" element={<ProjectsPage />} />
          <Route path="proyectos/:slug" element={<ProjectDetailPage />} /> {/* Nueva ruta */}
          <Route path="nosotros" element={<AboutPage />} />
          <Route path="servicios" element={<ServicesPage />} />
          <Route path="contacto" element={<ContactPage />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;