import { obtenerLecciones, guardarLeccion, editarLeccion, eliminarLeccion } from "../js/lecciones.js";
import { obtenerModulos } from "../js/modules.js";

export class LeccionesView extends HTMLElement {
  connectedCallback() {
    const params = new URLSearchParams(location.hash.split("?")[1]);
    this.moduloId = params.get("moduloId"); // ← esto sí captura el ID desde la URL
    this.render();
    this.cargarModulos();
    this.querySelector("#form-leccion").addEventListener("submit", this.guardarLeccion.bind(this));
    this.leccionEditando = null;
    }

  render() {
    this.innerHTML = `   
    <style>
      :host {
        display: block;
        font-family: 'Segoe UI', sans-serif;
        padding: 2rem;
        background-color: #f4f6f8;
        min-height: 100vh;
      }

      h2 {
        font-family:'Segoe UI', sans-serif;
        font-size: 2rem;
        margin-bottom: 1.5rem;
        color: #333;
      }

      form {
        background: white;
        padding: 1.5rem;
        border-radius: 10px;
        box-shadow: 0 2px 8px rgba(0,0,0,0.1);
        margin-bottom: 2rem;
        display: flex;
        flex-direction: column;
        gap: 1rem;
      }

      input, textarea, select {
        padding: 0.75rem;
        border: 1px solid #ccc;
        border-radius: 6px;
        font-size: 1rem;
        width: 100%;
      }

      button[type="submit"] {
        background-color: #8106f5;
        color: white;
        border: none;
        padding: 0.75rem 1.5rem;
        border-radius: 6px;
        font-weight: bold;
        cursor: pointer;
        align-self: flex-start;
      }

      button[type="submit"]:hover {
        background-color: #5e04b3;
      }

      table {
        width: 100%;
        border-collapse: collapse;
        background: white;
        box-shadow: 0 2px 8px rgba(0,0,0,0.1);
        border-radius: 10px;
        overflow: hidden;
        font-family:'Segoe UI', sans-serif;
      }

      th, td {
        padding: 1rem;
        border-bottom: 1px solid #eee;
        text-align: left;
      }

      th {
        background-color: #f3f1f7;
        color: #333;
      }

      td button {
        margin-right: 0.5rem;
        padding: 0.4rem 0.8rem;
        border: none;
        border-radius: 5px;
        cursor: pointer;
        font-size: 0.9rem;
      }

      td button:first-child {
        background-color: #0077cc;
        color: white;
      }

      td button:last-child {
        background-color: #e74c3c;
        color: white;
      }

      td button:hover {
        opacity: 0.9;
      }
    </style>
      <h2>Gestión de Lecciones</h2>
      <form id="form-leccion">
        <input id="titulo" placeholder="Título de la lección" required />
        <textarea id="contenido" placeholder="Contenido de la lección"></textarea>
        <select id="moduloId" required></select>
        <button type="submit">Guardar Lección</button>
      </form>

      <table id="tabla-lecciones">
        <thead>
          <tr>
            <th>Título</th>
            <th>Módulo</th>
            <th>Contenido</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody></tbody>
      </table>
    `;
    this.renderTablaLecciones();
  }

  cargarModulos() {
    const modulos = obtenerModulos();
    const select = this.querySelector("#moduloId");
    select.innerHTML = `<option value="">Selecciona un módulo</option>`;
    modulos.forEach(m => {
      const option = document.createElement("option");
      option.value = m.id;
      option.textContent = m.nombre;
      select.appendChild(option);
    });
  }

  guardarLeccion(e) {
    e.preventDefault();
    const leccion = {
      titulo: this.querySelector("#titulo").value.trim(),
      contenido: this.querySelector("#contenido").value.trim(),
      moduloId: this.querySelector("#moduloId").value
    };

    if (this.leccionEditando) {
      leccion.id = this.leccionEditando;
      editarLeccion(leccion.id, leccion);
      this.leccionEditando = null;
    } else {
      leccion.id = crypto.randomUUID();
      guardarLeccion(leccion);
    }

    this.querySelector("#form-leccion").reset();
    this.renderTablaLecciones();
  }

  renderTablaLecciones() {
    const lecciones = obtenerLecciones().filter(l => l.moduloId === this.moduloId);
    const modulos = obtenerModulos();
    const tbody = this.querySelector("#tabla-lecciones tbody");
    tbody.innerHTML = "";

    lecciones.forEach(leccion => {
      const modulo = modulos.find(m => m.id === leccion.moduloId);
      const fila = document.createElement("tr");
      fila.innerHTML = `
        <td>${leccion.titulo}</td>
        <td>${modulo ? modulo.nombre : "Sin módulo"}</td>
        <td>${leccion.contenido}</td>
        <td>
          <button onclick="window.editarLeccion('${leccion.id}')">Editar</button>
          <button onclick="window.eliminarLeccion('${leccion.id}')">Eliminar</button>
        </td>
      `;
      tbody.appendChild(fila);
    });
  }

  cargarLeccionParaEditar(id) {
    const leccion = obtenerLecciones().find(l => l.id === id);
    if (!leccion) return;

    this.querySelector("#titulo").value = leccion.titulo;
    this.querySelector("#contenido").value = leccion.contenido;
    this.querySelector("#moduloId").value = leccion.moduloId;

    this.leccionEditando = id;
  }
}

window.editarLeccion = function(id) {
  document.querySelector("lecciones-view").cargarLeccionParaEditar(id);
};

window.eliminarLeccion = function(id) {
  eliminarLeccion(id);
  document.querySelector("lecciones-view").renderTablaLecciones();
};

customElements.define("lecciones-view", LeccionesView);
