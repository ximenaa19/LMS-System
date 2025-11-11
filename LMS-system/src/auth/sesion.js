export function guardarSesion(data) {
  const session = Object.assign({ loggedIn: true }, data);
  localStorage.setItem('session', JSON.stringify(session));
}

export function obtenerSesion() {
  try{
  return JSON.parse(localStorage.getItem('session')) || null;
} catch{ return null;}
}

export function cerrarSesion() {
  localStorage.removeItem('session');
}
