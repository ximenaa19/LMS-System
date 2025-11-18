export class EstudianteCard extends HTMLElement {
    connectedCallback() {
      const data = JSON.parse(this.getAttribute("data"));
      this.innerHTML = `
          <style>
          .card {
            
            background: white;
            border-radius: 12px;
            box-shadow: 0 2px 8px rgba(0,0,0,0.1);
            padding: 1rem;
            margin: 1rem;
            width: 250px;
            font-family: 'Segoe UI', sans-serif;
            display: flex;
            flex-direction: column;
            align-items: center;
            text-align: center;
            transition: transform 0.3s ease;
          }
  
          .card:hover {
            transform: scale(1.03);
          }
  
          .card img {
            width: 100px;
            height: 100px;
            border-radius: 50%;
            object-fit: cover;
            margin-bottom: 1rem;
            background-color: #eee;
          }
  
          .card h3 {
            margin: 0.5rem 0;
            color: #333;
            font-size: 1.2rem;
          }
  
          .card p {
            margin: 0.2rem 0;
            color: #666;
            font-size: 0.9rem;
          }
        </style>
  
        <div class="card">
          <h3>${data.nombres} ${data.apellidos}</h3>
          <p><strong>genero:</strong> ${data.genero}</p>
          <p><strong>telefono:</strong> ${data.telefono}</p>
        </div>
      `;
    }
  }
  
  customElements.define("estudiante-card", EstudianteCard);
  