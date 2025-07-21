class TechnicianRequests extends HTMLElement {
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
        .requests-card {
          background: #232b39;
          border-radius: 1rem;
          padding: 2rem;
          color: #fff;
          margin-bottom: 2rem;
        }
        .request-item {
          display: flex;
          justify-content: space-between;
          align-items: center;
          background: #181f2a;
          border-radius: 0.7rem;
          padding: 1rem;
          margin-bottom: 1rem;
        }
        .request-info {
          color: #bfc9d1;
        }
        .accept-btn {
          background: #10b981;
          color: #fff;
          border: none;
          border-radius: 20px;
          padding: 0.4rem 1.2rem;
          font-weight: 500;
          cursor: pointer;
        }
        .accept-btn:hover {
          background: #059669;
        }
      </style>
      <div class="requests-card">
        <h3>Service Requests</h3>
        <div class="request-item">
          <div class="request-info">
            <strong>John Doe</strong> requested <span class="badge bg-info">Screen Replacement</span>
            <div class="text-muted small">Laptop - 2 hours ago</div>
          </div>
          <button class="accept-btn">Accept</button>
        </div>
        <div class="request-item">
          <div class="request-info">
            <strong>Jane Smith</strong> requested <span class="badge bg-info">Network Setup</span>
            <div class="text-muted small">PC - 1 day ago</div>
          </div>
          <button class="accept-btn">Accept</button>
        </div>
        <button class="accept-btn" style="background:#3b82f6; margin-top:1rem;">View All Requests</button>
      </div>
    `;
  }
}
customElements.define('technician-requests', TechnicianRequests); 