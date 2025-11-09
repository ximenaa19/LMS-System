 "<head>
    <meta charset="UTF-8" />
    <link rel="icon" type="image/svg+xml" href="/vite.svg" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>lms-system</title>
    <link rel="stylesheet" href="src/css/style.css">
  </head>
  <body>
    
    <header>
      <div class="logo"> LMS ABC</div>
      <nav>
        <a href="#cursos">Cursos</a>
        <a href="#docentes">Docentes</a>
        <a href="login.html" class="btn">Iniciar Sesión</a>
        </nav>
    </header>

    <section class="hero">
      <h1>Descubre Nuevos <br>Conocimientos <br></h1>
      <p>Explora cursos diseñados por expertos, aprende a tu ritmo <br>y alcanza tus metas. <br></p>
      <div class="hero-buttons">
        <a href="#cursos" class="btn">Explorar Cursos</a>
      </div>
    </section>

    <section id="cursos" class="grid-section">
      <h2>Cursos disponibles</h2>
      <div id="cursos-container" class="card-grid"></div>
    </section>

    <section id="docentes" class="grid-section">
      <h2>Nuestros Docentes</h2>
      <div id="docentes-container" class="card-grid"></div>
    </section>

    <footer>
      <p>&copy; 2025 LMS Educativo | Todos los derechos reservados</p>
    </footer>

    <script type="module" src="/src/js/public.js"></script>
  </body> "
import { guardarDato, leerDato } from "./storage";

public js
function inicializarDatos() {
  if (leerDato("cursos").length === 0) {
    guardarDato("cursos", [
      { codigo: "C001", nombre: "Matemáticas", docente: "Ana Torres" },
      { codigo: "C002", nombre: "Lógica", docente: "Luis Pérez" },
      { codigo: "C003", nombre: "Programación", docente: "Carlos Ruiz" }
    ]);
  }

  if (leerDato("docentes").length === 0) {
    guardarDato("docentes", [
      { codigo: "D001", nombre: "Ana Torres", email: "ana15@gmail.com" },
      { codigo: "D002", nombre: "Luis Pérez", email: "luis45@gmail.com" },
      { codigo: "D003", nombre: "Carlos Ruiz", email: "carlos85@gmail.com" }
    ]);
  }
}


function mostrarCursos() {
  const cursos = leerDato("cursos");
  const contenedor = document.getElementById("cursos-container");
}


function mostrarDocentes() {
  const docentes = leerDato("docentes");
  const contenedor = document.getElementById("docentes-container");
}

inicializarDatos();
mostrarCursos();
mostrarDocentes();

public view

class public extends HTMLElement{
    constructor(){
        super();
        this.attachShadow({mode:"open"});

        render () {
            this.shadowRoot.innerHTML = `
            <style>
            section {text-align: left; font-family: 'Segoe UI'; padding: 2rem 2rem; background: linear-gradient(to right, #5b0ab4, #0077cc); color: white;}
            h1 {font-family:'Segoe UI', sans-serif; font-size:4 rem; margin: 4 rem;}
            p{font-size: 1.5rem; margin: 4rem;}
            .hero-buttons .btn,
            .hero-buttons .btn-outline ; margin: 4rem; padding: 1rem 1.5rem; border-radius: 5px; text-decoration: none; font-weight: bold;}
            .btn { background-color: white;color: #8106f5;}
            .btn-outline {border: 2px solid white;color: white; }
            </style>

            <section class="hero">
                <h1>Descubre Nuevos <br>Conocimientos <br></h1>
                <p>Explora cursos diseñados por expertos, aprende a tu ritmo <br>y alcanza tus metas. <br></p>
                <div class="hero-buttons">
                    <a href="#cursos" class="btn">Explorar Cursos</a>
                </div>
            </section>
        
        `
        }
    }
}
customElements.define('publicView', public) 