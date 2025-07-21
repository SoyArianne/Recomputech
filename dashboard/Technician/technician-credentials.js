class TechnicianCredentials extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
  }

  connectedCallback() {
    this.render();
  }

  render() {
    this.shadowRoot.innerHTML = `
      <style>
        .credentials-card {
          background: #232b39;
          border-radius: 1rem;
          padding: 2rem;
          color: #fff;
          margin-bottom: 2rem;
        }
        .credentials-list {
          margin-bottom: 1.5rem;
        }
        .credentials-list li {
          color: #bfc9d1;
          margin-bottom: 0.5rem;
        }
        .upload-form label {
          color: #bfc9d1;
          font-size: 0.95rem;
        }
        .upload-form input[type='file'] {
          margin-bottom: 1rem;
        }
        .upload-form button {
          background: #3b82f6;
          color: #fff;
          border: none;
          border-radius: 20px;
          padding: 0.5rem 1.5rem;
          font-weight: 500;
          cursor: pointer;
        }
        .upload-form button:hover {
          background: #2563eb;
        }
      </style>
      <div class="credentials-card">
        <h3>Credentials & Certificates</h3>
        <ul class="credentials-list">
          <li>CompTIA A+ (2022)</li>
          <li>Cisco CCNA (2023)</li>
        </ul>
        <form class="upload-form">
          <label for="cert-upload">Upload new certificate:</label>
          <input type="file" id="cert-upload" accept="application/pdf,image/*">
          <button type="submit">Upload</button>
        </form>
      </div>
    `;
  }
}
customElements.define('technician-credentials', TechnicianCredentials); 