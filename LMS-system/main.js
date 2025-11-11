import './src/views/publicView.js';
import './src/views/loginview.js';
import './src/views/dashboardView.js';
import './src/views/administradoresView.js';
import './src/views/cursosView.js';
import './src/views/docentesView.js';
import './src/components/docenteCard.js';

import { routes } from './src/utils/router.js';
import { obtenerSesion } from './src/auth/sesion.js';

const root = document.querySelector('#root');

function inicializarDatos() {
  if (!localStorage.getItem('docentes')) {
    localStorage.setItem('docentes', JSON.stringify([]));
  }
  if (!localStorage.getItem('administradores')) {
    localStorage.setItem('administradores', JSON.stringify([
      {
        id: 'admin-01',
        identificacion: '123456789',
        nombres: 'Ximena',
        apellidos: 'Afanador',
        email: 'xime@gmail.com',
        cargo: 'Gestora académica',
        contraseña: '123456'
      }
    ]));
  }
}

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
  let path = window.location.hash.replace('#', '') || 'public';

  const session = obtenerSesion();

  const rutaPrivada = (path === 'dashboard' || path === 'administradores');
  if (rutaPrivada && !(session && session.loggedIn)) {
    // si ruta privada y no hay sesión, ir a public (evita bucle atrás/dashboard)
    history.replaceState(null, '', window.location.pathname + '#public');
    window.location.hash = '#public';
    return;
  }

  if (!routes[path]) {
    window.location.hash = '#public';
    return;
  }

  render(path);
}

inicializarDatos();

if (!window.location.hash) {
  window.location.hash = '#public';
}

window.addEventListener('load', resolveRoute);
window.addEventListener('hashchange', resolveRoute);
resolveRoute();
