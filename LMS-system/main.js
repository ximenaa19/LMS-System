import './src/views/publicView.js';
import './src/views/loginView.js';
import './src/views/dashboardView.js';
import './src/views/administradoresView.js';
import './src/views/cursosView.js';
import './src/views/docentesView.js';
import { routes } from './src/utils/router.js';

const root = document.querySelector('#root');

function render(route) {
  const tagName = routes[route];
  root.innerHTML = '';
  if (tagName) {
    root.appendChild(document.createElement(tagName));
  } else {
    root.innerHTML = '<h2>Ruta no encontrada</h2>';
  }
}

function resolveRoute() {
  const path = window.location.hash.replace('#', '') || 'public';
  render(path);
}

// ✅ fuerza el hash si no existe
if (!window.location.hash) {
  window.location.hash = '#public';
}

window.addEventListener('DOMContentLoaded', resolveRoute);
window.addEventListener('hashchange', resolveRoute);
