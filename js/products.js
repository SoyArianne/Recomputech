// products.js - Filtrado dinámico para products.html

document.addEventListener('DOMContentLoaded', function () {
  // Obtener todos los productos del HTML
  const allProducts = Array.from(document.querySelectorAll('.main-products .col-md-6, .main-products .col-lg-4'));

  // Filtros
  const filterButtons = document.querySelectorAll('.filter-categories button[data-filter]');
  const sortSelect = document.querySelector('.filter-sort .form-select');

  function showProducts(category) {
    allProducts.forEach(card => {
      const productCard = card.querySelector('.product-card');
      if (!productCard) return;
      const name = productCard.querySelector('h5')?.textContent?.toLowerCase() || '';
      const desc = productCard.querySelector('.product-description')?.textContent?.toLowerCase() || '';
      let match = false;
      switch (category) {
        case 'laptops':
          match = name.includes('laptop');
          break;
        case 'desktops':
          match = name.includes('pc') || name.includes('dell') || name.includes('hp') || name.includes('lenovo') || name.includes('mac');
          break;
        case 'phones':
          match = name.includes('phone') || name.includes('smartphone');
          break;
        case 'tablets':
          match = name.includes('tablet');
          break;
        case 'accessories':
          match = name.includes('headphone') || name.includes('audífono') || name.includes('accessory');
          break;
        case 'all':
        default:
          match = true;
      }
      card.style.display = match ? '' : 'none';
    });
  }

  function sortProducts(order) {
    const container = document.querySelector('.main-products .row');
    let cards = Array.from(container.children).filter(el => el.style.display !== 'none');
    cards.sort((a, b) => {
      const priceA = parseFloat(a.querySelector('.price')?.textContent.replace(/[^\d.]/g, '') || 0);
      const priceB = parseFloat(b.querySelector('.price')?.textContent.replace(/[^\d.]/g, '') || 0);
      const ratingA = parseFloat(a.querySelector('.product-rating span')?.textContent.replace(/[^\d.]/g, '') || 0);
      const ratingB = parseFloat(b.querySelector('.product-rating span')?.textContent.replace(/[^\d.]/g, '') || 0);
      if (order === 'Lowest Price') return priceA - priceB;
      if (order === 'Highest Price') return priceB - priceA;
      if (order === 'Most Rated') return ratingB - ratingA;
      return 0; // Most Recent (default, keep order)
    });
    cards.forEach(card => container.appendChild(card));
  }

  // Evento de filtro por categoría
  filterButtons.forEach(btn => {
    btn.addEventListener('click', function () {
      filterButtons.forEach(b => b.classList.remove('active'));
      this.classList.add('active');
      const category = this.getAttribute('data-filter');
      showProducts(category);
      sortProducts(sortSelect.value);
    });
  });

  // Evento de ordenamiento
  if (sortSelect) {
    sortSelect.addEventListener('change', function () {
      sortProducts(this.value);
    });
  }

  // Inicializar mostrando todos
  showProducts('all');
  sortProducts(sortSelect?.value || 'Most Recent');
}); 