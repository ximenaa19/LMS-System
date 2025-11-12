import { obtenerCursos, guardarCurso, editarCurso, eliminarCurso } from "../js/cursos.js";

export class CursosView extends HTMLElement {
  connectedCallback() {
    this.render();
    this.cargarDocentes();
    this.querySelector("#form-curso").addEventListener("submit", this.guardarCurso.bind(this));
    this.cursoEditando = null; // ✅ Para saber si estamos editando
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
        }
        #tabla-cursos{
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

      <h2>Gestión de Cursos</h2>
      <form id="form-curso">
        <input id="codigo" placeholder="Código del curso" required />
        <input id="nombre" placeholder="Nombre del curso" required />
        <textarea id="descripcion" placeholder="Descripción del curso"></textarea>
        <input id="imagenUrl" placeholder="URL de imagen del curso" />
        <select id="docenteId" required></select>
        <input id="categorias" placeholder="Categorías" />
        <input id="duracion" placeholder="Duración (ej. 40 horas)" />
        <input id="etiquetas" placeholder="Etiquetas" />
        <select id="visibilidad">
          <option value="público">Público</option>
          <option value="privado">Privado</option>
        </select>
        <button type="submit">Guardar Curso</button>
      </form>

      <table id="tabla-cursos">
        <thead>
          <tr>
            <th>Nombre</th>
            <th>Docente</th>
            <th>Estado</th>
            <th>Fecha</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody></tbody>
      </table>
      

    `;
    this.renderTablaCursos();
  }

  cargarDocentes() {
    const docentes = JSON.parse(localStorage.getItem("docentes")) || [];
    const select = this.querySelector("#docenteId");
    select.innerHTML = `<option value="">Selecciona un docente</option>`;
    docentes.forEach(d => {
      const option = document.createElement("option");
      option.value = d.id;
      option.textContent = `${d.nombres} ${d.apellidos}`;
      select.appendChild(option);
    });
  }

  guardarCurso(e) {
    e.preventDefault();
    const curso = {
      codigo: this.querySelector("#codigo").value.trim(),
      nombre: this.querySelector("#nombre").value.trim(),
      descripcion: this.querySelector("#descripcion").value.trim(),
      imagenUrl: this.querySelector("#imagenUrl").value.trim(),
      docenteId: this.querySelector("#docenteId").value,
      categorias: this.querySelector("#categorias").value.split(",").map(c => c.trim()),
      duracion: this.querySelector("#duracion").value.trim(),
      etiquetas: this.querySelector("#etiquetas").value.split(",").map(e => e.trim()),
      visibilidad: this.querySelector("#visibilidad").value,
      fechaCreacion: new Date().toISOString().split("T")[0],
      estado: "activo"
    };

    if (this.cursoEditando) {
      curso.id = this.cursoEditando;
      editarCurso(curso.id, curso);
      this.cursoEditando = null;
    } else {
      curso.id = crypto.randomUUID();
      guardarCurso(curso);
    }

    this.querySelector("#form-curso").reset();
    this.renderTablaCursos();
  }

  renderTablaCursos() {
    const cursos = obtenerCursos();
    const docentes = JSON.parse(localStorage.getItem("docentes")) || [];
    const tbody = this.querySelector("#tabla-cursos tbody");
    tbody.innerHTML = "";

    cursos.forEach(curso => {
      const docente = docentes.find(d => d.id === curso.docenteId);
      const fila = document.createElement("tr");
      fila.innerHTML = `
        <td>${curso.nombre}</td>
        <td>${docente ? docente.nombres : "Sin asignar"}</td>
        <td>${curso.estado}</td>
        <td>${curso.fechaCreacion}</td>
        <td>
          <button onclick="window.editarCurso('${curso.id}')">Editar</button>
          <button onclick="window.eliminarCurso('${curso.id}')">Eliminar</button>
          <button onclick="window.location.hash = '#modulos?cursoId=${curso.id}'">Ver Módulos</button>
        </td>
      `;
      tbody.appendChild(fila);
    });
  }

  cargarCursoParaEditar(id) {
    const curso = obtenerCursos().find(c => c.id === id);
    if (!curso) return;

    this.querySelector("#codigo").value = curso.codigo;
    this.querySelector("#nombre").value = curso.nombre;
    this.querySelector("#descripcion").value = curso.descripcion;
    this.querySelector("#docenteId").value = curso.docenteId;
    this.querySelector("#categorias").value = curso.categorias.join(", ");
    this.querySelector("#duracion").value = curso.duracion;
    this.querySelector("#etiquetas").value = curso.etiquetas.join(", ");
    this.querySelector("#visibilidad").value = curso.visibilidad;

    this.cursoEditando = id;
  }
}

window.editarCurso = function(id) {
  document.querySelector("cursos-view").cargarCursoParaEditar(id);
};

window.eliminarCurso = function(id) {
  eliminarCurso(id);
  document.querySelector("cursos-view").renderTablaCursos();
};
window.verModulos = function(cursoId) {
  const contenedor = document.getElementById("vista-principal"); // 👈 Este debe ser tu contenedor principal
  contenedor.innerHTML = "";
  const vista = document.createElement("modulos-view");
  vista.setAttribute("curso-id", cursoId); // 👈 Le pasamos el ID del curso
  contenedor.appendChild(vista);
};


customElements.define("cursos-view", CursosView);
