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
      <style>
    h2 {
      font-family: 'Segoe UI', sans-serif;
      font-size: 1.8rem;
      margin-bottom: 1rem;
      color: #333;
    }

    form {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
      gap: 1rem;
      margin-bottom: 2rem;
      font-family: 'Segoe UI', sans-serif;
    }

    input, select, button {
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
      transition: background-color 0.3s ease;
    }

    button:hover {
      background-color: #5e04b3;
    }

    table {
      width: 100%;
      border-collapse: collapse;
      font-family: 'Segoe UI', sans-serif;
    }

    th, td {
      padding: 0.8rem;
      border: 1px solid #ddd;
      text-align: left;
    }

    th {
      background-color: #f3f1f7;
      color: #333;
    }

    td button {
      margin-right: 0.5rem;
      padding: 0.4rem 0.6rem;
      border: none;
      border-radius: 4px;
      cursor: pointer;
      background-color: #8106f5;
      color: white;
    }

    td button.eliminar {
      background-color: #d9534f;
    }

    td button:hover {
      opacity: 0.9;
    }
  </style>
      <h2>Gestión de Docentes</h2>
      <form id="form-docente">
        <input id="codigo" placeholder="Código" required />
        <input id="identificacion" placeholder="Identificación" required />
        <input id="nombres" placeholder="Nombres" required />
        <input id="apellidos" placeholder="Apellidos" required />
        <input id="email" placeholder="Correo" required />
        <input id="foto" placeholder="URL de la foto" />
        <input id="area"  placeholder="Área de especialidad" required />
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