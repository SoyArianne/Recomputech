class TechnicianNotifications extends HTMLElement {
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
        .notifications-card {
          background: #232b39;
          border-radius: 1rem;
          padding: 2rem;
          color: #fff;
        }
        ul {
          list-style: none;
          padding: 0;
          margin: 0;
        }
        li {
          background: #181f2a;
          color: #bfc9d1;
          border-radius: 0.5rem;
          margin-bottom: 0.7rem;
          padding: 0.8rem 1rem;
        }
      </style>
      <div class="notifications-card">
        <h3>Notifications</h3>
        <ul>
          <li>You have a new service request from John Doe.</li>
          <li>Your profile was updated successfully.</li>
          <li>System Optimization service marked as completed.</li>
        </ul>
      </div>
    `;
  }
}
customElements.define('technician-notifications', TechnicianNotifications); 