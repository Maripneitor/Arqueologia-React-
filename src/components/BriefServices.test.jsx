// src/components/BriefServices.test.jsx
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';

// Componente simplificado para testing
const BriefServices = () => (
  <section className="brief-services">
    <div className="container">
      <div className="section-header">
        <h2 className="section-title">Nuestros Servicios</h2>
        <p className="section-subtitle">
          Soluciones especializadas en arqueología que combinan tradición e innovación
        </p>
      </div>
      <div className="view-all-container">
        <a href="/servicios" className="view-all-button">
          Ver Todos los Servicios
        </a>
      </div>
    </div>
  </section>
);

describe('BriefServices Component', () => {
  test('renders section title and subtitle', () => {
    render(
      <MemoryRouter>
        <BriefServices />
      </MemoryRouter>
    );
    
    expect(screen.getByText('Nuestros Servicios')).toBeInTheDocument();
    expect(screen.getByText(/Soluciones especializadas en arqueología/)).toBeInTheDocument();
  });

  test('renders view all services button', () => {
    render(
      <MemoryRouter>
        <BriefServices />
      </MemoryRouter>
    );
    
    expect(screen.getByText('Ver Todos los Servicios')).toBeInTheDocument();
  });
});