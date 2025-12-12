// ==================== WISHLIST JS - UPDATED ====================

// Helper function to calculate discount percentage
function calculateDiscountPercentage(originalPrice, currentPrice) {
    if (!originalPrice || !currentPrice) return 0;
    
    // Ensure we have numbers
    const orig = typeof originalPrice === 'number' ? originalPrice : parseFloat(originalPrice);
    const curr = typeof currentPrice === 'number' ? currentPrice : parseFloat(currentPrice);
    
    if (isNaN(orig) || isNaN(curr) || orig <= 0 || curr <= 0) return 0;
    if (orig <= curr) return 0;
    
    const discount = ((orig - curr) / orig) * 100;
    return Math.round(discount);
}



// Get wishlist from localStorage
function getWishlist() {
    try {
        const wishlistData = localStorage.getItem('wishlist');
        if (!wishlistData) return [];
        
        const wishlist = JSON.parse(wishlistData);
        
        // Normalize all products in wishlist
        return wishlist.map(product => normalizeProductData(product));
    } catch (e) {
        console.error('Error reading wishlist:', e);
        localStorage.removeItem('wishlist');
        return [];
    }
}

// Update wishlist count in header
function updateWishlistCount() {
    const count = getWishlist().length;
    
    // Update all wishlist count elements
    const countElements = [
        document.getElementById('desktop-wishlist-count'),
        document.getElementById('mobile-wishlist-count'),
        ...document.querySelectorAll('.wishlist-count'),
        ...document.querySelectorAll('[class*="wishlist-count"]')
    ];
    
    countElements.forEach(el => {
        if (el) {
            el.textContent = count;
            el.style.display = count > 0 ? 'flex' : 'none';
        }
    });
}

// Remove item from wishlist
function removeFromWishlist(productId) {
    let wishlist = getWishlist();
    const initialLength = wishlist.length;
    
    wishlist = wishlist.filter(item => String(item.id) !== String(productId));
    
    if (wishlist.length < initialLength) {
        localStorage.setItem('wishlist', JSON.stringify(wishlist));
        
        // Show notification if available
        if (typeof showToast === 'function') {
            showToast('Item removed from wishlist', 'info');
        } else {
            // Fallback alert
            alert('Item removed from wishlist');
        }
        
        renderWishlist();
        updateWishlistCount();
        
        // Trigger event for other tabs
        window.dispatchEvent(new CustomEvent('wishlistUpdated', { 
            detail: { count: wishlist.length } 
        }));
    }
}

// Move item to cart
function moveToCart(productId) {
    const wishlist = getWishlist();
    const product = wishlist.find(item => String(item.id) === String(productId));
    
    if (!product) {
        console.error('Product not found in wishlist:', productId);
        return;
    }
    
    // Add to cart
    let cart = [];
    try {
        cart = JSON.parse(localStorage.getItem('cart') || '[]');
    } catch (e) {
        console.error('Error reading cart:', e);
        cart = [];
    }
    
    // Check if product already exists in cart
    const existingInCart = cart.find(item => String(item.id) === String(productId));
    
    if (existingInCart) {
        existingInCart.quantity = (existingInCart.quantity || 1) + 1;
    } else {
        cart.push({
            id: product.id,
            name: product.name,
            productName: product.productName,
            price: Number(product.price) || 0,
            originalPrice: Number(product.originalPrice) || Number(product.price) || 0,
            image: product.image,
            brand: product.brand,
            quantity: 1
        });
    }
    
    try {
        localStorage.setItem('cart', JSON.stringify(cart));
    } catch (e) {
        console.error('Error saving cart:', e);
    }
    
    // Remove from wishlist
    removeFromWishlist(productId);
    
    // Show notification
    if (typeof showToast === 'function') {
        showToast('Item moved to cart!', 'success');
    } else {
        alert('Item moved to cart!');
    }
    
    // Update cart count if function exists
    if (typeof updateCartCount === 'function') {
        updateCartCount();
    }
}

// Navigate to product details
function goToProduct(id) {
    const wishlist = getWishlist();
    const product = wishlist.find(p => String(p.id) === String(id));
    
    if (product) {
        // Save product for product details page
        sessionStorage.setItem('selectedProduct', JSON.stringify(product));
        
        // Build URL parameters
        const params = new URLSearchParams({
            id: product.id,
            sku: product.sku || `PROD-${product.id}`,
            name: encodeURIComponent(product.name),
            brand: encodeURIComponent(product.brand),
            price: product.price,
            originalPrice: product.originalPrice || product.price,
            discount: calculateDiscountPercentage(product.originalPrice, product.price),
            image: encodeURIComponent(product.image),
            description: encodeURIComponent(product.description || product.name),
            category: product.category,
            sourcePage: 'Wishlist',
            quantity: product.productQuantity || 0,
            mrp: product.originalPrice || product.price,
            rating: product.productRating || 4.0,
            unit: product.productUnit || 'piece',
            stock: product.productQuantity || 0,
            status: product.productStatus || 'Available'
        });
        
        window.location.href = `../productdetails.html?${params.toString()}`;
    } else {
        console.error('Product not found in wishlist:', id);
        alert('Product not found!');
    }
}

// Main render function
// In the renderWishlist() function, update the product name display:
function renderWishlist() {
    const container = document.getElementById('wishlistContainer');
    const emptyState = document.getElementById('emptyState');
    const wishlist = getWishlist();

    console.log('Rendering wishlist with', wishlist.length, 'items:', wishlist);

    if (wishlist.length === 0) {
        if (container) container.classList.add('hidden');
        if (emptyState) emptyState.classList.remove('hidden');
        return;
    }

    if (container) {
        container.classList.remove('hidden');
        container.innerHTML = '';
    }
    
    if (emptyState) emptyState.classList.add('hidden');
    
    if (!container) return;
    
    wishlist.forEach(product => {
        // Parse prices properly
        const currentPrice = Number(product.price) || 0;
        const originalPrice = Number(product.originalPrice) || currentPrice;
        
        const discountPercentage = calculateDiscountPercentage(originalPrice, currentPrice);
        const hasDiscount = originalPrice > currentPrice && discountPercentage > 0;

        // FIXED: Get product name from all possible property names
        const productName = product.name || product.productName || product.title || 'Unnamed Product';
        
        // FIXED: Get brand from all possible property names
        const brand = product.brand || product.brandName || 'Generic';

        const div = document.createElement('div');
        div.className = 'wishlist-item bg-white rounded-xl shadow-lg overflow-hidden';

        const priceLine = hasDiscount ? 
            `<div class="text-lg font-bold text-green-600">
                ₹${currentPrice.toFixed(0)} 
                <s class="text-gray-400 text-sm">₹${originalPrice.toFixed(0)}</s> 
                <span class="text-sm font-bold">${discountPercentage}% off</span>
            </div>` :
            `<div class="text-lg font-bold text-green-600">₹${currentPrice.toFixed(0)}</div>`;

        // Check stock status
        const isOutOfStock = product.productQuantity <= 0;
        const stockBadge = isOutOfStock ? 
            `<div class="absolute top-2 left-2 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded">Out of Stock</div>` : 
            `<div class="absolute top-2 left-2 bg-green-500 text-white text-xs font-bold px-2 py-1 rounded">In Stock</div>`;

        div.innerHTML = `
            <div class="relative group">
                <img src="${product.image}" 
                     alt="${productName}" 
                     class="w-full h-40 object-cover ${isOutOfStock ? 'opacity-70' : ''}">
                ${stockBadge}
                <button onclick="removeFromWishlist(${product.id})" 
                        class="absolute top-2 right-2 bg-white/90 hover:bg-red-500 text-red-600 hover:text-white w-10 h-10 rounded-full shadow-lg flex items-center justify-center transition">
                    <i class="fas fa-trash-alt"></i>
                </button>
            </div>
            <div class="p-4">
                <h3 class="font-semibold text-sm line-clamp-2 h-6 mb-1">${productName}</h3>
                ${brand ? `<p class="text-xs text-gray-500 mb-2">${brand}</p>` : ''}
                ${priceLine}
                <div class="mt-4 flex gap-2">
                    <button onclick="moveToCart(${product.id})" 
                            class="flex-1 ${isOutOfStock ? 'bg-gray-400 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700'} text-white py-2 rounded-lg font-bold text-sm transition"
                            ${isOutOfStock ? 'disabled' : ''}>
                        ${isOutOfStock ? 'Out of Stock' : 'Add to Cart'}
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

// Also update the normalizeProductData function to be more thorough:
function normalizeProductData(product) {
    // Debug: Log what we're receiving
    console.log('Normalizing product data:', product);
    
    // Extract name from all possible property names
    let name = '';
    if (product.name) name = product.name;
    else if (product.productName) name = product.productName;
    else if (product.title) name = product.title;
    else if (product.productTitle) name = product.productTitle;
    else name = 'Product ' + (product.id || '');
    
    // Extract brand from all possible property names
    let brand = '';
    if (product.brand) brand = product.brand;
    else if (product.brandName) brand = product.brandName;
    else if (product.manufacturer) brand = product.manufacturer;
    else brand = 'Generic';
    
    return {
        id: product.id || product.productId || Date.now(),
        name: name,
        productName: name,
        price: product.price || product.productPrice || product.currentPrice || product.salePrice || 0,
        originalPrice: product.originalPrice || product.productOldPrice || product.oldPrice || product.price || 0,
        brand: brand,
        brandName: brand,
        image: product.image || product.productImage || product.img || product.thumbnail || 'https://via.placeholder.com/300',
        description: product.description || product.productDescription || name,
        category: product.category || product.productCategory || product.subCategory || 'general',
        productStatus: product.productStatus || product.status || 'Available',
        productQuantity: product.productQuantity || product.quantity || product.stock || 0,
        productRating: product.productRating || product.rating || 4.0,
        productUnit: product.productUnit || product.unit || 'piece',
        sku: product.sku || product.productSku || `SKU-${product.id || Date.now()}`
    };
}

// Debug function to check localStorage
function debugWishlist() {
    const wishlist = getWishlist();
    console.log('=== WISHLIST DEBUG ===');
    console.log('Number of items:', wishlist.length);
    console.log('Items:', wishlist);
    console.log('Raw localStorage:', localStorage.getItem('wishlist'));
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
        
        // Listen for wishlist updates from other tabs/pages
        window.addEventListener('wishlistUpdated', () => {
            console.log('Wishlist update event received');
            renderWishlist();
            updateWishlistCount();
        });
        
        // Listen for storage events (from other tabs)
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