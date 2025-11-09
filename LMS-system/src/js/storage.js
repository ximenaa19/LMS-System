export function guardarDato(clave, valor){
    localStorage.setItem(clave, JSON.stringify(valor));

}
export function leerDato( clave){
    return JSON.parse(localStorage.getItem(clave)) || [];

} 