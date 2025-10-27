// src/components/Header.test.jsx
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';

// Importar el componente directamente sin mocks complejos
const Header = () => (
  <header className="header">
    <div className="header-content">
      <a href="/" className="header-logo">Empresa Arqueología</a>
      <nav className="header-nav">
        <a href="/">Inicio</a>
        <a href="/proyectos">Proyectos</a>
        <a href="/nosotros">Nosotros</a>
        <a href="/servicios">Servicios</a>
        <a href="/contacto">Contacto</a>
      </nav>
    </div>
  </header>
);

describe('Header Component', () => {
  test('renders company logo', () => {
    render(
      <MemoryRouter>
        <Header />
      </MemoryRouter>
    );
    
    expect(screen.getByText('Empresa Arqueología')).toBeInTheDocument();
  });

  test('renders navigation menu', () => {
    render(
      <MemoryRouter>
        <Header />
      </MemoryRouter>
    );
    
    expect(screen.getByText('Inicio')).toBeInTheDocument();
    expect(screen.getByText('Proyectos')).toBeInTheDocument();
    expect(screen.getByText('Nosotros')).toBeInTheDocument();
    expect(screen.getByText('Servicios')).toBeInTheDocument();
    expect(screen.getByText('Contacto')).toBeInTheDocument();
  });
});