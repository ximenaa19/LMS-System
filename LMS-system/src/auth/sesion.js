export function guardarSesion(usuario){
    localStorage.setItem('sesion', JSON.stringify(usuario));
}
export function leerSesion(){
    return JSON.parse(localStorage.getItem(usuario)) || null;
}
 export function cerrarSesion (){
    localStorage.removeItem('sesion');

 }