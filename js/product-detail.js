/**
 * MORPHEUS — Product Details Page Controller
 * Reads URL query params (?id=X), renders dynamic content, handles gallery switching & size pickers.
 */

document.addEventListener('DOMContentLoaded', () => {
  const pdpLayout = document.getElementById('product-detail-layout');
  const pdpNotFound = document.getElementById('pdp-not-found');
  const breadcrumbTitle = document.getElementById('breadcrumb-title');

  // 1. Parse URL Parameter: ?id=morpheus-101
  const urlParams = new URLSearchParams(window.location.search);
  const productId = urlParams.get('id');

  // 2. Lookup Product in Database
  const product = getProductById(productId);

  if (!product) {
    if (pdpLayout) pdpLayout.style.display = 'none';
    if (pdpNotFound) pdpNotFound.classList.remove('hidden');
    return;
  }

  // Update Breadcrumb
  if (breadcrumbTitle) breadcrumbTitle.textContent = product.name;

  // Selected Size State
  let selectedSize = product.sizes[0] || 'M';

  // 3. Render Product Detail Layout
  pdpLayout.innerHTML = `
    <!-- Left Column: Gallery -->
    <div class="pdp-gallery">
      <div class="main-image-frame">
        <img id="pdp-main-image" src="${product.images[0]}" alt="${product.name}" />
      </div>
      ${product.images.length > 1 ? `
        <div class="thumbnail-list">
          ${product.images.map((img, idx) => `
            <button class="thumb-btn ${idx === 0 ? 'active' : ''}" data-src="${img}">
              <img src="${img}" alt="Thumbnail ${idx + 1}" />
            </button>
          `).join('')}
        </div>
      ` : ''}
    </div>

    <!-- Right Column: Product Meta & Purchase Controls -->
    <div class="pdp-info">
      <span class="badge">${product.badge}</span>
      <h1 class="pdp-title">${product.name}</h1>
      
      <div class="pdp-price-row">
        <span class="pdp-price">$${product.price}</span>
        <span class="pdp-rating">★ ${product.rating} Rating</span>
      </div>

      <p class="pdp-description">${product.description}</p>

      <!-- Fabric Spec Sheet -->
      <div class="spec-box">
        <h4>Garment Specifications</h4>
        <ul>
          <li><strong>Fabric Blend:</strong> ${product.fabric}</li>
          <li><strong>Material Weight:</strong> ${product.weight}</li>
          <li><strong>Fit Profile:</strong> Relaxed Oversized Boxy Cut</li>
        </ul>
      </div>

      <!-- Size Selector -->
      <div class="size-section">
        <div class="size-header">
          <span>Select Size</span>
          <span class="size-selected-label">Chosen: <strong id="selected-size-display">${selectedSize}</strong></span>
        </div>
        <div id="size-picker" class="size-options">
          ${product.sizes.map(size => `
            <button class="size-btn ${size === selectedSize ? 'active' : ''}" data-size="${size}">
              ${size}
            </button>
          `).join('')}
        </div>
      </div>

      <!-- Actions -->
      <div class="pdp-actions">
        <button id="add-to-cart-btn" class="btn btn-primary btn-large">
          Add to Cart — $${product.price}
        </button>
        <a href="cart.html" id="quick-checkout-btn" class="btn btn-outline btn-large">
          View Cart
        </a>
      </div>

      <div id="add-success-banner" class="toast-banner hidden">
        ✓ Piece added to your cart successfully!
      </div>
    </div>
  `;

  // --- EVENT LISTENERS & INTERACTION ---

  // A. Image Gallery Switching
  const mainImg = document.getElementById('pdp-main-image');
  const thumbBtns = pdpLayout.querySelectorAll('.thumb-btn');

  thumbBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      thumbBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      mainImg.src = btn.dataset.src;
    });
  });

  // B. Size Selection
  const sizeBtns = pdpLayout.querySelectorAll('.size-btn');
  const sizeDisplay = document.getElementById('selected-size-display');

  sizeBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      sizeBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      selectedSize = btn.dataset.size;
      if (sizeDisplay) sizeDisplay.textContent = selectedSize;
    });
  });

  // C. Add to Cart Logic
  const addToCartBtn = document.getElementById('add-to-cart-btn');
  const successBanner = document.getElementById('add-success-banner');

  if (addToCartBtn) {
    addToCartBtn.addEventListener('click', () => {
      const currentCart = getCartFromStorage();

      // Check if this exact product + size combination exists in cart
      const existingIndex = currentCart.findIndex(
        item => item.id === product.id && item.size === selectedSize
      );

      if (existingIndex > -1) {
        currentCart[existingIndex].quantity += 1;
      } else {
        currentCart.push({
          id: product.id,
          name: product.name,
          price: product.price,
          image: product.images[0],
          size: selectedSize,
          quantity: 1
        });
      }

      // Persist to LocalStorage and update badge
      saveCartToStorage(currentCart);

      // Show Feedback Banner
      if (successBanner) {
        successBanner.classList.remove('hidden');
        setTimeout(() => {
          successBanner.classList.add('hidden');
        }, 3000);
      }
    });
  }
});