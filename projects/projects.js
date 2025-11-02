import { fetchJSON, renderProjects } from '../global.js';

async function loadProjects() {
  try {
    const projects = await fetchJSON('../projects.json');
    const projectsContainer = document.querySelector('.projects');

    if (!projectsContainer) {
      console.error('No .projects container found.');
      return;
    }

    renderProjects(projects, projectsContainer, 2);
  } catch (error) {
    console.error('Error loading projects:', error);
  }
}

loadProjects();