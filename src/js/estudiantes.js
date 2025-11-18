export function obtenerEstudiante(){
    return JSON.parse(localStorage.getItem("estuadiantes")) || [];

}

export function crearDocente(estudiante){
    if (!estudiante.nombres || !estudiante.apellidos || !estudiante.genero || !estudiante.telefono) {
    alert("Faltan datos obligatorios");
    return false;
    }

    const estudiante= obtenerEstudiante();
    const existe = estudiante.some(d => d.telefono === estudiante.telefono || d.codigo=== estudiante.codigo);
    if (existe){
        alert ("Ya existe un estudiante con ese numero de telefono o codigo");
        return false;
    }
    estudiante.id = "estudiante-" + Date.now();
    estudiante.cursos = [];
    estudiante.push(estudiante);
    localStorage.setItem("estudiante", JSON.stringify(estudiantes));
    return true;}

export function actualizarEstudiante(id, datosActualizados){
    const estudiantes= obtenerEstudiante();
    const index = est.findIndex(d => d.id === id);
    if (index !== -1){
        estudiantes[index]= {...estudiantes[index], ...datosActualizados};
        localStorage.setItem("estudiantes", JSON.stringify(estudiantes));
        return true;
    }
    return false;
}

export function eliminarEstudiante(id){
    const estudiantes = obtenerEstudiante().filter(d => d.id !== id);
  localStorage.setItem("estudiantes", JSON.stringify(estudiantes));
}

export function asignarCursoAEstudiante(idEstudiante, idCurso) {
  const estuadiantes = obtenerEstudiante();
  const index = estuadiantes.findIndex(d => d.id === idEstudiante);
  if (index !== -1 && !estuadiantes[index].cursos.includes(idCurso)) {
    estuadiantes[index].cursos.push(idCurso);
    localStorage.setItem("estudiantes", JSON.stringify(estudiantes));
  }}