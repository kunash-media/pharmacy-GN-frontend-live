// ==================== productdetails.js ====================

function removeSkeleton() {
    document.querySelectorAll('.skeleton').forEach(el => {
        el.classList.remove('skeleton');
        el.style.background = '';
        el.style.backgroundImage = '';
        el.style.animation = '';
    });
}

// Global variables
let cart = JSON.parse(localStorage.getItem('cart') || '[]');
let currentProduct = null;

// Initialize Tabs
function initTabs() {
    const tabButtons = document.querySelectorAll('.tab-button');
    const tabContents = document.querySelectorAll('.tab-content');
    
    tabButtons.forEach(button => {
        button.addEventListener('click', () => {
            const tabId = button.getAttribute('data-tab');
            
            // Remove active class from all buttons and contents
            tabButtons.forEach(btn => btn.classList.remove('active'));
            tabContents.forEach(content => content.classList.remove('active'));
            
            // Add active class to clicked button and corresponding content
            button.classList.add('active');
            document.getElementById(`${tabId}-content`).classList.add('active');
        });
    });
}

// Update cart count in header
function updateCartCount() {
    const total = cart.reduce((sum, item) => sum + (item.quantity || 1), 0);
    ['desktop-cart-count', 'mobile-cart-count'].forEach(id => {
        const el = document.getElementById(id);
        if (el) {
            el.textContent = total;
            el.style.display = total > 0 ? 'flex' : 'none';
        }
    });
}

// Add to cart
function addToCart(product, quantity = 1) {
    const cartItem = {
        id: product.id || Date.now(),
        name: product.name || 'Unknown Product',
        price: Number(product.price) || 0,
        image: product.image || 'https://via.placeholder.com/150',
        quantity: quantity,
        sku: product.sku || '',
        brand: product.brand || '',
        unit: product.unit || ''
    };

    const existing = cart.find(item => item.id == cartItem.id);
    if (existing) {
        existing.quantity += quantity;
    } else {
        cart.push(cartItem);
    }

    localStorage.setItem('cart', JSON.stringify(cart));
    updateCartCount();
    updateRightCartPanel();
    
    // Show success message
    showToast(`${quantity} ${quantity > 1 ? 'items' : 'item'} added to cart!`);
}

// Show toast notification
function showToast(message) {
    // Remove existing toasts
    document.querySelectorAll('.toast-notification').forEach(toast => toast.remove());
    
    const toast = document.createElement('div');
    toast.className = 'toast-notification fixed top-20 right-4 bg-green-600 text-white px-6 py-3 rounded-lg shadow-lg z-50 animate-in slide-in-from-right duration-300';
    toast.textContent = message;
    document.body.appendChild(toast);
    
    setTimeout(() => {
        toast.classList.add('animate-out', 'slide-out-to-right', 'duration-300');
        setTimeout(() => toast.remove(), 300);
    }, 3000);
}

// Right side live cart panel update
function updateRightCartPanel() {
    const items = cart.reduce((sum, i) => sum + (i.quantity || 1), 0);
    const totalPrice = cart.reduce((sum, i) => sum + i.price * (i.quantity || 1), 0);

    const countEl = document.getElementById('cart-items-number');
    const textEl = document.getElementById('cart-items-text');
    const fullText = document.getElementById('cart-item-count-display');

    if (countEl) countEl.textContent = items;
    if (textEl) textEl.textContent = items === 1 ? '' : 's';

    if (fullText) {
        fullText.innerHTML = items === 0
            ? 'Your cart is empty'
            : `<span id="cart-items-number">${items}</span> Item<span id="cart-items-text">${items === 1 ? '' : 's'}</span> in Cart`;
    }
}

// Safe URL parameter reading
function getUrlParams() {
    const params = {};
    const searchParams = new URLSearchParams(location.search);
    for (const [key, value] of searchParams) {
        try {
            params[key] = decodeURIComponent(value);
        } catch {
            params[key] = value;
        }
    }
    return params;
}

// Render thumbnails
function renderThumbnails(src) {
    const container = document.getElementById('thumbnail-container');
    if (!container || !src) return;
    container.innerHTML = '';
    [src, src, src].forEach(s => {
        const img = document.createElement('img');
        img.src = s;
        img.className = 'w-20 h-20 object-contain border-2 rounded-lg cursor-pointer hover:border-pharmeasy-green transition';
        img.onclick = () => {
            document.getElementById('main-product-image').src = s;
            container.querySelectorAll('img').forEach(t => t.classList.remove('border-pharmeasy-green'));
            img.classList.add('border-pharmeasy-green');
        };
        container.appendChild(img);
    });
    if (container.children.length > 0) {
        container.children[0].classList.add('border-pharmeasy-green');
    }
}

// Update Wishlist button state
function updateWishlistButton() {
    const wishlistBtn = document.getElementById('wishlist-btn');
    if (!wishlistBtn || !currentProduct) return;
    
    const wishlist = JSON.parse(localStorage.getItem('wishlist') || '[]');
    const isWishlisted = wishlist.some(item => item.id === currentProduct.id);
    
    const heartIcon = wishlistBtn.querySelector('i');
    if (heartIcon) {
        if (isWishlisted) {
            heartIcon.className = 'fas fa-heart text-2xl text-red-500';
            wishlistBtn.title = 'Remove from wishlist';
        } else {
            heartIcon.className = 'far fa-heart text-2xl text-gray-600';
            wishlistBtn.title = 'Add to wishlist';
        }
    }
    
    wishlistBtn.onclick = () => {
        toggleWishlist(currentProduct);
        updateWishlistButton();
    };
}

// Toggle wishlist
function toggleWishlist(product) {
    let wishlist = JSON.parse(localStorage.getItem('wishlist') || '[]');
    const index = wishlist.findIndex(item => item.id === product.id);
    
    if (index === -1) {
        // Add to wishlist
        wishlist.push({
            id: product.id,
            name: product.name,
            price: product.price,
            image: product.image,
            sku: product.sku,
            brand: product.brand,
            unit: product.unit
        });
        showToast('Added to wishlist!');
    } else {
        // Remove from wishlist
        wishlist.splice(index, 1);
        showToast('Removed from wishlist!');
    }
    
    localStorage.setItem('wishlist', JSON.stringify(wishlist));
    window.dispatchEvent(new CustomEvent('wishlistUpdated'));
}

// Load Related Products
function loadRelatedProducts(category, currentId) {
    try {
        const allProducts = JSON.parse(sessionStorage.getItem('currentPageProducts') || '[]');
        let related = allProducts.filter(p => p.category === category && p.id != currentId && p.productStatus === 'Available');

        if (related.length < 4) {
            related = allProducts.filter(p => p.id != currentId && p.productStatus === 'Available');
        }

        related = related.sort(() => Math.random() - 0.5).slice(0, 4);
        renderRelatedProducts(related);
    } catch (e) {
        console.log('No related products found');
    }
}

function renderRelatedProducts(products) {
    const container = document.getElementById('related-products-container');
    if (!container) return;

    container.innerHTML = products.length === 0
        ? '<p class="col-span-full text-center text-gray-500 py-8">No related products found</p>'
        : '';

    products.forEach(p => {
        const price = p.productPrice || p.price || 0;
        const originalPrice = p.productOldPrice || p.originalPrice || 0;
        const discount = originalPrice && originalPrice > price
            ? Math.round(((originalPrice - price) / originalPrice) * 100)
            : 0;

        const card = document.createElement('div');
        card.className = 'bg-white rounded-xl shadow-md p-4 hover:shadow-lg transition cursor-pointer';
        card.innerHTML = `
            <img src="${p.image}" class="w-full h-40 object-cover rounded-lg mb-3">
            <h4 class="font-medium text-sm line-clamp-2 mb-1">${p.productName || p.name}</h4>
            <p class="text-xs text-gray-500">${p.brandName || p.brand || 'Generic'}</p>
            <div class="mt-2 flex items-center gap-2">
                <span class="text-lg font-bold text-green-600">₹${price.toFixed(0)}</span>
                ${originalPrice && originalPrice > price ? `
                    <span class="text-sm text-gray-400 line-through">₹${originalPrice.toFixed(0)}</span>
                    <span class="text-xs text-green-600 font-bold">${discount}% off</span>
                ` : ''}
            </div>
            <button onclick="navigateToProductDetails(${p.id})"
                class="w-full mt-3 bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg text-sm font-medium">
                View Details
            </button>
        `;
        container.appendChild(card);
    });
}

// Format date for display
function formatDate(dateStr) {
    if (!dateStr) return 'Not specified';
    try {
        const date = new Date(dateStr);
        return date.toLocaleDateString('en-IN', {
            day: '2-digit',
            month: 'short',
            year: 'numeric'
        });
    } catch {
        return dateStr;
    }
}

// Helper function to parse arrays
function parseArray(str) {
    try {
        if (!str || str === 'undefined' || str === 'null') return [];
        return JSON.parse(str);
    } catch {
        return [];
    }
}

// Helper function to parse objects
function parseObject(str) {
    try {
        if (!str || str === 'undefined' || str === 'null') return {};
        return JSON.parse(str);
    } catch {
        return {};
    }
}

// Render Product Details Tab (first tab)
function renderProductDetailsTab() {
    const tableBody = document.getElementById('specifications-table-body');
    if (!tableBody || !currentProduct) return;
    
    tableBody.innerHTML = '';
    
    // Parse dynamic fields
    const dynamicFields = typeof currentProduct.productDynamicFields === 'object' ? 
        currentProduct.productDynamicFields : 
        parseObject(currentProduct.productDynamicFields);
    
    // Product Details Section
    const productDetails = [
        { label: 'Product Description', value: currentProduct.description || currentProduct.productDescription || 'No description available' },
        { label: 'Brand', value: currentProduct.brand || currentProduct.brandName || 'Generic' },
        { label: 'Category', value: currentProduct.productSubCategory || currentProduct.category || 'Health Supplements' },
        { label: 'Manufacturing Date', value: formatDate(currentProduct.mfgDate) },
        { label: 'Expiry Date', value: formatDate(currentProduct.expDate) },
        { label: 'SKU', value: currentProduct.sku || 'N/A' },
        { label: 'Batch Number', value: currentProduct.batchNo || 'Not specified' },
        { label: 'Product Status', value: currentProduct.productQuantity > 0 ? 
            '<span class="text-green-600 font-semibold">In Stock</span>' : 
            '<span class="text-red-600 font-semibold">Out of Stock</span>' },
        { label: 'Available Quantity', value: currentProduct.productQuantity || 0 },
        { label: 'Product Unit', value: currentProduct.unit || 'Not specified' },
        { label: 'Form', value: dynamicFields.form || 'Not specified' },
        { label: 'Strength', value: dynamicFields.strength || 'Not specified' },
        { label: 'Shelf Life', value: dynamicFields.shelfLife || '24 months' },
        { label: 'Country of Origin', value: dynamicFields.countryOfOrigin || 'India' }
    ];
    
    // Add product details rows
    productDetails.forEach((detail, index) => {
        if (detail.value && detail.value.toString().trim() !== '') {
            const row = document.createElement('tr');
            row.className = index % 2 === 0 ? 'bg-gray-50' : 'bg-white';
            row.innerHTML = `
                <td class="spec-label py-3 px-6 border-b border-gray-200">
                    <span class="font-semibold text-gray-700">${detail.label}</span>
                </td>
                <td class="spec-value py-3 px-6 border-b border-gray-200">
                    <div class="text-gray-600">${detail.value}</div>
                </td>
            `;
            tableBody.appendChild(row);
        }
    });
}

// Render Benefits Tab (second tab)
function renderBenefitsTab() {
    const benefitsContent = document.getElementById('benefits-content');
    if (!benefitsContent || !currentProduct) return;
    
    const benefits = Array.isArray(currentProduct.benefitsList) ? 
        currentProduct.benefitsList : 
        parseArray(currentProduct.benefitsList);
    
    benefitsContent.innerHTML = '';
    
    if (benefits.length === 0) {
        benefitsContent.innerHTML = `
            <div class="py-8">
                <h3 class="text-xl font-bold text-gray-800 mb-6">Product Benefits</h3>
                <p class="text-gray-600">No benefits information available for this product.</p>
            </div>
        `;
        return;
    }
    
    benefitsContent.innerHTML = `
        <div class="py-8">
            <h3 class="text-xl font-bold text-gray-800 mb-6">Key Benefits</h3>
            <div class="bg-white rounded-lg border border-gray-200 p-6">
                <ul class="space-y-4">
                    ${benefits.map((benefit, index) => `
                        <li class="flex items-start">
                            <span class="flex-shrink-0 w-8 h-8 bg-green-100 rounded-full flex items-center justify-center mr-3 mt-1">
                                <i class="fas fa-check text-green-600 text-sm"></i>
                            </span>
                            <span class="text-gray-700">${benefit}</span>
                        </li>
                    `).join('')}
                </ul>
            </div>
        </div>
    `;
}

// Render Ingredients Tab (third tab)
function renderIngredientsTab() {
    const ingredientsContent = document.getElementById('ingredients-content');
    if (!ingredientsContent || !currentProduct) return;
    
    const ingredients = Array.isArray(currentProduct.ingredientsList) ? 
        currentProduct.ingredientsList : 
        parseArray(currentProduct.ingredientsList);
    
    ingredientsContent.innerHTML = '';
    
    if (ingredients.length === 0) {
        ingredientsContent.innerHTML = `
            <div class="py-8">
                <h3 class="text-xl font-bold text-gray-800 mb-6">Product Ingredients</h3>
                <p class="text-gray-600">No ingredients information available for this product.</p>
            </div>
        `;
        return;
    }
    
    ingredientsContent.innerHTML = `
        <div class="py-8">
            <h3 class="text-xl font-bold text-gray-800 mb-6">Product Composition</h3>
            <div class="bg-white rounded-lg border border-gray-200 p-6">
                <ul class="space-y-3">
                    ${ingredients.map((ingredient, index) => `
                        <li class="flex items-start">
                            <span class="flex-shrink-0 w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center mr-3 mt-1">
                                <span class="text-blue-600 text-xs font-bold">${index + 1}</span>
                            </span>
                            <span class="text-gray-700">${ingredient}</span>
                        </li>
                    `).join('')}
                </ul>
            </div>
        </div>
    `;
}

// Render Directions Tab (fourth tab)
function renderDirectionsTab() {
    const directionsContent = document.getElementById('directions-content');
    if (!directionsContent || !currentProduct) return;
    
    const directions = Array.isArray(currentProduct.directionsList) ? 
        currentProduct.directionsList : 
        parseArray(currentProduct.directionsList);
    
    // Parse dynamic fields for additional information
    const dynamicFields = typeof currentProduct.productDynamicFields === 'object' ? 
        currentProduct.productDynamicFields : 
        parseObject(currentProduct.productDynamicFields);
    
    directionsContent.innerHTML = '';
    
    let content = `
        <div class="py-8">
            <h3 class="text-xl font-bold text-gray-800 mb-6">Directions for Use</h3>
    `;
    
    if (directions.length > 0) {
        content += `
            <div class="mb-8">
                <div class="bg-white rounded-lg border border-gray-200 p-6">
                    <ul class="space-y-4">
                        ${directions.map((direction, index) => `
                            <li class="flex items-start">
                                <span class="flex-shrink-0 w-8 h-8 bg-orange-100 rounded-full flex items-center justify-center mr-3 mt-1">
                                    <span class="text-orange-600 font-bold">${index + 1}</span>
                                </span>
                                <span class="text-gray-700">${direction}</span>
                            </li>
                        `).join('')}
                    </ul>
                </div>
            </div>
        `;
    } else {
        content += `
            <div class="mb-8">
                <p class="text-gray-600">No directions information available for this product.</p>
            </div>
        `;
    }
    
    // Additional Information Section
    const additionalInfo = [];
    
    if (dynamicFields.dosage) {
        additionalInfo.push({ label: 'Recommended Dosage', value: dynamicFields.dosage });
    }
    
    if (currentProduct.prescriptionRequired || currentProduct.prescription === 'true') {
        additionalInfo.push({ 
            label: 'Prescription Required', 
            value: '<span class="text-red-600 font-semibold">Yes - Please consult a doctor before use</span>' 
        });
    } else if (currentProduct.prescriptionRequired === false || currentProduct.prescription === 'false') {
        additionalInfo.push({ 
            label: 'Prescription Required', 
            value: '<span class="text-green-600 font-semibold">No - Available over the counter</span>' 
        });
    }
    
    if (dynamicFields.storage) {
        additionalInfo.push({ label: 'Storage Instructions', value: dynamicFields.storage });
    }
    
    if (dynamicFields.suitableFor) {
        additionalInfo.push({ label: 'Suitable For', value: dynamicFields.suitableFor });
    }
    
    if (additionalInfo.length > 0) {
        content += `
            <div>
                <h4 class="text-lg font-bold text-gray-800 mb-4">Additional Information</h4>
                <div class="bg-gray-50 rounded-lg border border-gray-200 p-6">
                    <table class="w-full">
                        <tbody>
                            ${additionalInfo.map(info => `
                                <tr class="border-b border-gray-200 last:border-b-0">
                                    <td class="py-3 font-medium text-gray-700 w-1/3">${info.label}</td>
                                    <td class="py-3 text-gray-600">${info.value}</td>
                                </tr>
                            `).join('')}
                        </tbody>
                    </table>
                </div>
            </div>
        `;
    }
    
    // Warning Section (if needed)
    if (dynamicFields.warnings || dynamicFields.precautions) {
        const warnings = dynamicFields.warnings || dynamicFields.precautions;
        content += `
            <div class="mt-8">
                <h4 class="text-lg font-bold text-red-800 mb-4">⚠️ Important Warnings</h4>
                <div class="bg-red-50 rounded-lg border border-red-200 p-6">
                    <p class="text-red-700">${warnings}</p>
                </div>
            </div>
        `;
    }
    
    content += `</div>`;
    directionsContent.innerHTML = content;
}

// Render all tabs content
function renderAllTabs() {
    renderProductDetailsTab();
    renderBenefitsTab();
    renderIngredientsTab();
    renderDirectionsTab();
}

// Load product from URL parameters
function loadFromUrlParams() {
    const p = getUrlParams();

    if (!p.name || !p.price) {
        console.error('Missing required product parameters');
        return false;
    }

    currentProduct = {
    id: p.id || Date.now(),
    sku: p.sku || 'N/A',
    name: p.name,
    brand: p.brand || 'Generic',
    price: parseFloat(p.price) || 0,
    originalPrice: p.originalPrice ? parseFloat(p.originalPrice) : null,
    discount: p.discount ? parseInt(p.discount) : 0,
    image: p.image || 'https://via.placeholder.com/600',
    description: p.description || 'No description available.',
    category: p.category || 'all',
    unit: p.unit || '',
    mrp: p.mrp ? parseFloat(p.mrp) : null,
    rating: p.rating ? parseFloat(p.rating) : 4.0,
    prescription: p.prescription === 'true',
    prescriptionRequired: p.prescription === 'true',
    benefitsList: parseArray(p.benefits),
    ingredientsList: parseArray(p.ingredients),
    directionsList: parseArray(p.directions),
    productDynamicFields: parseObject(p.dynamicFields),
    mfgDate: p.mfgDate || '',
    expDate: p.expDate || '',
    batchNo: p.batchNo || '',
    productSizes: parseArray(p.sizes),
    productQuantity: p.quantity ? parseInt(p.quantity) : 10, // Default to 10 if not specified
    productStatus: p.quantity ? (parseInt(p.quantity) > 0 ? 'Available' : 'Out of Stock') : 'Available',
    productSubCategory: p.category === 'male' ? 'Male Fertility Support' : 
                       p.category === 'female' ? 'Female Fertility Support' : 
                       p.category === 'ayurvedic' ? 'Ayurvedic Supplements' : 'Health Supplements'
};

    // Update all UI elements
    document.getElementById('product-name').textContent = currentProduct.name;
    document.getElementById('product-sku').textContent = `SKU: ${currentProduct.sku}`;
    document.getElementById('selling-price').textContent = '₹' + currentProduct.price.toFixed(0);
    
    // Update MRP if available
    if (currentProduct.mrp) {
        document.getElementById('mrp-price').textContent = '₹' + currentProduct.mrp.toFixed(0);
    }
    
    // Set product unit
    const productUnitEl = document.getElementById('product-unit');
    if (productUnitEl && currentProduct.unit) {
        productUnitEl.textContent = currentProduct.unit;
    }
    
    // Update rating
    const ratingEl = document.getElementById('product-rating');
    if (ratingEl) {
        const rating = currentProduct.rating || 4.0;
        ratingEl.innerHTML = `
            <span class="text-yellow-400">
                ${'★'.repeat(Math.floor(rating))}${'☆'.repeat(5 - Math.floor(rating))}
            </span>
            <span class="ml-2 text-sm text-gray-600">${rating.toFixed(1)}/5.0</span>
        `;
    }

    // Update pricing and discount
    if (currentProduct.originalPrice && currentProduct.originalPrice > currentProduct.price) {
        const discount = Math.round(((currentProduct.originalPrice - currentProduct.price) / currentProduct.originalPrice) * 100);
        document.getElementById('mrp-price').textContent = '₹' + currentProduct.originalPrice.toFixed(0);
        document.getElementById('discount-badge').textContent = discount + '% OFF';
        document.getElementById('discount-badge').classList.remove('hidden');
        
        const originalPriceContainer = document.querySelector('.line-through');
        if (originalPriceContainer) {
            originalPriceContainer.classList.remove('hidden');
        }
    } else {
        document.getElementById('discount-badge').classList.add('hidden');
        const originalPriceContainer = document.querySelector('.line-through');
        if (originalPriceContainer) {
            originalPriceContainer.classList.add('hidden');
        }
    }

    // Update product image
    const mainImg = document.getElementById('main-product-image');
    if (mainImg && currentProduct.image) {
        mainImg.src = decodeURIComponent(currentProduct.image);
        renderThumbnails(decodeURIComponent(currentProduct.image));
    }

    // Update quantity input max based on available stock
    const quantityInput = document.getElementById('quantity-input');
const availableQuantity = currentProduct.productQuantity || 0;

if (quantityInput && availableQuantity > 0) {
    quantityInput.max = Math.min(availableQuantity, 10);
    quantityInput.value = 1;
    quantityInput.disabled = false;
    quantityInput.placeholder = 'Quantity';
} else if (quantityInput) {
    quantityInput.disabled = true;
    quantityInput.value = 0;
    quantityInput.placeholder = 'Out of Stock';
}

    // Update add to cart button based on stock
    const addToCartBtn = document.getElementById('add-to-cart-btn');
const buyNowBtn = document.getElementById('buy-now-btn');

if (availableQuantity <= 0) {
    if (addToCartBtn) {
        addToCartBtn.disabled = true;
        addToCartBtn.innerHTML = '<i class="fas fa-times-circle mr-2"></i> Out of Stock';
        addToCartBtn.className = 'flex-1 px-2 bg-gray-400 cursor-not-allowed text-white font-bold py-3 rounded-lg text-md shadow-lg transition flex items-center justify-center';
    }
        if (buyNowBtn) {
        buyNowBtn.disabled = true;
        buyNowBtn.innerHTML = '<i class="fas fa-times-circle mr-2"></i> Out of Stock';
        buyNowBtn.className = 'px-6 bg-gray-400 cursor-not-allowed text-white font-bold py-3 rounded-lg text-md shadow-lg transition';
    }
} else {
     if (addToCartBtn) {
        addToCartBtn.disabled = false;
        addToCartBtn.innerHTML = '<i class="fas fa-shopping-cart mr-2"></i> Add to Cart';
        addToCartBtn.className = 'flex-1 px-2 bg-[#295F98] hover:bg-[#5C7285] text-white font-bold py-3 rounded-lg text-md shadow-lg transition flex items-center justify-center';
    }
    if (buyNowBtn) {
        buyNowBtn.disabled = false;
        buyNowBtn.innerHTML = '<i class="fas fa-bolt mr-2"></i> Buy Now';
        buyNowBtn.className = 'px-6 bg-orange-500 hover:bg-orange-600 text-white font-bold py-3 rounded-lg text-md shadow-lg transition';
    }
}

    // Render all tabs
    renderAllTabs();
    
    removeSkeleton();
    updateCartCount();
    updateWishlistButton();
    loadRelatedProducts(currentProduct.category, currentProduct.id);
    return true;
}

function showNotFound() {
    document.getElementById('product-name').textContent = 'Product Not Found';
    document.getElementById('product-sku').textContent = 'SKU: Not Available';
    document.getElementById('main-product-image').src = 'https://via.placeholder.com/600?text=Product+Not+Found';
    document.getElementById('selling-price').textContent = '₹0';
    document.getElementById('discount-badge').classList.add('hidden');
    
    const specsBody = document.getElementById('specifications-table-body');
    if (specsBody) {
        specsBody.innerHTML = `
            <tr>
                <td class="spec-label">Product Description</td>
                <td class="spec-value">Product information not available</td>
            </tr>
            <tr>
                <td class="spec-label">Brand</td>
                <td class="spec-value">Not Available</td>
            </tr>
            <tr>
                <td class="spec-label">Category</td>
                <td class="spec-value">Not Available</td>
            </tr>
        `;
    }
    
    removeSkeleton();
}

// Initialize Quantity Selector
function initQuantitySelector() {
    const decreaseBtn = document.getElementById('decrease-qty');
    const increaseBtn = document.getElementById('increase-qty');
    const quantityInput = document.getElementById('quantity-input');

    if (decreaseBtn && increaseBtn && quantityInput) {
        decreaseBtn.onclick = () => {
            const current = parseInt(quantityInput.value);
            if (current > 1) {
                quantityInput.value = current - 1;
            }
        };

        increaseBtn.onclick = () => {
            const current = parseInt(quantityInput.value);
            const max = parseInt(quantityInput.max);
            if (current < max) {
                quantityInput.value = current + 1;
            }
        };

        quantityInput.onchange = () => {
            let value = parseInt(quantityInput.value);
            const max = parseInt(quantityInput.max);
            const min = parseInt(quantityInput.min);
            
            if (isNaN(value) || value < min) {
                value = min;
            } else if (value > max) {
                value = max;
            }
            quantityInput.value = value;
        };
    }
}

// Initialize Add to Cart & Buy Now buttons
function initCartButtons() {
    const addBtn = document.getElementById('add-to-cart-btn');
    const buyBtn = document.getElementById('buy-now-btn');

    if (addBtn && currentProduct && currentProduct.productQuantity > 0) {
        addBtn.onclick = () => {
            const quantity = parseInt(document.getElementById('quantity-input').value) || 1;
            addToCart(currentProduct, quantity);
        };
    }

    if (buyBtn && currentProduct && currentProduct.productQuantity > 0) {
        buyBtn.onclick = () => {
            const quantity = parseInt(document.getElementById('quantity-input').value) || 1;
            addToCart(currentProduct, quantity);
            
            // Redirect to checkout/cart page
            setTimeout(() => window.location.href = 'cart.html', 300);
        };
    }
}

// Navigate to another product (used in Related Products)
window.navigateToProductDetails = function(id) {
    try {
        const allProducts = JSON.parse(sessionStorage.getItem('currentPageProducts') || '[]');
        const product = allProducts.find(p => p.id == id);
        if (!product) {
            console.error('Product not found with id:', id);
            return;
        }

        // Create URL parameters with all product data
        const params = new URLSearchParams({
            id: product.id,
            sku: product.sku,
            name: encodeURIComponent(product.productName || product.name),
            brand: encodeURIComponent(product.brandName || product.brand || 'Generic'),
            price: product.productPrice || product.price,
            originalPrice: product.productOldPrice || product.originalPrice || '',
            discount: Math.round(((product.productOldPrice - product.productPrice) / product.productOldPrice) * 100),
            image: encodeURIComponent(product.image),
            description: encodeURIComponent(product.productDescription || product.description || ''),
            category: product.category || 'all',
            unit: product.productUnit || '',
            mrp: product.productMRP || '',
            rating: product.productRating || product.rating || 4.0,
            prescription: product.prescriptionRequired || false,
            benefits: encodeURIComponent(JSON.stringify(product.benefitsList || [])),
            ingredients: encodeURIComponent(JSON.stringify(product.ingredientsList || [])),
            directions: encodeURIComponent(JSON.stringify(product.directionsList || [])),
            dynamicFields: encodeURIComponent(JSON.stringify(product.productDynamicFields || {})),
            mfgDate: product.mfgDate || '',
            expDate: product.expDate || '',
            batchNo: product.batchNo || '',
            sizes: encodeURIComponent(JSON.stringify(product.productSizes || [])),
            quantity: product.productQuantity || 0
        });

        window.location.href = `productdetails.html?${params.toString()}`;
    } catch (error) {
        console.error('Error navigating to product details:', error);
    }
};

// Main init function
function init() {
    if (!loadFromUrlParams()) {
        showNotFound();
    }
    initTabs();
    initCartButtons();
    initQuantitySelector();
    updateRightCartPanel();
    updateWishlistButton();
}

// Start everything when page loads
document.addEventListener('DOMContentLoaded', () => {
    init();
    updateCartCount();
    
    // Add CSS for animations
    const style = document.createElement('style');
    style.textContent = `
        @keyframes slideInFromRight {
            from { transform: translateX(100%); opacity: 0; }
            to { transform: translateX(0); opacity: 1; }
        }
        
        @keyframes slideOutToRight {
            from { transform: translateX(0); opacity: 1; }
            to { transform: translateX(100%); opacity: 0; }
        }
        
        .animate-in {
            animation: slideInFromRight 0.3s ease-out;
        }
        
        .animate-out {
            animation: slideOutToRight 0.3s ease-in;
        }
        
        .toast-notification {
            min-width: 300px;
        }
    `;
    document.head.appendChild(style);
});