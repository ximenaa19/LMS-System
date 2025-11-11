import { mostrarDocentesComoTarjetas } from "../utils/renderDocentes";
import { cerrarSesion } from "../auth/sesion";
export class DashboardView extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
  }

  connectedCallback() {
    const session = JSON.parse(localStorage.getItem("session"));
    if (!session || !session.loggedIn) {
      window.location.hash = "#login";
      return;
    }

    this.nombreAdmin = session.nombre;
    this.render();

    const contenedor = this.shadowRoot.querySelector("#docentes-container");
    mostrarDocentesComoTarjetas(contenedor);

    window.addEventListener("docentesActualizados", () => {
      mostrarDocentesComoTarjetas(contenedor); 
    });

    this.shadowRoot.querySelector("#logout").addEventListener("click", () => {
      cerrarSesion();
  // reemplaza la entrada actual del historial por public
      history.replaceState(null, '', window.location.pathname + '#public');
      window.location.hash = '#login';
    });

    this.shadowRoot.querySelectorAll("[data-link]").forEach(btn => {
      btn.addEventListener("click", () => {
        window.location.hash = btn.getAttribute("data-link");
      });
    });
  }

  render() {
    this.shadowRoot.innerHTML = `
      <style>
        :host {
          display: flex;
          height: 100vh;
          font-family: Arial, sans-serif;
          background-color: #f4f6f8;
        }

        .sidebar {
          width: 220px;
          background-color: #5a95b1ff;
          color: white;
          padding: 2rem 1rem;
          display: flex;
          flex-direction: column;
          gap: 1.5rem;
        }

        .sidebar h2 {
          font-size: 2rem;
          margin-bottom: 2rem;
        }

        .sidebar button {
          background: none;
          border: none;
          color: white;
          font-size: 1rem;
          text-align: left;
          cursor: pointer;
          padding: 0.5rem ;
          

          
        }

        

        .main {
          flex: 1;
          padding: 2rem;
          overflow-y: auto;
        }

        .main h1 {
          color: #178addff;
          margin-bottom: 1rem;
        }

        .metrics {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
          gap: 1rem;
          margin-bottom: 2rem;
        }

        .metric {
          background-color: white;
          padding: 1rem;
          border-radius: 8px;
          box-shadow: 0 2px 6px rgba(0,0,0,0.1);
        }

        .metric h3 {
          margin: 0;
          font-size: 1.2rem;
          color: #333;
        }

        .metric p {
          margin: 0.5rem 0 0;
          font-size: 0.9rem;
          color: #666;
        }

        .actions {
          background-color: white;
          padding: 1.5rem;
          border-radius: 8px;
          box-shadow: 0 2px 6px rgba(0,0,0,0.1);
        }

        .actions h2 {
          margin-bottom: 1rem;
          color: #148ce2ff;
        }

        .actions button {
          margin-right: 1rem;
          margin-bottom: 1rem;
          padding: 0.7rem 1.2rem;
          background-color: #445debff;
          color: white;
          border: none;
          border-radius: 6px;
          cursor: pointer;
        }

        .actions button:hover {
          background-color: #032596ff;
        }
        
        #docentes-container{
        }

        .logout {
          margin-top: 2rem;
        }

        .logout button {
          background-color: #af0707ee;
          color: white;
          border: none;
          padding: 0.6rem 1rem;
          border-radius: 6px;
          cursor: pointer;
        }

        .logout button:hover {
          background-color: #eb2a2ae7;
        }
      </style>

      <div class="sidebar">
        <h2>Menú</h2>
        <button data-link="#dashboard">Dashboard</button>
        <button data-link="#cursos">Cursos</button>
        <button data-link="#docentes">Docentes</button>
        <button data-link="#administradores">Administradores</button>
      </div>

      <div class="main">
        <h1>Bienvenido/a, ${this.nombreAdmin}</h1>

        <div class="metrics">
          <div class="metric">
            <h3>Cursos Activos</h3>
            <p>42 (↑ 18 este mes)</p>
          </div>
          <div class="metric">
            <h3>Docentes</h3>
            <p>18 (↑ 2 nuevos)</p>
          </div>
          <div class="metric">
            <h3>Estudiantes</h3>
            <p>1,247 (↑ 45 este mes)</p>
          </div>
        </div>

        <div class="actions">
          <h2>Acciones Rápidas</h2>
          <button data-link="#cursos">Crear Curso</button>
          <button data-link="#docentes">Añadir Docente</button>
          <button data-link="#administradores">Añadir Admin</button>
        </div>

        <h2>Docentes</h2>
        <section id="docentes-container"></section>

        <div class="logout">
          <button id="logout">Cerrar sesión</button>
        </div>
      </div>
    `;
  }
}

customElements.define("dashboard-view", DashboardView);
