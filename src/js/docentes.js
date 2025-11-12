export function obtenerDocentes(){
    return JSON.parse(localStorage.getItem("docentes")) || [];

}

export function crearDocente(docente){
    if (!docente.nombres || !docente.apellidos || !docente.email || !docente.area) {
    alert("Faltan datos obligatorios");
    return false;
    }

    const docentes = obtenerDocentes();
    const existe = docentes.some(d => d.email === docente.email || d.codigo=== docente.codigo);
    if (existe){
        alert ("Ya existe un docente con ese correo o código");
        return false;
    }
    docente.id = "docente-" + Date.now();
    docente.cursos = [];
    docentes.push(docente);
    localStorage.setItem("docentes", JSON.stringify(docentes));
    return true;}

export function actualizarDocente(id, datosActualizados){
    const docentes= obtenerDocentes();
    const index = docentes.findIndex(d => d.id === id);
    if (index !== -1){
        docentes[index]= {...docentes[index], ...datosActualizados};
        localStorage.setItem("docentes", JSON.stringify(docentes));
        return true;
    }
    return false;
}

export function eliminarDocente(id){
    const docentes = obtenerDocentes().filter(d => d.id !== id);
  localStorage.setItem("docentes", JSON.stringify(docentes));
}

export function asignarCursoADocente(idDocente, idCurso) {
  const docentes = obtenerDocentes();
  const index = docentes.findIndex(d => d.id === idDocente);
  if (index !== -1 && !docentes[index].cursos.includes(idCurso)) {
    docentes[index].cursos.push(idCurso);
    localStorage.setItem("docentes", JSON.stringify(docentes));
  }}