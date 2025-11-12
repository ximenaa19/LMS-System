import { obtenerCursos } from "../js/cursos.js"
import { obtenerModulos } from "../js/modules.js";
import { obtenerLecciones } from "../js/lecciones.js";

export function mostrarCursosComoTarjetas(contenedor) {
  const cursos = obtenerCursos();
  const modulos = obtenerModulos();
  const lecciones = obtenerLecciones();

  contenedor.innerHTML = "";
  cursos.forEach(curso => {
    const cursoModulos = modulos.filter(m => m.cursoId === curso.id);
    const cursoLecciones = lecciones.filter(l => cursoModulos.some(m => m.id === l.moduloId));

    const card = document.createElement("curso-card");
    card.setAttribute("data", JSON.stringify({
      ...curso,
      modulos: cursoModulos,
      lecciones: cursoLecciones
    }));
    contenedor.appendChild(card);
  });
}
