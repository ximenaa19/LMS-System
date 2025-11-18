import { obtenerEstudiante} from "../js/estudiantes";

export function mostrarEstudianteComoTarjetas(contenedor) {
  const estudiantes= obtenerEstudiante();
  contenedor.innerHTML = "";
  estudiantes.forEach(estudiante=> {
    const card = document.createElement("estudiante-card");
    card.setAttribute("data", JSON.stringify(estudiante));
    contenedor.appendChild(card);
  });
}
