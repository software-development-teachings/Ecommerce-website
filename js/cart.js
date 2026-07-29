/**
 * MORPHEUS — Shopping Cart Controller
 * Manages item list rendering, quantity adjustments, item removal, and real-time total calculations.
 */

document.addEventListener('DOMContentLoaded', () => {
  const cartContent = document.getElementById('cart-content');
  const cartItemsList = document.getElementById('cart-items-list');
  const cartEmpty = document.getElementById('cart-empty');
  const clearCartBtn = document.getElementById('clear-cart-btn');

  // Summary Elements
  const subtotalEl = document.getElementById('summary-subtotal');
  const discountEl = document.getElementById('summary-discount');
  const totalEl = document.getElementById('summary-total');
  const promoInput = document.getElementById('promo-input');
  const applyPromoBtn = document.getElementById('apply-promo-btn');
  const promoMessage = document.getElementById('promo-message');

  // Promo State
  let discountPercentage = 0;

  /**
   * Renders the cart items and updates financial breakdown
   */
  function renderCart() {
    const cart = getCartFromStorage();

    if (cart.length === 0) {
      if (cartContent) cartContent.style.display = 'none';
      if (cartEmpty) cartEmpty.classList.remove('hidden');
      return;
    }

    if (cartContent) cartContent.style.display = 'grid';
    if (cartEmpty) cartEmpty.classList.add('hidden');

    // 1. Render Line Items
    cartItemsList.innerHTML = cart.map((item, index) => `
      <div class="cart-item" data-index="${index}">
        <div class="item-img-wrap">
          <img src="${item.image}" alt="${item.name}" />
        </div>

        <div class="item-details">
          <h3 class="item-title">
            <a href="product.html?id=${item.id}">${item.name}</a>
          </h3>
          <p class="item-meta">Size: <strong>${item.size}</strong></p>
          <p class="item-price-single">$${item.price}</p>
        </div>

        <div class="item-qty-controls">
          <button class="qty-btn qty-minus" data-index="${index}">-</button>
          <span class="qty-value">${item.quantity}</span>
          <button class="qty-btn qty-plus" data-index="${index}">+</button>
        </div>

        <div class="item-subtotal">
          $${item.price * item.quantity}
        </div>

        <button class="item-remove-btn" data-index="${index}" aria-label="Remove Item">&times;</button>
      </div>
    `).join('');

    // 2. Calculate Totals
    calculateTotals(cart);
  }

  /**
   * Recalculates Subtotal, Discounts, and Final Total
   */
  function calculateTotals(cart) {
    const subtotal = cart.reduce((acc, item) => acc + (item.price * item.quantity), 0);
    const discountAmount = subtotal * discountPercentage;
    const finalTotal = subtotal - discountAmount;

    if (subtotalEl) subtotalEl.textContent = `$${subtotal.toFixed(2)}`;
    if (discountEl) discountEl.textContent = `-$${discountAmount.toFixed(2)}`;
    if (totalEl) totalEl.textContent = `$${finalTotal.toFixed(2)}`;
  }

  // --- EVENT LISTENERS ---

  // Quantity Adjustments & Removal via Delegation
  if (cartItemsList) {
    cartItemsList.addEventListener('click', (e) => {
      const cart = getCartFromStorage();
      const target = e.target;
      const index = target.dataset.index;

      if (index === undefined) return;

      // Quantity Increase
      if (target.classList.contains('qty-plus')) {
        cart[index].quantity += 1;
        saveCartToStorage(cart);
        renderCart();
      }

      // Quantity Decrease
      if (target.classList.contains('qty-minus')) {
        if (cart[index].quantity > 1) {
          cart[index].quantity -= 1;
        } else {
          cart.splice(index, 1);
        }
        saveCartToStorage(cart);
        renderCart();
      }

      // Remove Item
      if (target.classList.contains('item-remove-btn')) {
        cart.splice(index, 1);
        saveCartToStorage(cart);
        renderCart();
      }
    });
  }

  // Clear Cart Button
  if (clearCartBtn) {
    clearCartBtn.addEventListener('click', () => {
      if (confirm('Are you sure you want to clear your entire bag?')) {
        saveCartToStorage([]);
        renderCart();
      }
    });
  }

  // Promo Code Handler
  if (applyPromoBtn) {
    applyPromoBtn.addEventListener('click', () => {
      const code = promoInput.value.trim().toUpperCase();

      if (code === 'DREAM10') {
        discountPercentage = 0.10; // 10% Off
        promoMessage.textContent = '✓ Promo Code DREAM10 Applied (10% Off)';
        promoMessage.className = 'promo-msg success';
      } else if (code === '') {
        discountPercentage = 0;
        promoMessage.className = 'promo-msg hidden';
      } else {
        discountPercentage = 0;
        promoMessage.textContent = '❌ Invalid Promo Code';
        promoMessage.className = 'promo-msg error';
      }

      renderCart();
    });
  }

  // Initial Render
  renderCart();
});