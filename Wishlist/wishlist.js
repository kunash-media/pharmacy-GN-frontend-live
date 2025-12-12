// ==================== WISHLIST JS - FIXED STOCK STATUS ====================

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

// Save wishlist to localStorage
function saveWishlist(wishlist) {
    try {
        localStorage.setItem('wishlist', JSON.stringify(wishlist));
    } catch (e) {
        console.error('Error saving wishlist:', e);
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

// Add item to wishlist - FIXED to include stock status
function addToWishlist(product) {
    let wishlist = getWishlist();
    
    // Check if product already exists
    const exists = wishlist.some(item => String(item.id) === String(product.id));
    
    if (!exists) {
        // Normalize product data with proper stock status
        const normalizedProduct = normalizeProductData(product);
        wishlist.push(normalizedProduct);
        saveWishlist(wishlist);
        
        // Show notification if available
        if (typeof showToast === 'function') {
            showToast('Item added to wishlist!', 'success');
        } else {
            // Fallback alert
            alert('Item added to wishlist!');
        }
        
        updateWishlistCount();
        
        // Trigger event for other tabs
        window.dispatchEvent(new CustomEvent('wishlistUpdated', { 
            detail: { count: wishlist.length } 
        }));
        
        return true;
    } else {
        // Show already in wishlist message
        if (typeof showToast === 'function') {
            showToast('Item already in wishlist', 'info');
        }
        return false;
    }
}

// Remove item from wishlist
function removeFromWishlist(productId) {
    let wishlist = getWishlist();
    const initialLength = wishlist.length;
    
    wishlist = wishlist.filter(item => String(item.id) !== String(productId));
    
    if (wishlist.length < initialLength) {
        saveWishlist(wishlist);
        
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
    
    // Check stock status before adding to cart
    const isOutOfStock = checkOutOfStock(product);
    
    if (isOutOfStock) {
        if (typeof showToast === 'function') {
            showToast('Product is out of stock!', 'error');
        } else {
            alert('This product is currently out of stock.');
        }
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
            quantity: 1,
            stock: product.stock || product.productQuantity || 0,
            inStock: !isOutOfStock
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

// Check if product is out of stock - FIXED LOGIC
function checkOutOfStock(product) {
    // Try multiple property names for stock quantity
    const stockQuantity = product.stock || product.quantity || product.productQuantity || product.inventory || 10;
    
    // Check for explicit out of stock status
    if (product.status === 'Out of Stock' || product.productStatus === 'Out of Stock') {
        return true;
    }
    
    // Check if stock quantity is 0 or negative
    const stockNumber = Number(stockQuantity);
    if (!isNaN(stockNumber) && stockNumber <= 0) {
        return true;
    }
    
    // Default to in stock
    return false;
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
            quantity: product.stock || product.productQuantity || 10,
            mrp: product.originalPrice || product.price,
            rating: product.productRating || 4.0,
            unit: product.productUnit || 'piece',
            stock: product.stock || product.productQuantity || 10,
            status: product.status || 'Available'
        });
        
        window.location.href = `../productdetails.html?${params.toString()}`;
    } else {
        console.error('Product not found in wishlist:', id);
        alert('Product not found!');
    }
}

// Main render function - FIXED STOCK STATUS DISPLAY
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

        // Get product name from all possible property names
        const productName = product.name || product.productName || product.title || 'Unnamed Product';
        
        // Get brand from all possible property names
        const brand = product.brand || product.brandName || 'Generic';
        
        // FIXED: Check stock status properly
        const isOutOfStock = checkOutOfStock(product);
        
        console.log(`Product ${product.id} - isOutOfStock: ${isOutOfStock}`, product);

        const div = document.createElement('div');
        div.className = 'wishlist-item bg-white rounded-lg shadow-md overflow-hidden';

        const priceLine = hasDiscount ? 
            `<div class="text-sm font-bold text-green-600">
                ₹${currentPrice.toFixed(0)} 
                <s class="text-gray-400 text-xs ml-1">₹${originalPrice.toFixed(0)}</s> 
                <span class="text-xs font-bold text-red-500 ml-1">${discountPercentage}% off</span>
            </div>` :
            `<div class="text-sm font-bold text-green-600">₹${currentPrice.toFixed(0)}</div>`;

        // Stock badge - FIXED: Only show if out of stock
        const stockBadge = isOutOfStock ? 
            `<div class="absolute top-2 left-2 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-full z-10">Out of Stock</div>` : 
            '';

        div.innerHTML = `
            <div class="relative group h-full">
                <div class="relative h-32 overflow-hidden bg-gray-100">
                    <img src="${product.image}" 
                         alt="${productName}" 
                         class="w-full h-full object-contain p-1 ${isOutOfStock ? 'opacity-70 grayscale' : ''}">
                    ${stockBadge}
                    <button onclick="removeFromWishlist(${product.id})" 
                            class="absolute top-2 right-2 bg-white/90 hover:bg-red-500 text-red-600 hover:text-white w-8 h-8 rounded-full shadow flex items-center justify-center transition text-sm">
                        <i class="fas fa-trash-alt"></i>
                    </button>
                </div>
                <div class="p-2">
                    <h3 class="font-semibold text-xs line-clamp-2 h-8 mb-1 text-gray-800">${productName}</h3>
                    ${brand ? `<p class="text-xs text-gray-500 mb-1 truncate">${brand}</p>` : ''}
                    ${priceLine}
                    <div class="mt-2 flex gap-1">
                        <button onclick="moveToCart(${product.id})" 
                                class="flex-1 ${isOutOfStock ? 'bg-gray-300 text-gray-500 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700 text-white'} py-1 rounded text-xs font-bold transition"
                                ${isOutOfStock ? 'disabled' : ''}>
                            ${isOutOfStock ? 'Out of Stock' : 'Add to Cart'}
                        </button>
                        <button onclick="goToProduct(${product.id})" 
                                class="bg-gray-100 hover:bg-gray-200 text-gray-800 py-1 px-2 rounded text-xs font-bold transition">
                            <i class="fas fa-eye text-xs"></i>
                        </button>
                    </div>
                </div>
            </div>
        `;
        container.appendChild(div);
    });
}

// Improved normalizeProductData function with better stock handling
function normalizeProductData(product) {
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
    
    // Extract stock quantity - check multiple property names
    let stock = 0;
    if (product.stock !== undefined) stock = product.stock;
    else if (product.quantity !== undefined) stock = product.quantity;
    else if (product.productQuantity !== undefined) stock = product.productQuantity;
    else if (product.inventory !== undefined) stock = product.inventory;
    else stock = 10; // Default stock
    
    // Extract stock status
    let status = 'Available';
    if (product.status) status = product.status;
    else if (product.productStatus) status = product.productStatus;
    else if (stock <= 0) status = 'Out of Stock';
    
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
        status: status,
        productStatus: status,
        stock: Number(stock),
        productQuantity: Number(stock),
        quantity: Number(stock),
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
    console.log('Items with stock info:');
    wishlist.forEach(item => {
        console.log(`ID: ${item.id}, Name: ${item.name}, Stock: ${item.stock}, Status: ${item.status}, isOutOfStock: ${checkOutOfStock(item)}`);
    });
    console.log('Raw localStorage:', localStorage.getItem('wishlist'));
    console.log('=====================');
}

// Check if product is in wishlist
function isInWishlist(productId) {
    const wishlist = getWishlist();
    return wishlist.some(item => String(item.id) === String(productId));
}

// Toggle wishlist status
function toggleWishlist(product) {
    const productId = product.id || product.productId;
    
    if (isInWishlist(productId)) {
        removeFromWishlist(productId);
        return false;
    } else {
        return addToWishlist(product);
    }
}

// Initialize on page load
document.addEventListener('DOMContentLoaded', () => {
    console.log('Wishlist page initialized');
    debugWishlist();
    
    // Small delay to ensure everything is loaded
    setTimeout(() => {
        if (typeof renderWishlist === 'function') {
            renderWishlist();
        }
        updateWishlistCount();
        
        // Listen for wishlist updates from other tabs/pages
        window.addEventListener('wishlistUpdated', () => {
            console.log('Wishlist update event received');
            if (typeof renderWishlist === 'function') {
                renderWishlist();
            }
            updateWishlistCount();
        });
        
        // Listen for storage events (from other tabs)
        window.addEventListener('storage', (e) => {
            if (e.key === 'wishlist') {
                console.log('Wishlist updated from another tab');
                if (typeof renderWishlist === 'function') {
                    renderWishlist();
                }
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
window.addToWishlist = addToWishlist;
window.isInWishlist = isInWishlist;
window.toggleWishlist = toggleWishlist;
window.getWishlist = getWishlist;