export class DocenteCard extends HTMLElement {
  connectedCallback() {
    const data = JSON.parse(this.getAttribute("data"));
    this.innerHTML = `
      <div class="card">
        <img src="${data.foto}" alt="${data.nombres}" />
        <h3>${data.nombres} ${data.apellidos}</h3>
        <p><strong>Área:</strong> ${data.area}</p>
        <p><strong>Email:</strong> ${data.email}</p>
      </div>
    `;
  }
}

customElements.define("docente-card", DocenteCard);
