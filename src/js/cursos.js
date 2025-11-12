export function obtenerCursos() {
  return JSON.parse(localStorage.getItem("cursos")) || [];
}

export function guardarCurso(curso) {
  const cursos = obtenerCursos();
  cursos.push(curso);
  localStorage.setItem("cursos", JSON.stringify(cursos));
}

export function editarCurso(id, datosActualizados) {
  const cursos = obtenerCursos().map(c =>
    c.id === id ? { ...c, ...datosActualizados } : c
  );
  localStorage.setItem("cursos", JSON.stringify(cursos));
}

export function eliminarCurso(id) {
  const cursos = obtenerCursos().filter(c => c.id !== id);
  localStorage.setItem("cursos", JSON.stringify(cursos));
}
