class TechnicianStats extends HTMLElement {
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
        .stats-row {
          display: flex;
          gap: 2rem;
          margin-bottom: 2rem;
        }
        .stat-card {
          flex: 1;
          background: #232b39;
          border-radius: 1rem;
          padding: 2rem;
          text-align: center;
          color: #fff;
        }
        .stat-card h4 {
          font-size: 2.2rem;
          margin: 0 0 0.5rem 0;
          color: #3b82f6;
        }
        .stat-card p {
          margin: 0;
          color: #bfc9d1;
        }
        .star {
          color: #fbbf24;
          font-size: 1.3rem;
        }
      </style>
      <div class="stats-row">
        <div class="stat-card">
          <h4>24</h4>
          <p>Services Completed</p>
        </div>
        <div class="stat-card">
          <h4>5</h4>
          <p>Pending Requests</p>
        </div>
        <div class="stat-card">
          <h4>4.8 <span class="star">★</span></h4>
          <p>Average Rating</p>
        </div>
      </div>
    `;
  }
}
customElements.define('technician-stats', TechnicianStats); 