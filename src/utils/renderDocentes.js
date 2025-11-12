import { obtenerDocentes } from "../js/docentes";

export function mostrarDocentesComoTarjetas(contenedor) {
  const docentes = obtenerDocentes();
  contenedor.innerHTML = "";
  docentes.forEach(docente => {
    const card = document.createElement("docente-card");
    card.setAttribute("data", JSON.stringify(docente));
    contenedor.appendChild(card);
  });
}
