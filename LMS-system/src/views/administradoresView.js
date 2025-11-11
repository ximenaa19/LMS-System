export class AdministradoresView extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
    this.adminEditando = null;
  }

  connectedCallback() {
    this.render();
    this.shadowRoot.querySelector("form").addEventListener("submit", this.crearOEditarAdmin.bind(this));
    this.mostrarAdmins();
  }

  crearOEditarAdmin(e) {
    e.preventDefault();

    const datos = {
      id: this.adminEditando || `admin-${Date.now()}`,
      identificacion: this.shadowRoot.querySelector("#identificacion").value.trim(),
      nombres: this.shadowRoot.querySelector("#nombres").value.trim(),
      apellidos: this.shadowRoot.querySelector("#apellidos").value.trim(),
      email: this.shadowRoot.querySelector("#email").value.trim(),
      telefono: this.shadowRoot.querySelector("#telefono").value.trim(),
      cargo: this.shadowRoot.querySelector("#cargo").value.trim(),
      contraseña: this.shadowRoot.querySelector("#contraseña").value.trim()
    };

    if (Object.values(datos).some(v => !v)) {
      alert("Todos los campos son obligatorios");
      return;
    }

    const admins = JSON.parse(localStorage.getItem("administradores")) || [];

    if (this.adminEditando) {
      const index = admins.findIndex(a => a.id === this.adminEditando);
      admins[index] = datos;
      this.adminEditando = null;
    } else {
      admins.push(datos);
    }

    localStorage.setItem("administradores", JSON.stringify(admins));
    this.shadowRoot.querySelector("form").reset();
    this.mostrarAdmins();
  }

  mostrarAdmins() {
    const admins = JSON.parse(localStorage.getItem("administradores")) || [];
    const tbody = this.shadowRoot.querySelector("tbody");
    tbody.innerHTML = "";

    admins.forEach(admin => {
      const fila = document.createElement("tr");
      fila.innerHTML = `
        <td>${admin.identificacion}</td>
        <td>${admin.nombres} ${admin.apellidos}</td>
        <td>${admin.email}</td>
        <td>${admin.cargo}</td>
        <td>
          <button class="editar" data-id="${admin.id}">Editar</button>
          <button class="eliminar" data-id="${admin.id}">Eliminar</button>
        </td>
      `;
      tbody.appendChild(fila);
    });

    this.shadowRoot.querySelectorAll(".editar").forEach(btn => {
      btn.addEventListener("click", () => this.cargarAdmin(btn.getAttribute("data-id")));
    });

    this.shadowRoot.querySelectorAll(".eliminar").forEach(btn => {
      btn.addEventListener("click", () => this.eliminarAdmin(btn.getAttribute("data-id")));
    });
  }

  cargarAdmin(id) {
    const admins = JSON.parse(localStorage.getItem("administradores")) || [];
    const admin = admins.find(a => a.id === id);
    if (!admin) return;

    this.adminEditando = id;
    this.shadowRoot.querySelector("#identificacion").value = admin.identificacion;
    this.shadowRoot.querySelector("#nombres").value = admin.nombres;
    this.shadowRoot.querySelector("#apellidos").value = admin.apellidos;
    this.shadowRoot.querySelector("#email").value = admin.email;
    this.shadowRoot.querySelector("#telefono").value = admin.telefono;
    this.shadowRoot.querySelector("#cargo").value = admin.cargo;
    this.shadowRoot.querySelector("#contraseña").value = admin.contraseña;
  }

  eliminarAdmin(id) {
    const admins = JSON.parse(localStorage.getItem("administradores")) || [];
    const nuevos = admins.filter(a => a.id !== id);
    localStorage.setItem("administradores", JSON.stringify(nuevos));
    this.mostrarAdmins();
  }

  render() {
    this.shadowRoot.innerHTML = `
      <style>
        :host {
          display: block;
          padding: 2rem;
          font-family: Arial, sans-serif;
          background-color: #f4f6f8;
        }

        h2 {
          color: #a10df7ff;
        }

        form {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 1rem;
          margin-bottom: 2rem;
          background: white;
          padding: 1.5rem;
          border-radius: 8px;
        }

        input {
          padding: 0.5rem;
          border: 1px solid #ccc;
          border-radius: 4px;
        }

        button {
          padding: 0.5rem 1rem;
          background-color: #a10df7ff;
          color: white;
          border: none;
          border-radius: 4px;
          cursor: pointer;
        }

        button:hover {
          background-color: #7a039eff;
        }

        form button[type="submit"] {
          grid-column: span 2;
        }

        table {
          width: 100%;
          border-collapse: collapse;
          background: white;
        }

        th, td {
          padding: 0.8rem;
          border: 1px solid #ddd;
          text-align: left;
        }

        th {
          background-color: #950be6ff;
          color: white;
        }

        td button {
          margin-right: 0.5rem;
        }
      </style>

      <h2>Gestión de Administradores</h2>
      <form>
        <input type="text" id="identificacion" placeholder="Identificación" />
        <input type="text" id="nombres" placeholder="Nombres" />
        <input type="text" id="apellidos" placeholder="Apellidos" />
        <input type="email" id="email" placeholder="Email" />
        <input type="text" id="telefono" placeholder="Teléfono" />
        <input type="text" id="cargo" placeholder="Cargo" />
        <input type="password" id="contraseña" placeholder="Contraseña" />
        <button type="submit">Crear Administrador</button>
      </form>

      <table>
        <thead>
          <tr>
            <th>Identificación</th>
            <th>Nombre</th>
            <th>Email</th>
            <th>Cargo</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody></tbody>
      </table>
    `;
  }
}

customElements.define("administradores-view", AdministradoresView);
