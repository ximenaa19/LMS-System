export function obtenerModulos() {
  return JSON.parse(localStorage.getItem("modulos")) || [];
}

export function guardarModulo(modulo) {
  const modulos = obtenerModulos();
  modulos.push(modulo);
  localStorage.setItem("modulos", JSON.stringify(modulos));
}

export function editarModulo(id, datosActualizados) {
  const modulos = obtenerModulos().map(m =>
    m.id === id ? { ...m, ...datosActualizados } : m
  );
  localStorage.setItem("modulos", JSON.stringify(modulos));
}

export function eliminarModulo(id) {
  const modulos = obtenerModulos().filter(m => m.id !== id);
  localStorage.setItem("modulos", JSON.stringify(modulos));
}
