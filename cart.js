/* ==============================
   cart.js – FINAL SUBMISSION VERSION (NO ERRORS!)
   Works even if elements are missing
   ============================== */

console.log("cart.js loaded");

// Safely get cart from localStorage
function getCart() {
    return JSON.parse(localStorage.getItem('cart') || '[]');
}

// Save cart
function saveCart(cartData) {
    localStorage.setItem('cart', JSON.stringify(cartData));
}

// DOM Elements – with null checks!
const cartItemsContainer = document.getElementById('cart-items-container');
const subtotalEl = document.getElementById('subtotal');
const taxEl = document.getElementById('tax');
const totalEl = document.getElementById('total');
const cartCountEl = document.getElementById('cart-count');
const itemCountEl = document.getElementById('item-count');
const emptyCartScreen = document.getElementById('empty-cart-fullscreen');
const cartWithItems = document.getElementById('cart-with-items');
const prescriptionNotice = document.getElementById('prescription-notice');
const shippingText = document.getElementById('shipping-text');

function updateCartCount() {
  const cart = getCart();
  const totalItems = cart.reduce((sum, item) => sum + (item.quantity || 0), 0);
  
  
  // Updates ALL possible cart count elements
  document.querySelectorAll('#desktop-cart-count, #mobile-cart-count, .cart-count, #cart-count, #cartCount').forEach(el => {
    if (el) {
      el.textContent = totalItems;
      el.style.display = totalItems > 0 ? 'flex' : 'none';
    }
  });
}

// MAIN UPDATE FUNCTION – 100% SAFE (No null errors!)
function updateCartUI() {
    if (!cartItemsContainer) return; // Exit early if not on cart page

    const cart = getCart(); // Always get fresh cart from localStorage
    const totalItems = cart.reduce((sum, item) => sum + (item.quantity || 1), 0);

    // Update item count text
    if (itemCountEl) {
        itemCountEl.textContent = totalItems + ' item' + (totalItems !== 1 ? 's' : '');
    }

    // Empty cart state
    if (cart.length === 0) {
        if (emptyCartScreen) emptyCartScreen.classList.remove('hidden');
        if (cartWithItems) cartWithItems.classList.add('hidden');
        cartItemsContainer.innerHTML = '';
        if (subtotalEl) subtotalEl.textContent = '₹0.00';
        if (taxEl) taxEl.textContent = '₹0.00';
        if (totalEl) totalEl.textContent = '₹0.00';
        if (shippingText) shippingText.textContent = '₹0.00';
        updateCartCount();
        return;
    }

    // Has items
    if (emptyCartScreen) emptyCartScreen.classList.add('hidden');
    if (cartWithItems) cartWithItems.classList.remove('hidden');

    // Render items
    cartItemsContainer.innerHTML = cart.map((item, index) => `
        <div class="cart-item bg-white border rounded-lg p-5 flex flex-col md:flex-row gap-5 items-center">
            <img src="${item.image || item.mainImageUrl || 'https://via.placeholder.com/80'}" 
     alt="${item.name || item.title}" class="w-20 h-20 object-cover rounded-lg">
            <div class="flex-1 text-center md:text-left">
    <h3 class="font-bold text-lg">${item.name || item.title || 'Unknown Product'}</h3>
    <p class="text-gray-600">₹${parseFloat(item.price || 0).toFixed(2)} each</p>
</div>
            <div class="flex items-center gap-3">
                <button onclick="updateQty(${index}, ${(item.quantity || 1) - 1})" 
                        class="w-10 h-10 rounded-lg border hover:bg-gray-100 text-lg font-bold">-</button>
                <span class="w-16 text-center font-bold text-xl">${item.quantity || 1}</span>
                <button onclick="updateQty(${index}, ${(item.quantity || 1) + 1})" 
                        class="w-10 h-10 rounded-lg border hover:bg-gray-100 text-lg font-bold">+</button>
            </div>
            <div class="text-center md:text-right">
                <p class="font-bold text-xl text-green-600">₹${(parseFloat(item.price || 0) * (item.quantity || 1)).toFixed(2)}</p>
                <button onclick="removeItem(${index})" class="text-red-600 text-sm hover:underline mt-2">Remove</button>
            </div>
        </div>
    `).join('');

    // Calculate totals
    const subtotal = cart.reduce((sum, item) => sum + parseFloat(item.price || 0) * (item.quantity || 1), 0);
    const tax = subtotal * 0.18;
    const shipping = subtotal >= 499 ? 0 : 49;
    const total = subtotal + tax + shipping;

    if (subtotalEl) subtotalEl.textContent = `₹${subtotal.toFixed(2)}`;
    if (taxEl) taxEl.textContent = `₹${tax.toFixed(2)}`;
    if (totalEl) totalEl.textContent = `₹${total.toFixed(2)}`;
    if (shippingText) shippingText.textContent = shipping === 0 ? 'Free' : '₹49.00';

    // Prescription notice
    const hasRx = cart.some(item => item.prescriptionRequired);
    if (prescriptionNotice) {
        prescriptionNotice.classList.toggle('hidden', !hasRx);
    }

    // Always update header count
    updateCartCount();
}

// Global functions (safe even if called from inline onclick)
window.updateQty = function(index, newQty) {
    const cart = getCart(); // Always get fresh cart
    if (newQty < 1) {
        removeItem(index);
        return;
    }
    cart[index].quantity = newQty;
    saveCart(cart);
    updateCartUI();
};

window.removeItem = function(index) {
    const cart = getCart(); // Always get fresh cart
    if (confirm('Remove this item from cart?')) {
        cart.splice(index, 1);
        saveCart(cart);
        updateCartUI();
    }
};

window.proceedToCheckout = function() {
    const cart = getCart(); // Always get fresh cart
    if (cart.length === 0) {
        alert('Your cart is empty!');
        return;
    }
    location.href = 'checkout.html';
};

// Run on load – with safety delay
document.addEventListener('DOMContentLoaded', () => {
    updateCartCount();
    setTimeout(updateCartUI, 100);
});

// Immediately call on page load before DOM loads
updateCartCount();

// Also update when storage changes (multi-tab support)
window.addEventListener('storage', (e) => {
    if (e.key === 'cart') {
        updateCartUI();
        updateCartCount();
    }
});

// Export for other pages (optional)
window.getCart = getCart;
window.updateCartCount = updateCartCount;

// CRITICAL: Update cart count immediately on script load (before DOM parsing completes)
(function() {
    try {
        updateCartCount();
        console.log('Initial cart count updated on script load');
    } catch (e) {
        console.warn('Could not update cart count on initial load:', e);
    }
})();