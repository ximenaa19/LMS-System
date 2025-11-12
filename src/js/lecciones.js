export function obtenerLecciones() {
  return JSON.parse(localStorage.getItem("lecciones")) || [];
}

export function guardarLeccion(leccion) {
  const lecciones = obtenerLecciones();
  lecciones.push(leccion);
  localStorage.setItem("lecciones", JSON.stringify(lecciones));
}

export function editarLeccion(id, datosActualizados) {
  const lecciones = obtenerLecciones().map(l =>
    l.id === id ? { ...l, ...datosActualizados } : l
  );
  localStorage.setItem("lecciones", JSON.stringify(lecciones));
}

export function eliminarLeccion(id) {
  const lecciones = obtenerLecciones().filter(l => l.id !== id);
  localStorage.setItem("lecciones", JSON.stringify(lecciones));
}
