import { obtenerModulos, guardarModulo, editarModulo, eliminarModulo } from "../js/modules.js";
import { obtenerCursos } from "../js/cursos.js";

export class ModulosView extends HTMLElement {
  connectedCallback() {
    this.cursoId = this.getAttribute("curso-id");
    console.log("Curso ID recibido:", this.cursoId);
    this.render();
    this.cargarCursos();
    this.querySelector("#form-modulo").addEventListener("submit", this.guardarModulo.bind(this));
    this.moduloEditando = null;
  }

  render() {
    this.innerHTML = `
      <style>
        form {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
          gap: 1rem;
          margin-bottom: 2rem;
        }
        h2{
        font-family:'Segoe UI', sans-serif;
        }
        input, textarea, select, button {
          padding: 0.6rem;
          border: 1px solid #ccc;
          border-radius: 5px;
          font-size: 1rem;
        }
        button {
          background-color: #8106f5;
          color: white;
          border: none;
          cursor: pointer;
        }
        button:hover {
          background-color: #5e04b3;
        }
        table {
          width: 100%;
          border-collapse: collapse;
          font-family:'Segoe UI', sans-serif;
        }
        th, td {
          padding: 0.8rem;
          border: 1px solid #ddd;
        }
        th {
          background-color: #f3f1f7;
        }
      </style>

      <h2>Gestión de Módulos</h2>
      <form id="form-modulo">
        <input id="codigo" placeholder="Código del módulo" required />
        <input id="nombre" placeholder="Nombre del módulo" required />
        <textarea id="descripcion" placeholder="Descripción del módulo"></textarea>
        <select id="cursoId" required></select>
        <button type="submit">Guardar Módulo</button>
      </form>

      <table id="tabla-modulos">
        <thead>
          <tr>
            <th>Nombre</th>
            <th>Curso</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody></tbody>
      </table>
    `;
    this.renderTablaModulos();
  }

  cargarCursos() {
    const cursos = obtenerCursos();
    const select = this.querySelector("#cursoId");
    select.innerHTML = `<option value="">Selecciona un curso</option>`;
    cursos.forEach(c => {
      const option = document.createElement("option");
      option.value = c.id;
      option.textContent = c.nombre;
      select.appendChild(option);
    });
  }

  guardarModulo(e) {
    e.preventDefault();
    const modulo = {
      codigo: this.querySelector("#codigo").value.trim(),
      nombre: this.querySelector("#nombre").value.trim(),
      descripcion: this.querySelector("#descripcion").value.trim(),
      cursoId: this.querySelector("#cursoId").value
    };

    if (this.moduloEditando) {
      modulo.id = this.moduloEditando;
      editarModulo(modulo.id, modulo);
      this.moduloEditando = null;
    } else {
      modulo.id = crypto.randomUUID();
      guardarModulo(modulo);
    }

    this.querySelector("#form-modulo").reset();
    this.renderTablaModulos();
  }

  renderTablaModulos() {
    const modulos = obtenerModulos().filter(m => m.cursoId === this.cursoId); // ✅ Solo los del curso
    const cursos = obtenerCursos();
    const curso = cursos.find(c => c.id === this.cursoId);
    const tbody = this.querySelector("#tabla-modulos tbody");
    tbody.innerHTML = "";

    modulos.forEach(modulo => {
      const curso = cursos.find(c => c.id === modulo.cursoId);
      const fila = document.createElement("tr");
      fila.innerHTML = `
        <td>${modulo.nombre}</td>
        <td>${curso ? curso.nombre : "Sin curso"}</td>
        <td>
          <button onclick="window.editarModulo('${modulo.id}')">Editar</button>
          <button onclick="window.eliminarModulo('${modulo.id}')">Eliminar</button>
          <button onclick="window.location.hash = '#lecciones?moduloId=${modulo.id}'">Ver Lecciones</button>          
        </td>
      `;
      tbody.appendChild(fila);
    });
  }

  cargarModuloParaEditar(id) {
    const modulo = obtenerModulos().find(m => m.id === id);
    if (!modulo) return;

    this.querySelector("#codigo").value = modulo.codigo;
    this.querySelector("#nombre").value = modulo.nombre;
    this.querySelector("#descripcion").value = modulo.descripcion;
    this.querySelector("#cursoId").value = modulo.cursoId;

    this.moduloEditando = id;
  }
}

window.editarModulo = function(id) {
  document.querySelector("modulos-view").cargarModuloParaEditar(id);
};

window.eliminarModulo = function(id) {
  eliminarModulo(id);
  document.querySelector("modulos-view").renderTablaModulos();
};

customElements.define("modulos-view", ModulosView);
