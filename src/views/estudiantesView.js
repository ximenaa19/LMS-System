import { obtenerEstudiantes,
            crearEstudiante,
            actualizarEstudiante,
            eliminarEstudiante,
            asignarCursoAEstudiante
 } from "../js/estudiantes";
    

export class EstudiantesView extends HTMLElement {
  
  connectedCallback() {
    this.render();
    this.cargarEstudiantes();
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
      <h2>Gestión de Estudiantes</h2>
      <form id="form-estudiante">
        <input id="identificacion" placeholder="Identificación" required />
        <input id="nombres" placeholder="Nombres" required />
        <input id="apellidos" placeholder="Apellidos" required />
        <input id="genero" placeholder="genero" required />
        <input id="fecha de nacimiento " placeholder="fecha de nacimiento" />
        <input id="direccion"  placeholder="direccion " required />
        <input id="telefono"  placeholder="telefono" required />
        <button type="submit">Guardar</button>
      </form>
      <table id="tabla-estudiantes">
        <thead><tr><th>Nombre</th><th>genero</th><th>telefono</th><th>Acciones</th></tr></thead>
        <tbody></tbody>
      </table>
    `;
  }


 cargarDocentes() {
    const tbody = this.querySelector("#tabla-estudiantes tbody");
    tbody.innerHTML = "";
    obtenerEstudiantes().forEach(estudiante => {
      const fila = document.createElement("tr");
      fila.innerHTML = `
        <td>${estudiante.nombres} ${estudiante.apellidos}</td>
        <td>${estudiante.genero}</td>
        <td>${estudiante.telefono}</td>
        <td>
          <button data-id="${estudiante.id}" class="editar">editar</button>
          <button data-id="${estudiante.id}" class="eliminar">eliminar</button>
        </td>
      `;
      tbody.appendChild(fila);
    });
  }

  configurarEventos() {
  const form = this.querySelector("#form-estudiante");

  form.addEventListener("submit", (e) => {
    e.preventDefault();

    const nuevo = {
      codigo: this.querySelector("#codigo").value.trim(),
      identificacion: this.querySelector("#identificacion").value.trim(),
      nombres: this.querySelector("#nombres").value.trim(),
      apellidos: this.querySelector("#apellidos").value.trim(),
      genero: this.querySelector("#genero").value.trim(),
      direccion: this.querySelector("#direccion").value.trim(),
      telefono: this.querySelector("#telefono").value
    };

    const idEditando = form.dataset.editando;

    if (idEditando) {
      
      actualizarEstudiante(idEditando, nuevo);
      delete form.dataset.editando;
    } else {
      
      const creado = crearEstudiante(nuevo);
      if (!creado) {
        alert("No se pudo guardar el estudiante. Verifica los datos.");
        return;
      }
    }

    this.cargarEstudiantes();
    window.dispatchEvent(new Event("estudiantesActualizados")); 
    form.reset();
    });

  this.addEventListener("click", (e) => {
    const id = e.target.dataset.id;

    if (e.target.classList.contains("eliminar")) {
      
      eliminarEstudiante(id);
      this.cargarEstudiantes();
      window.dispatchEvent(new Event("estidantesActualizados"));
    }

    if (e.target.classList.contains("editar")) {
      
      const estudiante= obtenerEstudiantes().find(d => d.id === id);
      if (estudiante) {
        this.querySelector("#identificacion").value = estudiante.identificacion;
        this.querySelector("#nombres").value = estudiante.nombres;
        this.querySelector("#apellidos").value = estudiante.apellidos;
        this.querySelector("#genero").value = estudiante.email;
        this.querySelector("#direccion").value = estudiante.foto;
        this.querySelector("#telefono").value = estudiante.area;

        form.dataset.editando = id;
      }
    }
    });
}
}

customElements.define("estudiantes-view", EstudiantesView);