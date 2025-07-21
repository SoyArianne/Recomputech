class TechnicianContact extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
  }

  connectedCallback() {
    this.render();
  }

  render() {
    // Simulación de datos
    const email = 'tech@example.com';
    const phone = '(123) 456-7890';
    const location = 'City, Country';
    this.shadowRoot.innerHTML = `
      <style>
        .contact-card {
          background: #232b39;
          border-radius: 1rem;
          padding: 2rem;
          color: #fff;
          margin-bottom: 2rem;
        }
        .contact-info {
          margin-bottom: 1.5rem;
        }
        .contact-info p {
          margin: 0.3rem 0;
          color: #bfc9d1;
        }
        .contact-form label {
          color: #bfc9d1;
          font-size: 0.95rem;
        }
        .contact-form input, .contact-form textarea {
          width: 100%;
          margin-bottom: 1rem;
          padding: 0.5rem;
          border-radius: 0.4rem;
          border: 1px solid #3b82f6;
          background: #181f2a;
          color: #fff;
        }
        .contact-form button {
          background: #3b82f6;
          color: #fff;
          border: none;
          border-radius: 20px;
          padding: 0.5rem 1.5rem;
          font-weight: 500;
          cursor: pointer;
        }
        .contact-form button:hover {
          background: #2563eb;
        }
      </style>
      <div class="contact-card">
        <div class="contact-info">
          <h3>Contact Information</h3>
          <p><strong>Email:</strong> ${email}</p>
          <p><strong>Phone:</strong> ${phone}</p>
          <p><strong>Location:</strong> ${location}</p>
        </div>
        <form class="contact-form">
          <label for="message">Quick Message:</label>
          <textarea id="message" rows="3" placeholder="Write a message..."></textarea>
          <button type="submit">Send</button>
        </form>
      </div>
    `;
  }
}
customElements.define('technician-contact', TechnicianContact); 