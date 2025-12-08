// ==================== WISHLIST JS - UPDATED ====================

// Helper function to calculate discount percentage
function calculateDiscountPercentage(originalPrice, currentPrice) {
    if (!originalPrice || !currentPrice) return 0;
    
    // Remove currency symbols if present
    const orig = parseFloat(String(originalPrice).replace(/[₹$,]/g, ''));
    const curr = parseFloat(String(currentPrice).replace(/[₹$,]/g, ''));
    
    if (orig <= curr || orig <= 0) return 0;
    
    const discount = ((orig - curr) / orig) * 100;
    return Math.round(discount);
}

// Get wishlist from localStorage
function getWishlist() {
    try {
        return JSON.parse(localStorage.getItem('wishlist') || '[]');
    } catch (e) {
        console.error('Error reading wishlist:', e);
        localStorage.removeItem('wishlist');
        return [];
    }
}

// Update wishlist count in header
function updateWishlistCount() {
    const count = getWishlist().length;
    
    document.querySelectorAll('#desktop-wishlist-count, #mobile-wishlist-count, .wishlist-count, [class*="wishlist-count"]').forEach(el => {
        if (el) {
            el.textContent = count;
            el.style.display = count > 0 ? 'flex' : 'none';
        }
    });
}

// Remove item from wishlist
function removeFromWishlist(productId) {
    let wishlist = getWishlist();
    wishlist = wishlist.filter(item => item.id != productId);
    localStorage.setItem('wishlist', JSON.stringify(wishlist));
    
    // Show notification
    if (typeof showToast === 'function') {
        showToast('Item removed from wishlist', 'error');
    }
    
    renderWishlist();
    updateWishlistCount();
    
    // Trigger event for other tabs
    window.dispatchEvent(new Event('storage'));
    window.dispatchEvent(new CustomEvent('wishlistUpdated'));
}

// Move item to cart
function moveToCart(productId) {
    const wishlist = getWishlist();
    const item = wishlist.find(i => i.id == productId);
    
    if (!item) return;
    
    // Add to cart
    let cart = [];
    try {
        cart = JSON.parse(localStorage.getItem('cart') || '[]');
    } catch (e) {
        cart = [];
    }
    
    const existingInCart = cart.find(c => c.id == item.id);
    
    if (existingInCart) {
        existingInCart.quantity = (existingInCart.quantity || 1) + 1;
    } else {
        cart.push({
            id: item.id,
            name: item.name,
            price: parseFloat(String(item.price).replace(/[₹$,]/g, '')),
            image: item.image,
            quantity: 1
        });
    }
    
    localStorage.setItem('cart', JSON.stringify(cart));
    
    // Remove from wishlist
    removeFromWishlist(productId);
    
    // Show notification
    if (typeof showToast === 'function') {
        showToast('Item moved to cart!', 'success');
    }
    
    // Update cart count if function exists
    if (typeof updateCartCount === 'function') {
        updateCartCount();
    }
}

// Navigate to product details
function goToProduct(id) {
    const product = getWishlist().find(p => p.id == id);
    if (product) {
        sessionStorage.setItem('selectedProduct', JSON.stringify(product));
        
        // Build URL parameters
        const params = new URLSearchParams({
            id: product.id,
            name: encodeURIComponent(product.name || ''),
            brand: encodeURIComponent(product.brand || ''),
            price: product.price,
            originalPrice: product.originalPrice || product.price,
            image: encodeURIComponent(product.image || ''),
            description: encodeURIComponent(product.description || ''),
            category: product.category || 'all'
        });
        
        window.location.href = `../productdetails.html?${params.toString()}`;
    }
}

// Main render function
function renderWishlist() {
    const container = document.getElementById('wishlistContainer');
    const emptyState = document.getElementById('emptyState');
    const wishlist = getWishlist();

    console.log('Rendering wishlist with items:', wishlist);

    if (wishlist.length === 0) {
        if (container) container.classList.add('hidden');
        if (emptyState) emptyState.classList.remove('hidden');
        return;
    }

    if (container) container.classList.remove('hidden');
    if (emptyState) emptyState.classList.add('hidden');
    
    if (!container) return;
    
    container.innerHTML = '';

    wishlist.forEach(product => {
        // Parse prices properly
        const currentPrice = parseFloat(String(product.price).replace(/[₹$,]/g, ''));
        const originalPrice = product.originalPrice ? 
            parseFloat(String(product.originalPrice).replace(/[₹$,]/g, '')) : currentPrice;
        
        const discountPercentage = calculateDiscountPercentage(originalPrice, currentPrice);
        const hasDiscount = originalPrice > currentPrice && discountPercentage > 0;

        const div = document.createElement('div');
        div.className = 'wishlist-item bg-white rounded-xl shadow-lg overflow-hidden';

        const priceLine = hasDiscount ? 
            `<div class="text-lg font-bold text-green-600">
                ₹${currentPrice.toFixed(0)} 
                <s class="text-gray-400 text-sm">₹${originalPrice.toFixed(0)}</s> 
                <span class="text-sm font-bold">${discountPercentage}% off</span>
            </div>` :
            `<div class="text-lg font-bold text-green-600">₹${currentPrice.toFixed(0)}</div>`;

        div.innerHTML = `
            <div class="relative group">
                <img src="${product.image || 'https://via.placeholder.com/300'}" 
                     alt="${product.name}" 
                     class="w-full h-48 object-cover">
                <button onclick="removeFromWishlist(${product.id})" 
                        class="absolute top-2 right-2 bg-white/90 hover:bg-red-500 text-red-600 hover:text-white w-10 h-10 rounded-full shadow-lg flex items-center justify-center transition">
                    <i class="fas fa-trash-alt"></i>
                </button>
            </div>
            <div class="p-4">
                <h3 class="font-semibold text-sm line-clamp-2 h-6 mb-1">${product.name || 'Product Name'}</h3>
                ${product.brand ? `<p class="text-xs text-gray-500">${product.brand}</p>` : ''}
                ${priceLine}
                <div class="mt-4 flex gap-2">
                    <button onclick="moveToCart(${product.id})" 
                            class="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg font-bold text-sm transition">
                        Add to Cart
                    </button>
                    <button onclick="goToProduct(${product.id})" 
                            class="bg-gray-200 hover:bg-gray-300 text-gray-800 py-2 px-3 rounded-lg font-bold text-sm transition">
                        <i class="fas fa-eye"></i>
                    </button>
                </div>
            </div>
        `;
        container.appendChild(div);
    });
}

// Debug function to check localStorage
function debugWishlist() {
    const wishlist = getWishlist();
    console.log('=== WISHLIST DEBUG ===');
    console.log('Number of items:', wishlist.length);
    console.log('Items:', wishlist);
    console.log('LocalStorage key "wishlist":', localStorage.getItem('wishlist'));
    console.log('=====================');
}

// Initialize on page load
document.addEventListener('DOMContentLoaded', () => {
    console.log('Wishlist page initialized');
    debugWishlist(); // Debug output
    
    // Small delay to ensure everything is loaded
    setTimeout(() => {
        renderWishlist();
        updateWishlistCount();
        
        // Listen for wishlist updates
        window.addEventListener('wishlistUpdated', renderWishlist);
        window.addEventListener('storage', (e) => {
            if (e.key === 'wishlist') {
                console.log('Wishlist updated from another tab');
                renderWishlist();
                updateWishlistCount();
            }
        });
    }, 100);
});

// Make functions globally accessible
window.removeFromWishlist = removeFromWishlist;
window.moveToCart = moveToCart;
window.goToProduct = goToProduct;
window.renderWishlist = renderWishlist;
window.updateWishlistCount = updateWishlistCount;
window.debugWishlist = debugWishlist;