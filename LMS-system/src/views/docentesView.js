import { obtenerDocentes,
    crearDocente,
    actualizarDocente,
    eliminarDocente,
    asignarCursoADocente
 } from "../js/docentes";


export class DocentesView extends HTMLElement {
  
  connectedCallback() {
    this.render();
    this.cargarDocentes();
    this.configurarEventos();
  }

  render() {
    this.innerHTML = `
      <h2>Gestión de Docentes</h2>
      <form id="form-docente">
        <input id="codigo" placeholder="Código" required />
        <input id="identificacion" placeholder="Identificación" required />
        <input id="nombres" placeholder="Nombres" required />
        <input id="apellidos" placeholder="Apellidos" required />
        <input id="email" placeholder="Correo" required />
        <input id="foto" placeholder="URL de la foto" />
        <select id="area">
          <option value="Biología">Biología</option>
          <option value="Informática">Informática</option>
          <option value="Matemáticas">Matemáticas</option>
        </select>
        <button type="submit">Guardar</button>
      </form>
      <table id="tabla-docentes">
        <thead><tr><th>Nombre</th><th>Email</th><th>Área</th><th>Acciones</th></tr></thead>
        <tbody></tbody>
      </table>
    `;
  }


 cargarDocentes() {
    const tbody = this.querySelector("#tabla-docentes tbody");
    tbody.innerHTML = "";
    obtenerDocentes().forEach(docente => {
      const fila = document.createElement("tr");
      fila.innerHTML = `
        <td>${docente.nombres} ${docente.apellidos}</td>
        <td>${docente.email}</td>
        <td>${docente.area}</td>
        <td>
          <button data-id="${docente.id}" class="editar">editar</button>
          <button data-id="${docente.id}" class="eliminar">eliminar</button>
        </td>
      `;
      tbody.appendChild(fila);
    });
  }

  configurarEventos() {
  const form = this.querySelector("#form-docente");

  form.addEventListener("submit", (e) => {
    e.preventDefault();

    const nuevo = {
      codigo: this.querySelector("#codigo").value.trim(),
      identificacion: this.querySelector("#identificacion").value.trim(),
      nombres: this.querySelector("#nombres").value.trim(),
      apellidos: this.querySelector("#apellidos").value.trim(),
      email: this.querySelector("#email").value.trim(),
      foto: this.querySelector("#foto").value.trim(),
      area: this.querySelector("#area").value
    };

    const idEditando = form.dataset.editando;

    if (idEditando) {
      // ✅ Actualiza docente existente
      actualizarDocente(idEditando, nuevo);
      delete form.dataset.editando;
    } else {
      // ✅ Crea nuevo docente
      const creado = crearDocente(nuevo);
      if (!creado) {
        alert("No se pudo guardar el docente. Verifica los datos.");
        return;
      }
    }

    this.cargarDocentes();
    window.dispatchEvent(new Event("docentesActualizados")); // ✅ Actualiza tarjetas
    form.reset();
    });

  this.addEventListener("click", (e) => {
    const id = e.target.dataset.id;

    if (e.target.classList.contains("eliminar")) {
      // ✅ Elimina docente
      eliminarDocente(id);
      this.cargarDocentes();
      window.dispatchEvent(new Event("docentesActualizados"));
    }

    if (e.target.classList.contains("editar")) {
      // ✅ Carga datos en el formulario para editar
      const docente = obtenerDocentes().find(d => d.id === id);
      if (docente) {
        this.querySelector("#codigo").value = docente.codigo;
        this.querySelector("#identificacion").value = docente.identificacion;
        this.querySelector("#nombres").value = docente.nombres;
        this.querySelector("#apellidos").value = docente.apellidos;
        this.querySelector("#email").value = docente.email;
        this.querySelector("#foto").value = docente.foto;
        this.querySelector("#area").value = docente.area;

        form.dataset.editando = id; // ✅ Marca que estamos editando
      }
    }
    });
}
}

customElements.define("docentes-view", DocentesView);