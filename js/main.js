/**
 * MORPHEUS — Shared Main Controller
 * Handles global navbar cart badge updates and global localStorage helpers.
 */

// Global Cart State Keys
const CART_STORAGE_KEY = 'morpheus_cart_items';

/**
 * Retrieves current cart items from LocalStorage
 */
function getCartFromStorage() {
  const data = localStorage.getItem(CART_STORAGE_KEY);
  return data ? JSON.parse(data) : [];
}

/**
 * Saves cart array to LocalStorage and triggers UI badge refresh
 */
function saveCartToStorage(cartArray) {
  localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cartArray));
  updateCartBadge();
}

/**
 * Updates the cart item count badge displayed in the sticky header
 */
function updateCartBadge() {
  const badgeEl = document.getElementById('cart-badge');
  if (!badgeEl) return;

  const cart = getCartFromStorage();
  const totalItems = cart.reduce((total, item) => total + item.quantity, 0);
  badgeEl.textContent = totalItems;
}

// Global Initialization
document.addEventListener('DOMContentLoaded', () => {
  updateCartBadge();
});