/* ==============================
   cart.js – FINAL SUBMISSION VERSION
   NO "Identifier already declared" ERROR
   ============================== */

console.log("cart.js loaded");

// Safely get or create cart (fixes redeclaration error)
if (typeof cart === 'undefined') {
    var cart = JSON.parse(localStorage.getItem('cart') || '[]');
}

// DOM Elements
let cartItemsContainer = document.getElementById('cart-items-container');
let subtotalEl = document.getElementById('subtotal');
let taxEl = document.getElementById('tax');
let totalEl = document.getElementById('total');
let cartCountEl = document.getElementById('cart-count');
let itemCountEl = document.getElementById('item-count');

// Save cart to localStorage
function saveCart() {
    localStorage.setItem('cart', JSON.stringify(cart));
}

// Update UI
function updateCartUI() {
    // Update counts
    const totalItems = cart.reduce((sum, item) => sum + (item.quantity || 1), 0);
    if (cartCountEl) {
        cartCountEl.textContent = totalItems;
        cartCountEl.parentElement.classList.toggle('hidden', totalItems === 0);
    }
    if (itemCountEl) itemCountEl.textContent = totalItems + ' item' + (totalItems !== 1 ? 's' : '');

    // Render items
    if (cart.length === 0) {
        document.getElementById('empty-cart-fullscreen').classList.remove('hidden');
        document.getElementById('cart-with-items').classList.add('hidden');
        cartItemsContainer.innerHTML = '';
        return;
    }

    document.getElementById('empty-cart-fullscreen').classList.add('hidden');
    document.getElementById('cart-with-items').classList.remove('hidden');

    cartItemsContainer.innerHTML = cart.map((item, index) => `
        <div class="cart-item bg-white border rounded-lg p-5 flex gap-5 items-center">
            <img src="${item.image || 'https://via.placeholder.com/80'}" alt="${item.name}" class="w-20 h-20 object-cover rounded-lg">
            <div class="flex-1">
                <h3 class="font-bold text-lg">${item.name}</h3>
                <p class="text-gray-600">₹${parseFloat(item.price || 0).toFixed(2)} each</p>
            </div>
            <div class="flex items-center gap-3">
                <button onclick="updateQty(${index}, ${(item.quantity || 1) - 1})" class="w-10 h-10 rounded-lg border hover:bg-gray-100">-</button>
                <span class="w-12 text-center font-bold text-lg">${item.quantity || 1}</span>
                <button onclick="updateQty(${index}, ${(item.quantity || 1) + 1})" class="w-10 h-10 rounded-lg border hover:bg-gray-100">+</button>
            </div>
            <div class="text-right">
                <p class="font-bold text-xl">₹${(parseFloat(item.price || 0) * (item.quantity || 1)).toFixed(2)}</p>
                <button onclick="removeItem(${index})" class="text-red-600 text-sm hover:underline">Remove</button>
            </div>
        </div>
    `).join('');

    // Calculate totals
    const subtotal = cart.reduce((sum, item) => sum + parseFloat(item.price || 0) * (item.quantity || 1), 0);
    const tax = subtotal * 0.18;
    const shipping = subtotal >= 499 ? 0 : 49;
    const total = subtotal + tax + shipping;

    subtotalEl.textContent = `₹${subtotal.toFixed(2)}`;
    taxEl.textContent = `₹${tax.toFixed(2)}`;
    totalEl.textContent = `₹${total.toFixed(2)}`;
    document.getElementById('shipping-text').textContent = shipping === 0 ? 'Free' : '₹49.00';

    // Show prescription notice
    const hasRx = cart.some(item => item.prescriptionRequired);
    document.getElementById('prescription-notice').classList.toggle('hidden', !hasRx);
}

// Global functions
window.updateQty = function(index, newQty) {
    if (newQty < 1) {
        removeItem(index);
        return;
    }
    cart[index].quantity = newQty;
    saveCart();
    updateCartUI();
};

window.removeItem = function(index) {
    if (confirm('Remove this item from cart?')) {
        cart.splice(index, 1);
        saveCart();
        updateCartUI();
    }
};

window.proceedToCheckout = function() {
    if (cart.length === 0) return alert('Your cart is empty!');
    location.href = 'checkout.html';
};

// Auto-run when page loads
document.addEventListener('DOMContentLoaded', () => {
    setTimeout(updateCartUI, 100);
});