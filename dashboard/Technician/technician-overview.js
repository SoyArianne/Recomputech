class TechnicianOverview extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
  }

  connectedCallback() {
    this.render();
  }

  render() {
    // Simulación de datos, en integración real se obtendrían del usuario autenticado
    const name = 'Technician Name';
    const specialties = 'Laptop, PC, Tablet';
    const experience = '3 years';
    const certs = 'CompTIA, Cisco';
    const avatar = '/assets/images/portrait-female-working.jpg';
    this.shadowRoot.innerHTML = `
      <style>
        .overview {
          display: flex;
          align-items: center;
          gap: 2rem;
          margin-bottom: 2rem;
        }
        .profile-photo {
          width: 90px;
          height: 90px;
          border-radius: 50%;
          object-fit: cover;
          border: 3px solid #3b82f6;
        }
        .info h2 {
          margin: 0 0 0.5rem 0;
          font-size: 2rem;
          color: #fff;
        }
        .info p {
          margin: 0.2rem 0;
          color: #bfc9d1;
        }
        .edit-btn {
          margin-top: 0.7rem;
          padding: 0.3rem 1.2rem;
          border-radius: 20px;
          border: 1px solid #3b82f6;
          background: transparent;
          color: #3b82f6;
          font-weight: 500;
          cursor: pointer;
          transition: background 0.2s, color 0.2s;
        }
        .edit-btn:hover {
          background: #3b82f6;
          color: #fff;
        }
      </style>
      <section class="overview">
        <img src="${avatar}" alt="User Photo" class="profile-photo">
        <div class="info">
          <h2>Welcome, <span id="techName">${name}</span>!</h2>
          <p><strong>Specialties:</strong> <span id="techSpecialties">${specialties}</span></p>
          <p><strong>Experience:</strong> <span id="techExperience">${experience}</span></p>
          <p><strong>Certifications:</strong> <span id="techCerts">${certs}</span></p>
          <button class="edit-btn">Edit Profile</button>
        </div>
      </section>
    `;
  }
}
customElements.define('technician-overview', TechnicianOverview); 