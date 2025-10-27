// src/services/localData.js
import projectsData from '../data/projects.json';
import servicesData from '../data/services.json';
import teamData from '../data/team.json';
import timelineData from '../data/timeline.json';

// Simular delay de API
const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

export const localAPI = {
  // Proyectos
  async getProjects() {
    await delay(500);
    return {
      data: projectsData.proyectos.map(project => ({
        id: project.id,
        attributes: project
      }))
    };
  },

  async getFeaturedProjects() {
    await delay(400);
    const featured = projectsData.proyectos.filter(project => project.es_destacado);
    return {
      data: featured.map(project => ({
        id: project.id,
        attributes: project
      }))
    };
  },

  async getProjectBySlug(slug) {
    await delay(300);
    const project = projectsData.proyectos.find(p => p.slug === slug);
    if (!project) {
      throw new Error('Project not found');
    }
    return {
      data: {
        id: project.id,
        attributes: project
      }
    };
  },

  // Servicios
  async getServices(limit = null) {
    await delay(400);
    let services = servicesData.servicios;
    if (limit) {
      services = services.slice(0, limit);
    }
    return {
      data: services.map(service => ({
        id: service.id,
        attributes: service
      }))
    };
  },

  async getServiceBySlug(slug) {
    await delay(300);
    const service = servicesData.servicios.find(s => s.slug === slug);
    if (!service) {
      throw new Error('Service not found');
    }
    return {
      data: {
        id: service.id,
        attributes: service
      }
    };
  },

  // Equipo
  async getTeam() {
    await delay(400);
    return {
      data: teamData.equipo.map(member => ({
        id: member.id,
        attributes: member
      }))
    };
  },

  // Línea de tiempo
  async getTimeline() {
    await delay(400);
    return {
      data: timelineData.hitos.map(item => ({
        id: item.id,
        attributes: item
      }))
    };
  }
};