import './src/views/publicView.js';
import './src/views/loginview.js';
import './src/views/dashboardView.js';
import './src/views/administradoresView.js';
import './src/views/cursosView.js';
import './src/views/docentesView.js';
import './src/components/docenteCard.js';
import './src/views/modulosViews.js';
import './src/components/cursoCard.js';
import './src/views/leccionesViews.js';
import './src/views/estudiantesView.js';
import './src/components/estudianteCard.js';


import { routes } from './src/utils/router.js';
import { obtenerSesion } from './src/auth/sesion.js';

const root = document.querySelector('#root');

function inicializarDatos() {
  if (!localStorage.getItem("administradores")) {
    localStorage.setItem("administradores", JSON.stringify([
      {
        id: "admin-01",
        identificacion: "123456789",
        nombres: "Ximena",
        apellidos: "Afanador",
        email: "xime@gmail.com",
        cargo: "Gestora académica",
        contraseña: "123456"
      }
    ]));
  }

  if (!localStorage.getItem("docentes")) {
    localStorage.setItem("docentes", `[{"codigo":"001","identificacion":"12354","nombres":"Felipe","apellidos":"Castillo","email":"felipe@gmail.com","foto":"https://i.pinimg.com/736x/44/15/57/441557cb12f2d439695026f98ff161d7.jpg","area":"Biologia","id":"docente-1762894484881","cursos":[]},{"codigo":"002","identificacion":"12345678","nombres":"Gabriela","apellidos":"Escobar","email":"gabi@gmail.com","foto":"https://i.pinimg.com/736x/45/4e/0c/454e0c54cd18018d82285d27bd1109bb.jpg","area":"Matemáticas","id":"docente-1762898681755","cursos":[]},{"codigo":"003","identificacion":"65479","nombres":"Juan","apellidos":"Torres","email":"juan@gmail.com","foto":"https://i.pinimg.com/736x/ac/4e/ba/ac4ebaf46561a0ea3617ed706b7ff37d.jpg","area":"Robotica","id":"docente-1762898779067","cursos":[]},{"codigo":"004","identificacion":"6198","nombres":"Ana Maria","apellidos":"Sandoval","email":"ana@gmail.com","foto":"https://i.pinimg.com/1200x/71/38/4b/71384b4553fa124b73328ce94354f91a.jpg","area":"Fisica","id":"docente-1762898882154","cursos":[]},{"codigo":"005","identificacion":"54698","nombres":"Carlos","apellidos":"Torres","email":"carlitos@gmail.com","foto":"https://i.pinimg.com/736x/a2/b4/4a/a2b44a4d0262e81d4910970e81ed3d35.jpg","area":"Quimica","id":"docente-1762898960811","cursos":[]},{"codigo":"006","identificacion":"12698","nombres":"Rebecca","apellidos":"Nuñez","email":"reb@gmail.com","foto":"https://i.pinimg.com/1200x/55/79/1c/55791c375cecbd8826b9201f632461e6.jpg","area":"Ingles","id":"docente-1762899043475","cursos":[]}]`);
  }

  if (!localStorage.getItem("cursos")) {
    localStorage.setItem("cursos", `[{"codigo":"01","nombre":"Biología Celular","descripcion":"Curso introductorio sobre la estructura y función de las células en organismos vivos.","docenteId":"docente-1762894484881","categorias":["Ciencias Naturales","Biología"],"duracion":"40 horas","etiquetas":["célula","microscopía","ADN"],"visibilidad":"público","fechaCreacion":"2025-11-12","estado":"activo","id":"eba350f7-6853-4974-bd71-b1adb89f6389","imagenUrl":"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSJ6fB1vXseo6LZyy0C8RwvhdTgL1jMUl0XvA&s"},{"codigo":"02","nombre":"Psicología del Aprendizaje","descripcion":"Explora cómo las personas aprenden, desde teorías clásicas hasta aplicaciones modernas en educación.","imagenUrl":"https://www.anahuac.mx/mexico/sites/default/files/noticias/PSI_Dia_Psicologo.jpg","docenteId":"docente-1762898882154","categorias":[""],"duracion":"8 semanas","etiquetas":[""],"visibilidad":"público","fechaCreacion":"2025-11-12","estado":"activo","id":"98c570f7-c4e2-4081-bc11-cc0ff48cc872"}]`);
  }

  if (!localStorage.getItem("modulos")) {
    localStorage.setItem("modulos", `[{"codigo":"BIO-01","nombre":"Introducción a la célula","descripcion":"Estudia la estructura y función celular.","cursoId":"eba350f7-6853-4974-bd71-b1adb89f6389","id":"7214085a-f498-415e-a202-48d4b92eed2d"},{"codigo":"MD-01","nombre":"Teorías del Aprendizaje","descripcion":"Explora cómo las personas aprenden, desde teorías clásicas hasta aplicaciones modernas en educación.","cursoId":"98c570f7-c4e2-4081-bc11-cc0ff48cc872","id":"b86553f6-d321-479a-8553-4307a3ef5011"}]`);
  }

  if (!localStorage.getItem("lecciones")) {
    localStorage.setItem("lecciones", `[{"titulo":"Que es una celula","contenido":"bla bla bla","moduloId":"7214085a-f498-415e-a202-48d4b92eed2d","id":"74ab2448-ecfa-4381-bf54-35cbde415274"},{"titulo":"Conductismo vs Constructivismo","contenido":"lalalalala","moduloId":"b86553f6-d321-479a-8553-4307a3ef5011","id":"a487c6b4-2f03-4cc8-b8b1-bd9f34b7bf46"}]`);
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
function renderConParametros(path) {
  const [route, query] = path.split('?');
  const tagName = routes[route];
  root.innerHTML = '';

  if (route === 'modulos' && query?.startsWith('cursoId=')) {
    const cursoId = query.split('=')[1];
    const vista = document.createElement('modulos-view');
    vista.setAttribute('curso-id', cursoId);
    root.appendChild(vista);
    return;
  }

  // Si no es una ruta con parámetros, usa el render normal
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

  const [routeBase] = path.split('?');
  if (!routes[routeBase]) {
    window.location.hash = '#public';
    return;
  }


  renderConParametros(path);
}

inicializarDatos();

if (!window.location.hash) {
  window.location.hash = '#public';
}

window.addEventListener('load', resolveRoute);
window.addEventListener('hashchange', resolveRoute);
resolveRoute();
