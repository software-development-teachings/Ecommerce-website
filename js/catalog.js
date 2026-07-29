/**
 * MORPHEUS — Catalog Page Controller
 * Handles real-time search, category pill filtering, and price sorting.
 */

document.addEventListener('DOMContentLoaded', () => {
  // DOM Element References
  const catalogGrid = document.getElementById('catalog-grid');
  const searchInput = document.getElementById('catalog-search');
  const categoryPillsContainer = document.getElementById('category-pills');
  const sortSelect = document.getElementById('sort-select');
  const emptyState = document.getElementById('empty-state');
  const resetBtn = document.getElementById('reset-filters-btn');

  // Filter State
  let currentCategory = 'all';
  let currentSearchQuery = '';
  let currentSort = 'featured';

  /**
   * Filters and sorts the master PRODUCTS array based on current UI state
   */
  function getFilteredProducts() {
    let result = [...PRODUCTS];

    // 1. Category Filter
    if (currentCategory !== 'all') {
      result = result.filter(p => p.category.toLowerCase() === currentCategory.toLowerCase());
    }

    // 2. Search Query Filter (Matches Name, Description, or Fabric)
    if (currentSearchQuery.trim() !== '') {
      const q = currentSearchQuery.toLowerCase();
      result = result.filter(p => 
        p.name.toLowerCase().includes(q) ||
        p.description.toLowerCase().includes(q) ||
        p.fabric.toLowerCase().includes(q)
      );
    }

    // 3. Sorting
    switch (currentSort) {
      case 'price-low':
        result.sort((a, b) => a.price - b.price);
        break;
      case 'price-high':
        result.sort((a, b) => b.price - a.price);
        break;
      case 'rating':
        result.sort((a, b) => b.rating - a.rating);
        break;
      case 'featured':
      default:
        result.sort((a, b) => (b.isFeatured ? 1 : 0) - (a.isFeatured ? 1 : 0));
        break;
    }

    return result;
  }

  /**
   * Renders product cards into the catalog grid
   */
  function renderCatalog() {
    const productsToDisplay = getFilteredProducts();

    if (productsToDisplay.length === 0) {
      catalogGrid.innerHTML = '';
      emptyState.classList.remove('hidden');
      return;
    }

    emptyState.classList.add('hidden');

    catalogGrid.innerHTML = productsToDisplay.map(product => `
      <div class="product-card">
        <div class="card-image-wrap">
          <span class="card-badge">${product.badge}</span>
          <img src="${product.images[0]}" alt="${product.name}" loading="lazy" />
          <a href="product.html?id=${product.id}" class="card-quick-view">Inspect Piece</a>
        </div>
        <div class="card-body">
          <div class="card-category">${product.category}</div>
          <h3 class="card-title">
            <a href="product.html?id=${product.id}">${product.name}</a>
          </h3>
          <p class="card-fabric-tag">${product.weight} • ${product.fabric.split(',')[0]}</p>
          <div class="card-footer">
            <span class="card-price">$${product.price}</span>
            <span class="card-rating">★ ${product.rating}</span>
          </div>
        </div>
      </div>
    `).join('');
  }

  // --- EVENT LISTENERS ---

  // 1. Category Pill Toggle (Event Delegation)
  if (categoryPillsContainer) {
    categoryPillsContainer.addEventListener('click', (e) => {
      const pill = e.target.closest('.pill');
      if (!pill) return;

      // Toggle active class visually
      document.querySelectorAll('.pill').forEach(p => p.classList.remove('active'));
      pill.classList.add('active');

      currentCategory = pill.dataset.category;
      renderCatalog();
    });
  }

  // 2. Real-Time Search Input
  if (searchInput) {
    searchInput.addEventListener('input', (e) => {
      currentSearchQuery = e.target.value;
      renderCatalog();
    });
  }

  // 3. Price/Rating Sort Select
  if (sortSelect) {
    sortSelect.addEventListener('change', (e) => {
      currentSort = e.target.value;
      renderCatalog();
    });
  }

  // 4. Reset Filters Button
  if (resetBtn) {
    resetBtn.addEventListener('click', () => {
      currentCategory = 'all';
      currentSearchQuery = '';
      currentSort = 'featured';

      if (searchInput) searchInput.value = '';
      if (sortSelect) sortSelect.value = 'featured';

      document.querySelectorAll('.pill').forEach(p => {
        p.classList.toggle('active', p.dataset.category === 'all');
      });

      renderCatalog();
    });
  }

  // Initial Render on Page Load
  renderCatalog();
});