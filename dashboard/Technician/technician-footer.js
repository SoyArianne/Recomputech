class TechnicianFooter extends HTMLElement {
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
        :host {
          display: block;
          width: 100%;
          background: #181f2a;
          color: #bfc9d1;
          font-size: 0.95rem;
          text-align: center;
          padding: 1rem 0 0.5rem 0;
          border-top: 1px solid #232b39;
        }
        .footer-links {
          margin-left: 1rem;
        }
        .footer-links a {
          color: #bfc9d1;
          text-decoration: underline;
          margin: 0 0.5rem;
          font-size: 0.95rem;
        }
        .footer-links a:hover {
          color: #3b82f6;
        }
      </style>
      <div>
        © 2024 Recomputech. All rights reserved.
        <span class="footer-links">
          <a href="#">Privacy Policy</a>|
          <a href="#">Terms of Service</a>
        </span>
      </div>
    `;
  }
}
customElements.define('technician-footer', TechnicianFooter); 