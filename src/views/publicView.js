import { mostrarDocentesComoTarjetas } from "../utils/renderDocentes";
import { mostrarCursosComoTarjetas } from "../utils/renderCursos.js";


class PublicView extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
  }

  connectedCallback() {
     this.render();
     const cursosContenedor = this.shadowRoot.querySelector("#cursos-container");
     mostrarCursosComoTarjetas(cursosContenedor);

     window.addEventListener("cursosActualizados", () => {
     mostrarCursosComoTarjetas(cursosContenedor);
     });

     const contenedor = this.shadowRoot.querySelector("#docentes-container");
     mostrarDocentesComoTarjetas(contenedor);

     window.addEventListener("docentesActualizados", () => {
      mostrarDocentesComoTarjetas(contenedor); 
     });
    }

    render(){
    this.shadowRoot.innerHTML = `

    <style>
        :host {
        display: block;
        width: 100vw;
        min-height: 100vh;
        margin: 0;
        padding: 0;
        overflow-x: hidden;
        background-color: #f4f6f8; /* o el color base que estés usando */
        }

        * {
        box-sizing: border-box;
        margin: 0;
        padding: 0;
        }


        header {
        font-family:'Segoe UI', sans-serif;
        background-color: #f3f1f7;
        color: rgb(38, 38, 38);
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 1rem 2rem;
        width:100%
        }

        header .logo {
        font-size: 1.5rem;
        font-weight: bold;
        }

        nav a {
        color: rgb(38, 38, 38);
        margin-left: 1rem;
        text-decoration: none;
        
        }

        nav .btn {
        background-color: #8106f5;
        color: white;
        padding: 0.5rem 1rem;
        border-radius: 5px;
        margin-left: 1rem;
        }

        .hero {
        
        font-family:'Segoe UI', sans-serif;
        text-align: left;
        padding: 2rem 2rem;
        background: linear-gradient(to right, #5b04ab, #0077cc);
        color: white;
        width:100%
        
        }
        h1{
        font-size: 4rem;
        margin: 4rem;


        }
        p{
        font-size: 1.5rem;
        margin: 4rem;
    
        }

        .hero-buttons .btn,
        .hero-buttons .btn-outline {
        margin: 4rem;
        padding: 1rem 1.5rem;
        border-radius: 5px;
        text-decoration: none;
        font-weight: bold;
        background-color: white;
        color: #8106f5;
        }

        .grid-section {
        padding: 2rem;
        font-family:'Segoe UI', sans-serif;

        }
        #docentes-container{
        display: flex;
        flex-wrap: wrap; 
        gap: 1rem;       
        justify-content: center; 
        padding: 1rem;
        }
        
        #cursos-container{
          display: flex;
          flex-wrap: wrap;
          gap: 1rem;      
          justify-content: center; 
          padding: 1rem;
        }

        footer {
        font-family:'Segoe UI', sans-serif;
        text-align: center;
        padding: 1rem;
        background-color: #004080;
        color: white;
        height:100%
        width:100%
        }
  
    </style>
        <header>
            <div class="logo"> LMS ABC</div>
            <nav>
                <a href="#public">Cursos</a>
                <a href="#public">Docentes</a>
                <a href="#login" class="btn">Iniciar Sesión</a>
            </nav>
        </header>

        <section class="hero">
            <h1>Descubre Nuevos <br>Conocimientos <br></h1>
            <p>Explora cursos diseñados por expertos, aprende a tu ritmo <br>y alcanza tus metas. <br></p>
            <div class="hero-buttons">
                <a href="#public" class="btn">Explorar Cursos</a>
            </div>
        </section>

        <section id="cursos" class="grid-section">
            <h2>Cursos disponibles</h2>  
            <div id="cursos-container"></div>
        </section>

        <section class="grid-section">
            <h2>Nuestros Docentes</h2>
            <div id="docentes-container"></div>
        </section>

        <footer>
            <p>&copy; 2025 LMS Educativo | Todos los derechos reservados</p>
        </footer>


    `;
  }
}



customElements.define("public-view", PublicView);
