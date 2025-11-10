// src/components/Footer.test.jsx
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { Footer } from './Footer';

describe('Footer Component', () => {
  test('renders copyright text', () => {
    render(
      <MemoryRouter>
        <Footer />
      </MemoryRouter>
    );
    
    const currentYear = new Date().getFullYear();
    const copyrightText = screen.getByText(/Empresa Arqueología/i);
    expect(copyrightText).toBeInTheDocument();
  });

  test('renders navigation links', () => {
    render(
      <MemoryRouter>
        <Footer />
      </MemoryRouter>
    );
    
    // Usar getAllByText para elementos duplicados
    const contactoElements = screen.getAllByText('Contacto');
    expect(contactoElements.length).toBeGreaterThan(0);
    
    expect(screen.getByText('Inicio')).toBeInTheDocument();
    expect(screen.getByText('Proyectos')).toBeInTheDocument();
    expect(screen.getByText('Nosotros')).toBeInTheDocument();
    expect(screen.getByText('Servicios')).toBeInTheDocument();
  });

  test('renders contact information', () => {
    render(
      <MemoryRouter>
        <Footer />
      </MemoryRouter>
    );
    
    // Usar texto parcial para encontrar el email
    expect(screen.getByText(/info@empresa-arqueologia.com/i)).toBeInTheDocument();
    expect(screen.getByText(/\+52 961-129-0622/i)).toBeInTheDocument();
    expect(screen.getByText(/Madrid, España/i)).toBeInTheDocument();
  });
});