export class CursoCard extends HTMLElement {
  connectedCallback() {
    const data = JSON.parse(this.getAttribute("data"));
    this.innerHTML = `
      <style>
        
        .card {
        background: white;
        border-radius: 12px;
        box-shadow: 0 2px 8px rgba(0,0,0,0.1);
        padding: 1.5rem;
        width: 300px;
        font-family: 'Segoe UI', sans-serif;
        display: flex;
        flex-direction: column;
        align-items: center;
        text-align: center;
        transition: transform 0.3s ease;
        flex: 0 0 auto; /* evita que se estire en horizontal */
        }
        .card:hover {
        transform: scale(1.03);
        }
        .curso-imagen {
        width: 100%;
        height: 180px;
        object-fit: cover;
        border-radius:0 !important;
        }
        .card h3 {
          margin: 0.5rem 0;
          color: #333;
          font-size: 1.3rem;
        }
        .card p {
          margin: 0.3rem 0;
          color: #555;
          font-size: 0.95rem;
        }
        .info {
          margin-top: 1rem;
          background: #f9f9f9;
          padding: 0.8rem;
          border-radius: 8px;
          display: none;
        }
        .info ul {
          padding-left: 1rem;
        }
        .card button {
          margin-top: 1rem;
          padding: 0.5rem;
          background-color: #8106f5;
          color: white;
          border: none;
          border-radius: 5px;
          cursor: pointer;
        }
        .card button:hover {
          background-color: #5e04b3;
        }
      </style>
      <div class="cursos-container">
  
        <div class="card">
            <img src="${data.imagenUrl}" alt="Imagen del curso" class="curso-imagen" />
            <h3>${data.nombre}</h3>
            <p>${data.descripcion || "Sin descripción"}</p>
            <p><strong>Duración:</strong> ${data.duracion || "No definida"}</p>
            <button onclick="this.nextElementSibling.style.display = 'block'">More Info</button>
            <div class="info">
            <h4>Módulos</h4>
            <ul>${data.modulos.map(m => `<li>${m.nombre}</li>`).join("")}</ul>
            <h4>Lecciones</h4>
            <ul>${data.lecciones.map(l => `<li>${l.titulo}</li>`).join("")}</ul>
            </div>
        </div>
        </div>

    `;
  }
}

customElements.define("curso-card", CursoCard);
